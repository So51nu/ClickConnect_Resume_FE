// // // // // // import { useEffect, useState } from "react";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // export default function Dashboard() {
// // // // // //   const [activeTab, setActiveTab] = useState("home");
// // // // // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // // // // //   const navigate = useNavigate();

// // // // // //   const user = JSON.parse(localStorage.getItem("user") || "null");

// // // // // //   useEffect(() => {
// // // // // //     if (!user) navigate("/login", { replace: true });
// // // // // //   }, [user, navigate]);

// // // // // //   if (!user) return null;

// // // // // //   const handleLogout = () => {
// // // // // //     localStorage.removeItem("access");
// // // // // //     localStorage.removeItem("refresh");
// // // // // //     localStorage.removeItem("user");
// // // // // //     navigate("/login", { replace: true });
// // // // // //   };

// // // // // //   const keyframeStyles = `
// // // // // //     @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// // // // // //     @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }

// // // // // //     /* ✅ responsive using real CSS (inline media query doesn't work) */
// // // // // //     @media (max-width: 768px) {
// // // // // //       .mobileHeader { display: flex !important; }
// // // // // //       .sidebar { position: fixed; left: -280px; top: 0; height: 100vh; z-index: 50; transition: 0.25s ease; }
// // // // // //       .sidebar.open { left: 0; }
// // // // // //       .overlay { display: block !important; }
// // // // // //       .contentPadding { padding: 20px !important; }
// // // // // //     }

// // // // // //     @media (min-width: 769px) {
// // // // // //       .mobileHeader { display: none !important; }
// // // // // //       .sidebar { position: relative; left: 0; }
// // // // // //       .overlay { display: none !important; }
// // // // // //     }
// // // // // //   `;

// // // // // //   return (
// // // // // //     <div style={dashboardWrapper}>
// // // // // //       <style>{keyframeStyles}</style>

// // // // // //       {/* ✅ overlay (mobile) */}
// // // // // //       {isMobileMenuOpen && (
// // // // // //         <div
// // // // // //           className="overlay"
// // // // // //           style={overlay}
// // // // // //           onClick={() => setIsMobileMenuOpen(false)}
// // // // // //         />
// // // // // //       )}

// // // // // //       {/* --- SIDEBAR --- */}
// // // // // //       <div className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} style={sidebar}>
// // // // // //         <div style={logoSection}>
// // // // // //           <h2 style={logoText}>My App</h2>
// // // // // //           <p style={logoSub}>Student Dashboard</p>
// // // // // //         </div>

// // // // // //         <nav style={navLinks}>
// // // // // //           <div
// // // // // //             style={{
// // // // // //               ...navItem,
// // // // // //               backgroundColor: activeTab === "home" ? "rgba(255,255,255,0.2)" : "transparent",
// // // // // //             }}
// // // // // //             onClick={() => {
// // // // // //               setActiveTab("home");
// // // // // //               setIsMobileMenuOpen(false);
// // // // // //             }}
// // // // // //           >
// // // // // //             🏠 Dashboard
// // // // // //           </div>

// // // // // //           <div
// // // // // //             style={{
// // // // // //               ...navItem,
// // // // // //               backgroundColor: activeTab === "profile" ? "rgba(255,255,255,0.2)" : "transparent",
// // // // // //             }}
// // // // // //             onClick={() => {
// // // // // //               setActiveTab("profile");
// // // // // //               setIsMobileMenuOpen(false);
// // // // // //             }}
// // // // // //           >
// // // // // //             👤 Profile Details
// // // // // //           </div>
// // // // // //         </nav>

// // // // // //         <button style={sidebarLogout} onClick={handleLogout}>
// // // // // //           🚪 Logout
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* --- MAIN CONTENT AREA --- */}
// // // // // //       <div style={mainContent}>
// // // // // //         {/* ✅ Mobile Header */}
// // // // // //         <div className="mobileHeader" style={mobileHeader}>
// // // // // //           <button style={menuBtn} onClick={() => setIsMobileMenuOpen((s) => !s)}>
// // // // // //             ☰ Menu
// // // // // //           </button>
// // // // // //           <span style={{ fontWeight: "bold" }}>Dashboard</span>
// // // // // //         </div>

// // // // // //         <div className="contentPadding" style={contentPadding}>
// // // // // //           {activeTab === "home" ? (
// // // // // //             <div style={sectionAnimation}>
// // // // // //               <h1 style={greeting}>Hello, {user.name || "User"}! 👋</h1>
// // // // // //               <p style={breadcrumb}>Welcome back to your full-screen overview.</p>

// // // // // //               <div style={gridContainer}>
// // // // // //                 <div style={infoCard}>
// // // // // //                   <h3 style={{ marginTop: 0 }}>Account Status</h3>
// // // // // //                   <p style={{ color: "#16a34a", fontSize: 20, fontWeight: 800, margin: 0 }}>
// // // // // //                     Verified ✅
// // // // // //                   </p>
// // // // // //                 </div>

// // // // // //                 <div style={infoCard}>
// // // // // //                   <h3 style={{ marginTop: 0 }}>Mobile</h3>
// // // // // //                   <p style={{ fontSize: 18, margin: 0 }}>+91 {user.phone}</p>
// // // // // //                 </div>

// // // // // //                 <div style={infoCard}>
// // // // // //                   <h3 style={{ marginTop: 0 }}>Email</h3>
// // // // // //                   <p style={{ fontSize: 18, margin: 0 }}>{user.email || "N/A"}</p>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <div style={sectionAnimation}>
// // // // // //               <h1 style={greeting}>My Profile Details</h1>

// // // // // //               <div style={profileDetailCard}>
// // // // // //                 <div style={detailRow}>
// // // // // //                   <span style={detailLabel}>Full Name</span>
// // // // // //                   <span style={detailValue}>{user.name || "N/A"}</span>
// // // // // //                 </div>

// // // // // //                 <div style={detailRow}>
// // // // // //                   <span style={detailLabel}>Mobile Number</span>
// // // // // //                   <span style={detailValue}>+91 {user.phone}</span>
// // // // // //                 </div>

// // // // // //                 <div style={detailRow}>
// // // // // //                   <span style={detailLabel}>Email Address</span>
// // // // // //                   <span style={detailValue}>{user.email || "N/A"}</span>
// // // // // //                 </div>

// // // // // //                 <div style={detailRow}>
// // // // // //                   <span style={detailLabel}>Pincode</span>
// // // // // //                   <span style={detailValue}>{user.pincode || "N/A"}</span>
// // // // // //                 </div>

// // // // // //                 <div style={{ ...detailRow, borderBottom: "none" }}>
// // // // // //                   <span style={detailLabel}>User ID</span>
// // // // // //                   <span style={{ ...detailValue, fontSize: 12, color: "#64748b" }}>
// // // // // //                     {user.id || "N/A"}
// // // // // //                   </span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // /* ---------- Full Screen Styles ---------- */

// // // // // // const dashboardWrapper: React.CSSProperties = {
// // // // // //   display: "flex",
// // // // // //   width: "100vw",
// // // // // //   height: "100vh",
// // // // // //   overflow: "hidden",
// // // // // //   backgroundColor: "#f4f7fe",
// // // // // //   fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// // // // // // };

// // // // // // const overlay: React.CSSProperties = {
// // // // // //   display: "none",
// // // // // //   position: "fixed",
// // // // // //   inset: 0,
// // // // // //   backgroundColor: "rgba(15,23,42,0.35)",
// // // // // //   zIndex: 40,
// // // // // // };

// // // // // // const sidebar: React.CSSProperties = {
// // // // // //   width: 260,
// // // // // //   height: "100%",
// // // // // //   background: "linear-gradient(180deg, #764ba2 0%, #667eea 100%)",
// // // // // //   color: "#fff",
// // // // // //   display: "flex",
// // // // // //   flexDirection: "column",
// // // // // //   padding: 20,
// // // // // //   boxSizing: "border-box",
// // // // // //   zIndex: 50,
// // // // // // };

// // // // // // const logoSection: React.CSSProperties = {
// // // // // //   padding: "14px 0 18px",
// // // // // //   textAlign: "center",
// // // // // //   borderBottom: "1px solid rgba(255,255,255,0.15)",
// // // // // //   marginBottom: 18,
// // // // // // };

// // // // // // const logoText: React.CSSProperties = { margin: 0, fontSize: 22, letterSpacing: "0.5px", fontWeight: 900 };
// // // // // // const logoSub: React.CSSProperties = { margin: "6px 0 0", fontSize: 12, color: "rgba(255,255,255,0.85)" };

// // // // // // const navLinks: React.CSSProperties = {
// // // // // //   display: "flex",
// // // // // //   flexDirection: "column",
// // // // // //   gap: 10,
// // // // // //   flexGrow: 1,
// // // // // // };

// // // // // // const navItem: React.CSSProperties = {
// // // // // //   padding: "13px 16px",
// // // // // //   borderRadius: 12,
// // // // // //   cursor: "pointer",
// // // // // //   transition: "0.2s",
// // // // // //   fontWeight: 700,
// // // // // //   userSelect: "none",
// // // // // // };

// // // // // // const sidebarLogout: React.CSSProperties = {
// // // // // //   padding: 14,
// // // // // //   backgroundColor: "rgba(255, 255, 255, 0.14)",
// // // // // //   border: "1px solid rgba(255,255,255,0.18)",
// // // // // //   color: "white",
// // // // // //   borderRadius: 12,
// // // // // //   cursor: "pointer",
// // // // // //   fontWeight: 900,
// // // // // // };

// // // // // // const mainContent: React.CSSProperties = {
// // // // // //   flexGrow: 1,
// // // // // //   height: "100%",
// // // // // //   overflowY: "auto",
// // // // // //   display: "flex",
// // // // // //   flexDirection: "column",
// // // // // // };

// // // // // // const mobileHeader: React.CSSProperties = {
// // // // // //   display: "none", // shown by CSS media query
// // // // // //   alignItems: "center",
// // // // // //   justifyContent: "space-between",
// // // // // //   gap: 12,
// // // // // //   padding: "14px 16px",
// // // // // //   backgroundColor: "#fff",
// // // // // //   borderBottom: "1px solid #e5e7eb",
// // // // // // };

// // // // // // const menuBtn: React.CSSProperties = {
// // // // // //   padding: "8px 12px",
// // // // // //   backgroundColor: "#764ba2",
// // // // // //   color: "white",
// // // // // //   border: "none",
// // // // // //   borderRadius: 10,
// // // // // //   cursor: "pointer",
// // // // // //   fontWeight: 800,
// // // // // // };

// // // // // // const contentPadding: React.CSSProperties = {
// // // // // //   padding: 40,
// // // // // //   boxSizing: "border-box",
// // // // // //   maxWidth: 1200,
// // // // // // };

// // // // // // const sectionAnimation: React.CSSProperties = {
// // // // // //   animation: "fadeIn 0.4s ease-in",
// // // // // // };

// // // // // // const greeting: React.CSSProperties = {
// // // // // //   fontSize: 32,
// // // // // //   margin: "0 0 5px 0",
// // // // // //   color: "#111827",
// // // // // //   fontWeight: 900,
// // // // // // };

// // // // // // const breadcrumb: React.CSSProperties = { color: "#6b7280", marginBottom: 28 };

// // // // // // const gridContainer: React.CSSProperties = {
// // // // // //   display: "grid",
// // // // // //   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
// // // // // //   gap: 20,
// // // // // // };

// // // // // // const infoCard: React.CSSProperties = {
// // // // // //   backgroundColor: "#fff",
// // // // // //   padding: 22,
// // // // // //   borderRadius: 18,
// // // // // //   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// // // // // //   border: "1px solid #eef2ff",
// // // // // // };

// // // // // // const profileDetailCard: React.CSSProperties = {
// // // // // //   backgroundColor: "#fff",
// // // // // //   padding: 26,
// // // // // //   borderRadius: 18,
// // // // // //   boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
// // // // // //   marginTop: 18,
// // // // // //   border: "1px solid #eef2ff",
// // // // // // };

// // // // // // const detailRow: React.CSSProperties = {
// // // // // //   display: "flex",
// // // // // //   justifyContent: "space-between",
// // // // // //   padding: "16px 0",
// // // // // //   borderBottom: "1px solid #f1f5f9",
// // // // // //   gap: 16,
// // // // // // };

// // // // // // const detailLabel: React.CSSProperties = { fontWeight: 900, color: "#64748b" };
// // // // // // const detailValue: React.CSSProperties = { fontWeight: 800, color: "#111827" };

// // // // // // src/pages/Dashboard.jsx - Student Dashboard
// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import axios from "../api/axiosInstance";
// // // // // import { 
// // // // //   PlusCircle, 
// // // // //   FileText, 
// // // // //   CheckCircle, 
// // // // //   Clock, 
// // // // //   Download, 
// // // // //   Crown, 
// // // // //   Edit3, 
// // // // //   LogOut,
// // // // //   Plus,
// // // // //   Eye,
// // // // //   Trash2,
// // // // //   User,
// // // // //   Mail,
// // // // //   Phone,
// // // // //   MapPin,
// // // // //   Loader2,
// // // // //   AlertCircle
// // // // // } from 'lucide-react';

// // // // // function authHeaders() {
// // // // //   const token = localStorage.getItem("access") || "";
// // // // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // // // }

// // // // // const Dashboard = () => {
// // // // //   const [activeTab, setActiveTab] = useState("home");
// // // // //   const navigate = useNavigate();
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [loadingTemplates, setLoadingTemplates] = useState(false);
// // // // //   const [loadingResumes, setLoadingResumes] = useState(false);
// // // // //   const [stats, setStats] = useState({
// // // // //     totalResumes: 0,
// // // // //     completed: 0,
// // // // //     inProgress: 0,
// // // // //     downloads: 0
// // // // //   });
// // // // //   const [resumes, setResumes] = useState([]);
// // // // //   const [templates, setTemplates] = useState([]);
// // // // //   const [user, setUser] = useState(null);
// // // // //   const [showTemplatesModal, setShowTemplatesModal] = useState(false);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [creatingResume, setCreatingResume] = useState(null);

// // // // //   // Fetch user data and dashboard stats
// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         setError(null);
        
// // // // //         // Get user data from localStorage
// // // // //         const storedUser = JSON.parse(localStorage.getItem("user") || "null");
// // // // //         if (!storedUser) {
// // // // //           navigate("/login", { replace: true });
// // // // //           return;
// // // // //         }
// // // // //         setUser(storedUser);

// // // // //         // Fetch dashboard stats
// // // // //         const statsRes = await axios.get("/auth/student/dashboard/stats/", { headers: authHeaders() });
// // // // //         setStats(statsRes.data);

// // // // //         // Fetch student's resumes
// // // // //         await fetchResumes();

// // // // //       } catch (error) {
// // // // //         console.error("Error fetching dashboard data:", error);
// // // // //         setError("Failed to load dashboard data. Please try again.");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchData();
// // // // //   }, [navigate]);

// // // // //   const fetchResumes = async () => {
// // // // //     try {
// // // // //       setLoadingResumes(true);
// // // // //       const resumesRes = await axios.get("/auth/student/resumes/", { headers: authHeaders() });
// // // // //       setResumes(resumesRes.data || []);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching resumes:", error);
// // // // //       setError("Failed to load resumes.");
// // // // //     } finally {
// // // // //       setLoadingResumes(false);
// // // // //     }
// // // // //   };

// // // // //   const fetchTemplates = async () => {
// // // // //     try {
// // // // //       setLoadingTemplates(true);
// // // // //       const templatesRes = await axios.get("/auth/student/templates/", { headers: authHeaders() });
// // // // //       setTemplates(templatesRes.data || []);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching templates:", error);
// // // // //       setError("Failed to load templates.");
// // // // //     } finally {
// // // // //       setLoadingTemplates(false);
// // // // //     }
// // // // //   };

// // // // //   const handleLogout = () => {
// // // // //     localStorage.removeItem("access");
// // // // //     localStorage.removeItem("refresh");
// // // // //     localStorage.removeItem("user");
// // // // //     navigate("/login", { replace: true });
// // // // //   };

// // // // //   const handleCreateResume = async (templateId) => {
// // // // //     try {
// // // // //       setCreatingResume(templateId);
// // // // //       const res = await axios.post(
// // // // //         "/auth/student/resumes/",
// // // // //         { template_id: templateId, title: "New Resume" },
// // // // //         { headers: authHeaders() }
// // // // //       );
      
// // // // //       // Navigate to resume editor
// // // // //       navigate(`/student/resume/edit/${res.data.id}`);
      
// // // // //     } catch (error) {
// // // // //       console.error("Error creating resume:", error);
// // // // //       alert("Failed to create resume. Please try again.");
// // // // //     } finally {
// // // // //       setCreatingResume(null);
// // // // //       setShowTemplatesModal(false);
// // // // //     }
// // // // //   };

// // // // //   const handleEditResume = (resumeId) => {
// // // // //     navigate(`/student/resume/edit/${resumeId}`);
// // // // //   };

// // // // //   const handleDeleteResume = async (resumeId) => {
// // // // //     if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
// // // // //     try {
// // // // //       await axios.delete(`/auth/student/resumes/${resumeId}/`, { headers: authHeaders() });
      
// // // // //       // Update local state
// // // // //       const updatedResumes = resumes.filter(r => r.id !== resumeId);
// // // // //       setResumes(updatedResumes);
      
// // // // //       // Update stats
// // // // //       setStats(prev => ({
// // // // //         ...prev,
// // // // //         totalResumes: prev.totalResumes - 1,
// // // // //         completed: updatedResumes.filter(r => r.status === "completed").length,
// // // // //         inProgress: updatedResumes.filter(r => r.status === "draft" || r.status === "in_progress").length
// // // // //       }));
      
// // // // //     } catch (error) {
// // // // //       console.error("Error deleting resume:", error);
// // // // //       alert("Failed to delete resume");
// // // // //     }
// // // // //   };

// // // // //   const handleDownloadResume = async (resumeId, format = 'pdf') => {
// // // // //     try {
// // // // //       // First track the download
// // // // //       await axios.post(`/auth/student/resumes/${resumeId}/download/`, {}, { headers: authHeaders() });
      
// // // // //       // For now, just show a message (implement actual download later)
// // // // //       alert(`Download ${format.toUpperCase()} functionality will be implemented soon.`);
      
// // // // //       // Update download count in state
// // // // //       setResumes(prev => prev.map(r => 
// // // // //         r.id === resumeId 
// // // // //           ? { ...r, download_count: (r.download_count || 0) + 1 }
// // // // //           : r
// // // // //       ));
      
// // // // //       // Update stats
// // // // //       setStats(prev => ({
// // // // //         ...prev,
// // // // //         downloads: prev.downloads + 1
// // // // //       }));
      
// // // // //     } catch (error) {
// // // // //       console.error("Download error:", error);
// // // // //       alert("Failed to download");
// // // // //     }
// // // // //   };

// // // // //   const handlePreviewTemplate = (template) => {
// // // // //     // Check if user is logged in
// // // // //     const token = localStorage.getItem("access");
// // // // //     if (!token) {
// // // // //       alert("Please login first");
// // // // //       navigate("/login");
// // // // //       return;
// // // // //     }
    
// // // // //     navigate(`/student/template/preview/${template.id}`);
// // // // //   };

// // // // //   const openTemplatesModal = () => {
// // // // //     // Check if user is logged in
// // // // //     const token = localStorage.getItem("access");
// // // // //     if (!token) {
// // // // //       alert("Please login first");
// // // // //       navigate("/login");
// // // // //       return;
// // // // //     }
    
// // // // //     setShowTemplatesModal(true);
// // // // //     fetchTemplates();
// // // // //   };

// // // // //   const formatDate = (dateString) => {
// // // // //     if (!dateString) return 'N/A';
// // // // //     try {
// // // // //       const date = new Date(dateString);
// // // // //       return date.toLocaleDateString('en-US', {
// // // // //         year: 'numeric',
// // // // //         month: 'short',
// // // // //         day: 'numeric'
// // // // //       });
// // // // //     } catch (e) {
// // // // //       return dateString;
// // // // //     }
// // // // //   };

// // // // //   const getStatusBadge = (status) => {
// // // // //     const statusMap = {
// // // // //       'draft': { bg: '#f1f5f9', color: '#64748b', text: 'Draft' },
// // // // //       'in_progress': { bg: '#fef3c7', color: '#92400e', text: 'In Progress' },
// // // // //       'completed': { bg: '#dcfce7', color: '#166534', text: 'Completed' },
// // // // //       'published': { bg: '#dbeafe', color: '#1e40af', text: 'Published' }
// // // // //     };
    
// // // // //     const statusInfo = statusMap[status] || { bg: '#f3f4f6', color: '#374151', text: status };
    
