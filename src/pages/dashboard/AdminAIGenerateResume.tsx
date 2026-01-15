// // // // src/pages/dashboard/AdminAIGenerateResume.tsx
// // // import React, { useEffect, useMemo, useRef, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import axios from "../../api/axiosInstance";
// // // import ResumePreview from "./ResumePreview";
// // // import toast from "react-hot-toast";

// // // function authHeaders() {
// // //   const token = localStorage.getItem("access") || "";
// // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // }

// // // export default function AdminAIGenerateResume() {
// // //   const navigate = useNavigate();
// // //   const { id } = useParams();
// // //   const templateId = Number(id);

// // //   const [tpl, setTpl] = useState<any>(null);
// // //   const [schema, setSchema] = useState<any>(null);

// // //   const [language, setLanguage] = useState<"en" | "hi" | "mr">("en");
// // //   const [jobTitle, setJobTitle] = useState("");
// // //   const [years, setYears] = useState("");
// // //   const [skills, setSkills] = useState("");
// // //   const [industry, setIndustry] = useState("");
// // //   const [notes, setNotes] = useState("");
// // //   const [paste, setPaste] = useState("");

// // //   const [genTitle, setGenTitle] = useState("AI Generated Resume");
// // //   const [resume, setResume] = useState<any>(null);
// // //   const [loading, setLoading] = useState(false);

// // //   useEffect(() => {
// // //     if (!templateId) return;
// // //     (async () => {
// // //       const res = await axios.get(`/auth/admin/templates/${templateId}/`, { headers: authHeaders() });
// // //       setTpl(res.data);
// // //       setSchema(res.data?.schema || {});
// // //     })().catch((e) => {
// // //       console.error(e);
// // //       toast.error("Template load failed");
// // //     });
// // //   }, [templateId]);

// // //   const prompt = useMemo(() => {
// // //     const parts: string[] = [];
// // //     if (jobTitle.trim()) parts.push(`Target Role: ${jobTitle.trim()}`);
// // //     if (years.trim()) parts.push(`Years of experience: ${years.trim()}`);
// // //     if (industry.trim()) parts.push(`Industry/domain: ${industry.trim()}`);
// // //     if (skills.trim()) parts.push(`Key skills (comma separated): ${skills.trim()}`);
// // //     if (notes.trim()) parts.push(`Extra requirements: ${notes.trim()}`);
// // //     if (paste.trim()) parts.push(`Raw information (may include projects/companies/education):\n${paste.trim()}`);

// // //     // Important: Ask for ATS + metrics
// // //     parts.push("Make it ATS-friendly, strong action verbs, quantified achievements where possible.");
// // //     return parts.join("\n");
// // //   }, [jobTitle, years, skills, industry, notes, paste]);

// // //   const onGenerate = async () => {
// // //     if (!schema) return;
// // //     if (!prompt.trim()) return toast.error("Please fill some details");

// // //     setLoading(true);
// // //     const tid = toast.loading("Generating AI resume...");
// // //     try {
// // //       const res = await axios.post(
// // //         `/auth/admin/ai/generate-resume/`,
// // //         { schema, prompt, language },
// // //         { headers: authHeaders() }
// // //       );

// // //       setGenTitle(res.data?.title || "AI Generated Resume");
// // //       setResume(res.data?.resume || null);
// // //       toast.success("Generated!");
// // //     } catch (e: any) {
// // //       console.error(e);
// // //       toast.error(e?.response?.data?.detail || "AI generate failed");
// // //     } finally {
// // //       toast.dismiss(tid);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const useInTestEditor = () => {
// // //     if (!resume) return toast.error("Generate resume first");
// // //     // pass to test editor through localStorage (simple & reliable)
// // //     localStorage.setItem(`AI_RESUME_PREFILL_${templateId}`, JSON.stringify(resume));
// // //     toast.success("Loaded into Test Editor");
// // //     navigate(`/admin/templates/${templateId}/test`);
// // //   };

// // //   if (!tpl || !schema) return <div style={{ padding: 30 }}>Loading...</div>;

