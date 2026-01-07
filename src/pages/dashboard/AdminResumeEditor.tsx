import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import ResumePreview from "./ResumePreview";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

function authHeaders() {
  const token = localStorage.getItem("access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function emptyResume() {
  return {
    header: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", website: "" },
    summary: "",
    experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
    education: [{ school: "", degree: "", from: "", to: "" }],
    skills: { programming: [], frameworks: [], tools: [] },
    projects: [{ name: "", desc: "" }],
  };
}

export default function AdminResumeEditor() {
  const nav = useNavigate();
  const params = useParams();

  const templateId = Number((params as any)?.templateId || 0);
  const resumeId = Number((params as any)?.resumeId || 0);

  const [tpl, setTpl] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);

  const [resume, setResume] = useState<any>(emptyResume());
  const [title, setTitle] = useState<string>("Untitled Resume");
  const [saving, setSaving] = useState(false);

  const printRef = useRef<HTMLDivElement | null>(null);

  const isEdit = !!resumeId;

  useEffect(() => {
    const load = async () => {
      // edit mode: load resume doc, then template
      if (isEdit) {
        const r = await axios.get(`/auth/admin/resumes/${resumeId}/`, { headers: authHeaders() });
        setTitle(r.data?.title || "Untitled Resume");
        setResume(r.data?.data || emptyResume());

        const t = await axios.get(`/auth/admin/templates/${r.data?.template?.id || r.data?.template_id}/`, { headers: authHeaders() });
        setTpl(t.data);
        setSchema(t.data?.schema || {});
        return;
      }

      // new mode: load template
      const t = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
      setTpl(t.data);
      setSchema(t.data?.schema || {});
    };

    if (templateId || resumeId) load().catch(console.error);
  }, [templateId, resumeId, isEdit]);

  const safeFileName = useMemo(() => {
    const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
    return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }, [resume, title]);

  const saveToBackend = async () => {
    setSaving(true);
    try {
      if (isEdit) {
        const res = await axios.put(
          `/auth/admin/resumes/${resumeId}/`,
          { title, data: resume, status: "draft" },
          { headers: authHeaders() }
        );
        alert("Saved ✅");
        return res.data;
      }

      const res = await axios.post(
        `/auth/admin/resumes/`,
        { template_id: tpl?.id || templateId, title, data: resume, status: "draft" },
        { headers: authHeaders() }
      );

      alert("Saved ✅");
      nav(`/admin/resumes/edit/${res.data.id}`, { replace: true });
      return res.data;
    } finally {
      setSaving(false);
    }
  };

  const downloadPDF = async () => {
    const el = printRef.current;
    if (!el) return;

    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = 0;
    if (imgHeight <= pageHeight) {
      pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);
    } else {
      // multi-page
      let remaining = imgHeight;
      let position = 0;

      while (remaining > 0) {
        pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
        remaining -= pageHeight;
        position -= pageHeight;
        if (remaining > 0) pdf.addPage();
      }
    }

    pdf.save(`${safeFileName}.pdf`);
  };

  const downloadDOCX = async () => {
    const h = resume?.header || {};
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24 })],
            }),
            new Paragraph(`${h.email || ""}  ${h.phone || ""}  ${h.location || ""}`.trim()),

            new Paragraph({ text: " " }),

            new Paragraph({ children: [new TextRun({ text: "Professional Summary", bold: true })] }),
            new Paragraph(resume?.summary || ""),

            new Paragraph({ text: " " }),

            new Paragraph({ children: [new TextRun({ text: "Work Experience", bold: true })] }),
            ...(resume?.experience || []).flatMap((x: any) => [
              new Paragraph({ children: [new TextRun({ text: `${x.title || ""} — ${x.company || ""}`, bold: true })] }),
              new Paragraph(`${x.location || ""}  (${x.from || ""} - ${x.to || ""})`.trim()),
              ...(x.bullets || []).map((b: string) => new Paragraph({ text: `• ${b}` })),
              new Paragraph({ text: " " }),
            ]),

            new Paragraph({ children: [new TextRun({ text: "Education", bold: true })] }),
            ...(resume?.education || []).map(
              (e: any) => new Paragraph(`${e.school || ""} — ${e.degree || ""} (${e.from || ""}-${e.to || ""})`)
            ),

            new Paragraph({ text: " " }),

            new Paragraph({ children: [new TextRun({ text: "Skills", bold: true })] }),
            new Paragraph(`Programming: ${(resume?.skills?.programming || []).join(", ")}`),
            new Paragraph(`Frameworks: ${(resume?.skills?.frameworks || []).join(", ")}`),
            new Paragraph(`Tools: ${(resume?.skills?.tools || []).join(", ")}`),

            new Paragraph({ text: " " }),

            new Paragraph({ children: [new TextRun({ text: "Projects", bold: true })] }),
            ...(resume?.projects || []).map((p: any) => new Paragraph(`${p.name || ""}: ${p.desc || ""}`)),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${safeFileName}.docx`);
  };

  if (!tpl) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <style>{`
        .re-grid { display: grid; grid-template-columns: 420px 1fr; gap: 14px; padding: 14px; }
        @media (max-width: 980px) { .re-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontWeight: 950, fontSize: 18 }}>Resume Editor</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{tpl.name} • real-time preview • PDF/DOCX</div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
            Back
          </button>

          <button onClick={saveToBackend} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 950 }}>
            {saving ? "Saving..." : "Save"}
          </button>

          <button onClick={downloadPDF} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
            Download PDF
          </button>

          <button onClick={downloadDOCX} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
            Download Word
          </button>
        </div>
      </div>

      <div className="re-grid">
        {/* left form */}
        <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
          <div style={{ fontWeight: 950, marginBottom: 8 }}>Resume Details</div>

          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Document Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
          />

          <div style={{ height: 10 }} />

          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>

            {(["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const).map((k) => (
              <input
                key={k}
                placeholder={k}
                value={resume.header[k]}
                onChange={(e) => setResume((p: any) => ({ ...p, header: { ...p.header, [k]: e.target.value } }))}
                style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
              />
            ))}

            <div style={{ fontWeight: 900, marginTop: 8 }}>Summary</div>
            <textarea
              value={resume.summary}
              onChange={(e) => setResume((p: any) => ({ ...p, summary: e.target.value }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
            />

            <div style={{ fontWeight: 900, marginTop: 8 }}>Experience (first block)</div>
            <input
              placeholder="Title"
              value={resume.experience[0].title}
              onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], title: e.target.value }] }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <input
              placeholder="Company"
              value={resume.experience[0].company}
              onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], company: e.target.value }] }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <input
              placeholder="Location"
              value={resume.experience[0].location}
              onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], location: e.target.value }] }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input
                placeholder="From (YYYY-MM)"
                value={resume.experience[0].from}
                onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], from: e.target.value }] }))}
                style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
              />
              <input
                placeholder="To (Present / YYYY-MM)"
                value={resume.experience[0].to}
                onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], to: e.target.value }] }))}
                style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
              />
            </div>

            <div style={{ fontWeight: 900, marginTop: 8 }}>Skills (comma separated)</div>
            <input
              placeholder="Programming"
              value={(resume.skills.programming || []).join(", ")}
              onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, programming: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <input
              placeholder="Frameworks"
              value={(resume.skills.frameworks || []).join(", ")}
              onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, frameworks: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <input
              placeholder="Tools"
              value={(resume.skills.tools || []).join(", ")}
              onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, tools: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
          </div>
        </div>

        {/* right preview */}
        <div style={{ display: "grid", placeItems: "start center" }}>
          <div style={{ width: "100%", maxWidth: 860 }}>
            <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Preview</div>

            <div ref={printRef} style={{ background: "white", padding: 12, borderRadius: 14, border: "1px solid #eef2f7" }}>
              <ResumePreview schema={schema} data={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
