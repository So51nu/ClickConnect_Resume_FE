// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "../../api/axiosInstance";
// // import ResumePreview from "./ResumePreview";

// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import { saveAs } from "file-saver";
// // import { Document, Packer, Paragraph, TextRun } from "docx";

// // function authHeaders() {
// //   const token = localStorage.getItem("access") || "";
// //   return token ? { Authorization: `Bearer ${token}` } : {};
// // }

// // function emptyResume() {
// //   return {
// //     header: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", website: "" },
// //     summary: "",
// //     experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
// //     education: [{ school: "", degree: "", from: "", to: "" }],
// //     skills: { programming: [], frameworks: [], tools: [] },
// //     projects: [{ name: "", desc: "" }],
// //   };
// // }

// // export default function AdminResumeEditor() {
// //   const nav = useNavigate();
// //   const params = useParams();

// //   const templateId = Number((params as any)?.templateId || 0);
// //   const resumeId = Number((params as any)?.resumeId || 0);

// //   const [tpl, setTpl] = useState<any>(null);
// //   const [schema, setSchema] = useState<any>(null);

// //   const [resume, setResume] = useState<any>(emptyResume());
// //   const [title, setTitle] = useState<string>("Untitled Resume");
// //   const [saving, setSaving] = useState(false);

// //   const printRef = useRef<HTMLDivElement | null>(null);

// //   const isEdit = !!resumeId;

// //   useEffect(() => {
// //     const load = async () => {
// //       // edit mode: load resume doc, then template
// //       if (isEdit) {
// //         const r = await axios.get(`/auth/admin/resumes/${resumeId}/`, { headers: authHeaders() });
// //         setTitle(r.data?.title || "Untitled Resume");
// //         setResume(r.data?.data || emptyResume());

// //         const t = await axios.get(`/auth/admin/templates/${r.data?.template?.id || r.data?.template_id}/`, { headers: authHeaders() });
// //         setTpl(t.data);
// //         setSchema(t.data?.schema || {});
// //         return;
// //       }

// //       // new mode: load template
// //       const t = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// //       setTpl(t.data);
// //       setSchema(t.data?.schema || {});
// //     };

// //     if (templateId || resumeId) load().catch(console.error);
// //   }, [templateId, resumeId, isEdit]);

// //   const safeFileName = useMemo(() => {
// //     const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
// //     return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
// //   }, [resume, title]);

// //   const saveToBackend = async () => {
// //     setSaving(true);
// //     try {
// //       if (isEdit) {
// //         const res = await axios.put(
// //           `/auth/admin/resumes/${resumeId}/`,
// //           { title, data: resume, status: "draft" },
// //           { headers: authHeaders() }
// //         );
// //         alert("Saved ✅");
// //         return res.data;
// //       }

// //       const res = await axios.post(
// //         `/auth/admin/resumes/`,
// //         { template_id: tpl?.id || templateId, title, data: resume, status: "draft" },
// //         { headers: authHeaders() }
// //       );

