// // // // // import { useEffect, useMemo, useRef, useState } from "react";
// // // // // import { useNavigate, useParams } from "react-router-dom";
// // // // // import axios from "../../api/axiosInstance";
// // // // // import ResumePreview from "./ResumePreview";

// // // // // import html2canvas from "html2canvas";
// // // // // import jsPDF from "jspdf";
// // // // // import { saveAs } from "file-saver";
// // // // // import { Document, Packer, Paragraph, TextRun } from "docx";

// // // // // function authHeaders() {
// // // // //   const token = localStorage.getItem("access") || "";
// // // // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // // // }

// // // // // function emptyResume() {
// // // // //   return {
// // // // //     header: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", website: "" },
// // // // //     summary: "",
// // // // //     experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
// // // // //     education: [{ school: "", degree: "", from: "", to: "" }],
// // // // //     skills: { programming: [], frameworks: [], tools: [] },
// // // // //     projects: [{ name: "", desc: "" }],
// // // // //   };
// // // // // }

// // // // // export default function AdminTemplateTestEditor() {
// // // // //   const nav = useNavigate();
// // // // //   const { id } = useParams();
// // // // //   const templateId = Number(id);

// // // // //   const [tpl, setTpl] = useState<any>(null);
// // // // //   const [schema, setSchema] = useState<any>(null);
// // // // //   const [resume, setResume] = useState<any>(emptyResume()); // Local data for testing
// // // // //   const [title, setTitle] = useState<string>("Test Resume");

// // // // //   const printRef = useRef<HTMLDivElement | null>(null);

// // // // //   useEffect(() => {
// // // // //     const load = async () => {
// // // // //       const t = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// // // // //       setTpl(t.data);
// // // // //       setSchema(t.data?.schema || {});
// // // // //     };
// // // // //     if (templateId) load().catch(console.error);
// // // // //   }, [templateId]);

// // // // //   const safeFileName = useMemo(() => {
// // // // //     const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
// // // // //     return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
// // // // //   }, [resume, title]);

// // // // //   const downloadPDF = async () => {
// // // // //     const el = printRef.current;
// // // // //     if (!el) return;

// // // // //     const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
// // // // //     const img = canvas.toDataURL("image/png");

// // // // //     const pdf = new jsPDF("p", "pt", "a4");
// // // // //     const pageWidth = pdf.internal.pageSize.getWidth();
// // // // //     const pageHeight = pdf.internal.pageSize.getHeight();

// // // // //     const imgWidth = pageWidth;
// // // // //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

// // // // //     let y = 0;
// // // // //     if (imgHeight <= pageHeight) {
// // // // //       pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);
// // // // //     } else {
// // // // //       let remaining = imgHeight;
// // // // //       let position = 0;
// // // // //       while (remaining > 0) {
// // // // //         pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
// // // // //         remaining -= pageHeight;
// // // // //         position -= pageHeight;
// // // // //         if (remaining > 0) pdf.addPage();
// // // // //       }
// // // // //     }
// // // // //     pdf.save(`${safeFileName}.pdf`);
// // // // //   };

// // // // //   const downloadDOCX = async () => {
// // // // //     const h = resume?.header || {};
// // // // //     const doc = new Document({
// // // // //       sections: [
// // // // //         {
// // // // //           properties: {},
// // // // //           children: [
// // // // //             new Paragraph({ children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36 })] }),
// // // // //             new Paragraph({ children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24 })] }),
// // // // //             new Paragraph(`${h.email || ""}  ${h.phone || ""}  ${h.location || ""}`.trim()),
// // // // //             new Paragraph({ text: " " }),
// // // // //             new Paragraph({ children: [new TextRun({ text: "Professional Summary", bold: true, size: 22 })] }),
// // // // //             new Paragraph(resume.summary || ""),
// // // // //             // Add more sections as needed (experience, etc.) - expand based on your needs
// // // // //           ],
// // // // //         },
// // // // //       ],
// // // // //     });

// // // // //     const blob = await Packer.toBlob(doc);
// // // // //     saveAs(blob, `${safeFileName}.docx`);
// // // // //   };

// // // // //   if (!tpl || !schema) return <div style={{ padding: 20 }}>Loading...</div>;

// // // // //   return (
// // // // //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// // // // //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
// // // // //         <div>
// // // // //           <div style={{ fontWeight: 900, fontSize: 18 }}>Test: {tpl.name}</div>
// // // // //           <div style={{ fontSize: 12, color: "#6b7280" }}>Edit data to preview</div>
// // // // //         </div>
// // // // //         <div style={{ display: "flex", gap: 8 }}>
// // // // //           <button onClick={() => nav(`/admin/templates/${templateId}`)} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
// // // // //           <button onClick={downloadPDF} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>PDF</button>
// // // // //           <button onClick={downloadDOCX} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>Word</button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: 14 }}>
// // // // //         {/* Left: Editor */}
// // // // //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12, overflowY: "auto" }}>
// // // // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Test Title</label>
// // // // //           <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

// // // // //           <div style={{ height: 10 }} />

// // // // //           <div style={{ display: "grid", gap: 10 }}>
// // // // //             <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>
// // // // //             {(["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const).map((k) => (
// // // // //               <input
// // // // //                 key={k}
// // // // //                 placeholder={k}
// // // // //                 value={resume.header[k]}
// // // // //                 onChange={(e) => setResume((p: any) => ({ ...p, header: { ...p.header, [k]: e.target.value } }))}
// // // // //                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// // // // //               />
// // // // //             ))}

// // // // //             <div style={{ fontWeight: 900, marginTop: 8 }}>Summary</div>
// // // // //             <textarea
// // // // //               value={resume.summary}
// // // // //               onChange={(e) => setResume((p: any) => ({ ...p, summary: e.target.value }))}
// // // // //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
// // // // //             />

// // // // //             {/* Add more fields like experience, education, etc. - expand as per your SAMPLE data */}
// // // // //             <div style={{ fontWeight: 900, marginTop: 8 }}>Experience (add more if needed)</div>
// // // // //             <input
// // // // //               placeholder="Title"
// // // // //               value={resume.experience[0].title}
// // // // //               onChange={(e) => setResume((p: any) => ({ ...p, experience: [{ ...p.experience[0], title: e.target.value }] }))}
// // // // //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// // // // //             />
// // // // //             {/* ... add rest fields similarly */}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Right: Preview */}
// // // // //         <div style={{ display: "grid", placeItems: "start center" }}>
// // // // //           <div style={{ width: "100%", maxWidth: 860 }}>
// // // // //             <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Test Preview</div>
// // // // //             <div ref={printRef} style={{ background: "white", padding: 12, borderRadius: 14, border: "1px solid #eef2f7" }}>
// // // // //               <ResumePreview schema={schema} data={resume} /> {/* Pass real data */}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import { useEffect, useMemo, useRef, useState } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import axios from "../../api/axiosInstance";
// // // // import ResumePreview from "./ResumePreview";

// // // // import html2canvas from "html2canvas";
// // // // import jsPDF from "jspdf";
// // // // import { saveAs } from "file-saver";
// // // // import { Document, Packer, Paragraph, TextRun } from "docx";

// // // // function authHeaders() {
// // // //   const token = localStorage.getItem("access") || "";
// // // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // // }

// // // // function emptyResume() {
// // // //   return {
// // // //     header: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", website: "" },
// // // //     summary: "",
// // // //     experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
// // // //     education: [{ school: "", degree: "", from: "", to: "" }],
// // // //     skills: { programming: [], frameworks: [], tools: [] },
// // // //     projects: [{ name: "", desc: "" }],
// // // //   };
// // // // }

// // // // export default function AdminTemplateTestEditor() {
// // // //   const nav = useNavigate();
// // // //   const { id } = useParams();
// // // //   const templateId = Number(id);

// // // //   const [tpl, setTpl] = useState<any>(null);
// // // //   const [schema, setSchema] = useState<any>(null);
// // // //   const [resume, setResume] = useState<any>(emptyResume()); // Local data for testing
// // // //   const [title, setTitle] = useState<string>("Test Resume");

// // // //   const printRef = useRef<HTMLDivElement | null>(null);

// // // //   useEffect(() => {
// // // //     const load = async () => {
// // // //       const t = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// // // //       setTpl(t.data);
// // // //       setSchema(t.data?.schema || {});
// // // //     };
// // // //     if (templateId) load().catch(console.error);
// // // //   }, [templateId]);

// // // //   const safeFileName = useMemo(() => {
// // // //     const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
// // // //     return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
// // // //   }, [resume, title]);

// // // //   const addExperience = () => {
// // // //     setResume((p: any) => ({
// // // //       ...p,
// // // //       experience: [...p.experience, { title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
// // // //     }));
// // // //   };

// // // //   const removeExperience = (index: number) => {
// // // //     setResume((p: any) => ({
// // // //       ...p,
// // // //       experience: p.experience.filter((_: any, i: number) => i !== index),
// // // //     }));
// // // //   };

// // // //   // Similar for other arrays

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
// // // //     let heightLeft = imgHeight;

// // // //     pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
// // // //     heightLeft -= pageHeight;

// // // //     while (heightLeft > 0) {
// // // //       pdf.addPage();
// // // //       position = heightLeft - imgHeight;
// // // //       pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
// // // //       heightLeft -= pageHeight;
// // // //     }
// // // //     pdf.save(`${safeFileName}.pdf`);
// // // //   };

// // // //   const downloadDOCX = async () => {
// // // //     const h = resume?.header || {};
// // // //     const doc = new Document({
// // // //       sections: [
// // // //         {
// // // //           properties: {},
// // // //           children: [
// // // //             new Paragraph({ children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36 })] }),
// // // //             new Paragraph({ children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24 })] }),
// // // //             new Paragraph(`${h.email || ""}  ${h.phone || ""}  ${h.location || ""}`.trim()),
// // // //             new Paragraph({ text: " " }),
// // // //             new Paragraph({ children: [new TextRun({ text: "Professional Summary", bold: true, size: 22 })] }),
// // // //             new Paragraph(resume.summary || ""),
// // // //             // Expand
// // // //           ],
// // // //         },
// // // //       ],
// // // //     });

