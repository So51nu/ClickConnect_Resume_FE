// // src/pages/dashboard/AdminResumeEditor.tsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "../../api/axiosInstance";
// import ResumePreview from "./ResumePreview";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { saveAs } from "file-saver";
// import { Document, Packer, Paragraph, TextRun } from "docx";

// function authHeaders() {
//   const token =
//     localStorage.getItem("admin_access") ||
//     localStorage.getItem("access") ||
//     "";
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// function emptyResume() {
//   return {
//     header: {
//       fullName: "",
//       jobTitle: "",
//       email: "",
//       phone: "",
//       location: "",
//       linkedin: "",
//       website: "",
//     },
//     summary: "",
//     experience: [
//       { title: "", company: "", location: "", from: "", to: "", bullets: [""] },
//     ],
//     education: [{ school: "", degree: "", from: "", to: "" }],
//     skills: { programming: [], frameworks: [], tools: [] },
//     projects: [{ name: "", desc: "" }],

//     // ✅ extra sections (persist in edit too)
//     certifications: [],
//     languages: [],
//     interests: [],
//     strengths: [],
//     achievements: [],
//     courses: [],
//   };
// }

// const EXTRA_SECTIONS: Array<{ id: string; label: string }> = [
//   { id: "certifications", label: "Certifications" },
//   { id: "languages", label: "Languages" },
//   { id: "interests", label: "Interests" },
//   { id: "strengths", label: "Strengths" },
//   { id: "achievements", label: "Achievements" },
//   { id: "courses", label: "Courses" },
// ];

// const toLines = (arr: any) => (Array.isArray(arr) ? arr.join("\n") : "");
// const fromLines = (s: string) =>
//   s
//     .split("\n")
//     .map((x) => x.trim())
//     .filter(Boolean);

// export default function AdminResumeEditor() {
//   const nav = useNavigate();
//   const location = useLocation();
//   const params = useParams();

//   const mode: "admin" | "student" = location.pathname.startsWith("/admin")
//     ? "admin"
//     : "student";

//   const templateId = Number((params as any)?.templateId || 0);
//   const resumeId = Number((params as any)?.resumeId || 0);
//   const isEdit = !!resumeId;

//   const [tpl, setTpl] = useState<any>(null);
//   const [schema, setSchema] = useState<any>(null);

//   const [resume, setResume] = useState<any>(emptyResume());
//   const [title, setTitle] = useState<string>("Untitled Resume");
//   const [saving, setSaving] = useState(false);

//   const printRef = useRef<HTMLDivElement | null>(null);

//   const endpoints = useMemo(() => {
//     if (mode === "admin") {
//       return {
//         getTemplate: (id: number) => `/auth/admin/templates/${id}/`,
//         getResume: (id: number) => `/auth/admin/resumes/${id}/`,
//         putResume: (id: number) => `/auth/admin/resumes/${id}/`,
//         postResume: () => `/auth/admin/resumes/`,
//         backRoute: () => `/admin/templates`,
//         afterCreateEditRoute: (id: number) => `/admin/resume/edit/${id}`,
//       };
//     }
//     return {
//       getTemplate: (id: number) => `/auth/student/templates/${id}/`,
//       getResume: (id: number) => `/auth/student/resumes/${id}/`,
//       putResume: (id: number) => `/auth/student/resumes/${id}/`,
//       postResume: () => `/auth/student/resumes/`,
//       backRoute: () => `/dashboard`,
//       afterCreateEditRoute: (id: number) => `/resume/edit/${id}`,
//     };
//   }, [mode]);

//   // ✅ load resume + template
//   useEffect(() => {
//     const load = async () => {
//       if (isEdit) {
//         const r = await axios.get(endpoints.getResume(resumeId), {
//           headers: authHeaders(),
//         });

//         setTitle(r.data?.title || "Untitled Resume");