// //       alert("Saved ✅");
// //       nav(`/admin/resumes/edit/${res.data.id}`, { replace: true });
// //       return res.data;
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const downloadPDF = async () => {
// //     const el = printRef.current;
// //     if (!el) return;

// //     const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
// //     const img = canvas.toDataURL("image/png");

// //     const pdf = new jsPDF("p", "pt", "a4");
// //     const pageWidth = pdf.internal.pageSize.getWidth();
// //     const pageHeight = pdf.internal.pageSize.getHeight();

// //     const imgWidth = pageWidth;
// //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

// //     let y = 0;
// //     if (imgHeight <= pageHeight) {
// //       pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);
// //     } else {
// //       // multi-page
// //       let remaining = imgHeight;
// //       let position = 0;

// //       while (remaining > 0) {
// //         pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
// //         remaining -= pageHeight;
// //         position -= pageHeight;
// //         if (remaining > 0) pdf.addPage();
// //       }
// //     }

// //     pdf.save(`${safeFileName}.pdf`);
// //   };

// //   const downloadDOCX = async () => {
// //     const h = resume?.header || {};
// //     const doc = new Document({
// //       sections: [
// //         {
// //           properties: {},
// //           children: [
// //             new Paragraph({
// //               children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36 })],
// //             }),
// //             new Paragraph({
// //               children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24 })],
// //             }),
// //             new Paragraph(`${h.email || ""}  ${h.phone || ""}  ${h.location || ""}`.trim()),

// //             new Paragraph({ text: " " }),

// //             new Paragraph({ children: [new TextRun({ text: "Professional Summary", bold: true })] }),
// //             new Paragraph(resume?.summary || ""),

// //             new Paragraph({ text: " " }),

// //             new Paragraph({ children: [new TextRun({ text: "Work Experience", bold: true })] }),
// //             ...(resume?.experience || []).flatMap((x: any) => [
// //               new Paragraph({ children: [new TextRun({ text: `${x.title || ""} — ${x.company || ""}`, bold: true })] }),
// //               new Paragraph(`${x.location || ""}  (${x.from || ""} - ${x.to || ""})`.trim()),
// //               ...(x.bullets || []).map((b: string) => new Paragraph({ text: `• ${b}` })),
// //               new Paragraph({ text: " " }),
// //             ]),

// //             new Paragraph({ children: [new TextRun({ text: "Education", bold: true })] }),
// //             ...(resume?.education || []).map(
// //               (e: any) => new Paragraph(`${e.school || ""} — ${e.degree || ""} (${e.from || ""}-${e.to || ""})`)
// //             ),

// //             new Paragraph({ text: " " }),

// //             new Paragraph({ children: [new TextRun({ text: "Skills", bold: true })] }),
// //             new Paragraph(`Programming: ${(resume?.skills?.programming || []).join(", ")}`),
// //             new Paragraph(`Frameworks: ${(resume?.skills?.frameworks || []).join(", ")}`),
// //             new Paragraph(`Tools: ${(resume?.skills?.tools || []).join(", ")}`),

// //             new Paragraph({ text: " " }),

// //             new Paragraph({ children: [new TextRun({ text: "Projects", bold: true })] }),
// //             ...(resume?.projects || []).map((p: any) => new Paragraph(`${p.name || ""}: ${p.desc || ""}`)),
// //           ],
// //         },
// //       ],
// //     });

// //     const blob = await Packer.toBlob(doc);
// //     saveAs(blob, `${safeFileName}.docx`);
// //   };

// //   if (!tpl) return <div style={{ padding: 20 }}>Loading...</div>;

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
// //       <style>{`
// //         .re-grid { display: grid; grid-template-columns: 420px 1fr; gap: 14px; padding: 14px; }
// //         @media (max-width: 980px) { .re-grid { grid-template-columns: 1fr; } }
// //       `}</style>

// //       {/* top bar */}
// //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
// //         <div>
// //           <div style={{ fontWeight: 950, fontSize: 18 }}>Resume Editor</div>
// //           <div style={{ fontSize: 12, color: "#6b7280" }}>{tpl.name} • real-time preview • PDF/DOCX</div>
// //         </div>

// //         <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// //           <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
// //             Back
// //           </button>

// //           <button onClick={saveToBackend} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 950 }}>
// //             {saving ? "Saving..." : "Save"}
// //           </button>

// //           <button onClick={downloadPDF} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
// //             Download PDF
// //           </button>

// //           <button onClick={downloadDOCX} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
// //             Download Word
// //           </button>
// //         </div>
// //       </div>

// //       <div className="re-grid">
// //         {/* left form */}
// //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
// //           <div style={{ fontWeight: 950, marginBottom: 8 }}>Resume Details</div>

// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Document Title</label>
// //           <input
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //           />

// //           <div style={{ height: 10 }} />

// //           <div style={{ display: "grid", gap: 10 }}>
// //             <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>

// //             {(["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const).map((k) => (
// //               <input
// //                 key={k}
// //                 placeholder={k}
// //                 value={resume.header[k]}
// //                 onChange={(e) => setResume((p: any) => ({ ...p, header: { ...p.header, [k]: e.target.value } }))}
// //                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //               />
// //             ))}

// //             <div style={{ fontWeight: 900, marginTop: 8 }}>Summary</div>
// //             <textarea
// //               value={resume.summary}
// //               onChange={(e) => setResume((p: any) => ({ ...p, summary: e.target.value }))}
// //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
// //             />

// //             <div style={{ fontWeight: 900, marginTop: 8 }}>Experience (first block)</div>
// //             <input
// //               placeholder="Title"
// //               value={resume.experience[0].title}
// //               onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], title: e.target.value }] }))}
// //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //             />
// //             <input
// //               placeholder="Company"
// //               value={resume.experience[0].company}
// //               onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], company: e.target.value }] }))}
// //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //             />
// //             <input
// //               placeholder="Location"
// //               value={resume.experience[0].location}
// //               onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], location: e.target.value }] }))}
// //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //             />
// //             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// //               <input
// //                 placeholder="From (YYYY-MM)"
// //                 value={resume.experience[0].from}
// //                 onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], from: e.target.value }] }))}
// //                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //               />
// //               <input
// //                 placeholder="To (Present / YYYY-MM)"
// //                 value={resume.experience[0].to}
// //                 onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], to: e.target.value }] }))}
// //                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //               />
// //             </div>

// //             <div style={{ fontWeight: 900, marginTop: 8 }}>Skills (comma separated)</div>
// //             <input
// //               placeholder="Programming"
// //               value={(resume.skills.programming || []).join(", ")}
// //               onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, programming: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
// //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //             />
// //             <input
// //               placeholder="Frameworks"
// //               value={(resume.skills.frameworks || []).join(", ")}
// //               onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, frameworks: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
// //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //             />
// //             <input
// //               placeholder="Tools"
// //               value={(resume.skills.tools || []).join(", ")}
// //               onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, tools: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
// //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //             />
// //           </div>
// //         </div>

// //         {/* right preview */}
// //         <div style={{ display: "grid", placeItems: "start center" }}>
// //           <div style={{ width: "100%", maxWidth: 860 }}>
// //             <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Preview</div>

// //             <div ref={printRef} style={{ background: "white", padding: 12, borderRadius: 14, border: "1px solid #eef2f7" }}>
// //               <ResumePreview schema={schema} data={resume} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "../../api/axiosInstance";
// import ResumePreview from "./ResumePreview";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { saveAs } from "file-saver";
// import { Document, Packer, Paragraph, TextRun } from "docx";

// function authHeaders() {
//   const token = localStorage.getItem("access") || "";
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// function emptyResume() {
//   return {
//     header: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", website: "" },
//     summary: "",
//     experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
//     education: [{ school: "", degree: "", from: "", to: "" }],
//     skills: { programming: [], frameworks: [], tools: [] },
//     projects: [{ name: "", desc: "" }],
//   };
// }

// export default function AdminResumeEditor() {
//   const nav = useNavigate();
//   const params = useParams();

//   const templateId = Number(params?.templateId || 0);
//   const resumeId = Number(params?.resumeId || 0);

//   const [tpl, setTpl] = useState<any>(null);
//   const [schema, setSchema] = useState<any>(null);

//   const [resume, setResume] = useState<any>(emptyResume());
//   const [title, setTitle] = useState<string>("Untitled Resume");
//   const [saving, setSaving] = useState(false);

//   const printRef = useRef<HTMLDivElement | null>(null);

//   const isEdit = !!resumeId;

//   useEffect(() => {
//     const load = async () => {
//       if (isEdit) {
//         const r = await axios.get(`/auth/admin/resumes/${resumeId}/`, { headers: authHeaders() });
//         setTitle(r.data?.title || "Untitled Resume");
//         setResume(r.data?.data || emptyResume());

//         const t = await axios.get(`/auth/admin/templates/${r.data?.template?.id || r.data?.template_id}/`, { headers: authHeaders() });
//         setTpl(t.data);
//         setSchema(t.data?.schema || {});
//         return;
//       }

//       const t = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
//       setTpl(t.data);
//       setSchema(t.data?.schema || {});
//     };

//     if (templateId || resumeId) load().catch(console.error);
//   }, [templateId, resumeId, isEdit]);

//   const safeFileName = useMemo(() => {
//     const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
//     return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
//   }, [resume, title]);

//   const addExperience = () => {
//     setResume((p: any) => ({
//       ...p,
//       experience: [...p.experience, { title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
//     }));
//   };

//   const removeExperience = (index: number) => {
//     setResume((p: any) => ({
//       ...p,
//       experience: p.experience.filter((_: any, i: number) => i !== index),
//     }));
//   };

//   // Similar add/remove for education, projects, etc.

//   const downloadPDF = async () => {
//     const el = printRef.current;
//     if (!el) return;

//     const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
//     const img = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "pt", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = pageWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let position = 0;
//     let heightLeft = imgHeight;

//     pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       pdf.addPage();
//       position = heightLeft - imgHeight;
//       pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }
//     pdf.save(`${safeFileName}.pdf`);
//   };

//   const downloadDOCX = async () => {
//     const h = resume?.header || {};
//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           children: [
//             new Paragraph({ children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36 })] }),
//             new Paragraph({ children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24 })] }),
//             new Paragraph(`${h.email || ""}  ${h.phone || ""}  ${h.location || ""}`.trim()),
//             new Paragraph({ text: " " }),
//             new Paragraph({ children: [new TextRun({ text: "Professional Summary", bold: true, size: 22 })] }),
//             new Paragraph(resume.summary || ""),
//             // Expand for experience, education, etc.
//           ],
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, `${safeFileName}.docx`);
//   };