// // // //     const blob = await Packer.toBlob(doc);
// // // //     saveAs(blob, `${safeFileName}.docx`);
// // // //   };

// // // //   if (!tpl || !schema) return <div style={{ padding: 20 }}>Loading...</div>;

// // // //   return (
// // // //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// // // //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
// // // //         <div>
// // // //           <div style={{ fontWeight: 900, fontSize: 18 }}>Test: {tpl.name}</div>
// // // //           <div style={{ fontSize: 12, color: "#6b7280" }}>Edit data to preview</div>
// // // //         </div>
// // // //         <div style={{ display: "flex", gap: 8 }}>
// // // //           <button onClick={() => nav(`/admin/templates/builder/${templateId}`)} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
// // // //           <button onClick={downloadPDF} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>PDF</button>
// // // //           <button onClick={downloadDOCX} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>Word</button>
// // // //         </div>
// // // //       </div>

// // // //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: 14 }}>
// // // //         {/* Left: Editor */}
// // // //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12, overflowY: "auto" }}>
// // // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Test Title</label>
// // // //           <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

// // // //           <div style={{ height: 10 }} />

// // // //           <div style={{ display: "grid", gap: 10 }}>
// // // //             <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>
// // // //             {Object.keys(resume.header).map((key) => (
// // // //               <input
// // // //                 key={key}
// // // //                 placeholder={key}
// // // //                 value={resume.header[key]}
// // // //                 onChange={(e) => setResume((p: any) => ({ ...p, header: { ...p.header, [key]: e.target.value } }))}
// // // //                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// // // //               />
// // // //             ))}

// // // //             <div style={{ fontWeight: 900, marginTop: 8 }}>Summary</div>
// // // //             <textarea
// // // //               value={resume.summary}
// // // //               onChange={(e) => setResume((p: any) => ({ ...p, summary: e.target.value }))}
// // // //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
// // // //             />

// // // //             <div style={{ fontWeight: 900, marginTop: 8 }}>Experience</div>
// // // //             {resume.experience.map((exp: any, index: number) => (
// // // //               <div key={index} style={{ border: "1px solid #e5e7eb", padding: 10, borderRadius: 10, marginTop: 6 }}>
// // // //                 <input
// // // //                   placeholder="Title"
// // // //                   value={exp.title}
// // // //                   onChange={(e) => {
// // // //                     const newExp = [...resume.experience];
// // // //                     newExp[index].title = e.target.value;
// // // //                     setResume((p: any) => ({ ...p, experience: newExp }));
// // // //                   }}
// // // //                   style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// // // //                 />
// // // //                 <input
// // // //                   placeholder="Company"
// // // //                   value={exp.company}
// // // //                   onChange={(e) => {
// // // //                     const newExp = [...resume.experience];
// // // //                     newExp[index].company = e.target.value;
// // // //                     setResume((p: any) => ({ ...p, experience: newExp }));
// // // //                   }}
// // // //                   style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }}
// // // //                 />
// // // //                 <input
// // // //                   placeholder="Location"
// // // //                   value={exp.location}
// // // //                   onChange={(e) => {
// // // //                     const newExp = [...resume.experience];
// // // //                     newExp[index].location = e.target.value;
// // // //                     setResume((p: any) => ({ ...p, experience: newExp }));
// // // //                   }}
// // // //                   style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }}
// // // //                 />
// // // //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
// // // //                   <input
// // // //                     placeholder="From (YYYY-MM)"
// // // //                     value={exp.from}
// // // //                     onChange={(e) => {
// // // //                       const newExp = [...resume.experience];
// // // //                       newExp[index].from = e.target.value;
// // // //                       setResume((p: any) => ({ ...p, experience: newExp }));
// // // //                     }}
// // // //                     style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// // // //                   />
// // // //                   <input
// // // //                     placeholder="To (Present / YYYY-MM)"
// // // //                     value={exp.to}
// // // //                     onChange={(e) => {
// // // //                       const newExp = [...resume.experience];
// // // //                       newExp[index].to = e.target.value;
// // // //                       setResume((p: any) => ({ ...p, experience: newExp }));
// // // //                     }}
// // // //                     style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// // // //                   />
// // // //                 </div>
// // // //                 <div style={{ fontWeight: 900, marginTop: 8 }}>Bullets</div>
// // // //                 {exp.bullets.map((bullet: string, bIndex: number) => (
// // // //                   <input
// // // //                     key={bIndex}
// // // //                     value={bullet}
// // // //                     onChange={(e) => {
// // // //                       const newExp = [...resume.experience];
// // // //                       newExp[index].bullets[bIndex] = e.target.value;
// // // //                       setResume((p: any) => ({ ...p, experience: newExp }));
// // // //                     }}
// // // //                     style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }}
// // // //                   />
// // // //                 ))}
// // // //                 <button onClick={() => removeExperience(index)} style={{ marginTop: 6, color: "red" }}>Remove</button>
// // // //               </div>
// // // //             ))}
// // // //             <button onClick={addExperience} style={{ marginTop: 6 }}>Add Experience</button>

// // // //             {/* Similar blocks for education, skills, projects */}
// // // //           </div>
// // // //         </div>

// // // //         {/* Right: Preview */}
// // // //         <div style={{ display: "grid", placeItems: "start center" }}>
// // // //           <div style={{ width: "100%", maxWidth: 860 }}>
// // // //             <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Test Preview</div>
// // // //             <div ref={printRef} style={{ background: "white", padding: 12, borderRadius: 14, border: "1px solid #eef2f7" }}>
// // // //               <ResumePreview schema={schema} data={resume} />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useEffect, useMemo, useRef, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import axios from "../../api/axiosInstance";
// // // import ResumePreview from "./ResumePreview";
// // // import html2canvas from "html2canvas";
// // // import jsPDF from "jspdf";
// // // import { saveAs } from "file-saver";
// // // import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

// // // function authHeaders() {
// // //   const token = localStorage.getItem("access") || "";
// // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // }

// // // const emptyResume = {
// // //   header: { fullName: "John Doe", jobTitle: "Software Engineer", email: "john@example.com", phone: "+91 98765 43210", location: "Delhi, India", linkedin: "linkedin.com/in/john", website: "john.dev" },
// // //   summary: "Passionate developer with experience in full-stack development.",
// // //   experience: [{ title: "Senior Developer", company: "ABC Corp", location: "Delhi", from: "2022-01", to: "Present", bullets: ["Led projects", "Improved performance"] }],
// // //   education: [{ school: "Delhi University", degree: "B.Tech Computer Science", from: "2018", to: "2022" }],
// // //   skills: { programming: ["JavaScript", "Python"], frameworks: ["React", "Django"], tools: ["Git", "Docker"] },
// // //   projects: [{ name: "My Portfolio", desc: "Personal website built with React" }],
// // // };

// // // export default function AdminTemplateTestEditor() {
// // //   const nav = useNavigate();
// // //   const { id } = useParams();
// // //   const templateId = Number(id);

// // //   const [tpl, setTpl] = useState<any>(null);
// // //   const [schema, setSchema] = useState<any>(null);
// // //   const [data, setData] = useState<any>(emptyResume);

// // //   const printRef = useRef<HTMLDivElement | null>(null);

// // //   useEffect(() => {
// // //     const load = async () => {
// // //       const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// // //       setTpl(res.data);
// // //       setSchema(res.data.schema || {});
// // //     };
// // //     if (templateId) load();
// // //   }, [templateId]);

// // //   const downloadPDF = async () => {
// // //     const el = printRef.current;
// // //     if (!el) return;

// // //     const canvas = await html2canvas(el, { scale: 2 });
// // //     const imgData = canvas.toDataURL("image/png");

// // //     const pdf = new jsPDF("p", "mm", "a4");
// // //     const width = pdf.internal.pageSize.getWidth();
// // //     const height = pdf.internal.pageSize.getHeight();
// // //     const imgHeight = (canvas.height * width) / canvas.width;

// // //     let remaining = imgHeight;
// // //     let y = 0;

// // //     pdf.addImage(imgData, "PNG", 0, y, width, imgHeight);
// // //     remaining -= height;

// // //     while (remaining > 0) {
// // //       pdf.addPage();
// // //       y = -height;
// // //       pdf.addImage(imgData, "PNG", 0, y, width, imgHeight);
// // //       remaining -= height;
// // //     }

// // //     pdf.save(`${tpl?.name || "test"}-preview.pdf`);
// // //   };

// // //   const downloadDOCX = async () => {
// // //     const doc = new Document({
// // //       sections: [{
// // //         children: [
// // //           new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(data.header.fullName)] }),
// // //           new Paragraph(data.header.jobTitle),
// // //           new Paragraph(`${data.header.email} | ${data.header.phone} | ${data.header.location}`),
// // //           new Paragraph(""),
// // //           new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Summary")] }),
// // //           new Paragraph(data.summary),
// // //           new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Experience")] }),
// // //           ...data.experience.flatMap((e: any) => [
// // //             new Paragraph({ children: [new TextRun({ text: e.title, bold: true })] }),
// // //             new Paragraph(`${e.company}, ${e.location} (${e.from} - ${e.to})`),
// // //             ...e.bullets.map((b: string) => new Paragraph(`• ${b}`)),
// // //           ]),
// // //         ],
// // //       }],
// // //     });

// // //     const blob = await Packer.toBlob(doc);
// // //     saveAs(blob, `${tpl?.name || "test"}-preview.docx`);
// // //   };