// // // // //     return (
// // // // //       <span style={{
// // // // //         backgroundColor: statusInfo.bg,
// // // // //         color: statusInfo.color,
// // // // //         padding: '4px 12px',
// // // // //         borderRadius: '20px',
// // // // //         fontSize: '10px',
// // // // //         fontWeight: 'bold',
// // // // //         textTransform: 'uppercase'
// // // // //       }}>
// // // // //         {statusInfo.text}
// // // // //       </span>
// // // // //     );
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div style={{
// // // // //         display: 'flex',
// // // // //         justifyContent: 'center',
// // // // //         alignItems: 'center',
// // // // //         minHeight: '100vh',
// // // // //         backgroundColor: '#f8fafc'
// // // // //       }}>
// // // // //         <div style={{ textAlign: 'center' }}>
// // // // //           <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // // // //           <div style={{ fontSize: '16px', color: '#64748b' }}>Loading Dashboard...</div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // Inline CSS styles
// // // // //   const styles = {
// // // // //     pageContainer: {
// // // // //       backgroundColor: '#f8fafc',
// // // // //       minHeight: '100vh',
// // // // //       width: '100vw',
// // // // //       display: 'flex',
// // // // //       flexDirection: 'column',
// // // // //       fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
// // // // //       margin: 0,
// // // // //       padding: 0,
// // // // //       boxSizing: 'border-box'
// // // // //     },
// // // // //     headerStyle: {
// // // // //       backgroundColor: '#fff',
// // // // //       borderBottom: '1px solid #e2e8f0',
// // // // //       padding: '12px 40px',
// // // // //       display: 'flex',
// // // // //       justifyContent: 'space-between',
// // // // //       alignItems: 'center',
// // // // //       width: '100%',
// // // // //       boxSizing: 'border-box',
// // // // //       position: 'sticky',
// // // // //       top: 0,
// // // // //       zIndex: 100,
// // // // //       boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
// // // // //     },
// // // // //     mainContent: {
// // // // //       width: '100%',
// // // // //       maxWidth: '1200px',
// // // // //       margin: '0 auto',
// // // // //       padding: '40px',
// // // // //       boxSizing: 'border-box',
// // // // //       flex: 1
// // // // //     },
// // // // //     statsGrid: {
// // // // //       display: 'grid',
// // // // //       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
// // // // //       gap: '20px',
// // // // //       marginBottom: '32px'
// // // // //     },
// // // // //     cardBase: {
// // // // //       backgroundColor: '#fff',
// // // // //       border: '1px solid #e2e8f0',
// // // // //       borderRadius: '12px',
// // // // //       padding: '24px',
// // // // //       boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
// // // // //       transition: 'transform 0.2s, box-shadow 0.2s'
// // // // //     },
// // // // //     upgradeBox: {
// // // // //       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // // //       borderRadius: '16px',
// // // // //       padding: '30px',
// // // // //       display: 'flex',
// // // // //       justifyContent: 'space-between',
// // // // //       alignItems: 'center',
// // // // //       marginBottom: '40px',
// // // // //       color: 'white'
// // // // //     },
// // // // //     resumeItemStyle: {
// // // // //       backgroundColor: '#fff',
// // // // //       border: '1px solid #e2e8f0',
// // // // //       borderRadius: '12px',
// // // // //       padding: '16px 24px',
// // // // //       display: 'flex',
// // // // //       justifyContent: 'space-between',
// // // // //       alignItems: 'center',
// // // // //       marginBottom: '12px',
// // // // //       transition: 'all 0.2s'
// // // // //     },
// // // // //     profileDetailCard: {
// // // // //       backgroundColor: "#fff",
// // // // //       padding: "30px",
// // // // //       borderRadius: "16px",
// // // // //       border: "1px solid #e2e8f0",
// // // // //       boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
// // // // //     },
// // // // //     detailRow: {
// // // // //       display: "flex",
// // // // //       justifyContent: "space-between",
// // // // //       padding: "16px 0",
// // // // //       borderBottom: "1px solid #f1f5f9",
// // // // //       gap: "16px"
// // // // //     },
// // // // //     templateCard: {
// // // // //       backgroundColor: '#fff',
// // // // //       border: '1px solid #e2e8f0',
// // // // //       borderRadius: '12px',
// // // // //       padding: '20px',
// // // // //       transition: 'all 0.3s ease',
// // // // //       cursor: 'pointer'
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={styles.pageContainer}>
// // // // //       {/* Navbar */}
// // // // //       <header style={styles.headerStyle}>
// // // // //         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // // //           <div style={{ backgroundColor: '#1e40af', padding: '8px', borderRadius: '8px' }}>
// // // // //             <FileText color="white" size={20} />
// // // // //           </div>
// // // // //           <div style={{ lineHeight: 1.2 }}>
// // // // //             <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1e293b' }}>Resume Builder Pro</div>
// // // // //             <div style={{ fontSize: '12px', color: '#64748b' }}>Student Dashboard</div>
// // // // //           </div>
// // // // //         </div>
// // // // //         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
// // // // //           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// // // // //             <User size={16} color="#64748b" />
// // // // //             <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>{user?.name || 'Student'}</span>
// // // // //           </div>
// // // // //           <span style={{ border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>FREE Plan</span>
// // // // //           <div 
// // // // //             style={{ cursor: 'pointer' }} 
// // // // //             onClick={handleLogout}
// // // // //             title="Logout"
// // // // //           >
// // // // //             <LogOut size={20} color="#94a3b8" />
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       {/* Content Area */}
// // // // //       <main style={styles.mainContent}>
// // // // //         {/* Error Display */}
// // // // //         {error && (
// // // // //           <div style={{
// // // // //             backgroundColor: '#fee2e2',
// // // // //             border: '1px solid #fecaca',
// // // // //             color: '#dc2626',
// // // // //             padding: '16px',
// // // // //             borderRadius: '12px',
// // // // //             marginBottom: '24px',
// // // // //             display: 'flex',
// // // // //             alignItems: 'center',
// // // // //             gap: '12px'
// // // // //           }}>
// // // // //             <AlertCircle size={20} />
// // // // //             <span>{error}</span>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* Tabs */}
// // // // //         <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
// // // // //           <button 
// // // // //             onClick={() => setActiveTab("home")}
// // // // //             style={{ 
// // // // //               backgroundColor: activeTab === "home" ? '#1e40af' : 'transparent', 
// // // // //               color: activeTab === "home" ? 'white' : '#64748b',
// // // // //               border: 'none', 
// // // // //               padding: '10px 20px', 
// // // // //               borderRadius: '8px', 
// // // // //               fontSize: '14px', 
// // // // //               fontWeight: '500',
// // // // //               cursor: 'pointer',
// // // // //               transition: 'all 0.2s'
// // // // //             }}
// // // // //           >
// // // // //             Overview
// // // // //           </button>
          
// // // // //           <button 
// // // // //             onClick={() => setActiveTab("resumes")}
// // // // //             style={{ 
// // // // //               backgroundColor: activeTab === "resumes" ? '#1e40af' : 'transparent', 
// // // // //               color: activeTab === "resumes" ? 'white' : '#64748b',
// // // // //               border: 'none', 
// // // // //               padding: '10px 20px', 
// // // // //               borderRadius: '8px', 
// // // // //               fontSize: '14px', 
// // // // //               fontWeight: '500',
// // // // //               cursor: 'pointer',
// // // // //               transition: 'all 0.2s'
// // // // //             }}
// // // // //           >
// // // // //             My Resumes
// // // // //           </button>
          
// // // // //           <button 
// // // // //             onClick={() => setActiveTab("profile")}
// // // // //             style={{ 
// // // // //               backgroundColor: activeTab === "profile" ? '#1e40af' : 'transparent', 
// // // // //               color: activeTab === "profile" ? 'white' : '#64748b',
// // // // //               border: 'none', 
// // // // //               padding: '10px 20px', 
// // // // //               borderRadius: '8px', 
// // // // //               fontSize: '14px', 
// // // // //               fontWeight: '500',
// // // // //               cursor: 'pointer',
// // // // //               transition: 'all 0.2s'
// // // // //             }}
// // // // //           >
// // // // //             Profile
// // // // //           </button>

// // // // //           <button 
// // // // //             onClick={openTemplatesModal}
// // // // //             style={{ 
// // // // //               backgroundColor: '#10b981',
// // // // //               color: 'white',
// // // // //               border: 'none', 
// // // // //               padding: '10px 20px', 
// // // // //               borderRadius: '8px', 
// // // // //               fontSize: '14px', 
// // // // //               fontWeight: '500',
// // // // //               cursor: 'pointer',
// // // // //               marginLeft: 'auto',
// // // // //               display: 'flex',
// // // // //               alignItems: 'center',
// // // // //               gap: '8px'
// // // // //             }}
// // // // //           >
// // // // //             <Plus size={16} /> Browse Templates
// // // // //           </button>
// // // // //         </div>

// // // // //         {activeTab === "home" ? (
// // // // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // // // //             {/* Hero Section */}
// // // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
// // // // //               <div>
// // // // //                 <h1 style={{ fontSize: '32px', margin: 0, fontWeight: '800', color: '#0f172a' }}>Welcome back, {user?.name || "Student"}!</h1>
// // // // //                 <p style={{ color: '#64748b', marginTop: '4px', fontSize: '16px' }}>Create professional resumes in minutes</p>
// // // // //               </div>
// // // // //               <button 
// // // // //                 onClick={openTemplatesModal}
// // // // //                 style={{ 
// // // // //                   backgroundColor: '#1e40af', 
// // // // //                   color: 'white', 
// // // // //                   border: 'none', 
// // // // //                   padding: '12px 24px', 
// // // // //                   borderRadius: '8px', 
// // // // //                   fontWeight: '600', 
// // // // //                   display: 'flex', 
// // // // //                   alignItems: 'center', 
// // // // //                   gap: '10px', 
// // // // //                   cursor: 'pointer',
// // // // //                   fontSize: '14px',
// // // // //                   transition: 'background-color 0.2s'
// // // // //                 }}
// // // // //               >
// // // // //                 <Plus size={18} strokeWidth={3} /> Create New Resume
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* Stats Grid */}
// // // // //             <div style={styles.statsGrid}>
// // // // //               <div style={styles.cardBase}>
// // // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // // // //                   <FileText size={16} /> Total Resumes
// // // // //                 </div>
// // // // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b' }}>{stats.totalResumes}</div>
// // // // //               </div>
// // // // //               <div style={styles.cardBase}>
// // // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // // // //                   <CheckCircle size={16} color="#22c55e" /> Completed
// // // // //                 </div>
// // // // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a' }}>{stats.completed}</div>
// // // // //               </div>
// // // // //               <div style={styles.cardBase}>
// // // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // // // //                   <Clock size={16} color="#f59e0b" /> In Progress
// // // // //                 </div>
// // // // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#d97706' }}>{stats.inProgress}</div>
// // // // //               </div>
// // // // //               <div style={styles.cardBase}>
// // // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // // // //                   <Download size={16} /> Downloads
// // // // //                 </div>
// // // // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b' }}>{stats.downloads}</div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Upgrade Banner */}
// // // // //             <div style={styles.upgradeBox}>
// // // // //               <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
// // // // //                 <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%', display: 'flex' }}>
// // // // //                   <Crown color="white" size={24} />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: 'white' }}>Upgrade to Pro</h2>
// // // // //                   <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', marginBottom: '12px' }}>Unlock premium templates, AI features, and unlimited downloads</p>
// // // // //                   <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'rgba(255,255,255,0.9)' }}>
// // // // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> Access to all premium templates</div>
// // // // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> AI-powered content suggestions</div>
// // // // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> Priority support</div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div style={{ textAlign: 'right' }}>
// // // // //                 <div style={{ fontSize: '32px', fontWeight: '900', color: 'white' }}>₹999<span style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(255,255,255,0.9)' }}>/year</span></div>
// // // // //                 <button style={{ 
// // // // //                   backgroundColor: 'white', 
// // // // //                   color: '#1e40af', 
// // // // //                   border: 'none', 
// // // // //                   padding: '10px 24px', 
// // // // //                   borderRadius: '6px', 
// // // // //                   fontWeight: 'bold', 
// // // // //                   marginTop: '12px', 
// // // // //                   cursor: 'pointer', 
// // // // //                   display: 'flex', 
// // // // //                   alignItems: 'center', 
// // // // //                   gap: '8px'
// // // // //                 }}>
// // // // //                   <PlusCircle size={16} /> Upgrade Now
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Recent Resumes List */}
// // // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
// // // // //               <div>
// // // // //                 <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '18px', color: '#0f172a' }}>Recent Resumes</h3>
// // // // //                 <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>Your recently modified resumes</p>
// // // // //               </div>
// // // // //               {resumes.length > 0 && (
// // // // //                 <button 
// // // // //                   onClick={() => setActiveTab("resumes")}
// // // // //                   style={{ 
// // // // //                     backgroundColor: '#fff', 
// // // // //                     border: '1px solid #e2e8f0', 
// // // // //                     borderRadius: '6px', 
// // // // //                     padding: '6px 12px', 
// // // // //                     fontSize: '12px', 
// // // // //                     fontWeight: 'bold', 
// // // // //                     display: 'flex', 
// // // // //                     alignItems: 'center', 
// // // // //                     gap: '8px', 
// // // // //                     cursor: 'pointer',
// // // // //                     color: '#475569'
// // // // //                   }}
// // // // //                 >
// // // // //                   View All
// // // // //                 </button>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Resume Rows */}
// // // // //             {loadingResumes ? (
// // // // //               <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
// // // // //                 <Loader2 size={24} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // // // //                 <div>Loading resumes...</div>
// // // // //               </div>
// // // // //             ) : resumes.length === 0 ? (
// // // // //               <div style={{ 
// // // // //                 backgroundColor: '#fff', 
// // // // //                 border: '2px dashed #e2e8f0', 
// // // // //                 borderRadius: '12px', 
// // // // //                 padding: '60px 20px', 
// // // // //                 textAlign: 'center',
// // // // //                 marginTop: '20px'
// // // // //               }}>
// // // // //                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
// // // // //                 <h3 style={{ color: '#64748b', marginBottom: '8px' }}>No Resumes Yet</h3>
// // // // //                 <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Create your first resume to get started</p>
// // // // //                 <button 
// // // // //                   onClick={openTemplatesModal}
// // // // //                   style={{ 
// // // // //                     backgroundColor: '#1e40af', 
// // // // //                     color: 'white', 
// // // // //                     border: 'none', 
// // // // //                     padding: '10px 20px', 
// // // // //                     borderRadius: '8px', 
// // // // //                     fontWeight: '600', 
// // // // //                     cursor: 'pointer'
// // // // //                   }}
// // // // //                 >
// // // // //                   Create First Resume
// // // // //                 </button>
// // // // //               </div>
// // // // //             ) : (
// // // // //               resumes.slice(0, 5).map((resume) => (
// // // // //                 <div 
// // // // //                   key={resume.id} 
// // // // //                   style={{
// // // // //                     ...styles.resumeItemStyle,
// // // // //                     boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
// // // // //                   }}
// // // // //                   onMouseEnter={(e) => {
// // // // //                     e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
// // // // //                     e.currentTarget.style.borderColor = '#cbd5e1';
// // // // //                   }}
// // // // //                   onMouseLeave={(e) => {
// // // // //                     e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
// // // // //                     e.currentTarget.style.borderColor = '#e2e8f0';
// // // // //                   }}
// // // // //                 >
// // // // //                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
// // // // //                     <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '10px' }}>
// // // // //                       <FileText color="#2563eb" size={24} />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{resume.title || 'Untitled Resume'}</div>
// // // // //                       <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
// // // // //                         Template: {resume.template_name || 'Default'} • Modified {formatDate(resume.updated_at)}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
// // // // //                     {getStatusBadge(resume.status)}
// // // // //                     <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
// // // // //                       <div 
// // // // //                         style={{ cursor: 'pointer' }} 
// // // // //                         onClick={() => handleEditResume(resume.id)}
// // // // //                         title="Edit Resume"
// // // // //                       >
// // // // //                         <Edit3 size={18} />
// // // // //                       </div>
// // // // //                       <div 
// // // // //                         style={{ cursor: 'pointer' }} 
// // // // //                         onClick={() => handleDownloadResume(resume.id, 'pdf')}
// // // // //                         title="Download PDF"
// // // // //                       >
// // // // //                         <Download size={18} />
// // // // //                       </div>
// // // // //                       <div 
// // // // //                         style={{ cursor: 'pointer', color: '#ef4444' }} 
// // // // //                         onClick={() => handleDeleteResume(resume.id)}
// // // // //                         title="Delete Resume"
// // // // //                       >
// // // // //                         <Trash2 size={18} />
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))
// // // // //             )}
// // // // //           </div>
// // // // //         ) : activeTab === "resumes" ? (
// // // // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
// // // // //               <div>
// // // // //                 <h1 style={{ fontSize: '28px', margin: 0, fontWeight: '800', color: '#0f172a' }}>My Resumes</h1>
// // // // //                 <p style={{ color: '#64748b', marginTop: '4px' }}>Manage all your created resumes</p>
// // // // //               </div>
// // // // //               <button 
// // // // //                 onClick={openTemplatesModal}
// // // // //                 style={{ 
// // // // //                   backgroundColor: '#1e40af', 
// // // // //                   color: 'white', 
// // // // //                   border: 'none', 
// // // // //                   padding: '10px 20px', 
// // // // //                   borderRadius: '8px', 
// // // // //                   fontWeight: '600', 
// // // // //                   display: 'flex', 
// // // // //                   alignItems: 'center', 
// // // // //                   gap: '10px', 
// // // // //                   cursor: 'pointer'
// // // // //                 }}
// // // // //               >
// // // // //                 <Plus size={16} /> Create New
// // // // //               </button>
// // // // //             </div>

// // // // //             {loadingResumes ? (
// // // // //               <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
// // // // //                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // // // //                 <div>Loading your resumes...</div>
// // // // //               </div>
// // // // //             ) : resumes.length === 0 ? (
// // // // //               <div style={{ 
// // // // //                 backgroundColor: '#fff', 
// // // // //                 border: '2px dashed #e2e8f0', 
// // // // //                 borderRadius: '12px', 
// // // // //                 padding: '80px 20px', 
// // // // //                 textAlign: 'center',
// // // // //                 marginTop: '40px'
// // // // //               }}>
// // // // //                 <FileText size={64} color="#cbd5e1" style={{ marginBottom: '20px' }} />
// // // // //                 <h2 style={{ color: '#64748b', marginBottom: '12px' }}>No Resumes Created Yet</h2>
// // // // //                 <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
// // // // //                   Start by choosing a template and creating your first professional resume
// // // // //                 </p>
// // // // //                 <button 
// // // // //                   onClick={openTemplatesModal}
// // // // //                   style={{ 
// // // // //                     backgroundColor: '#1e40af', 
// // // // //                     color: 'white', 
// // // // //                     border: 'none', 
// // // // //                     padding: '12px 28px', 
// // // // //                     borderRadius: '8px', 
// // // // //                     fontWeight: '600', 
// // // // //                     cursor: 'pointer',
// // // // //                     fontSize: '16px'
// // // // //                   }}
// // // // //                 >
// // // // //                     Browse Templates
// // // // //                 </button>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
// // // // //                 {resumes.map((resume) => (
// // // // //                   <div 
// // // // //                     key={resume.id} 
// // // // //                     style={{
// // // // //                       backgroundColor: '#fff',
// // // // //                       border: '1px solid #e2e8f0',
// // // // //                       borderRadius: '12px',
// // // // //                       padding: '20px',
// // // // //                       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
// // // // //                       transition: 'all 0.3s'
// // // // //                     }}
// // // // //                   >
// // // // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
// // // // //                       <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '8px' }}>
// // // // //                         <FileText color="#2563eb" size={20} />
// // // // //                       </div>
// // // // //                       <div style={{ flex: 1 }}>
// // // // //                         <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{resume.title || 'Untitled Resume'}</div>
// // // // //                         <div style={{ fontSize: '12px', color: '#64748b' }}>Created: {formatDate(resume.created_at)}</div>
// // // // //                       </div>
// // // // //                       {getStatusBadge(resume.status)}
// // // // //                     </div>
                    
// // // // //                     <div style={{ marginBottom: '16px' }}>
// // // // //                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Template</div>
// // // // //                       <div style={{ fontWeight: '500', color: '#475569' }}>{resume.template_name || 'Default'}</div>
// // // // //                     </div>
                    
// // // // //                     <div style={{ marginBottom: '16px' }}>
// // // // //                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Downloads</div>
// // // // //                       <div style={{ fontWeight: '500', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
// // // // //                         <Download size={14} /> {resume.download_count || 0}
// // // // //                       </div>
// // // // //                     </div>
                    
// // // // //                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
// // // // //                       <button 
// // // // //                         onClick={() => handleEditResume(resume.id)}
// // // // //                         style={{ 
// // // // //                           backgroundColor: '#f8fafc', 
// // // // //                           border: '1px solid #e2e8f0', 
// // // // //                           padding: '10px', 
// // // // //                           borderRadius: '8px', 
// // // // //                           fontWeight: '600', 
// // // // //                           cursor: 'pointer',
// // // // //                           display: 'flex',
// // // // //                           alignItems: 'center',
// // // // //                           justifyContent: 'center',
// // // // //                           gap: '6px',
// // // // //                           fontSize: '13px',
// // // // //                           color: '#475569'
// // // // //                         }}
// // // // //                       >
// // // // //                         <Edit3 size={14} /> Edit
// // // // //                       </button>
// // // // //                       <button 
// // // // //                         onClick={() => handleDownloadResume(resume.id, 'pdf')}
// // // // //                         style={{ 
// // // // //                           backgroundColor: '#1e40af', 
// // // // //                           color: 'white', 
// // // // //                           border: 'none', 
// // // // //                           padding: '10px', 
// // // // //                           borderRadius: '8px', 
// // // // //                           fontWeight: '600', 
// // // // //                           cursor: 'pointer',
// // // // //                           display: 'flex',
// // // // //                           alignItems: 'center',
// // // // //                           justifyContent: 'center',
// // // // //                           gap: '6px',
// // // // //                           fontSize: '13px'
// // // // //                         }}
// // // // //                       >
// // // // //                         <Download size={14} /> PDF
// // // // //                       </button>
// // // // //                       <button 
// // // // //                         onClick={() => handleDownloadResume(resume.id, 'word')}
// // // // //                         style={{ 
// // // // //                           backgroundColor: '#10b981', 
// // // // //                           color: 'white', 
// // // // //                           border: 'none', 
// // // // //                           padding: '10px', 
// // // // //                           borderRadius: '8px', 
// // // // //                           fontWeight: '600', 
// // // // //                           cursor: 'pointer',
// // // // //                           display: 'flex',
// // // // //                           alignItems: 'center',
// // // // //                           justifyContent: 'center',
// // // // //                           gap: '6px',
// // // // //                           fontSize: '13px'
// // // // //                         }}
// // // // //                       >
// // // // //                         <FileText size={14} /> Word
// // // // //                       </button>
// // // // //                       <button 
// // // // //                         onClick={() => handleDeleteResume(resume.id)}
// // // // //                         style={{ 
// // // // //                           backgroundColor: '#fee2e2', 
// // // // //                           color: '#dc2626', 
// // // // //                           border: '1px solid #fecaca', 
// // // // //                           padding: '10px', 
// // // // //                           borderRadius: '8px', 
// // // // //                           fontWeight: '600', 
// // // // //                           cursor: 'pointer',
// // // // //                           display: 'flex',
// // // // //                           alignItems: 'center',
// // // // //                           justifyContent: 'center',
// // // // //                           gap: '6px',
// // // // //                           fontSize: '13px'
// // // // //                         }}
// // // // //                       >
// // // // //                         <Trash2 size={14} /> Delete
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         ) : (
// // // // //           /* --- PROFILE SECTION --- */
// // // // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // // // //             <h1 style={{ fontSize: '32px', margin: "0 0 20px 0", fontWeight: '800', color: '#0f172a' }}>My Profile Details</h1>
            
// // // // //             <div style={styles.profileDetailCard}>
// // // // //               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
// // // // //                 <div style={{ 
// // // // //                   backgroundColor: '#1e40af', 
// // // // //                   width: '60px', 
// // // // //                   height: '60px', 
// // // // //                   borderRadius: '50%', 
// // // // //                   display: 'flex', 
// // // // //                   alignItems: 'center', 
// // // // //                   justifyContent: 'center',
// // // // //                   color: 'white',
// // // // //                   fontSize: '24px',
// // // // //                   fontWeight: 'bold'
// // // // //                 }}>
// // // // //                   {user?.name?.charAt(0)?.toUpperCase() || 'S'}
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <h2 style={{ margin: 0, color: '#1e293b' }}>{user?.name || 'Student'}</h2>
// // // // //                   <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Student Account</p>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div style={styles.detailRow}>
// // // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// // // // //                   <User size={16} color="#64748b" />
// // // // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Full Name</span>
// // // // //                 </div>
// // // // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.name || "N/A"}</span>
// // // // //               </div>

// // // // //               <div style={styles.detailRow}>
// // // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// // // // //                   <Phone size={16} color="#64748b" />
// // // // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Mobile Number</span>
// // // // //                 </div>
// // // // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.phone ? `+91 ${user.phone}` : "N/A"}</span>
// // // // //               </div>

// // // // //               <div style={styles.detailRow}>
// // // // //                 <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
// // // // //                   <Mail size={16} color="#64748b" />
// // // // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Email Address</span>
// // // // //                 </div>
// // // // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.email || "N/A"}</span>
// // // // //               </div>

// // // // //               <div style={styles.detailRow}>
// // // // //                 <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
// // // // //                   <MapPin size={16} color="#64748b" />
// // // // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Pincode</span>
// // // // //                 </div>
// // // // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.pincode || "N/A"}</span>
// // // // //               </div>

// // // // //               <div style={{ ...styles.detailRow, borderBottom: "none" }}>
// // // // //                 <span style={{ fontWeight: "900", color: "#64748b" }}>User ID</span>
// // // // //                 <span style={{ fontWeight: "800", color: "#64748b", fontSize: "12px" }}>
// // // // //                   {user?.id || "N/A"}
// // // // //                 </span>
// // // // //               </div>
// // // // //             </div>

// // // // //             <button 
// // // // //               onClick={handleLogout}
// // // // //               style={{
// // // // //                 marginTop: '32px',
// // // // //                 padding: '14px 24px',
// // // // //                 backgroundColor: '#fee2e2',
// // // // //                 color: '#dc2626',
// // // // //                 border: '1px solid #fecaca',
// // // // //                 borderRadius: '12px',
// // // // //                 cursor: 'pointer',
// // // // //                 fontWeight: '900',
// // // // //                 fontSize: '14px',
// // // // //                 display: 'flex',
// // // // //                 alignItems: 'center',
// // // // //                 gap: '8px'
// // // // //               }}
// // // // //             >
// // // // //               <LogOut size={16} /> Logout from Dashboard
// // // // //             </button>
// // // // //           </div>
// // // // //         )}
// // // // //       </main>

// // // // //       {/* Templates Modal */}
// // // // //       {showTemplatesModal && (
// // // // //         <div 
// // // // //           onClick={() => setShowTemplatesModal(false)}
// // // // //           style={{
// // // // //             position: 'fixed',
// // // // //             top: 0,
// // // // //             left: 0,
// // // // //             right: 0,
// // // // //             bottom: 0,
// // // // //             backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // // // //             display: 'flex',
// // // // //             justifyContent: 'center',
// // // // //             alignItems: 'center',
// // // // //             zIndex: 1000,
// // // // //             padding: '20px'
// // // // //           }}
// // // // //         >
// // // // //           <div 
// // // // //             onClick={(e) => e.stopPropagation()}
// // // // //             style={{
// // // // //               backgroundColor: 'white',
// // // // //               borderRadius: '16px',
// // // // //               width: '100%',
// // // // //               maxWidth: '1200px',
// // // // //               maxHeight: '90vh',
// // // // //               overflow: 'auto',
// // // // //               padding: '24px'
// // // // //             }}
// // // // //           >
// // // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
// // // // //               <div>
// // // // //                 <h2 style={{ fontSize: '24px', margin: 0, fontWeight: 'bold', color: '#1e293b' }}>Choose a Template</h2>
// // // // //                 <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Select a template to start creating your resume</p>
// // // // //               </div>
// // // // //               <button 
// // // // //                 onClick={() => setShowTemplatesModal(false)}
// // // // //                 style={{
// // // // //                   backgroundColor: '#f1f5f9',
// // // // //                   border: '1px solid #e2e8f0',
// // // // //                   borderRadius: '8px',
// // // // //                   padding: '8px 16px',
// // // // //                   fontWeight: '600',
// // // // //                   cursor: 'pointer',
// // // // //                   color: '#475569'
// // // // //                 }}
// // // // //               >
// // // // //                 Close
// // // // //               </button>
// // // // //             </div>

// // // // //             {loadingTemplates ? (
// // // // //               <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
// // // // //                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // // // //                 <div>Loading templates...</div>
// // // // //               </div>
// // // // //             ) : templates.length === 0 ? (
// // // // //               <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
// // // // //                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
// // // // //                 <p>No templates available at the moment. Please check back later.</p>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
// // // // //                 {templates.map((template) => (
// // // // //                   <div 
// // // // //                     key={template.id} 
// // // // //                     style={{
// // // // //                       ...styles.templateCard,
// // // // //                       boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
// // // // //                     }}
// // // // //                     onMouseEnter={(e) => {
// // // // //                       e.currentTarget.style.transform = 'translateY(-4px)';
// // // // //                       e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
// // // // //                       e.currentTarget.style.borderColor = '#3b82f6';
// // // // //                     }}
// // // // //                     onMouseLeave={(e) => {
// // // // //                       e.currentTarget.style.transform = 'translateY(0)';
// // // // //                       e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
// // // // //                       e.currentTarget.style.borderColor = '#e2e8f0';
// // // // //                     }}
// // // // //                   >
// // // // //                     {template.preview_image ? (
// // // // //                       <img 
// // // // //                         src={template.preview_image} 
// // // // //                         alt={template.name}
// // // // //                         style={{ 
// // // // //                           width: '100%', 
// // // // //                           height: '180px', 
// // // // //                           objectFit: 'cover', 
// // // // //                           borderRadius: '8px',
// // // // //                           marginBottom: '16px',
// // // // //                           border: '1px solid #e2e8f0'
// // // // //                         }}
// // // // //                       />
// // // // //                     ) : (
// // // // //                       <div style={{ 
// // // // //                         width: '100%', 
// // // // //                         height: '180px', 
// // // // //                         borderRadius: '8px',
// // // // //                         marginBottom: '16px',
// // // // //                         backgroundColor: template.color || '#3b82f6',
// // // // //                         display: 'flex',
// // // // //                         alignItems: 'center',
// // // // //                         justifyContent: 'center',
// // // // //                         color: 'white',
// // // // //                         fontWeight: 'bold',
// // // // //                         fontSize: '18px'
// // // // //                       }}>
// // // // //                         {template.name}
// // // // //                       </div>
// // // // //                     )}
                    
// // // // //                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
// // // // //                       <div>
// // // // //                         <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{template.name}</h3>
// // // // //                         <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>{template.category || 'General'}</p>
// // // // //                       </div>
// // // // //                       <span style={{ 
// // // // //                         backgroundColor: template.status === 'active' ? '#dcfce7' : '#f3f4f6',
// // // // //                         color: template.status === 'active' ? '#166534' : '#374151',
// // // // //                         fontSize: '10px',
// // // // //                         fontWeight: 'bold',
// // // // //                         padding: '4px 8px',
// // // // //                         borderRadius: '12px'
// // // // //                       }}>
// // // // //                         {template.status === 'active' ? 'Active' : 'Draft'}
// // // // //                       </span>
// // // // //                     </div>
                    
// // // // //                     <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
// // // // //                       <span style={{ 
// // // // //                         backgroundColor: '#e0f2fe',
// // // // //                         color: '#075985',
// // // // //                         fontSize: '11px',
// // // // //                         padding: '2px 8px',
// // // // //                         borderRadius: '12px'
// // // // //                       }}>
// // // // //                         {template.layout || 'Single Column'}
// // // // //                       </span>
// // // // //                       <span style={{ 
// // // // //                         backgroundColor: '#f3f4f6',
// // // // //                         color: '#374151',
// // // // //                         fontSize: '11px',
// // // // //                         padding: '2px 8px',
// // // // //                         borderRadius: '12px'
// // // // //                       }}>
// // // // //                         {template.downloads || 0} downloads
// // // // //                       </span>
// // // // //                     </div>
                    
// // // // //                     <div style={{ display: 'flex', gap: '10px' }}>
// // // // //                       <button 
// // // // //                         onClick={() => handlePreviewTemplate(template)}
// // // // //                         style={{ 
// // // // //                           flex: 1,
// // // // //                           backgroundColor: '#f8fafc',
// // // // //                           border: '1px solid #e2e8f0',
// // // // //                           padding: '10px',
// // // // //                           borderRadius: '8px',
// // // // //                           fontWeight: '600',
// // // // //                           cursor: 'pointer',
// // // // //                           fontSize: '13px',
// // // // //                           color: '#475569',
// // // // //                           display: 'flex',
// // // // //                           alignItems: 'center',
// // // // //                           justifyContent: 'center',
// // // // //                           gap: '6px'
// // // // //                         }}
// // // // //                       >
// // // // //                         <Eye size={14} /> Preview
// // // // //                       </button>
// // // // //                       <button 
// // // // //                         onClick={() => handleCreateResume(template.id)}
// // // // //                         disabled={creatingResume === template.id}
// // // // //                         style={{ 
// // // // //                           flex: 1,
// // // // //                           backgroundColor: creatingResume === template.id ? '#93c5fd' : '#1e40af',
// // // // //                           color: 'white',
// // // // //                           border: 'none',
// // // // //                           padding: '10px',
// // // // //                           borderRadius: '8px',
// // // // //                           fontWeight: '600',
// // // // //                           cursor: 'pointer',
// // // // //                           fontSize: '13px',
// // // // //                           display: 'flex',
// // // // //                           alignItems: 'center',
// // // // //                           justifyContent: 'center',
// // // // //                           gap: '6px'
// // // // //                         }}
// // // // //                       >
// // // // //                         {creatingResume === template.id ? (
// // // // //                           <>
// // // // //                             <Loader2 size={14} className="animate-spin" /> Creating...
// // // // //                           </>
// // // // //                         ) : (
// // // // //                           <>
// // // // //                             <Plus size={14} /> Use This
// // // // //                           </>
// // // // //                         )}
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Global CSS for animations */}
// // // // //       <style>{`
// // // // //         @keyframes fadeIn { 
// // // // //           from { opacity: 0; transform: translateY(10px); } 
// // // // //           to { opacity: 1; transform: translateY(0); } 
// // // // //         }
        