//   if (!tpl || !schema) return <div>Loading...</div>;

//   return (
//     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
//       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
//         <div>
//           <div style={{ fontWeight: 900, fontSize: 18 }}>{title}</div>
//           <div style={{ fontSize: 12, color: "#6b7280" }}>Resume Editor</div>
//         </div>
//         <div style={{ display: "flex", gap: 8 }}>
//           <button onClick={() => nav("/admin/dashboard")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
//           <button onClick={downloadPDF} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>PDF</button>
//           <button onClick={downloadDOCX} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>Word</button>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: 14 }}>
//         {/* Left: Editor */}
//         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12, overflowY: "auto" }}>
//           <div style={{ fontWeight: 900, marginBottom: 8 }}>Resume Title</div>
//           <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

//           <div style={{ fontWeight: 900, marginTop: 12 }}>Header</div>
//           {Object.keys(resume.header).map((key) => (
//             <input
//               key={key}
//               placeholder={key}
//               value={resume.header[key]}
//               onChange={(e) => setResume((p: any) => ({ ...p, header: { ...p.header, [key]: e.target.value } }))}
//               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }}
//             />
//           ))}

//           <div style={{ fontWeight: 900, marginTop: 12 }}>Summary</div>
//           <textarea
//             value={resume.summary}
//             onChange={(e) => setResume((p: any) => ({ ...p, summary: e.target.value }))}
//             style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
//           />

