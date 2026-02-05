// AdminTemplateJsonStudio.tsx
import { useMemo, useState } from "react";
import ResumePreview from "./ResumePreview";

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.escapenormie.cloud";

/** -----------------------------
 *  AUTH HELPERS
 *  ----------------------------- */
function getAdminToken() {
  return (
    localStorage.getItem("admin_access") ||
    localStorage.getItem("access") ||
    localStorage.getItem("token") ||
    ""
  );
}

function buildAuthHeaders(extra?: Record<string, string>) {
  const token = getAdminToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra || {}),
  };
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** ---------------------------------------------------------
 *  EXTERNAL TEMPLATE JSON DETECTION
 *  external format example:
 *  {
 *    template_id, template_name,
 *    layout:{type,left_width,right_width,...},
 *    theme:{...},
 *    left_sidebar:{sections:[]},
 *    right_content:{sections:[]}
 *  }
 *  --------------------------------------------------------- */
function isExternalTemplate(obj: any) {
  return (
    obj &&
    typeof obj === "object" &&
    obj.layout &&
    typeof obj.layout === "object" &&
    (obj.left_sidebar || obj.right_content || obj.template_id || obj.template_name)
  );
}

function mapLayout(layoutObj: any) {
  const t = String(layoutObj?.type || "").toLowerCase().trim();
  if (["two_column", "two-column", "2col", "two col"].includes(t)) return "Two Column";
  if (["single_column", "single-column", "1col", "single col"].includes(t)) return "Single Column";
  if (["sidebar_left", "sidebar-left", "left_sidebar", "left-sidebar"].includes(t)) return "Sidebar Left";
  if (["sidebar_right", "sidebar-right", "right_sidebar", "right-sidebar"].includes(t)) return "Sidebar Right";
  return "Two Column";
}

/** ---------------------------------------------------------
 *  EXTERNAL -> INTERNAL (NON-DESTRUCTIVE THEME)
 *  IMPORTANT: DO NOT FORCE "card/underline" etc.
 *  --------------------------------------------------------- */
function externalToInternalSchema(external: any) {
  const layoutObj = external?.layout || {};
  const layout = mapLayout(layoutObj);

  const themeObj = external?.theme || {};
  const primary =
    themeObj?.primary_color ||
    themeObj?.primary ||
    themeObj?.primaryColor ||
    external?.color ||
    "#2563eb";

  const leftList = external?.left_sidebar?.sections || [];
  const rightList = external?.right_content?.sections || [];

  const typeToId: Record<string, string> = {
    profile: "sidebarProfile",
    avatar: "sidebarProfile",
    contacts: "contacts",
    header: "header",
    summary: "summary",
    experience: "experience",
    education: "education",
    skills: "skills",
    projects: "projects",
    courses: "courses",
    languages: "languages",
    achievements: "achievements",
    strengths: "strengths",
    interests: "interests",
    volunteering: "volunteering",
    certifications: "certifications",
  };

  const idToType: Record<string, string> = {
    header: "header",
    sidebarProfile: "avatar",
    contacts: "contacts",
    summary: "text",
    experience: "timeline",
    education: "timeline",
    projects: "timeline",
    skills: "skills",
    courses: "list",
    languages: "languages",
    achievements: "list",
    strengths: "list",
    interests: "list",
    volunteering: "timeline",
    certifications: "list",
  };

  const left: string[] = [];
  const right: string[] = [];

  for (const it of leftList) {
    const t = String(it?.type || "").toLowerCase().trim();
    const sid = typeToId[t];
    if (sid && !left.includes(sid)) left.push(sid);
  }

  for (const it of rightList) {
    const t = String(it?.type || "").toLowerCase().trim();
    const sid = typeToId[t];
    if (sid && !right.includes(sid)) right.push(sid);
  }

  // ensure header exists somewhere
  if (!left.includes("header") && !right.includes("header")) right.unshift("header");

  const sections: any = {};
  for (const sid of [...left, ...right]) {
    sections[sid] = {
      enabled: true,
      type: idToType[sid] || "list",
      dataKey: ["header", "contacts", "sidebarProfile"].includes(sid) ? "header" : sid,
      label: sid.toUpperCase(),
    };
  }

  // labels (if external provides)
  for (const it of [...leftList, ...rightList]) {
    const t = String(it?.type || "").toLowerCase().trim();
    const sid = typeToId[t];
    if (sid && sections[sid]) {
      if (it?.label) sections[sid].label = String(it.label);
    }
  }

  // order (single-column fallback)
  const base = ["header", "summary", "experience", "education", "skills", "projects", "courses", "languages"];
  const order = [
    ...base.filter((x) => sections[x]),
    ...Object.keys(sections).filter((x) => !base.includes(x)),
  ];

  const internalTheme = {
    // preserve as much as possible
    primary,
    mutedColor: themeObj?.mutedColor || themeObj?.muted_text || "#6b7280",
    textColor: themeObj?.textColor || themeObj?.text_dark || "#111827",

    // allow these from external theme if exist
    paperVariant: themeObj?.paperVariant,
    cardRadius: themeObj?.cardRadius,
    cardPadding: themeObj?.cardPadding,
    headingVariant: themeObj?.headingVariant,
    headingUppercase: themeObj?.headingUppercase,
    titleSize: themeObj?.titleSize,
    bodySize: themeObj?.bodySize,
    lineHeight: themeObj?.lineHeight,
    fontFamily: themeObj?.fontFamily,
    headerVariant: themeObj?.headerVariant,
    pattern: themeObj?.pattern,

    // sidebar colors (external specific)
    sidebarBg:
      external?.left_sidebar?.background_color ||
      external?.left_sidebar?.background ||
      themeObj?.sidebarBg ||
      "#f8fafc",
    sidebarText:
      external?.left_sidebar?.text_color ||
      themeObj?.sidebarText ||
      "#0f172a",
    sidebarAccent:
      themeObj?.sidebarAccent ||
      primary,
  };

  // remove undefined keys (clean)
  Object.keys(internalTheme).forEach((k) => {
    if ((internalTheme as any)[k] === undefined) delete (internalTheme as any)[k];
  });

  return {
    version: 2,
    layout,
    theme: internalTheme,
    order,
    columns: { left, right },
    sections,
  };
}