// // //   if (!tpl || !schema) return <div>Loading...</div>;

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// // //       <div style={{ position: "sticky", top: 0, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
// // //         <div>
// // //           <h2 style={{ margin: 0 }}>Test: {tpl.name}</h2>
// // //           <p style={{ margin: 0, color: "#666" }}>Fill data to see live preview</p>
// // //         </div>
// // //         <div style={{ display: "flex", gap: 10 }}>
// // //           <button onClick={() => nav(-1)} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #e5e7eb" }}>Back</button>
// // //           <button onClick={downloadPDF} style={{ padding: "10px 16px", borderRadius: 10, background: "#dc2626", color: "white" }}>Download PDF</button>
// // //           <button onClick={downloadDOCX} style={{ padding: "10px 16px", borderRadius: 10, background: "#7c3aed", color: "white" }}>Download Word</button>
// // //         </div>
// // //       </div>

// // //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 20 }}>
// // //         <div style={{ background: "white", borderRadius: 14, padding: 20, border: "1px solid #e5e7eb" }}>
// // //           <h3>Edit Test Data</h3>
// // //           {/* Full form with all sections - similar to previous but with dynamic add/remove */}
// // //           <input placeholder="Full Name" value={data.header.fullName} onChange={(e) => setData((p: any) => ({ ...p, header: { ...p.header, fullName: e.target.value } }))} style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ccc" }} />
// // //           {/* Add other fields similarly */}
// // //         </div>

// // //         <div style={{ display: "grid", placeItems: "center" }}>
// // //           <h3>Live Preview</h3>
// // //           <div ref={printRef} style={{ background: "white", padding: 30, borderRadius: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
// // //             <ResumePreview schema={schema} data={data} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "../../api/axiosInstance";
// // import ResumePreview from "./ResumePreview";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import { saveAs } from "file-saver";
// // import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

// // function authHeaders() {
// //   const token = localStorage.getItem("access") || "";
// //   return token ? { Authorization: `Bearer ${token}` } : {};
// // }

// // const emptyResume = {
// //   header: { fullName: "John Doe", jobTitle: "Software Engineer", email: "john@example.com", phone: "+91 9876543210", location: "Delhi, India", linkedin: "", website: "" },
// //   summary: "",
// //   experience: [{ title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
// //   education: [{ school: "", degree: "", from: "", to: "" }],
// //   skills: { programming: [], frameworks: [], tools: [] },
// //   projects: [{ name: "", desc: "" }],
// // };

// // export default function AdminTemplateTestEditor() {
// //   const navigate = useNavigate();
// //   const { id } = useParams();
// //   const templateId = Number(id);

// //   const [tpl, setTpl] = useState<any>(null);
// //   const [schema, setSchema] = useState<any>(null);
// //   const [data, setData] = useState<any>(emptyResume);

// //   const printRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     const load = async () => {
// //       const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// //       setTpl(res.data);
// //       setSchema(res.data?.schema || {});
// //     };
// //     if (templateId) load().catch(console.error);
// //   }, [templateId]);

// //   const addExperience = () => setData((p: any) => ({ ...p, experience: [...p.experience, { title: "", company: "", location: "", from: "", to: "", bullets: [""] }] }));
// //   const removeExperience = (i: number) => setData((p: any) => ({ ...p, experience: p.experience.filter((_: any, idx: number) => idx !== i) }));

// //   const addEducation = () => setData((p: any) => ({ ...p, education: [...p.education, { school: "", degree: "", from: "", to: "" }] }));
// //   const removeEducation = (i: number) => setData((p: any) => ({ ...p, education: p.education.filter((_: any, idx: number) => idx !== i) }));

// //   const addProject = () => setData((p: any) => ({ ...p, projects: [...p.projects, { name: "", desc: "" }] }));
// //   const removeProject = (i: number) => setData((p: any) => ({ ...p, projects: p.projects.filter((_: any, idx: number) => idx !== i) }));

// //   const downloadPDF = async () => {
// //     const el = printRef.current;
// //     if (!el) return;

// //     const canvas = await html2canvas(el, { scale: 2, useCORS: true });
// //     const imgData = canvas.toDataURL("image/png");

// //     const pdf = new jsPDF("p", "mm", "a4");
// //     const width = pdf.internal.pageSize.getWidth();
// //     const height = pdf.internal.pageSize.getHeight();
// //     const imgHeight = (canvas.height * width) / canvas.width;

// //     let remaining = imgHeight;
// //     let y = 0;

// //     pdf.addImage(imgData, "PNG", 0, y, width, imgHeight);
// //     remaining -= height;

// //     while (remaining > 0) {
// //       pdf.addPage();
// //       y = -height;
// //       pdf.addImage(imgData, "PNG", 0, y, width, imgHeight);
// //       remaining -= height;
// //     }

// //     pdf.save(`${tpl?.name || "test"}-preview.pdf`);
// //   };

// //   const downloadDOCX = async () => {
// //     const doc = new Document({
// //       sections: [{
// //         children: [
// //           new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(data.header.fullName)] }),
// //           new Paragraph(data.header.jobTitle),
// //           new Paragraph(`${data.header.email} | ${data.header.phone} | ${data.header.location}`),
// //           new Paragraph(""),
// //           new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Summary")] }),
// //           new Paragraph(data.summary),
// //           new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Experience")] }),
// //           ...data.experience.flatMap((e: any) => [
// //             new Paragraph({ children: [new TextRun({ text: e.title, bold: true })] }),
// //             new Paragraph(`${e.company}, ${e.location} (${e.from} - ${e.to})`),
// //             ...e.bullets.map((b: string) => new Paragraph(`• ${b}`)),
// //           ]),
// //           new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Projects")] }),
// //           ...data.projects.map((p: any) => [
// //             new Paragraph({ children: [new TextRun({ text: p.name, bold: true })] }),
// //             new Paragraph(p.desc),
// //           ]),
// //         ],
// //       }],
// //     });

// //     const blob = await Packer.toBlob(doc);
// //     saveAs(blob, `${tpl?.name || "test"}-preview.docx`);
// //   };

// //   if (!tpl || !schema) return <div>Loading template...</div>;

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
// //         <div>
// //           <div style={{ fontWeight: 900, fontSize: 18 }}>Test: {tpl.name}</div>
// //           <div style={{ fontSize: 12, color: "#6b7280" }}>Edit data to preview</div>
// //         </div>
// //         <div style={{ display: "flex", gap: 8 }}>
// //           <button onClick={() => navigate(-1)} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>Back</button>
// //           <button onClick={downloadPDF} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>PDF</button>
// //           <button onClick={downloadDOCX} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>Word</button>
// //         </div>
// //       </div>

// //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: 14 }}>
// //         {/* Left: Editor */}
// //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12, overflowY: "auto" }}>
// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Test Title</label>
// //           <input value={data.title || "Test Resume"} onChange={(e) => setData((p: any) => ({ ...p, title: e.target.value }))} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

// //           <div style={{ height: 10 }} />

// //           <div style={{ display: "grid", gap: 10 }}>
// //             <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>
// //             {Object.keys(data.header).map((k) => (
// //               <input
// //                 key={k}
// //                 placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
// //                 value={data.header[k]}
// //                 onChange={(e) => setData((p: any) => ({ ...p, header: { ...p.header, [k]: e.target.value } }))}
// //                 style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
// //               />
// //             ))}

// //             <div style={{ fontWeight: 900, marginTop: 8 }}>Summary</div>
// //             <textarea
// //               value={data.summary}
// //               onChange={(e) => setData((p: any) => ({ ...p, summary: e.target.value }))}
// //               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
// //             />

// //             <div style={{ fontWeight: 900, marginTop: 8 }}>Experience</div>
// //             {data.experience.map((exp: any, index: number) => (
// //               <div key={index} style={{ border: "1px solid #e5e7eb", padding: 10, borderRadius: 10, marginTop: 6 }}>
// //                 <input placeholder="Title" value={exp.title} onChange={(e) => {
// //                   const newExp = [...data.experience];
// //                   newExp[index].title = e.target.value;
// //                   setData(p => ({ ...p, experience: newExp }));
// //                 }} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
// //                 <input placeholder="Company" value={exp.company} onChange={(e) => {
// //                   const newExp = [...data.experience];
// //                   newExp[index].company = e.target.value;
// //                   setData(p => ({ ...p, experience: newExp }));
// //                 }} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }} />
// //                 <input placeholder="Location" value={exp.location} onChange={(e) => {
// //                   const newExp = [...data.experience];
// //                   newExp[index].location = e.target.value;
// //                   setData(p => ({ ...p, experience: newExp }));
// //                 }} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }} />
// //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
// //                   <input placeholder="From" value={exp.from} onChange={(e) => {
// //                     const newExp = [...data.experience];
// //                     newExp[index].from = e.target.value;
// //                     setData(p => ({ ...p, experience: newExp }));
// //                   }} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
// //                   <input placeholder="To" value={exp.to} onChange={(e) => {
// //                     const newExp = [...data.experience];
// //                     newExp[index].to = e.target.value;
// //                     setData(p => ({ ...p, experience: newExp }));
// //                   }} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />
// //                 </div>
// //                 <div style={{ fontWeight: 900, marginTop: 8 }}>Bullets</div>
// //                 {exp.bullets.map((bullet: string, bIndex: number) => (
// //                   <input key={bIndex} value={bullet} onChange={(e) => {
// //                     const newExp = [...data.experience];
// //                     newExp[index].bullets[bIndex] = e.target.value;
// //                     setData(p => ({ ...p, experience: newExp }));
// //                   }} style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6 }} />
// //                 ))}
// //                 <button onClick={() => removeExperience(index)} style={{ marginTop: 6, color: "red" }}>Remove</button>
// //               </div>
// //             ))}
// //             <button onClick={addExperience} style={{ marginTop: 6 }}>Add Experience</button>

// //             {/* Add similar blocks for Education, Skills, Projects if needed */}
// //           </div>
// //         </div>