// // // // //         @keyframes spin {
// // // // //           from { transform: rotate(0deg); }
// // // // //           to { transform: rotate(360deg); }
// // // // //         }
        
// // // // //         .animate-spin {
// // // // //           animation: spin 1s linear infinite;
// // // // //         }
        
// // // // //         button:hover:not(:disabled) {
// // // // //           transform: translateY(-1px);
// // // // //         }
        
// // // // //         button:disabled {
// // // // //           opacity: 0.6;
// // // // //           cursor: not-allowed;
// // // // //         }
        
// // // // //         @media (max-width: 768px) {
// // // // //           .stats-grid {
// // // // //             grid-template-columns: repeat(2, 1fr);
// // // // //           }
          
// // // // //           .template-grid {
// // // // //             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
// // // // //           }
          
// // // // //           main {
// // // // //             padding: 20px;
// // // // //           }
          
// // // // //           header {
// // // // //             padding: 12px 20px;
// // // // //           }
// // // // //         }
        
// // // // //         @media (max-width: 480px) {
// // // // //           .stats-grid {
// // // // //             grid-template-columns: 1fr;
// // // // //           }
          
// // // // //           .template-grid {
// // // // //             grid-template-columns: 1fr;
// // // // //           }
          
// // // // //           .tab-buttons {
// // // // //             flex-wrap: wrap;
// // // // //           }
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Dashboard;


// // // // // src/pages/Dashboard.tsx
// // // // import { useEffect, useState } from 'react';
// // // // import { useNavigate } from "react-router-dom";
// // // // import axios from "../api/axiosInstance";
// // // // import {
// // // //   PlusCircle,
// // // //   FileText,
// // // //   CheckCircle,
// // // //   Clock,
// // // //   Download,
// // // //   Crown,
// // // //   Edit3,
// // // //   LogOut,
// // // //   Plus,
// // // //   Eye,
// // // //   Trash2,
// // // //   User,
// // // //   Mail,
// // // //   Phone,
// // // //   MapPin,
// // // //   Loader2,
// // // //   AlertCircle
// // // // } from 'lucide-react';

// // // // // Types
// // // // interface User {
// // // //   id?: string | number;
// // // //   name?: string;
// // // //   email?: string;
// // // //   phone?: string;
// // // //   pincode?: string;
// // // // }

// // // // interface Resume {
// // // //   id: string | number;
// // // //   title?: string;
// // // //   template_name?: string;
// // // //   status: string;
// // // //   updated_at?: string;
// // // //   created_at?: string;
// // // //   download_count?: number;
// // // // }

// // // // interface Template {
// // // //   id: string | number;
// // // //   name: string;
// // // //   preview_image?: string;
// // // //   color?: string;
// // // //   category?: string;
// // // //   status?: string;
// // // //   layout?: string;
// // // //   downloads?: number;
// // // // }

// // // // interface Stats {
// // // //   totalResumes: number;
// // // //   completed: number;
// // // //   inProgress: number;
// // // //   downloads: number;
// // // // }

// // // // function authHeaders() {
// // // //   const token = localStorage.getItem("access") || "";
// // // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // // }

// // // // const Dashboard = () => {
// // // //   const [activeTab, setActiveTab] = useState("home");
// // // //   const navigate = useNavigate();
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [loadingTemplates, setLoadingTemplates] = useState(false);
// // // //   const [loadingResumes, setLoadingResumes] = useState(false);
// // // //   const [stats, setStats] = useState<Stats>({
// // // //     totalResumes: 0,
// // // //     completed: 0,
// // // //     inProgress: 0,
// // // //     downloads: 0
// // // //   });
// // // //   const [resumes, setResumes] = useState<Resume[]>([]);
// // // //   const [templates, setTemplates] = useState<Template[]>([]);
// // // //   const [user, setUser] = useState<User | null>(null);
// // // //   const [showTemplatesModal, setShowTemplatesModal] = useState(false);
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [creatingResume, setCreatingResume] = useState<string | number | null>(null);

// // // //   // Fetch user data and dashboard stats
// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError(null);

// // // //         const storedUser = JSON.parse(localStorage.getItem("user") || "null");
// // // //         if (!storedUser) {
// // // //           navigate("/login", { replace: true });
// // // //           return;
// // // //         }
// // // //         setUser(storedUser);

// // // //         const statsRes = await axios.get("/auth/student/dashboard/stats/", { headers: authHeaders() });
// // // //         setStats(statsRes.data);

// // // //         await fetchResumes();
// // // //       } catch (error) {
// // // //         console.error("Error fetching dashboard data:", error);
// // // //         setError("Failed to load dashboard data. Please try again.");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchData();
// // // //   }, [navigate]);

// // // //   const fetchResumes = async () => {
// // // //     try {
// // // //       setLoadingResumes(true);
// // // //       const resumesRes = await axios.get("/auth/student/resumes/", { headers: authHeaders() });
// // // //       setResumes(resumesRes.data || []);
// // // //     } catch (error) {
// // // //       console.error("Error fetching resumes:", error);
// // // //       setError("Failed to load resumes.");
// // // //     } finally {
// // // //       setLoadingResumes(false);
// // // //     }
// // // //   };

// // // //   const fetchTemplates = async () => {
// // // //     try {
// // // //       setLoadingTemplates(true);
// // // //       const templatesRes = await axios.get("/auth/student/templates/", { headers: authHeaders() });
// // // //       setTemplates(templatesRes.data || []);
// // // //     } catch (error) {
// // // //       console.error("Error fetching templates:", error);
// // // //       setError("Failed to load templates.");
// // // //     } finally {
// // // //       setLoadingTemplates(false);
// // // //     }
// // // //   };

// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem("access");
// // // //     localStorage.removeItem("refresh");
// // // //     localStorage.removeItem("user");
// // // //     navigate("/login", { replace: true });
// // // //   };

// // // //   const handleCreateResume = async (templateId: string | number) => {
// // // //     try {
// // // //       setCreatingResume(templateId);
// // // //       const res = await axios.post(
// // // //         "/auth/student/resumes/",
// // // //         { template_id: templateId, title: "New Resume" },
// // // //         { headers: authHeaders() }
// // // //       );

// // // //       navigate(`/student/resume/edit/${res.data.id}`);
// // // //     } catch (error) {
// // // //       console.error("Error creating resume:", error);
// // // //       alert("Failed to create resume. Please try again.");
// // // //     } finally {
// // // //       setCreatingResume(null);
// // // //       setShowTemplatesModal(false);
// // // //     }
// // // //   };

// // // //   const handleEditResume = (resumeId: string | number) => {
// // // //     navigate(`/student/resume/edit/${resumeId}`);
// // // //   };

// // // //   const handleDeleteResume = async (resumeId: string | number) => {
// // // //     if (!window.confirm("Are you sure you want to delete this resume?")) return;

// // // //     try {
// // // //       await axios.delete(`/auth/student/resumes/${resumeId}/`, { headers: authHeaders() });

// // // //       const updatedResumes = resumes.filter(r => r.id !== resumeId);
// // // //       setResumes(updatedResumes);

// // // //       setStats(prev => ({
// // // //         ...prev,
// // // //         totalResumes: prev.totalResumes - 1,
// // // //         completed: updatedResumes.filter(r => r.status === "completed").length,
// // // //         inProgress: updatedResumes.filter(r => r.status === "draft" || r.status === "in_progress").length
// // // //       }));
// // // //     } catch (error) {
// // // //       console.error("Error deleting resume:", error);
// // // //       alert("Failed to delete resume");
// // // //     }
// // // //   };

// // // //   const handleDownloadResume = async (resumeId: string | number, format: string = 'pdf') => {
// // // //     try {
// // // //       await axios.post(`/auth/student/resumes/${resumeId}/download/`, {}, { headers: authHeaders() });

// // // //       alert(`Download ${format.toUpperCase()} functionality will be implemented soon.`);

// // // //       setResumes(prev => prev.map(r =>
// // // //         r.id === resumeId
// // // //           ? { ...r, download_count: (r.download_count || 0) + 1 }
// // // //           : r
// // // //       ));

// // // //       setStats(prev => ({
// // // //         ...prev,
// // // //         downloads: prev.downloads + 1
// // // //       }));
// // // //     } catch (error) {
// // // //       console.error("Download error:", error);
// // // //       alert("Failed to download");
// // // //     }
// // // //   };

// // // //   const handlePreviewTemplate = (template: Template) => {
// // // //     // Removed unnecessary token check - user is already authenticated
// // // //     navigate(`/student/template/preview/${template.id}`);
// // // //   };

// // // //   const openTemplatesModal = () => {
// // // //     setShowTemplatesModal(true);
// // // //     fetchTemplates();
// // // //   };

// // // //   const formatDate = (dateString: string | undefined) => {
// // // //     if (!dateString) return 'N/A';
// // // //     try {
// // // //       const date = new Date(dateString);
// // // //       return date.toLocaleDateString('en-US', {
// // // //         year: 'numeric',
// // // //         month: 'short',
// // // //         day: 'numeric'
// // // //       });
// // // //     } catch (e) {
// // // //       return dateString || 'N/A';
// // // //     }
// // // //   };

// // // //   const getStatusBadge = (status: string) => {
// // // //     const statusMap: Record<string, { bg: string; color: string; text: string }> = {
// // // //       'draft': { bg: '#f1f5f9', color: '#64748b', text: 'Draft' },
// // // //       'in_progress': { bg: '#fef3c7', color: '#92400e', text: 'In Progress' },
// // // //       'completed': { bg: '#dcfce7', color: '#166534', text: 'Completed' },
// // // //       'published': { bg: '#dbeafe', color: '#1e40af', text: 'Published' }
// // // //     };

// // // //     const statusInfo = statusMap[status] || { bg: '#f3f4f6', color: '#374151', text: status };

// // // //     return (
// // // //       <span style={{
// // // //         backgroundColor: statusInfo.bg,
// // // //         color: statusInfo.color,
// // // //         padding: '4px 12px',
// // // //         borderRadius: '20px',
// // // //         fontSize: '10px',
// // // //         fontWeight: 'bold',
// // // //         textTransform: 'uppercase'
// // // //       } as React.CSSProperties}>
// // // //         {statusInfo.text}
// // // //       </span>
// // // //     );
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div style={{
// // // //         display: 'flex',
// // // //         justifyContent: 'center',
// // // //         alignItems: 'center',
// // // //         minHeight: '100vh',
// // // //         backgroundColor: '#f8fafc'
// // // //       } as React.CSSProperties}>
// // // //         <div style={{ textAlign: 'center' }}>
// // // //           <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // // //           <div style={{ fontSize: '16px', color: '#64748b' }}>Loading Dashboard...</div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Inline CSS styles (with proper casting where needed)
// // // //   const styles = {
// // // //     pageContainer: {
// // // //       backgroundColor: '#f8fafc',
// // // //       minHeight: '100vh',
// // // //       width: '100vw',
// // // //       display: 'flex',
// // // //       flexDirection: 'column' as const,
// // // //       fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
// // // //       margin: 0,
// // // //       padding: 0,
// // // //       boxSizing: 'border-box' as const
// // // //     },
// // // //     headerStyle: {
// // // //       backgroundColor: '#fff',
// // // //       borderBottom: '1px solid #e2e8f0',
// // // //       padding: '12px 40px',
// // // //       display: 'flex',
// // // //       justifyContent: 'space-between',
// // // //       alignItems: 'center',
// // // //       width: '100%',
// // // //       boxSizing: 'border-box' as const,
// // // //       position: 'sticky' as const,
// // // //       top: 0,
// // // //       zIndex: 100,
// // // //       boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
// // // //     },
// // // //     mainContent: {
// // // //       width: '100%',
// // // //       maxWidth: '1200px',
// // // //       margin: '0 auto',
// // // //       padding: '40px',
// // // //       boxSizing: 'border-box' as const,
// // // //       flex: 1
// // // //     },
// // // //     statsGrid: {
// // // //       display: 'grid',
// // // //       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
// // // //       gap: '20px',
// // // //       marginBottom: '32px'
// // // //     },
// // // //     cardBase: {
// // // //       backgroundColor: '#fff',
// // // //       border: '1px solid #e2e8f0',
// // // //       borderRadius: '12px',
// // // //       padding: '24px',
// // // //       boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
// // // //       transition: 'transform 0.2s, box-shadow 0.2s'
// // // //     },
// // // //     upgradeBox: {
// // // //       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // //       borderRadius: '16px',
// // // //       padding: '30px',
// // // //       display: 'flex',
// // // //       justifyContent: 'space-between',
// // // //       alignItems: 'center',
// // // //       marginBottom: '40px',
// // // //       color: 'white'
// // // //     },
// // // //     resumeItemStyle: {
// // // //       backgroundColor: '#fff',
// // // //       border: '1px solid #e2e8f0',
// // // //       borderRadius: '12px',
// // // //       padding: '16px 24px',
// // // //       display: 'flex',
// // // //       justifyContent: 'space-between',
// // // //       alignItems: 'center',
// // // //       marginBottom: '12px',
// // // //       transition: 'all 0.2s'
// // // //     },
// // // //     profileDetailCard: {
// // // //       backgroundColor: "#fff",
// // // //       padding: "30px",
// // // //       borderRadius: "16px",
// // // //       border: "1px solid #e2e8f0",
// // // //       boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
// // // //     },
// // // //     detailRow: {
// // // //       display: "flex",
// // // //       justifyContent: "space-between",
// // // //       padding: "16px 0",
// // // //       borderBottom: "1px solid #f1f5f9",
// // // //       gap: "16px"
// // // //     },
// // // //     templateCard: {
// // // //       backgroundColor: '#fff',
// // // //       border: '1px solid #e2e8f0',
// // // //       borderRadius: '12px',
// // // //       padding: '20px',
// // // //       transition: 'all 0.3s ease',
// // // //       cursor: 'pointer'
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={styles.pageContainer as React.CSSProperties}>
// // // //       {/* Navbar */}
// // // //       <header style={styles.headerStyle as React.CSSProperties}>
// // // //         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
// // // //           <div style={{ backgroundColor: '#1e40af', padding: '8px', borderRadius: '8px' }}>
// // // //             <FileText color="white" size={20} />
// // // //           </div>
// // // //           <div style={{ lineHeight: 1.2 }}>
// // // //             <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1e293b' }}>Resume Builder Pro</div>
// // // //             <div style={{ fontSize: '12px', color: '#64748b' }}>Student Dashboard</div>
// // // //           </div>
// // // //         </div>
// // // //         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
// // // //           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// // // //             <User size={16} color="#64748b" />
// // // //             <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>{user?.name || 'Student'}</span>
// // // //           </div>
// // // //           <span style={{ border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>FREE Plan</span>
// // // //           <div
// // // //             style={{ cursor: 'pointer' }}
// // // //             onClick={handleLogout}
// // // //             title="Logout"
// // // //           >
// // // //             <LogOut size={20} color="#94a3b8" />
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Content Area */}
// // // //       <main style={styles.mainContent as React.CSSProperties}>
// // // //         {/* Error Display */}
// // // //         {error && (
// // // //           <div style={{
// // // //             backgroundColor: '#fee2e2',
// // // //             border: '1px solid #fecaca',
// // // //             color: '#dc2626',
// // // //             padding: '16px',
// // // //             borderRadius: '12px',
// // // //             marginBottom: '24px',
// // // //             display: 'flex',
// // // //             alignItems: 'center',
// // // //             gap: '12px'
// // // //           } as React.CSSProperties}>
// // // //             <AlertCircle size={20} />
// // // //             <span>{error}</span>
// // // //           </div>
// // // //         )}

// // // //         {/* Tabs */}
// // // //         <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
// // // //           <button
// // // //             onClick={() => setActiveTab("home")}
// // // //             style={{
// // // //               backgroundColor: activeTab === "home" ? '#1e40af' : 'transparent',
// // // //               color: activeTab === "home" ? 'white' : '#64748b',
// // // //               border: 'none',
// // // //               padding: '10px 20px',
// // // //               borderRadius: '8px',
// // // //               fontSize: '14px',
// // // //               fontWeight: '500',
// // // //               cursor: 'pointer',
// // // //               transition: 'all 0.2s'
// // // //             } as React.CSSProperties}
// // // //           >
// // // //             Overview
// // // //           </button>

// // // //           <button
// // // //             onClick={() => setActiveTab("resumes")}
// // // //             style={{
// // // //               backgroundColor: activeTab === "resumes" ? '#1e40af' : 'transparent',
// // // //               color: activeTab === "resumes" ? 'white' : '#64748b',
// // // //               border: 'none',
// // // //               padding: '10px 20px',
// // // //               borderRadius: '8px',
// // // //               fontSize: '14px',
// // // //               fontWeight: '500',
// // // //               cursor: 'pointer',
// // // //               transition: 'all 0.2s'
// // // //             } as React.CSSProperties}
// // // //           >
// // // //             My Resumes
// // // //           </button>

// // // //           <button
// // // //             onClick={() => setActiveTab("profile")}
// // // //             style={{
// // // //               backgroundColor: activeTab === "profile" ? '#1e40af' : 'transparent',
// // // //               color: activeTab === "profile" ? 'white' : '#64748b',
// // // //               border: 'none',
// // // //               padding: '10px 20px',
// // // //               borderRadius: '8px',
// // // //               fontSize: '14px',
// // // //               fontWeight: '500',
// // // //               cursor: 'pointer',
// // // //               transition: 'all 0.2s'
// // // //             } as React.CSSProperties}
// // // //           >
// // // //             Profile
// // // //           </button>

// // // //           <button
// // // //             onClick={openTemplatesModal}
// // // //             style={{
// // // //               backgroundColor: '#10b981',
// // // //               color: 'white',
// // // //               border: 'none',
// // // //               padding: '10px 20px',
// // // //               borderRadius: '8px',
// // // //               fontSize: '14px',
// // // //               fontWeight: '500',
// // // //               cursor: 'pointer',
// // // //               marginLeft: 'auto',
// // // //               display: 'flex',
// // // //               alignItems: 'center',
// // // //               gap: '8px'
// // // //             } as React.CSSProperties}
// // // //           >
// // // //             <Plus size={16} /> Browse Templates
// // // //           </button>
// // // //         </div>

// // // //         {activeTab === "home" ? (
// // // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // // //             {/* Hero Section */}
// // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
// // // //               <div>
// // // //                 <h1 style={{ fontSize: '32px', margin: 0, fontWeight: '800', color: '#0f172a' }}>Welcome back, {user?.name || "Student"}!</h1>
// // // //                 <p style={{ color: '#64748b', marginTop: '4px', fontSize: '16px' }}>Create professional resumes in minutes</p>
// // // //               </div>
// // // //               <button
// // // //                 onClick={openTemplatesModal}
// // // //                 style={{
// // // //                   backgroundColor: '#1e40af',
// // // //                   color: 'white',
// // // //                   border: 'none',
// // // //                   padding: '12px 24px',
// // // //                   borderRadius: '8px',
// // // //                   fontWeight: '600',
// // // //                   display: 'flex',
// // // //                   alignItems: 'center',
// // // //                   gap: '10px',
// // // //                   cursor: 'pointer',
// // // //                   fontSize: '14px',
// // // //                   transition: 'background-color 0.2s'
// // // //                 } as React.CSSProperties}
// // // //               >
// // // //                 <Plus size={18} strokeWidth={3} /> Create New Resume
// // // //               </button>
// // // //             </div>

// // // //             {/* Stats Grid */}
// // // //             <div style={styles.statsGrid}>
// // // //               <div style={styles.cardBase}>
// // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // // //                   <FileText size={16} /> Total Resumes
// // // //                 </div>
// // // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b' }}>{stats.totalResumes}</div>
// // // //               </div>
// // // //               <div style={styles.cardBase}>
// // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // // //                   <CheckCircle size={16} color="#22c55e" /> Completed
// // // //                 </div>
// // // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a' }}>{stats.completed}</div>
// // // //               </div>
// // // //               <div style={styles.cardBase}>
// // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // // //                   <Clock size={16} color="#f59e0b" /> In Progress
// // // //                 </div>
// // // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#d97706' }}>{stats.inProgress}</div>
// // // //               </div>
// // // //               <div style={styles.cardBase}>
// // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // // //                   <Download size={16} /> Downloads
// // // //                 </div>
// // // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b' }}>{stats.downloads}</div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Upgrade Banner */}
// // // //             <div style={styles.upgradeBox}>
// // // //               <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
// // // //                 <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%', display: 'flex' }}>
// // // //                   <Crown color="white" size={24} />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: 'white' }}>Upgrade to Pro</h2>
// // // //                   <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', marginBottom: '12px' }}>Unlock premium templates, AI features, and unlimited downloads</p>
// // // //                   <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'rgba(255,255,255,0.9)' }}>
// // // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> Access to all premium templates</div>
// // // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> AI-powered content suggestions</div>
// // // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> Priority support</div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //               <div style={{ textAlign: 'right' }}>
// // // //                 <div style={{ fontSize: '32px', fontWeight: '900', color: 'white' }}>₹999<span style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(255,255,255,0.9)' }}>/year</span></div>
// // // //                 <button style={{
// // // //                   backgroundColor: 'white',
// // // //                   color: '#1e40af',
// // // //                   border: 'none',
// // // //                   padding: '10px 24px',
// // // //                   borderRadius: '6px',
// // // //                   fontWeight: 'bold',
// // // //                   marginTop: '12px',
// // // //                   cursor: 'pointer',
// // // //                   display: 'flex',
// // // //                   alignItems: 'center',
// // // //                   gap: '8px'
// // // //                 } as React.CSSProperties}>
// // // //                   <PlusCircle size={16} /> Upgrade Now
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* Recent Resumes List */}
// // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
// // // //               <div>
// // // //                 <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '18px', color: '#0f172a' }}>Recent Resumes</h3>
// // // //                 <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>Your recently modified resumes</p>
// // // //               </div>
// // // //               {resumes.length > 0 && (
// // // //                 <button
// // // //                   onClick={() => setActiveTab("resumes")}
// // // //                   style={{
// // // //                     backgroundColor: '#fff',
// // // //                     border: '1px solid #e2e8f0',
// // // //                     borderRadius: '6px',
// // // //                     padding: '6px 12px',
// // // //                     fontSize: '12px',
// // // //                     fontWeight: 'bold',
// // // //                     display: 'flex',
// // // //                     alignItems: 'center',
// // // //                     gap: '8px',
// // // //                     cursor: 'pointer',
// // // //                     color: '#475569'
// // // //                   } as React.CSSProperties}
// // // //                 >
// // // //                   View All
// // // //                 </button>
// // // //               )}
// // // //             </div>

// // // //             {/* Resume Rows */}
// // // //             {loadingResumes ? (
// // // //               <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
// // // //                 <Loader2 size={24} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // // //                 <div>Loading resumes...</div>
// // // //               </div>
// // // //             ) : resumes.length === 0 ? (
// // // //               <div style={{
// // // //                 backgroundColor: '#fff',
// // // //                 border: '2px dashed #e2e8f0',
// // // //                 borderRadius: '12px',
// // // //                 padding: '60px 20px',
// // // //                 textAlign: 'center',
// // // //                 marginTop: '20px'
// // // //               } as React.CSSProperties}>
// // // //                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
// // // //                 <h3 style={{ color: '#64748b', marginBottom: '8px' }}>No Resumes Yet</h3>
// // // //                 <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Create your first resume to get started</p>
// // // //                 <button
// // // //                   onClick={openTemplatesModal}
// // // //                   style={{
// // // //                     backgroundColor: '#1e40af',
// // // //                     color: 'white',
// // // //                     border: 'none',
// // // //                     padding: '10px 20px',
// // // //                     borderRadius: '8px',
// // // //                     fontWeight: '600',
// // // //                     cursor: 'pointer'
// // // //                   } as React.CSSProperties}
// // // //                 >
// // // //                   Create First Resume
// // // //                 </button>
// // // //               </div>
// // // //             ) : (
// // // //               resumes.slice(0, 5).map((resume) => (
// // // //                 <div
// // // //                   key={resume.id}
// // // //                   style={{
// // // //                     ...styles.resumeItemStyle,
// // // //                     boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
// // // //                   } as React.CSSProperties}
// // // //                   onMouseEnter={(e) => {
// // // //                     e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
// // // //                     e.currentTarget.style.borderColor = '#cbd5e1';
// // // //                   }}
// // // //                   onMouseLeave={(e) => {
// // // //                     e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
// // // //                     e.currentTarget.style.borderColor = '#e2e8f0';
// // // //                   }}
// // // //                 >
// // // //                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
// // // //                     <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '10px' }}>
// // // //                       <FileText color="#2563eb" size={24} />
// // // //                     </div>
// // // //                     <div>
// // // //                       <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{resume.title || 'Untitled Resume'}</div>
// // // //                       <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
// // // //                         Template: {resume.template_name || 'Default'} • Modified {formatDate(resume.updated_at)}
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
// // // //                     {getStatusBadge(resume.status)}
// // // //                     <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
// // // //                       <div
// // // //                         style={{ cursor: 'pointer' }}
// // // //                         onClick={() => handleEditResume(resume.id)}
// // // //                         title="Edit Resume"
// // // //                       >
// // // //                         <Edit3 size={18} />
// // // //                       </div>
// // // //                       <div
// // // //                         style={{ cursor: 'pointer' }}
// // // //                         onClick={() => handleDownloadResume(resume.id, 'pdf')}
// // // //                         title="Download PDF"
// // // //                       >
// // // //                         <Download size={18} />
// // // //                       </div>
// // // //                       <div
// // // //                         style={{ cursor: 'pointer', color: '#ef4444' }}
// // // //                         onClick={() => handleDeleteResume(resume.id)}
// // // //                         title="Delete Resume"
// // // //                       >
// // // //                         <Trash2 size={18} />
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               ))
// // // //             )}
// // // //           </div>
// // // //         ) : activeTab === "resumes" ? (
// // // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
// // // //               <div>
// // // //                 <h1 style={{ fontSize: '28px', margin: 0, fontWeight: '800', color: '#0f172a' }}>My Resumes</h1>
// // // //                 <p style={{ color: '#64748b', marginTop: '4px' }}>Manage all your created resumes</p>
// // // //               </div>
// // // //               <button
// // // //                 onClick={openTemplatesModal}
// // // //                 style={{
// // // //                   backgroundColor: '#1e40af',
// // // //                   color: 'white',
// // // //                   border: 'none',
// // // //                   padding: '10px 20px',
// // // //                   borderRadius: '8px',
// // // //                   fontWeight: '600',
// // // //                   display: 'flex',
// // // //                   alignItems: 'center',
// // // //                   gap: '10px',
// // // //                   cursor: 'pointer'
// // // //                 } as React.CSSProperties}
// // // //               >
// // // //                 <Plus size={16} /> Create New
// // // //               </button>
// // // //             </div>

