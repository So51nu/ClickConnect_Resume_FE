// src/pages/dashboard/AdminTemplateBuilder.tsx
import React, { useEffect, useMemo, useState } from "react";
import {useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import ResumePreview from "./ResumePreview";

type Layout = "Single Column" | "Two Column" | "Sidebar Left" | "Sidebar Right";

function authHeaders() {
  const token = localStorage.getItem("admin_access") || localStorage.getItem("access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Minimal safe schema normalizer for builder UI
function ensureSchema(input: any) {
  const s = (input?.schema && typeof input.schema === "object") ? input.schema : (typeof input?.schema === "string" ? safeJson(input.schema) : {});

  const layout: Layout = (s.layout as Layout) || input?.layout || "Two Column";

  const sections = { ...(s.sections || {}) };
  const ensure = (id: string, enabledDefault: boolean) => {
    const cfg = (sections[id] && typeof sections[id] === "object") ? sections[id] : {};
    if (cfg.enabled === undefined) cfg.enabled = enabledDefault;
    sections[id] = cfg;
  };

  ensure("header", true);
  ensure("summary", true);
  ensure("experience", true);
  ensure("education", true);
  ensure("skills", true);
  ensure("projects", true);
  ensure("certifications", false);
  ensure("languages", false);
  ensure("interests", false);
  ensure("strengths", false);
  ensure("achievements", false);
  ensure("courses", false);
  ensure("contacts", false);
  ensure("sidebarProfile", false);

  const theme = {
    primary: input?.color || s?.theme?.primary || "#2563eb",
    fontFamily: s?.theme?.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    headingUppercase: s?.theme?.headingUppercase ?? true,
    titleSize: s?.theme?.titleSize ?? 12,
    bodySize: s?.theme?.bodySize ?? 10,
    lineHeight: s?.theme?.lineHeight ?? 1.45,
    headingVariant: s?.theme?.headingVariant || "underline",
    headerVariant: s?.theme?.headerVariant || "classic",
    pattern: s?.theme?.pattern || "none",
    sidebarBg: s?.theme?.sidebarBg || "#f8fafc",
    sidebarTextColor: s?.theme?.sidebarTextColor || "#111827",
    ...((s?.theme && typeof s.theme === "object") ? s.theme : {}),
  };

  const baseOrder = ["header", "summary", "experience", "education", "skills", "projects"];
  const order = Array.isArray(s.order) && s.order.length ? s.order : baseOrder;

  const columns = s.columns || {
    left: ["summary", "skills", "education"],
    right: ["header", "experience", "projects"],
  };

  return {
    version: s.version ?? 1,
    layout,
    theme,
    order,
    columns,
    sections,
  };
}

function safeJson(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
}

// Sample data for preview
const PREVIEW_DATA = {
  header: {
    fullName: "Vishal Gupta",
    jobTitle: "Software Engineer",
    email: "vishal@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, IN",
    linkedin: "linkedin.com/in/vishalgupta",
    website: "vishal.dev",
  },
  summary:
    "Results-driven engineer with experience building scalable web apps. Skilled in React, Node, and clean UI systems.",
  experience: [
    {
      title: "Frontend Developer",
      company: "VibeConnect",
      location: "Remote",
      from: "2023-01",
      to: "Present",
      bullets: [
        "Built reusable UI systems improving dev speed by 30%.",
        "Optimized dashboards and reduced render time significantly.",
      ],
    },
  ],
  education: [
    {
      school: "University",
      degree: "B.Tech Computer Science",
      from: "2018",
      to: "2022",
    },
  ],
  skills: {
    programming: ["JavaScript", "TypeScript", "Python"],
    frameworks: ["React", "Next.js"],
    tools: ["Git", "Docker"],
  },
  projects: [{ name: "Resume Builder", desc: "Template-driven resume builder with export to PDF." }],
};

const ALL_SECTIONS = [
  "header",
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
  "interests",
  "strengths",
  "achievements",
  "courses",
  "contacts",
  "sidebarProfile",
];

export default function AdminTemplateBuilder() {
  const { id } = useParams();
  const templateId = Number(id);
  //const nav = useNavigate();

  const [tpl, setTpl] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);
  const [tab, setTab] = useState<"sections" | "design" | "json">("sections");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
      setTpl(res.data);
      setSchema(ensureSchema(res.data));
    };
    if (templateId) load().catch(console.error);
  }, [templateId]);

  const enabledSections = useMemo(() => {
    const s = schema?.sections || {};
    return ALL_SECTIONS.filter((id) => s?.[id]?.enabled !== false);
  }, [schema]);

  const save = async () => {
    if (!tpl || !schema) return;
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

  const toggle = (id: string) => {
    setSchema((p: any) => ({
      ...p,
      sections: {
        ...p.sections,
        [id]: { ...(p.sections?.[id] || {}), enabled: !(p.sections?.[id]?.enabled !== false) },
      },
    }));
  };

  const setLayout = (layout: Layout) => {
    setSchema((p: any) => {
      const next = { ...p, layout };
      // Make sure the schema is consistent with layout
      if (layout === "Single Column") {
        next.order = (p.order?.length ? p.order : ["header", "summary", "experience", "education", "skills", "projects"]).slice();
      } else if (layout === "Two Column") {
        next.columns = p.columns || { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] };
      } else {
        // sidebar
        next.columns = p.columns || { left: ["header", "skills", "education"], right: ["summary", "experience", "projects"] };
      }
      return next;
    });
  };

  const move = (id: string, dir: -1 | 1) => {
    setSchema((p: any) => {
      const order = Array.isArray(p.order) ? [...p.order] : [];
      const i = order.indexOf(id);
      if (i === -1) return p;
      const j = i + dir;
      if (j < 0 || j >= order.length) return p;
      [order[i], order[j]] = [order[j], order[i]];
      return { ...p, order };
    });
  };

  const setTheme = (k: string, v: any) => {
    setSchema((p: any) => ({ ...p, theme: { ...(p.theme || {}), [k]: v } }));
  };

  if (!tpl || !schema) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: 18 }}>{tpl.name}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Template Builder • {schema.layout}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {/* <button
            onClick={() => nav("/admin/templates")}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}
          >
            Back
          </button> */}
          <button
            onClick={save}
            disabled={saving}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px 360px 1fr", gap: 16, padding: 16 }}>
        {/* Left panel */}
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 14 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {(["sections", "design", "json"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  background: tab === t ? "#2563eb" : "white",
                  color: tab === t ? "white" : "#111827",
                  fontWeight: 900,
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {tab === "sections" && (
            <div>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Enable/Disable Sections</div>
              <div style={{ display: "grid", gap: 10 }}>
                {ALL_SECTIONS.map((id) => {
                  const enabled = schema?.sections?.[id]?.enabled !== false;
                  return (
                    <label key={id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <input type="checkbox" checked={enabled} onChange={() => toggle(id)} />
                      <span style={{ fontWeight: 800, textTransform: "capitalize" }}>{id}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "design" && (
            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>Layout</div>
                <select
                  value={schema.layout}
                  onChange={(e) => setLayout(e.target.value as Layout)}
                  style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }}
                >
                  <option value="Single Column">Single Column</option>
                  <option value="Two Column">Two Column</option>
                  <option value="Sidebar Left">Sidebar Left</option>
                  <option value="Sidebar Right">Sidebar Right</option>
                </select>
              </div>

              <div>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>Primary Color</div>
                <input
                  type="color"
                  value={schema.theme.primary || "#2563eb"}
                  onChange={(e) => setTheme("primary", e.target.value)}
                  style={{ width: "100%", height: 44, borderRadius: 12, border: "1px solid #e5e7eb", padding: 6 }}
                />
              </div>

              <div>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>Header Variant</div>
                <select
                  value={schema.theme.headerVariant || "classic"}
                  onChange={(e) => setTheme("headerVariant", e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }}
                >
                  <option value="classic">classic</option>
                  <option value="centered">centered</option>
                  <option value="split">split</option>
                  <option value="banner">banner</option>
                  <option value="compact">compact</option>
                </select>
              </div>

              <div>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>Section Heading</div>
                <select
                  value={schema.theme.headingVariant || "underline"}
                  onChange={(e) => setTheme("headingVariant", e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }}
                >
                  <option value="underline">underline</option>
                  <option value="bar">bar</option>
                  <option value="pill">pill</option>
                  <option value="boxed">boxed</option>
                  <option value="leftBorder">leftBorder</option>
                </select>
              </div>

              <div>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>Background Pattern</div>
                <select
                  value={schema.theme.pattern || "none"}
                  onChange={(e) => setTheme("pattern", e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }}
                >
                  <option value="none">none</option>
                  <option value="dots">dots</option>
                  <option value="grid">grid</option>
                  <option value="stripes">stripes</option>
                </select>
              </div>
            </div>
          )}

          {tab === "json" && (
            <div>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>Schema JSON</div>
              <textarea
                value={JSON.stringify(schema, null, 2)}
                onChange={(e) => {
                  const next = safeJson(e.target.value);
                  setSchema((p: any) => ({ ...p, ...next }));
                }}
                style={{ width: "100%", minHeight: 520, padding: 12, borderRadius: 12, border: "1px solid #e5e7eb", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }}
              />
            </div>
          )}
        </div>

        {/* Middle panel */}
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 14 }}>
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Order / Columns</div>

          {schema.layout === "Single Column" ? (
            <div style={{ display: "grid", gap: 10 }}>
              {(schema.order || []).map((id: string, idx: number) => (
                <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 12 }}>
                  <div style={{ fontWeight: 800 }}>{idx + 1}. {id}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => move(id, -1)} style={miniBtn}>↑</button>
                    <button onClick={() => move(id, 1)} style={miniBtn}>↓</button>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 12, color: "#6b7280" }}>Tip: Enable sections on left to show them here.</div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <ColumnEditor
                  title="Left"
                  items={schema.columns?.left || []}
                  all={enabledSections}
                  onChange={(next) => setSchema((p: any) => ({ ...p, columns: { ...(p.columns || {}), left: next } }))}
                />
                <ColumnEditor
                  title="Right"
                  items={schema.columns?.right || []}
                  all={enabledSections}
                  onChange={(next) => setSchema((p: any) => ({ ...p, columns: { ...(p.columns || {}), right: next } }))}
                />
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Tip: Column lists define rendering order for Two Column / Sidebar layouts.
              </div>
            </div>
          )}
        </div>

        {/* Right preview */}
        <div style={{ display: "grid", placeItems: "start center" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>Live Preview</div>
            <div style={{ transformOrigin: "top center" }}>
              <ResumePreview schema={schema} data={PREVIEW_DATA} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const miniBtn: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "white",
  fontWeight: 900,
  cursor: "pointer",
};

function ColumnEditor({
  title,
  items,
  all,
  onChange,
}: {
  title: string;
  items: string[];
  all: string[];
  onChange: (next: string[]) => void;
}) {
  const add = (id: string) => {
    if (items.includes(id)) return;
    onChange([...items, id]);
  };

  const remove = (id: string) => {
    onChange(items.filter((x) => x !== id));
  };

  const move = (id: string, dir: -1 | 1) => {
    const order = [...items];
    const i = order.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= order.length) return;
    [order[i], order[j]] = [order[j], order[i]];
    onChange(order);
  };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: 12 }}>
      <div style={{ fontWeight: 900, marginBottom: 8 }}>{title} Column</div>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((id) => (
          <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 12 }}>
            <div style={{ fontWeight: 800 }}>{id}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => move(id, -1)} style={miniBtn}>↑</button>
              <button onClick={() => move(id, 1)} style={miniBtn}>↓</button>
              <button onClick={() => remove(id)} style={{ ...miniBtn, border: "1px solid #fecaca", color: "#991b1b" }}>✕</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 12, marginBottom: 6 }}>Add section</div>
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) add(e.target.value);
          }}
          style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }}
        >
          <option value="">Select…</option>
          {all
            .filter((id) => !items.includes(id))
            .map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
