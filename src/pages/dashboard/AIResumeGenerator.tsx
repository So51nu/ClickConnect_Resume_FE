import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "../../api/axiosInstance";
import ResumePreview from "./ResumePreview";
import { saveAs } from "file-saver";

function authHeaders() {
  const token =
    localStorage.getItem("admin_access") ||
    localStorage.getItem("access") ||
    "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const SAMPLE_DATA: any = {
  header: {
    fullName: "John Doe",
    jobTitle: "Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev",
    photoUrl: "",
  },
  summary:
    "Detail-oriented professional with strong ownership, measurable impact, and a focus on customer outcomes.",
  experience: [
    {
      title: "Full Stack Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      from: "2020",
      to: "Present",
      bullets: [
        "Built and shipped scalable features used by 50k+ users.",
        "Improved API performance by 35% by caching + query optimization.",
      ],
    },
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "B.Sc. Computer Science",
      from: "2013",
      to: "2017",
    },
  ],
  skills: {
    programming: ["JavaScript", "TypeScript"],
    frameworks: ["React", "Django"],
    tools: ["Git", "Docker"],
  },
  projects: [
    { name: "E-commerce Platform", desc: "Payments, auth, admin dashboard, optimized checkout flow." },
  ],
  certifications: [],
  languages: [],
  interests: [],
  strengths: [],
  achievements: [],
  courses: [],
};

function isValidTemplateSchema(json: any) {
  return !!(json && typeof json === "object" && json.layout && json.sections);
}