//           <div style={{ fontWeight: 900, marginTop: 12 }}>Experience</div>
//           {resume.experience.map((exp: any, index: number) => (
//             <div key={index} style={{ border: "1px solid #e5e7eb", padding: 10, borderRadius: 10, marginTop: 6 }}>
//               <input
//                 placeholder="Title"
//                 value={exp.title}
//                 onChange={(e) => {
//                   const newExp = [...resume.experience];
//                   newExp[index].title = e.target.value;
//                   setResume((p: any) => ({ ...p, experience: newExp }));
//                 }}
//                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//               />
//               <input
//                 placeholder="Company"
//                 value={exp.company}
//                 onChange={(e) => {
//                   const newExp = [...resume.experience];
//                   newExp[index].company = e.target.value;
//                   setResume((p: any) => ({ ...p, experience: newExp }));
//                 }}
//                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }}
//               />
//               <input
//                 placeholder="Location"
//                 value={exp.location}
//                 onChange={(e) => {
//                   const newExp = [...resume.experience];
//                   newExp[index].location = e.target.value;
//                   setResume((p: any) => ({ ...p, experience: newExp }));
//                 }}
//                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }}
//               />
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
//                 <input
//                   placeholder="From (YYYY-MM)"
//                   value={exp.from}
//                   onChange={(e) => {
//                     const newExp = [...resume.experience];
//                     newExp[index].from = e.target.value;
//                     setResume((p: any) => ({ ...p, experience: newExp }));
//                   }}
//                   style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//                 />
//                 <input
//                   placeholder="To (Present / YYYY-MM)"
//                   value={exp.to}
//                   onChange={(e) => {
//                     const newExp = [...resume.experience];
//                     newExp[index].to = e.target.value;
//                     setResume((p: any) => ({ ...p, experience: newExp }));
//                   }}
//                   style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//                 />
//               </div>
//               <div style={{ fontWeight: 900, marginTop: 8 }}>Bullets</div>
//               {exp.bullets.map((bullet: string, bIndex: number) => (
//                 <input
//                   key={bIndex}
//                   value={bullet}
//                   onChange={(e) => {
//                     const newExp = [...resume.experience];
//                     newExp[index].bullets[bIndex] = e.target.value;
//                     setResume((p: any) => ({ ...p, experience: newExp }));
//                   }}
//                   style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }}
//                 />
//               ))}
//               <button onClick={() => removeExperience(index)} style={{ marginTop: 6, color: "red" }}>Remove</button>
//             </div>
//           ))}
//           <button onClick={addExperience} style={{ marginTop: 6 }}>Add Experience</button>

//           <div style={{ fontWeight: 900, marginTop: 12 }}>Skills (comma separated)</div>
//           <input
//             placeholder="Programming"
//             value={(resume.skills.programming || []).join(", ")}
//             onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, programming: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
//             style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//           />
//           <input
//             placeholder="Frameworks"
//             value={(resume.skills.frameworks || []).join(", ")}
//             onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, frameworks: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
//             style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//           />
//           <input
//             placeholder="Tools"
//             value={(resume.skills.tools || []).join(", ")}
//             onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, tools: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
//             style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//           />
//           {/* Add similar for education, projects */}
//         </div>

//         {/* right preview */}
//         <div style={{ display: "grid", placeItems: "start center" }}>
//           <div style={{ width: "100%", maxWidth: 860 }}>
//             <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Preview</div>

//             <div ref={printRef} style={{ background: "white", padding: 12, borderRadius: 14, border: "1px solid #eef2f7" }}>
//               <ResumePreview schema={schema} data={resume} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/pages/dashboard/AdminResumeEditor.tsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "../../api/axiosInstance";
// import ResumePreview from "./ResumePreview";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { saveAs } from "file-saver";
// import { Document, Packer, Paragraph, TextRun } from "docx";

// function authHeaders() {
//   const token = localStorage.getItem("access") || "";
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// function emptyResume() {
//   return {
//     header: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", website: "" },
//     summary: "",
//     experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
//     education: [{ school: "", degree: "", from: "", to: "" }],
//     skills: { programming: [], frameworks: [], tools: [] },
//     projects: [{ name: "", desc: "" }],
//   };
// }