// //         {/* Right: Preview */}
// //         <div style={{ display: "grid", placeItems: "start center" }}>
// //           <div style={{ width: "100%", maxWidth: 860 }}>
// //             <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Test Preview</div>
// //             <div ref={printRef} style={{ background: "white", padding: 12, borderRadius: 14, border: "1px solid #eef2f7" }}>
// //               <ResumePreview schema={schema} data={data} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/dashboard/AdminTemplateTestEditor.tsx
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

// const SAMPLE_DATA = {
//   header: {
//     fullName: "John Anderson",
//     jobTitle: "Senior Software Engineer",
//     email: "john.anderson@email.com",
//     phone: "+1 (555) 123-4567",
//     location: "San Francisco, CA",
//     linkedin: "linkedin.com/in/johnanderson",
//     website: "johnanderson.dev",
//   },
//   summary: "Results-driven software engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering high-quality software solutions.",
//   experience: [
//     {
//       title: "Senior Software Engineer",
//       company: "Tech Innovations Inc.",
//       location: "San Francisco, CA",
//       from: "2021-01",
//       to: "Present",
//       bullets: [
//         "Led microservices architecture serving 2M+ daily active users, improving system performance by 40%",
//         "Implemented CI/CD pipelines reducing deployment time by 60% and increasing deployment frequency",
//         "Mentored 5 junior developers and conducted code reviews ensuring high code quality standards",
//         "Collaborated with product managers to define technical requirements and project timelines"
//       ],
//     },
//     {
//       title: "Software Engineer",
//       company: "Digital Solutions Co.",
//       location: "Austin, TX",
//       from: "2018-03",
//       to: "2020-12",
//       bullets: [
//         "Built React-based dashboard improving customer engagement by 40% through real-time analytics",
//         "Developed REST APIs handling 10K+ requests per minute with 99.9% uptime",
//         "Optimized database queries reducing response time by 70%",
//         "Implemented automated testing increasing test coverage from 60% to 90%"
//       ],
//     },
//     {
//       title: "Junior Developer",
//       company: "StartUp Labs",
//       location: "New York, NY",
//       from: "2016-06",
//       to: "2018-02",
//       bullets: [
//         "Developed responsive web applications using React and Node.js",
//         "Collaborated with UX designers to implement user-friendly interfaces",
//         "Participated in agile development processes and sprint planning",
//         "Fixed critical bugs improving application stability"
//       ],
//     },
//   ],
//   education: [
//     {
//       school: "University of California, Berkeley",
//       degree: "B.S. Computer Science",
//       from: "2012",
//       to: "2016",
//     },
//     {
//       school: "Stanford University",
//       degree: "M.S. Software Engineering",
//       from: "2016",
//       to: "2018",
//     },
//   ],
//   skills: {
//     programming: ["JavaScript", "TypeScript", "Python", "Go", "SQL", "Java", "C++"],
//     frameworks: ["React", "Node.js", "Express", "Django", "Spring Boot", "Next.js"],
//     tools: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Git", "Jenkins", "GraphQL"],
//   },
//   projects: [
//     { 
//       name: "E-commerce Platform", 
//       desc: "Full-stack platform with real-time inventory management, order tracking, and admin dashboard. Built with React, Node.js, and MongoDB." 
//     },
//     { 
//       name: "Task Management App", 
//       desc: "Collaboration tool with live updates, drag-and-drop interface, and team management features. Used by 50+ teams daily." 
//     },
//     { 
//       name: "AI Content Generator", 
//       desc: "Machine learning-powered content generation platform with GPT integration and analytics dashboard." 
//     },
//   ],
//   certifications: [
//     "AWS Certified Solutions Architect",
//     "Google Professional Cloud Architect",
//     "React Developer Certification",
//     "Scrum Master Certified"
//   ],
//   languages: [
//     "English (Native)",
//     "Spanish (Professional)",
//     "French (Intermediate)"
//   ]
// };

// export default function AdminTemplateTestEditor() {
//   const nav = useNavigate();
//   const { id } = useParams();
//   const templateId = Number(id);

//   const [tpl, setTpl] = useState<any>(null);
//   const [schema, setSchema] = useState<any>(null);
//   const [resume, setResume] = useState<any>(emptyResume());
//   const [title, setTitle] = useState<string>("Test Resume");
//   const [useSampleData, setUseSampleData] = useState<boolean>(true);
//   const [exporting, setExporting] = useState<boolean>(false);

//   const printRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       const t = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
//       setTpl(t.data);
//       setSchema(t.data?.schema || {});
      
//       // Load sample data by default
//       if (useSampleData) {
//         setResume(SAMPLE_DATA);
//       }
//     };
//     if (templateId) load().catch(console.error);
//   }, [templateId, useSampleData]);

//   const safeFileName = useMemo(() => {
//     const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
//     return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
//   }, [resume, title]);

//   const downloadPDF = async () => {
//     setExporting(true);
//     try {
//       const el = printRef.current;
//       if (!el) return;

//       // Set A4 dimensions (210mm x 297mm at 96 DPI)
//       const A4_WIDTH = 794; // pixels at 96 DPI
//       const A4_HEIGHT = 1123; // pixels at 96 DPI
      
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();

//       // Calculate optimal scale for A4
//       const elWidth = el.offsetWidth;
//       const scale = A4_WIDTH / elWidth;
      
//       const canvas = await html2canvas(el, { 
//         scale: scale * 2, // Higher scale for better quality
//         useCORS: true, 
//         backgroundColor: "#ffffff",
//         width: A4_WIDTH,
//         windowWidth: A4_WIDTH,
//         logging: false,
//         onclone: (clonedDoc) => {
//           // Ensure cloned element has proper styles for PDF
//           const clonedEl = clonedDoc.getElementById('print-area');
//           if (clonedEl) {
//             clonedEl.style.width = `${A4_WIDTH}px`;
//             clonedEl.style.maxWidth = `${A4_WIDTH}px`;
//             clonedEl.style.boxSizing = 'border-box';
//           }
//         }
//       });
      
//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const imgWidth = pageWidth;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       // Calculate position to center
//       const yOffset = Math.max(0, (pageHeight - imgHeight) / 2);
      
//       if (imgHeight <= pageHeight) {
//         pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);
//       } else {
//         // Multi-page PDF
//         let heightLeft = imgHeight;
//         let position = 0;
        
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
        
//         while (heightLeft > 0) {
//           position -= pageHeight;
//           pdf.addPage();
//           pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//           heightLeft -= pageHeight;
//         }
//       }
      
//       pdf.save(`${safeFileName}.pdf`);
//     } catch (error) {
//       console.error("PDF generation error:", error);
//       alert("Error generating PDF. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const downloadDOCX = async () => {
//     setExporting(true);
//     try {
//       const h = resume?.header || {};
//       const doc = new Document({
//         sections: [
//           {
//             properties: {
//               page: {
//                 margin: {
//                   top: 1000,
//                   bottom: 1000,
//                   left: 1000,
//                   right: 1000,
//                 },
//               },
//             },
//             children: [
//               // Header
//               new Paragraph({
//                 children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36, font: "Calibri" })],
//                 alignment: "center",
//                 spacing: { after: 200 }
//               }),
              
//               // Job Title
//               new Paragraph({
//                 children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24, color: "2E74B5", font: "Calibri" })],
//                 alignment: "center",
//                 spacing: { after: 400 }
//               }),
              
//               // Contact Information
//               new Paragraph({
//                 children: [
//                   new TextRun({ text: h.email || "", size: 22 }),
//                   new TextRun({ text: " | ", size: 22 }),
//                   new TextRun({ text: h.phone || "", size: 22 }),
//                   new TextRun({ text: " | ", size: 22 }),
//                   new TextRun({ text: h.location || "", size: 22 }),
//                   new TextRun({ text: " | ", size: 22 }),
//                   new TextRun({ text: h.linkedin || "", size: 22 }),
//                   new TextRun({ text: " | ", size: 22 }),
//                   new TextRun({ text: h.website || "", size: 22 }),
//                 ],
//                 alignment: "center",
//                 spacing: { after: 400 }
//               }),
              
//               new Paragraph({ text: " " }),
              
//               // Summary Section
//               new Paragraph({
//                 children: [
//                   new TextRun({ 
//                     text: "PROFESSIONAL SUMMARY", 
//                     bold: true,
//                     size: 26,
//                     color: "2E74B5",
//                     font: "Calibri"
//                   })
//                 ],
//                 spacing: { before: 200, after: 200 }
//               }),
//               new Paragraph({
//                 text: resume?.summary || "",
//                 spacing: { after: 400 }
//               }),
              
//               // Experience Section
//               new Paragraph({
//                 children: [
//                   new TextRun({ 
//                     text: "WORK EXPERIENCE", 
//                     bold: true,
//                     size: 26,
//                     color: "2E74B5",
//                     font: "Calibri"
//                   })
//                 ],
//                 spacing: { before: 200, after: 200 }
//               }),
//               ...(resume?.experience || []).flatMap((x: any, idx: number) => [
//                 new Paragraph({
//                   children: [
//                     new TextRun({ 
//                       text: `${x.title || ""}`, 
//                       bold: true,
//                       size: 22
//                     })
//                   ],
//                   spacing: { after: 100 }
//                 }),
//                 new Paragraph({
//                   children: [
//                     new TextRun({ 
//                       text: `${x.company || ""}`, 
//                       bold: true,
//                       size: 20,
//                       color: "444444"
//                     }),
//                     new TextRun({ text: " | ", size: 20 }),
//                     new TextRun({ 
//                       text: `${x.location || ""}`, 
//                       size: 20
//                     })
//                   ],
//                   spacing: { after: 100 }
//                 }),
//                 new Paragraph({
//                   children: [
//                     new TextRun({ 
//                       text: `${x.from || ""} - ${x.to || ""}`, 
//                       italics: true,
//                       size: 18,
//                       color: "666666"
//                     })
//                   ],
//                   spacing: { after: 200 }
//                 }),
//                 ...(x.bullets || []).map((b: string) => 
//                   new Paragraph({
//                     text: `• ${b}`,
//                     bullet: { level: 0 },
//                     spacing: { after: 100 }
//                   })
//                 ),
//                 idx < resume.experience.length - 1 ? new Paragraph({ text: " " }) : null,
//               ]).filter(Boolean),
              
