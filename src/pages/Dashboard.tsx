
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axiosInstance";
// import { saveAs } from "file-saver";
// import ResumePreview from "./dashboard/ResumePreview";
// import {
//   PlusCircle,
//   FileText,
//   CheckCircle,
//   Clock,
//   Download,
//   Crown,
//   Edit3,
//   LogOut,
//   Plus,
//   Eye,
//   Trash2,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";

// function authHeaders() {
//   const token = localStorage.getItem("access") || "";
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// type PricingStatus = "active" | "inactive";
// type BillingType = "free" | "one_time" | "subscription";

// interface UserType {
//   id?: number;
//   name?: string;
//   email?: string;
//   phone?: string;
//   pincode?: string;
// }

// interface Stats {
//   totalResumes: number;
//   completed: number;
//   inProgress: number;
//   downloads: number;
// }

// interface Resume {
//   id: number;
//   title: string;
//   status: "draft" | "in_progress" | "completed" | "published" | string;
//   template_name?: string;
//   updated_at: string;
//   created_at: string;
//   download_count?: number;
// }

// interface Template {
//   id: number;
//   name: string;
//   category?: string;
//   status: string;
//   layout?: string;
//   downloads?: number;
//   preview_image?: string;
//   color?: string;
//   schema?: any;

//   pricing?: {
//     billing_type: BillingType;
//     currency: "INR" | "USD";
//     price: number;
//     discount_percent: number;
//     final_price: number;
//     status: PricingStatus;
//   };
//   has_access?: boolean;
// }

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState<"home" | "resumes" | "profile">(
//     "home"
//   );

//   const [loading, setLoading] = useState(true);
//   const [loadingTemplates, setLoadingTemplates] = useState(false);
//   const [loadingResumes, setLoadingResumes] = useState(false);

//   const [stats, setStats] = useState<Stats>({
//     totalResumes: 0,
//     completed: 0,
//     inProgress: 0,
//     downloads: 0,
//   });

//   const [resumes, setResumes] = useState<Resume[]>([]);
//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [user, setUser] = useState<UserType | null>(null);

//   const [showTemplatesModal, setShowTemplatesModal] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [creatingResume, setCreatingResume] = useState<number | null>(null);

//   // ✅ payment state
//   const [payingTemplateId, setPayingTemplateId] = useState<number | null>(null);

//   // ✅ preview modal state
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewSchema, setPreviewSchema] = useState<any>(null);
//   const [previewLoading, setPreviewLoading] = useState(false);
//   const [previewTitle, setPreviewTitle] = useState("Template Preview");

//   // ✅ Fit-to-viewport scaling (NO SCROLL)
//   const previewViewportRef = useRef<HTMLDivElement | null>(null);
//   const previewPageRef = useRef<HTMLDivElement | null>(null);
//   const [previewScale, setPreviewScale] = useState(1);

//   const currencySymbol = (c?: "INR" | "USD") => (c === "USD" ? "$" : "₹");

//   const normalizeMediaUrl = (src?: string) => {
//     if (!src) return "";
//     if (/^https?:\/\//i.test(src)) return src;
//     const base = String((axios as any).defaults?.baseURL || "").replace(
//       /\/api\/?$/,
//       ""
//     );
//     return `${base}${src.startsWith("/") ? src : `/${src}`}`;
//   };

//   const requireStudentSession = () => {
//     const token = localStorage.getItem("access");
//     const userData = localStorage.getItem("user");
//     if (!token || !userData) {
//       alert("Your session has expired. Please login again.");
//       navigate("/login");
//       return false;
//     }
//     return true;
//   };

//   // ✅ template lock logic
//   const isTemplateLocked = (t: Template) => {
//     const p = t.pricing;
//     if (!p) return false; // no pricing => treat as free
//     if (p.status !== "active") return true;
//     if (p.billing_type === "free") return false;
//     return !t.has_access;
//   };

//   // ✅ Razorpay loader
//   const loadRazorpay = () =>
//     new Promise<boolean>((resolve) => {
//       if ((window as any).Razorpay) return resolve(true);
//       const id = "razorpay-checkout-js";
//       if (document.getElementById(id)) return resolve(true);

//       const s = document.createElement("script");
//       s.id = id;
//       s.src = "https://checkout.razorpay.com/v1/checkout.js";
//       s.onload = () => resolve(true);
//       s.onerror = () => resolve(false);
//       document.body.appendChild(s);
//     });

//   // ✅ Start payment & unlock
//   const handleBuyTemplate = async (t: Template) => {
//     if (!requireStudentSession()) return;

//     setPayingTemplateId(t.id);
//     try {
//       const ok = await loadRazorpay();
//       if (!ok) {
//         alert("Payment SDK failed to load.");
//         return;
//       }

//       // 1) Create order from backend
//       let orderRes: any;
//       try {
//         orderRes = await axios.post(
//           "/auth/student/payments/template/order/",
//           { template_id: t.id },
//           { headers: authHeaders() }
//         );
//       } catch (e: any) {
//         if (e?.response?.status === 402) {
//           alert("Subscription required for this template.");
//           return;
//         }
//         alert(e?.response?.data?.detail || "Failed to create order.");
//         return;
//       }

//       // already has access
//       if (orderRes?.data?.has_access) {
//         await fetchTemplates();
//         setShowTemplatesModal(false);
//         navigate(`/resume/create/${t.id}`);
//         return;
//       }

//       const { key, order_id, amount, currency } = orderRes.data || {};
//       if (!key || !order_id) {
//         alert("Invalid order response from backend.");
//         return;
//       }

//       // 2) Open checkout
//       const rz = new (window as any).Razorpay({
//         key,
//         order_id,
//         amount,
//         currency,
//         name: "Resume Templates",
//         description: `Unlock template: ${t.name}`,
//         handler: async (resp: any) => {
//           try {
//             // 3) Verify payment
//             await axios.post(
//               "/auth/student/payments/template/verify/",
//               {
//                 razorpay_order_id: resp.razorpay_order_id,
//                 razorpay_payment_id: resp.razorpay_payment_id,
//                 razorpay_signature: resp.razorpay_signature,
//               },
//               { headers: authHeaders() }
//             );

//             alert("Payment successful ✅ Template unlocked!");
//             await fetchTemplates();
//             setShowTemplatesModal(false);
//             navigate(`/resume/create/${t.id}`);
//           } catch (e: any) {
//             alert(e?.response?.data?.detail || "Payment verify failed.");
//           }
//         },
//       });

//       rz.open();
//     } finally {
//       setPayingTemplateId(null);
//     }
//   };

//   const fetchResumes = async () => {
//     try {
//       setLoadingResumes(true);
//       const res = await axios.get("/auth/student/resumes/", {
//         headers: authHeaders(),
//       });
//       const data: any = res.data;
//       const list = Array.isArray(data) ? data : data?.results || [];
//       setResumes(list);
//     } catch (err) {
//       console.error("Error fetching resumes:", err);
//       setError("Failed to load resumes.");
//     } finally {
//       setLoadingResumes(false);
//     }
//   };

//   const fetchTemplates = async () => {
//     try {
//       setLoadingTemplates(true);
//       const res = await axios.get("/auth/student/templates/", {
//         headers: authHeaders(),
//       });
//       const data: any = res.data;
//       const list = Array.isArray(data) ? data : data?.results || [];
//       setTemplates(list);
//     } catch (err) {
//       console.error("Error fetching templates:", err);
//       setError("Failed to load templates.");
//     } finally {
//       setLoadingTemplates(false);
//     }
//   };

//   useEffect(() => {
//     const boot = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const storedUser = JSON.parse(
//           localStorage.getItem("user") || "null"
//         ) as UserType;

//         if (!storedUser) {
//           navigate("/login", { replace: true });
//           return;
//         }

//         setUser(storedUser);

//         const statsRes = await axios.get("/auth/student/dashboard/stats/", {
//           headers: authHeaders(),
//         });

//         setStats(statsRes.data as Stats);

//         await fetchResumes();
//       } catch (err) {
//         console.error("Error booting dashboard:", err);
//         setError("Failed to load dashboard data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     boot();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.removeItem("user");
//     navigate("/login", { replace: true });
//   };

//   const handleEditResume = (resumeId: number) => {
//     navigate(`/resume/edit/${resumeId}`);
//   };

//   const handleDeleteResume = async (resumeId: number) => {
//     if (!window.confirm("Are you sure you want to delete this resume?")) return;

//     try {
//       await axios.delete(`/auth/student/resumes/${resumeId}/`, {
//         headers: authHeaders(),
//       });

//       const updated = resumes.filter((r) => r.id !== resumeId);
//       setResumes(updated);

//       setStats((prev) => ({
//         ...prev,
//         totalResumes: Math.max(0, prev.totalResumes - 1),
//         completed: updated.filter((r) => r.status === "completed").length,
//         inProgress: updated.filter(
//           (r) => r.status === "draft" || r.status === "in_progress"
//         ).length,
//       }));
//     } catch (err) {
//       console.error("Error deleting resume:", err);
//       alert("Failed to delete resume");
//     }
//   };

//   const handleDownloadResume = async (
//     resume: Resume,
//     format: "pdf" | "word" = "pdf"
//   ) => {
//     try {
//       // 1) track download
//       await axios.post(
//         `/auth/student/resumes/${resume.id}/download/`,
//         {},
//         { headers: authHeaders() }
//       );

//       setResumes((prev) =>
//         prev.map((r) =>
//           r.id === resume.id
//             ? { ...r, download_count: (r.download_count || 0) + 1 }
//             : r
//         )
//       );

//       setStats((prev) => ({ ...prev, downloads: prev.downloads + 1 }));

//       // 2) download file
//       const url =
//         format === "pdf"
//           ? `/auth/resumes/${resume.id}/export/pdf/`
//           : `/auth/resumes/${resume.id}/export/docx/`;

//       const fileRes = await axios.get(url, {
//         headers: authHeaders(),
//         responseType: "blob",
//       });

//       const safeTitle =
//         (resume.title || "resume")
//           .toLowerCase()
//           .replace(/[^a-z0-9]+/g, "-")
//           .replace(/^-+|-+$/g, "") || "resume";

//       const ext = format === "pdf" ? "pdf" : "docx";
//       saveAs(fileRes.data, `${safeTitle}-${resume.id}.${ext}`);
//     } catch (err: any) {
//       console.error("Download error:", err);
//       const msg =
//         err?.response?.data?.detail ||
//         err?.message ||
//         "Failed to download resume";
//       alert(msg);
//     }
//   };

//   const handleUseTemplate = async (template: Template) => {
//     if (!requireStudentSession()) return;

//     if (isTemplateLocked(template)) {
//       const p = template.pricing;
//       if (p?.billing_type === "subscription") {
//         alert("Subscription required for this template.");
//         return;
//       }
//       await handleBuyTemplate(template);
//       return;
//     }