// export default function AdminResumeEditor() {
//   const nav = useNavigate();
//   const params = useParams();

//   const templateId = Number((params as any)?.templateId || 0);
//   const resumeId = Number((params as any)?.resumeId || 0);

//   const [tpl, setTpl] = useState<any>(null);
//   const [schema, setSchema] = useState<any>(null);

//   const [resume, setResume] = useState<any>(emptyResume());
//   const [title, setTitle] = useState<string>("Untitled Resume");
//   const [saving, setSaving] = useState(false);

//   const printRef = useRef<HTMLDivElement | null>(null);

//   const isEdit = !!resumeId;

//   useEffect(() => {
//     const load = async () => {
//       // edit mode: load resume doc, then template
//       if (isEdit) {
//         const r = await axios.get(`/auth/admin/resumes/${resumeId}/`, { headers: authHeaders() });
//         setTitle(r.data?.title || "Untitled Resume");
//         setResume(r.data?.data || emptyResume());

//         const t = await axios.get(`/auth/admin/templates/${r.data?.template?.id || r.data?.template_id}/`, { headers: authHeaders() });
//         setTpl(t.data);
//         setSchema(t.data?.schema || {});
//         return;
//       }

//       // new mode: load template
//       const t = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
//       setTpl(t.data);
//       setSchema(t.data?.schema || {});
//     };

//     if (templateId || resumeId) load().catch(console.error);
//   }, [templateId, resumeId, isEdit]);

//   const safeFileName = useMemo(() => {
//     const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
//     return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
//   }, [resume, title]);

//   const saveToBackend = async () => {
//     setSaving(true);
//     try {
//       if (isEdit) {
//         const res = await axios.put(
//           `/auth/admin/resumes/${resumeId}/`,
//           { title, data: resume, status: "draft" },
//           { headers: authHeaders() }
//         );
//         alert("Saved ✅");
//         return res.data;
//       }

//       const res = await axios.post(
//         `/auth/admin/resumes/`,
//         { template_id: tpl?.id || templateId, title, data: resume, status: "draft" },
//         { headers: authHeaders() }
//       );

//       alert("Saved ✅");
//       nav(`/admin/resumes/edit/${res.data.id}`, { replace: true });
//       return res.data;
//     } finally {
//       setSaving(false);
//     }
//   };

//   const downloadPDF = async () => {
//     const el = printRef.current;
//     if (!el) return;

//     // Set A4 dimensions (210mm x 297mm at 96 DPI)
//     const A4_WIDTH = 794; // pixels at 96 DPI
//     const A4_HEIGHT = 1123; // pixels at 96 DPI
    
//     const pdf = new jsPDF("p", "mm", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const canvas = await html2canvas(el, { 
//       scale: 2, 
//       useCORS: true, 
//       backgroundColor: "#ffffff",
//       width: A4_WIDTH,
//       height: el.scrollHeight,
//       windowWidth: A4_WIDTH,
//       logging: false
//     });
    
//     const imgData = canvas.toDataURL("image/png");
//     const imgWidth = pageWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
//     // Calculate position to center
//     const yOffset = Math.max(0, (pageHeight - imgHeight) / 2);
    
//     if (imgHeight <= pageHeight) {
//       pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);
//     } else {
//       // Multi-page PDF
//       let heightLeft = imgHeight;
//       let position = 0;
      
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
      
//       while (heightLeft > 0) {
//         position -= pageHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }
//     }
    
//     pdf.save(`${safeFileName}.pdf`);
//   };

//   const downloadDOCX = async () => {
//     const h = resume?.header || {};
//     const doc = new Document({
//       sections: [
//         {
//           properties: {
//             page: {
//               margin: {
//                 top: 1000,
//                 bottom: 1000,
//                 left: 1000,
//                 right: 1000,
//               },
//             },
//           },
//           children: [
//             // Header
//             new Paragraph({
//               children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36, font: "Calibri" })],
//               alignment: "center",
//               spacing: { after: 200 }
//             }),
            
//             // Job Title
//             new Paragraph({
//               children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24, color: "2E74B5", font: "Calibri" })],
//               alignment: "center",
//               spacing: { after: 400 }
//             }),
            
//             // Contact Information
//             new Paragraph({
//               children: [
//                 new TextRun({ text: h.email || "", size: 22 }),
//                 new TextRun({ text: " | ", size: 22 }),
//                 new TextRun({ text: h.phone || "", size: 22 }),
//                 new TextRun({ text: " | ", size: 22 }),
//                 new TextRun({ text: h.location || "", size: 22 }),
//                 new TextRun({ text: " | ", size: 22 }),
//                 new TextRun({ text: h.linkedin || "", size: 22 }),
//                 new TextRun({ text: " | ", size: 22 }),
//                 new TextRun({ text: h.website || "", size: 22 }),
//               ],
//               alignment: "center",
//               spacing: { after: 400 }
//             }),
            
