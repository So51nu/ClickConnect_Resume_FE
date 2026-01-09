// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useNavigate, useParams } from "react-router-dom";
// // // // // import axios from "../../api/axiosInstance";
// // // // // import ResumePreview from "./ResumePreview";

// // // // // type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

// // // // // function authHeaders() {
// // // // //   const token = localStorage.getItem("access") || "";
// // // // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // // // }

// // // // // const SECTION_LABELS: Record<string, string> = {
// // // // //   header: "Header",
// // // // //   summary: "Professional Summary",
// // // // //   experience: "Work Experience",
// // // // //   education: "Education",
// // // // //   skills: "Skills",
// // // // //   projects: "Projects",
// // // // //   certifications: "Certifications",
// // // // //   languages: "Languages",
// // // // // };

// // // // // function ensureSchema(template: any) {
// // // // //   const schema = template?.schema || {};
// // // // //   const layout = (schema.layout || template.layout || "Single Column") as Layout;
// // // // //   return {
// // // // //     version: schema.version ?? 1,
// // // // //     layout,
// // // // //     theme: {
// // // // //       primary: schema?.theme?.primary || template.color || "#2563eb",
// // // // //       fontFamily: schema?.theme?.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// // // // //       headingUppercase: schema?.theme?.headingUppercase ?? true,
// // // // //       titleSize: schema?.theme?.titleSize ?? 12,
// // // // //       bodySize: schema?.theme?.bodySize ?? 10,
// // // // //       lineHeight: schema?.theme?.lineHeight ?? 1.35,
// // // // //     },
// // // // //     order: schema.order || ["header", "summary", "experience", "education", "skills", "projects"],
// // // // //     columns: schema.columns || { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] },
// // // // //     sections: {
// // // // //       header: { enabled: true },
// // // // //       summary: { enabled: true },
// // // // //       experience: { enabled: true },
// // // // //       education: { enabled: true },
// // // // //       skills: { enabled: true },
// // // // //       projects: { enabled: true },
// // // // //       certifications: { enabled: false },
// // // // //       languages: { enabled: false },
// // // // //       ...(schema.sections || {}),
// // // // //     },
// // // // //   };
// // // // // }

// // // // // export default function AdminTemplateBuilder() {
// // // // //   const { id } = useParams();
// // // // //   const templateId = Number(id);
// // // // //   const nav = useNavigate();

// // // // //   const [tpl, setTpl] = useState<any>(null);
// // // // //   const [schema, setSchema] = useState<any>(null);
// // // // //   const [tab, setTab] = useState<"sections" | "design" | "json">("sections");
// // // // //   const [saving, setSaving] = useState(false);

// // // // //   const load = async () => {
// // // // //     const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// // // // //     setTpl(res.data);
// // // // //     setSchema(ensureSchema(res.data));
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (!templateId) return;
// // // // //     load();
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [templateId]);

// // // // //   const save = async () => {
// // // // //     if (!tpl) return;
// // // // //     setSaving(true);
// // // // //     try {
// // // // //       const payload = {
// // // // //         name: tpl.name,
// // // // //         category: tpl.category,
// // // // //         layout: schema.layout,
// // // // //         status: tpl.status,
// // // // //         color: schema?.theme?.primary || tpl.color,
// // // // //         description: tpl.description || "",
// // // // //         schema,
// // // // //       };
// // // // //       const res = await axios.put(`/auth/admin/templates/${tpl.id}/`, payload, { headers: authHeaders() });
// // // // //       setTpl(res.data);
// // // // //       setSchema(ensureSchema(res.data));
// // // // //       alert("Saved ✅");
// // // // //     } finally {
// // // // //       setSaving(false);
// // // // //     }
// // // // //   };

// // // // //   const toggleSection = (key: string) => {
// // // // //     setSchema((p: any) => ({
// // // // //       ...p,
// // // // //       sections: { ...p.sections, [key]: { ...(p.sections?.[key] || {}), enabled: !p.sections?.[key]?.enabled } },
// // // // //     }));
// // // // //   };

// // // // //   const setLayout = (layout: Layout) => {
// // // // //     setSchema((p: any) => {
// // // // //       const next = { ...p, layout };
// // // // //       if (layout === "Single Column") {
// // // // //         const merged = Array.from(new Set([...(p.order || []), ...(p.columns?.left || []), ...(p.columns?.right || [])]));
// // // // //         next.order = merged.length ? merged : ["header", "summary", "experience", "education", "skills", "projects"];
// // // // //       }
// // // // //       return next;
// // // // //     });
// // // // //   };

// // // // //   if (!tpl || !schema) return <div style={{ padding: 20 }}>Loading...</div>;

// // // // //   return (
// // // // //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// // // // //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
// // // // //         <div>
// // // // //           <div style={{ fontWeight: 900, fontSize: 18 }}>{tpl.name}</div>
// // // // //           <div style={{ fontSize: 12, color: "#6b7280" }}>Canvas Builder • {schema.layout}</div>
// // // // //         </div>
// // // // //         <div style={{ display: "flex", gap: 8 }}>
// // // // //           <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
// // // // //           <button onClick={save} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>
// // // // //             {saving ? "Saving..." : "Save"}
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div style={{ display: "grid", gridTemplateColumns: "360px 1fr 520px", gap: 14, padding: 14 }}>
// // // // //         {/* Left */}
// // // // //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
// // // // //           <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
// // // // //             <button onClick={() => setTab("sections")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "sections" ? "#f3f4f6" : "white", fontWeight: 900 }}>Sections</button>
// // // // //             <button onClick={() => setTab("design")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "design" ? "#f3f4f6" : "white", fontWeight: 900 }}>Design</button>
// // // // //             <button onClick={() => setTab("json")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "json" ? "#f3f4f6" : "white", fontWeight: 900 }}>JSON</button>
// // // // //           </div>

// // // // //           {tab === "design" && (
// // // // //             <div style={{ display: "grid", gap: 10 }}>
// // // // //               <label style={{ fontWeight: 900, fontSize: 12 }}>Layout</label>
// // // // //               <select value={schema.layout} onChange={(e) => setLayout(e.target.value as Layout)} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
// // // // //                 <option>Single Column</option>
// // // // //                 <option>Two Column</option>
// // // // //                 <option>Sidebar Left</option>
// // // // //                 <option>Sidebar Right</option>
// // // // //               </select>

// // // // //               <label style={{ fontWeight: 900, fontSize: 12 }}>Primary Color</label>
// // // // //               <input type="color" value={schema.theme.primary} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, primary: e.target.value } }))} />

// // // // //               <label style={{ fontWeight: 900, fontSize: 12 }}>Heading Uppercase</label>
// // // // //               <input type="checkbox" checked={!!schema.theme.headingUppercase} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, headingUppercase: e.target.checked } }))} />
// // // // //             </div>
// // // // //           )}

// // // // //           {tab === "sections" && (
// // // // //             <div style={{ display: "grid", gap: 8 }}>
// // // // //               {Object.keys(SECTION_LABELS).map((k) => (
// // // // //                 <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, border: "1px solid #eef2f7", borderRadius: 12 }}>
// // // // //                   <div>
// // // // //                     <div style={{ fontWeight: 900 }}>{SECTION_LABELS[k]}</div>
// // // // //                     <div style={{ fontSize: 12, color: "#6b7280" }}>{k}</div>
// // // // //                   </div>
// // // // //                   <button onClick={() => toggleSection(k)} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: schema.sections?.[k]?.enabled ? "#dcfce7" : "white", fontWeight: 900 }}>
// // // // //                     {schema.sections?.[k]?.enabled ? "ON" : "OFF"}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           )}

