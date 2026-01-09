// src/pages/student/StudentResumeEditor.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import ResumePreview from "../pages/dashboard/ResumePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { ArrowLeft, Save, Download, FileText, Loader2, AlertCircle } from "lucide-react";

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

export default function StudentResumeEditor() {
  const navigate = useNavigate();
  const params = useParams();

  const templateId = Number((params as any)?.templateId || 0);
  const resumeId = Number((params as any)?.resumeId || 0);

  const [template, setTemplate] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);
  const [resume, setResume] = useState<any>(emptyResume());
  const [title, setTitle] = useState<string>("My Resume");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const printRef = useRef<HTMLDivElement | null>(null);

  const isEdit = !!resumeId;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isEdit) {
          // Load existing resume
          const r = await axios.get(`/auth/student/resumes/${resumeId}/`, { headers: authHeaders() });
          setTitle(r.data?.title || "My Resume");
          setResume(r.data?.data || emptyResume());

          // Load template
          if (r.data?.template) {
            const t = await axios.get(`/auth/student/templates/${r.data.template}/`, { headers: authHeaders() });
            setTemplate(t.data);
            setSchema(t.data?.schema || {});
          }
        } else {
          // Create new resume from template
          const t = await axios.get(`/auth/student/templates/${templateId}/`, { headers: authHeaders() });
          setTemplate(t.data);
          setSchema(t.data?.schema || {});
        }
      } catch (err: any) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (templateId || resumeId) {
      loadData();
    }
  }, [templateId, resumeId, isEdit]);

  const safeFileName = useMemo(() => {
    const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
    return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }, [resume, title]);

  const saveResume = async () => {
    try {
      setSaving(true);
      setError(null);

      const payload = {
        title,
        data: resume,
        status: "draft",
        ...(template && { template_id: template.id })
      };

      let response;
      if (isEdit) {
        response = await axios.put(
          `/auth/student/resumes/${resumeId}/`,
          payload,
          { headers: authHeaders() }
        );
      } else {
        response = await axios.post(
          `/auth/student/resumes/`,
          payload,
          { headers: authHeaders() }
        );
        
        // Update the URL for editing
        navigate(`/student/resume/edit/${response.data.id}`, { replace: true });
      }

      alert("Resume saved successfully! ✅");
      return response.data;
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.response?.data?.detail || "Failed to save resume. Please try again.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const downloadPDF = async () => {
    try {
      setExporting(true);
      const el = printRef.current;
      if (!el) return;

      const A4_WIDTH = 794;
      const A4_HEIGHT = 1123;
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const canvas = await html2canvas(el, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: "#ffffff",
        width: A4_WIDTH,
        height: el.scrollHeight,
        windowWidth: A4_WIDTH,
        logging: false
      });
      
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const yOffset = Math.max(0, (pageHeight - imgHeight) / 2);
      
      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }
      
      pdf.save(`${safeFileName}.pdf`);
      
      // Track download
      if (resumeId) {
        await axios.post(
          `/auth/student/resumes/${resumeId}/download/`,
          {},
          { headers: authHeaders() }
        );
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const downloadDOCX = async () => {
    try {
      setExporting(true);
      const h = resume?.header || {};
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1000,
                  bottom: 1000,
                  left: 1000,
                  right: 1000,
                },
              },
            },
            children: [
              new Paragraph({
                children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36, font: "Calibri" })],
                alignment: "center",
                spacing: { after: 200 }
              }),
              
              new Paragraph({
                children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24, color: "2E74B5", font: "Calibri" })],
                alignment: "center",
                spacing: { after: 400 }
              }),
              
              new Paragraph({
                children: [
                  h.email ? new TextRun({ text: h.email || "", size: 22 }) : null,
                  h.email && h.phone ? new TextRun({ text: " | ", size: 22 }) : null,
                  h.phone ? new TextRun({ text: h.phone || "", size: 22 }) : null,
                  (h.email || h.phone) && h.location ? new TextRun({ text: " | ", size: 22 }) : null,
                  h.location ? new TextRun({ text: h.location || "", size: 22 }) : null,
                ].filter(Boolean),
                alignment: "center",
                spacing: { after: 400 }
              }),
              
              new Paragraph({ text: " " }),
              
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: "PROFESSIONAL SUMMARY", 
                    bold: true,
                    size: 26,
                    color: "2E74B5",
                    font: "Calibri"
                  })
                ],
                spacing: { before: 200, after: 200 }
              }),
              new Paragraph({
                text: resume?.summary || "",
                spacing: { after: 400 }
              }),
              
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: "WORK EXPERIENCE", 
                    bold: true,
                    size: 26,
                    color: "2E74B5",
                    font: "Calibri"
                  })
                ],
                spacing: { before: 200, after: 200 }
              }),
              ...(resume?.experience || []).flatMap((x: any, idx: number) => [
                new Paragraph({
                  children: [
                    new TextRun({ 
                      text: `${x.title || ""}`, 
                      bold: true,
                      size: 22
                    })
                  ],
                  spacing: { after: 100 }
                }),
                new Paragraph({
                  children: [
                    new TextRun({ 
                      text: `${x.company || ""}`, 
                      bold: true,
                      size: 20,
                      color: "444444"
                    }),
                    new TextRun({ text: " | ", size: 20 }),
                    new TextRun({ 
                      text: `${x.location || ""}`, 
                      size: 20
                    })
                  ],
                  spacing: { after: 100 }
                }),
                new Paragraph({
                  children: [
                    new TextRun({ 
                      text: `${x.from || ""} - ${x.to || ""}`, 
                      italics: true,
                      size: 18,
                      color: "666666"
                    })
                  ],
                  spacing: { after: 200 }
                }),
                ...(x.bullets || []).map((b: string) => 
                  new Paragraph({
                    text: `• ${b}`,
                    bullet: { level: 0 },
                    spacing: { after: 100 }
                  })
                ),
                idx < resume.experience.length - 1 ? new Paragraph({ text: " " }) : null,
              ].filter(Boolean)),
              
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: "EDUCATION", 
                    bold: true,
                    size: 26,
                    color: "2E74B5",
                    font: "Calibri"
                  })
                ],
                spacing: { before: 200, after: 200 }
              }),
              ...(resume?.education || []).map(
                (e: any) => new Paragraph({
                  text: `${e.school || ""} — ${e.degree || ""} (${e.from || ""}-${e.to || ""})`,
                  spacing: { after: 100 }
                })
              ),
              
              new Paragraph({ text: " " }),
              
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: "SKILLS", 
                    bold: true,
                    size: 26,
                    color: "2E74B5",
                    font: "Calibri"
                  })
                ],
                spacing: { before: 200, after: 200 }
              }),
              new Paragraph({
                text: `Programming: ${(resume?.skills?.programming || []).join(", ")}`,
                spacing: { after: 100 }
              }),
              new Paragraph({
                text: `Frameworks: ${(resume?.skills?.frameworks || []).join(", ")}`,
                spacing: { after: 100 }
              }),
              new Paragraph({
                text: `Tools: ${(resume?.skills?.tools || []).join(", ")}`,
                spacing: { after: 200 }
              }),
              
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: "PROJECTS", 
                    bold: true,
                    size: 26,
                    color: "2E74B5",
                    font: "Calibri"
                  })
                ],
                spacing: { before: 200, after: 200 }
              }),
              ...(resume?.projects || []).map((p: any) => 
                new Paragraph({
                  children: [
                    new TextRun({ text: `${p.name || ""}: `, bold: true }),
                    new TextRun({ text: `${p.desc || ""}` })
                  ],
                  spacing: { after: 100 }
                })
              ),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${safeFileName}.docx`);
      
      // Track download
      if (resumeId) {
        await axios.post(
          `/auth/student/resumes/${resumeId}/download/`,
          {},
          { headers: authHeaders() }
        );
      }
    } catch (error) {
      console.error("DOCX generation error:", error);
      alert("Error generating Word document. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleBack = () => {
    navigate("/student/dashboard");
  };

  const addExperience = () => {
    setResume((p: any) => ({
      ...p,
      experience: [...p.experience, { title: "", company: "", location: "", from: "", to: "", bullets: [""] }]
    }));
  };

  const removeExperience = (index: number) => {
    if (resume.experience.length > 1) {
      setResume((p: any) => ({
        ...p,
        experience: p.experience.filter((_: any, i: number) => i !== index)
      }));
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
          <div style={{ fontSize: '16px', color: '#64748b' }}>Loading Editor...</div>
        </div>
      </div>
    );
  }

  if (!template && !isEdit) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#f9fafb',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <AlertCircle size={48} color="#dc2626" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: '#dc2626', marginBottom: '12px' }}>Template Not Found</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>The template you're trying to use doesn't exist or you don't have access to it.</p>
          <button
            onClick={handleBack}
            style={{
              backgroundColor: '#1e40af',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <style>{`
        .re-grid { display: grid; grid-template-columns: 420px 1fr; gap: 14px; padding: 14px; }
        @media (max-width: 980px) { .re-grid { grid-template-columns: 1fr; } }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      {/* Top Bar */}
      <div style={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 10, 
        background: "white", 
        borderBottom: "1px solid #e5e7eb", 
        padding: "12px 14px", 
        display: "flex", 
        justifyContent: "space-between", 
        gap: 10, 
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleBack}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <div style={{ fontWeight: 950, fontSize: 18 }}>Resume Editor</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              {template?.name || 'My Resume'} • {isEdit ? 'Editing' : 'Creating'} • Real-time preview
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button 
            onClick={saveResume} 
            disabled={saving}
            style={{ 
              padding: "10px 14px", 
              borderRadius: 10, 
              border: "1px solid #1d4ed8", 
              background: saving ? "#93c5fd" : "#2563eb", 
              color: "white", 
              fontWeight: 950,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Saving..." : "Save"}
          </button>

          <button 
            onClick={downloadPDF} 
            disabled={exporting}
            style={{ 
              padding: "10px 12px", 
              borderRadius: 10, 
              border: "1px solid #e5e7eb", 
              background: "white", 
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: exporting ? 'not-allowed' : 'pointer'
            }}
          >
            <Download size={16} />
            {exporting ? "Generating..." : "PDF"}
          </button>

          <button 
            onClick={downloadDOCX} 
            disabled={exporting}
            style={{ 
              padding: "10px 12px", 
              borderRadius: 10, 
              border: "1px solid #e5e7eb", 
              background: "white", 
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: exporting ? 'not-allowed' : 'pointer'
            }}
          >
            <FileText size={16} />
            {exporting ? "Generating..." : "Word"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '16px',
          margin: '16px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="re-grid">
        {/* Left Form */}
        <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
          <div style={{ fontWeight: 950, marginBottom: 8 }}>Resume Details</div>

          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Document Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            placeholder="Enter resume title"
          />

          <div style={{ height: 10 }} />

          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>

            {(["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const).map((k) => (
              <input
                key={k}
                placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
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
              placeholder="Enter professional summary..."
            />

            <div style={{ fontWeight: 900, marginTop: 8 }}>Experience</div>
            {resume.experience.map((exp: any, idx: number) => (
              <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 900 }}>Experience #{idx + 1}</span>
                  {idx > 0 && (
                    <button
                      onClick={() => removeExperience(idx)}
                      style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontSize: 12 }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) => {
                    const newExp = [...resume.experience];
                    newExp[idx] = { ...newExp[idx], title: e.target.value };
                    setResume((p: any) => ({ ...p, experience: newExp }));
                  }}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...resume.experience];
                    newExp[idx] = { ...newExp[idx], company: e.target.value };
                    setResume((p: any) => ({ ...p, experience: newExp }));
                  }}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />
                <input
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => {
                    const newExp = [...resume.experience];
                    newExp[idx] = { ...newExp[idx], location: e.target.value };
                    setResume((p: any) => ({ ...p, experience: newExp }));
                  }}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <input
                    placeholder="From (YYYY-MM)"
                    value={exp.from}
                    onChange={(e) => {
                      const newExp = [...resume.experience];
                      newExp[idx] = { ...newExp[idx], from: e.target.value };
                      setResume((p: any) => ({ ...p, experience: newExp }));
                    }}
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                  <input
                    placeholder="To (Present / YYYY-MM)"
                    value={exp.to}
                    onChange={(e) => {
                      const newExp = [...resume.experience];
                      newExp[idx] = { ...newExp[idx], to: e.target.value };
                      setResume((p: any) => ({ ...p, experience: newExp }));
                    }}
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, marginBottom: 4 }}>Bullet Points</div>
                  {exp.bullets.map((bullet: string, bulletIdx: number) => (
                    <div key={bulletIdx} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <input
                        placeholder={`Bullet point ${bulletIdx + 1}`}
                        value={bullet}
                        onChange={(e) => {
                          const newExp = [...resume.experience];
                          const newBullets = [...newExp[idx].bullets];
                          newBullets[bulletIdx] = e.target.value;
                          newExp[idx] = { ...newExp[idx], bullets: newBullets };
                          setResume((p: any) => ({ ...p, experience: newExp }));
                        }}
                        style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                      />
                      {bulletIdx > 0 && (
                        <button
                          onClick={() => {
                            const newExp = [...resume.experience];
                            const newBullets = [...newExp[idx].bullets];
                            newBullets.splice(bulletIdx, 1);
                            newExp[idx] = { ...newExp[idx], bullets: newBullets };
                            setResume((p: any) => ({ ...p, experience: newExp }));
                          }}
                          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #fecaca", background: "white", color: "#991b1b" }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newExp = [...resume.experience];
                      const newBullets = [...newExp[idx].bullets, ""];
                      newExp[idx] = { ...newExp[idx], bullets: newBullets };
                      setResume((p: any) => ({ ...p, experience: newExp }));
                    }}
                    style={{ width: "100%", padding: "8px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f8fafc", marginTop: 8 }}
                  >
                    + Add Bullet Point
                  </button>
                </div>
              </div>
            ))}
            
            <button
              onClick={addExperience}
              style={{ padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
            >
              + Add Another Experience
            </button>

            {/* Education, Skills, Projects sections - similar to admin editor */}
            <div style={{ fontWeight: 900, marginTop: 8 }}>Education</div>
            {resume.education.map((edu: any, idx: number) => (
              <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 900 }}>Education #{idx + 1}</span>
                  {idx > 0 && (
                    <button
                      onClick={() => {
                        const newEdu = [...resume.education];
                        newEdu.splice(idx, 1);
                        setResume((p: any) => ({ ...p, education: newEdu }));
                      }}
                      style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontSize: 12 }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...resume.education];
                    newEdu[idx] = { ...newEdu[idx], school: e.target.value };
                    setResume((p: any) => ({ ...p, education: newEdu }));
                  }}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />
                <input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...resume.education];
                    newEdu[idx] = { ...newEdu[idx], degree: e.target.value };
                    setResume((p: any) => ({ ...p, education: newEdu }));
                  }}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <input
                    placeholder="From (YYYY)"
                    value={edu.from}
                    onChange={(e) => {
                      const newEdu = [...resume.education];
                      newEdu[idx] = { ...newEdu[idx], from: e.target.value };
                      setResume((p: any) => ({ ...p, education: newEdu }));
                    }}
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                  <input
                    placeholder="To (YYYY)"
                    value={edu.to}
                    onChange={(e) => {
                      const newEdu = [...resume.education];
                      newEdu[idx] = { ...newEdu[idx], to: e.target.value };
                      setResume((p: any) => ({ ...p, education: newEdu }));
                    }}
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                </div>
              </div>
            ))}
            
            <button
              onClick={() => {
                setResume((p: any) => ({
                  ...p,
                  education: [...p.education, { school: "", degree: "", from: "", to: "" }]
                }));
              }}
              style={{ padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
            >
              + Add Another Education
            </button>

            <div style={{ fontWeight: 900, marginTop: 8 }}>Skills (comma separated)</div>
            <input
              placeholder="Programming: JavaScript, TypeScript, Python, Go, SQL"
              value={(resume.skills.programming || []).join(", ")}
              onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, programming: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <input
              placeholder="Frameworks: React, Node.js, Express, Django"
              value={(resume.skills.frameworks || []).join(", ")}
              onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, frameworks: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <input
              placeholder="Tools: AWS, Docker, Kubernetes, PostgreSQL, Redis"
              value={(resume.skills.tools || []).join(", ")}
              onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, tools: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />

            <div style={{ fontWeight: 900, marginTop: 8 }}>Projects</div>
            {resume.projects.map((proj: any, idx: number) => (
              <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 900 }}>Project #{idx + 1}</span>
                  {idx > 0 && (
                    <button
                      onClick={() => {
                        const newProjects = [...resume.projects];
                        newProjects.splice(idx, 1);
                        setResume((p: any) => ({ ...p, projects: newProjects }));
                      }}
                      style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontSize: 12 }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => {
                    const newProjects = [...resume.projects];
                    newProjects[idx] = { ...newProjects[idx], name: e.target.value };
                    setResume((p: any) => ({ ...p, projects: newProjects }));
                  }}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />
                <textarea
                  placeholder="Project Description"
                  value={proj.desc}
                  onChange={(e) => {
                    const newProjects = [...resume.projects];
                    newProjects[idx] = { ...newProjects[idx], desc: e.target.value };
                    setResume((p: any) => ({ ...p, projects: newProjects }));
                  }}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", minHeight: 80 }}
                />
              </div>
            ))}
            
            <button
              onClick={() => {
                setResume((p: any) => ({
                  ...p,
                  projects: [...p.projects, { name: "", desc: "" }]
                }));
              }}
              style={{ padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
            >
              + Add Another Project
            </button>
          </div>
        </div>

        {/* Right Preview */}
        <div style={{ display: "grid", placeItems: "start center" }}>
          <div style={{ width: "100%", maxWidth: 860 }}>
            <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Preview (A4 Format)</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
              This preview shows exactly how your resume will look when downloaded as PDF
            </div>

            <div ref={printRef} style={{ 
              background: "white", 
              padding: 24, 
              borderRadius: 14, 
              border: "1px solid #eef2f7", 
              width: "794px", 
              maxWidth: "100%", 
              boxSizing: "border-box" 
            }}>
              <ResumePreview schema={schema} data={resume} />
            </div>
            
            <div style={{ 
              marginTop: 16, 
              padding: 12, 
              backgroundColor: "#f8fafc", 
              borderRadius: 10, 
              fontSize: 12, 
              color: "#64748b" 
            }}>
              <strong>Note:</strong> The preview above shows A4 paper size. Download as PDF for perfect A4 format or as Word document for further editing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}