//         // merge default structure so missing keys don't break UI
//         setResume({ ...emptyResume(), ...(r.data?.data || {}) });

//         const tplId =
//           r.data?.template_pk ||
//           r.data?.template_id ||
//           r.data?.template?.id ||
//           r.data?.template ||
//           0;

//         if (tplId) {
//           const t = await axios.get(endpoints.getTemplate(Number(tplId)), {
//             headers: authHeaders(),
//           });
//           setTpl(t.data);
//           setSchema(t.data?.schema || {});
//         } else {
//           setTpl({ name: "Template" });
//           setSchema({});
//         }
//         return;
//       }

//       // create mode
//       const t = await axios.get(endpoints.getTemplate(templateId), {
//         headers: authHeaders(),
//       });
//       setTpl(t.data);
//       setSchema(t.data?.schema || {});
//     };

//     if (templateId || resumeId) load().catch(console.error);
//   }, [templateId, resumeId, isEdit, endpoints]);

//   const safeFileName = useMemo(() => {
//     const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
//     return n
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-+|-+$/g, "");
//   }, [resume, title]);

//   const sectionsCfg = schema?.sections || {};

//   const isSectionEnabled = (id: string) => sectionsCfg?.[id]?.enabled !== false;

//   const saveToBackend = async () => {
//     setSaving(true);
//     try {
//       if (isEdit) {
//         const res = await axios.put(
//           endpoints.putResume(resumeId),
//           { title, data: resume, status: "draft" },
//           { headers: authHeaders() }
//         );
//         alert("Saved ✅");
//         return res.data;
//       }

//       const res = await axios.post(
//         endpoints.postResume(),
//         { template_id: tpl?.id || templateId, title, data: resume, status: "draft" },
//         { headers: authHeaders() }
//       );

//       alert("Saved ✅");
//       nav(endpoints.afterCreateEditRoute(res.data.id), { replace: true });
//       return res.data;
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ✅ PDF export (A4 + multipage)
//   const downloadPDF = async () => {
//     const el = printRef.current;
//     if (!el) return;

//     const A4_WIDTH = 794;

//     const canvas = await html2canvas(el, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: "#ffffff",
//       width: A4_WIDTH,
//       windowWidth: A4_WIDTH,
//       height: el.scrollHeight,
//       logging: false,
//       onclone: (doc) => {
//         // remove scrollbars in clone
//         const body = doc.body as any;
//         if (body) body.style.overflow = "visible";
//       },
//     });

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "pt", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = pageWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let heightLeft = imgHeight;
//     let position = 0;

//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       pdf.addPage();
//       position -= pageHeight;
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
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
//             new Paragraph({
//               children: [
//                 new TextRun({ text: h.fullName || "Resume", bold: true, size: 36 }),
//               ],
//             }),
//             new Paragraph({
//               children: [
//                 new TextRun({ text: h.jobTitle || "", bold: true, size: 24 }),
//               ],
//             }),
//             new Paragraph(
//               `${h.email || ""}  ${h.phone || ""}  ${h.location || ""}`.trim()
//             ),
//             new Paragraph({ text: " " }),
//             new Paragraph({
//               children: [new TextRun({ text: "Professional Summary", bold: true })],
//             }),
//             new Paragraph(resume?.summary || ""),
//           ],
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, `${safeFileName}.docx`);
//   };

//   if (!tpl) return <div style={{ padding: 20 }}>Loading...</div>;

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f9fafb",
//         fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
//       }}
//     >
//       <style>{`
//         .re-grid { display: grid; grid-template-columns: 420px 1fr; gap: 14px; padding: 14px; }
//         @media (max-width: 980px) { .re-grid { grid-template-columns: 1fr; } }
//       `}</style>