// // // // //           {tab === "json" && (
// // // // //             <textarea value={JSON.stringify(schema, null, 2)} onChange={(e) => setSchema(JSON.parse(e.target.value || "{}"))} style={{ width: "100%", height: 520, padding: 10, borderRadius: 12, border: "1px solid #e5e7eb", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }} />
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Middle */}
// // // // //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
// // // // //           <div style={{ fontWeight: 900, marginBottom: 8 }}>Template Meta</div>
// // // // //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// // // // //             <input value={tpl.name} onChange={(e) => setTpl((p: any) => ({ ...p, name: e.target.value }))} placeholder="Template name" style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
// // // // //             <select value={tpl.status} onChange={(e) => setTpl((p: any) => ({ ...p, status: e.target.value }))} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
// // // // //               <option value="active">active</option>
// // // // //               <option value="draft">draft</option>
// // // // //             </select>
// // // // //           </div>
// // // // //           <div style={{ marginTop: 10 }}>
// // // // //             <textarea value={tpl.description || ""} onChange={(e) => setTpl((p: any) => ({ ...p, description: e.target.value }))} placeholder="Description" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 90 }} />
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Right */}
// // // // //         <div style={{ display: "grid", placeItems: "start center" }}>
// // // // //           <div>
// // // // //             <div style={{ fontWeight: 900, marginBottom: 10 }}>Live Preview</div>
// // // // //             <ResumePreview schema={schema} />
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import axios from "../../api/axiosInstance";
// // // // import ResumePreview from "./ResumePreview";
// // // // import html2canvas from "html2canvas";
// // // // import jsPDF from "jspdf";
// // // // import { saveAs } from "file-saver";
// // // // import { Document, Packer, Paragraph, TextRun } from "docx";

// // // // type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

// // // // function authHeaders() {
// // // //   const token = localStorage.getItem("access") || "";
// // // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // // }

// // // // const SECTION_LABELS: Record<string, string> = {
// // // //   header: "Header",
// // // //   summary: "Professional Summary",
// // // //   experience: "Work Experience",
// // // //   education: "Education",
// // // //   skills: "Skills",
// // // //   projects: "Projects",
// // // //   certifications: "Certifications",
// // // //   languages: "Languages",
// // // // };

// // // // function ensureSchema(template: any) {
// // // //   const schema = template?.schema || {};
// // // //   const layout = (schema.layout || template.layout || "Single Column") as Layout;
// // // //   return {
// // // //     version: schema.version ?? 1,
// // // //     layout,
// // // //     theme: {
// // // //       primary: schema?.theme?.primary || template.color || "#2563eb",
// // // //       fontFamily: schema?.theme?.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// // // //       headingUppercase: schema?.theme?.headingUppercase ?? true,
// // // //       titleSize: schema?.theme?.titleSize ?? 12,
// // // //       bodySize: schema?.theme?.bodySize ?? 10,
// // // //       lineHeight: schema?.theme?.lineHeight ?? 1.35,
// // // //     },
// // // //     order: schema.order || ["header", "summary", "experience", "education", "skills", "projects"],
// // // //     columns: schema.columns || { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] },
// // // //     sections: {
// // // //       header: { enabled: true },
// // // //       summary: { enabled: true },
// // // //       experience: { enabled: true },
// // // //       education: { enabled: true },
// // // //       skills: { enabled: true },
// // // //       projects: { enabled: true },
// // // //       certifications: { enabled: false },
// // // //       languages: { enabled: false },
// // // //       ...(schema.sections || {}),
// // // //     },
// // // //   };
// // // // }

// // // // export default function AdminTemplateBuilder() {
// // // //   const { id } = useParams();
// // // //   const templateId = Number(id);
// // // //   const nav = useNavigate();

// // // //   const [tpl, setTpl] = useState<any>(null);
// // // //   const [schema, setSchema] = useState<any>(null);
// // // //   const [tab, setTab] = useState<"sections" | "design" | "json">("sections");
// // // //   const [saving, setSaving] = useState(false);

// // // //   const printRef = useRef<HTMLDivElement | null>(null);

// // // //   const load = async () => {
// // // //     const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// // // //     setTpl(res.data);
// // // //     setSchema(ensureSchema(res.data));
// // // //   };

// // // //   useEffect(() => {
// // // //     if (!templateId) return;
// // // //     load();
// // // //   }, [templateId]);

// // // //   const toggleSection = (k: string) => {
// // // //     setSchema((p: any) => ({
// // // //       ...p,
// // // //       sections: { ...p.sections, [k]: { ...p.sections[k], enabled: !p.sections[k]?.enabled } },
// // // //     }));
// // // //   };

// // // //   const save = async () => {
// // // //     setSaving(true);
// // // //     try {
// // // //       await axios.put(
// // // //         `/auth/admin/templates/${templateId}/`,
// // // //         { ...tpl, schema },
// // // //         { headers: authHeaders() }
// // // //       );
// // // //       alert("Saved!");
// // // //     } catch (e) {
// // // //       alert("Save failed");
// // // //     }
// // // //     setSaving(false);
// // // //   };

// // // //   const downloadPDF = async () => {
// // // //     const el = printRef.current;
// // // //     if (!el) return;

// // // //     const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
// // // //     const img = canvas.toDataURL("image/png");

// // // //     const pdf = new jsPDF("p", "pt", "a4");
// // // //     const pageWidth = pdf.internal.pageSize.getWidth();
// // // //     const pageHeight = pdf.internal.pageSize.getHeight();

// // // //     const imgWidth = pageWidth;
// // // //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

// // // //     let position = 0;
// // // //     pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
// // // //     pdf.save(`${tpl.name || "template"}.pdf`);
// // // //   };

// // // //   const downloadDOCX = async () => {
// // // //     // Simple DOCX for template preview - expand as needed
// // // //     const doc = new Document({
// // // //       sections: [
// // // //         {
// // // //           properties: {},
// // // //           children: [
// // // //             new Paragraph("Template Preview"),
// // // //             // Add more based on schema
// // // //           ],
// // // //         },
// // // //       ],
// // // //     });
// // // //     const blob = await Packer.toBlob(doc);
// // // //     saveAs(blob, `${tpl.name || "template"}.docx`);
// // // //   };

// // // //   if (!tpl || !schema) return <div>Loading...</div>;

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// // // //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
// // // //         <div>
// // // //           <div style={{ fontWeight: 900, fontSize: 18 }}>{tpl.name}</div>
// // // //           <div style={{ fontSize: 12, color: "#6b7280" }}>Template Builder</div>
// // // //         </div>
// // // //         <div style={{ display: "flex", gap: 8 }}>
// // // //           <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
// // // //           <button onClick={save} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>
// // // //             {saving ? "Saving..." : "Save"}
// // // //           </button>
// // // //           <button onClick={() => nav(`/admin/templates/${templateId}/test`)} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>Test with Data</button>
// // // //           <button onClick={downloadPDF} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>PDF</button>
// // // //           <button onClick={downloadDOCX} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>Word</button>
// // // //         </div>
// // // //       </div>

// // // //       <div style={{ display: "grid", gridTemplateColumns: "360px 1fr 520px", gap: 14, padding: 14 }}>
// // // //         {/* Left */}
// // // //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
// // // //           <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
// // // //             {["sections", "design", "json"].map((t) => (
// // // //               <button key={t} onClick={() => setTab(t as any)} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === t ? "#2563eb" : "white", color: tab === t ? "white" : "#374151", fontWeight: 900 }}>
// // // //                 {t.charAt(0).toUpperCase() + t.slice(1)}
// // // //               </button>
// // // //             ))}
// // // //           </div>