// // // //             {loadingResumes ? (
// // // //               <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
// // // //                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // // //                 <div>Loading your resumes...</div>
// // // //               </div>
// // // //             ) : resumes.length === 0 ? (
// // // //               <div style={{
// // // //                 backgroundColor: '#fff',
// // // //                 border: '2px dashed #e2e8f0',
// // // //                 borderRadius: '12px',
// // // //                 padding: '80px 20px',
// // // //                 textAlign: 'center',
// // // //                 marginTop: '40px'
// // // //               } as React.CSSProperties}>
// // // //                 <FileText size={64} color="#cbd5e1" style={{ marginBottom: '20px' }} />
// // // //                 <h2 style={{ color: '#64748b', marginBottom: '12px' }}>No Resumes Created Yet</h2>
// // // //                 <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
// // // //                   Start by choosing a template and creating your first professional resume
// // // //                 </p>
// // // //                 <button
// // // //                   onClick={openTemplatesModal}
// // // //                   style={{
// // // //                     backgroundColor: '#1e40af',
// // // //                     color: 'white',
// // // //                     border: 'none',
// // // //                     padding: '12px 28px',
// // // //                     borderRadius: '8px',
// // // //                     fontWeight: '600',
// // // //                     cursor: 'pointer',
// // // //                     fontSize: '16px'
// // // //                   } as React.CSSProperties}
// // // //                 >
// // // //                   Browse Templates
// // // //                 </button>
// // // //               </div>
// // // //             ) : (
// // // //               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
// // // //                 {resumes.map((resume) => (
// // // //                   <div
// // // //                     key={resume.id}
// // // //                     style={{
// // // //                       backgroundColor: '#fff',
// // // //                       border: '1px solid #e2e8f0',
// // // //                       borderRadius: '12px',
// // // //                       padding: '20px',
// // // //                       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
// // // //                       transition: 'all 0.3s'
// // // //                     } as React.CSSProperties}
// // // //                   >
// // // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
// // // //                       <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '8px' }}>
// // // //                         <FileText color="#2563eb" size={20} />
// // // //                       </div>
// // // //                       <div style={{ flex: 1 }}>
// // // //                         <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{resume.title || 'Untitled Resume'}</div>
// // // //                         <div style={{ fontSize: '12px', color: '#64748b' }}>Created: {formatDate(resume.created_at)}</div>
// // // //                       </div>
// // // //                       {getStatusBadge(resume.status)}
// // // //                     </div>

// // // //                     <div style={{ marginBottom: '16px' }}>
// // // //                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Template</div>
// // // //                       <div style={{ fontWeight: '500', color: '#475569' }}>{resume.template_name || 'Default'}</div>
// // // //                     </div>

// // // //                     <div style={{ marginBottom: '16px' }}>
// // // //                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Downloads</div>
// // // //                       <div style={{ fontWeight: '500', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
// // // //                         <Download size={14} /> {resume.download_count || 0}
// // // //                       </div>
// // // //                     </div>

// // // //                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
// // // //                       <button
// // // //                         onClick={() => handleEditResume(resume.id)}
// // // //                         style={{
// // // //                           backgroundColor: '#f8fafc',
// // // //                           border: '1px solid #e2e8f0',
// // // //                           padding: '10px',
// // // //                           borderRadius: '8px',
// // // //                           fontWeight: '600',
// // // //                           cursor: 'pointer',
// // // //                           display: 'flex',
// // // //                           alignItems: 'center',
// // // //                           justifyContent: 'center',
// // // //                           gap: '6px',
// // // //                           fontSize: '13px',
// // // //                           color: '#475569'
// // // //                         } as React.CSSProperties}
// // // //                       >
// // // //                         <Edit3 size={14} /> Edit
// // // //                       </button>
// // // //                       <button
// // // //                         onClick={() => handleDownloadResume(resume.id, 'pdf')}
// // // //                         style={{
// // // //                           backgroundColor: '#1e40af',
// // // //                           color: 'white',
// // // //                           border: 'none',
// // // //                           padding: '10px',
// // // //                           borderRadius: '8px',
// // // //                           fontWeight: '600',
// // // //                           cursor: 'pointer',
// // // //                           display: 'flex',
// // // //                           alignItems: 'center',
// // // //                           justifyContent: 'center',
// // // //                           gap: '6px',
// // // //                           fontSize: '13px'
// // // //                         } as React.CSSProperties}
// // // //                       >
// // // //                         <Download size={14} /> PDF
// // // //                       </button>
// // // //                       <button
// // // //                         onClick={() => handleDownloadResume(resume.id, 'word')}
// // // //                         style={{
// // // //                           backgroundColor: '#10b981',
// // // //                           color: 'white',
// // // //                           border: 'none',
// // // //                           padding: '10px',
// // // //                           borderRadius: '8px',
// // // //                           fontWeight: '600',
// // // //                           cursor: 'pointer',
// // // //                           display: 'flex',
// // // //                           alignItems: 'center',
// // // //                           justifyContent: 'center',
// // // //                           gap: '6px',
// // // //                           fontSize: '13px'
// // // //                         } as React.CSSProperties}
// // // //                       >
// // // //                         <FileText size={14} /> Word
// // // //                       </button>
// // // //                       <button
// // // //                         onClick={() => handleDeleteResume(resume.id)}
// // // //                         style={{
// // // //                           backgroundColor: '#fee2e2',
// // // //                           color: '#dc2626',
// // // //                           border: '1px solid #fecaca',
// // // //                           padding: '10px',
// // // //                           borderRadius: '8px',
// // // //                           fontWeight: '600',
// // // //                           cursor: 'pointer',
// // // //                           display: 'flex',
// // // //                           alignItems: 'center',
// // // //                           justifyContent: 'center',
// // // //                           gap: '6px',
// // // //                           fontSize: '13px'
// // // //                         } as React.CSSProperties}
// // // //                       >
// // // //                         <Trash2 size={14} /> Delete
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         ) : (
// // // //           /* Profile Section */
// // // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // // //             <h1 style={{ fontSize: '32px', margin: "0 0 20px 0", fontWeight: '800', color: '#0f172a' }}>My Profile Details</h1>

// // // //             <div style={styles.profileDetailCard}>
// // // //               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
// // // //                 <div style={{
// // // //                   backgroundColor: '#1e40af',
// // // //                   width: '60px',
// // // //                   height: '60px',
// // // //                   borderRadius: '50%',
// // // //                   display: 'flex',
// // // //                   alignItems: 'center',
// // // //                   justifyContent: 'center',
// // // //                   color: 'white',
// // // //                   fontSize: '24px',
// // // //                   fontWeight: 'bold'
// // // //                 } as React.CSSProperties}>
// // // //                   {user?.name?.charAt(0)?.toUpperCase() || 'S'}
// // // //                 </div>
// // // //                 <div>
// // // //                   <h2 style={{ margin: 0, color: '#1e293b' }}>{user?.name || 'Student'}</h2>
// // // //                   <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Student Account</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div style={styles.detailRow}>
// // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// // // //                   <User size={16} color="#64748b" />
// // // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Full Name</span>
// // // //                 </div>
// // // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.name || "N/A"}</span>
// // // //               </div>
// // // //               <div style={styles.detailRow}>
// // // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// // // //                   <Phone size={16} color="#64748b" />
// // // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Mobile Number</span>
// // // //                 </div>
// // // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.phone ? `+91 ${user.phone}` : "N/A"}</span>
// // // //               </div>
// // // //               <div style={styles.detailRow}>
// // // //                 <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
// // // //                   <Mail size={16} color="#64748b" />
// // // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Email Address</span>
// // // //                 </div>
// // // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.email || "N/A"}</span>
// // // //               </div>
// // // //               <div style={styles.detailRow}>
// // // //                 <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
// // // //                   <MapPin size={16} color="#64748b" />
// // // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Pincode</span>
// // // //                 </div>
// // // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.pincode || "N/A"}</span>
// // // //               </div>
// // // //               <div style={{ ...styles.detailRow, borderBottom: "none" }}>
// // // //                 <span style={{ fontWeight: "900", color: "#64748b" }}>User ID</span>
// // // //                 <span style={{ fontWeight: "800", color: "#64748b", fontSize: "12px" }}>
// // // //                   {user?.id || "N/A"}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //             <button
// // // //               onClick={handleLogout}
// // // //               style={{
// // // //                 marginTop: '32px',
// // // //                 padding: '14px 24px',
// // // //                 backgroundColor: '#fee2e2',
// // // //                 color: '#dc2626',
// // // //                 border: '1px solid #fecaca',
// // // //                 borderRadius: '12px',
// // // //                 cursor: 'pointer',
// // // //                 fontWeight: '900',
// // // //                 fontSize: '14px',
// // // //                 display: 'flex',
// // // //                 alignItems: 'center',
// // // //                 gap: '8px'
// // // //               } as React.CSSProperties}
// // // //             >
// // // //               <LogOut size={16} /> Logout from Dashboard
// // // //             </button>
// // // //           </div>
// // // //         )}
// // // //       </main>

// // // //       {/* Templates Modal */}
// // // //       {showTemplatesModal && (
// // // //         <div
// // // //           onClick={() => setShowTemplatesModal(false)}
// // // //           style={{
// // // //             position: 'fixed',
// // // //             top: 0,
// // // //             left: 0,
// // // //             right: 0,
// // // //             bottom: 0,
// // // //             backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // // //             display: 'flex',
// // // //             justifyContent: 'center',
// // // //             alignItems: 'center',
// // // //             zIndex: 1000,
// // // //             padding: '20px'
// // // //           } as React.CSSProperties}
// // // //         >
// // // //           <div
// // // //             onClick={(e) => e.stopPropagation()}
// // // //             style={{
// // // //               backgroundColor: 'white',
// // // //               borderRadius: '16px',
// // // //               width: '100%',
// // // //               maxWidth: '1200px',
// // // //               maxHeight: '90vh',
// // // //               overflow: 'auto',
// // // //               padding: '24px'
// // // //             } as React.CSSProperties}
// // // //           >
// // // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
// // // //               <div>
// // // //                 <h2 style={{ fontSize: '24px', margin: 0, fontWeight: 'bold', color: '#1e293b' }}>Choose a Template</h2>
// // // //                 <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Select a template to start creating your resume</p>
// // // //               </div>
// // // //               <button
// // // //                 onClick={() => setShowTemplatesModal(false)}
// // // //                 style={{
// // // //                   backgroundColor: '#f1f5f9',
// // // //                   border: '1px solid #e2e8f0',
// // // //                   borderRadius: '8px',
// // // //                   padding: '8px 16px',
// // // //                   fontWeight: '600',
// // // //                   cursor: 'pointer',
// // // //                   color: '#475569'
// // // //                 } as React.CSSProperties}
// // // //               >
// // // //                 Close
// // // //               </button>
// // // //             </div>

// // // //             {loadingTemplates ? (
// // // //               <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
// // // //                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // // //                 <div>Loading templates...</div>
// // // //               </div>
// // // //             ) : templates.length === 0 ? (
// // // //               <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
// // // //                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
// // // //                 <p>No templates available at the moment. Please check back later.</p>
// // // //               </div>
// // // //             ) : (
// // // //               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
// // // //                 {templates.map((template) => (
// // // //                   <div
// // // //                     key={template.id}
// // // //                     style={{
// // // //                       ...styles.templateCard,
// // // //                       boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
// // // //                     } as React.CSSProperties}
// // // //                     onMouseEnter={(e) => {
// // // //                       e.currentTarget.style.transform = 'translateY(-4px)';
// // // //                       e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
// // // //                       e.currentTarget.style.borderColor = '#3b82f6';
// // // //                     }}
// // // //                     onMouseLeave={(e) => {
// // // //                       e.currentTarget.style.transform = 'translateY(0)';
// // // //                       e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
// // // //                       e.currentTarget.style.borderColor = '#e2e8f0';
// // // //                     }}
// // // //                   >
// // // //                     {template.preview_image ? (
// // // //                       <img
// // // //                         src={template.preview_image}
// // // //                         alt={template.name}
// // // //                         style={{
// // // //                           width: '100%',
// // // //                           height: '180px',
// // // //                           objectFit: 'cover',
// // // //                           borderRadius: '8px',
// // // //                           marginBottom: '16px',
// // // //                           border: '1px solid #e2e8f0'
// // // //                         } as React.CSSProperties}
// // // //                       />
// // // //                     ) : (
// // // //                       <div style={{
// // // //                         width: '100%',
// // // //                         height: '180px',
// // // //                         borderRadius: '8px',
// // // //                         marginBottom: '16px',
// // // //                         backgroundColor: template.color || '#3b82f6',
// // // //                         display: 'flex',
// // // //                         alignItems: 'center',
// // // //                         justifyContent: 'center',
// // // //                         color: 'white',
// // // //                         fontWeight: 'bold',
// // // //                         fontSize: '18px'
// // // //                       } as React.CSSProperties}>
// // // //                         {template.name}
// // // //                       </div>
// // // //                     )}

// // // //                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
// // // //                       <div>
// // // //                         <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{template.name}</h3>
// // // //                         <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>{template.category || 'General'}</p>
// // // //                       </div>
// // // //                       <span style={{
// // // //                         backgroundColor: template.status === 'active' ? '#dcfce7' : '#f3f4f6',
// // // //                         color: template.status === 'active' ? '#166534' : '#374151',
// // // //                         fontSize: '10px',
// // // //                         fontWeight: 'bold',
// // // //                         padding: '4px 8px',
// // // //                         borderRadius: '12px'
// // // //                       } as React.CSSProperties}>
// // // //                         {template.status === 'active' ? 'Active' : 'Draft'}
// // // //                       </span>
// // // //                     </div>

// // // //                     <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
// // // //                       <span style={{
// // // //                         backgroundColor: '#e0f2fe',
// // // //                         color: '#075985',
// // // //                         fontSize: '11px',
// // // //                         padding: '2px 8px',
// // // //                         borderRadius: '12px'
// // // //                       } as React.CSSProperties}>
// // // //                         {template.layout || 'Single Column'}
// // // //                       </span>
// // // //                       <span style={{
// // // //                         backgroundColor: '#f3f4f6',
// // // //                         color: '#374151',
// // // //                         fontSize: '11px',
// // // //                         padding: '2px 8px',
// // // //                         borderRadius: '12px'
// // // //                       } as React.CSSProperties}>
// // // //                         {template.downloads || 0} downloads
// // // //                       </span>
// // // //                     </div>

// // // //                     <div style={{ display: 'flex', gap: '10px' }}>
// // // //                       <button
// // // //                         onClick={() => handlePreviewTemplate(template)}
// // // //                         style={{
// // // //                           flex: 1,
// // // //                           backgroundColor: '#f8fafc',
// // // //                           border: '1px solid #e2e8f0',
// // // //                           padding: '10px',
// // // //                           borderRadius: '8px',
// // // //                           fontWeight: '600',
// // // //                           cursor: 'pointer',
// // // //                           fontSize: '13px',
// // // //                           color: '#475569',
// // // //                           display: 'flex',
// // // //                           alignItems: 'center',
// // // //                           justifyContent: 'center',
// // // //                           gap: '6px'
// // // //                         } as React.CSSProperties}
// // // //                       >
// // // //                         <Eye size={14} /> Preview
// // // //                       </button>
// // // //                       <button
// // // //                         onClick={() => handleCreateResume(template.id)}
// // // //                         disabled={creatingResume === template.id}
// // // //                         style={{
// // // //                           flex: 1,
// // // //                           backgroundColor: creatingResume === template.id ? '#93c5fd' : '#1e40af',
// // // //                           color: 'white',
// // // //                           border: 'none',
// // // //                           padding: '10px',
// // // //                           borderRadius: '8px',
// // // //                           fontWeight: '600',
// // // //                           cursor: 'pointer',
// // // //                           fontSize: '13px',
// // // //                           display: 'flex',
// // // //                           alignItems: 'center',
// // // //                           justifyContent: 'center',
// // // //                           gap: '6px'
// // // //                         } as React.CSSProperties}
// // // //                       >
// // // //                         {creatingResume === template.id ? (
// // // //                           <>
// // // //                             <Loader2 size={14} className="animate-spin" /> Creating...
// // // //                           </>
// // // //                         ) : (
// // // //                           <>
// // // //                             <Plus size={14} /> Use This
// // // //                           </>
// // // //                         )}
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Global CSS for animations */}
// // // //       <style>{`
// // // //         @keyframes fadeIn {
// // // //           from { opacity: 0; transform: translateY(10px); }
// // // //           to { opacity: 1; transform: translateY(0); }
// // // //         }
// // // //         @keyframes spin {
// // // //           from { transform: rotate(0deg); }
// // // //           to { transform: rotate(360deg); }
// // // //         }
// // // //         .animate-spin {
// // // //           animation: spin 1s linear infinite;
// // // //         }
// // // //         button:hover:not(:disabled) {
// // // //           transform: translateY(-1px);
// // // //         }
// // // //         button:disabled {
// // // //           opacity: 0.6;
// // // //           cursor: not-allowed;
// // // //         }
// // // //         @media (max-width: 768px) {
// // // //           .stats-grid {
// // // //             grid-template-columns: repeat(2, 1fr);
// // // //           }
// // // //           main {
// // // //             padding: 20px;
// // // //           }
// // // //           header {
// // // //             padding: 12px 20px;
// // // //           }
// // // //         }
// // // //         @media (max-width: 480px) {
// // // //           .stats-grid {
// // // //             grid-template-columns: 1fr;
// // // //           }
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;

// // // // src/pages/Dashboard.tsx
// // // import React, { useEffect, useState } from 'react';
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "../api/axiosInstance";
// // // import { 
// // //   PlusCircle, 
// // //   FileText, 
// // //   CheckCircle, 
// // //   Clock, 
// // //   Download, 
// // //   Crown, 
// // //   Edit3, 
// // //   LogOut,
// // //   Plus,
// // //   Eye,
// // //   Trash2,
// // //   User,
// // //   Mail,
// // //   Phone,
// // //   MapPin,
// // //   Loader2,
// // //   AlertCircle
// // // } from 'lucide-react';

// // // function authHeaders() {
// // //   const token = localStorage.getItem("access") || "";
// // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // }

// // // // Define TypeScript interfaces
// // // interface User {
// // //   id?: number;
// // //   name?: string;
// // //   email?: string;
// // //   phone?: string;
// // //   pincode?: string;
// // // }

// // // interface Stats {
// // //   totalResumes: number;
// // //   completed: number;
// // //   inProgress: number;
// // //   downloads: number;
// // // }

// // // interface Resume {
// // //   id: number;
// // //   title: string;
// // //   status: 'draft' | 'in_progress' | 'completed' | 'published' | string;
// // //   template_name: string;
// // //   updated_at: string;
// // //   created_at: string;
// // //   download_count?: number;
// // // }

// // // interface Template {
// // //   id: number;
// // //   name: string;
// // //   category?: string;
// // //   status: string;
// // //   layout?: string;
// // //   downloads?: number;
// // //   preview_image?: string;
// // //   color?: string;
// // // }

// // // const Dashboard = () => {
// // //   const [activeTab, setActiveTab] = useState<"home" | "resumes" | "profile">("home");
// // //   const navigate = useNavigate();
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [loadingTemplates, setLoadingTemplates] = useState<boolean>(false);
// // //   const [loadingResumes, setLoadingResumes] = useState<boolean>(false);
// // //   const [stats, setStats] = useState<Stats>({
// // //     totalResumes: 0,
// // //     completed: 0,
// // //     inProgress: 0,
// // //     downloads: 0
// // //   });
// // //   const [resumes, setResumes] = useState<Resume[]>([]);
// // //   const [templates, setTemplates] = useState<Template[]>([]);
// // //   const [user, setUser] = useState<User | null>(null);
// // //   const [showTemplatesModal, setShowTemplatesModal] = useState<boolean>(false);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [creatingResume, setCreatingResume] = useState<number | null>(null);

// // //   // Fetch user data and dashboard stats
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError(null);
        
// // //         // Get user data from localStorage
// // //         const storedUser = JSON.parse(localStorage.getItem("user") || "null") as User;
// // //         if (!storedUser) {
// // //           navigate("/login", { replace: true });
// // //           return;
// // //         }
// // //         setUser(storedUser);

// // //         // Fetch dashboard stats
// // //         const statsRes = await axios.get("/auth/student/dashboard/stats/", { headers: authHeaders() });
// // //         setStats(statsRes.data as Stats);

// // //         // Fetch student's resumes
// // //         await fetchResumes();

// // //       } catch (error) {
// // //         console.error("Error fetching dashboard data:", error);
// // //         setError("Failed to load dashboard data. Please try again.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [navigate]);

// // //   const fetchResumes = async (): Promise<void> => {
// // //     try {
// // //       setLoadingResumes(true);
// // //       const resumesRes = await axios.get("/auth/student/resumes/", { headers: authHeaders() });
// // //       setResumes(resumesRes.data as Resume[] || []);
// // //     } catch (error) {
// // //       console.error("Error fetching resumes:", error);
// // //       setError("Failed to load resumes.");
// // //     } finally {
// // //       setLoadingResumes(false);
// // //     }
// // //   };

// // //   const fetchTemplates = async (): Promise<void> => {
// // //     try {
// // //       setLoadingTemplates(true);
// // //       const templatesRes = await axios.get("/auth/student/templates/", { headers: authHeaders() });
// // //       setTemplates(templatesRes.data as Template[] || []);
// // //     } catch (error) {
// // //       console.error("Error fetching templates:", error);
// // //       setError("Failed to load templates.");
// // //     } finally {
// // //       setLoadingTemplates(false);
// // //     }
// // //   };

// // //   const handleLogout = (): void => {
// // //     localStorage.removeItem("access");
// // //     localStorage.removeItem("refresh");
// // //     localStorage.removeItem("user");
// // //     navigate("/login", { replace: true });
// // //   };

// // //   const handleCreateResume = async (templateId: number): Promise<void> => {
// // //     try {
// // //       setCreatingResume(templateId);
// // //       const res = await axios.post(
// // //         "/auth/student/resumes/",
// // //         { template_id: templateId, title: "New Resume" },
// // //         { headers: authHeaders() }
// // //       );
      
// // //       // Navigate to resume editor
// // //       navigate(`/student/resume/edit/${res.data.id}`);
      
// // //     } catch (error) {
// // //       console.error("Error creating resume:", error);
// // //       alert("Failed to create resume. Please try again.");
// // //     } finally {
// // //       setCreatingResume(null);
// // //       setShowTemplatesModal(false);
// // //     }
// // //   };

// // //   const handleEditResume = (resumeId: number): void => {
// // //     navigate(`/student/resume/edit/${resumeId}`);
// // //   };

// // //   const handleDeleteResume = async (resumeId: number): Promise<void> => {
// // //     if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
// // //     try {
// // //       await axios.delete(`/auth/student/resumes/${resumeId}/`, { headers: authHeaders() });
      
// // //       // Update local state
// // //       const updatedResumes = resumes.filter(r => r.id !== resumeId);
// // //       setResumes(updatedResumes);
      
// // //       // Update stats
// // //       setStats(prev => ({
// // //         ...prev,
// // //         totalResumes: prev.totalResumes - 1,
// // //         completed: updatedResumes.filter(r => r.status === "completed").length,
// // //         inProgress: updatedResumes.filter(r => r.status === "draft" || r.status === "in_progress").length
// // //       }));
      
// // //     } catch (error) {
// // //       console.error("Error deleting resume:", error);
// // //       alert("Failed to delete resume");
// // //     }
// // //   };

// // //   const handleDownloadResume = async (resumeId: number, format: string = 'pdf'): Promise<void> => {
// // //     try {
// // //       // First track the download
// // //       await axios.post(`/auth/student/resumes/${resumeId}/download/`, {}, { headers: authHeaders() });
      
// // //       // For now, just show a message (implement actual download later)
// // //       alert(`Download ${format.toUpperCase()} functionality will be implemented soon.`);
      
// // //       // Update download count in state
// // //       setResumes(prev => prev.map(r => 
// // //         r.id === resumeId 
// // //           ? { ...r, download_count: (r.download_count || 0) + 1 }
// // //           : r
// // //       ));
      
// // //       // Update stats
// // //       setStats(prev => ({
// // //         ...prev,
// // //         downloads: prev.downloads + 1
// // //       }));
      
// // //     } catch (error) {
// // //       console.error("Download error:", error);
// // //       alert("Failed to download");
// // //     }
// // //   };

// // //   const handlePreviewTemplate = (template: Template): void => {
// // //     // Check if user is logged in
// // //     const token = localStorage.getItem("access");
// // //     const userData = localStorage.getItem("user");
    
// // //     if (!token || !userData) {
// // //       alert("Your session has expired. Please login again.");
// // //       navigate("/login");
// // //       return;
// // //     }
    
// // //     // Check if the route exists in your router
// // //     navigate(`/student/template/preview/${template.id}`);
// // //   };

// // //   const openTemplatesModal = (): void => {
// // //     // Check if user is logged in
// // //     const token = localStorage.getItem("access");
// // //     const userData = localStorage.getItem("user");
    
// // //     if (!token || !userData) {
// // //       alert("Your session has expired. Please login again.");
// // //       navigate("/login");
// // //       return;
// // //     }
    
// // //     setShowTemplatesModal(true);
// // //     fetchTemplates();
// // //   };

// // //   const formatDate = (dateString: string): string => {
// // //     if (!dateString) return 'N/A';
// // //     try {
// // //       const date = new Date(dateString);
// // //       return date.toLocaleDateString('en-US', {
// // //         year: 'numeric',
// // //         month: 'short',
// // //         day: 'numeric'
// // //       });
// // //     } catch (e) {
// // //       return dateString;
// // //     }
// // //   };

// // //   const getStatusBadge = (status: string): React.ReactNode => {
// // //     const statusMap: Record<string, { bg: string; color: string; text: string }> = {
// // //       'draft': { bg: '#f1f5f9', color: '#64748b', text: 'Draft' },
// // //       'in_progress': { bg: '#fef3c7', color: '#92400e', text: 'In Progress' },
// // //       'completed': { bg: '#dcfce7', color: '#166534', text: 'Completed' },
// // //       'published': { bg: '#dbeafe', color: '#1e40af', text: 'Published' }
// // //     };
    