/** -----------------------------
 *  FRONTEND SCHEMA NORMALIZER
 *  (always returns INTERNAL schema object)
 *  ----------------------------- */
function normalizeAnySchema(schema: any) {
  if (!schema || typeof schema !== "object") return {};

  // if external shape, convert first
  const maybeConverted =
    isExternalTemplate(schema) && !schema.sections ? externalToInternalSchema(schema) : schema;

  const s: any = { ...maybeConverted };

  s.version = s.version ?? 2;
  s.layout = s.layout ?? "Single Column";
  s.theme = s.theme ?? {};
  s.order = Array.isArray(s.order) ? s.order : [];
  s.columns = s.columns ?? { left: [], right: [] };
  s.sections = s.sections ?? {};

  const sections = s.sections && typeof s.sections === "object" ? s.sections : {};

  // ONLY ensure minimal required exist (don’t overwrite existing)
  const ensure = (id: string, type: string, dataKey?: string) => {
    const cfg =
      sections[id] && typeof sections[id] === "object" ? { ...sections[id] } : {};
    cfg.enabled = cfg.enabled !== false;
    cfg.type = cfg.type || type;
    if (dataKey) cfg.dataKey = cfg.dataKey || dataKey;
    sections[id] = cfg;
  };

  ensure("header", "header", "header");
  ensure("summary", "text", "summary");
  ensure("experience", "timeline", "experience");
  ensure("education", "timeline", "education");
  ensure("skills", "skills", "skills");

  // IMPORTANT: projects force mat karo (har template me hona zaroori nahi)
  // ensure("projects", "timeline", "projects");

  s.sections = sections;

  delete s.id;
  return s;
}

/** -----------------------------
 *  Accept both:
 *  1) FULL TEMPLATE JSON (has schema key)
 *  2) SCHEMA JSON only (internal OR external shape)
 *  ----------------------------- */