// // // //           {tab === "sections" && (
// // // //             <div style={{ display: "grid", gap: 10 }}>
// // // //               {Object.keys(SECTION_LABELS).map((k) => (
// // // //                 <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, border: "1px solid #eef2f7", borderRadius: 12 }}>
// // // //                   <div>
// // // //                     <div style={{ fontWeight: 900 }}>{SECTION_LABELS[k]}</div>
// // // //                     <div style={{ fontSize: 12, color: "#6b7280" }}>{k}</div>
// // // //                   </div>
// // // //                   <button onClick={() => toggleSection(k)} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: schema.sections?.[k]?.enabled ? "#dcfce7" : "white", fontWeight: 900 }}>
// // // //                     {schema.sections?.[k]?.enabled ? "ON" : "OFF"}
// // // //                   </button>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           )}

// // // //           {tab === "json" && (
// // // //             <textarea value={JSON.stringify(schema, null, 2)} onChange={(e) => setSchema(JSON.parse(e.target.value || "{}"))} style={{ width: "100%", height: 520, padding: 10, borderRadius: 12, border: "1px solid #e5e7eb", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }} />
// // // //           )}
// // // //         </div>

// // // //         {/* Middle */}
// // // //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
// // // //           <div style={{ fontWeight: 900, marginBottom: 8 }}>Template Meta</div>
// // // //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// // // //             <input value={tpl.name} onChange={(e) => setTpl((p: any) => ({ ...p, name: e.target.value }))} placeholder="Template name" style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
// // // //             <select value={tpl.status} onChange={(e) => setTpl((p: any) => ({ ...p, status: e.target.value }))} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
// // // //               <option value="active">active</option>
// // // //               <option value="draft">draft</option>
// // // //             </select>
// // // //           </div>
// // // //           <div style={{ marginTop: 10 }}>
// // // //             <textarea value={tpl.description || ""} onChange={(e) => setTpl((p: any) => ({ ...p, description: e.target.value }))} placeholder="Description" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 90 }} />
// // // //           </div>
// // // //         </div>

// // // //         {/* Right */}
// // // //         <div style={{ display: "grid", placeItems: "start center" }}>
// // // //           <div>
// // // //             <div style={{ fontWeight: 900, marginBottom: 10 }}>Live Preview</div>
// // // //             <div ref={printRef}>
// // // //               <ResumePreview schema={schema} />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useEffect, useState, useRef } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import axios from "../../api/axiosInstance";
// // // import ResumePreview from "./ResumePreview";
// // // import html2canvas from "html2canvas";
// // // import jsPDF from "jspdf";
// // // import { saveAs } from "file-saver";
// // // import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

// // // type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

// // // function authHeaders() {
// // //   const token = localStorage.getItem("access") || "";
// // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // }

// // // const SECTION_LABELS: Record<string, string> = {
// // //   header: "Header",
// // //   summary: "Professional Summary",
// // //   experience: "Work Experience",
// // //   education: "Education",
// // //   skills: "Skills",
// // //   projects: "Projects",
// // //   certifications: "Certifications",
// // //   languages: "Languages",
// // // };

// // // function ensureSchema(template: any) {
// // //   const schema = template?.schema || {};
// // //   const layout = (schema.layout || template.layout || "Single Column") as Layout;
// // //   return {
// // //     version: schema.version ?? 1,
// // //     layout,
// // //     theme: {
// // //       primary: schema?.theme?.primary || template.color || "#2563eb",
// // //       fontFamily: schema?.theme?.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// // //       headingUppercase: schema?.theme?.headingUppercase ?? true,
// // //       titleSize: schema?.theme?.titleSize ?? 12,
// // //       bodySize: schema?.theme?.bodySize ?? 10,
// // //       lineHeight: schema?.theme?.lineHeight ?? 1.35,
// // //     },
// // //     order: schema.order || ["header", "summary", "experience", "education", "skills", "projects"],
// // //     columns: schema.columns || { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] },
// // //     sections: {
// // //       header: { enabled: true },
// // //       summary: { enabled: true },
// // //       experience: { enabled: true },
// // //       education: { enabled: true },
// // //       skills: { enabled: true },
// // //       projects: { enabled: true },
// // //       certifications: { enabled: schema.sections?.certifications?.enabled ?? false },
// // //       languages: { enabled: schema.sections?.languages?.enabled ?? false },
// // //     },
// // //   };
// // // }

// // // const SAMPLE_DATA = {
// // //   header: { fullName: "John Anderson", jobTitle: "Senior Software Engineer", email: "john@email.com", phone: "+1 555 123 4567", location: "San Francisco, CA", linkedin: "linkedin.com/in/john", website: "john.dev" },
// // //   summary: "Results-driven software engineer with 8+ years of experience building scalable web applications.",
// // //   experience: [
// // //     { title: "Senior Software Engineer", company: "Tech Innovations Inc.", location: "San Francisco, CA", from: "2021-01", to: "Present", bullets: ["Led team of 5", "Reduced load time by 60%"] },
// // //     { title: "Software Engineer", company: "Digital Solutions", location: "Austin, TX", from: "2018-03", to: "2020-12", bullets: ["Built dashboard", "Handled 10K req/min"] },
// // //   ],
// // //   education: [{ school: "UC Berkeley", degree: "B.S. Computer Science", from: "2012", to: "2016" }],
// // //   skills: { programming: ["JavaScript", "TypeScript", "Python"], frameworks: ["React", "Node.js"], tools: ["AWS", "Docker"] },
// // //   projects: [{ name: "E-commerce Platform", desc: "Full-stack app with real-time inventory" }, { name: "Task App", desc: "Collaboration tool with drag-drop" }],
// // // };

// // // export default function AdminTemplateBuilder() {
// // //   const { id } = useParams();
// // //   const templateId = Number(id);
// // //   const nav = useNavigate();

// // //   const [tpl, setTpl] = useState<any>(null);
// // //   const [schema, setSchema] = useState<any>(null);
// // //   const [tab, setTab] = useState<"sections" | "design" | "json">("sections");
// // //   const [saving, setSaving] = useState(false);

// // //   const printRef = useRef<HTMLDivElement | null>(null);

// // //   useEffect(() => {
// // //     if (!templateId) return;
// // //     const load = async () => {
// // //       const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// // //       setTpl(res.data);
// // //       setSchema(ensureSchema(res.data));
// // //     };
// // //     load();
// // //   }, [templateId]);

// // //   const toggleSection = (k: string) => {
// // //     setSchema((p: any) => ({
// // //       ...p,
// // //       sections: { ...p.sections, [k]: { ...p.sections[k], enabled: !p.sections[k]?.enabled } },
// // //     }));
// // //   };

// // //   const save = async () => {
// // //     setSaving(true);
// // //     try {
// // //       await axios.put(`/auth/admin/templates/${templateId}/`, { ...tpl, schema }, { headers: authHeaders() });
// // //       alert("Template saved successfully!");
// // //     } catch {
// // //       alert("Save failed");
// // //     }
// // //     setSaving(false);
// // //   };

// // //   const downloadPDF = async () => {
// // //     const el = printRef.current;
// // //     if (!el) return;

// // //     const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
// // //     const imgData = canvas.toDataURL("image/png");

// // //     const pdf = new jsPDF("p", "mm", "a4");
// // //     const pdfWidth = pdf.internal.pageSize.getWidth();
// // //     const pdfHeight = pdf.internal.pageSize.getHeight();
// // //     const imgWidth = pdfWidth;
// // //     const imgHeight = (canvas.height * pdfWidth) / canvas.width;

// // //     let heightLeft = imgHeight;
// // //     let position = 0;

// // //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
// // //     heightLeft -= pdfHeight;

// // //     while (heightLeft >= 0) {
// // //       position = heightLeft - imgHeight;
// // //       pdf.addPage();
// // //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
// // //       heightLeft -= pdfHeight;
// // //     }