// // //     const statusInfo = statusMap[status] || { bg: '#f3f4f6', color: '#374151', text: status };
    
// // //     return (
// // //       <span style={{
// // //         backgroundColor: statusInfo.bg,
// // //         color: statusInfo.color,
// // //         padding: '4px 12px',
// // //         borderRadius: '20px',
// // //         fontSize: '10px',
// // //         fontWeight: 'bold',
// // //         textTransform: 'uppercase'
// // //       }}>
// // //         {statusInfo.text}
// // //       </span>
// // //     );
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div style={{
// // //         display: 'flex',
// // //         justifyContent: 'center',
// // //         alignItems: 'center',
// // //         minHeight: '100vh',
// // //         backgroundColor: '#f8fafc'
// // //       }}>
// // //         <div style={{ textAlign: 'center' }}>
// // //           <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // //           <div style={{ fontSize: '16px', color: '#64748b' }}>Loading Dashboard...</div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // CSS Properties
// // //   const pageContainer: React.CSSProperties = {
// // //     backgroundColor: '#f8fafc',
// // //     minHeight: '100vh',
// // //     width: '100vw',
// // //     display: 'flex',
// // //     flexDirection: 'column',
// // //     fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
// // //     margin: 0,
// // //     padding: 0
// // //   };

// // //   const headerStyle: React.CSSProperties = {
// // //     backgroundColor: '#fff',
// // //     borderBottom: '1px solid #e2e8f0',
// // //     padding: '12px 40px',
// // //     display: 'flex',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     width: '100%',
// // //     position: 'sticky',
// // //     top: 0,
// // //     zIndex: 100,
// // //     boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
// // //   };

// // //   const mainContent: React.CSSProperties = {
// // //     width: '100%',
// // //     maxWidth: '1200px',
// // //     margin: '0 auto',
// // //     padding: '40px',
// // //     flex: 1
// // //   };

// // //   const statsGrid: React.CSSProperties = {
// // //     display: 'grid',
// // //     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
// // //     gap: '20px',
// // //     marginBottom: '32px'
// // //   };

// // //   const cardBase: React.CSSProperties = {
// // //     backgroundColor: '#fff',
// // //     border: '1px solid #e2e8f0',
// // //     borderRadius: '12px',
// // //     padding: '24px',
// // //     boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
// // //     transition: 'transform 0.2s, box-shadow 0.2s'
// // //   };

// // //   const upgradeBox: React.CSSProperties = {
// // //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // //     borderRadius: '16px',
// // //     padding: '30px',
// // //     display: 'flex',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     marginBottom: '40px',
// // //     color: 'white'
// // //   };

// // //   const resumeItemStyle: React.CSSProperties = {
// // //     backgroundColor: '#fff',
// // //     border: '1px solid #e2e8f0',
// // //     borderRadius: '12px',
// // //     padding: '16px 24px',
// // //     display: 'flex',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     marginBottom: '12px',
// // //     transition: 'all 0.2s'
// // //   };

// // //   const profileDetailCard: React.CSSProperties = {
// // //     backgroundColor: "#fff",
// // //     padding: "30px",
// // //     borderRadius: "16px",
// // //     border: "1px solid #e2e8f0",
// // //     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
// // //   };

// // //   const detailRow: React.CSSProperties = {
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     padding: "16px 0",
// // //     borderBottom: "1px solid #f1f5f9",
// // //     gap: "16px"
// // //   };

// // //   const templateCard: React.CSSProperties = {
// // //     backgroundColor: '#fff',
// // //     border: '1px solid #e2e8f0',
// // //     borderRadius: '12px',
// // //     padding: '20px',
// // //     transition: 'all 0.3s ease',
// // //     cursor: 'pointer'
// // //   };

// // //   return (
// // //     <div style={pageContainer}>
// // //       {/* Navbar */}
// // //       <header style={headerStyle}>
// // //         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
// // //           <div style={{ backgroundColor: '#1e40af', padding: '8px', borderRadius: '8px' }}>
// // //             <FileText color="white" size={20} />
// // //           </div>
// // //           <div style={{ lineHeight: 1.2 }}>
// // //             <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1e293b' }}>Resume Builder Pro</div>
// // //             <div style={{ fontSize: '12px', color: '#64748b' }}>Student Dashboard</div>
// // //           </div>
// // //         </div>
// // //         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
// // //           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// // //             <User size={16} color="#64748b" />
// // //             <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>{user?.name || 'Student'}</span>
// // //           </div>
// // //           <span style={{ border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>FREE Plan</span>
// // //           <div 
// // //             style={{ cursor: 'pointer' }} 
// // //             onClick={handleLogout}
// // //             title="Logout"
// // //           >
// // //             <LogOut size={20} color="#94a3b8" />
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Content Area */}
// // //       <main style={mainContent}>
// // //         {/* Error Display */}
// // //         {error && (
// // //           <div style={{
// // //             backgroundColor: '#fee2e2',
// // //             border: '1px solid #fecaca',
// // //             color: '#dc2626',
// // //             padding: '16px',
// // //             borderRadius: '12px',
// // //             marginBottom: '24px',
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             gap: '12px'
// // //           }}>
// // //             <AlertCircle size={20} />
// // //             <span>{error}</span>
// // //           </div>
// // //         )}

// // //         {/* Tabs */}
// // //         <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
// // //           <button 
// // //             onClick={() => setActiveTab("home")}
// // //             style={{ 
// // //               backgroundColor: activeTab === "home" ? '#1e40af' : 'transparent', 
// // //               color: activeTab === "home" ? 'white' : '#64748b',
// // //               border: 'none', 
// // //               padding: '10px 20px', 
// // //               borderRadius: '8px', 
// // //               fontSize: '14px', 
// // //               fontWeight: '500',
// // //               cursor: 'pointer',
// // //               transition: 'all 0.2s'
// // //             }}
// // //           >
// // //             Overview
// // //           </button>
          
// // //           <button 
// // //             onClick={() => setActiveTab("resumes")}
// // //             style={{ 
// // //               backgroundColor: activeTab === "resumes" ? '#1e40af' : 'transparent', 
// // //               color: activeTab === "resumes" ? 'white' : '#64748b',
// // //               border: 'none', 
// // //               padding: '10px 20px', 
// // //               borderRadius: '8px', 
// // //               fontSize: '14px', 
// // //               fontWeight: '500',
// // //               cursor: 'pointer',
// // //               transition: 'all 0.2s'
// // //             }}
// // //           >
// // //             My Resumes
// // //           </button>
          
// // //           <button 
// // //             onClick={() => setActiveTab("profile")}
// // //             style={{ 
// // //               backgroundColor: activeTab === "profile" ? '#1e40af' : 'transparent', 
// // //               color: activeTab === "profile" ? 'white' : '#64748b',
// // //               border: 'none', 
// // //               padding: '10px 20px', 
// // //               borderRadius: '8px', 
// // //               fontSize: '14px', 
// // //               fontWeight: '500',
// // //               cursor: 'pointer',
// // //               transition: 'all 0.2s'
// // //             }}
// // //           >
// // //             Profile
// // //           </button>

// // //           <button 
// // //             onClick={openTemplatesModal}
// // //             style={{ 
// // //               backgroundColor: '#10b981',
// // //               color: 'white',
// // //               border: 'none', 
// // //               padding: '10px 20px', 
// // //               borderRadius: '8px', 
// // //               fontSize: '14px', 
// // //               fontWeight: '500',
// // //               cursor: 'pointer',
// // //               marginLeft: 'auto',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '8px'
// // //             }}
// // //           >
// // //             <Plus size={16} /> Browse Templates
// // //           </button>
// // //         </div>

// // //         {activeTab === "home" ? (
// // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // //             {/* Hero Section */}
// // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
// // //               <div>
// // //                 <h1 style={{ fontSize: '32px', margin: 0, fontWeight: '800', color: '#0f172a' }}>Welcome back, {user?.name || "Student"}!</h1>
// // //                 <p style={{ color: '#64748b', marginTop: '4px', fontSize: '16px' }}>Create professional resumes in minutes</p>
// // //               </div>
// // //               <button 
// // //                 onClick={openTemplatesModal}
// // //                 style={{ 
// // //                   backgroundColor: '#1e40af', 
// // //                   color: 'white', 
// // //                   border: 'none', 
// // //                   padding: '12px 24px', 
// // //                   borderRadius: '8px', 
// // //                   fontWeight: '600', 
// // //                   display: 'flex', 
// // //                   alignItems: 'center', 
// // //                   gap: '10px', 
// // //                   cursor: 'pointer',
// // //                   fontSize: '14px',
// // //                   transition: 'background-color 0.2s'
// // //                 }}
// // //               >
// // //                 <Plus size={18} strokeWidth={3} /> Create New Resume
// // //               </button>
// // //             </div>

// // //             {/* Stats Grid */}
// // //             <div style={statsGrid}>
// // //               <div style={cardBase}>
// // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // //                   <FileText size={16} /> Total Resumes
// // //                 </div>
// // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b' }}>{stats.totalResumes}</div>
// // //               </div>
// // //               <div style={cardBase}>
// // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // //                   <CheckCircle size={16} color="#22c55e" /> Completed
// // //                 </div>
// // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a' }}>{stats.completed}</div>
// // //               </div>
// // //               <div style={cardBase}>
// // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // //                   <Clock size={16} color="#f59e0b" /> In Progress
// // //                 </div>
// // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#d97706' }}>{stats.inProgress}</div>
// // //               </div>
// // //               <div style={cardBase}>
// // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
// // //                   <Download size={16} /> Downloads
// // //                 </div>
// // //                 <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b' }}>{stats.downloads}</div>
// // //               </div>
// // //             </div>

// // //             {/* Upgrade Banner */}
// // //             <div style={upgradeBox}>
// // //               <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
// // //                 <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%', display: 'flex' }}>
// // //                   <Crown color="white" size={24} />
// // //                 </div>
// // //                 <div>
// // //                   <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: 'white' }}>Upgrade to Pro</h2>
// // //                   <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', marginBottom: '12px' }}>Unlock premium templates, AI features, and unlimited downloads</p>
// // //                   <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'rgba(255,255,255,0.9)' }}>
// // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> Access to all premium templates</div>
// // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> AI-powered content suggestions</div>
// // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle color="white" size={14} /> Priority support</div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <div style={{ textAlign: 'right' }}>
// // //                 <div style={{ fontSize: '32px', fontWeight: '900', color: 'white' }}>₹999<span style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(255,255,255,0.9)' }}>/year</span></div>
// // //                 <button style={{ 
// // //                   backgroundColor: 'white', 
// // //                   color: '#1e40af', 
// // //                   border: 'none', 
// // //                   padding: '10px 24px', 
// // //                   borderRadius: '6px', 
// // //                   fontWeight: 'bold', 
// // //                   marginTop: '12px', 
// // //                   cursor: 'pointer', 
// // //                   display: 'flex', 
// // //                   alignItems: 'center', 
// // //                   gap: '8px'
// // //                 }}>
// // //                   <PlusCircle size={16} /> Upgrade Now
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Recent Resumes List */}
// // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
// // //               <div>
// // //                 <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '18px', color: '#0f172a' }}>Recent Resumes</h3>
// // //                 <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>Your recently modified resumes</p>
// // //               </div>
// // //               {resumes.length > 0 && (
// // //                 <button 
// // //                   onClick={() => setActiveTab("resumes")}
// // //                   style={{ 
// // //                     backgroundColor: '#fff', 
// // //                     border: '1px solid #e2e8f0', 
// // //                     borderRadius: '6px', 
// // //                     padding: '6px 12px', 
// // //                     fontSize: '12px', 
// // //                     fontWeight: 'bold', 
// // //                     display: 'flex', 
// // //                     alignItems: 'center', 
// // //                     gap: '8px', 
// // //                     cursor: 'pointer',
// // //                     color: '#475569'
// // //                   }}
// // //                 >
// // //                   View All
// // //                 </button>
// // //               )}
// // //             </div>

// // //             {/* Resume Rows */}
// // //             {loadingResumes ? (
// // //               <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
// // //                 <Loader2 size={24} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // //                 <div>Loading resumes...</div>
// // //               </div>
// // //             ) : resumes.length === 0 ? (
// // //               <div style={{ 
// // //                 backgroundColor: '#fff', 
// // //                 border: '2px dashed #e2e8f0', 
// // //                 borderRadius: '12px', 
// // //                 padding: '60px 20px', 
// // //                 textAlign: 'center',
// // //                 marginTop: '20px'
// // //               }}>
// // //                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
// // //                 <h3 style={{ color: '#64748b', marginBottom: '8px' }}>No Resumes Yet</h3>
// // //                 <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Create your first resume to get started</p>
// // //                 <button 
// // //                   onClick={openTemplatesModal}
// // //                   style={{ 
// // //                     backgroundColor: '#1e40af', 
// // //                     color: 'white', 
// // //                     border: 'none', 
// // //                     padding: '10px 20px', 
// // //                     borderRadius: '8px', 
// // //                     fontWeight: '600', 
// // //                     cursor: 'pointer'
// // //                   }}
// // //                 >
// // //                   Create First Resume
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               resumes.slice(0, 5).map((resume) => (
// // //                 <div 
// // //                   key={resume.id} 
// // //                   style={{
// // //                     ...resumeItemStyle,
// // //                     boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
// // //                   }}
// // //                   onMouseEnter={(e) => {
// // //                     e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
// // //                     e.currentTarget.style.borderColor = '#cbd5e1';
// // //                   }}
// // //                   onMouseLeave={(e) => {
// // //                     e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
// // //                     e.currentTarget.style.borderColor = '#e2e8f0';
// // //                   }}
// // //                 >
// // //                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
// // //                     <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '10px' }}>
// // //                       <FileText color="#2563eb" size={24} />
// // //                     </div>
// // //                     <div>
// // //                       <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{resume.title || 'Untitled Resume'}</div>
// // //                       <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
// // //                         Template: {resume.template_name || 'Default'} • Modified {formatDate(resume.updated_at)}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
// // //                     {getStatusBadge(resume.status)}
// // //                     <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
// // //                       <div 
// // //                         style={{ cursor: 'pointer' }} 
// // //                         onClick={() => handleEditResume(resume.id)}
// // //                         title="Edit Resume"
// // //                       >
// // //                         <Edit3 size={18} />
// // //                       </div>
// // //                       <div 
// // //                         style={{ cursor: 'pointer' }} 
// // //                         onClick={() => handleDownloadResume(resume.id, 'pdf')}
// // //                         title="Download PDF"
// // //                       >
// // //                         <Download size={18} />
// // //                       </div>
// // //                       <div 
// // //                         style={{ cursor: 'pointer', color: '#ef4444' }} 
// // //                         onClick={() => handleDeleteResume(resume.id)}
// // //                         title="Delete Resume"
// // //                       >
// // //                         <Trash2 size={18} />
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))
// // //             )}
// // //           </div>
// // //         ) : activeTab === "resumes" ? (
// // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
// // //               <div>
// // //                 <h1 style={{ fontSize: '28px', margin: 0, fontWeight: '800', color: '#0f172a' }}>My Resumes</h1>
// // //                 <p style={{ color: '#64748b', marginTop: '4px' }}>Manage all your created resumes</p>
// // //               </div>
// // //               <button 
// // //                 onClick={openTemplatesModal}
// // //                 style={{ 
// // //                   backgroundColor: '#1e40af', 
// // //                   color: 'white', 
// // //                   border: 'none', 
// // //                   padding: '10px 20px', 
// // //                   borderRadius: '8px', 
// // //                   fontWeight: '600', 
// // //                   display: 'flex', 
// // //                   alignItems: 'center', 
// // //                   gap: '10px', 
// // //                   cursor: 'pointer'
// // //                 }}
// // //               >
// // //                 <Plus size={16} /> Create New
// // //               </button>
// // //             </div>

// // //             {loadingResumes ? (
// // //               <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
// // //                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // //                 <div>Loading your resumes...</div>
// // //               </div>
// // //             ) : resumes.length === 0 ? (
// // //               <div style={{ 
// // //                 backgroundColor: '#fff', 
// // //                 border: '2px dashed #e2e8f0', 
// // //                 borderRadius: '12px', 
// // //                 padding: '80px 20px', 
// // //                 textAlign: 'center',
// // //                 marginTop: '40px'
// // //               }}>
// // //                 <FileText size={64} color="#cbd5e1" style={{ marginBottom: '20px' }} />
// // //                 <h2 style={{ color: '#64748b', marginBottom: '12px' }}>No Resumes Created Yet</h2>
// // //                 <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
// // //                   Start by choosing a template and creating your first professional resume
// // //                 </p>
// // //                 <button 
// // //                   onClick={openTemplatesModal}
// // //                   style={{ 
// // //                     backgroundColor: '#1e40af', 
// // //                     color: 'white', 
// // //                     border: 'none', 
// // //                     padding: '12px 28px', 
// // //                     borderRadius: '8px', 
// // //                     fontWeight: '600', 
// // //                     cursor: 'pointer',
// // //                     fontSize: '16px'
// // //                   }}
// // //                 >
// // //                     Browse Templates
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
// // //                 {resumes.map((resume) => (
// // //                   <div 
// // //                     key={resume.id} 
// // //                     style={{
// // //                       backgroundColor: '#fff',
// // //                       border: '1px solid #e2e8f0',
// // //                       borderRadius: '12px',
// // //                       padding: '20px',
// // //                       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
// // //                       transition: 'all 0.3s'
// // //                     }}
// // //                   >
// // //                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
// // //                       <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '8px' }}>
// // //                         <FileText color="#2563eb" size={20} />
// // //                       </div>
// // //                       <div style={{ flex: 1 }}>
// // //                         <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{resume.title || 'Untitled Resume'}</div>
// // //                         <div style={{ fontSize: '12px', color: '#64748b' }}>Created: {formatDate(resume.created_at)}</div>
// // //                       </div>
// // //                       {getStatusBadge(resume.status)}
// // //                     </div>
                    
// // //                     <div style={{ marginBottom: '16px' }}>
// // //                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Template</div>
// // //                       <div style={{ fontWeight: '500', color: '#475569' }}>{resume.template_name || 'Default'}</div>
// // //                     </div>
                    
// // //                     <div style={{ marginBottom: '16px' }}>
// // //                       <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Downloads</div>
// // //                       <div style={{ fontWeight: '500', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
// // //                         <Download size={14} /> {resume.download_count || 0}
// // //                       </div>
// // //                     </div>
                    