// // //   return (
// // //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// // //       <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", justifyContent: "space-between", gap: 10 }}>
// // //         <div>
// // //           <div style={{ fontWeight: 900, fontSize: 18 }}>AI Generate Resume</div>
// // //           <div style={{ fontSize: 12, color: "#6b7280" }}>{tpl?.name}</div>
// // //         </div>

// // //         <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
// // //           <button onClick={() => navigate(-1)} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>
// // //             Back
// // //           </button>

// // //           <select value={language} onChange={(e) => setLanguage(e.target.value as any)} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontWeight: 800 }}>
// // //             <option value="en">English</option>
// // //             <option value="hi">Hindi</option>
// // //             <option value="mr">Marathi</option>
// // //           </select>

// // //           <button
// // //             onClick={onGenerate}
// // //             disabled={loading}
// // //             style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}
// // //           >
// // //             {loading ? "Generating..." : "Generate"}
// // //           </button>

// // //           <button
// // //             onClick={useInTestEditor}
// // //             disabled={!resume}
// // //             style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #059669", background: "#10b981", color: "white", fontWeight: 900 }}
// // //           >
// // //             Use in Test Editor
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 14, padding: 14 }}>
// // //         {/* Left: Prompt form */}
// // //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
// // //           <div style={{ fontWeight: 900, marginBottom: 10 }}>Inputs</div>

// // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Target Job Title</label>
// // //           <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. React Developer" style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

// // //           <div style={{ height: 10 }} />

// // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Years of Experience</label>
// // //           <input value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 3" style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

// // //           <div style={{ height: 10 }} />

// // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Industry/Domain</label>
// // //           <input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Fintech, SaaS" style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

// // //           <div style={{ height: 10 }} />

// // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Skills (comma separated)</label>
// // //           <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, TypeScript, Django..." style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

// // //           <div style={{ height: 10 }} />

// // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Extra Notes</label>
// // //           <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requirements..." style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 80 }} />

// // //           <div style={{ height: 10 }} />

// // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Paste Raw Info (optional)</label>
// // //           <textarea value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="Education, companies, projects, achievements..." style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 160 }} />

// // //           <div style={{ height: 10 }} />

// // //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Final Prompt (auto)</label>
// // //           <textarea value={prompt} readOnly style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 140, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }} />
// // //         </div>

// // //         {/* Right: Preview */}
// // //         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
// // //           <div style={{ fontWeight: 900, marginBottom: 10 }}>{genTitle}</div>
// // //           {!resume ? (
// // //             <div style={{ padding: 20, color: "#6b7280" }}>Generate button click karke preview dekho.</div>
// // //           ) : (
// // //             <div style={{ display: "grid", placeItems: "start center" }}>
// // //               <ResumePreview schema={schema} data={resume} />
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // src/pages/dashboard/AdminAIGenerateResume.tsx
// // import React, { useEffect, useMemo, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "../../api/axiosInstance";
// // import ResumePreview from "./ResumePreview";
// // import toast from "react-hot-toast";

// // function authHeaders() {
// //   const token = localStorage.getItem("access") || "";
// //   return token ? { Authorization: `Bearer ${token}` } : {};
// // }

// // export default function AdminAIGenerateResume() {
// //   const navigate = useNavigate();
// //   const { id } = useParams();
// //   const templateId = Number(id);

// //   const [tpl, setTpl] = useState<any>(null);
// //   const [schema, setSchema] = useState<any>(null);

// //   // inputs
// //   const [language, setLanguage] = useState<"en" | "hi" | "mr">("en");
// //   const [targetRole, setTargetRole] = useState("");
// //   const [expYears, setExpYears] = useState("");
// //   const [skills, setSkills] = useState("");
// //   const [industry, setIndustry] = useState("");
// //   const [rawInfo, setRawInfo] = useState("");
// //   const [notes, setNotes] = useState("");

// //   const [loading, setLoading] = useState(false);
// //   const [genTitle, setGenTitle] = useState("AI Generated Resume");
// //   const [resume, setResume] = useState<any>(null);

// //   useEffect(() => {
// //     if (!templateId) return;