//     try {
//       setCreatingResume(template.id);
//       setShowTemplatesModal(false);
//       navigate(`/resume/create/${template.id}`);
//     } finally {
//       setCreatingResume(null);
//     }
//   };

//   const openTemplatePreview = async (template: Template) => {
//     if (!requireStudentSession()) return;

//     setPreviewTitle(
//       template?.name ? `Preview: ${template.name}` : "Template Preview"
//     );
//     setPreviewOpen(true);

//     // if schema already present
//     if (template?.schema) {
//       setPreviewSchema(template.schema);
//       return;
//     }

//     try {
//       setPreviewLoading(true);
//       const detail = await axios.get(`/auth/student/templates/${template.id}/`, {
//         headers: authHeaders(),
//       });
//       setPreviewSchema(detail.data?.schema || {});
//     } catch (err) {
//       console.error("Preview schema load failed:", err);
//       setPreviewSchema({});
//       setError("Preview schema not available for this template.");
//     } finally {
//       setPreviewLoading(false);
//     }
//   };

//   const openTemplatesModal = () => {
//     if (!requireStudentSession()) return;
//     setShowTemplatesModal(true);
//     fetchTemplates();
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const statusMap: Record<string, { bg: string; color: string; text: string }> =
//       {
//         draft: { bg: "#f1f5f9", color: "#64748b", text: "Draft" },
//         in_progress: { bg: "#fef3c7", color: "#92400e", text: "In Progress" },
//         completed: { bg: "#dcfce7", color: "#166534", text: "Completed" },
//         published: { bg: "#dbeafe", color: "#1e40af", text: "Published" },
//       };

//     const s = statusMap[status] || {
//       bg: "#f3f4f6",
//       color: "#374151",
//       text: status,
//     };

//     return (
//       <span
//         style={{
//           backgroundColor: s.bg,
//           color: s.color,
//           padding: "4px 12px",
//           borderRadius: "20px",
//           fontSize: "10px",
//           fontWeight: "bold",
//           textTransform: "uppercase",
//         }}
//       >
//         {s.text}
//       </span>
//     );
//   };

//   const templateThumb = (t: Template) => {
//     // If backend provides an image, keep it (this is template list thumb)
//     if (t.preview_image) {
//       return (
//         <img
//           src={normalizeMediaUrl(t.preview_image)}
//           alt={t.name}
//           style={{
//             width: "100%",
//             height: 180,
//             objectFit: "cover",
//             borderRadius: 8,
//             marginBottom: 16,
//             border: "1px solid #e2e8f0",
//           }}
//         />
//       );
//     }

//     // fallback to live schema render (small)
//     if (t.schema) {
//       return (
//         <div
//           style={{
//             width: "100%",
//             height: 180,
//             borderRadius: 8,
//             marginBottom: 16,
//             border: "1px solid #e2e8f0",
//             overflow: "hidden",
//             background: "#fff",
//             position: "relative",
//           }}
//         >
//           <div style={{ transform: "scale(0.35)", transformOrigin: "top left" }}>
//             <ResumePreview schema={t.schema} />
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div
//         style={{
//           width: "100%",
//           height: 180,
//           borderRadius: 8,
//           marginBottom: 16,
//           backgroundColor: t.color || "#3b82f6",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "white",
//           fontWeight: "bold",
//           fontSize: 18,
//           textAlign: "center",
//           padding: 10,
//         }}
//       >
//         {t.name}
//       </div>
//     );
//   };

//   // ✅ derived
//   const recentResumes = useMemo(() => {
//     return [...resumes]
//       .sort(
//         (a, b) =>
//           new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
//       )
//       .slice(0, 5);
//   }, [resumes]);

//   // ✅ Preview: Fit-to-viewport scale calc (no scroll)
//   const recalcPreviewScale = () => {
//     const viewport = previewViewportRef.current;
//     const page = previewPageRef.current;
//     if (!viewport || !page) return;

//     // reset for accurate measurement
//     setPreviewScale(1);
//     page.style.transform = "scale(1)";
//     page.style.transformOrigin = "top center";

//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         const vw = viewport.clientWidth;
//         const vh = viewport.clientHeight;
//         if (!vw || !vh) return;

//         const pw = page.scrollWidth || page.offsetWidth;
//         const ph = page.scrollHeight || page.offsetHeight;
//         if (!pw || !ph) return;

//         const padding = 24;
//         const scale = Math.min((vw - padding) / pw, (vh - padding) / ph);
//         const clamped = Math.max(0.2, Math.min(1, scale));
//         setPreviewScale(clamped);
//       });
//     });
//   };

//   // ✅ When preview opens, calculate scale and watch resize
//   useEffect(() => {
//     if (!previewOpen) return;

//     recalcPreviewScale();

//     const viewport = previewViewportRef.current;
//     let ro: ResizeObserver | null = null;
//     if (viewport) {
//       ro = new ResizeObserver(() => recalcPreviewScale());
//       ro.observe(viewport);
//     }

//     window.addEventListener("resize", recalcPreviewScale);
//     return () => {
//       window.removeEventListener("resize", recalcPreviewScale);
//       if (ro) ro.disconnect();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [previewOpen, previewSchema]);

//   // ✅ Lock body scroll when preview is open
//   useEffect(() => {
//     if (!previewOpen) return;

//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [previewOpen]);

//   // ✅ Disable wheel/trackpad/touch scroll while preview open (no scrolling at all)
//   useEffect(() => {
//     if (!previewOpen) return;

//     const prevent = (e: any) => {
//       e.preventDefault();
//     };

//     const opts: AddEventListenerOptions = { passive: false };
//     window.addEventListener("wheel", prevent, opts);
//     window.addEventListener("touchmove", prevent, opts);

//     return () => {
//       window.removeEventListener("wheel", prevent as any, opts);
//       window.removeEventListener("touchmove", prevent as any, opts);
//     };
//   }, [previewOpen]);

//   if (loading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//           backgroundColor: "#f8fafc",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <Loader2
//             size={32}
//             color="#3b82f6"
//             className="animate-spin"
//             style={{ margin: "0 auto 16px" }}
//           />
//           <div style={{ fontSize: 16, color: "#64748b" }}>
//             Loading Dashboard...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // styles
//   const pageContainer: React.CSSProperties = {
//     backgroundColor: "#f8fafc",
//     minHeight: "100vh",
//     width: "100vw",
//     display: "flex",
//     flexDirection: "column",
//     fontFamily:
//       '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//     margin: 0,
//     padding: 0,
//   };

//   const headerStyle: React.CSSProperties = {
//     backgroundColor: "#fff",
//     borderBottom: "1px solid #e2e8f0",
//     padding: "12px 40px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//     position: "sticky",
//     top: 0,
//     zIndex: 100,
//     boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//   };

//   const mainContent: React.CSSProperties = {
//     width: "100%",
//     maxWidth: 1200,
//     margin: "0 auto",
//     padding: 40,
//     flex: 1,
//   };

//   const statsGrid: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: 20,
//     marginBottom: 32,
//   };

//   const cardBase: React.CSSProperties = {
//     backgroundColor: "#fff",
//     border: "1px solid #e2e8f0",
//     borderRadius: 12,
//     padding: 24,
//     boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
//     transition: "transform 0.2s, box-shadow 0.2s",
//   };

//   const upgradeBox: React.CSSProperties = {
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     borderRadius: 16,
//     padding: 30,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 40,
//     color: "white",
//   };

//   const resumeItemStyle: React.CSSProperties = {
//     backgroundColor: "#fff",
//     border: "1px solid #e2e8f0",
//     borderRadius: 12,
//     padding: "16px 24px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//     transition: "all 0.2s",
//   };

//   const profileDetailCard: React.CSSProperties = {
//     backgroundColor: "#fff",
//     padding: 30,
//     borderRadius: 16,
//     border: "1px solid #e2e8f0",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//   };

//   const detailRow: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "16px 0",
//     borderBottom: "1px solid #f1f5f9",
//     gap: 16,
//   };

//   const templateCard: React.CSSProperties = {
//     backgroundColor: "#fff",
//     border: "1px solid #e2e8f0",
//     borderRadius: 12,
//     padding: 20,
//     transition: "all 0.3s ease",
//     cursor: "pointer",
//   };

//   return (
//     <div style={pageContainer}>
//       <header style={headerStyle}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <div style={{ backgroundColor: "#1e40af", padding: 8, borderRadius: 8 }}>
//             <FileText color="white" size={20} />
//           </div>
//           <div style={{ lineHeight: 1.2 }}>
//             <div style={{ fontWeight: "bold", fontSize: 18, color: "#1e293b" }}>
//               Resume Builder Pro
//             </div>
//             <div style={{ fontSize: 12, color: "#64748b" }}>Student Dashboard</div>
//           </div>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <User size={16} color="#64748b" />
//             <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>
//               {user?.name || "Student"}
//             </span>
//           </div>
//           <span
//             style={{
//               border: "1px solid #e2e8f0",
//               padding: "4px 10px",
//               borderRadius: 6,
//               fontSize: 11,
//               fontWeight: "bold",
//               color: "#64748b",
//             }}
//           >
//             FREE Plan
//           </span>
//           <div style={{ cursor: "pointer" }} onClick={handleLogout} title="Logout">
//             <LogOut size={20} color="#94a3b8" />
//           </div>
//         </div>
//       </header>

//       <main style={mainContent}>
//         {error && (
//           <div
//             style={{
//               backgroundColor: "#fee2e2",
//               border: "1px solid #fecaca",
//               color: "#dc2626",
//               padding: 16,
//               borderRadius: 12,
//               marginBottom: 24,
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//             }}
//           >
//             <AlertCircle size={20} />
//             <span>{error}</span>
//           </div>
//         )}

//         <div
//           style={{
//             display: "flex",
//             gap: 8,
//             marginBottom: 30,
//             borderBottom: "1px solid #e2e8f0",
//             paddingBottom: 10,
//           }}
//         >
//           <button
//             onClick={() => setActiveTab("home")}
//             style={{
//               backgroundColor: activeTab === "home" ? "#1e40af" : "transparent",
//               color: activeTab === "home" ? "white" : "#64748b",
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: 8,
//               fontSize: 14,
//               fontWeight: 500,
//               cursor: "pointer",
//             }}
//           >
//             Overview
//           </button>

//           <button
//             onClick={() => setActiveTab("resumes")}
//             style={{
//               backgroundColor: activeTab === "resumes" ? "#1e40af" : "transparent",
//               color: activeTab === "resumes" ? "white" : "#64748b",
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: 8,
//               fontSize: 14,
//               fontWeight: 500,
//               cursor: "pointer",
//             }}
//           >
//             My Resumes
//           </button>

//           <button onClick={() => navigate("/ai-resume")}>AI Resume Generator</button>

