// src/pages/dashboard/TemplateDataEditor.tsx
import React from "react";

type SchemaSection = {
  enabled?: boolean;
  type?: string;
  dataKey?: string;
  label?: string;
  display?: string;
};

type Schema = {
  layout?: string;
  theme?: Record<string, any>;
  order?: string[];
  columns?: { left?: string[]; right?: string[] };
  sections?: Record<string, SchemaSection>;
};

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v ?? null));
}

function ensureObj(v: any) {
  return v && typeof v === "object" ? v : {};
}

function normalizeData(p: any) {
  const d = ensureObj(deepClone(p || {}));
  d.header = ensureObj(d.header || {});
  d.header.fullName ??= "";
  d.header.jobTitle ??= "";
  d.header.email ??= "";
  d.header.phone ??= "";
  d.header.location ??= "";
  d.header.linkedin ??= "";
  d.header.website ??= "";
  d.header.photoUrl ??= "";
  return d;
}

export default function TemplateDataEditor({
  schema,
  value,
  onChange,
}: {
  schema: Schema;
  value: any;
  onChange: (next: any) => void;
}) {
  const s = schema || {};
  const sections = s.sections || {};
  const data = normalizeData(value);

  const setDataKey = (key: string, nextVal: any) => {
    const next = deepClone(data);
    next[key] = nextVal;
    onChange(next);
  };

  const setHeader = (k: string, v: string) => {
    const next = deepClone(data);
    next.header = ensureObj(next.header);
    next.header[k] = v;
    onChange(next);
  };

  const renderHeaderEditor = () => (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Header</div>
      {(["fullName","jobTitle","email","phone","location","linkedin","website","photoUrl"] as const).map((k) => (
        <input
          key={k}
          value={(data.header?.[k] ?? "") as string}
          onChange={(e) => setHeader(k, e.target.value)}
          placeholder={k}
          style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 8 }}
        />
      ))}
    </div>
  );

  const renderTextEditor = (dk: string, label: string) => (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <div style={{ fontWeight: 900, marginBottom: 8 }}>{label}</div>
      <textarea
        value={data[dk] ?? ""}
        onChange={(e) => setDataKey(dk, e.target.value)}
        style={{ width: "100%", minHeight: 110, padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
      />
    </div>
  );

  const renderSkillsEditor = (dk: string, label: string) => {
    const skills = ensureObj(data[dk] || {});
    const toStr = (arr: any[]) => (Array.isArray(arr) ? arr.join(", ") : "");
    const setSkills = (k: string, str: string) => {
      const next = deepClone(data);
      next[dk] = ensureObj(next[dk] || {});
      next[dk][k] = str.split(",").map((x) => x.trim()).filter(Boolean);
      onChange(next);
    };
    return (
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>{label}</div>
        <input
          placeholder="programming (comma separated)"
          value={toStr(skills.programming)}
          onChange={(e) => setSkills("programming", e.target.value)}
          style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 8 }}
        />
        <input
          placeholder="frameworks (comma separated)"
          value={toStr(skills.frameworks)}
          onChange={(e) => setSkills("frameworks", e.target.value)}
          style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 8 }}
        />
        <input
          placeholder="tools (comma separated)"
          value={toStr(skills.tools)}
          onChange={(e) => setSkills("tools", e.target.value)}
          style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
        />
      </div>
    );
  };

  const renderTimelineEditor = (dk: string, label: string) => {
    const arr = Array.isArray(data[dk]) ? data[dk] : [];
    const setArr = (nextArr: any[]) => setDataKey(dk, nextArr);

    const addItem = () => {
      if (dk === "experience") setArr([...arr, { title: "", company: "", location: "", from: "", to: "", bullets: [""] }]);
      else if (dk === "education") setArr([...arr, { school: "", degree: "", location: "", from: "", to: "" }]);
      else if (dk === "projects") setArr([...arr, { name: "", desc: "" }]);
      else setArr([...arr, { title: "", subtitle: "", from: "", to: "", bullets: [""] }]);
    };

    const removeItem = (i: number) => {
      const next = [...arr];
      next.splice(i, 1);
      setArr(next.length ? next : []);
    };

    return (
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ fontWeight: 900 }}>{label}</div>
          <button onClick={addItem} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}>
            + Add
          </button>
        </div>

        <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
          {arr.map((it: any, idx: number) => (
            <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 900 }}>#{idx + 1}</div>
                <button onClick={() => removeItem(idx)} style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontWeight: 900 }}>
                  Remove
                </button>
              </div>

              {/* Experience */}
              {dk === "experience" && (
                <>
                  {(["title","company","location","from","to"] as const).map((k) => (
                    <input
                      key={k}
                      value={it[k] ?? ""}
                      onChange={(e) => {
                        const next = [...arr];
                        next[idx] = { ...next[idx], [k]: e.target.value };
                        setArr(next);
                      }}
                      placeholder={k}
                      style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginTop: 8 }}
                    />
                  ))}

                  <div style={{ marginTop: 10, fontWeight: 900, fontSize: 12 }}>Bullets</div>
                  {(Array.isArray(it.bullets) ? it.bullets : [""]).map((b: string, bi: number) => (
                    <div key={bi} style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <input
                        value={b}
                        onChange={(e) => {
                          const next = [...arr];
                          const bullets = Array.isArray(next[idx].bullets) ? [...next[idx].bullets] : [""];
                          bullets[bi] = e.target.value;
                          next[idx] = { ...next[idx], bullets };
                          setArr(next);
                        }}
                        placeholder={`bullet ${bi + 1}`}
                        style={{ flex: 1, padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
                      />
                      {bi > 0 && (
                        <button
                          onClick={() => {
                            const next = [...arr];
                            const bullets = [...(next[idx].bullets || [])];
                            bullets.splice(bi, 1);
                            next[idx] = { ...next[idx], bullets };
                            setArr(next);
                          }}
                          style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontWeight: 900 }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const next = [...arr];
                      const bullets = Array.isArray(next[idx].bullets) ? [...next[idx].bullets, ""] : [""];
                      next[idx] = { ...next[idx], bullets };
                      setArr(next);
                    }}
                    style={{ width: "100%", marginTop: 10, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
                  >
                    + Add Bullet
                  </button>
                </>
              )}

              {/* Education */}
              {dk === "education" && (
                <>
                  {(["school","degree","location","from","to"] as const).map((k) => (
                    <input
                      key={k}
                      value={it[k] ?? ""}
                      onChange={(e) => {
                        const next = [...arr];
                        next[idx] = { ...next[idx], [k]: e.target.value };
                        setArr(next);
                      }}
                      placeholder={k}
                      style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginTop: 8 }}
                    />
                  ))}
                </>
              )}

              {/* Projects */}
              {dk === "projects" && (
                <>
                  <input
                    value={it.name ?? ""}
                    onChange={(e) => {
                      const next = [...arr];
                      next[idx] = { ...next[idx], name: e.target.value };
                      setArr(next);
                    }}
                    placeholder="name"
                    style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginTop: 8 }}
                  />
                  <textarea
                    value={it.desc ?? ""}
                    onChange={(e) => {
                      const next = [...arr];
                      next[idx] = { ...next[idx], desc: e.target.value };
                      setArr(next);
                    }}
                    placeholder="desc"
                    style={{ width: "100%", minHeight: 90, padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginTop: 8 }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListOrGridEditor = (dk: string, label: string) => {
    const arr = Array.isArray(data[dk]) ? data[dk] : [];
    const setArr = (next: any[]) => setDataKey(dk, next);

    return (
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ fontWeight: 900 }}>{label}</div>
          <button
            onClick={() => setArr([...arr, { title: "", desc: "" }])}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
          >
            + Add
          </button>
        </div>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {arr.map((it: any, idx: number) => (
            <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 10 }}>
              <input
                value={it.title ?? ""}
                onChange={(e) => {
                  const next = [...arr];
                  next[idx] = { ...next[idx], title: e.target.value };
                  setArr(next);
                }}
                placeholder="title"
                style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
              />
              <textarea
                value={it.desc ?? ""}
                onChange={(e) => {
                  const next = [...arr];
                  next[idx] = { ...next[idx], desc: e.target.value };
                  setArr(next);
                }}
                placeholder="desc"
                style={{ width: "100%", minHeight: 80, padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginTop: 8 }}
              />
              <button
                onClick={() => {
                  const next = [...arr];
                  next.splice(idx, 1);
                  setArr(next);
                }}
                style={{ marginTop: 8, padding: "8px 10px", borderRadius: 10, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontWeight: 900 }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLanguagesEditor = (dk: string, label: string) => {
    const arr = Array.isArray(data[dk]) ? data[dk] : [];
    const setArr = (next: any[]) => setDataKey(dk, next);
    return (
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 900 }}>{label}</div>
          <button
            onClick={() => setArr([...arr, { name: "", level: "Beginner" }])}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
          >
            + Add
          </button>
        </div>
        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {arr.map((it: any, idx: number) => (
            <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 10 }}>
              <input
                value={it.name ?? ""}
                onChange={(e) => {
                  const next = [...arr];
                  next[idx] = { ...next[idx], name: e.target.value };
                  setArr(next);
                }}
                placeholder="Language"
                style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10 }}
              />
              <input
                value={it.level ?? ""}
                onChange={(e) => {
                  const next = [...arr];
                  next[idx] = { ...next[idx], level: e.target.value };
                  setArr(next);
                }}
                placeholder="Level (Beginner/Intermediate/Advanced/Native or 1-5)"
                style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 10, marginTop: 8 }}
              />
              <button
                onClick={() => {
                  const next = [...arr];
                  next.splice(idx, 1);
                  setArr(next);
                }}
                style={{ marginTop: 8, padding: "8px 10px", borderRadius: 10, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontWeight: 900 }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSectionEditor = (secId: string) => {
    const cfg = sections[secId] || {};
    if (cfg.enabled === false) return null;
    const type = cfg.type || secId;
    const dk = cfg.dataKey || secId;
    const label = cfg.label || secId.toUpperCase();

    if (type === "header") return renderHeaderEditor();
    if (type === "contacts" || type === "avatar") return null; // header handles the data
    if (type === "text") return renderTextEditor(dk, label);
    if (type === "skills") return renderSkillsEditor(dk, label);
    if (type === "timeline") return renderTimelineEditor(dk, label);
    if (type === "languages") return renderLanguagesEditor(dk, label);
    if (type === "list" || type === "grid") return renderListOrGridEditor(dk, label);

    return renderListOrGridEditor(dk, label);
  };

  // show editors in schema order
  const order =
    s.layout?.toLowerCase().includes("two column") || s.layout?.toLowerCase().includes("sidebar")
      ? Array.from(new Set([...(s.columns?.left || []), ...(s.columns?.right || [])]))
      : (s.order || []);

  const finalOrder = order.length ? order : Object.keys(sections);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {finalOrder.map((secId) => (
        <React.Fragment key={secId}>{renderSectionEditor(secId)}</React.Fragment>
      ))}
    </div>
  );
}