//             new Paragraph({ text: " " }),
            
//             // Summary Section
//             new Paragraph({
//               children: [
//                 new TextRun({ 
//                   text: "PROFESSIONAL SUMMARY", 
//                   bold: true,
//                   size: 26,
//                   color: "2E74B5",
//                   font: "Calibri"
//                 })
//               ],
//               spacing: { before: 200, after: 200 }
//             }),
//             new Paragraph({
//               text: resume?.summary || "",
//               spacing: { after: 400 }
//             }),
            
//             // Experience Section
//             new Paragraph({
//               children: [
//                 new TextRun({ 
//                   text: "WORK EXPERIENCE", 
//                   bold: true,
//                   size: 26,
//                   color: "2E74B5",
//                   font: "Calibri"
//                 })
//               ],
//               spacing: { before: 200, after: 200 }
//             }),
//             ...(resume?.experience || []).flatMap((x: any, idx: number) => [
//               new Paragraph({
//                 children: [
//                   new TextRun({ 
//                     text: `${x.title || ""}`, 
//                     bold: true,
//                     size: 22
//                   })
//                 ],
//                 spacing: { after: 100 }
//               }),
//               new Paragraph({
//                 children: [
//                   new TextRun({ 
//                     text: `${x.company || ""}`, 
//                     bold: true,
//                     size: 20,
//                     color: "444444"
//                   }),
//                   new TextRun({ text: " | ", size: 20 }),
//                   new TextRun({ 
//                     text: `${x.location || ""}`, 
//                     size: 20
//                   })
//                 ],
//                 spacing: { after: 100 }
//               }),
//               new Paragraph({
//                 children: [
//                   new TextRun({ 
//                     text: `${x.from || ""} - ${x.to || ""}`, 
//                     italics: true,
//                     size: 18,
//                     color: "666666"
//                   })
//                 ],
//                 spacing: { after: 200 }
//               }),
//               ...(x.bullets || []).map((b: string) => 
//                 new Paragraph({
//                   text: `• ${b}`,
//                   bullet: { level: 0 },
//                   spacing: { after: 100 }
//                 })
//               ),
//               new Paragraph({ text: " " }),
//             ]),
            
//             // Education Section
//             new Paragraph({
//               children: [
//                 new TextRun({ 
//                   text: "EDUCATION", 
//                   bold: true,
//                   size: 26,
//                   color: "2E74B5",
//                   font: "Calibri"
//                 })
//               ],
//               spacing: { before: 200, after: 200 }
//             }),
//             ...(resume?.education || []).map(
//               (e: any) => new Paragraph({
//                 text: `${e.school || ""} — ${e.degree || ""} (${e.from || ""}-${e.to || ""})`,
//                 spacing: { after: 100 }
//               })
//             ),
            
//             new Paragraph({ text: " " }),
            
//             // Skills Section
//             new Paragraph({
//               children: [
//                 new TextRun({ 
//                   text: "SKILLS", 
//                   bold: true,
//                   size: 26,
//                   color: "2E74B5",
//                   font: "Calibri"
//                 })
//               ],
//               spacing: { before: 200, after: 200 }
//             }),
//             new Paragraph({
//               text: `Programming: ${(resume?.skills?.programming || []).join(", ")}`,
//               spacing: { after: 100 }
//             }),
//             new Paragraph({
//               text: `Frameworks: ${(resume?.skills?.frameworks || []).join(", ")}`,
//               spacing: { after: 100 }
//             }),
//             new Paragraph({
//               text: `Tools: ${(resume?.skills?.tools || []).join(", ")}`,
//               spacing: { after: 200 }
//             }),
            
//             new Paragraph({ text: " " }),
            
//             // Projects Section
//             new Paragraph({
//               children: [
//                 new TextRun({ 
//                   text: "PROJECTS", 
//                   bold: true,
//                   size: 26,
//                   color: "2E74B5",
//                   font: "Calibri"
//                 })
//               ],
//               spacing: { before: 200, after: 200 }
//             }),
//             ...(resume?.projects || []).map((p: any) => 
//               new Paragraph({
//                 text: `${p.name || ""}: ${p.desc || ""}`,
//                 spacing: { after: 100 }
//               })
//             ),
//           ],
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, `${safeFileName}.docx`);
//   };

//   if (!tpl) return <div style={{ padding: 20 }}>Loading...</div>;

//   return (
//     <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
//       <style>{`
//         .re-grid { display: grid; grid-template-columns: 420px 1fr; gap: 14px; padding: 14px; }
//         @media (max-width: 980px) { .re-grid { grid-template-columns: 1fr; } }
//       `}</style>