//               // Education Section
//               new Paragraph({
//                 children: [
//                   new TextRun({ 
//                     text: "EDUCATION", 
//                     bold: true,
//                     size: 26,
//                     color: "2E74B5",
//                     font: "Calibri"
//                   })
//                 ],
//                 spacing: { before: 200, after: 200 }
//               }),
//               ...(resume?.education || []).map(
//                 (e: any) => new Paragraph({
//                   text: `${e.school || ""} — ${e.degree || ""} (${e.from || ""}-${e.to || ""})`,
//                   spacing: { after: 100 }
//                 })
//               ),
              
//               new Paragraph({ text: " " }),
              
//               // Skills Section
//               new Paragraph({
//                 children: [
//                   new TextRun({ 
//                     text: "SKILLS", 
//                     bold: true,
//                     size: 26,
//                     color: "2E74B5",
//                     font: "Calibri"
//                   })
//                 ],
//                 spacing: { before: 200, after: 200 }
//               }),
//               new Paragraph({
//                 text: `Programming: ${(resume?.skills?.programming || []).join(", ")}`,
//                 spacing: { after: 100 }
//               }),
//               new Paragraph({
//                 text: `Frameworks: ${(resume?.skills?.frameworks || []).join(", ")}`,
//                 spacing: { after: 100 }
//               }),
//               new Paragraph({
//                 text: `Tools: ${(resume?.skills?.tools || []).join(", ")}`,
//                 spacing: { after: 200 }
//               }),
              
//               // Projects Section
//               new Paragraph({
//                 children: [
//                   new TextRun({ 
//                     text: "PROJECTS", 
//                     bold: true,
//                     size: 26,
//                     color: "2E74B5",
//                     font: "Calibri"
//                   })
//                 ],
//                 spacing: { before: 200, after: 200 }
//               }),
//               ...(resume?.projects || []).map((p: any) => 
//                 new Paragraph({
//                   children: [
//                     new TextRun({ text: `${p.name || ""}: `, bold: true }),
//                     new TextRun({ text: `${p.desc || ""}` })
//                   ],
//                   spacing: { after: 100 }
//                 })
//               ),
//             ],
//           },
//         ],
//       });

//       const blob = await Packer.toBlob(doc);
//       saveAs(blob, `${safeFileName}.docx`);
//     } catch (error) {
//       console.error("DOCX generation error:", error);
//       alert("Error generating Word document. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const loadSampleData = () => {
//     setResume(SAMPLE_DATA);
//     setUseSampleData(true);
//   };

//   const clearData = () => {
//     setResume(emptyResume());
//     setUseSampleData(false);
//   };

//   const addExperience = () => {
//     setResume((p: any) => ({
//       ...p,
//       experience: [...p.experience, { title: "", company: "", location: "", from: "", to: "", bullets: [""] }]
//     }));
//   };

//   const removeExperience = (index: number) => {
//     if (resume.experience.length > 1) {
//       const newExp = [...resume.experience];
//       newExp.splice(index, 1);
//       setResume((p: any) => ({ ...p, experience: newExp }));
//     }
//   };

//   const addEducation = () => {
//     setResume((p: any) => ({
//       ...p,
//       education: [...p.education, { school: "", degree: "", from: "", to: "" }]
//     }));
//   };

//   const removeEducation = (index: number) => {
//     if (resume.education.length > 1) {
//       const newEdu = [...resume.education];
//       newEdu.splice(index, 1);
//       setResume((p: any) => ({ ...p, education: newEdu }));
//     }
//   };

//   if (!tpl || !schema) return <div style={{ padding: 20 }}>Loading...</div>;

//   return (
//     <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
//       <div style={{ 
//         position: "sticky", 
//         top: 0, 
//         zIndex: 10, 
//         background: "white", 
//         borderBottom: "1px solid #e5e7eb", 
//         padding: "12px 16px", 
//         display: "flex", 
//         justifyContent: "space-between", 
//         gap: 10,
//         flexWrap: "wrap"
//       }}>
//         <div>
//           <div style={{ fontWeight: 900, fontSize: 18 }}>Test Template: {tpl.name}</div>
//           <div style={{ fontSize: 12, color: "#6b7280" }}>Edit data to preview • Download in A4 PDF/Word format</div>
//         </div>
//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//           <button onClick={() => nav(`/admin/templates`)} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>
//             Back to Templates
//           </button>
//           <button onClick={loadSampleData} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #10b981", background: "#10b981", color: "white", fontWeight: 900 }}>
//             Load Sample
//           </button>
//           <button onClick={clearData} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ef4444", background: "#ef4444", color: "white", fontWeight: 900 }}>
//             Clear Data
//           </button>
//           <button onClick={downloadPDF} disabled={exporting} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: exporting ? "#93c5fd" : "#2563eb", color: "white", fontWeight: 900 }}>
//             {exporting ? "Generating..." : "Download PDF"}
//           </button>
//           <button onClick={downloadDOCX} disabled={exporting} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #059669", background: exporting ? "#86efac" : "#059669", color: "white", fontWeight: 900 }}>
//             {exporting ? "Generating..." : "Download Word"}
//           </button>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 16, height: "calc(100vh - 80px)", overflow: "hidden" }}>
//         {/* Left: Editor */}
//         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 16, overflowY: "auto" }}>
//           <div style={{ marginBottom: 16 }}>
//             <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Test Title</label>
//             <input 
//               value={title} 
//               onChange={(e) => setTitle(e.target.value)} 
//               style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} 
//             />
//           </div>

//           <div style={{ display: "grid", gap: 12 }}>
//             {/* Header Fields */}
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

//             {/* Summary */}
//             <div style={{ fontWeight: 900, marginTop: 8 }}>Summary</div>
//             <textarea
//               value={resume.summary}
//               onChange={(e) => setResume((p: any) => ({ ...p, summary: e.target.value }))}
//               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
//               placeholder="Enter professional summary..."
//             />

//             {/* Experience */}
//             <div style={{ fontWeight: 900, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span>Experience</span>
//               <button onClick={addExperience} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900, fontSize: 12 }}>
//                 + Add Experience
//               </button>
//             </div>
//             {resume.experience.map((exp: any, idx: number) => (
//               <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//                   <span style={{ fontWeight: 900, fontSize: 14 }}>Experience #{idx + 1}</span>
//                   {resume.experience.length > 1 && (
//                     <button
//                       onClick={() => removeExperience(idx)}
//                       style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontSize: 12 }}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//                 <input
//                   placeholder="Title"
//                   value={exp.title}
//                   onChange={(e) => {
//                     const newExp = [...resume.experience];
//                     newExp[idx] = { ...newExp[idx], title: e.target.value };
//                     setResume((p: any) => ({ ...p, experience: newExp }));
//                   }}
//                   style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
//                 />
//                 <input
//                   placeholder="Company"
//                   value={exp.company}
//                   onChange={(e) => {
//                     const newExp = [...resume.experience];
//                     newExp[idx] = { ...newExp[idx], company: e.target.value };
//                     setResume((p: any) => ({ ...p, experience: newExp }));
//                   }}
//                   style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
//                 />
//                 <input
//                   placeholder="Location"
//                   value={exp.location}
//                   onChange={(e) => {
//                     const newExp = [...resume.experience];
//                     newExp[idx] = { ...newExp[idx], location: e.target.value };
//                     setResume((p: any) => ({ ...p, experience: newExp }));
//                   }}
//                   style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
//                 />
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
//                   <input
//                     placeholder="From (YYYY-MM)"
//                     value={exp.from}
//                     onChange={(e) => {
//                       const newExp = [...resume.experience];
//                       newExp[idx] = { ...newExp[idx], from: e.target.value };
//                       setResume((p: any) => ({ ...p, experience: newExp }));
//                     }}
//                     style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
//                   />
//                   <input
//                     placeholder="To (Present / YYYY-MM)"
//                     value={exp.to}
//                     onChange={(e) => {
//                       const newExp = [...resume.experience];
//                       newExp[idx] = { ...newExp[idx], to: e.target.value };
//                       setResume((p: any) => ({ ...p, experience: newExp }));
//                     }}
//                     style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
//                   />
//                 </div>
//                 <div style={{ marginTop: 8 }}>
//                   <div style={{ fontSize: 12, fontWeight: 900, marginBottom: 4 }}>Bullet Points</div>
//                   {exp.bullets.map((bullet: string, bulletIdx: number) => (
//                     <div key={bulletIdx} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
//                       <input
//                         placeholder={`Bullet point ${bulletIdx + 1}`}
//                         value={bullet}
//                         onChange={(e) => {
//                           const newExp = [...resume.experience];
//                           const newBullets = [...newExp[idx].bullets];
//                           newBullets[bulletIdx] = e.target.value;
//                           newExp[idx] = { ...newExp[idx], bullets: newBullets };
//                           setResume((p: any) => ({ ...p, experience: newExp }));
//                         }}
//                         style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
//                       />
//                       {bulletIdx > 0 && (
//                         <button
//                           onClick={() => {
//                             const newExp = [...resume.experience];
//                             const newBullets = [...newExp[idx].bullets];
//                             newBullets.splice(bulletIdx, 1);
//                             newExp[idx] = { ...newExp[idx], bullets: newBullets };
//                             setResume((p: any) => ({ ...p, experience: newExp }));
//                           }}
//                           style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #fecaca", background: "white", color: "#991b1b" }}
//                         >
//                           ×
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => {
//                       const newExp = [...resume.experience];
//                       const newBullets = [...newExp[idx].bullets, ""];
//                       newExp[idx] = { ...newExp[idx], bullets: newBullets };
//                       setResume((p: any) => ({ ...p, experience: newExp }));
//                     }}
//                     style={{ width: "100%", padding: "8px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f8fafc", marginTop: 8 }}
//                   >
//                     + Add Bullet Point
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* Education */}
//             <div style={{ fontWeight: 900, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span>Education</span>
//               <button onClick={addEducation} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900, fontSize: 12 }}>
//                 + Add Education
//               </button>
//             </div>
//             {resume.education.map((edu: any, idx: number) => (
//               <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//                   <span style={{ fontWeight: 900, fontSize: 14 }}>Education #{idx + 1}</span>
//                   {resume.education.length > 1 && (
//                     <button
//                       onClick={() => removeEducation(idx)}
//                       style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontSize: 12 }}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//                 <input
//                   placeholder="School/University"
//                   value={edu.school}
//                   onChange={(e) => {
//                     const newEdu = [...resume.education];
//                     newEdu[idx] = { ...newEdu[idx], school: e.target.value };
//                     setResume((p: any) => ({ ...p, education: newEdu }));
//                   }}
//                   style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
//                 />
//                 <input
//                   placeholder="Degree"
//                   value={edu.degree}
//                   onChange={(e) => {
//                     const newEdu = [...resume.education];
//                     newEdu[idx] = { ...newEdu[idx], degree: e.target.value };
//                     setResume((p: any) => ({ ...p, education: newEdu }));
//                   }}
//                   style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
//                 />
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
//                   <input
//                     placeholder="From (YYYY)"
//                     value={edu.from}
//                     onChange={(e) => {
//                       const newEdu = [...resume.education];
//                       newEdu[idx] = { ...newEdu[idx], from: e.target.value };
//                       setResume((p: any) => ({ ...p, education: newEdu }));
//                     }}
//                     style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
//                   />
//                   <input
//                     placeholder="To (YYYY)"
//                     value={edu.to}
//                     onChange={(e) => {
//                       const newEdu = [...resume.education];
//                       newEdu[idx] = { ...newEdu[idx], to: e.target.value };
//                       setResume((p: any) => ({ ...p, education: newEdu }));
//                     }}
//                     style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
//                   />
//                 </div>
//               </div>
//             ))}