//       {/* top bar */}
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           background: "white",
//           borderBottom: "1px solid #e5e7eb",
//           padding: "12px 14px",
//           display: "flex",
//           justifyContent: "space-between",
//           gap: 10,
//           flexWrap: "wrap",
//         }}
//       >
//         <div>
//           <div style={{ fontWeight: 950, fontSize: 18 }}>Resume Editor</div>
//           <div style={{ fontSize: 12, color: "#6b7280" }}>
//             {tpl.name} • real-time preview • PDF/DOCX
//           </div>
//         </div>

//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//           <button
//             onClick={() => nav(endpoints.backRoute())}
//             style={{
//               padding: "10px 12px",
//               borderRadius: 10,
//               border: "1px solid #e5e7eb",
//               background: "white",
//               fontWeight: 900,
//             }}
//           >
//             Back
//           </button>

//           <button
//             onClick={saveToBackend}
//             disabled={saving}
//             style={{
//               padding: "10px 14px",
//               borderRadius: 10,
//               border: "1px solid #1d4ed8",
//               background: "#2563eb",
//               color: "white",
//               fontWeight: 950,
//             }}
//           >
//             {saving ? "Saving..." : "Save"}
//           </button>

//           <button
//             onClick={downloadPDF}
//             style={{
//               padding: "10px 12px",
//               borderRadius: 10,
//               border: "1px solid #e5e7eb",
//               background: "white",
//               fontWeight: 900,
//             }}
//           >
//             Download PDF
//           </button>

//           <button
//             onClick={downloadDOCX}
//             style={{
//               padding: "10px 12px",
//               borderRadius: 10,
//               border: "1px solid #e5e7eb",
//               background: "white",
//               fontWeight: 900,
//             }}
//           >
//             Download Word
//           </button>
//         </div>
//       </div>

//       <div className="re-grid">
//         {/* Left: Editor */}
//         <div
//           style={{
//             background: "white",
//             border: "1px solid #eef2f7",
//             borderRadius: 14,
//             padding: 12,
//             overflowY: "auto",
//           }}
//         >
//           <div style={{ fontWeight: 950, marginBottom: 8 }}>Resume Details</div>

//           <label style={{ fontSize: 12, fontWeight: 900, color: "#374151" }}>
//             Document Title
//           </label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{
//               width: "100%",
//               marginTop: 6,
//               padding: 10,
//               borderRadius: 10,
//               border: "1px solid #e5e7eb",
//             }}
//           />

//           <div style={{ height: 12 }} />

//           {/* Header */}
//           <div style={{ fontWeight: 900 }}>Header</div>
//           {(["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const).map(
//             (k) => (
//               <input
//                 key={k}
//                 placeholder={k}
//                 value={resume.header?.[k] || ""}
//                 onChange={(e) =>
//                   setResume((p: any) => ({
//                     ...p,
//                     header: { ...p.header, [k]: e.target.value },
//                   }))
//                 }
//                 style={{
//                   width: "100%",
//                   marginTop: 8,
//                   padding: 10,
//                   borderRadius: 10,
//                   border: "1px solid #e5e7eb",
//                 }}
//               />
//             )
//           )}

//           {/* Summary */}
//           <div style={{ fontWeight: 900, marginTop: 12 }}>Summary</div>
//           <textarea
//             value={resume.summary || ""}
//             onChange={(e) => setResume((p: any) => ({ ...p, summary: e.target.value }))}
//             style={{
//               width: "100%",
//               marginTop: 8,
//               padding: 10,
//               borderRadius: 10,
//               border: "1px solid #e5e7eb",
//               minHeight: 100,
//             }}
//           />