//           <button
//             onClick={() => setActiveTab("profile")}
//             style={{
//               backgroundColor: activeTab === "profile" ? "#1e40af" : "transparent",
//               color: activeTab === "profile" ? "white" : "#64748b",
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: 8,
//               fontSize: 14,
//               fontWeight: 500,
//               cursor: "pointer",
//             }}
//           >
//             Profile
//           </button>

//           <button
//             onClick={openTemplatesModal}
//             style={{
//               backgroundColor: "#10b981",
//               color: "white",
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: 8,
//               fontSize: 14,
//               fontWeight: 500,
//               cursor: "pointer",
//               marginLeft: "auto",
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//             }}
//           >
//             <Plus size={16} /> Browse Templates
//           </button>
//         </div>

//         {/* ✅ HOME TAB */}
//         {activeTab === "home" && (
//           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: 32,
//               }}
//             >
//               <div>
//                 <h1 style={{ fontSize: 32, margin: 0, fontWeight: 800, color: "#0f172a" }}>
//                   Welcome back, {user?.name || "Student"}!
//                 </h1>
//                 <p style={{ color: "#64748b", marginTop: 4, fontSize: 16 }}>
//                   Create professional resumes in minutes
//                 </p>
//               </div>

//               <button
//                 onClick={openTemplatesModal}
//                 style={{
//                   backgroundColor: "#1e40af",
//                   color: "white",
//                   border: "none",
//                   padding: "12px 24px",
//                   borderRadius: 8,
//                   fontWeight: 600,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 10,
//                   cursor: "pointer",
//                   fontSize: 14,
//                 }}
//               >
//                 <Plus size={18} strokeWidth={3} /> Create New Resume
//               </button>
//             </div>

//             <div style={statsGrid}>
//               <div style={cardBase}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
//                   <FileText size={16} /> Total Resumes
//                 </div>
//                 <div style={{ fontSize: 36, fontWeight: "bold", color: "#1e293b" }}>{stats.totalResumes}</div>
//               </div>

//               <div style={cardBase}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
//                   <CheckCircle size={16} color="#22c55e" /> Completed
//                 </div>
//                 <div style={{ fontSize: 36, fontWeight: "bold", color: "#16a34a" }}>{stats.completed}</div>
//               </div>

//               <div style={cardBase}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
//                   <Clock size={16} color="#f59e0b" /> In Progress
//                 </div>
//                 <div style={{ fontSize: 36, fontWeight: "bold", color: "#d97706" }}>{stats.inProgress}</div>
//               </div>

//               <div style={cardBase}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
//                   <Download size={16} /> Downloads
//                 </div>
//                 <div style={{ fontSize: 36, fontWeight: "bold", color: "#1e293b" }}>{stats.downloads}</div>
//               </div>
//             </div>

//             <div style={upgradeBox}>
//               <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
//                 <div style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: 12, borderRadius: "50%", display: "flex" }}>
//                   <Crown color="white" size={24} />
//                 </div>
//                 <div>
//                   <h2 style={{ fontSize: 20, fontWeight: "bold", margin: "0 0 8px 0", color: "white" }}>
//                     Upgrade to Pro
//                   </h2>
//                   <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 12 }}>
//                     Unlock premium templates, AI features, and unlimited downloads
//                   </p>
//                 </div>
//               </div>

//               <div style={{ textAlign: "right" }}>
//                 <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>
//                   ₹999 <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.9)" }}>/year</span>
//                 </div>

//                 <button
//                   style={{
//                     backgroundColor: "white",
//                     color: "#1e40af",
//                     border: "none",
//                     padding: "10px 24px",
//                     borderRadius: 6,
//                     fontWeight: "bold",
//                     marginTop: 12,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                     marginLeft: "auto",
//                   }}
//                   onClick={() => openTemplatesModal()}
//                 >
//                   <PlusCircle size={16} /> Browse Plans
//                 </button>
//               </div>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
//               <div>
//                 <h3 style={{ margin: 0, fontWeight: "bold", fontSize: 18, color: "#0f172a" }}>
//                   Recent Resumes
//                 </h3>
//                 <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#94a3b8" }}>
//                   Your recently modified resumes
//                 </p>
//               </div>
//               {resumes.length > 0 && (
//                 <button
//                   onClick={() => setActiveTab("resumes")}
//                   style={{
//                     backgroundColor: "#fff",
//                     border: "1px solid #e2e8f0",
//                     borderRadius: 6,
//                     padding: "6px 12px",
//                     fontSize: 12,
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                     color: "#475569",
//                   }}
//                 >
//                   View All
//                 </button>
//               )}
//             </div>

//             {loadingResumes ? (
//               <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>
//                 <Loader2 size={24} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
//                 <div>Loading resumes...</div>
//               </div>
//             ) : resumes.length === 0 ? (
//               <div style={{ backgroundColor: "#fff", border: "2px dashed #e2e8f0", borderRadius: 12, padding: "60px 20px", textAlign: "center", marginTop: 20 }}>
//                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
//                 <h3 style={{ color: "#64748b", marginBottom: 8 }}>No Resumes Yet</h3>
//                 <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>
//                   Create your first resume to get started
//                 </p>
//                 <button
//                   onClick={openTemplatesModal}
//                   style={{
//                     backgroundColor: "#1e40af",
//                     color: "white",
//                     border: "none",
//                     padding: "10px 20px",
//                     borderRadius: 8,
//                     fontWeight: 600,
//                     cursor: "pointer",
//                   }}
//                 >
//                   Create First Resume
//                 </button>
//               </div>
//             ) : (
//               recentResumes.map((resume) => (
//                 <div
//                   key={resume.id}
//                   style={{ ...resumeItemStyle, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//                     <div style={{ backgroundColor: "#eff6ff", padding: 10, borderRadius: 10 }}>
//                       <FileText color="#2563eb" size={24} />
//                     </div>
//                     <div>
//                       <div style={{ fontWeight: "bold", color: "#1e293b", fontSize: 16 }}>
//                         {resume.title || "Untitled Resume"}
//                       </div>
//                       <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
//                         Template: {resume.template_name || "—"} • Modified {formatDate(resume.updated_at)}
//                       </div>
//                     </div>
//                   </div>

//                   <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
//                     {getStatusBadge(resume.status)}
//                     <div style={{ display: "flex", gap: 16, color: "#94a3b8" }}>
//                       <div style={{ cursor: "pointer" }} onClick={() => handleEditResume(resume.id)} title="Edit Resume">
//                         <Edit3 size={18} />
//                       </div>
//                       <div style={{ cursor: "pointer" }} onClick={() => handleDownloadResume(resume, "pdf")} title="Download PDF">
//                         <Download size={18} />
//                       </div>
//                       <div style={{ cursor: "pointer", color: "#ef4444" }} onClick={() => handleDeleteResume(resume.id)} title="Delete Resume">
//                         <Trash2 size={18} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {/* ✅ RESUMES TAB */}
//         {activeTab === "resumes" && (
//           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//               <div>
//                 <h1 style={{ fontSize: 28, margin: 0, fontWeight: 800, color: "#0f172a" }}>
//                   My Resumes
//                 </h1>
//                 <p style={{ color: "#64748b", marginTop: 4 }}>Manage all your created resumes</p>
//               </div>
//               <button
//                 onClick={openTemplatesModal}
//                 style={{
//                   backgroundColor: "#1e40af",
//                   color: "white",
//                   border: "none",
//                   padding: "10px 20px",
//                   borderRadius: 8,
//                   fontWeight: 600,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 10,
//                   cursor: "pointer",
//                 }}
//               >
//                 <Plus size={16} /> Create New
//               </button>
//             </div>

//             {loadingResumes ? (
//               <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>
//                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
//                 <div>Loading your resumes...</div>
//               </div>
//             ) : resumes.length === 0 ? (
//               <div style={{ backgroundColor: "#fff", border: "2px dashed #e2e8f0", borderRadius: 12, padding: "80px 20px", textAlign: "center", marginTop: 40 }}>
//                 <FileText size={64} color="#cbd5e1" style={{ marginBottom: 20 }} />
//                 <h2 style={{ color: "#64748b", marginBottom: 12 }}>No Resumes Created Yet</h2>
//                 <button
//                   onClick={openTemplatesModal}
//                   style={{
//                     backgroundColor: "#1e40af",
//                     color: "white",
//                     border: "none",
//                     padding: "12px 28px",
//                     borderRadius: 8,
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     fontSize: 16,
//                   }}
//                 >
//                   Browse Templates
//                 </button>
//               </div>
//             ) : (
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 20 }}>
//                 {resumes.map((resume) => (
//                   <div
//                     key={resume.id}
//                     style={{
//                       backgroundColor: "#fff",
//                       border: "1px solid #e2e8f0",
//                       borderRadius: 12,
//                       padding: 20,
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//                     }}
//                   >
//                     <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
//                       <div style={{ backgroundColor: "#eff6ff", padding: 8, borderRadius: 8 }}>
//                         <FileText color="#2563eb" size={20} />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <div style={{ fontWeight: "bold", color: "#1e293b", fontSize: 16 }}>
//                           {resume.title || "Untitled Resume"}
//                         </div>
//                         <div style={{ fontSize: 12, color: "#64748b" }}>
//                           Created: {formatDate(resume.created_at)}
//                         </div>
//                       </div>
//                       {getStatusBadge(resume.status)}
//                     </div>

//                     <div style={{ fontSize: 12, color: "#64748b" }}>
//                       Template: <b style={{ color: "#334155" }}>{resume.template_name || "—"}</b>
//                     </div>

//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
//                       <button
//                         onClick={() => handleEditResume(resume.id)}
//                         style={{
//                           backgroundColor: "#f8fafc",
//                           border: "1px solid #e2e8f0",
//                           padding: 10,
//                           borderRadius: 8,
//                           fontWeight: 600,
//                           cursor: "pointer",
//                           color: "#475569",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <Edit3 size={14} /> Edit
//                       </button>

//                       <button
//                         onClick={() => handleDownloadResume(resume, "pdf")}
//                         style={{
//                           backgroundColor: "#1e40af",
//                           color: "white",
//                           border: "none",
//                           padding: 10,
//                           borderRadius: 8,
//                           fontWeight: 600,
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <Download size={14} /> PDF
//                       </button>

//                       <button
//                         onClick={() => handleDownloadResume(resume, "word")}
//                         style={{
//                           backgroundColor: "#10b981",
//                           color: "white",
//                           border: "none",
//                           padding: 10,
//                           borderRadius: 8,
//                           fontWeight: 600,
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <FileText size={14} /> Word
//                       </button>