// //     (async () => {
// //       const res = await axios.get(`/auth/admin/templates/${templateId}/`, {
// //         headers: authHeaders(),
// //       });
// //       setTpl(res.data);
// //       setSchema(res.data?.schema || {});
// //     })().catch((e) => {
// //       console.error(e);
// //       toast.error("Template load failed");
// //     });
// //   }, [templateId]);

// //   const prompt = useMemo(() => {
// //     const p: string[] = [];
// //     if (targetRole.trim()) p.push(`Target Role: ${targetRole.trim()}`);
// //     if (expYears.trim()) p.push(`Experience Years: ${expYears.trim()}`);
// //     if (industry.trim()) p.push(`Industry/Domain: ${industry.trim()}`);
// //     if (skills.trim()) p.push(`Key Skills: ${skills.trim()}`);
// //     if (notes.trim()) p.push(`Notes: ${notes.trim()}`);
// //     if (rawInfo.trim()) p.push(`Raw Info:\n${rawInfo.trim()}`);
// //     p.push(
// //       "Make it ATS-friendly. Strong action verbs. Add measurable impacts (numbers) where reasonable. Keep bullets concise."
// //     );
// //     return p.join("\n");
// //   }, [targetRole, expYears, industry, skills, notes, rawInfo]);

// //   const generate = async () => {
// //     if (!schema) return toast.error("Schema missing");
// //     if (!prompt.trim()) return toast.error("Please fill some details");

// //     setLoading(true);
// //     const tid = toast.loading("Generating AI resume...");
// //     try {
// //       const res = await axios.post(
// //         `/auth/admin/ai/generate-resume/`,
// //         { schema, prompt, language },
// //         { headers: authHeaders() }
// //       );

// //       setGenTitle(res.data?.title || "AI Generated Resume");
// //       setResume(res.data?.resume || null);
// //       toast.success("Generated!");
// //     } catch (e: any) {
// //       console.error(e);
// //       toast.error(e?.response?.data?.detail || "AI generate failed");
// //     } finally {
// //       toast.dismiss(tid);
// //       setLoading(false);
// //     }
// //   };

// //   const sendToTestEditor = () => {
// //     if (!resume) return toast.error("Generate resume first");
// //     localStorage.setItem(`AI_RESUME_PREFILL_${templateId}`, JSON.stringify(resume));
// //     toast.success("Loaded into Test Editor");
// //     navigate(`/admin/templates/${templateId}/test`);
// //   };

// //   if (!tpl || !schema) return <div style={{ padding: 30 }}>Loading...</div>;

// //   return (
// //     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
// //       {/* Top bar */}
// //       <div
// //         style={{
// //           position: "sticky",
// //           top: 0,
// //           zIndex: 10,
// //           background: "white",
// //           borderBottom: "1px solid #e5e7eb",
// //           padding: "12px 16px",
// //           display: "flex",
// //           justifyContent: "space-between",
// //           gap: 10,
// //           alignItems: "center",
// //         }}
// //       >
// //         <div>
// //           <div style={{ fontWeight: 900, fontSize: 18 }}>AI Resume Generator</div>
// //           <div style={{ fontSize: 12, color: "#6b7280" }}>
// //             Template: {tpl?.name}
// //           </div>
// //         </div>

// //         <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
// //           <button
// //             onClick={() => navigate(-1)}
// //             style={{
// //               padding: "10px 12px",
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //               background: "white",
// //               fontWeight: 800,
// //             }}
// //           >
// //             Back
// //           </button>

// //           <select
// //             value={language}
// //             onChange={(e) => setLanguage(e.target.value as any)}
// //             style={{
// //               padding: "10px 12px",
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //               fontWeight: 800,
// //             }}
// //           >
// //             <option value="en">English</option>
// //             <option value="hi">Hindi</option>
// //             <option value="mr">Marathi</option>
// //           </select>