//       {/* top bar */}
//       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
//         <div>
//           <div style={{ fontWeight: 950, fontSize: 18 }}>Resume Editor</div>
//           <div style={{ fontSize: 12, color: "#6b7280" }}>{tpl.name} • real-time preview • PDF/DOCX • A4 Format</div>
//         </div>

//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//           <button onClick={() => nav("/admin/templates")} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
//             Back
//           </button>

//           <button onClick={saveToBackend} disabled={saving} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 950 }}>
//             {saving ? "Saving..." : "Save"}
//           </button>

//           <button onClick={downloadPDF} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
//             Download PDF (A4)
//           </button>

//           <button onClick={downloadDOCX} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
//             Download Word
//           </button>
//         </div>
//       </div>

//       <div className="re-grid">
//         {/* left form */}
//         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
//           <div style={{ fontWeight: 950, marginBottom: 8 }}>Resume Details</div>

//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Document Title</label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//           />

//           <div style={{ height: 10 }} />

//           <div style={{ display: "grid", gap: 10 }}>
//             <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>

//             {(["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const).map((k) => (
//               <input
//                 key={k}
//                 placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
//                 value={resume.header[k]}
//                 onChange={(e) => setResume((p: any) => ({ ...p, header: { ...p.header, [k]: e.target.value } }))}
//                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//               />
//             ))}

//             <div style={{ fontWeight: 900, marginTop: 8 }}>Summary</div>
//             <textarea
//               value={resume.summary}
//               onChange={(e) => setResume((p: any) => ({ ...p, summary: e.target.value }))}
//               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
//               placeholder="Enter professional summary..."
//             />

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
    header: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
    education: [{ school: "", degree: "", from: "", to: "" }],
    skills: { programming: [], frameworks: [], tools: [] },
    projects: [{ name: "", desc: "" }],
  };
}