//           {/* Skills */}
//           <div style={{ fontWeight: 900, marginTop: 12 }}>Skills (comma separated)</div>
//           <input
//             placeholder="Programming"
//             value={(resume.skills?.programming || []).join(", ")}
//             onChange={(e) =>
//               setResume((p: any) => ({
//                 ...p,
//                 skills: {
//                   ...p.skills,
//                   programming: e.target.value
//                     .split(",")
//                     .map((x) => x.trim())
//                     .filter(Boolean),
//                 },
//               }))
//             }
//             style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//           />
//           <input
//             placeholder="Frameworks"
//             value={(resume.skills?.frameworks || []).join(", ")}
//             onChange={(e) =>
//               setResume((p: any) => ({
//                 ...p,
//                 skills: {
//                   ...p.skills,
//                   frameworks: e.target.value
//                     .split(",")
//                     .map((x) => x.trim())
//                     .filter(Boolean),
//                 },
//               }))
//             }
//             style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//           />
//           <input
//             placeholder="Tools"
//             value={(resume.skills?.tools || []).join(", ")}
//             onChange={(e) =>
//               setResume((p: any) => ({
//                 ...p,
//                 skills: {
//                   ...p.skills,
//                   tools: e.target.value
//                     .split(",")
//                     .map((x) => x.trim())
//                     .filter(Boolean),
//                 },
//               }))
//             }
//             style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
//           />

//           {/* Extra sections driven by schema */}
//           <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #eef2f7" }}>
//             <div style={{ fontWeight: 950, marginBottom: 6 }}>Extra Sections (template based)</div>

//             {EXTRA_SECTIONS.map((sec) => {
//               if (!isSectionEnabled(sec.id)) return null;
//               return (
//                 <div key={sec.id} style={{ marginTop: 10 }}>
//                   <div style={{ fontSize: 12, fontWeight: 900, color: "#374151", marginBottom: 6 }}>
//                     {sec.label}
//                   </div>
//                   <textarea
//                     value={toLines((resume as any)?.[sec.id])}
//                     onChange={(e) =>
//                       setResume((p: any) => ({ ...p, [sec.id]: fromLines(e.target.value) }))
//                     }
//                     placeholder="One item per line"
//                     style={{
//                       width: "100%",
//                       minHeight: 90,
//                       padding: 10,
//                       borderRadius: 10,
//                       border: "1px solid #e5e7eb",
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Right: Preview */}
//         <div style={{ display: "grid", placeItems: "start center" }}>
//           <div style={{ width: "100%", maxWidth: 860 }}>
//             <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Preview</div>

//             <div
//               ref={printRef}
//               style={{
//                 background: "white",
//                 padding: 12,
//                 borderRadius: 14,
//                 border: "1px solid #eef2f7",
//               }}
//             >
//               <ResumePreview schema={schema} data={resume} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
    experience: [
      { title: "", company: "", location: "", from: "", to: "", bullets: [""] },
    ],
    education: [{ school: "", degree: "", from: "", to: "" }],
    skills: { programming: [], frameworks: [], tools: [] },
    projects: [{ name: "", desc: "" }],

    // ✅ extra sections (persist in edit too)
    certifications: [],
    languages: [],
    interests: [],
    strengths: [],
    achievements: [],
    courses: [],
  };
}

const EXTRA_SECTIONS: Array<{ id: string; label: string }> = [
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "interests", label: "Interests" },
  { id: "strengths", label: "Strengths" },
  { id: "achievements", label: "Achievements" },
  { id: "courses", label: "Courses" },
];

const toLines = (arr: any) => (Array.isArray(arr) ? arr.join("\n") : "");
const fromLines = (s: string) =>
  s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

const currencySymbol = (c?: "INR" | "USD") => (c === "USD" ? "$" : "₹");