// // //                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
// // //                       <button 
// // //                         onClick={() => handleEditResume(resume.id)}
// // //                         style={{ 
// // //                           backgroundColor: '#f8fafc', 
// // //                           border: '1px solid #e2e8f0', 
// // //                           padding: '10px', 
// // //                           borderRadius: '8px', 
// // //                           fontWeight: '600', 
// // //                           cursor: 'pointer',
// // //                           display: 'flex',
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           gap: '6px',
// // //                           fontSize: '13px',
// // //                           color: '#475569'
// // //                         }}
// // //                       >
// // //                         <Edit3 size={14} /> Edit
// // //                       </button>
// // //                       <button 
// // //                         onClick={() => handleDownloadResume(resume.id, 'pdf')}
// // //                         style={{ 
// // //                           backgroundColor: '#1e40af', 
// // //                           color: 'white', 
// // //                           border: 'none', 
// // //                           padding: '10px', 
// // //                           borderRadius: '8px', 
// // //                           fontWeight: '600', 
// // //                           cursor: 'pointer',
// // //                           display: 'flex',
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           gap: '6px',
// // //                           fontSize: '13px'
// // //                         }}
// // //                       >
// // //                         <Download size={14} /> PDF
// // //                       </button>
// // //                       <button 
// // //                         onClick={() => handleDownloadResume(resume.id, 'word')}
// // //                         style={{ 
// // //                           backgroundColor: '#10b981', 
// // //                           color: 'white', 
// // //                           border: 'none', 
// // //                           padding: '10px', 
// // //                           borderRadius: '8px', 
// // //                           fontWeight: '600', 
// // //                           cursor: 'pointer',
// // //                           display: 'flex',
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           gap: '6px',
// // //                           fontSize: '13px'
// // //                         }}
// // //                       >
// // //                         <FileText size={14} /> Word
// // //                       </button>
// // //                       <button 
// // //                         onClick={() => handleDeleteResume(resume.id)}
// // //                         style={{ 
// // //                           backgroundColor: '#fee2e2', 
// // //                           color: '#dc2626', 
// // //                           border: '1px solid #fecaca', 
// // //                           padding: '10px', 
// // //                           borderRadius: '8px', 
// // //                           fontWeight: '600', 
// // //                           cursor: 'pointer',
// // //                           display: 'flex',
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           gap: '6px',
// // //                           fontSize: '13px'
// // //                         }}
// // //                       >
// // //                         <Trash2 size={14} /> Delete
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         ) : (
// // //           /* --- PROFILE SECTION --- */
// // //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// // //             <h1 style={{ fontSize: '32px', margin: "0 0 20px 0", fontWeight: '800', color: '#0f172a' }}>My Profile Details</h1>
            
// // //             <div style={profileDetailCard}>
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
// // //                 <div style={{ 
// // //                   backgroundColor: '#1e40af', 
// // //                   width: '60px', 
// // //                   height: '60px', 
// // //                   borderRadius: '50%', 
// // //                   display: 'flex', 
// // //                   alignItems: 'center', 
// // //                   justifyContent: 'center',
// // //                   color: 'white',
// // //                   fontSize: '24px',
// // //                   fontWeight: 'bold'
// // //                 }}>
// // //                   {user?.name?.charAt(0)?.toUpperCase() || 'S'}
// // //                 </div>
// // //                 <div>
// // //                   <h2 style={{ margin: 0, color: '#1e293b' }}>{user?.name || 'Student'}</h2>
// // //                   <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Student Account</p>
// // //                 </div>
// // //               </div>

// // //               <div style={detailRow}>
// // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// // //                   <User size={16} color="#64748b" />
// // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Full Name</span>
// // //                 </div>
// // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.name || "N/A"}</span>
// // //               </div>

// // //               <div style={detailRow}>
// // //                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// // //                   <Phone size={16} color="#64748b" />
// // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Mobile Number</span>
// // //                 </div>
// // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.phone ? `+91 ${user.phone}` : "N/A"}</span>
// // //               </div>

// // //               <div style={detailRow}>
// // //                 <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
// // //                   <Mail size={16} color="#64748b" />
// // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Email Address</span>
// // //                 </div>
// // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.email || "N/A"}</span>
// // //               </div>

// // //               <div style={detailRow}>
// // //                 <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
// // //                   <MapPin size={16} color="#64748b" />
// // //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Pincode</span>
// // //                 </div>
// // //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.pincode || "N/A"}</span>
// // //               </div>

// // //               <div style={{ ...detailRow, borderBottom: "none" }}>
// // //                 <span style={{ fontWeight: "900", color: "#64748b" }}>User ID</span>
// // //                 <span style={{ fontWeight: "800", color: "#64748b", fontSize: "12px" }}>
// // //                   {user?.id || "N/A"}
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             <button 
// // //               onClick={handleLogout}
// // //               style={{
// // //                 marginTop: '32px',
// // //                 padding: '14px 24px',
// // //                 backgroundColor: '#fee2e2',
// // //                 color: '#dc2626',
// // //                 border: '1px solid #fecaca',
// // //                 borderRadius: '12px',
// // //                 cursor: 'pointer',
// // //                 fontWeight: '900',
// // //                 fontSize: '14px',
// // //                 display: 'flex',
// // //                 alignItems: 'center',
// // //                 gap: '8px'
// // //               }}
// // //             >
// // //               <LogOut size={16} /> Logout from Dashboard
// // //             </button>
// // //           </div>
// // //         )}
// // //       </main>

// // //       {/* Templates Modal */}
// // //       {showTemplatesModal && (
// // //         <div 
// // //           onClick={() => setShowTemplatesModal(false)}
// // //           style={{
// // //             position: 'fixed',
// // //             top: 0,
// // //             left: 0,
// // //             right: 0,
// // //             bottom: 0,
// // //             backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // //             display: 'flex',
// // //             justifyContent: 'center',
// // //             alignItems: 'center',
// // //             zIndex: 1000,
// // //             padding: '20px'
// // //           }}
// // //         >
// // //           <div 
// // //             onClick={(e) => e.stopPropagation()}
// // //             style={{
// // //               backgroundColor: 'white',
// // //               borderRadius: '16px',
// // //               width: '100%',
// // //               maxWidth: '1200px',
// // //               maxHeight: '90vh',
// // //               overflow: 'auto',
// // //               padding: '24px'
// // //             }}
// // //           >
// // //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
// // //               <div>
// // //                 <h2 style={{ fontSize: '24px', margin: 0, fontWeight: 'bold', color: '#1e293b' }}>Choose a Template</h2>
// // //                 <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Select a template to start creating your resume</p>
// // //               </div>
// // //               <button 
// // //                 onClick={() => setShowTemplatesModal(false)}
// // //                 style={{
// // //                   backgroundColor: '#f1f5f9',
// // //                   border: '1px solid #e2e8f0',
// // //                   borderRadius: '8px',
// // //                   padding: '8px 16px',
// // //                   fontWeight: '600',
// // //                   cursor: 'pointer',
// // //                   color: '#475569'
// // //                 }}
// // //               >
// // //                 Close
// // //               </button>
// // //             </div>

// // //             {loadingTemplates ? (
// // //               <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
// // //                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: '0 auto 16px' }} />
// // //                 <div>Loading templates...</div>
// // //               </div>
// // //             ) : templates.length === 0 ? (
// // //               <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
// // //                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
// // //                 <p>No templates available at the moment. Please check back later.</p>
// // //               </div>
// // //             ) : (
// // //               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
// // //                 {templates.map((template) => (
// // //                   <div 
// // //                     key={template.id} 
// // //                     style={{
// // //                       ...templateCard,
// // //                       boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
// // //                     }}
// // //                     onMouseEnter={(e) => {
// // //                       e.currentTarget.style.transform = 'translateY(-4px)';
// // //                       e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
// // //                       e.currentTarget.style.borderColor = '#3b82f6';
// // //                     }}
// // //                     onMouseLeave={(e) => {
// // //                       e.currentTarget.style.transform = 'translateY(0)';
// // //                       e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
// // //                       e.currentTarget.style.borderColor = '#e2e8f0';
// // //                     }}
// // //                   >
// // //                     {template.preview_image ? (
// // //                       <img 
// // //                         src={template.preview_image} 
// // //                         alt={template.name}
// // //                         style={{ 
// // //                           width: '100%', 
// // //                           height: '180px', 
// // //                           objectFit: 'cover', 
// // //                           borderRadius: '8px',
// // //                           marginBottom: '16px',
// // //                           border: '1px solid #e2e8f0'
// // //                         }}
// // //                       />
// // //                     ) : (
// // //                       <div style={{ 
// // //                         width: '100%', 
// // //                         height: '180px', 
// // //                         borderRadius: '8px',
// // //                         marginBottom: '16px',
// // //                         backgroundColor: template.color || '#3b82f6',
// // //                         display: 'flex',
// // //                         alignItems: 'center',
// // //                         justifyContent: 'center',
// // //                         color: 'white',
// // //                         fontWeight: 'bold',
// // //                         fontSize: '18px'
// // //                       }}>
// // //                         {template.name}
// // //                       </div>
// // //                     )}
                    
// // //                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
// // //                       <div>
// // //                         <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{template.name}</h3>
// // //                         <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>{template.category || 'General'}</p>
// // //                       </div>
// // //                       <span style={{ 
// // //                         backgroundColor: template.status === 'active' ? '#dcfce7' : '#f3f4f6',
// // //                         color: template.status === 'active' ? '#166534' : '#374151',
// // //                         fontSize: '10px',
// // //                         fontWeight: 'bold',
// // //                         padding: '4px 8px',
// // //                         borderRadius: '12px'
// // //                       }}>
// // //                         {template.status === 'active' ? 'Active' : 'Draft'}
// // //                       </span>
// // //                     </div>
                    
// // //                     <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
// // //                       <span style={{ 
// // //                         backgroundColor: '#e0f2fe',
// // //                         color: '#075985',
// // //                         fontSize: '11px',
// // //                         padding: '2px 8px',
// // //                         borderRadius: '12px'
// // //                       }}>
// // //                         {template.layout || 'Single Column'}
// // //                       </span>
// // //                       <span style={{ 
// // //                         backgroundColor: '#f3f4f6',
// // //                         color: '#374151',
// // //                         fontSize: '11px',
// // //                         padding: '2px 8px',
// // //                         borderRadius: '12px'
// // //                       }}>
// // //                         {template.downloads || 0} downloads
// // //                       </span>
// // //                     </div>
                    
// // //                     <div style={{ display: 'flex', gap: '10px' }}>
// // //                       <button 
// // //                         onClick={() => handlePreviewTemplate(template)}
// // //                         style={{ 
// // //                           flex: 1,
// // //                           backgroundColor: '#f8fafc',
// // //                           border: '1px solid #e2e8f0',
// // //                           padding: '10px',
// // //                           borderRadius: '8px',
// // //                           fontWeight: '600',
// // //                           cursor: 'pointer',
// // //                           fontSize: '13px',
// // //                           color: '#475569',
// // //                           display: 'flex',
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           gap: '6px'
// // //                         }}
// // //                       >
// // //                         <Eye size={14} /> Preview
// // //                       </button>
// // //                       <button 
// // //                         onClick={() => handleCreateResume(template.id)}
// // //                         disabled={creatingResume === template.id}
// // //                         style={{ 
// // //                           flex: 1,
// // //                           backgroundColor: creatingResume === template.id ? '#93c5fd' : '#1e40af',
// // //                           color: 'white',
// // //                           border: 'none',
// // //                           padding: '10px',
// // //                           borderRadius: '8px',
// // //                           fontWeight: '600',
// // //                           cursor: 'pointer',
// // //                           fontSize: '13px',
// // //                           display: 'flex',
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           gap: '6px'
// // //                         }}
// // //                       >
// // //                         {creatingResume === template.id ? (
// // //                           <>
// // //                             <Loader2 size={14} className="animate-spin" /> Creating...
// // //                           </>
// // //                         ) : (
// // //                           <>
// // //                             <Plus size={14} /> Use This
// // //                           </>
// // //                         )}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Global CSS for animations */}
// // //       <style>{`
// // //         @keyframes fadeIn { 
// // //           from { opacity: 0; transform: translateY(10px); } 
// // //           to { opacity: 1; transform: translateY(0); } 
// // //         }
        
// // //         @keyframes spin {
// // //           from { transform: rotate(0deg); }
// // //           to { transform: rotate(360deg); }
// // //         }
        
// // //         .animate-spin {
// // //           animation: spin 1s linear infinite;
// // //         }
        
// // //         button:hover:not(:disabled) {
// // //           transform: translateY(-1px);
// // //         }
        
// // //         button:disabled {
// // //           opacity: 0.6;
// // //           cursor: not-allowed;
// // //         }
        
// // //         @media (max-width: 768px) {
// // //           .stats-grid {
// // //             grid-template-columns: repeat(2, 1fr);
// // //           }
          
// // //           .template-grid {
// // //             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
// // //           }
          
// // //           main {
// // //             padding: 20px;
// // //           }
          
// // //           header {
// // //             padding: 12px 20px;
// // //           }
// // //         }
        
// // //         @media (max-width: 480px) {
// // //           .stats-grid {
// // //             grid-template-columns: 1fr;
// // //           }
          
// // //           .template-grid {
// // //             grid-template-columns: 1fr;
// // //           }
          
// // //           .tab-buttons {
// // //             flex-wrap: wrap;
// // //           }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;

// // // src/pages/Dashboard.tsx
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "../api/axiosInstance";
// // import ResumePreview from "./dashboard/ResumePreview"; // ✅ Admin style preview component
// // import {
// //   PlusCircle,
// //   FileText,
// //   CheckCircle,
// //   Clock,
// //   Download,
// //   Crown,
// //   Edit3,
// //   LogOut,
// //   Plus,
// //   Eye,
// //   Trash2,
// //   User,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   Loader2,
// //   AlertCircle,
// // } from "lucide-react";

// // function authHeaders() {
// //   const token = localStorage.getItem("access") || "";
// //   return token ? { Authorization: `Bearer ${token}` } : {};
// // }

// // // Define TypeScript interfaces
// // interface UserType {
// //   id?: number;
// //   name?: string;
// //   email?: string;
// //   phone?: string;
// //   pincode?: string;
// // }

// // interface Stats {
// //   totalResumes: number;
// //   completed: number;
// //   inProgress: number;
// //   downloads: number;
// // }

// // interface Resume {
// //   id: number;
// //   title: string;
// //   status: "draft" | "in_progress" | "completed" | "published" | string;
// //   template_name: string;
// //   updated_at: string;
// //   created_at: string;
// //   download_count?: number;
// // }

// // interface Template {
// //   id: number;
// //   name: string;
// //   category?: string;
// //   status: string;
// //   layout?: string;
// //   downloads?: number;
// //   preview_image?: string;
// //   color?: string;

// //   // ✅ add schema support for preview (admin-like)
// //   schema?: any;
// // }

// // const Dashboard = () => {
// //   const [activeTab, setActiveTab] = useState<"home" | "resumes" | "profile">(
// //     "home"
// //   );
// //   const navigate = useNavigate();

// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [loadingTemplates, setLoadingTemplates] = useState<boolean>(false);
// //   const [loadingResumes, setLoadingResumes] = useState<boolean>(false);

// //   const [stats, setStats] = useState<Stats>({
// //     totalResumes: 0,
// //     completed: 0,
// //     inProgress: 0,
// //     downloads: 0,
// //   });

// //   const [resumes, setResumes] = useState<Resume[]>([]);
// //   const [templates, setTemplates] = useState<Template[]>([]);
// //   const [user, setUser] = useState<UserType | null>(null);

// //   const [showTemplatesModal, setShowTemplatesModal] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);

// //   // ✅ Admin-like preview modal states
// //   const [previewOpen, setPreviewOpen] = useState(false);
// //   const [previewSchema, setPreviewSchema] = useState<any>(null);
// //   const [previewLoading, setPreviewLoading] = useState(false);
// //   const [previewTitle, setPreviewTitle] = useState<string>("Template Preview");

// //   // Fetch user data and dashboard stats
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         const storedUser = JSON.parse(
// //           localStorage.getItem("user") || "null"
// //         ) as UserType;

// //         if (!storedUser) {
// //           navigate("/login", { replace: true });
// //           return;
// //         }
// //         setUser(storedUser);

// //         const statsRes = await axios.get("/auth/student/dashboard/stats/", {
// //           headers: authHeaders(),
// //         });
// //         setStats((statsRes.data as Stats) || stats);

// //         await fetchResumes();
// //       } catch (err) {
// //         console.error("Error fetching dashboard data:", err);
// //         setError("Failed to load dashboard data. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [navigate]);

// //   const fetchResumes = async (): Promise<void> => {
// //     try {
// //       setLoadingResumes(true);
// //       const resumesRes = await axios.get("/auth/student/resumes/", {
// //         headers: authHeaders(),
// //       });
// //       const data = resumesRes.data as Resume[] | any;
// //       setResumes(Array.isArray(data) ? data : data?.results || []);
// //     } catch (err) {
// //       console.error("Error fetching resumes:", err);
// //       setError("Failed to load resumes.");
// //     } finally {
// //       setLoadingResumes(false);
// //     }
// //   };

// //   const fetchTemplates = async (): Promise<void> => {
// //     try {
// //       setLoadingTemplates(true);
// //       const templatesRes = await axios.get("/auth/student/templates/", {
// //         headers: authHeaders(),
// //       });

// //       // support both array & paginated {results: []}
// //       const data = templatesRes.data as Template[] | any;
// //       const list = Array.isArray(data) ? data : data?.results || [];
// //       setTemplates(list);
// //     } catch (err) {
// //       console.error("Error fetching templates:", err);
// //       setError("Failed to load templates.");
// //     } finally {
// //       setLoadingTemplates(false);
// //     }
// //   };

// //   const handleLogout = (): void => {
// //     localStorage.removeItem("access");
// //     localStorage.removeItem("refresh");
// //     localStorage.removeItem("user");
// //     navigate("/login", { replace: true });
// //   };

// //   // ✅ Student "Use This" = Admin jaisa redirect to create-resume page
// //   const handleUseTemplate = (templateId: number): void => {
// //     const token = localStorage.getItem("access");
// //     const userData = localStorage.getItem("user");

// //     if (!token || !userData) {
// //       alert("Your session has expired. Please login again.");
// //       navigate("/login");
// //       return;
// //     }

// //     setShowTemplatesModal(false);

// //     // ✅ EXACT admin-like behavior
// //     navigate(`/admin/resume/create/${templateId}`);
// //   };

// //   const handleEditResume = (resumeId: number): void => {
// //     navigate(`/student/resume/edit/${resumeId}`);
// //   };

// //   const handleDeleteResume = async (resumeId: number): Promise<void> => {
// //     if (!window.confirm("Are you sure you want to delete this resume?")) return;

// //     try {
// //       await axios.delete(`/auth/student/resumes/${resumeId}/`, {
// //         headers: authHeaders(),
// //       });

// //       const updatedResumes = resumes.filter((r) => r.id !== resumeId);
// //       setResumes(updatedResumes);

// //       setStats((prev) => ({
// //         ...prev,
// //         totalResumes: Math.max(0, prev.totalResumes - 1),
// //         completed: updatedResumes.filter((r) => r.status === "completed").length,
// //         inProgress: updatedResumes.filter(
// //           (r) => r.status === "draft" || r.status === "in_progress"
// //         ).length,
// //       }));
// //     } catch (err) {
// //       console.error("Error deleting resume:", err);
// //       alert("Failed to delete resume");
// //     }
// //   };

// //   const handleDownloadResume = async (
// //     resumeId: number,
// //     format: string = "pdf"
// //   ): Promise<void> => {
// //     try {
// //       await axios.post(
// //         `/auth/student/resumes/${resumeId}/download/`,
// //         {},
// //         { headers: authHeaders() }
// //       );

// //       alert(`Download ${format.toUpperCase()} functionality will be implemented soon.`);

// //       setResumes((prev) =>
// //         prev.map((r) =>
// //           r.id === resumeId
// //             ? { ...r, download_count: (r.download_count || 0) + 1 }
// //             : r
// //         )
// //       );

// //       setStats((prev) => ({ ...prev, downloads: prev.downloads + 1 }));
// //     } catch (err) {
// //       console.error("Download error:", err);
// //       alert("Failed to download");
// //     }
// //   };

// //   // ✅ Admin-like preview: open modal with ResumePreview(schema)
// //   const openTemplatePreview = async (template: Template): Promise<void> => {
// //     const token = localStorage.getItem("access");
// //     const userData = localStorage.getItem("user");

// //     if (!token || !userData) {
// //       alert("Your session has expired. Please login again.");
// //       navigate("/login");
// //       return;
// //     }

// //     setPreviewTitle(template?.name ? `Preview: ${template.name}` : "Template Preview");
// //     setPreviewOpen(true);

// //     // if schema already present in list response
// //     if (template?.schema) {
// //       setPreviewSchema(template.schema);
// //       return;
// //     }

// //     // else fetch detail for schema
// //     try {
// //       setPreviewLoading(true);

// //       // ✅ expected endpoint (add this in backend if not present)
// //       const detailRes = await axios.get(`/auth/student/templates/${template.id}/`, {
// //         headers: authHeaders(),
// //       });

// //       const schema = detailRes.data?.schema || {};
// //       setPreviewSchema(schema);
// //     } catch (err) {
// //       console.error("Failed to load template schema for preview:", err);
// //       setPreviewSchema({});
// //       setError("Preview schema not available for this template.");
// //     } finally {
// //       setPreviewLoading(false);
// //     }
// //   };

// //   const openTemplatesModal = (): void => {
// //     const token = localStorage.getItem("access");
// //     const userData = localStorage.getItem("user");

// //     if (!token || !userData) {
// //       alert("Your session has expired. Please login again.");
// //       navigate("/login");
// //       return;
// //     }

// //     setShowTemplatesModal(true);
// //     fetchTemplates();
// //   };

// //   const formatDate = (dateString: string): string => {
// //     if (!dateString) return "N/A";
// //     try {
// //       const date = new Date(dateString);
// //       return date.toLocaleDateString("en-US", {
// //         year: "numeric",
// //         month: "short",
// //         day: "numeric",
// //       });
// //     } catch {
// //       return dateString;
// //     }
// //   };

// //   const getStatusBadge = (status: string): React.ReactNode => {
// //     const statusMap: Record<string, { bg: string; color: string; text: string }> =
// //       {
// //         draft: { bg: "#f1f5f9", color: "#64748b", text: "Draft" },
// //         in_progress: { bg: "#fef3c7", color: "#92400e", text: "In Progress" },
// //         completed: { bg: "#dcfce7", color: "#166534", text: "Completed" },
// //         published: { bg: "#dbeafe", color: "#1e40af", text: "Published" },
// //       };

// //     const statusInfo =
// //       statusMap[status] || { bg: "#f3f4f6", color: "#374151", text: status };

// //     return (
// //       <span
// //         style={{
// //           backgroundColor: statusInfo.bg,
// //           color: statusInfo.color,
// //           padding: "4px 12px",
// //           borderRadius: "20px",
// //           fontSize: "10px",
// //           fontWeight: "bold",
// //           textTransform: "uppercase",
// //         }}
// //       >
// //         {statusInfo.text}
// //       </span>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           minHeight: "100vh",
// //           backgroundColor: "#f8fafc",
// //         }}
// //       >
// //         <div style={{ textAlign: "center" }}>
// //           <Loader2
// //             size={32}
// //             color="#3b82f6"
// //             className="animate-spin"
// //             style={{ margin: "0 auto 16px" }}
// //           />
// //           <div style={{ fontSize: "16px", color: "#64748b" }}>
// //             Loading Dashboard...
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // CSS Properties
// //   const pageContainer: React.CSSProperties = {
// //     backgroundColor: "#f8fafc",
// //     minHeight: "100vh",
// //     width: "100vw",
// //     display: "flex",
// //     flexDirection: "column",
// //     fontFamily:
// //       '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
// //     margin: 0,
// //     padding: 0,
// //   };

// //   const headerStyle: React.CSSProperties = {
// //     backgroundColor: "#fff",
// //     borderBottom: "1px solid #e2e8f0",
// //     padding: "12px 40px",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     width: "100%",
// //     position: "sticky",
// //     top: 0,
// //     zIndex: 100,
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
// //   };

// //   const mainContent: React.CSSProperties = {
// //     width: "100%",
// //     maxWidth: "1200px",
// //     margin: "0 auto",
// //     padding: "40px",
// //     flex: 1,
// //   };

// //   const statsGrid: React.CSSProperties = {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// //     gap: "20px",
// //     marginBottom: "32px",
// //   };

// //   const cardBase: React.CSSProperties = {
// //     backgroundColor: "#fff",
// //     border: "1px solid #e2e8f0",
// //     borderRadius: "12px",
// //     padding: "24px",
// //     boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
// //     transition: "transform 0.2s, box-shadow 0.2s",
// //   };

// //   const upgradeBox: React.CSSProperties = {
// //     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //     borderRadius: "16px",
// //     padding: "30px",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: "40px",
// //     color: "white",
// //   };

// //   const resumeItemStyle: React.CSSProperties = {
// //     backgroundColor: "#fff",
// //     border: "1px solid #e2e8f0",
// //     borderRadius: "12px",
// //     padding: "16px 24px",
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: "12px",
// //     transition: "all 0.2s",
// //   };

// //   const profileDetailCard: React.CSSProperties = {
// //     backgroundColor: "#fff",
// //     padding: "30px",
// //     borderRadius: "16px",
// //     border: "1px solid #e2e8f0",
// //     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
// //   };

// //   const detailRow: React.CSSProperties = {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     padding: "16px 0",
// //     borderBottom: "1px solid #f1f5f9",
// //     gap: "16px",
// //   };

// //   const templateCard: React.CSSProperties = {
// //     backgroundColor: "#fff",
// //     border: "1px solid #e2e8f0",
// //     borderRadius: "12px",
// //     padding: "20px",
// //     transition: "all 0.3s ease",
// //     cursor: "pointer",
// //   };

// //   return (
// //     <div style={pageContainer}>
// //       {/* Navbar */}
// //       <header style={headerStyle}>
// //         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
// //           <div
// //             style={{
// //               backgroundColor: "#1e40af",
// //               padding: "8px",
// //               borderRadius: "8px",
// //             }}
// //           >
// //             <FileText color="white" size={20} />
// //           </div>
// //           <div style={{ lineHeight: 1.2 }}>
// //             <div
// //               style={{
// //                 fontWeight: "bold",
// //                 fontSize: "18px",
// //                 color: "#1e293b",
// //               }}
// //             >
// //               Resume Builder Pro
// //             </div>
// //             <div style={{ fontSize: "12px", color: "#64748b" }}>
// //               Student Dashboard
// //             </div>
// //           </div>
// //         </div>
// //         <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //             <User size={16} color="#64748b" />
// //             <span
// //               style={{
// //                 fontSize: "14px",
// //                 color: "#475569",
// //                 fontWeight: 500,
// //               }}
// //             >
// //               {user?.name || "Student"}
// //             </span>
// //           </div>
// //           <span
// //             style={{
// //               border: "1px solid #e2e8f0",
// //               padding: "4px 10px",
// //               borderRadius: "6px",
// //               fontSize: "11px",
// //               fontWeight: "bold",
// //               color: "#64748b",
// //             }}
// //           >
// //             FREE Plan
// //           </span>
// //           <div
// //             style={{ cursor: "pointer" }}
// //             onClick={handleLogout}
// //             title="Logout"
// //           >
// //             <LogOut size={20} color="#94a3b8" />
// //           </div>
// //         </div>
// //       </header>

// //       {/* Content Area */}
// //       <main style={mainContent}>
// //         {/* Error Display */}
// //         {error && (
// //           <div
// //             style={{
// //               backgroundColor: "#fee2e2",
// //               border: "1px solid #fecaca",
// //               color: "#dc2626",
// //               padding: "16px",
// //               borderRadius: "12px",
// //               marginBottom: "24px",
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "12px",
// //             }}
// //           >
// //             <AlertCircle size={20} />
// //             <span>{error}</span>
// //           </div>
// //         )}

// //         {/* Tabs */}
// //         <div
// //           style={{
// //             display: "flex",
// //             gap: "8px",
// //             marginBottom: "30px",
// //             borderBottom: "1px solid #e2e8f0",
// //             paddingBottom: "10px",
// //           }}
// //         >
// //           <button
// //             onClick={() => setActiveTab("home")}
// //             style={{
// //               backgroundColor: activeTab === "home" ? "#1e40af" : "transparent",
// //               color: activeTab === "home" ? "white" : "#64748b",
// //               border: "none",
// //               padding: "10px 20px",
// //               borderRadius: "8px",
// //               fontSize: "14px",
// //               fontWeight: "500",
// //               cursor: "pointer",
// //               transition: "all 0.2s",
// //             }}
// //           >
// //             Overview
// //           </button>

// //           <button
// //             onClick={() => setActiveTab("resumes")}
// //             style={{
// //               backgroundColor:
// //                 activeTab === "resumes" ? "#1e40af" : "transparent",
// //               color: activeTab === "resumes" ? "white" : "#64748b",
// //               border: "none",
// //               padding: "10px 20px",
// //               borderRadius: "8px",
// //               fontSize: "14px",
// //               fontWeight: "500",
// //               cursor: "pointer",
// //               transition: "all 0.2s",
// //             }}
// //           >
// //             My Resumes
// //           </button>

// //           <button
// //             onClick={() => setActiveTab("profile")}
// //             style={{
// //               backgroundColor:
// //                 activeTab === "profile" ? "#1e40af" : "transparent",
// //               color: activeTab === "profile" ? "white" : "#64748b",
// //               border: "none",
// //               padding: "10px 20px",
// //               borderRadius: "8px",
// //               fontSize: "14px",
// //               fontWeight: "500",
// //               cursor: "pointer",
// //               transition: "all 0.2s",
// //             }}
// //           >
// //             Profile
// //           </button>

// //           <button
// //             onClick={openTemplatesModal}
// //             style={{
// //               backgroundColor: "#10b981",
// //               color: "white",
// //               border: "none",
// //               padding: "10px 20px",
// //               borderRadius: "8px",
// //               fontSize: "14px",
// //               fontWeight: "500",
// //               cursor: "pointer",
// //               marginLeft: "auto",
// //               display: "flex",
// //               alignItems: "center",
// //               gap: "8px",
// //             }}
// //           >
// //             <Plus size={16} /> Browse Templates
// //           </button>
// //         </div>

// //         {activeTab === "home" ? (
// //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// //             {/* Hero */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 marginBottom: "32px",
// //               }}
// //             >
// //               <div>
// //                 <h1
// //                   style={{
// //                     fontSize: "32px",
// //                     margin: 0,
// //                     fontWeight: "800",
// //                     color: "#0f172a",
// //                   }}
// //                 >
// //                   Welcome back, {user?.name || "Student"}!
// //                 </h1>
// //                 <p
// //                   style={{
// //                     color: "#64748b",
// //                     marginTop: "4px",
// //                     fontSize: "16px",
// //                   }}
// //                 >
// //                   Create professional resumes in minutes
// //                 </p>
// //               </div>
// //               <button
// //                 onClick={openTemplatesModal}
// //                 style={{
// //                   backgroundColor: "#1e40af",
// //                   color: "white",
// //                   border: "none",
// //                   padding: "12px 24px",
// //                   borderRadius: "8px",
// //                   fontWeight: "600",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                   cursor: "pointer",
// //                   fontSize: "14px",
// //                   transition: "background-color 0.2s",
// //                 }}
// //               >
// //                 <Plus size={18} strokeWidth={3} /> Create New Resume
// //               </button>
// //             </div>

// //             {/* Stats */}
// //             <div style={statsGrid}>
// //               <div style={cardBase}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                     color: "#94a3b8",
// //                     fontSize: "13px",
// //                     marginBottom: "12px",
// //                   }}
// //                 >
// //                   <FileText size={16} /> Total Resumes
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "36px",
// //                     fontWeight: "bold",
// //                     color: "#1e293b",
// //                   }}
// //                 >
// //                   {stats.totalResumes}
// //                 </div>
// //               </div>

// //               <div style={cardBase}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                     color: "#94a3b8",
// //                     fontSize: "13px",
// //                     marginBottom: "12px",
// //                   }}
// //                 >
// //                   <CheckCircle size={16} color="#22c55e" /> Completed
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "36px",
// //                     fontWeight: "bold",
// //                     color: "#16a34a",
// //                   }}
// //                 >
// //                   {stats.completed}
// //                 </div>
// //               </div>

// //               <div style={cardBase}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                     color: "#94a3b8",
// //                     fontSize: "13px",
// //                     marginBottom: "12px",
// //                   }}
// //                 >
// //                   <Clock size={16} color="#f59e0b" /> In Progress
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "36px",
// //                     fontWeight: "bold",
// //                     color: "#d97706",
// //                   }}
// //                 >
// //                   {stats.inProgress}
// //                 </div>
// //               </div>

// //               <div style={cardBase}>
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                     color: "#94a3b8",
// //                     fontSize: "13px",
// //                     marginBottom: "12px",
// //                   }}
// //                 >
// //                   <Download size={16} /> Downloads
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "36px",
// //                     fontWeight: "bold",
// //                     color: "#1e293b",
// //                   }}
// //                 >
// //                   {stats.downloads}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Upgrade */}
// //             <div style={upgradeBox}>
// //               <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
// //                 <div
// //                   style={{
// //                     backgroundColor: "rgba(255,255,255,0.2)",
// //                     padding: "12px",
// //                     borderRadius: "50%",
// //                     display: "flex",
// //                   }}
// //                 >
// //                   <Crown color="white" size={24} />
// //                 </div>
// //                 <div>
// //                   <h2
// //                     style={{
// //                       fontSize: "20px",
// //                       fontWeight: "bold",
// //                       margin: "0 0 8px 0",
// //                       color: "white",
// //                     }}
// //                   >
// //                     Upgrade to Pro
// //                   </h2>
// //                   <p
// //                     style={{
// //                       color: "rgba(255,255,255,0.9)",
// //                       fontSize: "14px",
// //                       marginBottom: "12px",
// //                     }}
// //                   >
// //                     Unlock premium templates, AI features, and unlimited downloads
// //                   </p>
// //                   <div
// //                     style={{
// //                       fontSize: "13px",
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       gap: "6px",
// //                       color: "rgba(255,255,255,0.9)",
// //                     }}
// //                   >
// //                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //                       <CheckCircle color="white" size={14} /> Access to all premium templates
// //                     </div>
// //                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //                       <CheckCircle color="white" size={14} /> AI-powered content suggestions
// //                     </div>
// //                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //                       <CheckCircle color="white" size={14} /> Priority support
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div style={{ textAlign: "right" }}>
// //                 <div style={{ fontSize: "32px", fontWeight: "900", color: "white" }}>
// //                   ₹999
// //                   <span
// //                     style={{
// //                       fontSize: "14px",
// //                       fontWeight: "400",
// //                       color: "rgba(255,255,255,0.9)",
// //                     }}
// //                   >
// //                     /year
// //                   </span>
// //                 </div>
// //                 <button
// //                   style={{
// //                     backgroundColor: "white",
// //                     color: "#1e40af",
// //                     border: "none",
// //                     padding: "10px 24px",
// //                     borderRadius: "6px",
// //                     fontWeight: "bold",
// //                     marginTop: "12px",
// //                     cursor: "pointer",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                     marginLeft: "auto",
// //                   }}
// //                 >
// //                   <PlusCircle size={16} /> Upgrade Now
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Recent Resumes */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "flex-end",
// //                 marginBottom: "16px",
// //               }}
// //             >
// //               <div>
// //                 <h3
// //                   style={{
// //                     margin: 0,
// //                     fontWeight: "bold",
// //                     fontSize: "18px",
// //                     color: "#0f172a",
// //                   }}
// //                 >
// //                   Recent Resumes
// //                 </h3>
// //                 <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>
// //                   Your recently modified resumes
// //                 </p>
// //               </div>
// //               {resumes.length > 0 && (
// //                 <button
// //                   onClick={() => setActiveTab("resumes")}
// //                   style={{
// //                     backgroundColor: "#fff",
// //                     border: "1px solid #e2e8f0",
// //                     borderRadius: "6px",
// //                     padding: "6px 12px",
// //                     fontSize: "12px",
// //                     fontWeight: "bold",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "8px",
// //                     cursor: "pointer",
// //                     color: "#475569",
// //                   }}
// //                 >
// //                   View All
// //                 </button>
// //               )}
// //             </div>

// //             {loadingResumes ? (
// //               <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
// //                 <Loader2
// //                   size={24}
// //                   color="#3b82f6"
// //                   className="animate-spin"
// //                   style={{ margin: "0 auto 16px" }}
// //                 />
// //                 <div>Loading resumes...</div>
// //               </div>
// //             ) : resumes.length === 0 ? (
// //               <div
// //                 style={{
// //                   backgroundColor: "#fff",
// //                   border: "2px dashed #e2e8f0",
// //                   borderRadius: "12px",
// //                   padding: "60px 20px",
// //                   textAlign: "center",
// //                   marginTop: "20px",
// //                 }}
// //               >
// //                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: "16px" }} />
// //                 <h3 style={{ color: "#64748b", marginBottom: "8px" }}>No Resumes Yet</h3>
// //                 <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
// //                   Create your first resume to get started
// //                 </p>
// //                 <button
// //                   onClick={openTemplatesModal}
// //                   style={{
// //                     backgroundColor: "#1e40af",
// //                     color: "white",
// //                     border: "none",
// //                     padding: "10px 20px",
// //                     borderRadius: "8px",
// //                     fontWeight: "600",
// //                     cursor: "pointer",
// //                   }}
// //                 >
// //                   Create First Resume
// //                 </button>
// //               </div>
// //             ) : (
// //               resumes.slice(0, 5).map((resume) => (
// //                 <div
// //                   key={resume.id}
// //                   style={{
// //                     ...resumeItemStyle,
// //                     boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
// //                     e.currentTarget.style.borderColor = "#cbd5e1";
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)";
// //                     e.currentTarget.style.borderColor = "#e2e8f0";
// //                   }}
// //                 >
// //                   <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
// //                     <div style={{ backgroundColor: "#eff6ff", padding: "10px", borderRadius: "10px" }}>
// //                       <FileText color="#2563eb" size={24} />
// //                     </div>
// //                     <div>
// //                       <div style={{ fontWeight: "bold", color: "#1e293b", fontSize: "16px" }}>
// //                         {resume.title || "Untitled Resume"}
// //                       </div>
// //                       <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
// //                         Template: {resume.template_name || "Default"} • Modified {formatDate(resume.updated_at)}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
// //                     {getStatusBadge(resume.status)}
// //                     <div style={{ display: "flex", gap: "16px", color: "#94a3b8" }}>
// //                       <div style={{ cursor: "pointer" }} onClick={() => handleEditResume(resume.id)} title="Edit Resume">
// //                         <Edit3 size={18} />
// //                       </div>
// //                       <div style={{ cursor: "pointer" }} onClick={() => handleDownloadResume(resume.id, "pdf")} title="Download PDF">
// //                         <Download size={18} />
// //                       </div>
// //                       <div
// //                         style={{ cursor: "pointer", color: "#ef4444" }}
// //                         onClick={() => handleDeleteResume(resume.id)}
// //                         title="Delete Resume"
// //                       >
// //                         <Trash2 size={18} />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         ) : activeTab === "resumes" ? (
// //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
// //               <div>
// //                 <h1 style={{ fontSize: "28px", margin: 0, fontWeight: "800", color: "#0f172a" }}>My Resumes</h1>
// //                 <p style={{ color: "#64748b", marginTop: "4px" }}>Manage all your created resumes</p>
// //               </div>
// //               <button
// //                 onClick={openTemplatesModal}
// //                 style={{
// //                   backgroundColor: "#1e40af",
// //                   color: "white",
// //                   border: "none",
// //                   padding: "10px 20px",
// //                   borderRadius: "8px",
// //                   fontWeight: "600",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 <Plus size={16} /> Create New
// //               </button>
// //             </div>

// //             {loadingResumes ? (
// //               <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
// //                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
// //                 <div>Loading your resumes...</div>
// //               </div>
// //             ) : resumes.length === 0 ? (
// //               <div style={{ backgroundColor: "#fff", border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "80px 20px", textAlign: "center", marginTop: "40px" }}>
// //                 <FileText size={64} color="#cbd5e1" style={{ marginBottom: "20px" }} />
// //                 <h2 style={{ color: "#64748b", marginBottom: "12px" }}>No Resumes Created Yet</h2>
// //                 <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "30px", maxWidth: "400px", margin: "0 auto 30px" }}>
// //                   Start by choosing a template and creating your first professional resume
// //                 </p>
// //                 <button
// //                   onClick={openTemplatesModal}
// //                   style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "12px 28px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "16px" }}
// //                 >
// //                   Browse Templates
// //                 </button>
// //               </div>
// //             ) : (
// //               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
// //                 {resumes.map((resume) => (
// //                   <div
// //                     key={resume.id}
// //                     style={{
// //                       backgroundColor: "#fff",
// //                       border: "1px solid #e2e8f0",
// //                       borderRadius: "12px",
// //                       padding: "20px",
// //                       boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
// //                       transition: "all 0.3s",
// //                     }}
// //                   >
// //                     <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
// //                       <div style={{ backgroundColor: "#eff6ff", padding: "8px", borderRadius: "8px" }}>
// //                         <FileText color="#2563eb" size={20} />
// //                       </div>
// //                       <div style={{ flex: 1 }}>
// //                         <div style={{ fontWeight: "bold", color: "#1e293b", fontSize: "16px" }}>{resume.title || "Untitled Resume"}</div>
// //                         <div style={{ fontSize: "12px", color: "#64748b" }}>Created: {formatDate(resume.created_at)}</div>
// //                       </div>
// //                       {getStatusBadge(resume.status)}
// //                     </div>

// //                     <div style={{ marginBottom: "16px" }}>
// //                       <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px" }}>Template</div>
// //                       <div style={{ fontWeight: "500", color: "#475569" }}>{resume.template_name || "Default"}</div>
// //                     </div>

// //                     <div style={{ marginBottom: "16px" }}>
// //                       <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px" }}>Downloads</div>
// //                       <div style={{ fontWeight: "500", color: "#475569", display: "flex", alignItems: "center", gap: "6px" }}>
// //                         <Download size={14} /> {resume.download_count || 0}
// //                       </div>
// //                     </div>

// //                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "20px" }}>
// //                       <button
// //                         onClick={() => handleEditResume(resume.id)}
// //                         style={{
// //                           backgroundColor: "#f8fafc",
// //                           border: "1px solid #e2e8f0",
// //                           padding: "10px",
// //                           borderRadius: "8px",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           gap: "6px",
// //                           fontSize: "13px",
// //                           color: "#475569",
// //                         }}
// //                       >
// //                         <Edit3 size={14} /> Edit
// //                       </button>

// //                       <button
// //                         onClick={() => handleDownloadResume(resume.id, "pdf")}
// //                         style={{
// //                           backgroundColor: "#1e40af",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "10px",
// //                           borderRadius: "8px",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           gap: "6px",
// //                           fontSize: "13px",
// //                         }}
// //                       >
// //                         <Download size={14} /> PDF
// //                       </button>

// //                       <button
// //                         onClick={() => handleDownloadResume(resume.id, "word")}
// //                         style={{
// //                           backgroundColor: "#10b981",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "10px",
// //                           borderRadius: "8px",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           gap: "6px",
// //                           fontSize: "13px",
// //                         }}
// //                       >
// //                         <FileText size={14} /> Word
// //                       </button>

// //                       <button
// //                         onClick={() => handleDeleteResume(resume.id)}
// //                         style={{
// //                           backgroundColor: "#fee2e2",
// //                           color: "#dc2626",
// //                           border: "1px solid #fecaca",
// //                           padding: "10px",
// //                           borderRadius: "8px",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           gap: "6px",
// //                           fontSize: "13px",
// //                         }}
// //                       >
// //                         <Trash2 size={14} /> Delete
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           /* Profile */
// //           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
// //             <h1 style={{ fontSize: "32px", margin: "0 0 20px 0", fontWeight: "800", color: "#0f172a" }}>
// //               My Profile Details
// //             </h1>

// //             <div style={profileDetailCard}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
// //                 <div
// //                   style={{
// //                     backgroundColor: "#1e40af",
// //                     width: "60px",
// //                     height: "60px",
// //                     borderRadius: "50%",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     color: "white",
// //                     fontSize: "24px",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   {user?.name?.charAt(0)?.toUpperCase() || "S"}
// //                 </div>
// //                 <div>
// //                   <h2 style={{ margin: 0, color: "#1e293b" }}>{user?.name || "Student"}</h2>
// //                   <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "14px" }}>Student Account</p>
// //                 </div>
// //               </div>

// //               <div style={detailRow}>
// //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //                   <User size={16} color="#64748b" />
// //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Full Name</span>
// //                 </div>
// //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.name || "N/A"}</span>
// //               </div>

// //               <div style={detailRow}>
// //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //                   <Phone size={16} color="#64748b" />
// //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Mobile Number</span>
// //                 </div>
// //                 <span style={{ fontWeight: "800", color: "#111827" }}>
// //                   {user?.phone ? `+91 ${user.phone}` : "N/A"}
// //                 </span>
// //               </div>

// //               <div style={detailRow}>
// //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //                   <Mail size={16} color="#64748b" />
// //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Email Address</span>
// //                 </div>
// //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.email || "N/A"}</span>
// //               </div>

// //               <div style={detailRow}>
// //                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //                   <MapPin size={16} color="#64748b" />
// //                   <span style={{ fontWeight: "900", color: "#64748b" }}>Pincode</span>
// //                 </div>
// //                 <span style={{ fontWeight: "800", color: "#111827" }}>{user?.pincode || "N/A"}</span>
// //               </div>

// //               <div style={{ ...detailRow, borderBottom: "none" }}>
// //                 <span style={{ fontWeight: "900", color: "#64748b" }}>User ID</span>
// //                 <span style={{ fontWeight: "800", color: "#64748b", fontSize: "12px" }}>{user?.id || "N/A"}</span>
// //               </div>
// //             </div>

// //             <button
// //               onClick={handleLogout}
// //               style={{
// //                 marginTop: "32px",
// //                 padding: "14px 24px",
// //                 backgroundColor: "#fee2e2",
// //                 color: "#dc2626",
// //                 border: "1px solid #fecaca",
// //                 borderRadius: "12px",
// //                 cursor: "pointer",
// //                 fontWeight: "900",
// //                 fontSize: "14px",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: "8px",
// //               }}
// //             >
// //               <LogOut size={16} /> Logout from Dashboard
// //             </button>
// //           </div>
// //         )}
// //       </main>

// //       {/* ✅ Templates Modal */}
// //       {showTemplatesModal && (
// //         <div
// //           onClick={() => setShowTemplatesModal(false)}
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             left: 0,
// //             right: 0,
// //             bottom: 0,
// //             backgroundColor: "rgba(0, 0, 0, 0.5)",
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             zIndex: 1000,
// //             padding: "20px",
// //           }}
// //         >
// //           <div
// //             onClick={(e) => e.stopPropagation()}
// //             style={{
// //               backgroundColor: "white",
// //               borderRadius: "16px",
// //               width: "100%",
// //               maxWidth: "1200px",
// //               maxHeight: "90vh",
// //               overflow: "auto",
// //               padding: "24px",
// //             }}
// //           >
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
// //               <div>
// //                 <h2 style={{ fontSize: "24px", margin: 0, fontWeight: "bold", color: "#1e293b" }}>
// //                   Choose a Template
// //                 </h2>
// //                 <p style={{ margin: "4px 0 0 0", color: "#64748b" }}>
// //                   Select a template to start creating your resume
// //                 </p>
// //               </div>
// //               <button
// //                 onClick={() => setShowTemplatesModal(false)}
// //                 style={{
// //                   backgroundColor: "#f1f5f9",
// //                   border: "1px solid #e2e8f0",
// //                   borderRadius: "8px",
// //                   padding: "8px 16px",
// //                   fontWeight: "600",
// //                   cursor: "pointer",
// //                   color: "#475569",
// //                 }}
// //               >
// //                 Close
// //               </button>
// //             </div>

// //             {loadingTemplates ? (
// //               <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
// //                 <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
// //                 <div>Loading templates...</div>
// //               </div>
// //             ) : templates.length === 0 ? (
// //               <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
// //                 <FileText size={48} color="#cbd5e1" style={{ marginBottom: "16px" }} />
// //                 <p>No templates available at the moment. Please check back later.</p>
// //               </div>
// //             ) : (
// //               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
// //                 {templates.map((template) => (
// //                   <div
// //                     key={template.id}
// //                     style={{
// //                       ...templateCard,
// //                       boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
// //                     }}
// //                     onMouseEnter={(e) => {
// //                       e.currentTarget.style.transform = "translateY(-4px)";
// //                       e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
// //                       e.currentTarget.style.borderColor = "#3b82f6";
// //                     }}
// //                     onMouseLeave={(e) => {
// //                       e.currentTarget.style.transform = "translateY(0)";
// //                       e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
// //                       e.currentTarget.style.borderColor = "#e2e8f0";
// //                     }}
// //                   >
// //                     {template.preview_image ? (
// //                       <img
// //                         src={template.preview_image}
// //                         alt={template.name}
// //                         style={{
// //                           width: "100%",
// //                           height: "180px",
// //                           objectFit: "cover",
// //                           borderRadius: "8px",
// //                           marginBottom: "16px",
// //                           border: "1px solid #e2e8f0",
// //                         }}
// //                       />
// //                     ) : (
// //                       <div
// //                         style={{
// //                           width: "100%",
// //                           height: "180px",
// //                           borderRadius: "8px",
// //                           marginBottom: "16px",
// //                           backgroundColor: template.color || "#3b82f6",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           color: "white",
// //                           fontWeight: "bold",
// //                           fontSize: "18px",
// //                           textAlign: "center",
// //                           padding: "10px",
// //                         }}
// //                       >
// //                         {template.name}
// //                       </div>
// //                     )}

// //                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
// //                       <div>
// //                         <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "#1e293b" }}>
// //                           {template.name}
// //                         </h3>
// //                         <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748b" }}>
// //                           {template.category || "General"}
// //                         </p>
// //                       </div>

// //                       <span
// //                         style={{
// //                           backgroundColor: template.status === "active" ? "#dcfce7" : "#f3f4f6",
// //                           color: template.status === "active" ? "#166534" : "#374151",
// //                           fontSize: "10px",
// //                           fontWeight: "bold",
// //                           padding: "4px 8px",
// //                           borderRadius: "12px",
// //                         }}
// //                       >
// //                         {template.status === "active" ? "Active" : "Draft"}
// //                       </span>
// //                     </div>

// //                     <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
// //                       <span style={{ backgroundColor: "#e0f2fe", color: "#075985", fontSize: "11px", padding: "2px 8px", borderRadius: "12px" }}>
// //                         {template.layout || "Single Column"}
// //                       </span>
// //                       <span style={{ backgroundColor: "#f3f4f6", color: "#374151", fontSize: "11px", padding: "2px 8px", borderRadius: "12px" }}>
// //                         {template.downloads || 0} downloads
// //                       </span>
// //                     </div>

// //                     <div style={{ display: "flex", gap: "10px" }}>
// //                       {/* ✅ Preview (Admin-like modal) */}
// //                       <button
// //                         onClick={() => openTemplatePreview(template)}
// //                         style={{
// //                           flex: 1,
// //                           backgroundColor: "#f8fafc",
// //                           border: "1px solid #e2e8f0",
// //                           padding: "10px",
// //                           borderRadius: "8px",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                           fontSize: "13px",
// //                           color: "#475569",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           gap: "6px",
// //                         }}
// //                       >
// //                         <Eye size={14} /> Preview
// //                       </button>

// //                       {/* ✅ Use This (Admin-like redirect) */}
// //                       <button
// //                         onClick={() => handleUseTemplate(template.id)}
// //                         style={{
// //                           flex: 1,
// //                           backgroundColor: "#1e40af",
// //                           color: "white",
// //                           border: "none",
// //                           padding: "10px",
// //                           borderRadius: "8px",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                           fontSize: "13px",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           gap: "6px",
// //                         }}
// //                       >
// //                         <Plus size={14} /> Use This
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* ✅ Admin-like Preview Modal */}
// //       {previewOpen && (
// //         <div
// //           onClick={() => setPreviewOpen(false)}
// //           style={{
// //             position: "fixed",
// //             inset: 0,
// //             background: "rgba(0,0,0,0.45)",
// //             display: "grid",
// //             placeItems: "center",
// //             padding: 20,
// //             zIndex: 2000,
// //           }}
// //         >
// //           <div
// //             onClick={(e) => e.stopPropagation()}
// //             style={{
// //               background: "white",
// //               borderRadius: 16,
// //               border: "1px solid #e5e7eb",
// //               padding: 20,
// //               width: "92%",
// //               maxWidth: 700,
// //               maxHeight: "86vh",
// //               overflow: "auto",
// //             }}
// //           >
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
// //               <div style={{ fontWeight: 900, fontSize: 18 }}>{previewTitle}</div>
// //               <button
// //                 onClick={() => setPreviewOpen(false)}
// //                 style={{
// //                   border: "1px solid #e5e7eb",
// //                   background: "white",
// //                   borderRadius: 10,
// //                   padding: "8px 12px",
// //                   fontWeight: 900,
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 Close
// //               </button>
// //             </div>