//                       <button
//                         onClick={() => handleDeleteResume(resume.id)}
//                         style={{
//                           backgroundColor: "#fee2e2",
//                           color: "#dc2626",
//                           border: "1px solid #fecaca",
//                           padding: 10,
//                           borderRadius: 8,
//                           fontWeight: 600,
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           gap: 6,
//                         }}
//                       >
//                         <Trash2 size={14} /> Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ✅ PROFILE TAB */}
//         {activeTab === "profile" && (
//           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
//             <h1 style={{ fontSize: 32, margin: "0 0 20px 0", fontWeight: 800, color: "#0f172a" }}>
//               My Profile Details
//             </h1>

//             <div style={profileDetailCard}>
//               <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
//                 <div
//                   style={{
//                     backgroundColor: "#1e40af",
//                     width: 60,
//                     height: 60,
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "white",
//                     fontSize: 24,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {user?.name?.charAt(0)?.toUpperCase() || "S"}
//                 </div>
//                 <div>
//                   <h2 style={{ margin: 0, color: "#1e293b" }}>{user?.name || "Student"}</h2>
//                   <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: 14 }}>
//                     Student Account
//                   </p>
//                 </div>
//               </div>

//               <div style={detailRow}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <User size={16} color="#64748b" />
//                   <span style={{ fontWeight: 900, color: "#64748b" }}>Full Name</span>
//                 </div>
//                 <span style={{ fontWeight: 800, color: "#111827" }}>{user?.name || "N/A"}</span>
//               </div>

//               <div style={detailRow}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <Phone size={16} color="#64748b" />
//                   <span style={{ fontWeight: 900, color: "#64748b" }}>Mobile Number</span>
//                 </div>
//                 <span style={{ fontWeight: 800, color: "#111827" }}>
//                   {user?.phone ? `+91 ${user.phone}` : "N/A"}
//                 </span>
//               </div>

//               <div style={detailRow}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <Mail size={16} color="#64748b" />
//                   <span style={{ fontWeight: 900, color: "#64748b" }}>Email Address</span>
//                 </div>
//                 <span style={{ fontWeight: 800, color: "#111827" }}>{user?.email || "N/A"}</span>
//               </div>

//               <div style={detailRow}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <MapPin size={16} color="#64748b" />
//                   <span style={{ fontWeight: 900, color: "#64748b" }}>Pincode</span>
//                 </div>
//                 <span style={{ fontWeight: 800, color: "#111827" }}>{user?.pincode || "N/A"}</span>
//               </div>

//               <div style={{ ...detailRow, borderBottom: "none" }}>
//                 <span style={{ fontWeight: 900, color: "#64748b" }}>User ID</span>
//                 <span style={{ fontWeight: 800, color: "#64748b", fontSize: 12 }}>
//                   {user?.id || "N/A"}
//                 </span>
//               </div>
//             </div>

//             <button
//               onClick={handleLogout}
//               style={{
//                 marginTop: 32,
//                 padding: "14px 24px",
//                 backgroundColor: "#fee2e2",
//                 color: "#dc2626",
//                 border: "1px solid #fecaca",
//                 borderRadius: 12,
//                 cursor: "pointer",
//                 fontWeight: 900,
//                 fontSize: 14,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//               }}
//             >
//               <LogOut size={16} /> Logout from Dashboard
//             </button>
//           </div>
//         )}
//       </main>

//       {/* Templates Modal */}
//       {showTemplatesModal && (
//         <div
//           onClick={() => setShowTemplatesModal(false)}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//             padding: 20,
//           }}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               backgroundColor: "white",
//               borderRadius: 16,
//               width: "100%",
//               maxWidth: 1200,
//               maxHeight: "90vh",
//               overflow: "auto",
//               padding: 24,
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: 24,
//               }}
//             >
//               <div>
//                 <h2 style={{ fontSize: 24, margin: 0, fontWeight: "bold", color: "#1e293b" }}>
//                   Choose a Template
//                 </h2>
//                 <p style={{ margin: "4px 0 0 0", color: "#64748b" }}>
//                   Select a template to start creating your resume
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowTemplatesModal(false)}
//                 style={{
//                   backgroundColor: "#f1f5f9",
//                   border: "1px solid #e2e8f0",
//                   borderRadius: 8,
//                   padding: "8px 16px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   color: "#475569",
//                 }}
//               >
//                 Close
//               </button>
//             </div>

//             {loadingTemplates ? (
//               <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>
//                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
//                 <div>Loading templates...</div>
//               </div>
//             ) : templates.length === 0 ? (
//               <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
//                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
//                 <p>No templates available at the moment. Please check back later.</p>
//               </div>
//             ) : (
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//                   gap: 24,
//                 }}
//               >
//                 {templates.map((template) => {
//                   const locked = isTemplateLocked(template);
//                   const p = template.pricing;

//                   const buttonText = locked
//                     ? p?.billing_type === "subscription"
//                       ? "Subscription Required"
//                       : `Buy & Unlock ${currencySymbol(p?.currency)}${Number(p?.final_price || 0)}`
//                     : "Use This";

//                   const btnBusy =
//                     creatingResume === template.id || payingTemplateId === template.id;

//                   return (
//                     <div key={template.id} style={{ ...templateCard, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
//                       {templateThumb(template)}

//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
//                         <div>
//                           <h3 style={{ margin: 0, fontSize: 16, fontWeight: "bold", color: "#1e293b" }}>
//                             {template.name}
//                           </h3>
//                           <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#64748b" }}>
//                             {template.category || "General"}
//                           </p>

//                           {p?.status === "active" ? (
//                             <p style={{ margin: "6px 0 0 0", fontSize: 12, fontWeight: 800, color: locked ? "#991b1b" : "#166534" }}>
//                               {p.billing_type === "free"
//                                 ? "Free"
//                                 : p.billing_type === "subscription"
//                                 ? "Subscription"
//                                 : `Price: ${currencySymbol(p.currency)}${Number(p.final_price || 0)}`}{" "}
//                               • {locked ? "Locked" : "Unlocked"}
//                             </p>
//                           ) : null}
//                         </div>

//                         <span
//                           style={{
//                             backgroundColor: template.status === "active" ? "#dcfce7" : "#f3f4f6",
//                             color: template.status === "active" ? "#166534" : "#374151",
//                             fontSize: 10,
//                             fontWeight: "bold",
//                             padding: "4px 8px",
//                             borderRadius: 12,
//                           }}
//                         >
//                           {template.status === "active" ? "Active" : "Draft"}
//                         </span>
//                       </div>

//                       <div style={{ display: "flex", gap: 10 }}>
//                         <button
//                           onClick={() => openTemplatePreview(template)}
//                           style={{
//                             flex: 1,
//                             backgroundColor: "#f8fafc",
//                             border: "1px solid #e2e8f0",
//                             padding: 10,
//                             borderRadius: 8,
//                             fontWeight: 600,
//                             cursor: "pointer",
//                             fontSize: 13,
//                             color: "#475569",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             gap: 6,
//                           }}
//                         >
//                           <Eye size={14} /> Preview
//                         </button>

//                         <button
//                           onClick={() => handleUseTemplate(template)}
//                           disabled={btnBusy || (locked && p?.billing_type === "subscription")}
//                           style={{
//                             flex: 1,
//                             backgroundColor: btnBusy ? "#93c5fd" : locked ? "#ea580c" : "#1e40af",
//                             color: "white",
//                             border: "none",
//                             padding: 10,
//                             borderRadius: 8,
//                             fontWeight: 700,
//                             cursor: "pointer",
//                             fontSize: 13,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             gap: 6,
//                           }}
//                         >
//                           {btnBusy ? (
//                             <>
//                               <Loader2 size={14} className="animate-spin" /> Processing...
//                             </>
//                           ) : (
//                             <>
//                               <Plus size={14} /> {buttonText}
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ✅ Preview Modal (NO SCROLL, SAME PAGE, AUTO-FIT) */}
//       {previewOpen && (
//         <div
//           onClick={() => setPreviewOpen(false)}
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.55)",
//             zIndex: 2000,
//             display: "grid",
//             placeItems: "center",
//             padding: 16,
//           }}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               width: "min(1100px, 96vw)",
//               height: "min(820px, 92vh)",
//               background: "white",
//               borderRadius: 16,
//               border: "1px solid #e5e7eb",
//               display: "flex",
//               flexDirection: "column",
//               overflow: "hidden", // ✅ no scrollbars
//               boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
//             }}
//           >
//             <div
//               style={{
//                 padding: "12px 16px",
//                 borderBottom: "1px solid #e5e7eb",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 10,
//                 background: "#fff",
//               }}
//             >
//               <div style={{ fontWeight: 900, fontSize: 16 }}>{previewTitle}</div>
//               <button
//                 onClick={() => setPreviewOpen(false)}
//                 style={{
//                   border: "1px solid #e5e7eb",
//                   background: "white",
//                   borderRadius: 10,
//                   padding: "8px 12px",
//                   fontWeight: 900,
//                   cursor: "pointer",
//                 }}
//               >
//                 Close
//               </button>
//             </div>