export default function AdminResumeEditor() {
  const nav = useNavigate();
  const location = useLocation();
  const params = useParams();

  const mode: "admin" | "student" = location.pathname.startsWith("/admin")
    ? "admin"
    : "student";

  const templateId = Number((params as any)?.templateId || 0);
  const resumeId = Number((params as any)?.resumeId || 0);
  const isEdit = !!resumeId;

  const [tpl, setTpl] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null);

  const [resume, setResume] = useState<any>(emptyResume());
  const [title, setTitle] = useState<string>("Untitled Resume");
  const [saving, setSaving] = useState(false);
  const [paying, setPaying] = useState(false);

  const printRef = useRef<HTMLDivElement | null>(null);

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
      backRoute: () => `/templates`,
      afterCreateEditRoute: (id: number) => `/resume/edit/${id}`,
    };
  }, [mode]);

  // ✅ load resume + template
  useEffect(() => {
    const load = async () => {
      if (isEdit) {
        const r = await axios.get(endpoints.getResume(resumeId), {
          headers: authHeaders(),
        });

        setTitle(r.data?.title || "Untitled Resume");

        // merge default structure so missing keys don't break UI
        setResume({ ...emptyResume(), ...(r.data?.data || {}) });

        const tplId =
          r.data?.template_pk ||
          r.data?.template_id ||
          r.data?.template?.id ||
          r.data?.template ||
          0;

        if (tplId) {
          const t = await axios.get(endpoints.getTemplate(Number(tplId)), {
            headers: authHeaders(),
          });
          setTpl(t.data);
          setSchema(t.data?.schema || {});
        } else {
          setTpl({ name: "Template" });
          setSchema({});
        }
        return;
      }

      // create mode
      const t = await axios.get(endpoints.getTemplate(templateId), {
        headers: authHeaders(),
      });
      setTpl(t.data);
      setSchema(t.data?.schema || {});
    };

    if (templateId || resumeId) load().catch(console.error);
  }, [templateId, resumeId, isEdit, endpoints]);

  const safeFileName = useMemo(() => {
    const n = (resume?.header?.fullName || title || "resume").trim() || "resume";
    return n
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, [resume, title]);

  const sectionsCfg = schema?.sections || {};
  const isSectionEnabled = (id: string) => sectionsCfg?.[id]?.enabled !== false;

  const isLocked =
    mode === "student" &&
    tpl?.pricing?.status === "active" &&
    tpl?.pricing?.billing_type !== "free" &&
    !tpl?.has_access;

  const billingType = tpl?.pricing?.billing_type as
    | "free"
    | "one_time"
    | "subscription"
    | undefined;

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if ((window as any).Razorpay) return resolve(true);
      const id = "razorpay-checkout-js";
      if (document.getElementById(id)) return resolve(true);

      const s = document.createElement("script");
      s.id = id;
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const buyAndUnlock = async () => {
    if (mode !== "student") return;
    if (!tpl?.id && !templateId) return;

    if (billingType === "subscription") {
      alert("Subscription required for this template.");
      return;
    }

    setPaying(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) {
        alert("Razorpay script load failed");
        return;
      }

      // create order
      let orderRes: any;
      try {
        orderRes = await axios.post(
          "/auth/student/payments/template/order/",
          { template_id: tpl?.id || templateId },
          { headers: authHeaders() }
        );
      } catch (e: any) {
        if (e?.response?.status === 402) {
          alert("Subscription required for this template.");
          return;
        }
        alert(e?.response?.data?.detail || "Order create failed");
        return;
      }

      if (orderRes?.data?.has_access) {
        // already unlocked
        const t = await axios.get(endpoints.getTemplate(tpl?.id || templateId), {
          headers: authHeaders(),
        });
        setTpl(t.data);
        return;
      }

      const { key, order_id, amount, currency } = orderRes.data || {};
      if (!key || !order_id) {
        alert("Invalid order response from backend");
        return;
      }

      const rz = new (window as any).Razorpay({
        key,
        order_id,
        amount,
        currency,
        name: "Resume Templates",
        description: `Unlock template: ${tpl?.name || "Template"}`,
        handler: async (resp: any) => {
          try {
            await axios.post(
              "/auth/student/payments/template/verify/",
              {
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
              },
              { headers: authHeaders() }
            );

            alert("Payment successful ✅ Template unlocked!");

            // refresh template to get has_access true
            const t = await axios.get(endpoints.getTemplate(tpl?.id || templateId), {
              headers: authHeaders(),
            });
            setTpl(t.data);
          } catch (e: any) {
            alert(e?.response?.data?.detail || "Verify failed");
          }
        },
      });

      rz.open();
    } finally {
      setPaying(false);
    }
  };

  const saveToBackend = async () => {
    if (isLocked) {
      alert("This template is locked. Please purchase/unlock first.");
      return null;
    }

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
    } catch (e: any) {
      alert(e?.response?.data?.detail || "Save failed");
      return null;
    } finally {
      setSaving(false);
    }
  };

  // ✅ Use backend export for both admin and student (fixes corrupt pdf/docx)
  const downloadFromBackend = async (kind: "pdf" | "docx") => {
    if (isLocked) {
      alert("This template is locked. Please purchase/unlock first.");
      return;
    }

    let id = resumeId;

    // if create mode (no resumeId), save first
    if (!id) {
      const saved = await saveToBackend();
      if (!saved?.id) return;
      id = saved.id;
    }

    try {
      const url = `/auth/resumes/${id}/export/${kind}/`;
      const res = await axios.get(url, {
        headers: authHeaders(),
        responseType: "blob",
      });

      const ext = kind === "pdf" ? "pdf" : "docx";
      saveAs(res.data, `${safeFileName}.${ext}`);
    } catch (e: any) {
      alert(e?.response?.data?.detail || `Download ${kind.toUpperCase()} failed`);
    }
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
            {tpl.name} • real-time preview • PDF/DOCX
          </div>

          {mode === "student" && tpl?.pricing?.status === "active" ? (
            <div style={{ marginTop: 6, fontSize: 12, color: "#374151" }}>
              {tpl?.pricing?.billing_type === "free" ? (
                <b>Free</b>
              ) : tpl?.pricing?.billing_type === "subscription" ? (
                <b>Subscription</b>
              ) : (
                <b>
                  {currencySymbol(tpl?.pricing?.currency)}
                  {Number(tpl?.pricing?.final_price || 0)}
                </b>
              )}
              {" • "}
              {isLocked ? (
                <span style={{ color: "#991b1b", fontWeight: 900 }}>Locked</span>
              ) : (
                <span style={{ color: "#166534", fontWeight: 900 }}>Unlocked</span>
              )}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {/* <button
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
          </button> */}

          {isLocked ? (
            <button
              onClick={buyAndUnlock}
              disabled={paying || billingType === "subscription"}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #7c2d12",
                background: billingType === "subscription" ? "#9ca3af" : "#ea580c",
                color: "white",
                fontWeight: 950,
                cursor:
                  paying || billingType === "subscription" ? "not-allowed" : "pointer",
                opacity: paying ? 0.75 : 1,
              }}
            >
              {paying
                ? "Processing..."
                : billingType === "subscription"
                ? "Subscription Required"
                : `Buy & Unlock ${currencySymbol(tpl?.pricing?.currency)}${Number(
                    tpl?.pricing?.final_price || 0
                  )}`}
            </button>
          ) : (
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
          )}

          <button
            onClick={() => downloadFromBackend("pdf")}
            disabled={isLocked}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "white",
              fontWeight: 900,
              opacity: isLocked ? 0.6 : 1,
              cursor: isLocked ? "not-allowed" : "pointer",
            }}
          >
            Download PDF
          </button>

          <button
            onClick={() => downloadFromBackend("docx")}
            disabled={isLocked}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "white",
              fontWeight: 900,
              opacity: isLocked ? 0.6 : 1,
              cursor: isLocked ? "not-allowed" : "pointer",
            }}
          >
            Download Word
          </button>
        </div>
      </div>

      <div className="re-grid">
        {/* Left: Editor */}
        <div
          style={{
            background: "white",
            border: "1px solid #eef2f7",
            borderRadius: 14,
            padding: 12,
            overflowY: "auto",
            opacity: isLocked ? 0.6 : 1,
            pointerEvents: isLocked ? "none" : "auto",
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

          <div style={{ height: 12 }} />

          {/* Header */}
          <div style={{ fontWeight: 900 }}>Header</div>
          {(
            ["fullName", "jobTitle", "email", "phone", "location", "linkedin", "website"] as const
          ).map((k) => (
            <input
              key={k}
              placeholder={k}
              value={resume.header?.[k] || ""}
              onChange={(e) =>
                setResume((p: any) => ({
                  ...p,
                  header: { ...p.header, [k]: e.target.value },
                }))
              }
              style={{
                width: "100%",
                marginTop: 8,
                padding: 10,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
              }}
            />
          ))}

          {/* Summary */}
          <div style={{ fontWeight: 900, marginTop: 12 }}>Summary</div>
          <textarea
            value={resume.summary || ""}
            onChange={(e) =>
              setResume((p: any) => ({ ...p, summary: e.target.value }))
            }
            style={{
              width: "100%",
              marginTop: 8,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              minHeight: 100,
            }}
          />

          {/* Skills */}
          <div style={{ fontWeight: 900, marginTop: 12 }}>
            Skills (comma separated)
          </div>
          <input
            placeholder="Programming"
            value={(resume.skills?.programming || []).join(", ")}
            onChange={(e) =>
              setResume((p: any) => ({
                ...p,
                skills: {
                  ...p.skills,
                  programming: e.target.value
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                },
              }))
            }
            style={{
              width: "100%",
              marginTop: 8,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />
          <input
            placeholder="Frameworks"
            value={(resume.skills?.frameworks || []).join(", ")}
            onChange={(e) =>
              setResume((p: any) => ({
                ...p,
                skills: {
                  ...p.skills,
                  frameworks: e.target.value
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                },
              }))
            }
            style={{
              width: "100%",
              marginTop: 8,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />
          <input
            placeholder="Tools"
            value={(resume.skills?.tools || []).join(", ")}
            onChange={(e) =>
              setResume((p: any) => ({
                ...p,
                skills: {
                  ...p.skills,
                  tools: e.target.value
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                },
              }))
            }
            style={{
              width: "100%",
              marginTop: 8,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />

          {/* Extra sections driven by schema */}
          <div
            style={{
              marginTop: 14,
              paddingTop: 14,
              borderTop: "1px solid #eef2f7",
            }}
          >
            <div style={{ fontWeight: 950, marginBottom: 6 }}>
              Extra Sections (template based)
            </div>

            {EXTRA_SECTIONS.map((sec) => {
              if (!isSectionEnabled(sec.id)) return null;
              return (
                <div key={sec.id} style={{ marginTop: 10 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    {sec.label}
                  </div>
                  <textarea
                    value={toLines((resume as any)?.[sec.id])}
                    onChange={(e) =>
                      setResume((p: any) => ({
                        ...p,
                        [sec.id]: fromLines(e.target.value),
                      }))
                    }
                    placeholder="One item per line"
                    style={{
                      width: "100%",
                      minHeight: 90,
                      padding: 10,
                      borderRadius: 10,
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ display: "grid", placeItems: "start center" }}>
          <div style={{ width: "100%", maxWidth: 860 }}>
            <div style={{ fontWeight: 950, marginBottom: 10 }}>Live Preview</div>

            <div
              ref={printRef}
              style={{
                background: "white",
                padding: 12,
                borderRadius: 14,
                border: "1px solid #eef2f7",
              }}
            >
              <ResumePreview schema={schema} data={resume} />
            </div>

            {isLocked ? (
              <div
                style={{
                  marginTop: 12,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#991b1b",
                  padding: "10px 12px",
                  borderRadius: 12,
                  fontWeight: 900,
                  fontSize: 13,
                }}
              >
                Locked template: Purchase/unlock required to edit & export.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