export default function AIResumeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [suggested, setSuggested] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [uploadedSchema, setUploadedSchema] = useState<any>(null);

  const [schema, setSchema] = useState<any>(null);
  const [resume, setResume] = useState<any>(null);
  const [resumeId, setResumeId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const [previewData, setPreviewData] = useState<any>(SAMPLE_DATA);

  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios
      .get("/auth/ai/templates/suggestions/", { headers: authHeaders() })
      .then((r) => setSuggested(r.data?.results || []))
      .catch(() => setSuggested([]));
  }, []);

  const effectiveSchema = useMemo(() => {
    if (uploadedSchema) return uploadedSchema;
    if (schema) return schema;
    const picked = suggested.find((x) => x.key === selectedKey);
    return picked?.schema || null;
  }, [uploadedSchema, schema, suggested, selectedKey]);

  const effectiveData = resume || previewData;

  const pickTemplate = (key: string) => {
    setSelectedKey(key);
    setUploadedSchema(null);
    setResume(null);
    setResumeId(null);

    const t = suggested.find((x) => x.key === key);
    setSchema(t?.schema || null);
  };

  const onUploadSchema = async (file: File) => {
    const text = await file.text();
    const json = JSON.parse(text);

    if (!isValidTemplateSchema(json)) {
      alert("Invalid template schema JSON (must include layout + sections).");
      return;
    }

    // normalize unsupported variants so preview doesn't fallback
    if (json?.theme?.headingVariant === "line") json.theme.headingVariant = "underline";
    if (json?.theme?.paperVariant === "flat") json.theme.paperVariant = "plain";

    setUploadedSchema(json);
    setSelectedKey("");
    setSchema(null);
    setResume(null);
    setResumeId(null);
  };

  const onUploadPhoto = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewData((p: any) => ({
      ...p,
      header: { ...(p.header || {}), photoUrl: url },
    }));

    // if already generated resume exists, keep photo there too
    if (resume) {
      setResume((p: any) => ({
        ...p,
        header: { ...(p.header || {}), photoUrl: url },
      }));
    }
  };

  const generate = async () => {
    if (!prompt.trim()) {
      alert("Prompt required");
      return;
    }

    setLoading(true);
    try {
      const sendSchema =
        uploadedSchema ||
        schema ||
        (suggested.find((x) => x.key === selectedKey)?.schema ?? null);

      const res = await axios.post(
        "/auth/ai/resume/generate/",
        { prompt, template_schema: sendSchema },
        { headers: authHeaders() }
      );

      const data = res.data?.data || null;
      const applied = res.data?.applied_schema || sendSchema || null;
      const newResumeId = res.data?.resume_id ?? null;

      // keep user uploaded photo if exists
      const photoUrl = previewData?.header?.photoUrl || "";
      if (photoUrl && data?.header) data.header.photoUrl = photoUrl;

      setResume(data);
      setSchema(applied);
      setUploadedSchema(null);
      setSelectedKey("");

      setResumeId(typeof newResumeId === "number" ? newResumeId : null);
    } catch (e: any) {
      alert(e?.response?.data?.detail || e?.message || "Generate failed");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!resumeId) return alert("Generate resume first");
    const res = await axios.get(`/auth/resumes/${resumeId}/export/pdf/`, {
      headers: authHeaders(),
      responseType: "blob",
    });
    saveAs(res.data, `resume-${resumeId}.pdf`);
  };

  const downloadDOCX = async () => {
    if (!resumeId) return alert("Generate resume first");
    const res = await axios.get(`/auth/resumes/${resumeId}/export/docx/`, {
      headers: authHeaders(),
      responseType: "blob",
    });
    saveAs(res.data, `resume-${resumeId}.docx`);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: 950 }}>AI Resume Generator</h2>

      <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 14, marginTop: 14 }}>
        {/* Left */}
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Prompt</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Full Stack / Web Developer / Sales / Banking / Any role..."
            style={{ width: "100%", minHeight: 110, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
          />

          <div style={{ marginTop: 10, fontWeight: 900 }}>Upload Profile Photo (optional)</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUploadPhoto(f).catch(console.error);
            }}
          />

          <div style={{ marginTop: 12, fontWeight: 900 }}>Templates</div>
          <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
            {suggested.map((t) => (
              <button
                key={t.key}
                onClick={() => pickTemplate(t.key)}
                disabled={!!uploadedSchema}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 12,
                  border: selectedKey === t.key ? "2px solid #2563eb" : "1px solid #e5e7eb",
                  background: "white",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <img src={t.preview_svg} alt={t.name} style={{ width: 70, height: 52, borderRadius: 10, border: "1px solid #e5e7eb" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 950 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{t.layout}</div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 12, fontWeight: 900 }}>OR Upload Template Schema (JSON)</div>
          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUploadSchema(f).catch(console.error);
            }}
          />

          <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>
            Preview shows template + sample data even before you click Generate.
          </div>

          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            style={{
              marginTop: 14,
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #1d4ed8",
              background: "#2563eb",
              color: "white",
              fontWeight: 950,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Generating..." : "Generate Resume"}
          </button>

          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={downloadPDF}
              disabled={!resumeId}
              style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900, opacity: resumeId ? 1 : 0.6 }}
            >
              Download PDF (editable text)
            </button>
            <button
              onClick={downloadDOCX}
              disabled={!resumeId}
              style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900, opacity: resumeId ? 1 : 0.6 }}
            >
              Download Word (editable)
            </button>
          </div>

          {resumeId ? (
            <div style={{ marginTop: 8, fontSize: 12, color: "#16a34a" }}>
              Export ready ✅ Resume ID: {resumeId}
            </div>
          ) : null}
        </div>

        {/* Right */}
        <div style={{ display: "grid", placeItems: "start center" }}>
          <div style={{ width: "100%", maxWidth: 900 }}>
            <div style={{ fontWeight: 950, marginBottom: 10 }}>Preview</div>
            <div ref={printRef}>
              {effectiveSchema ? (
                <ResumePreview schema={effectiveSchema} data={effectiveData} />
              ) : (
                <div style={{ padding: 16, background: "white", border: "1px solid #e5e7eb", borderRadius: 12 }}>
                  Select a template to see preview.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