// //           <button
// //             onClick={generate}
// //             disabled={loading}
// //             style={{
// //               padding: "10px 14px",
// //               borderRadius: 10,
// //               background: "#2563eb",
// //               color: "white",
// //               fontWeight: 900,
// //               border: "1px solid #1d4ed8",
// //               opacity: loading ? 0.8 : 1,
// //             }}
// //           >
// //             {loading ? "Generating..." : "Generate"}
// //           </button>

// //           <button
// //             onClick={sendToTestEditor}
// //             disabled={!resume}
// //             style={{
// //               padding: "10px 14px",
// //               borderRadius: 10,
// //               background: resume ? "#10b981" : "#a7f3d0",
// //               color: "white",
// //               fontWeight: 900,
// //               border: "1px solid #059669",
// //               cursor: resume ? "pointer" : "not-allowed",
// //             }}
// //           >
// //             Use in Test with Data
// //           </button>
// //         </div>
// //       </div>

// //       {/* Body */}
// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "420px 1fr",
// //           gap: 14,
// //           padding: 14,
// //         }}
// //       >
// //         {/* Left inputs */}
// //         <div
// //           style={{
// //             background: "white",
// //             border: "1px solid #eef2f7",
// //             borderRadius: 14,
// //             padding: 12,
// //             overflow: "auto",
// //           }}
// //         >
// //           <div style={{ fontWeight: 900, marginBottom: 10 }}>Details</div>

// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
// //             Target Role
// //           </label>
// //           <input
// //             value={targetRole}
// //             onChange={(e) => setTargetRole(e.target.value)}
// //             placeholder="e.g. Frontend Developer"
// //             style={{
// //               width: "100%",
// //               marginTop: 6,
// //               padding: 10,
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //             }}
// //           />

// //           <div style={{ height: 10 }} />

// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
// //             Experience (years)
// //           </label>
// //           <input
// //             value={expYears}
// //             onChange={(e) => setExpYears(e.target.value)}
// //             placeholder="e.g. 2"
// //             style={{
// //               width: "100%",
// //               marginTop: 6,
// //               padding: 10,
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //             }}
// //           />

// //           <div style={{ height: 10 }} />

// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
// //             Industry / Domain
// //           </label>
// //           <input
// //             value={industry}
// //             onChange={(e) => setIndustry(e.target.value)}
// //             placeholder="e.g. SaaS, Fintech"
// //             style={{
// //               width: "100%",
// //               marginTop: 6,
// //               padding: 10,
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //             }}
// //           />

// //           <div style={{ height: 10 }} />

// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
// //             Skills (comma separated)
// //           </label>
// //           <input
// //             value={skills}
// //             onChange={(e) => setSkills(e.target.value)}
// //             placeholder="React, TypeScript, Django..."
// //             style={{
// //               width: "100%",
// //               marginTop: 6,
// //               padding: 10,
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //             }}
// //           />

// //           <div style={{ height: 10 }} />

// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
// //             Extra Notes
// //           </label>
// //           <textarea
// //             value={notes}
// //             onChange={(e) => setNotes(e.target.value)}
// //             placeholder="Any special request..."
// //             style={{
// //               width: "100%",
// //               marginTop: 6,
// //               padding: 10,
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //               minHeight: 90,
// //             }}
// //           />

// //           <div style={{ height: 10 }} />

// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
// //             Paste Raw Info (optional)
// //           </label>
// //           <textarea
// //             value={rawInfo}
// //             onChange={(e) => setRawInfo(e.target.value)}
// //             placeholder="Education, companies, projects, achievements..."
// //             style={{
// //               width: "100%",
// //               marginTop: 6,
// //               padding: 10,
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //               minHeight: 170,
// //             }}
// //           />

// //           <div style={{ height: 10 }} />

// //           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
// //             Generated Prompt (auto)
// //           </label>
// //           <textarea
// //             value={prompt}
// //             readOnly
// //             style={{
// //               width: "100%",
// //               marginTop: 6,
// //               padding: 10,
// //               borderRadius: 10,
// //               border: "1px solid #e5e7eb",
// //               minHeight: 140,
// //               fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
// //               fontSize: 12,
// //             }}
// //           />
// //         </div>