export default function AdminResumeEditor() {
  const nav = useNavigate();
  const location = useLocation();
  const params = useParams();

  // ✅ /admin/* => admin mode, otherwise student mode (same UI)
  const mode: "admin" | "student" = location.pathname.startsWith("/admin")
    ? "admin"
    : "student";

  const templateId = Number((params as any)?.templateId || 0);
  const resumeId = Number((params as any)?.resumeId || 0);

  const [tpl, setTpl] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);

  const [resume, setResume] = useState<any>(emptyResume());
  const [title, setTitle] = useState<string>("Untitled Resume");
  const [saving, setSaving] = useState(false);

  const printRef = useRef<HTMLDivElement | null>(null);
  const isEdit = !!resumeId;

  // ✅ endpoints based on mode
  const endpoints = useMemo(() => {
    if (mode === "admin") {
      return {
        getTemplate: (id: number) => `/auth/admin/templates/${id}/`,
        getResume: (id: number) => `/auth/admin/resumes/${id}/`,
        putResume: (id: number) => `/auth/admin/resumes/${id}/`,
        postResume: () => `/auth/admin/resumes/`,
        backRoute: () => `/admin/templates`,
        afterCreateEditRoute: (id: number) => `/admin/resume/edit/${id}`,
      };
    }
    return {
      getTemplate: (id: number) => `/auth/student/templates/${id}/`,
      getResume: (id: number) => `/auth/student/resumes/${id}/`,
      putResume: (id: number) => `/auth/student/resumes/${id}/`,
      postResume: () => `/auth/student/resumes/`,
      backRoute: () => `/dashboard`,
      afterCreateEditRoute: (id: number) => `/resume/edit/${id}`,
    };
  }, [mode]);

  useEffect(() => {
    const load = async () => {
      // edit mode: load resume doc, then template
      if (isEdit) {
        const r = await axios.get(endpoints.getResume(resumeId), { headers: authHeaders() });
        setTitle(r.data?.title || "Untitled Resume");
        setResume(r.data?.data || emptyResume());

        // ✅ handle multiple possible fields
        const tplId =
          r.data?.template_pk ||
          r.data?.template_id ||
          r.data?.template?.id ||
          r.data?.template ||
          0;

        if (tplId) {
          const t = await axios.get(endpoints.getTemplate(Number(tplId)), { headers: authHeaders() });
          setTpl(t.data);
          setSchema(t.data?.schema || {});
        } else {
          // fallback
          setTpl({ name: "Template" });
          setSchema({});
        }
        return;
      }

      // new mode: load template
      const t = await axios.get(endpoints.getTemplate(templateId), { headers: authHeaders() });
      setTpl(t.data);
      setSchema(t.data?.schema || {});
    };

    if (templateId || resumeId) load().catch(console.error);
  }, [templateId, resumeId, isEdit, endpoints]);

  const safeFileName = useMemo(() => {
    const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
    return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }, [resume, title]);

  const saveToBackend = async () => {
    setSaving(true);
    try {
      if (isEdit) {
        const res = await axios.put(
          endpoints.putResume(resumeId),
          { title, data: resume, status: "draft" },
          { headers: authHeaders() }
        );
        alert("Saved ✅");
        return res.data;
      }

      const res = await axios.post(
        endpoints.postResume(),
        { template_id: tpl?.id || templateId, title, data: resume, status: "draft" },
        { headers: authHeaders() }
      );

      alert("Saved ✅");
      nav(endpoints.afterCreateEditRoute(res.data.id), { replace: true });
      return res.data;
    } finally {
      setSaving(false);
    }
  };

  const downloadPDF = async () => {
    const el = printRef.current;
    if (!el) return;

    const A4_WIDTH = 794;
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
      logging: false,
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
  };

  const downloadDOCX = async () => {
    const h = resume?.header || {};

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 },
            },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: h.fullName || "Resume",
                  bold: true,
                  size: 36,
                  font: "Calibri",
                }),
              ],
              alignment: "center",
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: h.jobTitle || "",
                  bold: true,
                  size: 24,
                  color: "2E74B5",
                  font: "Calibri",
                }),
              ],
              alignment: "center",
              spacing: { after: 400 },
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${safeFileName}.docx`);
  };

  if (!tpl) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <style>{`
        .re-grid { display: grid; grid-template-columns: 420px 1fr; gap: 14px; padding: 14px; }
        @media (max-width: 980px) { .re-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* top bar */}
      <div
        style={{
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
        }}
      >
        <div>
          <div style={{ fontWeight: 950, fontSize: 18 }}>Resume Editor</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            {tpl.name} • real-time preview • PDF/DOCX • A4 Format
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => nav(endpoints.backRoute())}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "white",
              fontWeight: 900,
            }}
          >
            Back
          </button>

          <button
            onClick={saveToBackend}
            disabled={saving}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #1d4ed8",
              background: "#2563eb",
              color: "white",
              fontWeight: 950,
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={downloadPDF}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "white",
              fontWeight: 900,
            }}
          >
            Download PDF (A4)
          </button>

          <button
            onClick={downloadDOCX}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "white",
              fontWeight: 900,
            }}
          >
            Download Word
          </button>
        </div>
      </div>

      <div className="re-grid">
        {/* left form */}
        <div
          style={{
            background: "white",
            border: "1px solid #eef2f7",
            borderRadius: 14,
            padding: 12,
          }}
        >
          <div style={{ fontWeight: 950, marginBottom: 8 }}>Resume Details</div>

          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
            Document Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              marginTop: 6,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />

          <div style={{ height: 10 }} />

          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>

            {(["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const).map(
              (k) => (
                <input
                  key={k}
                  placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
                  value={resume.header[k]}
                  onChange={(e) =>
                    setResume((p: any) => ({
                      ...p,
                      header: { ...p.header, [k]: e.target.value },
                    }))
                  }
                  style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
                />
              )
            )}

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
                      onClick={() => {
                        const newExp = [...resume.experience];
                        newExp.splice(idx, 1);
                        setResume((p: any) => ({ ...p, experience: newExp }));
                      }}
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
              onClick={() => {
                setResume((p: any) => ({
                  ...p,
                  experience: [...p.experience, { title: "", company: "", location: "", from: "", to: "", bullets: [""] }]
                }));
              }}
              style={{ padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
            >
              + Add Another Experience
            </button>

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

        {/* right preview */}
        {/* <div style={{ display: "grid", placeItems: "start center" }}>
          <div style={{ width: "100%", maxWidth: 860 }}>
            <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Preview (A4 Format)</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
              This preview shows exactly how your resume will look when downloaded as PDF
            </div>

            <div ref={printRef} style={{ background: "white", padding: 24, borderRadius: 14, border: "1px solid #eef2f7", width: "794px", maxWidth: "100%", boxSizing: "border-box" }}>
              <ResumePreview schema={schema} data={resume} />
            </div>
            
            <div style={{ marginTop: 16, padding: 12, backgroundColor: "#f8fafc", borderRadius: 10, fontSize: 12, color: "#64748b" }}>
              <strong>Note:</strong> The preview above shows A4 paper size. Download as PDF for perfect A4 format or as Word document for further editing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} */}
<div style={{ display: "grid", placeItems: "start center" }}>
          <div style={{ width: "100%", maxWidth: 860 }}>
            <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Preview (A4 Format)</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
              This preview shows exactly how your resume will look when downloaded as PDF
            </div>

            <div
              ref={printRef}
              style={{
                background: "white",
                padding: 24,
                borderRadius: 14,
                border: "1px solid #eef2f7",
                width: "794px",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <ResumePreview schema={schema} data={resume} />
            </div>

            <div style={{ marginTop: 16, padding: 12, backgroundColor: "#f8fafc", borderRadius: 10, fontSize: 12, color: "#64748b" }}>
              <strong>Note:</strong> The preview above shows A4 paper size. Download as PDF for perfect A4 format or as Word document for further editing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}