// // //     pdf.save(`${tpl.name || "template"}.pdf`);
// // //   };

// // //   const downloadDOCX = async () => {
// // //     const children = [
// // //       new Paragraph({
// // //         heading: HeadingLevel.HEADING_1,
// // //         children: [new TextRun({ text: SAMPLE_DATA.header.fullName, bold: true })],
// // //       }),
// // //       new Paragraph({ children: [new TextRun(SAMPLE_DATA.header.jobTitle)] }),
// // //       new Paragraph({ children: [new TextRun(`${SAMPLE_DATA.header.email} | ${SAMPLE_DATA.header.phone} | ${SAMPLE_DATA.header.location}`)] }),
// // //       new Paragraph(""),
// // //       new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Professional Summary")] }),
// // //       new Paragraph(SAMPLE_DATA.summary),
// // //       new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Work Experience")] }),
// // //       ...SAMPLE_DATA.experience.flatMap((exp: any) => [
// // //         new Paragraph({ children: [new TextRun({ text: exp.title, bold: true })] }),
// // //         new Paragraph(`${exp.company}, ${exp.location}`),
// // //         new Paragraph(`${exp.from} - ${exp.to}`),
// // //         ...exp.bullets.map((b: string) => new Paragraph(`• ${b}`)),
// // //       ]),
// // //       new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Projects")] }),
// // //       ...SAMPLE_DATA.projects.flatMap((p: any) => [
// // //         new Paragraph({ children: [new TextRun({ text: p.name, bold: true })] }),
// // //         new Paragraph(p.desc),
// // //       ]),
// // //     ];

// // //     const doc = new Document({ sections: [{ children }] });
// // //     const blob = await Packer.toBlob(doc);
// // //     saveAs(blob, `${tpl.name || "template"}.docx`);
// // //   };

// // //   if (!tpl || !schema) return <div style={{ padding: 40, textAlign: "center" }}>Loading template...</div>;

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// // //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //         <div>
// // //           <div style={{ fontWeight: 900, fontSize: 20 }}>{tpl.name}</div>
// // //           <div style={{ fontSize: 13, color: "#6b7280" }}>Template Builder</div>
// // //         </div>
// // //         <div style={{ display: "flex", gap: 10 }}>
// // //           <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
// // //           <button onClick={save} disabled={saving} style={{ padding: "10px 16px", borderRadius: 10, background: "#2563eb", color: "white", fontWeight: 900 }}>
// // //             {saving ? "Saving..." : "Save Template"}
// // //           </button>
// // //           <button onClick={() => nav(`/admin/templates/${templateId}/test`)} style={{ padding: "10px 16px", borderRadius: 10, background: "#059669", color: "white", fontWeight: 900 }}>Test with Data</button>
// // //           <button onClick={downloadPDF} style={{ padding: "10px 16px", borderRadius: 10, background: "#dc2626", color: "white", fontWeight: 900 }}>PDF</button>
// // //           <button onClick={downloadDOCX} style={{ padding: "10px 16px", borderRadius: 10, background: "#7c3aed", color: "white", fontWeight: 900 }}>Word</button>
// // //         </div>
// // //       </div>

// // //       <div style={{ display: "grid", gridTemplateColumns: "360px 1fr 520px", gap: 16, padding: 16 }}>
// // //         {/* Left Panel */}
// // //         <div style={{ background: "white", borderRadius: 14, border: "1px solid #eef2f7", padding: 16 }}>
// // //           <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
// // //             {(["sections", "design", "json"] as const).map((t) => (
// // //               <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === t ? "#2563eb" : "white", color: tab === t ? "white" : "#374151", fontWeight: 900 }}>
// // //                 {t.charAt(0).toUpperCase() + t.slice(1)}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {tab === "sections" && (
// // //             <div style={{ display: "grid", gap: 10 }}>
// // //               {Object.keys(SECTION_LABELS).map((key) => (
// // //                 <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: 12, border: "1px solid #eef2f7" }}>
// // //                   <div>
// // //                     <div style={{ fontWeight: 900 }}>{SECTION_LABELS[key]}</div>
// // //                     <div style={{ fontSize: 12, color: "#6b7280" }}>{key}</div>
// // //                   </div>
// // //                   <button onClick={() => toggleSection(key)} style={{ padding: "8px 14px", borderRadius: 8, background: schema.sections[key]?.enabled ? "#10b981" : "#ef4444", color: "white", fontWeight: 900 }}>
// // //                     {schema.sections[key]?.enabled ? "ON" : "OFF"}
// // //                   </button>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}

// // //           {tab === "json" && (
// // //             <textarea
// // //               value={JSON.stringify(schema, null, 2)}
// // //               onChange={(e) => {
// // //                 try {
// // //                   setSchema(JSON.parse(e.target.value));
// // //                 } catch {
// // //                   // Invalid JSON, ignore
// // //                 }
// // //               }}
// // //               style={{ width: "100%", height: "100%", minHeight: 500, padding: 12, borderRadius: 12, border: "1px solid #e5e7eb", fontFamily: "monospace", fontSize: 12 }}
// // //             />
// // //           )}
// // //         </div>

// // //         {/* Middle Panel - Meta */}
// // //         <div style={{ background: "white", borderRadius: 14, border: "1px solid #eef2f7", padding: 16 }}>
// // //           <h3 style={{ fontWeight: 900, marginBottom: 12 }}>Template Meta</h3>
// // //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
// // //             <input value={tpl.name} onChange={(e) => setTpl((p: any) => ({ ...p, name: e.target.value }))} placeholder="Template Name" style={{ padding: 12, borderRadius: 10, border: "1px solid #e5e7eb" }} />
// // //             <select value={tpl.status} onChange={(e) => setTpl((p: any) => ({ ...p, status: e.target.value }))} style={{ padding: 12, borderRadius: 10, border: "1px solid #e5e7eb" }}>
// // //               <option value="draft">Draft</option>
// // //               <option value="active">Active</option>
// // //             </select>
// // //           </div>
// // //           <textarea value={tpl.description || ""} onChange={(e) => setTpl((p: any) => ({ ...p, description: e.target.value }))} placeholder="Description (optional)" style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }} />
// // //         </div>

// // //         {/* Right Panel - Preview */}
// // //         <div style={{ display: "grid", placeItems: "start center" }}>
// // //           <h3 style={{ fontWeight: 900, marginBottom: 16 }}>Live Preview</h3>
// // //           <div ref={printRef} style={{ background: "white", padding: 20, borderRadius: 14, border: "1px solid #eef2f7", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
// // //             <ResumePreview schema={schema} data={SAMPLE_DATA} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useEffect, useState, useRef } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "../../api/axiosInstance";
// // import ResumePreview from "./ResumePreview";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import { saveAs } from "file-saver";
// // import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

// // type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

// // function authHeaders() {
// //   const token = localStorage.getItem("access") || "";
// //   return token ? { Authorization: `Bearer ${token}` } : {};
// // }

// // const SECTION_LABELS: Record<string, string> = {
// //   header: "Header",
// //   summary: "Professional Summary",
// //   experience: "Work Experience",
// //   education: "Education",
// //   skills: "Skills",
// //   projects: "Projects",
// //   certifications: "Certifications",
// //   languages: "Languages",
// // };

