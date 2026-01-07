import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import ResumePreview from "./ResumePreview";

type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

function authHeaders() {
  const token = localStorage.getItem("access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const SECTION_LABELS: Record<string, string> = {
  header: "Header",
  summary: "Professional Summary",
  experience: "Work Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
};

function ensureSchema(template: any) {
  const schema = template?.schema || {};
  const layout = (schema.layout || template.layout || "Single Column") as Layout;
  return {
    version: schema.version ?? 1,
    layout,
    theme: {
      primary: schema?.theme?.primary || template.color || "#2563eb",
      fontFamily: schema?.theme?.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      headingUppercase: schema?.theme?.headingUppercase ?? true,
      titleSize: schema?.theme?.titleSize ?? 12,
      bodySize: schema?.theme?.bodySize ?? 10,
      lineHeight: schema?.theme?.lineHeight ?? 1.35,
    },
    order: schema.order || ["header", "summary", "experience", "education", "skills", "projects"],
    columns: schema.columns || { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] },
    sections: {
      header: { enabled: true },
      summary: { enabled: true },
      experience: { enabled: true },
      education: { enabled: true },
      skills: { enabled: true },
      projects: { enabled: true },
      certifications: { enabled: false },
      languages: { enabled: false },
      ...(schema.sections || {}),
    },
  };
}

export default function AdminTemplateBuilder() {
  const { id } = useParams();
  const templateId = Number(id);
  const nav = useNavigate();

  const [tpl, setTpl] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);
  const [tab, setTab] = useState<"sections" | "design" | "json">("sections");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
    setTpl(res.data);
    setSchema(ensureSchema(res.data));
  };

  useEffect(() => {
    if (!templateId) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const save = async () => {
    if (!tpl) return;
    setSaving(true);
    try {
      const payload = {
        name: tpl.name,
        category: tpl.category,
        layout: schema.layout,
        status: tpl.status,
        color: schema?.theme?.primary || tpl.color,
        description: tpl.description || "",
        schema,
      };
      const res = await axios.put(`/auth/admin/templates/${tpl.id}/`, payload, { headers: authHeaders() });
      setTpl(res.data);
      setSchema(ensureSchema(res.data));
      alert("Saved ✅");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (key: string) => {
    setSchema((p: any) => ({
      ...p,
      sections: { ...p.sections, [key]: { ...(p.sections?.[key] || {}), enabled: !p.sections?.[key]?.enabled } },
    }));
  };

  const setLayout = (layout: Layout) => {
    setSchema((p: any) => {
      const next = { ...p, layout };
      if (layout === "Single Column") {
        const merged = Array.from(new Set([...(p.order || []), ...(p.columns?.left || []), ...(p.columns?.right || [])]));
        next.order = merged.length ? merged : ["header", "summary", "experience", "education", "skills", "projects"];
      }
      return next;
    });
  };

  if (!tpl || !schema) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 18 }}>{tpl.name}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Canvas Builder • {schema.layout}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
          <button onClick={save} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr 520px", gap: 14, padding: 14 }}>
        {/* Left */}
        <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button onClick={() => setTab("sections")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "sections" ? "#f3f4f6" : "white", fontWeight: 900 }}>Sections</button>
            <button onClick={() => setTab("design")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "design" ? "#f3f4f6" : "white", fontWeight: 900 }}>Design</button>
            <button onClick={() => setTab("json")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "json" ? "#f3f4f6" : "white", fontWeight: 900 }}>JSON</button>
          </div>

          {tab === "design" && (
            <div style={{ display: "grid", gap: 10 }}>
              <label style={{ fontWeight: 900, fontSize: 12 }}>Layout</label>
              <select value={schema.layout} onChange={(e) => setLayout(e.target.value as Layout)} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
                <option>Single Column</option>
                <option>Two Column</option>
                <option>Sidebar Left</option>
                <option>Sidebar Right</option>
              </select>

              <label style={{ fontWeight: 900, fontSize: 12 }}>Primary Color</label>
              <input type="color" value={schema.theme.primary} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, primary: e.target.value } }))} />

              <label style={{ fontWeight: 900, fontSize: 12 }}>Heading Uppercase</label>
              <input type="checkbox" checked={!!schema.theme.headingUppercase} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, headingUppercase: e.target.checked } }))} />
            </div>
          )}

          {tab === "sections" && (
            <div style={{ display: "grid", gap: 8 }}>
              {Object.keys(SECTION_LABELS).map((k) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, border: "1px solid #eef2f7", borderRadius: 12 }}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{SECTION_LABELS[k]}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{k}</div>
                  </div>
                  <button onClick={() => toggleSection(k)} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: schema.sections?.[k]?.enabled ? "#dcfce7" : "white", fontWeight: 900 }}>
                    {schema.sections?.[k]?.enabled ? "ON" : "OFF"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "json" && (
            <textarea value={JSON.stringify(schema, null, 2)} onChange={(e) => setSchema(JSON.parse(e.target.value || "{}"))} style={{ width: "100%", height: 520, padding: 10, borderRadius: 12, border: "1px solid #e5e7eb", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }} />
          )}
        </div>

        {/* Middle */}
        <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Template Meta</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input value={tpl.name} onChange={(e) => setTpl((p: any) => ({ ...p, name: e.target.value }))} placeholder="Template name" style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
            <select value={tpl.status} onChange={(e) => setTpl((p: any) => ({ ...p, status: e.target.value }))} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
              <option value="active">active</option>
              <option value="draft">draft</option>
            </select>
          </div>
          <div style={{ marginTop: 10 }}>
            <textarea value={tpl.description || ""} onChange={(e) => setTpl((p: any) => ({ ...p, description: e.target.value }))} placeholder="Description" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 90 }} />
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "grid", placeItems: "start center" }}>
          <div>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>Live Preview</div>
            <ResumePreview schema={schema} />
          </div>
        </div>
      </div>
    </div>
  );
}