// //             {previewLoading ? (
// //               <div style={{ padding: 30, textAlign: "center", color: "#64748b" }}>
// //                 <Loader2 size={28} className="animate-spin" style={{ margin: "0 auto 10px" }} />
// //                 <div>Loading preview...</div>
// //               </div>
// //             ) : (
// //               <div style={{ display: "grid", placeItems: "center" }}>
// //                 <ResumePreview schema={previewSchema || {}} />
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* Global CSS for animations */}
// //       <style>{`
// //         @keyframes fadeIn { 
// //           from { opacity: 0; transform: translateY(10px); } 
// //           to { opacity: 1; transform: translateY(0); } 
// //         }

// //         @keyframes spin {
// //           from { transform: rotate(0deg); }
// //           to { transform: rotate(360deg); }
// //         }

// //         .animate-spin {
// //           animation: spin 1s linear infinite;
// //         }

// //         button:hover:not(:disabled) {
// //           transform: translateY(-1px);
// //         }

// //         button:disabled {
// //           opacity: 0.6;
// //           cursor: not-allowed;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // src/pages/Dashboard.tsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axiosInstance";
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
//   schema?: any; // ✅ for mini preview
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

//   // ✅ Create resume loader per template
//   const [creatingResume, setCreatingResume] = useState<number | null>(null);

//   // ✅ Preview modal (admin-like)
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewSchema, setPreviewSchema] = useState<any>(null);
//   const [previewLoading, setPreviewLoading] = useState(false);
//   const [previewTitle, setPreviewTitle] = useState("Template Preview");

//   // ---- Helpers
//   const normalizeMediaUrl = (src?: string) => {
//     if (!src) return "";
//     if (/^https?:\/\//i.test(src)) return src;
//     // axios baseURL = http://127.0.0.1:8000/api → we need origin
//     const base = String((axios as any).defaults?.baseURL || "http://127.0.0.1:8000/api").replace(
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

//   // ---- Fetchers
//   const fetchResumes = async () => {
//     try {
//       setLoadingResumes(true);
//       const res = await axios.get("/auth/student/resumes/", { headers: authHeaders() });
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
//       const res = await axios.get("/auth/student/templates/", { headers: authHeaders() });
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

//         const storedUser = JSON.parse(localStorage.getItem("user") || "null") as UserType;
//         if (!storedUser) {
//           navigate("/login", { replace: true });
//           return;
//         }
//         setUser(storedUser);

//         const statsRes = await axios.get("/auth/student/dashboard/stats/", { headers: authHeaders() });
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [navigate]);

//   // ---- Actions
//   const handleLogout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.removeItem("user");
//     navigate("/login", { replace: true });
//   };

//   const handleEditResume = (resumeId: number) => {
//     navigate(`/student/resume/edit/${resumeId}`);
//   };

//   const handleDeleteResume = async (resumeId: number) => {
//     if (!window.confirm("Are you sure you want to delete this resume?")) return;

//     try {
//       await axios.delete(`/auth/student/resumes/${resumeId}/`, { headers: authHeaders() });

//       const updated = resumes.filter((r) => r.id !== resumeId);
//       setResumes(updated);

//       setStats((prev) => ({
//         ...prev,
//         totalResumes: Math.max(0, prev.totalResumes - 1),
//         completed: updated.filter((r) => r.status === "completed").length,
//         inProgress: updated.filter((r) => r.status === "draft" || r.status === "in_progress").length,
//       }));
//     } catch (err) {
//       console.error("Error deleting resume:", err);
//       alert("Failed to delete resume");
//     }
//   };

//   // ✅ backend currently just TRACKS download. Real file export endpoint is not in your urls.
//   const handleDownloadResume = async (resumeId: number, format: "pdf" | "word" = "pdf") => {
//     try {
//       await axios.post(`/auth/student/resumes/${resumeId}/download/`, {}, { headers: authHeaders() });

//       // update local state
//       setResumes((prev) =>
//         prev.map((r) => (r.id === resumeId ? { ...r, download_count: (r.download_count || 0) + 1 } : r))
//       );
//       setStats((prev) => ({ ...prev, downloads: prev.downloads + 1 }));

//       alert(`Download tracked (${format.toUpperCase()}). Export endpoint abhi backend me add karna padega.`);
//     } catch (err) {
//       console.error("Download error:", err);
//       alert("Failed to track download");
//     }
//   };

//   // ✅ “Use This” = create resume in STUDENT API
//   const handleUseTemplate = async (templateId: number) => {
//     if (!requireStudentSession()) return;

//     try {
//       setCreatingResume(templateId);

//       // IMPORTANT: backend expects 'template' not 'template_id'
//       // const res = await axios.post(
//       //   "/auth/student/resumes/",
//       //   { template: templateId, title: "New Resume" },
//       //   { headers: authHeaders() }
//       // );
// //        const res = await axios.post(
// //   "/auth/student/resumes/",
// //   { template_id: templateId, title: "New Resume" },
// //   { headers: authHeaders() }
// // );
// const res = await axios.post(
//   "/auth/student/resumes/",
//   { template_id: templateId, title: "New Resume" },
//   { headers: authHeaders() }
// );

// // ✅ correct route
// navigate(`/resume/edit/${res.data.id}`);



     
//      // navigate(`/student/resume/edit/${res.data.id}`);
//     } catch (err: any) {
//       console.error("Use template error:", err);
//       if (err?.response?.status === 401 || err?.response?.status === 403) {
//         alert("Session expired. Please login again.");
//         navigate("/login");
//         return;
//       }
//       alert("Failed to create resume. Please try again.");
//     } finally {
//       setCreatingResume(null);
//     }
//   };

//   // ✅ Preview modal (admin-like)
//   const openTemplatePreview = async (template: Template) => {
//     if (!requireStudentSession()) return;

//     setPreviewTitle(template?.name ? `Preview: ${template.name}` : "Template Preview");
//     setPreviewOpen(true);

//     if (template?.schema) {
//       setPreviewSchema(template.schema);
//       return;
//     }

//     try {
//       setPreviewLoading(true);
//       const detail = await axios.get(`/auth/student/templates/${template.id}/`, { headers: authHeaders() });
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
//       return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
//     } catch {
//       return dateString;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const statusMap: Record<string, { bg: string; color: string; text: string }> = {
//       draft: { bg: "#f1f5f9", color: "#64748b", text: "Draft" },
//       in_progress: { bg: "#fef3c7", color: "#92400e", text: "In Progress" },
//       completed: { bg: "#dcfce7", color: "#166534", text: "Completed" },
//       published: { bg: "#dbeafe", color: "#1e40af", text: "Published" },
//     };
//     const s = statusMap[status] || { bg: "#f3f4f6", color: "#374151", text: status };

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

//   // ✅ Template thumbnail: prefer image → else mini schema preview → else color block
//   const templateThumb = (t: Template) => {
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

//   // ---- Loading Screen
//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
//         <div style={{ textAlign: "center" }}>
//           <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
//           <div style={{ fontSize: 16, color: "#64748b" }}>Loading Dashboard...</div>
//         </div>
//       </div>
//     );
//   }

//   // ---- Styles
//   const pageContainer: React.CSSProperties = {
//     backgroundColor: "#f8fafc",
//     minHeight: "100vh",
//     width: "100vw",
//     display: "flex",
//     flexDirection: "column",
//     fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
//       {/* Navbar */}
//       <header style={headerStyle}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <div style={{ backgroundColor: "#1e40af", padding: 8, borderRadius: 8 }}>
//             <FileText color="white" size={20} />
//           </div>
//           <div style={{ lineHeight: 1.2 }}>
//             <div style={{ fontWeight: "bold", fontSize: 18, color: "#1e293b" }}>Resume Builder Pro</div>
//             <div style={{ fontSize: 12, color: "#64748b" }}>Student Dashboard</div>
//           </div>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <User size={16} color="#64748b" />
//             <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>{user?.name || "Student"}</span>
//           </div>
//           <span style={{ border: "1px solid #e2e8f0", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: "bold", color: "#64748b" }}>
//             FREE Plan
//           </span>
//           <div style={{ cursor: "pointer" }} onClick={handleLogout} title="Logout">
//             <LogOut size={20} color="#94a3b8" />
//           </div>
//         </div>
//       </header>

//       <main style={mainContent}>
//         {error && (
//           <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", color: "#dc2626", padding: 16, borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
//             <AlertCircle size={20} />
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Tabs */}
//         <div style={{ display: "flex", gap: 8, marginBottom: 30, borderBottom: "1px solid #e2e8f0", paddingBottom: 10 }}>
//           <button onClick={() => setActiveTab("home")} style={{ backgroundColor: activeTab === "home" ? "#1e40af" : "transparent", color: activeTab === "home" ? "white" : "#64748b", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
//             Overview
//           </button>
//           <button onClick={() => setActiveTab("resumes")} style={{ backgroundColor: activeTab === "resumes" ? "#1e40af" : "transparent", color: activeTab === "resumes" ? "white" : "#64748b", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
//             My Resumes
//           </button>
//           <button onClick={() => setActiveTab("profile")} style={{ backgroundColor: activeTab === "profile" ? "#1e40af" : "transparent", color: activeTab === "profile" ? "white" : "#64748b", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
//             Profile
//           </button>

//           <button onClick={openTemplatesModal} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
//             <Plus size={16} /> Browse Templates
//           </button>
//         </div>