//             <div
//               ref={previewViewportRef}
//               style={{
//                 flex: 1,
//                 background: "#f3f4f6",
//                 display: "grid",
//                 placeItems: "center",
//                 overflow: "hidden", // ✅ no scroll
//                 padding: 10,
//               }}
//             >
//               {previewLoading ? (
//                 <div style={{ padding: 30, textAlign: "center", color: "#64748b" }}>
//                   <Loader2 size={28} className="animate-spin" style={{ margin: "0 auto 10px" }} />
//                   <div>Loading preview...</div>
//                 </div>
//               ) : (
//                 <div
//                   ref={previewPageRef}
//                   style={{
//                     display: "inline-block",
//                     transform: `scale(${previewScale})`,
//                     transformOrigin: "top center",
//                   }}
//                 >
//                   <ResumePreview schema={previewSchema || {}} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeIn { 
//           from { opacity: 0; transform: translateY(10px); } 
//           to { opacity: 1; transform: translateY(0); } 
//         }
//         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         .animate-spin { animation: spin 1s linear infinite; }
//         button:disabled { opacity: 0.6; cursor: not-allowed; }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { saveAs } from "file-saver";
import ResumePreview from "./dashboard/ResumePreview";
import {
  PlusCircle,
  FileText,
  CheckCircle,
  Clock,
  Download,
  Crown,
  Edit3,
  LogOut,
  Plus,
  Eye,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Loader2,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";

function authHeaders() {
  const token = localStorage.getItem("access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

type PricingStatus = "active" | "inactive";
type BillingType = "free" | "one_time" | "subscription";

interface UserType {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  pincode?: string;
}

interface Stats {
  totalResumes: number;
  completed: number;
  inProgress: number;
  downloads: number;
}

interface Resume {
  id: number;
  title: string;
  status: "draft" | "in_progress" | "completed" | "published" | string;
  template_name?: string;
  updated_at: string;
  created_at: string;
  download_count?: number;
}

interface Template {
  id: number;
  name: string;
  category?: string;
  status: string;
  layout?: string;
  downloads?: number;
  preview_image?: string;
  color?: string;
  schema?: any;

  pricing?: {
    billing_type: BillingType;
    currency: "INR" | "USD";
    price: number;
    discount_percent: number;
    final_price: number;
    status: PricingStatus;
  };
  has_access?: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"home" | "resumes" | "profile">(
    "home"
  );

  const [loading, setLoading] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loadingResumes, setLoadingResumes] = useState(false);

  const [stats, setStats] = useState<Stats>({
    totalResumes: 0,
    completed: 0,
    inProgress: 0,
    downloads: 0,
  });

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [user, setUser] = useState<UserType | null>(null);

  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [creatingResume, setCreatingResume] = useState<number | null>(null);

  // ✅ payment state
  const [payingTemplateId, setPayingTemplateId] = useState<number | null>(null);

  // ✅ preview modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSchema, setPreviewSchema] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("Template Preview");

  // ✅ Fit-to-viewport scaling (NO SCROLL)
  const previewViewportRef = useRef<HTMLDivElement | null>(null);
  const previewPageRef = useRef<HTMLDivElement | null>(null);
  const [previewScale, setPreviewScale] = useState(1);

  // ✅ Mobile menu state (tabs menu on mobile)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currencySymbol = (c?: "INR" | "USD") => (c === "USD" ? "$" : "₹");

  const normalizeMediaUrl = (src?: string) => {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    const base = String((axios as any).defaults?.baseURL || "").replace(
      /\/api\/?$/,
      ""
    );
    return `${base}${src.startsWith("/") ? src : `/${src}`}`;
  };

  const requireStudentSession = () => {
    const token = localStorage.getItem("access");
    const userData = localStorage.getItem("user");
    if (!token || !userData) {
      alert("Your session has expired. Please login again.");
      navigate("/login");
      return false;
    }
    return true;
  };

  // ✅ template lock logic
  const isTemplateLocked = (t: Template) => {
    const p = t.pricing;
    if (!p) return false; // no pricing => treat as free
    if (p.status !== "active") return true;
    if (p.billing_type === "free") return false;
    return !t.has_access;
  };

  // ✅ Razorpay loader
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

  // ✅ Start payment & unlock
  const handleBuyTemplate = async (t: Template) => {
    if (!requireStudentSession()) return;

    setPayingTemplateId(t.id);
    try {
      const ok = await loadRazorpay();
      if (!ok) {
        alert("Payment SDK failed to load.");
        return;
      }

      // 1) Create order from backend
      let orderRes: any;
      try {
        orderRes = await axios.post(
          "/auth/student/payments/template/order/",
          { template_id: t.id },
          { headers: authHeaders() }
        );
      } catch (e: any) {
        if (e?.response?.status === 402) {
          alert("Subscription required for this template.");
          return;
        }
        alert(e?.response?.data?.detail || "Failed to create order.");
        return;
      }

      // already has access
      if (orderRes?.data?.has_access) {
        await fetchTemplates();
        setShowTemplatesModal(false);
        navigate(`/resume/create/${t.id}`);
        return;
      }

      const { key, order_id, amount, currency } = orderRes.data || {};
      if (!key || !order_id) {
        alert("Invalid order response from backend.");
        return;
      }

      // 2) Open checkout
      const rz = new (window as any).Razorpay({
        key,
        order_id,
        amount,
        currency,
        name: "Resume Templates",
        description: `Unlock template: ${t.name}`,
        handler: async (resp: any) => {
          try {
            // 3) Verify payment
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
            await fetchTemplates();
            setShowTemplatesModal(false);
            navigate(`/resume/create/${t.id}`);
          } catch (e: any) {
            alert(e?.response?.data?.detail || "Payment verify failed.");
          }
        },
      });

      rz.open();
    } finally {
      setPayingTemplateId(null);
    }
  };

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      const res = await axios.get("/auth/student/resumes/", {
        headers: authHeaders(),
      });
      const data: any = res.data;
      const list = Array.isArray(data) ? data : data?.results || [];
      setResumes(list);
    } catch (err) {
      console.error("Error fetching resumes:", err);
      setError("Failed to load resumes.");
    } finally {
      setLoadingResumes(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const res = await axios.get("/auth/student/templates/", {
        headers: authHeaders(),
      });
      const data: any = res.data;
      const list = Array.isArray(data) ? data : data?.results || [];
      setTemplates(list);
    } catch (err) {
      console.error("Error fetching templates:", err);
      setError("Failed to load templates.");
    } finally {
      setLoadingTemplates(false);
    }
  };

  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);
        setError(null);

        const storedUser = JSON.parse(
          localStorage.getItem("user") || "null"
        ) as UserType;

        if (!storedUser) {
          navigate("/login", { replace: true });
          return;
        }

        setUser(storedUser);

        const statsRes = await axios.get("/auth/student/dashboard/stats/", {
          headers: authHeaders(),
        });

        setStats(statsRes.data as Stats);

        await fetchResumes();
      } catch (err) {
        console.error("Error booting dashboard:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    boot();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleEditResume = (resumeId: number) => {
    navigate(`/resume/edit/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId: number) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete(`/auth/student/resumes/${resumeId}/`, {
        headers: authHeaders(),
      });

      const updated = resumes.filter((r) => r.id !== resumeId);
      setResumes(updated);

      setStats((prev) => ({
        ...prev,
        totalResumes: Math.max(0, prev.totalResumes - 1),
        completed: updated.filter((r) => r.status === "completed").length,
        inProgress: updated.filter(
          (r) => r.status === "draft" || r.status === "in_progress"
        ).length,
      }));
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume");
    }
  };

  const handleDownloadResume = async (
    resume: Resume,
    format: "pdf" | "word" = "pdf"
  ) => {
    try {
      // 1) track download
      await axios.post(
        `/auth/student/resumes/${resume.id}/download/`,
        {},
        { headers: authHeaders() }
      );

      setResumes((prev) =>
        prev.map((r) =>
          r.id === resume.id
            ? { ...r, download_count: (r.download_count || 0) + 1 }
            : r
        )
      );

      setStats((prev) => ({ ...prev, downloads: prev.downloads + 1 }));

      // 2) download file
      const url =
        format === "pdf"
          ? `/auth/resumes/${resume.id}/export/pdf/`
          : `/auth/resumes/${resume.id}/export/docx/`;

      const fileRes = await axios.get(url, {
        headers: authHeaders(),
        responseType: "blob",
      });

      const safeTitle =
        (resume.title || "resume")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "resume";

      const ext = format === "pdf" ? "pdf" : "docx";
      saveAs(fileRes.data, `${safeTitle}-${resume.id}.${ext}`);
    } catch (err: any) {
      console.error("Download error:", err);
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to download resume";
      alert(msg);
    }
  };

  const handleUseTemplate = async (template: Template) => {
    if (!requireStudentSession()) return;

    if (isTemplateLocked(template)) {
      const p = template.pricing;
      if (p?.billing_type === "subscription") {
        alert("Subscription required for this template.");
        return;
      }
      await handleBuyTemplate(template);
      return;
    }

    try {
      setCreatingResume(template.id);
      setShowTemplatesModal(false);
      navigate(`/resume/create/${template.id}`);
    } finally {
      setCreatingResume(null);
    }
  };

  const openTemplatePreview = async (template: Template) => {
    if (!requireStudentSession()) return;

    setPreviewTitle(
      template?.name ? `Preview: ${template.name}` : "Template Preview"
    );
    setPreviewOpen(true);

    if (template?.schema) {
      setPreviewSchema(template.schema);
      return;
    }

    try {
      setPreviewLoading(true);
      const detail = await axios.get(`/auth/student/templates/${template.id}/`, {
        headers: authHeaders(),
      });
      setPreviewSchema(detail.data?.schema || {});
    } catch (err) {
      console.error("Preview schema load failed:", err);
      setPreviewSchema({});
      setError("Preview schema not available for this template.");
    } finally {
      setPreviewLoading(false);
    }
  };

  const openTemplatesModal = () => {
    if (!requireStudentSession()) return;
    setShowTemplatesModal(true);
    fetchTemplates();
  };

  // ✅ close mobile menu when tab changes
  const goTab = (t: "home" | "resumes" | "profile") => {
    setActiveTab(t);
    setMobileMenuOpen(false);
    // small UX: scroll to top on mobile when switching tabs
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; color: string; text: string }> =
      {
        draft: { bg: "#f1f5f9", color: "#64748b", text: "Draft" },
        in_progress: { bg: "#fef3c7", color: "#92400e", text: "In Progress" },
        completed: { bg: "#dcfce7", color: "#166534", text: "Completed" },
        published: { bg: "#dbeafe", color: "#1e40af", text: "Published" },
      };

    const s = statusMap[status] || {
      bg: "#f3f4f6",
      color: "#374151",
      text: status,
    };

    return (
      <span
        style={{
          backgroundColor: s.bg,
          color: s.color,
          padding: "4px 12px",
          borderRadius: "999px",
          fontSize: 10,
          fontWeight: "bold",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {s.text}
      </span>
    );
  };

  const templateThumb = (t: Template) => {
    if (t.preview_image) {
      return (
        <img
          src={normalizeMediaUrl(t.preview_image)}
          alt={t.name}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderRadius: 8,
            marginBottom: 16,
            border: "1px solid #e2e8f0",
          }}
        />
      );
    }

    if (t.schema) {
      return (
        <div
          style={{
            width: "100%",
            height: 180,
            borderRadius: 8,
            marginBottom: 16,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            background: "#fff",
            position: "relative",
          }}
        >
          <div style={{ transform: "scale(0.35)", transformOrigin: "top left" }}>
            <ResumePreview schema={t.schema} />
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          width: "100%",
          height: 180,
          borderRadius: 8,
          marginBottom: 16,
          backgroundColor: t.color || "#3b82f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
          padding: 10,
        }}
      >
        {t.name}
      </div>
    );
  };

  const recentResumes = useMemo(() => {
    return [...resumes]
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 5);
  }, [resumes]);

  const recalcPreviewScale = () => {
    const viewport = previewViewportRef.current;
    const page = previewPageRef.current;
    if (!viewport || !page) return;

    setPreviewScale(1);
    page.style.transform = "scale(1)";
    page.style.transformOrigin = "top center";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        if (!vw || !vh) return;

        const pw = page.scrollWidth || page.offsetWidth;
        const ph = page.scrollHeight || page.offsetHeight;
        if (!pw || !ph) return;

        const padding = 24;
        const scale = Math.min((vw - padding) / pw, (vh - padding) / ph);
        const clamped = Math.max(0.2, Math.min(1, scale));
        setPreviewScale(clamped);
      });
    });
  };

  useEffect(() => {
    if (!previewOpen) return;

    recalcPreviewScale();

    const viewport = previewViewportRef.current;
    let ro: ResizeObserver | null = null;
    if (viewport) {
      ro = new ResizeObserver(() => recalcPreviewScale());
      ro.observe(viewport);
    }

    window.addEventListener("resize", recalcPreviewScale);
    return () => {
      window.removeEventListener("resize", recalcPreviewScale);
      if (ro) ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewOpen, previewSchema]);

  useEffect(() => {
    if (!previewOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [previewOpen]);

  useEffect(() => {
    if (!previewOpen) return;

    const prevent = (e: any) => {
      e.preventDefault();
    };

    const opts: AddEventListenerOptions = { passive: false };
    window.addEventListener("wheel", prevent, opts);
    window.addEventListener("touchmove", prevent, opts);

    return () => {
      window.removeEventListener("wheel", prevent as any, opts);
      window.removeEventListener("touchmove", prevent as any, opts);
    };
  }, [previewOpen]);

  // ✅ close mobile menu when screen becomes desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ close mobile menu when clicking outside (mobile)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = () => setMobileMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [mobileMenuOpen]);

  if (loading) {
    return (
      <div className="dash__loading">
        <div style={{ textAlign: "center" }}>
          <Loader2
            size={32}
            color="#3b82f6"
            className="animate-spin"
            style={{ margin: "0 auto 16px" }}
          />
          <div style={{ fontSize: 16, color: "#64748b" }}>
            Loading Dashboard...
          </div>
        </div>

        <style>{`
          .dash__loading{
            display:flex;justify-content:center;align-items:center;
            min-height:100dvh;background:#f8fafc;padding:16px;
          }
          .animate-spin { animation: dashSpin 1s linear infinite; }
          @keyframes dashSpin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        `}</style>
      </div>
    );
  }

  const pageContainer: React.CSSProperties = {
    backgroundColor: "#f8fafc",
    minHeight: "100dvh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: 0,
    overflowX: "hidden",
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #e2e8f0",
    padding: "var(--dash-header-pad-y) var(--dash-pad)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    gap: 12,
    flexWrap: "wrap",
  };
const mainContent: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  margin: "0",
  padding: "var(--dash-pad)",
  flex: 1,
};


  // ✅ Web fix: force 4 cards on desktop, then auto-fit below
  const statsGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 20,
    marginBottom: 32,
  };

  const cardBase: React.CSSProperties = {
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
    transition: "transform 0.2s, box-shadow 0.2s",
    minWidth: 0,
  };

  const upgradeBox: React.CSSProperties = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: 16,
    padding: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    color: "white",
    gap: 16,
    flexWrap: "wrap",
  };

  const resumeItemStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    transition: "all 0.2s",
    gap: 14,
    flexWrap: "wrap",
  };

  const profileDetailCard: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "clamp(16px, 3vw, 30px)",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  };

  const detailRow: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: "1px solid #f1f5f9",
    gap: 16,
    flexWrap: "wrap",
  };

  const templateCard: React.CSSProperties = {
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 20,
    transition: "all 0.3s ease",
    cursor: "pointer",
    minWidth: 0,
  };

  return (
    <div style={pageContainer}>
      <header style={headerStyle} className="dash__header">
        <div className="dash__brand">
          <div
            style={{
              backgroundColor: "#1e40af",
              padding: 8,
              borderRadius: 8,
              display: "flex",
              flexShrink: 0,
            }}
          >
            <FileText color="white" size={20} />
          </div>
          <div style={{ lineHeight: 1.2, minWidth: 0 }}>
            <div className="dash__title">Resume Builder Pro</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Student Dashboard
            </div>
          </div>
        </div>

        <div className="dash__headerRight">
          <div className="dash__userchip">
            <User size={16} color="#64748b" />
            <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>
              {user?.name || "Student"}
            </span>
          </div>
          <span className="dash__planTag">FREE Plan</span>
          <button
            type="button"
            className="dash__iconBtn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={20} color="#94a3b8" />
          </button>
        </div>
      </header>

      <main style={mainContent}>
        {error && (
          <div className="dash__error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* ✅ Tabs (Desktop row + Mobile menu) */}
        <div className="dash__tabsWrap">
          {/* Desktop Tabs */}
          <div className="dash__tabs">
            <button
              onClick={() => goTab("home")}
              className={`dash__tabBtn ${activeTab === "home" ? "isActive" : ""}`}
            >
              Overview
            </button>

            <button
              onClick={() => goTab("resumes")}
              className={`dash__tabBtn ${
                activeTab === "resumes" ? "isActive" : ""
              }`}
            >
              My Resumes
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/ai-resume");
              }}
              className="dash__tabBtn dash__tabBtn--ghost"
            >
              AI Resume Generator
            </button>

            <button
              onClick={() => goTab("profile")}
              className={`dash__tabBtn ${
                activeTab === "profile" ? "isActive" : ""
              }`}
            >
              Profile
            </button>

            <button onClick={openTemplatesModal} className="dash__browseBtn">
              <Plus size={16} /> Browse Templates
            </button>
          </div>

          {/* Mobile Top Bar */}
          <div
            className="dash__mobileBar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="dash__mobileMenuBtn"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen((v) => !v);
              }}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="dash__mobileBarTitle">
              {activeTab === "home"
                ? "Overview"
                : activeTab === "resumes"
                ? "My Resumes"
                : "Profile"}
            </div>

            <button
              type="button"
              className="dash__mobileBrowse"
              onClick={(e) => {
                e.stopPropagation();
                openTemplatesModal();
              }}
            >
              <Plus size={16} /> Templates
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div
              className="dash__mobileMenu"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={`dash__mobileItem ${
                  activeTab === "home" ? "isActive" : ""
                }`}
                onClick={() => goTab("home")}
              >
                Overview
              </button>
              <button
                className={`dash__mobileItem ${
                  activeTab === "resumes" ? "isActive" : ""
                }`}
                onClick={() => goTab("resumes")}
              >
                My Resumes
              </button>
              <button
                className="dash__mobileItem"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/ai-resume");
                }}
              >
                AI Resume Generator
              </button>
              <button
                className={`dash__mobileItem ${
                  activeTab === "profile" ? "isActive" : ""
                }`}
                onClick={() => goTab("profile")}
              >
                Profile
              </button>

              <div className="dash__mobileDivider" />

              <button
                className="dash__mobilePrimary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTemplatesModal();
                }}
              >
                <Plus size={16} /> Browse Templates
              </button>
            </div>
          )}
        </div>

        {/* ✅ HOME TAB */}
        {activeTab === "home" && (
          <div style={{ animation: "fadeIn 0.4s ease-in" }}>
            <div className="dash__homeTop">
              <div style={{ minWidth: 0 }}>
                <h1 className="dash__h1">
                  Welcome back, {user?.name || "Student"}!
                </h1>
                <p className="dash__sub">
                  Create professional resumes in minutes
                </p>
              </div>

              <button onClick={openTemplatesModal} className="dash__primaryBtn">
                <Plus size={18} strokeWidth={3} /> Create New Resume
              </button>
            </div>

            <div style={statsGrid} className="dash__statsGrid">
              <div style={cardBase}>
                <div className="dash__statLabel">
                  <FileText size={16} /> Total Resumes
                </div>
                <div className="dash__statValue">{stats.totalResumes}</div>
              </div>

              <div style={cardBase}>
                <div className="dash__statLabel">
                  <CheckCircle size={16} color="#22c55e" /> Completed
                </div>
                <div className="dash__statValue" style={{ color: "#16a34a" }}>
                  {stats.completed}
                </div>
              </div>

              <div style={cardBase}>
                <div className="dash__statLabel">
                  <Clock size={16} color="#f59e0b" /> In Progress
                </div>
                <div className="dash__statValue" style={{ color: "#d97706" }}>
                  {stats.inProgress}
                </div>
              </div>

              <div style={cardBase}>
                <div className="dash__statLabel">
                  <Download size={16} /> Downloads
                </div>
                <div className="dash__statValue">{stats.downloads}</div>
              </div>
            </div>

            <div style={upgradeBox} className="dash__upgrade">
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    padding: 12,
                    borderRadius: "50%",
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  <Crown color="white" size={24} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h2 className="dash__h2">Upgrade to Pro</h2>
                  <p className="dash__upgradeText">
                    Unlock premium templates, AI features, and unlimited
                    downloads
                  </p>
                </div>
              </div>

              <div className="dash__upgradeRight">
                <div className="dash__price">
                  ₹999 <span className="dash__priceSub">/year</span>
                </div>

                <button className="dash__whiteBtn" onClick={openTemplatesModal}>
                  <PlusCircle size={16} /> Browse Plans
                </button>
              </div>
            </div>

            <div className="dash__sectionHead">
              <div>
                <h3 className="dash__h3">Recent Resumes</h3>
                <p className="dash__tiny">Your recently modified resumes</p>
              </div>
              {resumes.length > 0 && (
                <button
                  onClick={() => goTab("resumes")}
                  className="dash__outlineBtn"
                >
                  View All
                </button>
              )}
            </div>

            {loadingResumes ? (
              <div className="dash__centerNote">
                <Loader2
                  size={24}
                  color="#3b82f6"
                  className="animate-spin"
                  style={{ margin: "0 auto 16px" }}
                />
                <div>Loading resumes...</div>
              </div>
            ) : resumes.length === 0 ? (
              <div className="dash__empty">
                <FileText
                  size={48}
                  color="#cbd5e1"
                  style={{ marginBottom: 16 }}
                />
                <h3 style={{ color: "#64748b", marginBottom: 8 }}>
                  No Resumes Yet
                </h3>
                <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>
                  Create your first resume to get started
                </p>
                <button onClick={openTemplatesModal} className="dash__primaryBtn">
                  Create First Resume
                </button>
              </div>
            ) : (
              recentResumes.map((resume) => (
                <div
                  key={resume.id}
                  style={{
                    ...resumeItemStyle,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  }}
                  className="dash__resumeRow"
                >
                  <div className="dash__resumeLeft">
                    <div
                      style={{
                        backgroundColor: "#eff6ff",
                        padding: 10,
                        borderRadius: 10,
                        flexShrink: 0,
                        display: "flex",
                      }}
                    >
                      <FileText color="#2563eb" size={24} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="dash__resumeTitle">
                        {resume.title || "Untitled Resume"}
                      </div>
                      <div className="dash__resumeMeta">
                        Template: {resume.template_name || "—"} • Modified{" "}
                        {formatDate(resume.updated_at)}
                      </div>
                    </div>
                  </div>

                  <div className="dash__resumeRight">
                    {getStatusBadge(resume.status)}
                    <div className="dash__actions">
                      <button
                        type="button"
                        className="dash__iconBtn"
                        onClick={() => handleEditResume(resume.id)}
                        title="Edit Resume"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        type="button"
                        className="dash__iconBtn"
                        onClick={() => handleDownloadResume(resume, "pdf")}
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        type="button"
                        className="dash__iconBtn dash__dangerIcon"
                        onClick={() => handleDeleteResume(resume.id)}
                        title="Delete Resume"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ✅ RESUMES TAB */}
        {activeTab === "resumes" && (
          <div style={{ animation: "fadeIn 0.4s ease-in" }}>
            <div className="dash__resumesTop">
              <div style={{ minWidth: 0 }}>
                <h1 className="dash__h1" style={{ fontSize: 28 }}>
                  My Resumes
                </h1>
                <p className="dash__sub">Manage all your created resumes</p>
              </div>
              <button onClick={openTemplatesModal} className="dash__primaryBtn">
                <Plus size={16} /> Create New
              </button>
            </div>

            {loadingResumes ? (
              <div className="dash__centerNote" style={{ padding: 60 }}>
                <Loader2 size={32} color="#3b82f6" className="animate-spin" />
                <div>Loading your resumes...</div>
              </div>
            ) : resumes.length === 0 ? (
              <div className="dash__empty" style={{ marginTop: 20 }}>
                <FileText
                  size={64}
                  color="#cbd5e1"
                  style={{ marginBottom: 20 }}
                />
                <h2 style={{ color: "#64748b", marginBottom: 12 }}>
                  No Resumes Created Yet
                </h2>
                <button onClick={openTemplatesModal} className="dash__primaryBtn">
                  Browse Templates
                </button>
              </div>
            ) : (
              <div className="dash__resumeGrid">
                {resumes.map((resume) => (
                  <div key={resume.id} className="dash__resumeCard">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 16,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#eff6ff",
                          padding: 8,
                          borderRadius: 8,
                          display: "flex",
                          flexShrink: 0,
                        }}
                      >
                        <FileText color="#2563eb" size={20} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="dash__resumeTitle">
                          {resume.title || "Untitled Resume"}
                        </div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>
                          Created: {formatDate(resume.created_at)}
                        </div>
                      </div>
                      {getStatusBadge(resume.status)}
                    </div>

                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      Template:{" "}
                      <b style={{ color: "#334155" }}>
                        {resume.template_name || "—"}
                      </b>
                    </div>

                    <div className="dash__btnGrid">
                      <button
                        onClick={() => handleEditResume(resume.id)}
                        className="dash__btn dash__btn--light"
                      >
                        <Edit3 size={14} /> Edit
                      </button>

                      <button
                        onClick={() => handleDownloadResume(resume, "pdf")}
                        className="dash__btn dash__btn--primary"
                      >
                        <Download size={14} /> PDF
                      </button>

                      <button
                        onClick={() => handleDownloadResume(resume, "word")}
                        className="dash__btn dash__btn--success"
                      >
                        <FileText size={14} /> Word
                      </button>

                      <button
                        onClick={() => handleDeleteResume(resume.id)}
                        className="dash__btn dash__btn--danger"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ✅ PROFILE TAB */}
        {activeTab === "profile" && (
          <div style={{ animation: "fadeIn 0.4s ease-in" }}>
            <h1 className="dash__h1">My Profile Details</h1>

            <div style={profileDetailCard}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#1e40af",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 24,
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h2 style={{ margin: 0, color: "#1e293b" }}>
                    {user?.name || "Student"}
                  </h2>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      color: "#64748b",
                      fontSize: 14,
                    }}
                  >
                    Student Account
                  </p>
                </div>
              </div>

              <div style={detailRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <User size={16} color="#64748b" />
                  <span style={{ fontWeight: 900, color: "#64748b" }}>
                    Full Name
                  </span>
                </div>
                <span style={{ fontWeight: 800, color: "#111827" }}>
                  {user?.name || "N/A"}
                </span>
              </div>

              <div style={detailRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Phone size={16} color="#64748b" />
                  <span style={{ fontWeight: 900, color: "#64748b" }}>
                    Mobile Number
                  </span>
                </div>
                <span style={{ fontWeight: 800, color: "#111827" }}>
                  {user?.phone ? `+91 ${user.phone}` : "N/A"}
                </span>
              </div>

              <div style={detailRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Mail size={16} color="#64748b" />
                  <span style={{ fontWeight: 900, color: "#64748b" }}>
                    Email Address
                  </span>
                </div>
                <span
                  style={{
                    fontWeight: 800,
                    color: "#111827",
                    wordBreak: "break-word",
                  }}
                >
                  {user?.email || "N/A"}
                </span>
              </div>

              <div style={detailRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MapPin size={16} color="#64748b" />
                  <span style={{ fontWeight: 900, color: "#64748b" }}>
                    Pincode
                  </span>
                </div>
                <span style={{ fontWeight: 800, color: "#111827" }}>
                  {user?.pincode || "N/A"}
                </span>
              </div>

              <div style={{ ...detailRow, borderBottom: "none" }}>
                <span style={{ fontWeight: 900, color: "#64748b" }}>User ID</span>
                <span
                  style={{ fontWeight: 800, color: "#64748b", fontSize: 12 }}
                >
                  {user?.id || "N/A"}
                </span>
              </div>
            </div>

            <button onClick={handleLogout} className="dash__logoutBtn">
              <LogOut size={16} /> Logout from Dashboard
            </button>
          </div>
        )}
      </main>

      {/* Templates Modal */}
      {showTemplatesModal && (
        <div
          onClick={() => setShowTemplatesModal(false)}
          className="dash__modalOverlay"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="dash__modal"
            role="dialog"
            aria-modal="true"
          >
            <div className="dash__modalHead">
              <div style={{ minWidth: 0 }}>
                <h2 className="dash__modalTitle">Choose a Template</h2>
                <p className="dash__modalSub">
                  Select a template to start creating your resume
                </p>
              </div>
              <button
                onClick={() => setShowTemplatesModal(false)}
                className="dash__outlineBtn"
              >
                Close
              </button>
            </div>

            {loadingTemplates ? (
              <div className="dash__centerNote" style={{ padding: 60 }}>
                <Loader2
                  size={32}
                  color="#3b82f6"
                  className="animate-spin"
                  style={{ margin: "0 auto 16px" }}
                />
                <div>Loading templates...</div>
              </div>
            ) : templates.length === 0 ? (
              <div className="dash__centerNote" style={{ padding: "60px 20px" }}>
                <FileText
                  size={48}
                  color="#cbd5e1"
                  style={{ marginBottom: 16 }}
                />
                <p>No templates available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="dash__templateGrid">
                {templates.map((template) => {
                  const locked = isTemplateLocked(template);
                  const p = template.pricing;

                  const buttonText = locked
                    ? p?.billing_type === "subscription"
                      ? "Subscription Required"
                      : `Buy & Unlock ${currencySymbol(p?.currency)}${Number(
                          p?.final_price || 0
                        )}`
                    : "Use This";

                  const btnBusy =
                    creatingResume === template.id ||
                    payingTemplateId === template.id;

                  return (
                    <div
                      key={template.id}
                      style={{ ...templateCard, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
                      className="dash__templateCard"
                    >
                      {templateThumb(template)}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 12,
                          gap: 10,
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <h3
                            style={{
                              margin: 0,
                              fontSize: 16,
                              fontWeight: "bold",
                              color: "#1e293b",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            title={template.name}
                          >
                            {template.name}
                          </h3>
                          <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#64748b" }}>
                            {template.category || "General"}
                          </p>

                          {p?.status === "active" ? (
                            <p
                              style={{
                                margin: "6px 0 0 0",
                                fontSize: 12,
                                fontWeight: 800,
                                color: locked ? "#991b1b" : "#166534",
                              }}
                            >
                              {p.billing_type === "free"
                                ? "Free"
                                : p.billing_type === "subscription"
                                ? "Subscription"
                                : `Price: ${currencySymbol(p.currency)}${Number(
                                    p.final_price || 0
                                  )}`}{" "}
                              • {locked ? "Locked" : "Unlocked"}
                            </p>
                          ) : null}
                        </div>

                        <span
                          style={{
                            backgroundColor:
                              template.status === "active" ? "#dcfce7" : "#f3f4f6",
                            color:
                              template.status === "active" ? "#166534" : "#374151",
                            fontSize: 10,
                            fontWeight: "bold",
                            padding: "4px 8px",
                            borderRadius: 999,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {template.status === "active" ? "Active" : "Draft"}
                        </span>
                      </div>

                      <div className="dash__templateBtns">
                        <button
                          onClick={() => openTemplatePreview(template)}
                          className="dash__btn dash__btn--light"
                          style={{ padding: 10 }}
                        >
                          <Eye size={14} /> Preview
                        </button>

                        <button
                          onClick={() => handleUseTemplate(template)}
                          disabled={btnBusy || (locked && p?.billing_type === "subscription")}
                          className="dash__btn"
                          style={{
                            padding: 10,
                            backgroundColor: btnBusy
                              ? "#93c5fd"
                              : locked
                              ? "#ea580c"
                              : "#1e40af",
                            color: "white",
                            border: "none",
                          }}
                        >
                          {btnBusy ? (
                            <>
                              <Loader2 size={14} className="animate-spin" /> Processing...
                            </>
                          ) : (
                            <>
                              <Plus size={14} /> {buttonText}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ Preview Modal (NO SCROLL, SAME PAGE, AUTO-FIT) */}
      {previewOpen && (
        <div onClick={() => setPreviewOpen(false)} className="dash__previewOverlay">
          <div onClick={(e) => e.stopPropagation()} className="dash__previewModal">
            <div className="dash__previewHead">
              <div className="dash__previewTitle">{previewTitle}</div>
              <button
                onClick={() => setPreviewOpen(false)}
                className="dash__outlineBtn"
                style={{ borderRadius: 10, padding: "8px 12px", fontWeight: 900 }}
              >
                Close
              </button>
            </div>

            <div ref={previewViewportRef} className="dash__previewBody">
              {previewLoading ? (
                <div className="dash__centerNote" style={{ padding: 30 }}>
                  <Loader2 size={28} className="animate-spin" style={{ margin: "0 auto 10px" }} />
                  <div>Loading preview...</div>
                </div>
              ) : (
                <div
                  ref={previewPageRef}
                  style={{
                    display: "inline-block",
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top center",
                    maxWidth: "100%",
                  }}
                >
                  <ResumePreview schema={previewSchema || {}} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Styles */}
      <style>{`
        :root{
          --dash-pad: 40px;
          --dash-header-pad-y: 12px;
        }
          html, body, #root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f8fafc;   /* ✅ same as dashboard */
}

body {
  overflow-x: hidden;    /* ✅ remove horizontal empty area issues */
}


        *{ box-sizing: border-box; }
        button{ -webkit-tap-highlight-color: transparent; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }

        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-spin { animation: dashSpin 1s linear infinite; }
        @keyframes dashSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .dash__brand{ display:flex;align-items:center;gap:12px;min-width:0; }
        .dash__headerRight{ display:flex;align-items:center;gap:14px;min-width:0;flex-wrap:wrap;justify-content:flex-end; }
        .dash__userchip{ display:flex;align-items:center;gap:8px;min-width:0; }
        .dash__planTag{
          border:1px solid #e2e8f0;padding:4px 10px;border-radius:6px;
          font-size:11px;font-weight:800;color:#64748b;white-space:nowrap;
        }
        .dash__iconBtn{
          border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;
          padding:8px;border-radius:10px;
        }
        .dash__iconBtn:hover{ background:#f8fafc; }
        .dash__dangerIcon{ color:#ef4444; }
        .dash__title{
          font-weight:900;font-size:18px;color:#1e293b;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }

        .dash__error{
          background:#fee2e2;border:1px solid #fecaca;color:#dc2626;
          padding:16px;border-radius:12px;margin-bottom:24px;
          display:flex;align-items:center;gap:12px;
        }

        /* Tabs wrapper (desktop + mobile) */
        .dash__tabsWrap{ position:relative; margin-bottom:30px; }

        /* Desktop tabs row */
        .dash__tabs{
          display:flex;gap:8px;border-bottom:1px solid #e2e8f0;padding-bottom:10px;
          align-items:center;flex-wrap:wrap;
        }
        .dash__tabBtn{
          background:transparent;color:#64748b;border:none;padding:10px 20px;border-radius:10px;
          font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap;
        }
        .dash__tabBtn.isActive{ background:#1e40af;color:#fff; }
        .dash__tabBtn--ghost{ border:1px solid #e2e8f0;background:#fff;color:#475569; }
        .dash__browseBtn{
          margin-left:auto;background:#10b981;color:#fff;border:none;padding:10px 20px;border-radius:10px;
          font-size:14px;font-weight:900;cursor:pointer;display:flex;align-items:center;gap:8px;white-space:nowrap;
        }

        /* Mobile bar + menu */
        .dash__mobileBar{ display:none; }
        .dash__mobileMenu{ display:none; }

        .dash__h1{ font-size:clamp(22px, 3.2vw, 32px); margin:0;font-weight:900;color:#0f172a; }
        .dash__h2{ font-size:20px;font-weight:900;margin:0 0 8px 0;color:#fff; }
        .dash__h3{ margin:0;font-weight:900;font-size:18px;color:#0f172a; }
        .dash__sub{ color:#64748b;margin-top:4px;font-size:16px; }
        .dash__tiny{ margin:4px 0 0 0;font-size:12px;color:#94a3b8; }

        .dash__primaryBtn{
          background:#1e40af;color:#fff;border:none;
          padding:12px 24px;border-radius:12px;font-weight:900;
          display:flex;align-items:center;gap:10px;cursor:pointer;font-size:14px;white-space:nowrap;
        }
        .dash__outlineBtn{
          background:#fff;border:1px solid #e2e8f0;border-radius:12px;
          padding:8px 12px;font-size:12px;font-weight:900;cursor:pointer;color:#475569;
          display:flex;align-items:center;justify-content:center;gap:8px;
        }
        .dash__whiteBtn{
          background:#fff;color:#1e40af;border:none;padding:10px 24px;border-radius:12px;
          font-weight:900;cursor:pointer;display:flex;align-items:center;gap:8px;margin-left:auto;
        }
        .dash__centerNote{ text-align:center;color:#64748b;display:grid;place-items:center;gap:10px; }
        .dash__empty{
          background:#fff;border:2px dashed #e2e8f0;border-radius:12px;
          padding:clamp(28px, 6vw, 80px) 20px;text-align:center;margin-top:20px;
        }

        .dash__statLabel{ display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:13px;margin-bottom:12px; }
        .dash__statValue{ font-size:36px;font-weight:900;color:#1e293b;line-height:1; }

        .dash__homeTop{ display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;gap:16px;flex-wrap:wrap; }

        .dash__upgradeRight{
          text-align:right;min-width:220px;
          display:flex;flex-direction:column;align-items:flex-end;
        }
        .dash__price{ font-size:32px;font-weight:900;color:#fff;line-height:1.1; }
        .dash__priceSub{ font-size:14px;font-weight:500;color:rgba(255,255,255,0.9); }
        .dash__upgradeText{ color:rgba(255,255,255,0.9);font-size:14px;margin:0; }

        .dash__sectionHead{ display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px;gap:12px;flex-wrap:wrap; }
        .dash__resumeLeft{ display:flex;align-items:center;gap:16px;min-width:0;flex:1; }
        .dash__resumeTitle{ font-weight:900;color:#1e293b;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
        .dash__resumeMeta{ font-size:12px;color:#64748b;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
        .dash__resumeRight{ display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:flex-end; }
        .dash__actions{ display:flex;gap:6px;color:#94a3b8; }

        .dash__resumesTop{ display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;gap:12px;flex-wrap:wrap; }
        .dash__resumeGrid{ display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:20px; }
        .dash__resumeCard{
          background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;
          box-shadow:0 2px 8px rgba(0,0,0,0.05);min-width:0;
        }
        .dash__btnGrid{ display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px; }
        .dash__btn{
          border-radius:12px;font-weight:900;cursor:pointer;
          display:flex;align-items:center;justify-content:center;gap:6px;
          padding:10px;border:1px solid #e2e8f0;background:#fff;color:#475569;min-width:0;
        }
        .dash__btn--light{ background:#f8fafc; }
        .dash__btn--primary{ background:#1e40af;border-color:#1e40af;color:#fff; }
        .dash__btn--success{ background:#10b981;border-color:#10b981;color:#fff; }
        .dash__btn--danger{ background:#fee2e2;border-color:#fecaca;color:#dc2626; }

        .dash__logoutBtn{
          margin-top:32px;padding:14px 24px;background:#fee2e2;color:#dc2626;border:1px solid #fecaca;
          border-radius:12px;cursor:pointer;font-weight:900;font-size:14px;
          display:flex;align-items:center;gap:8px;
        }

        .dash__modalOverlay{
          position:fixed;inset:0;background:rgba(0,0,0,0.5);
          display:flex;justify-content:center;align-items:center;z-index:1000;padding:16px;
        }
        .dash__modal{
          background:#fff;border-radius:16px;width:100%;max-width:1200px;max-height:90dvh;
          overflow:auto;padding:clamp(14px, 2vw, 24px);
          overscroll-behavior:contain;
        }
        .dash__modalHead{ display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;gap:12px;flex-wrap:wrap; }
        .dash__modalTitle{ font-size:24px;margin:0;font-weight:900;color:#1e293b; }
        .dash__modalSub{ margin:4px 0 0 0;color:#64748b; }
        .dash__templateGrid{ display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:24px; }
        .dash__templateBtns{ display:flex;gap:10px; }

        .dash__previewOverlay{
          position:fixed;inset:0;background:rgba(0,0,0,0.55);
          z-index:2000;display:grid;place-items:center;padding:16px;
        }
        .dash__previewModal{
          width:min(1100px, 96vw);
          height:min(820px, 92dvh);
          background:#fff;border-radius:16px;border:1px solid #e5e7eb;
          display:flex;flex-direction:column;overflow:hidden;
          box-shadow:0 20px 60px rgba(0,0,0,0.25);
        }
        .dash__previewHead{
          padding:12px 16px;border-bottom:1px solid #e5e7eb;
          display:flex;justify-content:space-between;align-items:center;gap:10px;background:#fff;
        }
        .dash__previewTitle{ font-weight:900;font-size:16px; overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
        .dash__previewBody{ flex:1;background:#f3f4f6;display:grid;place-items:center;overflow:hidden;padding:10px; }

        /* ✅ Responsive */
        @media (max-width: 1100px){
          .dash__statsGrid{ grid-template-columns:repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 900px){
          :root{ --dash-pad: 18px; --dash-header-pad-y: 10px; }

          /* hide desktop tabs row, show mobile bar */
          .dash__tabs{ display:none; }
          .dash__mobileBar{
            display:flex;align-items:center;justify-content:space-between;gap:10px;
            border:1px solid #e2e8f0;background:#fff;border-radius:14px;
            padding:10px 10px;
          }
          .dash__mobileMenuBtn{
            border:1px solid #e2e8f0;background:#f8fafc;border-radius:12px;
            padding:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;
            min-width:44px;min-height:44px;
          }
          .dash__mobileBarTitle{
            flex:1;font-weight:900;color:#0f172a;
            overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            text-align:center;
          }
          .dash__mobileBrowse{
            border:none;background:#10b981;color:#fff;border-radius:12px;
            padding:10px 12px;font-weight:900;cursor:pointer;display:flex;align-items:center;gap:8px;
            min-height:44px;white-space:nowrap;
          }

          .dash__mobileMenu{
            display:flex;flex-direction:column;gap:8px;
            margin-top:10px;border:1px solid #e2e8f0;background:#fff;border-radius:14px;
            padding:10px;box-shadow:0 10px 30px rgba(0,0,0,0.08);
          }
          .dash__mobileItem{
            border:1px solid #e2e8f0;background:#fff;border-radius:12px;
            padding:12px 12px;font-weight:900;color:#475569;cursor:pointer;text-align:left;
            min-height:44px;
          }
          .dash__mobileItem.isActive{
            background:#1e40af;border-color:#1e40af;color:#fff;
          }
          .dash__mobileDivider{
            height:1px;background:#e2e8f0;margin:6px 0;
          }
          .dash__mobilePrimary{
            border:none;background:#1e40af;color:#fff;border-radius:12px;
            padding:12px 12px;font-weight:900;cursor:pointer;display:flex;align-items:center;gap:10px;
            min-height:44px;
          }

          /* other mobile adjustments */
          .dash__homeTop{ align-items:stretch; }
          .dash__primaryBtn{ width:100%; justify-content:center; }
          .dash__upgradeRight{ width:100%; align-items:flex-start; text-align:left; min-width:0; }
          .dash__whiteBtn{ margin-left:0; width:100%; justify-content:center; }
          .dash__resumeMeta{ white-space:normal; }
          .dash__resumeRight{ width:100%; justify-content:space-between; }
          .dash__resumeGrid{ grid-template-columns:1fr; }
          .dash__btnGrid{ grid-template-columns:1fr; }
          .dash__templateGrid{ grid-template-columns:1fr; }
          .dash__templateBtns{ flex-direction:column; }
          .dash__modal{ max-height:92dvh; }
        }

        /* Better tap targets on touch devices */
        @media (hover: none) and (pointer: coarse){
          .dash__mobileMenuBtn, .dash__mobileBrowse, .dash__mobileItem, .dash__mobilePrimary{
            min-height:44px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