// //         {/* Right preview */}
// //         <div
// //           style={{
// //             background: "white",
// //             border: "1px solid #eef2f7",
// //             borderRadius: 14,
// //             padding: 12,
// //           }}
// //         >
// //           <div style={{ fontWeight: 900, marginBottom: 10 }}>{genTitle}</div>

// //           {!resume ? (
// //             <div style={{ padding: 18, color: "#6b7280" }}>
// //               Generate pe click karo, yahan preview aayega.
// //             </div>
// //           ) : (
// //             <div style={{ display: "grid", placeItems: "start center" }}>
// //               <ResumePreview schema={schema} data={resume} />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "../../api/axiosInstance";
// import ResumePreview from "./ResumePreview";
// import toast from "react-hot-toast";

// function authHeaders() {
//   const token = localStorage.getItem("access") || "";
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// export default function AdminAIGenerateResume() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const templateId = Number(id);

//   const [tpl, setTpl] = useState<any>(null);
//   const [schema, setSchema] = useState<any>(null);

//   const [language, setLanguage] = useState<"en" | "hi" | "mr">("en");
//   const [targetRole, setTargetRole] = useState("");
//   const [years, setYears] = useState("");
//   const [industry, setIndustry] = useState("");
//   const [skills, setSkills] = useState("");
//   const [rawInfo, setRawInfo] = useState("");
//   const [notes, setNotes] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [genTitle, setGenTitle] = useState("AI Generated Resume");
//   const [resume, setResume] = useState<any>(null);

//   useEffect(() => {
//     if (!templateId) return;
//     (async () => {
//       const res = await axios.get(`/auth/admin/templates/${templateId}/`, {
//         headers: authHeaders(),
//       });
//       setTpl(res.data);
//       setSchema(res.data?.schema || {});
//     })().catch((e) => {
//       console.error(e);
//       toast.error("Template load failed");
//     });
//   }, [templateId]);

//   const prompt = useMemo(() => {
//     const p: string[] = [];
//     if (targetRole.trim()) p.push(`Target Role: ${targetRole.trim()}`);
//     if (years.trim()) p.push(`Years of Experience: ${years.trim()}`);
//     if (industry.trim()) p.push(`Industry/Domain: ${industry.trim()}`);
//     if (skills.trim()) p.push(`Key Skills: ${skills.trim()}`);
//     if (notes.trim()) p.push(`Notes: ${notes.trim()}`);
//     if (rawInfo.trim()) p.push(`Raw Info:\n${rawInfo.trim()}`);
//     p.push("Make it ATS-friendly. Strong impact bullets with metrics where reasonable.");
//     return p.join("\n");
//   }, [targetRole, years, industry, skills, rawInfo, notes]);

//   const generate = async () => {
//     if (!schema) return toast.error("Schema missing");
//     if (!prompt.trim()) return toast.error("Fill details first");

//     setLoading(true);
//     const tid = toast.loading("Generating...");
//     try {
//       const res = await axios.post(
//         `/auth/admin/ai/generate-resume/`,
//         { schema, prompt, language },
//         { headers: authHeaders() }
//       );

//       setGenTitle(res.data?.title || "AI Generated Resume");
//       setResume(res.data?.resume || null);
//       toast.success("Generated!");
//     } catch (e: any) {
//       console.error(e);
//       toast.error(e?.response?.data?.detail || "Generate failed");
//     } finally {
//       toast.dismiss(tid);
//       setLoading(false);
//     }
//   };

//   const useInTest = () => {
//     if (!resume) return toast.error("Generate first");
//     localStorage.setItem(`AI_RESUME_PREFILL_${templateId}`, JSON.stringify(resume));
//     navigate(`/admin/templates/${templateId}/test`);
//   };

//   if (!tpl || !schema) return <div style={{ padding: 30 }}>Loading...</div>;

//   return (
//     <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           background: "white",
//           borderBottom: "1px solid #e5e7eb",
//           padding: "12px 16px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: 10,
//         }}
//       >
//         <div>
//           <div style={{ fontWeight: 900, fontSize: 18 }}>AI Resume Generator</div>
//           <div style={{ fontSize: 12, color: "#6b7280" }}>Template: {tpl?.name}</div>
//         </div>