// // function ensureSchema(template: any) {
// //   const schema = template?.schema || {};
// //   const layout = (schema.layout || template.layout || "Single Column") as Layout;
// //   return {
// //     version: schema.version ?? 1,
// //     layout,
// //     theme: {
// //       primary: schema?.theme?.primary || template.color || "#2563eb",
// //       fontFamily: schema?.theme?.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// //       headingUppercase: schema?.theme?.headingUppercase ?? true,
// //       titleSize: schema?.theme?.titleSize ?? 12,
// //       bodySize: schema?.theme?.bodySize ?? 10,
// //       lineHeight: schema?.theme?.lineHeight ?? 1.35,
// //     },
// //     order: schema.order || ["header", "summary", "experience", "education", "skills", "projects"],
// //     columns: schema.columns || { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] },
// //     sections: {
// //       header: { enabled: true },
// //       summary: { enabled: true },
// //       experience: { enabled: true },
// //       education: { enabled: true },
// //       skills: { enabled: true },
// //       projects: { enabled: true },
// //       certifications: { enabled: schema.sections?.certifications?.enabled ?? false },
// //       languages: { enabled: schema.sections?.languages?.enabled ?? false },
// //     },
// //   };
// // }

// // const SAMPLE_DATA = {
// //   header: { fullName: "John Anderson", jobTitle: "Senior Software Engineer", email: "john@email.com", phone: "+1 555 123 4567", location: "San Francisco, CA", linkedin: "linkedin.com/in/john", website: "john.dev" },
// //   summary: "Results-driven software engineer with 8+ years of experience building scalable web applications.",
// //   experience: [
// //     { title: "Senior Software Engineer", company: "Tech Innovations Inc.", location: "San Francisco, CA", from: "2021-01", to: "Present", bullets: ["Led team of 5", "Reduced load time by 60%"] },
// //     { title: "Software Engineer", company: "Digital Solutions", location: "Austin, TX", from: "2018-03", to: "2020-12", bullets: ["Built dashboard", "Handled 10K req/min"] },
// //   ],
// //   education: [{ school: "UC Berkeley", degree: "B.S. Computer Science", from: "2012", to: "2016" }],
// //   skills: { programming: ["JavaScript", "TypeScript", "Python"], frameworks: ["React", "Node.js"], tools: ["AWS", "Docker"] },
// //   projects: [{ name: "E-commerce Platform", desc: "Full-stack app with real-time inventory" }, { name: "Task App", desc: "Collaboration tool with drag-drop" }],
// // };

// // export default function AdminTemplateBuilder() {
// //   const { id } = useParams();
// //   const templateId = Number(id);
// //   const navigate = useNavigate();

// //   const [tpl, setTpl] = useState<any>(null);
// //   const [schema, setSchema] = useState<any>(null);
// //   const [tab, setTab] = useState<"sections" | "design" | "json">("sections");
// //   const [saving, setSaving] = useState(false);

// //   const printRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     if (!templateId) return;
// //     const load = async () => {
// //       const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// //       setTpl(res.data);
// //       setSchema(ensureSchema(res.data));
// //     };
// //     load();
// //   }, [templateId]);

// //   const toggleSection = (k: string) => {
// //     setSchema((p: any) => ({
// //       ...p,
// //       sections: { ...p.sections, [k]: { ...p.sections[k], enabled: !p.sections[k]?.enabled } },
// //     }));
// //   };

// //   const save = async () => {
// //     setSaving(true);
// //     try {
// //       await axios.put(`/auth/admin/templates/${templateId}/`, { ...tpl, schema }, { headers: authHeaders() });
// //       alert("Template saved successfully!");
// //     } catch {
// //       alert("Save failed");
// //     }
// //     setSaving(false);
// //   };

// //   const downloadPDF = async () => {
// //     const el = printRef.current;
// //     if (!el) return;

// //     const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
// //     const imgData = canvas.toDataURL("image/png");

// //     const pdf = new jsPDF("p", "mm", "a4");
// //     const pdfWidth = pdf.internal.pageSize.getWidth();
// //     const pdfHeight = pdf.internal.pageSize.getHeight();
// //     const imgWidth = pdfWidth;
// //     const imgHeight = (canvas.height * pdfWidth) / canvas.width;

// //     let heightLeft = imgHeight;
// //     let position = 0;

// //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
// //     heightLeft -= pdfHeight;

// //     while (heightLeft > 0) {
// //       pdf.addPage();
// //       position = heightLeft - imgHeight;
// //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
// //       heightLeft -= pdfHeight;
// //     }

// //     pdf.save(`${tpl?.name || "template"}.pdf`);
// //   };

// //   const downloadDOCX = async () => {
// //     const children = [
// //       new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(SAMPLE_DATA.header.fullName)] }),
// //       new Paragraph(SAMPLE_DATA.header.jobTitle),
// //       new Paragraph(`${SAMPLE_DATA.header.email} | ${SAMPLE_DATA.header.phone} | ${SAMPLE_DATA.header.location}`),
// //       new Paragraph(""),
// //       new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Professional Summary")] }),
// //       new Paragraph(SAMPLE_DATA.summary),
// //       new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Work Experience")] }),
// //       ...SAMPLE_DATA.experience.flatMap((exp: any) => [
// //         new Paragraph({ children: [new TextRun({ text: exp.title, bold: true })] }),
// //         new Paragraph(`${exp.company}, ${exp.location}`),
// //         new Paragraph(`${exp.from} - ${exp.to}`),
// //         ...exp.bullets.map((b: string) => new Paragraph(`• ${b}`)),
// //       ]),
// //       new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Projects")] }),
// //       ...SAMPLE_DATA.projects.flatMap((p: any) => [
// //         new Paragraph({ children: [new TextRun({ text: p.name, bold: true })] }),
// //         new Paragraph(p.desc),
// //       ]),
// //     ];

// //     const doc = new Document({ sections: [{ children }] });
// //     const blob = await Packer.toBlob(doc);
// //     saveAs(blob, `${tpl?.name || "template"}.docx`);
// //   };

// //   if (!tpl || !schema) return <div style={{ padding: 40, textAlign: "center" }}>Loading template...</div>;

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //         <div>
// //           <div style={{ fontWeight: 900, fontSize: 20 }}>{tpl.name}</div>
// //           <div style={{ fontSize: 13, color: "#6b7280" }}>Template Builder</div>
// //         </div>
// //         <div style={{ display: "flex", gap: 10 }}>
// //           <button onClick={() => navigate("/admin/templates")} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
// //           <button onClick={save} disabled={saving} style={{ padding: "10px 16px", borderRadius: 10, background: "#2563eb", color: "white", fontWeight: 900 }}>
// //             {saving ? "Saving..." : "Save Template"}
// //           </button>
// //           <button onClick={() => navigate(`/admin/templates/${templateId}/test`)} style={{ padding: "10px 16px", borderRadius: 10, background: "#059669", color: "white", fontWeight: 900 }}>Test with Data</button>
// //           <button onClick={downloadPDF} style={{ padding: "10px 16px", borderRadius: 10, background: "#dc2626", color: "white", fontWeight: 900 }}>PDF</button>
// //           <button onClick={downloadDOCX} style={{ padding: "10px 16px", borderRadius: 10, background: "#7c3aed", color: "white", fontWeight: 900 }}>Word</button>
// //         </div>
// //       </div>

// //       <div style={{ display: "grid", gridTemplateColumns: "360px 1fr 520px", gap: 16, padding: 16 }}>
// //         {/* Left Panel - Sections/Design/JSON */}
// //         <div style={{ background: "white", borderRadius: 14, border: "1px solid #eef2f7", padding: 16 }}>
// //           <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
// //             {(["sections", "design", "json"] as const).map((t) => (
// //               <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === t ? "#2563eb" : "white", color: tab === t ? "white" : "#374151", fontWeight: 900 }}>
// //                 {t.charAt(0).toUpperCase() + t.slice(1)}
// //               </button>
// //             ))}
// //           </div>