function pickTemplateMetaAndSchema(parsed: any) {
  const isFullTemplate =
    parsed &&
    typeof parsed === "object" &&
    (Object.prototype.hasOwnProperty.call(parsed, "schema") ||
      Object.prototype.hasOwnProperty.call(parsed, "name") ||
      Object.prototype.hasOwnProperty.call(parsed, "category") ||
      Object.prototype.hasOwnProperty.call(parsed, "template_name") ||
      Object.prototype.hasOwnProperty.call(parsed, "template_id"));

  const rawSchema =
    isFullTemplate && parsed?.schema && typeof parsed.schema === "object" ? parsed.schema : parsed;

  const normalizedSchema = normalizeAnySchema(rawSchema);

  // meta values
  const name =
    parsed?.template_name ||
    parsed?.name ||
    "Imported Template";

  const category =
    parsed?.category ||
    "Modern";

  const color =
    parsed?.color ||
    parsed?.theme?.primary_color ||
    parsed?.theme?.primary ||
    normalizedSchema?.theme?.primary ||
    "#2563eb";

  const description =
    parsed?.description ||
    "";

  // IMPORTANT: layout meta should be STRING (from normalized schema)
  const layout = normalizedSchema?.layout || "Single Column";

  return {
    meta: { name, category, layout, color, description },
    schema: normalizedSchema,
  };
}

function sanitizeCreatePayload(payload: any) {
  const out = { ...payload };
  delete out.id;
  delete out.downloads;
  delete out.rating;
  delete out.preview_image;
  delete out.updated;
  delete out.updated_at;
  delete out.created_at;
  return out;
}

type Props = {
  selectedTemplate?: any;
};

export default function AdminTemplateJsonStudio({ selectedTemplate }: Props) {
  const [jsonText, setJsonText] = useState("");
  const [schema, setSchema] = useState<any>(selectedTemplate?.schema || {});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const previewSchema = useMemo(() => normalizeAnySchema(schema), [schema]);

  const applyJson = () => {
    setError("");
    const parsed = safeJson(jsonText);
    if (!parsed) {
      setError("Invalid JSON ❌ (JSON me JS/React code mat daalo)");
      return;
    }
    const picked = pickTemplateMetaAndSchema(parsed);
    setSchema(picked.schema);
  };

  async function createNewFromJson() {
    setError("");

    const raw = (jsonText || "").trim();
    if (!raw) {
      setError("JSON paste karo ❌");
      return;
    }

    const parsed = safeJson(raw);
    if (!parsed) {
      setError("Invalid JSON ❌ (JSON me JS/React code mat daalo)");
      return;
    }

    const picked = pickTemplateMetaAndSchema(parsed);

    const payload = sanitizeCreatePayload({
      ...picked.meta,
      schema: picked.schema,
    });

    if (payload.schema?.id) delete payload.schema.id;

    try {
      setSaving(true);

      const res = await fetch(`${API_BASE}/api/auth/admin/templates/import/`, {
        method: "POST",
        headers: buildAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("IMPORT ERROR", res.status, data);
        setError(data?.detail || "Import failed");
        return;
      }

      alert(`Template created: ${data?.name || "OK"}`);

      // Update preview using backend-normalized schema (if returned)
      if (data?.schema) setSchema(data.schema);
    } catch (e: any) {
      console.error(e);
      setError("Something went wrong (network/server)");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 18 }}>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>Paste Template JSON</div>

        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder="Paste FULL template JSON or schema JSON here..."
          style={{
            width: "100%",
            minHeight: 320,
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 10,
            fontFamily: "monospace",
            fontSize: 12,
          }}
        />

        {error ? (
          <div style={{ marginTop: 10, color: "crimson", fontSize: 13 }}>{error}</div>
        ) : null}

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button
            onClick={applyJson}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #111827",
              background: "#111827",
              color: "white",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Apply JSON (Preview)
          </button>

          <button
            disabled={saving}
            onClick={createNewFromJson}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #2563eb",
              background: saving ? "#93c5fd" : "#2563eb",
              color: "white",
              fontWeight: 900,
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Creating..." : "Create New From JSON"}
          </button>
        </div>

        <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
          ✅ Apply JSON = only preview <br />
          ✅ Create New = saves new template in /admin/templates/ list
        </div>

        <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
          Tip: JSON should be pure data. React/JS code inside JSON = Invalid ❌
        </div>
      </div>

      <div style={{ overflow: "auto", padding: 8 }}>
        <ResumePreview schema={previewSchema} data={{}} />
      </div>
    </div>
  );
}