//         <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//           <button onClick={() => navigate(-1)} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "white", fontWeight: 800 }}>
//             Back
//           </button>

//           <select value={language} onChange={(e) => setLanguage(e.target.value as any)} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontWeight: 800 }}>
//             <option value="en">English</option>
//             <option value="hi">Hindi</option>
//             <option value="mr">Marathi</option>
//           </select>

//           <button onClick={generate} disabled={loading} style={{ padding: "10px 14px", borderRadius: 10, background: "#2563eb", color: "white", fontWeight: 900 }}>
//             {loading ? "Generating..." : "Generate"}
//           </button>

//           <button onClick={useInTest} disabled={!resume} style={{ padding: "10px 14px", borderRadius: 10, background: resume ? "#10b981" : "#9ca3af", color: "white", fontWeight: 900 }}>
//             Use in Test with Data
//           </button>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 14, padding: 14 }}>
//         {/* Left form */}
//         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
//           <div style={{ fontWeight: 900, marginBottom: 10 }}>Inputs</div>

//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Target Role</label>
//           <input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

//           <div style={{ height: 10 }} />
//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Years of Experience</label>
//           <input value={years} onChange={(e) => setYears(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

//           <div style={{ height: 10 }} />
//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Industry</label>
//           <input value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

//           <div style={{ height: 10 }} />
//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Skills (comma separated)</label>
//           <input value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }} />

//           <div style={{ height: 10 }} />
//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Notes</label>
//           <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 80 }} />

//           <div style={{ height: 10 }} />
//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Raw Info (optional)</label>
//           <textarea value={rawInfo} onChange={(e) => setRawInfo(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 160 }} />

//           <div style={{ height: 10 }} />
//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>Prompt Preview</label>
//           <textarea value={prompt} readOnly style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb", minHeight: 140, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }} />
//         </div>

//         {/* Right preview */}
//         <div style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
//           <div style={{ fontWeight: 900, marginBottom: 10 }}>{genTitle}</div>
//           {!resume ? (
//             <div style={{ padding: 16, color: "#6b7280" }}>Generate click karke preview dekho.</div>
//           ) : (
//             <div style={{ display: "grid", placeItems: "start center" }}>
//               <ResumePreview schema={schema} data={resume} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import ResumePreview from "./ResumePreview";
import toast from "react-hot-toast";

/**
 * ✅ IMPORTANT:
 * Your Admin router uses admin_access token.
 * So we must send Authorization using admin_access, not access.
 */