// //           {tab === "sections" && (
// //             <div style={{ display: "grid", gap: 10 }}>
// //               {Object.keys(SECTION_LABELS).map((key) => (
// //                 <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: 12, border: "1px solid #eef2f7" }}>
// //                   <div>
// //                     <div style={{ fontWeight: 900 }}>{SECTION_LABELS[key]}</div>
// //                     <div style={{ fontSize: 12, color: "#6b7280" }}>{key}</div>
// //                   </div>
// //                   <button onClick={() => toggleSection(key)} style={{ padding: "8px 14px", borderRadius: 8, background: schema.sections[key]?.enabled ? "#10b981" : "#ef4444", color: "white", fontWeight: 900 }}>
// //                     {schema.sections[key]?.enabled ? "ON" : "OFF"}
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {tab === "design" && (
// //             <div style={{ display: "grid", gap: 16 }}>
// //               <div>
// //                 <label style={{ fontWeight: 900 }}>Primary Color</label>
// //                 <input type="color" value={schema.theme.primary} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, primary: e.target.value } }))} style={{ width: "100%", height: 50, borderRadius: 8 }} />
// //               </div>
// //               <div>
// //                 <label style={{ fontWeight: 900 }}>Font Family</label>
// //                 <select value={schema.theme.fontFamily} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, fontFamily: e.target.value } }))} style={{ width: "100%", padding: 10, borderRadius: 8 }}>
// //                   <option value="system-ui, -apple-system, Segoe UI, Roboto, sans-serif">System</option>
// //                   <option value="Arial, sans-serif">Arial</option>
// //                   <option value="'Times New Roman', serif">Times New Roman</option>
// //                   <option value="Georgia, serif">Georgia</option>
// //                 </select>
// //               </div>
// //             </div>
// //           )}

// //           {tab === "json" && (
// //             <textarea
// //               value={JSON.stringify(schema, null, 2)}
// //               onChange={(e) => {
// //                 try {
// //                   setSchema(JSON.parse(e.target.value));
// //                 } catch {}
// //               }}
// //               style={{ width: "100%", height: 520, padding: 10, borderRadius: 12, border: "1px solid #e5e7eb", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }}
// //             />
// //           )}
// //         </div>

// //         {/* Middle - Template Meta */}
// //         <div style={{ background: "white", borderRadius: 14, border: "1px solid #eef2f7", padding: 16 }}>
// //           <div style={{ fontWeight: 900, marginBottom: 8 }}>Template Meta</div>
// //           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// //             <input value={tpl.name} onChange={(e) => setTpl((p: any) => ({ ...p, name: e.target.value }))} placeholder="Template name" style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
// //             <select value={tpl.status} onChange={(e) => setTpl((p: any) => ({ ...p, status: e.target.value }))} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
// //               <option value="active">active</option>
// //               <option value="draft">draft</option>
// //             </select>
// //           </div>
// //           <div style={{ marginTop: 10 }}>
// //             <textarea value={tpl.description || ""} onChange={(e) => setTpl((p: any) => ({ ...p, description: e.target.value }))} placeholder="Description" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 90 }} />
// //           </div>
// //         </div>

// //         {/* Right - Live Preview */}
// //         <div style={{ display: "grid", placeItems: "start center" }}>
// //           <div>
// //             <div style={{ fontWeight: 900, marginBottom: 10 }}>Live Preview</div>
// //             <div ref={printRef} style={{ background: "white", padding: 12, borderRadius: 14, border: "1px solid #eef2f7" }}>
// //               <ResumePreview schema={schema} data={SAMPLE_DATA} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/dashboard/AdminTemplateBuilder.tsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "../../api/axiosInstance";
// import ResumePreview from "./ResumePreview";

// type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

// function authHeaders() {
//   const token = localStorage.getItem("access") || "";
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// const SECTION_LABELS: Record<string, string> = {
//   header: "Header",
//   summary: "Professional Summary",
//   experience: "Work Experience",
//   education: "Education",
//   skills: "Skills",
//   projects: "Projects",
//   certifications: "Certifications",
//   languages: "Languages",
// };

// function ensureSchema(template: any) {
//   const schema = template?.schema || {};
//   const layout = (schema.layout || template.layout || "Single Column") as Layout;
//   return {
//     version: schema.version ?? 1,
//     layout,
//     theme: {
//       primary: schema?.theme?.primary || template.color || "#2563eb",
//       fontFamily: schema?.theme?.fontFamily || "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
//       headingUppercase: schema?.theme?.headingUppercase ?? true,
//       titleSize: schema?.theme?.titleSize ?? 12,
//       bodySize: schema?.theme?.bodySize ?? 10,
//       lineHeight: schema?.theme?.lineHeight ?? 1.35,
//     },
//     order: schema.order || ["header", "summary", "experience", "education", "skills", "projects"],
//     columns: schema.columns || { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] },
//     sections: {
//       header: { enabled: true },
//       summary: { enabled: true },
//       experience: { enabled: true },
//       education: { enabled: true },
//       skills: { enabled: true },
//       projects: { enabled: true },
//       certifications: { enabled: false },
//       languages: { enabled: false },
//       ...(schema.sections || {}),
//     },
//   };
// }

// export default function AdminTemplateBuilder() {
//   const { id } = useParams();
//   const templateId = Number(id);
//   const nav = useNavigate();

//   const [tpl, setTpl] = useState<any>(null);
//   const [schema, setSchema] = useState<any>(null);
//   const [tab, setTab] = useState<"sections" | "design" | "json">("sections");
//   const [saving, setSaving] = useState(false);
//   const [draggingItem, setDraggingItem] = useState<string | null>(null);
//   const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

//   const load = async () => {
//     const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
//     setTpl(res.data);
//     setSchema(ensureSchema(res.data));
//   };

//   useEffect(() => {
//     if (!templateId) return;
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [templateId]);

//   const save = async () => {
//     if (!tpl) return;
//     setSaving(true);
//     try {
//       const payload = {
//         name: tpl.name,
//         category: tpl.category,
//         layout: schema.layout,
//         status: tpl.status,
//         color: schema?.theme?.primary || tpl.color,
//         description: tpl.description || "",
//         schema,
//       };
//       const res = await axios.put(`/auth/admin/templates/${tpl.id}/`, payload, { headers: authHeaders() });
//       setTpl(res.data);
//       setSchema(ensureSchema(res.data));
//       alert("Saved ✅");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const toggleSection = (key: string) => {
//     setSchema((p: any) => ({
//       ...p,
//       sections: { ...p.sections, [key]: { ...(p.sections?.[key] || {}), enabled: !p.sections?.[key]?.enabled } },
//     }));
//   };

//   const setLayout = (layout: Layout) => {
//     setSchema((p: any) => {
//       const next = { ...p, layout };
//       if (layout === "Single Column") {
//         const merged = Array.from(new Set([...(p.order || []), ...(p.columns?.left || []), ...(p.columns?.right || [])]));
//         next.order = merged.length ? merged : ["header", "summary", "experience", "education", "skills", "projects"];
//       }
//       return next;
//     });
//   };

//   // Drag and Drop Handlers
//   const handleDragStart = (e: React.DragEvent, sectionId: string) => {
//     setDraggingItem(sectionId);
//     e.dataTransfer.setData("text/plain", sectionId);
//   };

//   const handleDragOver = (e: React.DragEvent, index: number) => {
//     e.preventDefault();
//     setDragOverIndex(index);
//   };

//   const handleDragLeave = () => {
//     setDragOverIndex(null);
//   };

//   const handleDrop = (e: React.DragEvent, dropIndex: number) => {
//     e.preventDefault();
//     const draggedId = e.dataTransfer.getData("text/plain");
    
//     if (draggedId && schema.order) {
//       const currentOrder = [...schema.order];
//       const draggedIndex = currentOrder.indexOf(draggedId);
      
//       if (draggedIndex !== -1) {
//         // Remove from current position
//         currentOrder.splice(draggedIndex, 1);
//         // Insert at new position
//         const newIndex = dropIndex > draggedIndex ? dropIndex - 1 : dropIndex;
//         currentOrder.splice(newIndex, 0, draggedId);
        
//         setSchema((p: any) => ({
//           ...p,
//           order: currentOrder
//         }));
//       }
//     }
    
//     setDragOverIndex(null);
//     setDraggingItem(null);
//   };

//   const handleDropToRemove = (e: React.DragEvent) => {
//     e.preventDefault();
//     const draggedId = e.dataTransfer.getData("text/plain");
    
//     if (draggedId && schema.order) {
//       setSchema((p: any) => ({
//         ...p,
//         order: p.order.filter((id: string) => id !== draggedId)
//       }));
//     }
    
//     setDragOverIndex(null);
//     setDraggingItem(null);
//   };

//   const addToOrder = (sectionId: string) => {
//     if (!schema.order.includes(sectionId)) {
//       setSchema((p: any) => ({
//         ...p,
//         order: [...p.order, sectionId]
//       }));
//     }
//   };

//   const removeFromOrder = (sectionId: string) => {
//     setSchema((p: any) => ({
//       ...p,
//       order: p.order.filter((id: string) => id !== sectionId)
//     }));
//   };

//   if (!tpl || !schema) return <div style={{ padding: 20 }}>Loading...</div>;

//   return (
//     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
//       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
//         <div>
//           <div style={{ fontWeight: 900, fontSize: 18 }}>{tpl.name}</div>
//           <div style={{ fontSize: 12, color: "#6b7280" }}>Canvas Builder • {schema.layout} • Drag & Drop</div>
//         </div>
//         <div style={{ display: "flex", gap: 8 }}>
//           <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
//           <button onClick={save} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>
//             {saving ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "380px 1fr 520px", gap: 16, padding: 16 }}>
//         {/* Left Panel */}
//         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 16 }}>
//           <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
//             <button onClick={() => setTab("sections")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "sections" ? "#f3f4f6" : "white", fontWeight: 900 }}>Sections</button>
//             <button onClick={() => setTab("design")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "design" ? "#f3f4f6" : "white", fontWeight: 900 }}>Design</button>
//             <button onClick={() => setTab("json")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: tab === "json" ? "#f3f4f6" : "white", fontWeight: 900 }}>JSON</button>
//           </div>

//           {tab === "design" && (
//             <div style={{ display: "grid", gap: 12 }}>
//               <label style={{ fontWeight: 900, fontSize: 14 }}>Layout</label>
//               <select value={schema.layout} onChange={(e) => setLayout(e.target.value as Layout)} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
//                 <option>Single Column</option>
//                 <option>Two Column</option>
//                 <option>Sidebar Left</option>
//                 <option>Sidebar Right</option>
//               </select>

//               <label style={{ fontWeight: 900, fontSize: 14 }}>Primary Color</label>
//               <input type="color" value={schema.theme.primary} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, primary: e.target.value } }))} style={{ width: "100%", height: 40, borderRadius: 10 }} />

//               <label style={{ fontWeight: 900, fontSize: 14 }}>Heading Uppercase</label>
//               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <input type="checkbox" checked={!!schema.theme.headingUppercase} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, headingUppercase: e.target.checked } }))} />
//                 <span style={{ fontSize: 13 }}>Convert headings to uppercase</span>
//               </div>

//               <label style={{ fontWeight: 900, fontSize: 14 }}>Title Font Size</label>
//               <input type="range" min="8" max="20" value={schema.theme.titleSize} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, titleSize: parseInt(e.target.value) } }))} style={{ width: "100%" }} />
//               <div style={{ fontSize: 12, color: "#6b7280" }}>Current: {schema.theme.titleSize}px</div>

//               <label style={{ fontWeight: 900, fontSize: 14 }}>Body Font Size</label>
//               <input type="range" min="8" max="16" value={schema.theme.bodySize} onChange={(e) => setSchema((p: any) => ({ ...p, theme: { ...p.theme, bodySize: parseInt(e.target.value) } }))} style={{ width: "100%" }} />
//               <div style={{ fontSize: 12, color: "#6b7280" }}>Current: {schema.theme.bodySize}px</div>
//             </div>
//           )}

//           {tab === "sections" && (
//             <div style={{ display: "grid", gap: 10 }}>
//               <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 8 }}>Available Sections</div>
//               {Object.keys(SECTION_LABELS).map((k) => (
//                 <div 
//                   key={k} 
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, k)}
//                   style={{ 
//                     display: "flex", 
//                     justifyContent: "space-between", 
//                     alignItems: "center", 
//                     padding: 12, 
//                     border: "1px solid #eef2f7", 
//                     borderRadius: 12,
//                     cursor: "grab",
//                     backgroundColor: schema.sections?.[k]?.enabled ? "#f0f9ff" : "#f9fafb",
//                     opacity: draggingItem === k ? 0.5 : 1
//                   }}
//                 >
//                   <div>
//                     <div style={{ fontWeight: 900 }}>{SECTION_LABELS[k]}</div>
//                     <div style={{ fontSize: 12, color: "#6b7280" }}>{k}</div>
//                   </div>
//                   <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                     <button onClick={() => toggleSection(k)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: schema.sections?.[k]?.enabled ? "#dcfce7" : "white", fontWeight: 900 }}>
//                       {schema.sections?.[k]?.enabled ? "ON" : "OFF"}
//                     </button>
//                     {schema.sections?.[k]?.enabled && !schema.order.includes(k) && (
//                       <button onClick={() => addToOrder(k)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #3b82f6", background: "#3b82f6", color: "white", fontWeight: 900 }}>
//                         Add
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               <div style={{ marginTop: 20 }}>
//                 <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 8 }}>Section Order (Drag & Drop)</div>
//                 <div style={{ minHeight: 100, border: "2px dashed #d1d5db", borderRadius: 10, padding: 12, backgroundColor: "#f8fafc" }}>
//                   {schema.order && schema.order.length > 0 ? (
//                     <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                       {schema.order.map((sectionId: string, index: number) => (
//                         <div
//                           key={sectionId}
//                           draggable
//                           onDragStart={(e) => handleDragStart(e, sectionId)}
//                           onDragOver={(e) => handleDragOver(e, index)}
//                           onDragLeave={handleDragLeave}
//                           onDrop={(e) => handleDrop(e, index)}
//                           style={{
//                             padding: "10px 12px",
//                             backgroundColor: dragOverIndex === index ? "#dbeafe" : "#e0f2fe",
//                             border: dragOverIndex === index ? "2px dashed #3b82f6" : "1px solid #bae6fd",
//                             borderRadius: 8,
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             cursor: "move",
//                             opacity: draggingItem === sectionId ? 0.5 : 1
//                           }}
//                         >
//                           <div>
//                             <span style={{ fontWeight: 900, marginRight: 8 }}>{index + 1}.</span>
//                             {SECTION_LABELS[sectionId] || sectionId}
//                           </div>
//                           <button
//                             onClick={() => removeFromOrder(sectionId)}
//                             style={{
//                               background: "none",
//                               border: "none",
//                               color: "#ef4444",
//                               fontSize: 16,
//                               cursor: "pointer",
//                               padding: 4
//                             }}
//                           >
//                             ×
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div style={{ textAlign: "center", color: "#6b7280", fontSize: 13, padding: 20 }}>
//                       Drag sections here to set order
//                     </div>
//                   )}
//                 </div>
                