//             {/* Skills */}
//             <div style={{ fontWeight: 900, marginTop: 8 }}>Skills (comma separated)</div>
//             <input
//               placeholder="Programming: JavaScript, TypeScript, Python, Go, SQL"
//               value={(resume.skills.programming || []).join(", ")}
//               onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, programming: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
//               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//             />
//             <input
//               placeholder="Frameworks: React, Node.js, Express, Django"
//               value={(resume.skills.frameworks || []).join(", ")}
//               onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, frameworks: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
//               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//             />
//             <input
//               placeholder="Tools: AWS, Docker, Kubernetes, PostgreSQL, Redis"
//               value={(resume.skills.tools || []).join(", ")}
//               onChange={(e) => setResume((p: any) => ({ ...p, skills: { ...p.skills, tools: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))}
//               style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//             />

//             {/* Projects */}
//             <div style={{ fontWeight: 900, marginTop: 8 }}>Projects</div>
//             {resume.projects.map((proj: any, idx: number) => (
//               <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
//                 <input
//                   placeholder="Project Name"
//                   value={proj.name}
//                   onChange={(e) => {
//                     const newProjects = [...resume.projects];
//                     newProjects[idx] = { ...newProjects[idx], name: e.target.value };
//                     setResume((p: any) => ({ ...p, projects: newProjects }));
//                   }}
//                   style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
//                 />
//                 <textarea
//                   placeholder="Project Description"
//                   value={proj.desc}
//                   onChange={(e) => {
//                     const newProjects = [...resume.projects];
//                     newProjects[idx] = { ...newProjects[idx], desc: e.target.value };
//                     setResume((p: any) => ({ ...p, projects: newProjects }));
//                   }}
//                   style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", minHeight: 80 }}
//                 />
//               </div>
//             ))}
            
//             <button
//               onClick={() => {
//                 setResume((p: any) => ({
//                   ...p,
//                   projects: [...p.projects, { name: "", desc: "" }]
//                 }));
//               }}
//               style={{ padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
//             >
//               + Add Another Project
//             </button>
//           </div>
//         </div>

//         {/* Right: Preview */}
//         <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
//           <div style={{ fontWeight: 950, fontSize: 16, marginBottom: 12 }}>Live Test Preview (A4 Format)</div>
//           <div 
//             ref={printRef} 
//             id="print-area"
//             style={{ 
//               background: "white", 
//               padding: 24, 
//               borderRadius: 14, 
//               border: "1px solid #eef2f7",
//               flexGrow: 1,
//               overflow: "auto",
//               width: "794px",
//               maxWidth: "100%",
//               boxSizing: "border-box",
//               minHeight: "1123px"
//             }}
//           >
//             <ResumePreview schema={schema} data={resume} />
//           </div>
//           <div style={{ 
//             marginTop: 12, 
//             padding: 12, 
//             background: "#f8fafc", 
//             borderRadius: 10,
//             fontSize: 12,
//             color: "#64748b"
//           }}>
//             <strong>Note:</strong> This preview shows A4 paper size (210mm × 297mm). 
//             Click "Download PDF" for perfect A4 format or "Download Word" for editable document.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/dashboard/AdminTemplateTestEditor.tsx
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

/** ✅ always keep shape stable so 30+ templates never break */
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
    skills: { programming: [] as string[], frameworks: [] as string[], tools: [] as string[] },
    projects: [{ name: "", desc: "" }],
    // optional sections (safe defaults)
    certifications: [] as string[],
    languages: [] as string[],
  };
}

function normalizeResume(input: any) {
  const base = emptyResume();
  const r = input && typeof input === "object" ? input : {};

  const header = { ...base.header, ...(r.header || {}) };

  const experienceArr = Array.isArray(r.experience) && r.experience.length ? r.experience : base.experience;
  const experience = experienceArr.map((x: any) => ({
    title: x?.title ?? "",
    company: x?.company ?? "",
    location: x?.location ?? "",
    from: x?.from ?? "",
    to: x?.to ?? "",
    bullets: Array.isArray(x?.bullets) && x.bullets.length ? x.bullets.map((b: any) => String(b ?? "")) : [""],
  }));

  const educationArr = Array.isArray(r.education) && r.education.length ? r.education : base.education;
  const education = educationArr.map((e: any) => ({
    school: e?.school ?? "",
    degree: e?.degree ?? "",
    from: e?.from ?? "",
    to: e?.to ?? "",
  }));

  const skills = {
    programming: Array.isArray(r?.skills?.programming) ? r.skills.programming : base.skills.programming,
    frameworks: Array.isArray(r?.skills?.frameworks) ? r.skills.frameworks : base.skills.frameworks,
    tools: Array.isArray(r?.skills?.tools) ? r.skills.tools : base.skills.tools,
  };

  const projectsArr = Array.isArray(r.projects) && r.projects.length ? r.projects : base.projects;
  const projects = projectsArr.map((p: any) => ({
    name: p?.name ?? "",
    desc: p?.desc ?? "",
  }));

  return {
    ...base,
    ...r,
    header,
    summary: r.summary ?? base.summary,
    experience,
    education,
    skills,
    projects,
    certifications: Array.isArray(r.certifications) ? r.certifications : base.certifications,
    languages: Array.isArray(r.languages) ? r.languages : base.languages,
  };
}

/** backend schema sometimes comes as string */
function normalizeSchema(schema: any) {
  if (!schema) return {};
  if (typeof schema === "string") {
    try {
      return JSON.parse(schema);
    } catch {
      return {};
    }
  }
  if (typeof schema === "object") return schema;
  return {};
}

const SAMPLE_DATA = {
  header: {
    fullName: "John Anderson",
    jobTitle: "Senior Software Engineer",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johnanderson",
    website: "johnanderson.dev",
  },
  summary:
    "Results-driven software engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering high-quality software solutions.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      from: "2021-01",
      to: "Present",
      bullets: [
        "Led microservices architecture serving 2M+ daily active users, improving system performance by 40%",
        "Implemented CI/CD pipelines reducing deployment time by 60% and increasing deployment frequency",
        "Mentored 5 junior developers and conducted code reviews ensuring high code quality standards",
        "Collaborated with product managers to define technical requirements and project timelines",
      ],
    },
    {
      title: "Software Engineer",
      company: "Digital Solutions Co.",
      location: "Austin, TX",
      from: "2018-03",
      to: "2020-12",
      bullets: [
        "Built React-based dashboard improving customer engagement by 40% through real-time analytics",
        "Developed REST APIs handling 10K+ requests per minute with 99.9% uptime",
        "Optimized database queries reducing response time by 70%",
        "Implemented automated testing increasing test coverage from 60% to 90%",
      ],
    },
    {
      title: "Junior Developer",
      company: "StartUp Labs",
      location: "New York, NY",
      from: "2016-06",
      to: "2018-02",
      bullets: [
        "Developed responsive web applications using React and Node.js",
        "Collaborated with UX designers to implement user-friendly interfaces",
        "Participated in agile development processes and sprint planning",
        "Fixed critical bugs improving application stability",
      ],
    },
  ],
  education: [
    { school: "University of California, Berkeley", degree: "B.S. Computer Science", from: "2012", to: "2016" },
    { school: "Stanford University", degree: "M.S. Software Engineering", from: "2016", to: "2018" },
  ],
  skills: {
    programming: ["JavaScript", "TypeScript", "Python", "Go", "SQL", "Java", "C++"],
    frameworks: ["React", "Node.js", "Express", "Django", "Spring Boot", "Next.js"],
    tools: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Git", "Jenkins", "GraphQL"],
  },
  projects: [
    {
      name: "E-commerce Platform",
      desc: "Full-stack platform with real-time inventory management, order tracking, and admin dashboard. Built with React, Node.js, and MongoDB.",
    },
    {
      name: "Task Management App",
      desc: "Collaboration tool with live updates, drag-and-drop interface, and team management features. Used by 50+ teams daily.",
    },
    { name: "AI Content Generator", desc: "Machine learning-powered content generation platform with GPT integration and analytics dashboard." },
  ],
  achievements: [
  { title: "Your Achievement", desc: "Describe what you did and the impact it had." },
],
courses: ["Course Title"],
interests: ["Career Interest / Passion"],
languages: [{ name: "Language", level: "Beginner", dots: 2 }],
  certifications: ["AWS Certified Solutions Architect", "Google Professional Cloud Architect", "React Developer Certification", "Scrum Master Certified"],
  //languages: ["English (Native)", "Spanish (Professional)", "French (Intermediate)"],
};