function adminAuthHeaders() {
  const token = localStorage.getItem("admin_access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function AdminAIGenerateResume() {
  const navigate = useNavigate();

  // ✅ Router path: /admin/template/ai/:templateId
  const { templateId } = useParams();
  const tid = Number(templateId);

  const [tpl, setTpl] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);

  const [language, setLanguage] = useState<"en" | "hi" | "mr">("en");
  const [targetRole, setTargetRole] = useState("");
  const [years, setYears] = useState("");
  const [industry, setIndustry] = useState("");
  const [skills, setSkills] = useState("");
  const [rawInfo, setRawInfo] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [genTitle, setGenTitle] = useState("AI Generated Resume");
  const [resume, setResume] = useState<any>(null);

  // ✅ Load template + schema
  useEffect(() => {
    if (!tid) return;

    (async () => {
      const res = await axios.get(`/auth/admin/templates/${tid}/`, {
        headers: adminAuthHeaders(),
      });

      setTpl(res.data);
      setSchema(res.data?.schema || {});
    })().catch((e) => {
      console.error(e);
      toast.error("Template load failed");
    });
  }, [tid]);

  const prompt = useMemo(() => {
    const p: string[] = [];
    if (targetRole.trim()) p.push(`Target Role: ${targetRole.trim()}`);
    if (years.trim()) p.push(`Years of Experience: ${years.trim()}`);
    if (industry.trim()) p.push(`Industry/Domain: ${industry.trim()}`);
    if (skills.trim()) p.push(`Key Skills: ${skills.trim()}`);
    if (notes.trim()) p.push(`Notes: ${notes.trim()}`);
    if (rawInfo.trim()) p.push(`Raw Info:\n${rawInfo.trim()}`);
    p.push("Make it ATS-friendly. Strong impact bullets with metrics where reasonable.");
    return p.join("\n");
  }, [targetRole, years, industry, skills, rawInfo, notes]);

  const generate = async () => {
    if (!tid) return toast.error("TemplateId missing");
    if (!schema) return toast.error("Schema missing");
    if (!prompt.trim()) return toast.error("Fill details first");

    setLoading(true);
    const toastId = toast.loading("Generating...");
    try {
      const res = await axios.post(
        `/auth/admin/ai/generate-resume/`,
        { schema, prompt, language },
        { headers: adminAuthHeaders() } // ✅ admin_access token
      );

      setGenTitle(res.data?.title || "AI Generated Resume");
      setResume(res.data?.resume || null);

      toast.success("Generated!");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.response?.data?.detail || "Generate failed");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const useInTest = () => {
    if (!tid) return toast.error("TemplateId missing");
    if (!resume) return toast.error("Generate first");

    localStorage.setItem(`AI_RESUME_PREFILL_${tid}`, JSON.stringify(resume));

    // ✅ Your route: /admin/template/test/:templateId
    navigate(`/admin/template/test/${tid}`)

  };

  if (!tpl || !schema) return <div style={{ padding: 30 }}>Loading...</div>;

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
          alignItems: "center",
          gap: 10,
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: 18 }}>AI Resume Generator</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            Template: {tpl?.name}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "white",
              fontWeight: 800,
            }}
          >
            Back
          </button>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              fontWeight: 800,
            }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>

          <button
            onClick={generate}
            disabled={loading}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#2563eb",
              color: "white",
              fontWeight: 900,
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          <button
            onClick={useInTest}
            disabled={!resume}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: resume ? "#10b981" : "#9ca3af",
              color: "white",
              fontWeight: 900,
              cursor: resume ? "pointer" : "not-allowed",
            }}
          >
            Use in Test with Data
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 14,
          padding: 14,
        }}
      >
        {/* Left form */}
        <div
          style={{
            background: "white",
            border: "1px solid #eef2f7",
            borderRadius: 14,
            padding: 12,
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Inputs</div>

          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
            Target Role
          </label>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            style={{
              width: "100%",
              marginTop: 6,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />

          <div style={{ height: 10 }} />
          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
            Years of Experience
          </label>
          <input
            value={years}
            onChange={(e) => setYears(e.target.value)}
            style={{
              width: "100%",
              marginTop: 6,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />

          <div style={{ height: 10 }} />
          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
            Industry
          </label>
          <input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            style={{
              width: "100%",
              marginTop: 6,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />

          <div style={{ height: 10 }} />
          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
            Skills (comma separated)
          </label>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={{
              width: "100%",
              marginTop: 6,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />

          <div style={{ height: 10 }} />
          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: "100%",
              marginTop: 6,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              minHeight: 80,
            }}
          />

          <div style={{ height: 10 }} />
          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
            Raw Info (optional)
          </label>
          <textarea
            value={rawInfo}
            onChange={(e) => setRawInfo(e.target.value)}
            style={{
              width: "100%",
              marginTop: 6,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              minHeight: 160,
            }}
          />

          <div style={{ height: 10 }} />
          <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
            Prompt Preview
          </label>
          <textarea
            value={prompt}
            readOnly
            style={{
              width: "100%",
              marginTop: 6,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              minHeight: 140,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 12,
            }}
          />
        </div>

        {/* Right preview */}
        <div
          style={{
            background: "white",
            border: "1px solid #eef2f7",
            borderRadius: 14,
            padding: 12,
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 10 }}>{genTitle}</div>
          {!resume ? (
            <div style={{ padding: 16, color: "#6b7280" }}>
              Generate click karke preview dekho.
            </div>
          ) : (
            <div style={{ display: "grid", placeItems: "start center" }}>
              <ResumePreview schema={schema} data={resume} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