//                 <div 
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={handleDropToRemove}
//                   style={{
//                     marginTop: 12,
//                     padding: 16,
//                     border: "2px dashed #fca5a5",
//                     borderRadius: 10,
//                     backgroundColor: "#fef2f2",
//                     textAlign: "center",
//                     color: "#dc2626",
//                     fontSize: 13
//                   }}
//                 >
//                   Drag here to remove from order
//                 </div>
//               </div>

//               <div style={{ marginTop: 20 }}>
//                 <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 8 }}>Column Layout</div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                   <div>
//                     <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Left Column</div>
//                     <div style={{ minHeight: 100, border: "1px solid #e5e7eb", borderRadius: 8, padding: 8, backgroundColor: "#f8fafc" }}>
//                       {schema.columns?.left?.map((sectionId: string) => (
//                         <div key={sectionId} style={{ padding: 6, backgroundColor: "#e0f2fe", borderRadius: 6, marginBottom: 4, fontSize: 12 }}>
//                           {SECTION_LABELS[sectionId]}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Right Column</div>
//                     <div style={{ minHeight: 100, border: "1px solid #e5e7eb", borderRadius: 8, padding: 8, backgroundColor: "#f8fafc" }}>
//                       {schema.columns?.right?.map((sectionId: string) => (
//                         <div key={sectionId} style={{ padding: 6, backgroundColor: "#f0f9ff", borderRadius: 6, marginBottom: 4, fontSize: 12 }}>
//                           {SECTION_LABELS[sectionId]}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {tab === "json" && (
//             <textarea 
//               value={JSON.stringify(schema, null, 2)} 
//               onChange={(e) => {
//                 try {
//                   const newSchema = JSON.parse(e.target.value || "{}");
//                   setSchema(newSchema);
//                 } catch (err) {
//                   console.error("Invalid JSON");
//                 }
//               }} 
//               style={{ 
//                 width: "100%", 
//                 height: 520, 
//                 padding: 12, 
//                 borderRadius: 12, 
//                 border: "1px solid #e5e7eb", 
//                 fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", 
//                 fontSize: 12 
//               }} 
//             />
//           )}
//         </div>