export default function AdminTemplateTestEditor() {
  const nav = useNavigate();
  const { id } = useParams();
  const templateId = Number(id);

  const [tpl, setTpl] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);

  const [resume, setResume] = useState<any>(() => normalizeResume(emptyResume()));
  const [title, setTitle] = useState<string>("Test Resume");

  const [useSampleData, setUseSampleData] = useState<boolean>(true);
  const [exporting, setExporting] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>("");

  // ✅ capture ONLY the A4 page content (no scroll container)
  const printRef = useRef<HTMLDivElement | null>(null);
  const didInitSample = useRef(false);

  useEffect(() => {
    const load = async () => {
      if (!templateId) return;
      setLoading(true);
      setErrorText("");
      try {
        const t = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
        setTpl(t.data);

        const sch = normalizeSchema(t.data?.schema);
        setSchema(sch);

        // ✅ only auto-load sample once on first template load
        if (!didInitSample.current) {
          didInitSample.current = true;
          if (useSampleData) setResume(normalizeResume(SAMPLE_DATA));
          else setResume((p: any) => normalizeResume(p));
        }
      } catch (e: any) {
        console.error(e);
        setErrorText(e?.response?.data?.detail || "Template load failed.");
      } finally {
        setLoading(false);
      }
    };

    load().catch(console.error);
    // IMPORTANT: do not depend on useSampleData (it re-fetches & overwrites)
  }, [templateId]);

  const safeFileName = useMemo(() => {
    const n = String(resume?.header?.fullName || title || "resume").trim() || "resume";
    return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }, [resume, title]);

  const downloadPDF = async () => {
    setExporting(true);
    try {
      const el = printRef.current;
      if (!el) return;

      // A4 at 96dpi ≈ 794 x 1123 px (your ResumePreview is already A4 width)
      const A4_WIDTH = 794;

      // IMPORTANT: full height capture (for multi-page)
      const targetHeight = Math.max(el.scrollHeight, el.offsetHeight);

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: A4_WIDTH,
        height: targetHeight,
        windowWidth: A4_WIDTH,
        windowHeight: targetHeight,
        logging: false,
        onclone: (clonedDoc) => {
          // make sure no scrollbars in cloned page
          const cloned = clonedDoc.getElementById("print-area") as HTMLElement | null;
          if (cloned) {
            cloned.style.width = `${A4_WIDTH}px`;
            cloned.style.maxWidth = `${A4_WIDTH}px`;
            cloned.style.overflow = "visible";
            cloned.style.boxSizing = "border-box";
          }
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      // jsPDF in mm (A4 = 210 x 297 mm)
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        // multi-page
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
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const downloadDOCX = async () => {
    setExporting(true);
    try {
      const r = normalizeResume(resume);
      const h = r.header || {};

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
                children: [new TextRun({ text: h.fullName || "Resume", bold: true, size: 36, font: "Calibri" })],
                alignment: "center",
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [new TextRun({ text: h.jobTitle || "", bold: true, size: 24, color: "2E74B5", font: "Calibri" })],
                alignment: "center",
                spacing: { after: 350 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: h.email || "", size: 22 }),
                  new TextRun({ text: h.email ? " | " : "", size: 22 }),
                  new TextRun({ text: h.phone || "", size: 22 }),
                  new TextRun({ text: h.phone ? " | " : "", size: 22 }),
                  new TextRun({ text: h.location || "", size: 22 }),
                  new TextRun({ text: h.location ? " | " : "", size: 22 }),
                  new TextRun({ text: h.linkedin || "", size: 22 }),
                  new TextRun({ text: h.linkedin ? " | " : "", size: 22 }),
                  new TextRun({ text: h.website || "", size: 22 }),
                ],
                alignment: "center",
                spacing: { after: 350 },
              }),

              new Paragraph({ text: " " }),

              new Paragraph({
                children: [new TextRun({ text: "PROFESSIONAL SUMMARY", bold: true, size: 26, color: "2E74B5", font: "Calibri" })],
                spacing: { before: 200, after: 150 },
              }),
              new Paragraph({ text: r.summary || "", spacing: { after: 300 } }),

              new Paragraph({
                children: [new TextRun({ text: "WORK EXPERIENCE", bold: true, size: 26, color: "2E74B5", font: "Calibri" })],
                spacing: { before: 200, after: 150 },
              }),
              ...(r.experience || [])
                .flatMap((x: any, idx: number) => [
                  new Paragraph({
                    children: [new TextRun({ text: `${x.title || ""}`, bold: true, size: 22 })],
                    spacing: { after: 80 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${x.company || ""}`, bold: true, size: 20, color: "444444" }),
                      new TextRun({ text: x.company && x.location ? " | " : "", size: 20 }),
                      new TextRun({ text: `${x.location || ""}`, size: 20 }),
                    ],
                    spacing: { after: 60 },
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: `${x.from || ""} - ${x.to || ""}`, italics: true, size: 18, color: "666666" })],
                    spacing: { after: 120 },
                  }),
                  ...(x.bullets || []).map(
                    (b: string) =>
                      new Paragraph({
                        text: `• ${b}`,
                        spacing: { after: 60 },
                      })
                  ),
                  idx < r.experience.length - 1 ? new Paragraph({ text: " " }) : null,
                ])
                .filter(Boolean),

              new Paragraph({
                children: [new TextRun({ text: "EDUCATION", bold: true, size: 26, color: "2E74B5", font: "Calibri" })],
                spacing: { before: 200, after: 150 },
              }),
              ...(r.education || []).map(
                (e: any) =>
                  new Paragraph({
                    text: `${e.school || ""} — ${e.degree || ""} (${e.from || ""}-${e.to || ""})`,
                    spacing: { after: 80 },
                  })
              ),

              new Paragraph({ text: " " }),

              new Paragraph({
                children: [new TextRun({ text: "SKILLS", bold: true, size: 26, color: "2E74B5", font: "Calibri" })],
                spacing: { before: 200, after: 150 },
              }),
              new Paragraph({ text: `Programming: ${(r?.skills?.programming || []).join(", ")}`, spacing: { after: 60 } }),
              new Paragraph({ text: `Frameworks: ${(r?.skills?.frameworks || []).join(", ")}`, spacing: { after: 60 } }),
              new Paragraph({ text: `Tools: ${(r?.skills?.tools || []).join(", ")}`, spacing: { after: 180 } }),

              new Paragraph({
                children: [new TextRun({ text: "PROJECTS", bold: true, size: 26, color: "2E74B5", font: "Calibri" })],
                spacing: { before: 200, after: 150 },
              }),
              ...(r.projects || []).map(
                (p: any) =>
                  new Paragraph({
                    children: [new TextRun({ text: `${p.name || ""}: `, bold: true }), new TextRun({ text: `${p.desc || ""}` })],
                    spacing: { after: 80 },
                  })
              ),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${safeFileName}.docx`);
    } catch (error) {
      console.error("DOCX generation error:", error);
      alert("Error generating Word document. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const loadSampleData = () => {
    setResume(normalizeResume(SAMPLE_DATA));
    setUseSampleData(true);
  };

  const clearData = () => {
    setResume(normalizeResume(emptyResume()));
    setUseSampleData(false);
  };

  const addExperience = () => {
    setResume((p: any) => {
      const r = normalizeResume(p);
      return {
        ...r,
        experience: [...r.experience, { title: "", company: "", location: "", from: "", to: "", bullets: [""] }],
      };
    });
  };

  const removeExperience = (index: number) => {
    setResume((p: any) => {
      const r = normalizeResume(p);
      if (r.experience.length <= 1) return r;
      const next = [...r.experience];
      next.splice(index, 1);
      return { ...r, experience: next };
    });
  };

  const addEducation = () => {
    setResume((p: any) => {
      const r = normalizeResume(p);
      return { ...r, education: [...r.education, { school: "", degree: "", from: "", to: "" }] };
    });
  };

  const removeEducation = (index: number) => {
    setResume((p: any) => {
      const r = normalizeResume(p);
      if (r.education.length <= 1) return r;
      const next = [...r.education];
      next.splice(index, 1);
      return { ...r, education: next };
    });
  };

  const rSafe = useMemo(() => normalizeResume(resume), [resume]);
  const sSafe = useMemo(() => normalizeSchema(schema), [schema]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (errorText) {
    return (
      <div style={{ padding: 20 }}>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Error</div>
        <div style={{ color: "#b91c1c", marginBottom: 10 }}>{errorText}</div>
        <button
          onClick={() => nav("/admin/templates")}
          style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}
        >
          Back to Templates
        </button>
      </div>
    );
  }

  if (!tpl || !sSafe) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      {/* top bar */}
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
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: 18 }}>Test Template: {tpl.name}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Edit data to preview • Download in A4 PDF/Word format</div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => nav(`/admin/templates`)}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}
          >
            Back to Templates
          </button>

          <button
            onClick={loadSampleData}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #10b981", background: "#10b981", color: "white", fontWeight: 900 }}
          >
            Load Sample
          </button>

          <button
            onClick={clearData}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ef4444", background: "#ef4444", color: "white", fontWeight: 900 }}
          >
            Clear Data
          </button>

          <button
            onClick={downloadPDF}
            disabled={exporting}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #1d4ed8",
              background: exporting ? "#93c5fd" : "#2563eb",
              color: "white",
              fontWeight: 900,
            }}
          >
            {exporting ? "Generating..." : "Download PDF"}
          </button>

          <button
            onClick={downloadDOCX}
            disabled={exporting}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #059669",
              background: exporting ? "#86efac" : "#059669",
              color: "white",
              fontWeight: 900,
            }}
          >
            {exporting ? "Generating..." : "Download Word"}
          </button>
        </div>
      </div>

      {/* main grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          padding: 16,
          height: "calc(100vh - 80px)",
          overflow: "hidden",
        }}
      >
        {/* Left: Editor */}
        <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 16, overflowY: "auto" }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Test Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {/* Header Fields */}
            <div style={{ fontWeight: 900, marginTop: 4 }}>Header</div>
            {(["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const).map((k) => (
              <input
                key={k}
                placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
                value={rSafe.header[k]}
                onChange={(e) =>
                  setResume((p: any) => {
                    const r = normalizeResume(p);
                    return { ...r, header: { ...r.header, [k]: e.target.value } };
                  })
                }
                style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
              />
            ))}

            {/* Summary */}
            <div style={{ fontWeight: 900, marginTop: 8 }}>Summary</div>
            <textarea
              value={rSafe.summary}
              onChange={(e) => setResume((p: any) => ({ ...normalizeResume(p), summary: e.target.value }))}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 100 }}
              placeholder="Enter professional summary..."
            />

            {/* Experience */}
            <div style={{ fontWeight: 900, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Experience</span>
              <button
                onClick={addExperience}
                style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900, fontSize: 12 }}
              >
                + Add Experience
              </button>
            </div>

            {rSafe.experience.map((exp: any, idx: number) => (
              <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 900, fontSize: 14 }}>Experience #{idx + 1}</span>
                  {rSafe.experience.length > 1 && (
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
                  onChange={(e) =>
                    setResume((p: any) => {
                      const r = normalizeResume(p);
                      const next = [...r.experience];
                      next[idx] = { ...next[idx], title: e.target.value };
                      return { ...r, experience: next };
                    })
                  }
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />

                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    setResume((p: any) => {
                      const r = normalizeResume(p);
                      const next = [...r.experience];
                      next[idx] = { ...next[idx], company: e.target.value };
                      return { ...r, experience: next };
                    })
                  }
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />

                <input
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) =>
                    setResume((p: any) => {
                      const r = normalizeResume(p);
                      const next = [...r.experience];
                      next[idx] = { ...next[idx], location: e.target.value };
                      return { ...r, experience: next };
                    })
                  }
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <input
                    placeholder="From (YYYY-MM)"
                    value={exp.from}
                    onChange={(e) =>
                      setResume((p: any) => {
                        const r = normalizeResume(p);
                        const next = [...r.experience];
                        next[idx] = { ...next[idx], from: e.target.value };
                        return { ...r, experience: next };
                      })
                    }
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                  <input
                    placeholder="To (Present / YYYY-MM)"
                    value={exp.to}
                    onChange={(e) =>
                      setResume((p: any) => {
                        const r = normalizeResume(p);
                        const next = [...r.experience];
                        next[idx] = { ...next[idx], to: e.target.value };
                        return { ...r, experience: next };
                      })
                    }
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
                        onChange={(e) =>
                          setResume((p: any) => {
                            const r = normalizeResume(p);
                            const next = [...r.experience];
                            const bullets = [...next[idx].bullets];
                            bullets[bulletIdx] = e.target.value;
                            next[idx] = { ...next[idx], bullets };
                            return { ...r, experience: next };
                          })
                        }
                        style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                      />

                      {bulletIdx > 0 && (
                        <button
                          onClick={() =>
                            setResume((p: any) => {
                              const r = normalizeResume(p);
                              const next = [...r.experience];
                              const bullets = [...next[idx].bullets];
                              bullets.splice(bulletIdx, 1);
                              next[idx] = { ...next[idx], bullets };
                              return { ...r, experience: next };
                            })
                          }
                          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #fecaca", background: "white", color: "#991b1b" }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      setResume((p: any) => {
                        const r = normalizeResume(p);
                        const next = [...r.experience];
                        next[idx] = { ...next[idx], bullets: [...next[idx].bullets, ""] };
                        return { ...r, experience: next };
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      background: "#f8fafc",
                      marginTop: 8,
                      fontWeight: 900,
                    }}
                  >
                    + Add Bullet Point
                  </button>
                </div>
              </div>
            ))}

            {/* Education */}
            <div style={{ fontWeight: 900, marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Education</span>
              <button
                onClick={addEducation}
                style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900, fontSize: 12 }}
              >
                + Add Education
              </button>
            </div>

            {rSafe.education.map((edu: any, idx: number) => (
              <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 900, fontSize: 14 }}>Education #{idx + 1}</span>
                  {rSafe.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(idx)}
                      style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontSize: 12 }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) =>
                    setResume((p: any) => {
                      const r = normalizeResume(p);
                      const next = [...r.education];
                      next[idx] = { ...next[idx], school: e.target.value };
                      return { ...r, education: next };
                    })
                  }
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />

                <input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    setResume((p: any) => {
                      const r = normalizeResume(p);
                      const next = [...r.education];
                      next[idx] = { ...next[idx], degree: e.target.value };
                      return { ...r, education: next };
                    })
                  }
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <input
                    placeholder="From (YYYY)"
                    value={edu.from}
                    onChange={(e) =>
                      setResume((p: any) => {
                        const r = normalizeResume(p);
                        const next = [...r.education];
                        next[idx] = { ...next[idx], from: e.target.value };
                        return { ...r, education: next };
                      })
                    }
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                  <input
                    placeholder="To (YYYY)"
                    value={edu.to}
                    onChange={(e) =>
                      setResume((p: any) => {
                        const r = normalizeResume(p);
                        const next = [...r.education];
                        next[idx] = { ...next[idx], to: e.target.value };
                        return { ...r, education: next };
                      })
                    }
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                </div>
              </div>
            ))}

            {/* Skills */}
            <div style={{ fontWeight: 900, marginTop: 8 }}>Skills (comma separated)</div>

            <input
              placeholder="Programming: JavaScript, TypeScript, Python, Go, SQL"
              value={(rSafe.skills.programming || []).join(", ")}
              onChange={(e) =>
                setResume((p: any) => {
                  const r = normalizeResume(p);
                  return {
                    ...r,
                    skills: {
                      ...r.skills,
                      programming: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    },
                  };
                })
              }
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />

            <input
              placeholder="Frameworks: React, Node.js, Express, Django"
              value={(rSafe.skills.frameworks || []).join(", ")}
              onChange={(e) =>
                setResume((p: any) => {
                  const r = normalizeResume(p);
                  return {
                    ...r,
                    skills: {
                      ...r.skills,
                      frameworks: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    },
                  };
                })
              }
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />

            <input
              placeholder="Tools: AWS, Docker, Kubernetes, PostgreSQL, Redis"
              value={(rSafe.skills.tools || []).join(", ")}
              onChange={(e) =>
                setResume((p: any) => {
                  const r = normalizeResume(p);
                  return {
                    ...r,
                    skills: {
                      ...r.skills,
                      tools: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    },
                  };
                })
              }
              style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
            />

            {/* Projects */}
            <div style={{ fontWeight: 900, marginTop: 8 }}>Projects</div>
            {rSafe.projects.map((proj: any, idx: number) => (
              <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <input
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) =>
                    setResume((p: any) => {
                      const r = normalizeResume(p);
                      const next = [...r.projects];
                      next[idx] = { ...next[idx], name: e.target.value };
                      return { ...r, projects: next };
                    })
                  }
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 }}
                />
                <textarea
                  placeholder="Project Description"
                  value={proj.desc}
                  onChange={(e) =>
                    setResume((p: any) => {
                      const r = normalizeResume(p);
                      const next = [...r.projects];
                      next[idx] = { ...next[idx], desc: e.target.value };
                      return { ...r, projects: next };
                    })
                  }
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", minHeight: 80 }}
                />
              </div>
            ))}

            <button
              onClick={() =>
                setResume((p: any) => {
                  const r = normalizeResume(p);
                  return { ...r, projects: [...r.projects, { name: "", desc: "" }] };
                })
              }
              style={{ padding: "10px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f8fafc", fontWeight: 900 }}
            >
              + Add Another Project
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
          <div style={{ fontWeight: 950, fontSize: 16, marginBottom: 12 }}>Live Test Preview (A4 Format)</div>

          {/* scroll container */}
          <div style={{ flexGrow: 1, overflow: "auto", borderRadius: 14, border: "1px solid #eef2f7", background: "#f8fafc", padding: 12 }}>
            <div style={{ display: "grid", placeItems: "start center" }}>
              {/* print-area (no scrollbars) */}
              <div
                ref={printRef}
                id="print-area"
                style={{
                  background: "white",
                  width: "794px",
                  maxWidth: "100%",
                  minHeight: "1123px",
                  boxSizing: "border-box",
                }}
              >
                <ResumePreview schema={sSafe} data={rSafe} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, padding: 12, background: "#f8fafc", borderRadius: 10, fontSize: 12, color: "#64748b" }}>
            <strong>Note:</strong> This preview shows A4 paper size (210mm × 297mm). Click "Download PDF" for perfect A4 format or "Download Word" for editable document.
          </div>
        </div>
      </div>
    </div>
  );
}