//         {/* HOME */}
//         {activeTab === "home" ? (
//           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
//             {/* Hero */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
//               <div>
//                 <h1 style={{ fontSize: 32, margin: 0, fontWeight: 800, color: "#0f172a" }}>Welcome back, {user?.name || "Student"}!</h1>
//                 <p style={{ color: "#64748b", marginTop: 4, fontSize: 16 }}>Create professional resumes in minutes</p>
//               </div>

//               <button onClick={openTemplatesModal} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
//                 <Plus size={18} strokeWidth={3} /> Create New Resume
//               </button>
//             </div>

//             {/* Stats */}
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

//             {/* Upgrade */}
//             <div style={upgradeBox}>
//               <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
//                 <div style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: 12, borderRadius: "50%", display: "flex" }}>
//                   <Crown color="white" size={24} />
//                 </div>
//                 <div>
//                   <h2 style={{ fontSize: 20, fontWeight: "bold", margin: "0 0 8px 0", color: "white" }}>Upgrade to Pro</h2>
//                   <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 12 }}>
//                     Unlock premium templates, AI features, and unlimited downloads
//                   </p>
//                 </div>
//               </div>
//               <div style={{ textAlign: "right" }}>
//                 <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>
//                   ₹999 <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.9)" }}>/year</span>
//                 </div>
//                 <button style={{ backgroundColor: "white", color: "#1e40af", border: "none", padding: "10px 24px", borderRadius: 6, fontWeight: "bold", marginTop: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
//                   <PlusCircle size={16} /> Upgrade Now
//                 </button>
//               </div>
//             </div>

//             {/* Recent Resumes */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
//               <div>
//                 <h3 style={{ margin: 0, fontWeight: "bold", fontSize: 18, color: "#0f172a" }}>Recent Resumes</h3>
//                 <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#94a3b8" }}>Your recently modified resumes</p>
//               </div>
//               {resumes.length > 0 && (
//                 <button onClick={() => setActiveTab("resumes")} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: "bold", cursor: "pointer", color: "#475569" }}>
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
//                 <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>Create your first resume to get started</p>
//                 <button onClick={openTemplatesModal} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
//                   Create First Resume
//                 </button>
//               </div>
//             ) : (
//               resumes.slice(0, 5).map((resume) => (
//                 <div key={resume.id} style={{ ...resumeItemStyle, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//                     <div style={{ backgroundColor: "#eff6ff", padding: 10, borderRadius: 10 }}>
//                       <FileText color="#2563eb" size={24} />
//                     </div>
//                     <div>
//                       <div style={{ fontWeight: "bold", color: "#1e293b", fontSize: 16 }}>{resume.title || "Untitled Resume"}</div>
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
//                       <div style={{ cursor: "pointer" }} onClick={() => handleDownloadResume(resume.id, "pdf")} title="Download PDF">
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
//         ) : activeTab === "resumes" ? (
//           // RESUMES TAB (same behavior, buttons working)
//           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//               <div>
//                 <h1 style={{ fontSize: 28, margin: 0, fontWeight: 800, color: "#0f172a" }}>My Resumes</h1>
//                 <p style={{ color: "#64748b", marginTop: 4 }}>Manage all your created resumes</p>
//               </div>
//               <button onClick={openTemplatesModal} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
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
//                 <button onClick={openTemplatesModal} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 16 }}>
//                   Browse Templates
//                 </button>
//               </div>
//             ) : (
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 20 }}>
//                 {resumes.map((resume) => (
//                   <div key={resume.id} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
//                       <div style={{ backgroundColor: "#eff6ff", padding: 8, borderRadius: 8 }}>
//                         <FileText color="#2563eb" size={20} />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <div style={{ fontWeight: "bold", color: "#1e293b", fontSize: 16 }}>{resume.title || "Untitled Resume"}</div>
//                         <div style={{ fontSize: 12, color: "#64748b" }}>Created: {formatDate(resume.created_at)}</div>
//                       </div>
//                       {getStatusBadge(resume.status)}
//                     </div>

//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
//                       <button onClick={() => handleEditResume(resume.id)} style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
//                         <Edit3 size={14} /> Edit
//                       </button>
//                       <button onClick={() => handleDownloadResume(resume.id, "pdf")} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
//                         <Download size={14} /> PDF
//                       </button>
//                       <button onClick={() => handleDownloadResume(resume.id, "word")} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
//                         <FileText size={14} /> Word
//                       </button>
//                       <button onClick={() => handleDeleteResume(resume.id)} style={{ backgroundColor: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
//                         <Trash2 size={14} /> Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           // PROFILE
//           <div style={{ animation: "fadeIn 0.4s ease-in" }}>
//             <h1 style={{ fontSize: 32, margin: "0 0 20px 0", fontWeight: 800, color: "#0f172a" }}>My Profile Details</h1>

//             <div style={profileDetailCard}>
//               <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
//                 <div style={{ backgroundColor: "#1e40af", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 24, fontWeight: "bold" }}>
//                   {user?.name?.charAt(0)?.toUpperCase() || "S"}
//                 </div>
//                 <div>
//                   <h2 style={{ margin: 0, color: "#1e293b" }}>{user?.name || "Student"}</h2>
//                   <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: 14 }}>Student Account</p>
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
//                 <span style={{ fontWeight: 800, color: "#111827" }}>{user?.phone ? `+91 ${user.phone}` : "N/A"}</span>
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
//                 <span style={{ fontWeight: 800, color: "#64748b", fontSize: 12 }}>{user?.id || "N/A"}</span>
//               </div>
//             </div>

//             <button onClick={handleLogout} style={{ marginTop: 32, padding: "14px 24px", backgroundColor: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 12, cursor: "pointer", fontWeight: 900, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
//               <LogOut size={16} /> Logout from Dashboard
//             </button>
//           </div>
//         )}
//       </main>

//       {/* Templates Modal */}
//       {showTemplatesModal && (
//         <div onClick={() => setShowTemplatesModal(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 20 }}>
//           <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "white", borderRadius: 16, width: "100%", maxWidth: 1200, maxHeight: "90vh", overflow: "auto", padding: 24 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//               <div>
//                 <h2 style={{ fontSize: 24, margin: 0, fontWeight: "bold", color: "#1e293b" }}>Choose a Template</h2>
//                 <p style={{ margin: "4px 0 0 0", color: "#64748b" }}>Select a template to start creating your resume</p>
//               </div>
//               <button onClick={() => setShowTemplatesModal(false)} style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 16px", fontWeight: 600, cursor: "pointer", color: "#475569" }}>
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
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
//                 {templates.map((template) => (
//                   <div key={template.id} style={{ ...templateCard, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
//                     {templateThumb(template)}

//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
//                       <div>
//                         <h3 style={{ margin: 0, fontSize: 16, fontWeight: "bold", color: "#1e293b" }}>{template.name}</h3>
//                         <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#64748b" }}>{template.category || "General"}</p>
//                       </div>
//                       <span style={{ backgroundColor: template.status === "active" ? "#dcfce7" : "#f3f4f6", color: template.status === "active" ? "#166534" : "#374151", fontSize: 10, fontWeight: "bold", padding: "4px 8px", borderRadius: 12 }}>
//                         {template.status === "active" ? "Active" : "Draft"}
//                       </span>
//                     </div>

//                     <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
//                       <span style={{ backgroundColor: "#e0f2fe", color: "#075985", fontSize: 11, padding: "2px 8px", borderRadius: 12 }}>
//                         {template.layout || "Single Column"}
//                       </span>
//                       <span style={{ backgroundColor: "#f3f4f6", color: "#374151", fontSize: 11, padding: "2px 8px", borderRadius: 12 }}>
//                         {template.downloads || 0} downloads
//                       </span>
//                     </div>

//                     <div style={{ display: "flex", gap: 10 }}>
//                       <button onClick={() => openTemplatePreview(template)} style={{ flex: 1, backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13, color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
//                         <Eye size={14} /> Preview
//                       </button>

//                       <button
//                         onClick={() => handleUseTemplate(template.id)}
//                         disabled={creatingResume === template.id}
//                         style={{
//                           flex: 1,
//                           backgroundColor: creatingResume === template.id ? "#93c5fd" : "#1e40af",
//                           color: "white",
//                           border: "none",
//                           padding: 10,
//                           borderRadius: 8,
//                           fontWeight: 600,
//                           cursor: "pointer",
//                           fontSize: 13,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           gap: 6,
//                         }}
//                       >
//                         {creatingResume === template.id ? (
//                           <>
//                             <Loader2 size={14} className="animate-spin" /> Creating...
//                           </>
//                         ) : (
//                           <>
//                             <Plus size={14} /> Use This
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Preview Modal */}
//       {previewOpen && (
//         <div onClick={() => setPreviewOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "grid", placeItems: "center", padding: 20, zIndex: 2000 }}>
//           <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 20, width: "92%", maxWidth: 700, maxHeight: "86vh", overflow: "auto" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//               <div style={{ fontWeight: 900, fontSize: 18 }}>{previewTitle}</div>
//               <button onClick={() => setPreviewOpen(false)} style={{ border: "1px solid #e5e7eb", background: "white", borderRadius: 10, padding: "8px 12px", fontWeight: 900, cursor: "pointer" }}>
//                 Close
//               </button>
//             </div>

//             {previewLoading ? (
//               <div style={{ padding: 30, textAlign: "center", color: "#64748b" }}>
//                 <Loader2 size={28} className="animate-spin" style={{ margin: "0 auto 10px" }} />
//                 <div>Loading preview...</div>
//               </div>
//             ) : (
//               <div style={{ display: "grid", placeItems: "center" }}>
//                 <ResumePreview schema={previewSchema || {}} />
//               </div>
//             )}
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
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
} from "lucide-react";

function authHeaders() {
  const token = localStorage.getItem("access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"home" | "resumes" | "profile">("home");

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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSchema, setPreviewSchema] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("Template Preview");

  const normalizeMediaUrl = (src?: string) => {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    const base = String((axios as any).defaults?.baseURL || "lightgoldenrodyellow-chinchilla-641242.hostingersite.com/api").replace(/\/api\/?$/, "");
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

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      const res = await axios.get("/auth/student/resumes/", { headers: authHeaders() });
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
      const res = await axios.get("/auth/student/templates/", { headers: authHeaders() });
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

        const storedUser = JSON.parse(localStorage.getItem("user") || "null") as UserType;
        if (!storedUser) {
          navigate("/login", { replace: true });
          return;
        }
        setUser(storedUser);

        const statsRes = await axios.get("/auth/student/dashboard/stats/", { headers: authHeaders() });
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

  // ✅ FIXED: route must match router => /resume/edit/:resumeId
  const handleEditResume = (resumeId: number) => {
    navigate(`/resume/edit/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId: number) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete(`/auth/student/resumes/${resumeId}/`, { headers: authHeaders() });

      const updated = resumes.filter((r) => r.id !== resumeId);
      setResumes(updated);

      setStats((prev) => ({
        ...prev,
        totalResumes: Math.max(0, prev.totalResumes - 1),
        completed: updated.filter((r) => r.status === "completed").length,
        inProgress: updated.filter((r) => r.status === "draft" || r.status === "in_progress").length,
      }));
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume");
    }
  };

  const handleDownloadResume = async (resumeId: number, format: "pdf" | "word" = "pdf") => {
    try {
      await axios.post(`/auth/student/resumes/${resumeId}/download/`, {}, { headers: authHeaders() });

      setResumes((prev) =>
        prev.map((r) => (r.id === resumeId ? { ...r, download_count: (r.download_count || 0) + 1 } : r))
      );
      setStats((prev) => ({ ...prev, downloads: prev.downloads + 1 }));

      alert(`Download tracked (${format.toUpperCase()}). Export endpoint abhi backend me add karna padega.`);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to track download");
    }
  };

  const handleUseTemplate = async (templateId: number) => {
    if (!requireStudentSession()) return;

    try {
      setCreatingResume(templateId);

      const res = await axios.post(
        "/auth/student/resumes/",
        { template_id: templateId, title: "New Resume" },
        { headers: authHeaders() }
      );

      // ✅ correct route (match router)
      setShowTemplatesModal(false);
      navigate(`/resume/edit/${res.data.id}`);
    } catch (err: any) {
      console.error("Use template error:", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }
      alert("Failed to create resume. Please try again.");
    } finally {
      setCreatingResume(null);
    }
  };

  const openTemplatePreview = async (template: Template) => {
    if (!requireStudentSession()) return;

    setPreviewTitle(template?.name ? `Preview: ${template.name}` : "Template Preview");
    setPreviewOpen(true);

    if (template?.schema) {
      setPreviewSchema(template.schema);
      return;
    }

    try {
      setPreviewLoading(true);
      const detail = await axios.get(`/auth/student/templates/${template.id}/`, { headers: authHeaders() });
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; color: string; text: string }> = {
      draft: { bg: "#f1f5f9", color: "#64748b", text: "Draft" },
      in_progress: { bg: "#fef3c7", color: "#92400e", text: "In Progress" },
      completed: { bg: "#dcfce7", color: "#166534", text: "Completed" },
      published: { bg: "#dbeafe", color: "#1e40af", text: "Published" },
    };
    const s = statusMap[status] || { bg: "#f3f4f6", color: "#374151", text: status };

    return (
      <span style={{ backgroundColor: s.bg, color: s.color, padding: "4px 12px", borderRadius: "20px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}>
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
          style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8, marginBottom: 16, border: "1px solid #e2e8f0" }}
        />
      );
    }

    if (t.schema) {
      return (
        <div style={{ width: "100%", height: 180, borderRadius: 8, marginBottom: 16, border: "1px solid #e2e8f0", overflow: "hidden", background: "#fff", position: "relative" }}>
          <div style={{ transform: "scale(0.35)", transformOrigin: "top left" }}>
            <ResumePreview schema={t.schema} />
          </div>
        </div>
      );
    }

    return (
      <div style={{ width: "100%", height: 180, borderRadius: 8, marginBottom: 16, backgroundColor: t.color || "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 18, textAlign: "center", padding: 10 }}>
        {t.name}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
          <div style={{ fontSize: 16, color: "#64748b" }}>Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  const pageContainer: React.CSSProperties = {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: 0,
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderBottom: "1px solid #e2e8f0",
    padding: "12px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  };

  const mainContent: React.CSSProperties = {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: 40,
    flex: 1,
  };

  const statsGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
  };

  const profileDetailCard: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: 30,
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
  };

  const templateCard: React.CSSProperties = {
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 20,
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  return (
    <div style={pageContainer}>
      <header style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ backgroundColor: "#1e40af", padding: 8, borderRadius: 8 }}>
            <FileText color="white" size={20} />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: "bold", fontSize: 18, color: "#1e293b" }}>Resume Builder Pro</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Student Dashboard</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <User size={16} color="#64748b" />
            <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>{user?.name || "Student"}</span>
          </div>
          <span style={{ border: "1px solid #e2e8f0", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: "bold", color: "#64748b" }}>FREE Plan</span>
          <div style={{ cursor: "pointer" }} onClick={handleLogout} title="Logout">
            <LogOut size={20} color="#94a3b8" />
          </div>
        </div>
      </header>

      <main style={mainContent}>
        {error && (
          <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", color: "#dc2626", padding: 16, borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 30, borderBottom: "1px solid #e2e8f0", paddingBottom: 10 }}>
          <button onClick={() => setActiveTab("home")} style={{ backgroundColor: activeTab === "home" ? "#1e40af" : "transparent", color: activeTab === "home" ? "white" : "#64748b", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Overview
          </button>

          <button onClick={() => setActiveTab("resumes")} style={{ backgroundColor: activeTab === "resumes" ? "#1e40af" : "transparent", color: activeTab === "resumes" ? "white" : "#64748b", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            My Resumes
          </button>

          <button onClick={() => setActiveTab("profile")} style={{ backgroundColor: activeTab === "profile" ? "#1e40af" : "transparent", color: activeTab === "profile" ? "white" : "#64748b", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Profile
          </button>

          <button onClick={openTemplatesModal} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <Plus size={16} /> Browse Templates
          </button>
        </div>

        {activeTab === "home" ? (
          <div style={{ animation: "fadeIn 0.4s ease-in" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 32, margin: 0, fontWeight: 800, color: "#0f172a" }}>Welcome back, {user?.name || "Student"}!</h1>
                <p style={{ color: "#64748b", marginTop: 4, fontSize: 16 }}>Create professional resumes in minutes</p>
              </div>

              <button onClick={openTemplatesModal} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}>
                <Plus size={18} strokeWidth={3} /> Create New Resume
              </button>
            </div>

            <div style={statsGrid}>
              <div style={cardBase}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
                  <FileText size={16} /> Total Resumes
                </div>
                <div style={{ fontSize: 36, fontWeight: "bold", color: "#1e293b" }}>{stats.totalResumes}</div>
              </div>

              <div style={cardBase}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
                  <CheckCircle size={16} color="#22c55e" /> Completed
                </div>
                <div style={{ fontSize: 36, fontWeight: "bold", color: "#16a34a" }}>{stats.completed}</div>
              </div>

              <div style={cardBase}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
                  <Clock size={16} color="#f59e0b" /> In Progress
                </div>
                <div style={{ fontSize: 36, fontWeight: "bold", color: "#d97706" }}>{stats.inProgress}</div>
              </div>

              <div style={cardBase}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
                  <Download size={16} /> Downloads
                </div>
                <div style={{ fontSize: 36, fontWeight: "bold", color: "#1e293b" }}>{stats.downloads}</div>
              </div>
            </div>

            <div style={upgradeBox}>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <div style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: 12, borderRadius: "50%", display: "flex" }}>
                  <Crown color="white" size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: "bold", margin: "0 0 8px 0", color: "white" }}>Upgrade to Pro</h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 12 }}>
                    Unlock premium templates, AI features, and unlimited downloads
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>
                  ₹999 <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.9)" }}>/year</span>
                </div>
                <button style={{ backgroundColor: "white", color: "#1e40af", border: "none", padding: "10px 24px", borderRadius: 6, fontWeight: "bold", marginTop: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
                  <PlusCircle size={16} /> Upgrade Now
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontWeight: "bold", fontSize: 18, color: "#0f172a" }}>Recent Resumes</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#94a3b8" }}>Your recently modified resumes</p>
              </div>
              {resumes.length > 0 && (
                <button onClick={() => setActiveTab("resumes")} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: "bold", cursor: "pointer", color: "#475569" }}>
                  View All
                </button>
              )}
            </div>

            {loadingResumes ? (
              <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>
                <Loader2 size={24} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
                <div>Loading resumes...</div>
              </div>
            ) : resumes.length === 0 ? (
              <div style={{ backgroundColor: "#fff", border: "2px dashed #e2e8f0", borderRadius: 12, padding: "60px 20px", textAlign: "center", marginTop: 20 }}>
                <FileText size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
                <h3 style={{ color: "#64748b", marginBottom: 8 }}>No Resumes Yet</h3>
                <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>Create your first resume to get started</p>
                <button onClick={openTemplatesModal} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
                  Create First Resume
                </button>
              </div>
            ) : (
              resumes.slice(0, 5).map((resume) => (
                <div key={resume.id} style={{ ...resumeItemStyle, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ backgroundColor: "#eff6ff", padding: 10, borderRadius: 10 }}>
                      <FileText color="#2563eb" size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#1e293b", fontSize: 16 }}>{resume.title || "Untitled Resume"}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                        Template: {resume.template_name || "—"} • Modified {formatDate(resume.updated_at)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    {getStatusBadge(resume.status)}
                    <div style={{ display: "flex", gap: 16, color: "#94a3b8" }}>
                      <div style={{ cursor: "pointer" }} onClick={() => handleEditResume(resume.id)} title="Edit Resume">
                        <Edit3 size={18} />
                      </div>
                      <div style={{ cursor: "pointer" }} onClick={() => handleDownloadResume(resume.id, "pdf")} title="Download PDF">
                        <Download size={18} />
                      </div>
                      <div style={{ cursor: "pointer", color: "#ef4444" }} onClick={() => handleDeleteResume(resume.id)} title="Delete Resume">
                        <Trash2 size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : activeTab === "resumes" ? (
          <div style={{ animation: "fadeIn 0.4s ease-in" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 28, margin: 0, fontWeight: 800, color: "#0f172a" }}>My Resumes</h1>
                <p style={{ color: "#64748b", marginTop: 4 }}>Manage all your created resumes</p>
              </div>
              <button onClick={openTemplatesModal} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <Plus size={16} /> Create New
              </button>
            </div>

            {loadingResumes ? (
              <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>
                <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
                <div>Loading your resumes...</div>
              </div>
            ) : resumes.length === 0 ? (
              <div style={{ backgroundColor: "#fff", border: "2px dashed #e2e8f0", borderRadius: 12, padding: "80px 20px", textAlign: "center", marginTop: 40 }}>
                <FileText size={64} color="#cbd5e1" style={{ marginBottom: 20 }} />
                <h2 style={{ color: "#64748b", marginBottom: 12 }}>No Resumes Created Yet</h2>
                <button onClick={openTemplatesModal} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 16 }}>
                  Browse Templates
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 20 }}>
                {resumes.map((resume) => (
                  <div key={resume.id} style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ backgroundColor: "#eff6ff", padding: 8, borderRadius: 8 }}>
                        <FileText color="#2563eb" size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "bold", color: "#1e293b", fontSize: 16 }}>{resume.title || "Untitled Resume"}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>Created: {formatDate(resume.created_at)}</div>
                      </div>
                      {getStatusBadge(resume.status)}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
                      <button onClick={() => handleEditResume(resume.id)} style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Edit3 size={14} /> Edit
                      </button>
                      <button onClick={() => handleDownloadResume(resume.id, "pdf")} style={{ backgroundColor: "#1e40af", color: "white", border: "none", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Download size={14} /> PDF
                      </button>
                      <button onClick={() => handleDownloadResume(resume.id, "word")} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <FileText size={14} /> Word
                      </button>
                      <button onClick={() => handleDeleteResume(resume.id)} style={{ backgroundColor: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ animation: "fadeIn 0.4s ease-in" }}>
            <h1 style={{ fontSize: 32, margin: "0 0 20px 0", fontWeight: 800, color: "#0f172a" }}>My Profile Details</h1>

            <div style={profileDetailCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ backgroundColor: "#1e40af", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 24, fontWeight: "bold" }}>
                  {user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div>
                  <h2 style={{ margin: 0, color: "#1e293b" }}>{user?.name || "Student"}</h2>
                  <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: 14 }}>Student Account</p>
                </div>
              </div>

              <div style={detailRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <User size={16} color="#64748b" />
                  <span style={{ fontWeight: 900, color: "#64748b" }}>Full Name</span>
                </div>
                <span style={{ fontWeight: 800, color: "#111827" }}>{user?.name || "N/A"}</span>
              </div>

              <div style={detailRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Phone size={16} color="#64748b" />
                  <span style={{ fontWeight: 900, color: "#64748b" }}>Mobile Number</span>
                </div>
                <span style={{ fontWeight: 800, color: "#111827" }}>{user?.phone ? `+91 ${user.phone}` : "N/A"}</span>
              </div>

              <div style={detailRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Mail size={16} color="#64748b" />
                  <span style={{ fontWeight: 900, color: "#64748b" }}>Email Address</span>
                </div>
                <span style={{ fontWeight: 800, color: "#111827" }}>{user?.email || "N/A"}</span>
              </div>

              <div style={detailRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MapPin size={16} color="#64748b" />
                  <span style={{ fontWeight: 900, color: "#64748b" }}>Pincode</span>
                </div>
                <span style={{ fontWeight: 800, color: "#111827" }}>{user?.pincode || "N/A"}</span>
              </div>

              <div style={{ ...detailRow, borderBottom: "none" }}>
                <span style={{ fontWeight: 900, color: "#64748b" }}>User ID</span>
                <span style={{ fontWeight: 800, color: "#64748b", fontSize: 12 }}>{user?.id || "N/A"}</span>
              </div>
            </div>

            <button onClick={handleLogout} style={{ marginTop: 32, padding: "14px 24px", backgroundColor: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 12, cursor: "pointer", fontWeight: 900, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <LogOut size={16} /> Logout from Dashboard
            </button>
          </div>
        )}
      </main>

      {/* Templates Modal */}
      {showTemplatesModal && (
        <div onClick={() => setShowTemplatesModal(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "white", borderRadius: 16, width: "100%", maxWidth: 1200, maxHeight: "90vh", overflow: "auto", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, margin: 0, fontWeight: "bold", color: "#1e293b" }}>Choose a Template</h2>
                <p style={{ margin: "4px 0 0 0", color: "#64748b" }}>Select a template to start creating your resume</p>
              </div>
              <button onClick={() => setShowTemplatesModal(false)} style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 16px", fontWeight: 600, cursor: "pointer", color: "#475569" }}>
                Close
              </button>
            </div>

            {loadingTemplates ? (
              <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>
                <Loader2 size={32} color="#3b82f6" className="animate-spin" style={{ margin: "0 auto 16px" }} />
                <div>Loading templates...</div>
              </div>
            ) : templates.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
                <FileText size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
                <p>No templates available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
                {templates.map((template) => (
                  <div key={template.id} style={{ ...templateCard, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    {templateThumb(template)}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: "bold", color: "#1e293b" }}>{template.name}</h3>
                        <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#64748b" }}>{template.category || "General"}</p>
                      </div>
                      <span style={{ backgroundColor: template.status === "active" ? "#dcfce7" : "#f3f4f6", color: template.status === "active" ? "#166534" : "#374151", fontSize: 10, fontWeight: "bold", padding: "4px 8px", borderRadius: 12 }}>
                        {template.status === "active" ? "Active" : "Draft"}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => openTemplatePreview(template)} style={{ flex: 1, backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: 10, borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13, color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Eye size={14} /> Preview
                      </button>

                      <button
                        onClick={() => handleUseTemplate(template.id)}
                        disabled={creatingResume === template.id}
                        style={{
                          flex: 1,
                          backgroundColor: creatingResume === template.id ? "#93c5fd" : "#1e40af",
                          color: "white",
                          border: "none",
                          padding: 10,
                          borderRadius: 8,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontSize: 13,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        {creatingResume === template.id ? (
                          <>
                            <Loader2 size={14} className="animate-spin" /> Creating...
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Use This
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewOpen && (
        <div onClick={() => setPreviewOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "grid", placeItems: "center", padding: 20, zIndex: 2000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 20, width: "92%", maxWidth: 700, maxHeight: "86vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>{previewTitle}</div>
              <button onClick={() => setPreviewOpen(false)} style={{ border: "1px solid #e5e7eb", background: "white", borderRadius: 10, padding: "8px 12px", fontWeight: 900, cursor: "pointer" }}>
                Close
              </button>
            </div>

            {previewLoading ? (
              <div style={{ padding: 30, textAlign: "center", color: "#64748b" }}>
                <Loader2 size={28} className="animate-spin" style={{ margin: "0 auto 10px" }} />
                <div>Loading preview...</div>
              </div>
            ) : (
              <div style={{ display: "grid", placeItems: "center" }}>
                <ResumePreview schema={previewSchema || {}} />
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default Dashboard;