//         {/* Middle Panel - Template Meta */}
//         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 16 }}>
//           <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>Template Meta</div>
//           <div style={{ display: "grid", gap: 12 }}>
//             <div>
//               <label style={{ fontSize: 12, fontWeight: 900, color: "#374151", marginBottom: 4 }}>Template Name</label>
//               <input 
//                 value={tpl.name} 
//                 onChange={(e) => setTpl((p: any) => ({ ...p, name: e.target.value }))} 
//                 placeholder="Template name" 
//                 style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} 
//               />
//             </div>
            
//             <div>
//               <label style={{ fontSize: 12, fontWeight: 900, color: "#374151", marginBottom: 4 }}>Category</label>
//               <select 
//                 value={tpl.category} 
//                 onChange={(e) => setTpl((p: any) => ({ ...p, category: e.target.value }))} 
//                 style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//               >
//                 <option value="Modern">Modern</option>
//                 <option value="Classic">Classic</option>
//               </select>
//             </div>
            
//             <div>
//               <label style={{ fontSize: 12, fontWeight: 900, color: "#374151", marginBottom: 4 }}>Status</label>
//               <select 
//                 value={tpl.status} 
//                 onChange={(e) => setTpl((p: any) => ({ ...p, status: e.target.value }))} 
//                 style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//               >
//                 <option value="active">active</option>
//                 <option value="draft">draft</option>
//               </select>
//             </div>
            
//             <div>
//               <label style={{ fontSize: 12, fontWeight: 900, color: "#374151", marginBottom: 4 }}>Description</label>
//               <textarea 
//                 value={tpl.description || ""} 
//                 onChange={(e) => setTpl((p: any) => ({ ...p, description: e.target.value }))} 
//                 placeholder="Description" 
//                 style={{ 
//                   width: "100%", 
//                   padding: 10, 
//                   borderRadius: 10, 
//                   border: "1px solid #e5e7eb", 
//                   minHeight: 100,
//                   resize: "vertical"
//                 }} 
//               />
//             </div>
            
//             <div style={{ marginTop: 8 }}>
//               {/* <button
//                 onClick={() => nav(`/admin/template/test/${tpl.id}`)}
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   borderRadius: 10,
//                   border: "1px solid #10b981",
//                   background: "#10b981",
//                   color: "white",
//                   fontWeight: 900,
//                   fontSize: 14
//                 }}
//               >
//                 Test This Template
//               </button> */}
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Preview */}
//         <div style={{ display: "grid", placeItems: "start center" }}>
//           <div>
//             <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>Live Preview</div>
//             <ResumePreview schema={schema} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/dashboard/AdminTemplateBuilder.tsx
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

// ✅ short preview data (no long dummy paragraphs)
const BUILDER_PREVIEW_DATA = {
  header: { fullName: "Your Name", jobTitle: "Your Role", email: "you@email.com", phone: "+91 90000 00000", location: "City", linkedin: "", website: "" },
  summary: "Short summary preview (template builder).",
  experience: [{ title: "Job Title", company: "Company", location: "City", from: "2023", to: "Present", bullets: ["Achievement 1", "Achievement 2"] }],
  education: [{ school: "College/University", degree: "Degree", from: "2019", to: "2023" }],
  skills: { programming: ["JS", "TS"], frameworks: ["React"], tools: ["Git"] },
  projects: [{ name: "Project", desc: "Short description." }],
  certifications: [],
  languages: [],
};

export default function AdminTemplateBuilder() {
  const { id } = useParams();
  const templateId = Number(id);
  const nav = useNavigate();

  const [tpl, setTpl] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);
  const [tab, setTab] = useState<"sections" | "design" | "json">("sections");
  const [saving, setSaving] = useState(false);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggingItem(sectionId);
    e.dataTransfer.setData("text/plain", sectionId);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");

    if (draggedId && schema.order) {
      const currentOrder = [...schema.order];
      const draggedIndex = currentOrder.indexOf(draggedId);

      if (draggedIndex !== -1) {
        currentOrder.splice(draggedIndex, 1);
        const newIndex = dropIndex > draggedIndex ? dropIndex - 1 : dropIndex;
        currentOrder.splice(newIndex, 0, draggedId);

        setSchema((p: any) => ({ ...p, order: currentOrder }));
      }
    }

    setDragOverIndex(null);
    setDraggingItem(null);
  };

  const handleDropToRemove = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");

    if (draggedId && schema.order) {
      setSchema((p: any) => ({
        ...p,
        order: p.order.filter((id: string) => id !== draggedId),
      }));
    }

    setDragOverIndex(null);
    setDraggingItem(null);
  };

  const addToOrder = (sectionId: string) => {
    if (!schema.order.includes(sectionId)) {
      setSchema((p: any) => ({ ...p, order: [...p.order, sectionId] }));
    }
  };

  const removeFromOrder = (sectionId: string) => {
    setSchema((p: any) => ({ ...p, order: p.order.filter((id: string) => id !== sectionId) }));
  };

  if (!tpl || !schema) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 18 }}>{tpl.name}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Canvas Builder • {schema.layout} • Drag & Drop</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
          <button onClick={save} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr 520px", gap: 16, padding: 16 }}>
        {/* Left Panel */}
        {/* (UNCHANGED - same as your file) */}
        {/* ... your existing left + middle panels remain exactly same ... */}

        {/* Right Panel - Preview (ONLY FIX: pass data) */}
        <div style={{ display: "grid", placeItems: "start center" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>Live Preview</div>
            <ResumePreview schema={schema} data={BUILDER_PREVIEW_DATA} />
          </div>
        </div>
      </div>
    </div>
  );
}
