// // // // // src/pages/admin/AdminDashboard.tsx
// // // // import { useEffect, useMemo, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import axios from "../../api/axiosInstance";
// // // // import AdminTemplates from "./AdminTemplates";
// // // // import TemplatesPricing from "./AdminTemplatesPricing";
// // // // import Students from "./Students";

// // // // type AdminUser = {
// // // //   id: number;
// // // //   name: string;
// // // //   phone: string;
// // // //   email?: string;
// // // //   pincode: string;
// // // // };

// // // // export default function AdminDashboard() {
// // // //   const navigate = useNavigate();

// // // //   const [activeTab, setActiveTab] = useState<
// // // //     "dashboard" | "users" | "templates" | "templatespricing" | "students"
// // // //   >("dashboard");

// // // //   const [users, setUsers] = useState<AdminUser[]>([]);
// // // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// // // //   // ✅ safer: localStorage parsing only once (avoid re-render issues)
// // // //   const admin = useMemo(() => {
// // // //     try {
// // // //       return JSON.parse(localStorage.getItem("admin") || "null");
// // // //     } catch {
// // // //       return null;
// // // //     }
// // // //   }, []);

// // // //   // Auth Protection + initial fetch
// // // //   useEffect(() => {
// // // //     if (!admin) {
// // // //       navigate("/admin/login");
// // // //       return;
// // // //     }
// // // //     fetchUsers();
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [admin, navigate]);

// // // //   const fetchUsers = async () => {
// // // //     try {
// // // //       const res = await axios.get("/auth/admin/users/");
// // // //       setUsers(res.data || []);
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch users", err);
// // // //       // Dummy data fallback
// // // //       setUsers([
// // // //         { id: 1, name: "Rahul Sharma", phone: "9876543210", email: "rahul@test.com", pincode: "400001" },
// // // //         { id: 2, name: "Priya Singh", phone: "9123456789", email: "priya@test.com", pincode: "110001" },
// // // //       ]);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (id: number) => {
// // // //     if (!window.confirm("Are you sure you want to delete this user?")) return;
// // // //     try {
// // // //       await axios.delete(`/auth/admin/users/${id}/`);
// // // //       setUsers((prev) => prev.filter((u) => u.id !== id));
// // // //     } catch (err) {
// // // //       alert("Delete failed");
// // // //     }
// // // //   };

// // // //   const logout = () => {
// // // //     localStorage.clear();
// // // //     navigate("/admin/login");
// // // //   };

// // // //   const goTab = (tab: typeof activeTab) => {
// // // //     setActiveTab(tab);
// // // //     setIsMobileMenuOpen(false);
// // // //   };

// // // //   return (
// // // //     <div style={styles.adminWrapper}>
// // // //       <style>{`
// // // //         @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
// // // //         @media (max-width: 768px) {
// // // //           .sidebar { position: fixed; left: -300px; top: 0; z-index: 1000; height: 100vh; transition: 0.25s ease; }
// // // //           .sidebar.open { left: 0; }
// // // //           .main-area { width: 100vw; }
// // // //           .mobile-toggle { display: inline-flex !important; }
// // // //           .overlay { display: block !important; }
// // // //         }
// // // //       `}</style>

// // // //       {/* ✅ Mobile overlay */}
// // // //       {isMobileMenuOpen && (
// // // //         <div
// // // //           className="overlay"
// // // //           onClick={() => setIsMobileMenuOpen(false)}
// // // //           style={styles.mobileOverlay}
// // // //         />
// // // //       )}

// // // //       {/* --- SIDEBAR --- */}
// // // //       <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} style={styles.sidebar}>
// // // //         <div style={styles.sidebarLogo}>
// // // //           <div style={{ fontSize: 26 }}>🛡️</div>
// // // //           <div>
// // // //             <h2 style={styles.logoText}>Admin Pro</h2>
// // // //             <p style={styles.logoSub}>Resume Builder Console</p>
// // // //           </div>
// // // //         </div>

// // // //         <nav style={styles.navLinks}>
// // // //           <div
// // // //             style={navStyle(activeTab === "dashboard")}
// // // //             onClick={() => goTab("dashboard")}
// // // //           >
// // // //             📊 Dashboard
// // // //           </div>


// // // //           <div
// // // //             style={navStyle(activeTab === "templatespricing")}
// // // //             onClick={() => goTab("templatespricing")}
// // // //           >
// // // //             💰 Templates Pricing
// // // //           </div>

// // // //           <div
// // // //             style={navStyle(activeTab === "templates")}
// // // //             onClick={() => goTab("templates")}
// // // //           >
// // // //             📄 Resume Templates
// // // //           </div>

// // // //           <div
// // // //             style={navStyle(activeTab === "students")}
// // // //             onClick={() => goTab("students")}
// // // //           >
// // // //             🎓 Students
// // // //           </div>
// // // //         </nav>

// // // //         <div style={styles.sidebarBottom}>
// // // //           <p style={styles.adminName}>{admin?.name || "System Admin"}</p>
// // // //           <button
// // // //             style={styles.logoutBtn}
// // // //             onClick={logout}
// // // //             onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
// // // //             onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
// // // //           >
// // // //             Logout
// // // //           </button>
// // // //         </div>
// // // //       </aside>

// // // //       {/* --- MAIN CONTENT --- */}
// // // //       <main className="main-area" style={styles.mainArea}>
// // // //         <header style={styles.topHeader}>
// // // //           <button
// // // //             style={styles.mobileToggle}
// // // //             className="mobile-toggle"
// // // //             onClick={() => setIsMobileMenuOpen((s) => !s)}
// // // //             aria-label="Open Menu"
// // // //           >
// // // //             ☰
// // // //           </button>

// // // //           <h3 style={{ margin: 0, color: "#0f172a" }}>Console</h3>

// // // //           <div style={styles.statusContainer}>
// // // //             <div style={styles.statusPulse} />
// // // //             <span style={styles.statusText}>System Live</span>
// // // //           </div>
// // // //         </header>

// // // //         <div style={styles.contentPadding}>
// // // //           {activeTab === "dashboard" && (
// // // //             <div style={styles.fadeEffect}>
// // // //               <h1 style={styles.welcomeTitle}>Hello, Admin</h1>

// // // //               <div style={styles.statGrid}>
// // // //                 <div style={styles.statCard}>
// // // //                   <p style={styles.statLabel}>Total Users</p>
// // // //                   <h2 style={styles.statValue}>{users.length}</h2>
// // // //                 </div>

// // // //                 <div style={styles.statCard}>
// // // //                   <p style={styles.statLabel}>Active Now</p>
// // // //                   <h2 style={styles.statValue}>4</h2>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {activeTab === "templates" && (
// // // //             <div style={styles.fadeEffect}>
// // // //               <AdminTemplates />
// // // //             </div>
// // // //           )}

// // // //           {activeTab === "templatespricing" && (
// // // //             <div style={styles.fadeEffect}>
// // // //               <TemplatesPricing />
// // // //             </div>
// // // //           )}

// // // //           {activeTab === "students" && (
// // // //             <div style={styles.fadeEffect}>
// // // //               <Students />
// // // //             </div>
// // // //           )}

// // // //           {activeTab === "users" && (
// // // //             <div style={styles.fadeEffect}>
// // // //               <div style={styles.tableHeader}>
                
// // // //                 <button
// // // //                   style={styles.addBtn}
// // // //                   onClick={() => alert("Open Add User Modal")}
// // // //                   onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
// // // //                   onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
// // // //                 >
// // // //                   + Add User
// // // //                 </button>
// // // //               </div>

// // // //               <div style={styles.scrollContainer}>
// // // //                 <table style={styles.adminTable}>
// // // //                   <thead>
// // // //                     <tr style={styles.thRow}>
// // // //                       <th style={styles.th}>Name</th>
// // // //                       <th style={styles.th}>Mobile</th>
// // // //                       <th style={styles.th}>Pincode</th>
// // // //                       <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
// // // //                     </tr>
// // // //                   </thead>

// // // //                   <tbody>
// // // //                     {users.map((u) => (
// // // //                       <tr
// // // //                         key={u.id}
// // // //                         style={styles.tr}
// // // //                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
// // // //                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
// // // //                       >
// // // //                         <td style={styles.td}>{u.name}</td>
// // // //                         <td style={styles.td}>{u.phone}</td>
// // // //                         <td style={styles.td}>{u.pincode}</td>
// // // //                         <td style={{ ...styles.td, textAlign: "right", whiteSpace: "nowrap" }}>
// // // //                           <button
// // // //                             style={styles.editBtn}
// // // //                             onClick={() => alert("Edit " + u.name)}
// // // //                           >
// // // //                             Edit
// // // //                           </button>
// // // //                           <button
// // // //                             style={styles.delBtn}
// // // //                             onClick={() => handleDelete(u.id)}
// // // //                           >
// // // //                             Del
// // // //                           </button>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))}

// // // //                     {users.length === 0 && (
// // // //                       <tr>
// // // //                         <td colSpan={4} style={{ ...styles.td, padding: 18, textAlign: "center" }}>
// // // //                           No users found.
// // // //                         </td>
// // // //                       </tr>
// // // //                     )}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ---------- Styles ---------- */

// // // // const styles: Record<string, React.CSSProperties> = {
// // // //   adminWrapper: {
// // // //     display: "flex",
// // // //     width: "100vw",
// // // //     height: "100vh",
// // // //     backgroundColor: "#f1f5f9",
// // // //     fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// // // //     overflow: "hidden",
// // // //     position: "fixed",
// // // //     top: 0,
// // // //     left: 0,
// // // //   },

// // // //   mobileOverlay: {
// // // //     display: "none", // will show only on mobile via media query class
// // // //     position: "fixed",
// // // //     inset: 0,
// // // //     backgroundColor: "rgba(15, 23, 42, 0.35)",
// // // //     zIndex: 900,
// // // //   },

// // // //   sidebar: {
// // // //     width: 280,
// // // //     backgroundColor: "#0f172a",
// // // //     color: "#fff",
// // // //     display: "flex",
// // // //     flexDirection: "column",
// // // //     padding: "26px 18px",
// // // //     boxSizing: "border-box",
// // // //     flexShrink: 0,
// // // //   },

// // // //   sidebarLogo: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: 12,
// // // //     marginBottom: 22,
// // // //     padding: "6px 10px",
// // // //     borderRadius: 12,
// // // //     backgroundColor: "rgba(255,255,255,0.04)",
// // // //     border: "1px solid rgba(255,255,255,0.06)",
// // // //   },

// // // //   logoText: { margin: 0, fontSize: 18, fontWeight: 800 },
// // // //   logoSub: { margin: "2px 0 0", fontSize: 12, color: "#94a3b8" },

// // // //   navLinks: { display: "flex", flexDirection: "column", gap: 10, flexGrow: 1, marginTop: 12 },

// // // //   sidebarBottom: {
// // // //     borderTop: "1px solid #1e293b",
// // // //     paddingTop: 16,
// // // //   },

// // // //   adminName: { fontSize: 13, color: "#94a3b8", marginBottom: 10 },

// // // //   logoutBtn: {
// // // //     width: "100%",
// // // //     padding: "10px",
// // // //     backgroundColor: "#ef4444",
// // // //     color: "white",
// // // //     border: "none",
// // // //     borderRadius: 10,
// // // //     cursor: "pointer",
// // // //     fontWeight: 800,
// // // //   },

// // // //   mainArea: { flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" },

// // // //   topHeader: {
// // // //     height: 60,
// // // //     backgroundColor: "#fff",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     justifyContent: "space-between",
// // // //     padding: "0 18px",
// // // //     borderBottom: "1px solid #e2e8f0",
// // // //   },

// // // //   mobileToggle: {
// // // //     display: "none",
// // // //     background: "#0f172a",
// // // //     color: "#fff",
// // // //     border: "1px solid #0b1220",
// // // //     padding: "8px 12px",
// // // //     borderRadius: 10,
// // // //     cursor: "pointer",
// // // //   },

// // // //   statusContainer: { display: "flex", alignItems: "center", gap: 8 },
// // // //   statusPulse: { width: 8, height: 8, backgroundColor: "#22c55e", borderRadius: "50%" },
// // // //   statusText: { fontSize: 12, fontWeight: 800, color: "#64748b" },

// // // //   contentPadding: { padding: 20, overflowY: "auto", flexGrow: 1 },

// // // //   welcomeTitle: { fontSize: 22, color: "#0f172a", margin: 0, fontWeight: 850 },

// // // //   statGrid: {
// // // //     display: "grid",
// // // //     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
// // // //     gap: 14,
// // // //     marginTop: 16,
// // // //   },

// // // //   statCard: {
// // // //     backgroundColor: "#fff",
// // // //     padding: 18,
// // // //     borderRadius: 14,
// // // //     border: "1px solid #e2e8f0",
// // // //     boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
// // // //   },

// // // //   statLabel: { margin: 0, color: "#64748b", fontSize: 13, fontWeight: 700 },
// // // //   statValue: { margin: "8px 0 0", fontSize: 28, fontWeight: 900, color: "#0f172a" },

// // // //   tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 },

// // // //   addBtn: {
// // // //     backgroundColor: "#4f46e5",
// // // //     color: "#fff",
// // // //     border: "1px solid #4338ca",
// // // //     padding: "10px 14px",
// // // //     borderRadius: 12,
// // // //     cursor: "pointer",
// // // //     fontWeight: 900,
// // // //     boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
// // // //   },

// // // //   scrollContainer: {
// // // //     width: "100%",
// // // //     overflowX: "auto",
// // // //     backgroundColor: "#fff",
// // // //     borderRadius: 14,
// // // //     border: "1px solid #e2e8f0",
// // // //   },

// // // //   adminTable: { width: "100%", borderCollapse: "collapse", minWidth: 650 },

// // // //   thRow: { backgroundColor: "#f8fafc" },

// // // //   th: { textAlign: "left", padding: 12, color: "#64748b", fontSize: 13, fontWeight: 900 },

// // // //   td: { padding: 12, borderTop: "1px solid #f1f5f9", fontSize: 14, backgroundColor: "white" },

// // // //   tr: { transition: "0.2s", backgroundColor: "white" },

// // // //   editBtn: {
// // // //     padding: "7px 10px",
// // // //     marginRight: 8,
// // // //     backgroundColor: "#e0f2fe",
// // // //     color: "#0369a1",
// // // //     border: "1px solid #bae6fd",
// // // //     borderRadius: 10,
// // // //     cursor: "pointer",
// // // //     fontWeight: 800,
// // // //   },

// // // //   delBtn: {
// // // //     padding: "7px 10px",
// // // //     backgroundColor: "#fee2e2",
// // // //     color: "#dc2626",
// // // //     border: "1px solid #fecaca",
// // // //     borderRadius: 10,
// // // //     cursor: "pointer",
// // // //     fontWeight: 800,
// // // //   },

// // // //   fadeEffect: { animation: "fadeIn 0.35s ease-out" },
// // // // };

// // // // function navStyle(active: boolean): React.CSSProperties {
// // // //   return {
// // // //     padding: "12px 14px",
// // // //     borderRadius: 12,
// // // //     cursor: "pointer",
// // // //     color: active ? "#ffffff" : "#cbd5e1",
// // // //     backgroundColor: active ? "#4f46e5" : "transparent",
// // // //     transition: "0.2s",
// // // //     fontWeight: 800,
// // // //     userSelect: "none",
// // // //     border: active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
// // // //   };
// // // // }

// // // // src/pages/admin/AdminDashboard.tsx
// // // import { useEffect, useMemo, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "../../api/axiosInstance";
// // // import AdminTemplates from "./AdminTemplates";
// // // import TemplatesPricing from "./AdminTemplatesPricing";
// // // import Students from "./Students";
// // // import Subscriptions from "./Subscriptions";
// // // type AdminUser = {
// // //   id: number;
// // //   name: string;
// // //   phone: string;
// // //   email?: string;
// // //   pincode: string;
// // // };

// // // function getAccessToken() {
// // //   return localStorage.getItem("access") || "";
// // // }

// // // function authHeaders() {
// // //   const token = getAccessToken();
// // //   return token ? { Authorization: `Bearer ${token}` } : {};
// // // }

// // // export default function AdminDashboard() {
// // //   const navigate = useNavigate();

// // //   const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "templates" | "templatespricing" | "students"| "Subscriptions">("dashboard");

// // //   const [users, setUsers] = useState<AdminUser[]>([]);
// // //   const [templateCount, setTemplateCount] = useState(0);
// // //   const [pricingCount, setPricingCount] = useState(0);

// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// // //   const admin = useMemo(() => {
// // //     try {
// // //       return JSON.parse(localStorage.getItem("admin") || "null");
// // //     } catch {
// // //       return null;
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!admin) {
// // //       navigate("/admin/login");
// // //       return;
// // //     }
// // //     fetchAllCounts();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [admin, navigate]);

// // //   const fetchUsers = async () => {
// // //     const res = await axios.get("/auth/admin/users/", { headers: authHeaders() });
// // //     setUsers(res.data || []);
// // //   };

// // //   const fetchAllCounts = async () => {
// // //     try {
// // //       const [u, t, p] = await Promise.all([
// // //         axios.get("/auth/admin/users/", { headers: authHeaders() }),
// // //         axios.get("/auth/admin/templates/", { headers: authHeaders() }),
// // //         axios.get("/auth/admin/template-pricing/", { headers: authHeaders() }),
// // //       ]);
// // //       setUsers(u.data || []);
// // //       setTemplateCount((t.data || []).length);
// // //       setPricingCount((p.data || []).length);
// // //     } catch (err) {
// // //       console.error("Failed to fetch dashboard counts", err);
// // //       // if token invalid -> force logout
// // //       // navigate("/admin/login");
// // //     }
// // //   };

// // //   const handleDelete = async (id: number) => {
// // //     if (!window.confirm("Are you sure you want to delete this user?")) return;
// // //     try {
// // //       await axios.delete(`/auth/admin/users/${id}/`, { headers: authHeaders() });
// // //       setUsers((prev) => prev.filter((u) => u.id !== id));
// // //     } catch (err) {
// // //       alert("Delete failed");
// // //     }
// // //   };

// // //   const logout = () => {
// // //     localStorage.clear();
// // //     navigate("/admin/login");
// // //   };

// // //   const goTab = (tab: typeof activeTab) => {
// // //     setActiveTab(tab);
// // //     setIsMobileMenuOpen(false);
// // //   };

// // //   return (
// // //     <div style={styles.adminWrapper}>
// // //       <style>{`
// // //         @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
// // //         @media (max-width: 768px) {
// // //           .sidebar { position: fixed; left: -300px; top: 0; z-index: 1000; height: 100vh; transition: 0.25s ease; }
// // //           .sidebar.open { left: 0; }
// // //           .main-area { width: 100vw; }
// // //           .mobile-toggle { display: inline-flex !important; }
// // //           .overlay { display: block !important; }
// // //         }
// // //       `}</style>

// // //       {isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)} style={styles.mobileOverlay} />}

// // //       <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} style={styles.sidebar}>
// // //         <div style={styles.sidebarLogo}>
// // //           <div style={{ fontSize: 26 }}>🛡️</div>
// // //           <div>
// // //             <h2 style={styles.logoText}>Admin Pro</h2>
// // //             <p style={styles.logoSub}>Resume Builder Console</p>
// // //           </div>
// // //         </div>

// // //         <nav style={styles.navLinks}>
// // //           <div style={navStyle(activeTab === "dashboard")} onClick={() => goTab("dashboard")}>
// // //             📊 Dashboard
// // //           </div>

// // //           <div style={navStyle(activeTab === "templatespricing")} onClick={() => goTab("templatespricing")}>
// // //             💰 Templates Pricing
// // //           </div>

// // //           <div style={navStyle(activeTab === "templates")} onClick={() => goTab("templates")}>
// // //             📄 Resume Templates
// // //           </div>

// // //           <div style={navStyle(activeTab === "students")} onClick={() => goTab("students")}>
// // //             🎓 Students
// // //           </div>
// // //           <div style={navStyle(activeTab === "Subscriptions")} onClick={() => goTab("Subscriptions")}>
// // //             🎓 Subscriptions
// // //           </div>

// // //           {/* optional: show users tab */}
// // //           <div
// // //             style={navStyle(activeTab === "users")}
// // //             onClick={() => {
// // //               goTab("users");
// // //               fetchUsers();
// // //             }}
// // //           >
// // //             👤 Users
// // //           </div>
// // //         </nav>

// // //         <div style={styles.sidebarBottom}>
// // //           <p style={styles.adminName}>{admin?.name || "System Admin"}</p>
// // //           <button style={styles.logoutBtn} onClick={logout}>
// // //             Logout
// // //           </button>
// // //         </div>
// // //       </aside>

// // //       <main className="main-area" style={styles.mainArea}>
// // //         <header style={styles.topHeader}>
// // //           <button style={styles.mobileToggle} className="mobile-toggle" onClick={() => setIsMobileMenuOpen((s) => !s)} aria-label="Open Menu">
// // //             ☰
// // //           </button>

// // //           <h3 style={{ margin: 0, color: "#0f172a" }}>Console</h3>

// // //           <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
// // //             <button style={styles.addBtn} onClick={fetchAllCounts}>
// // //               Refresh
// // //             </button>
// // //             <div style={styles.statusContainer}>
// // //               <div style={styles.statusPulse} />
// // //               <span style={styles.statusText}>System Live</span>
// // //             </div>
// // //           </div>
// // //         </header>

// // //         <div style={styles.contentPadding}>
// // //           {activeTab === "dashboard" && (
// // //             <div style={styles.fadeEffect}>
// // //               <h1 style={styles.welcomeTitle}>Hello, Admin</h1>

// // //               <div style={styles.statGrid}>
// // //                 <div style={styles.statCard}>
// // //                   <p style={styles.statLabel}>Total Users</p>
// // //                   <h2 style={styles.statValue}>{users.length}</h2>
// // //                 </div>

// // //                 <div style={styles.statCard}>
// // //                   <p style={styles.statLabel}>Total Templates</p>
// // //                   <h2 style={styles.statValue}>{templateCount}</h2>
// // //                 </div>

// // //                 <div style={styles.statCard}>
// // //                   <p style={styles.statLabel}>Pricing Rows</p>
// // //                   <h2 style={styles.statValue}>{pricingCount}</h2>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {activeTab === "templates" && (
// // //             <div style={styles.fadeEffect}>
// // //               <AdminTemplates />
// // //             </div>
// // //           )}

// // //           {activeTab === "templatespricing" && (
// // //             <div style={styles.fadeEffect}>
// // //               <TemplatesPricing />
// // //             </div>
// // //           )}

// // //           {activeTab === "students" && (
// // //             <div style={styles.fadeEffect}>
// // //               <Students />
// // //             </div>
// // //           )}
// // //           {activeTab === "Subscriptions" && (
// // //             <div style={styles.fadeEffect}>
// // //               <Subscriptions />
// // //             </div>
// // //           )}

// // //           {activeTab === "users" && (
// // //             <div style={styles.fadeEffect}>
// // //               <div style={styles.tableHeader}>
// // //                 <h2 style={{ margin: 0, color: "#0f172a" }}>Users</h2>
// // //               </div>

// // //               <div style={styles.scrollContainer}>
// // //                 <table style={styles.adminTable}>
// // //                   <thead>
// // //                     <tr style={styles.thRow}>
// // //                       <th style={styles.th}>Name</th>
// // //                       <th style={styles.th}>Mobile</th>
// // //                       <th style={styles.th}>Pincode</th>
// // //                       <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
// // //                     </tr>
// // //                   </thead>

// // //                   <tbody>
// // //                     {users.map((u) => (
// // //                       <tr key={u.id} style={styles.tr}>
// // //                         <td style={styles.td}>{u.name}</td>
// // //                         <td style={styles.td}>{u.phone}</td>
// // //                         <td style={styles.td}>{u.pincode}</td>
// // //                         <td style={{ ...styles.td, textAlign: "right", whiteSpace: "nowrap" }}>
// // //                           <button style={styles.delBtn} onClick={() => handleDelete(u.id)}>
// // //                             Delete
// // //                           </button>
// // //                         </td>
// // //                       </tr>
// // //                     ))}

// // //                     {users.length === 0 && (
// // //                       <tr>
// // //                         <td colSpan={4} style={{ ...styles.td, padding: 18, textAlign: "center" }}>
// // //                           No users found.
// // //                         </td>
// // //                       </tr>
// // //                     )}
// // //                   </tbody>
// // //                 </table>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // /* ---------- Styles (same as your file, just reused) ---------- */

// // // const styles: Record<string, React.CSSProperties> = {
// // //   adminWrapper: {
// // //     display: "flex",
// // //     width: "100vw",
// // //     height: "100vh",
// // //     backgroundColor: "#f1f5f9",
// // //     fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// // //     overflow: "hidden",
// // //     position: "fixed",
// // //     top: 0,
// // //     left: 0,
// // //   },

// // //   mobileOverlay: {
// // //     display: "none",
// // //     position: "fixed",
// // //     inset: 0,
// // //     backgroundColor: "rgba(15, 23, 42, 0.35)",
// // //     zIndex: 900,
// // //   },

// // //   sidebar: {
// // //     width: 280,
// // //     backgroundColor: "#0f172a",
// // //     color: "#fff",
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     padding: "26px 18px",
// // //     boxSizing: "border-box",
// // //     flexShrink: 0,
// // //   },

// // //   sidebarLogo: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 12,
// // //     marginBottom: 22,
// // //     padding: "6px 10px",
// // //     borderRadius: 12,
// // //     backgroundColor: "rgba(255,255,255,0.04)",
// // //     border: "1px solid rgba(255,255,255,0.06)",
// // //   },

// // //   logoText: { margin: 0, fontSize: 18, fontWeight: 800 },
// // //   logoSub: { margin: "2px 0 0", fontSize: 12, color: "#94a3b8" },

// // //   navLinks: { display: "flex", flexDirection: "column", gap: 10, flexGrow: 1, marginTop: 12 },

// // //   sidebarBottom: { borderTop: "1px solid #1e293b", paddingTop: 16 },

// // //   adminName: { fontSize: 13, color: "#94a3b8", marginBottom: 10 },

// // //   logoutBtn: {
// // //     width: "100%",
// // //     padding: "10px",
// // //     backgroundColor: "#ef4444",
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: 10,
// // //     cursor: "pointer",
// // //     fontWeight: 800,
// // //   },

// // //   mainArea: { flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" },

// // //   topHeader: {
// // //     height: 60,
// // //     backgroundColor: "#fff",
// // //     display: "flex",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     padding: "0 18px",
// // //     borderBottom: "1px solid #e2e8f0",
// // //   },

// // //   mobileToggle: {
// // //     display: "none",
// // //     background: "#0f172a",
// // //     color: "#fff",
// // //     border: "1px solid #0b1220",
// // //     padding: "8px 12px",
// // //     borderRadius: 10,
// // //     cursor: "pointer",
// // //   },

// // //   statusContainer: { display: "flex", alignItems: "center", gap: 8 },
// // //   statusPulse: { width: 8, height: 8, backgroundColor: "#22c55e", borderRadius: "50%" },
// // //   statusText: { fontSize: 12, fontWeight: 800, color: "#64748b" },

// // //   contentPadding: { padding: 20, overflowY: "auto", flexGrow: 1 },

// // //   welcomeTitle: { fontSize: 22, color: "#0f172a", margin: 0, fontWeight: 850 },

// // //   statGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 16 },

// // //   statCard: { backgroundColor: "#fff", padding: 18, borderRadius: 14, border: "1px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },

// // //   statLabel: { margin: 0, color: "#64748b", fontSize: 13, fontWeight: 700 },
// // //   statValue: { margin: "8px 0 0", fontSize: 28, fontWeight: 900, color: "#0f172a" },

// // //   tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 },

// // //   addBtn: {
// // //     backgroundColor: "#4f46e5",
// // //     color: "#fff",
// // //     border: "1px solid #4338ca",
// // //     padding: "10px 14px",
// // //     borderRadius: 12,
// // //     cursor: "pointer",
// // //     fontWeight: 900,
// // //     boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
// // //   },

// // //   scrollContainer: { width: "100%", overflowX: "auto", backgroundColor: "#fff", borderRadius: 14, border: "1px solid #e2e8f0" },

// // //   adminTable: { width: "100%", borderCollapse: "collapse", minWidth: 650 },

// // //   thRow: { backgroundColor: "#f8fafc" },

// // //   th: { textAlign: "left", padding: 12, color: "#64748b", fontSize: 13, fontWeight: 900 },

// // //   td: { padding: 12, borderTop: "1px solid #f1f5f9", fontSize: 14, backgroundColor: "white" },

// // //   tr: { transition: "0.2s", backgroundColor: "white" },

// // //   delBtn: { padding: "7px 10px", backgroundColor: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 10, cursor: "pointer", fontWeight: 800 },

// // //   fadeEffect: { animation: "fadeIn 0.35s ease-out" },
// // // };

// // // function navStyle(active: boolean): React.CSSProperties {
// // //   return {
// // //     padding: "12px 14px",
// // //     borderRadius: 12,
// // //     cursor: "pointer",
// // //     color: active ? "#ffffff" : "#cbd5e1",
// // //     backgroundColor: active ? "#4f46e5" : "transparent",
// // //     transition: "0.2s",
// // //     fontWeight: 800,
// // //     userSelect: "none",
// // //     border: active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
// // //   };
// // // }


// // // src/pages/admin/AdminDashboard.tsx
// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "../../api/axiosInstance";

// // import AdminTemplates from "./AdminTemplates";
// // import TemplatesPricing from "./AdminTemplatesPricing";
// // import Students from "./Students";
// // import Subscriptions from "./Subscriptions";

// // /* =======================
// //    Types
// //    ======================= */
// // type AdminUser = {
// //   id: number;
// //   name: string;
// //   phone: string;
// //   email?: string;
// //   pincode: string;
// //   date_joined?: string;
// // };

// // type TemplateRow = {
// //   id: number;
// //   name: string;
// //   category?: string;
// //   status?: string;
// //   downloads?: number;
// //   rating?: number;
// //   created_at?: string;
// //   updated_at?: string;
// // };

// // type PricingRow = {
// //   id: number;
// //   templateName?: string;
// //   billing_type?: string;
// //   currency?: string;
// //   price?: number;
// //   final_price?: number;
// //   status?: string;
// //   created_at?: string;
// //   updated_at?: string;
// // };

// // type SubscriptionRow = {
// //   id: number;
// //   user_name?: string;
// //   user_email?: string;
// //   user_phone?: string;
// //   plan?: "Pro" | "Enterprise" | string;
// //   amount?: number;
// //   status?: "Active" | "Cancelled" | "Expired" | "Past Due" | string;
// //   start_date?: string;
// //   end_date?: string;
// //   auto_renew?: boolean;
// //   created_at?: string;
// // };

// // type PaymentRow = {
// //   id: number;
// //   amount?: number;
// //   status?: string;
// //   created_at?: string;
// // };

// // type AiUsageRow = {
// //   id: number;
// //   tokens?: number;
// //   cost?: number;
// //   created_at?: string;
// // };

// // /* =======================
// //    Auth helpers
// //    ======================= */
// // function getAccessToken() {
// //   return localStorage.getItem("access") || "";
// // }
// // function authHeaders() {
// //   const token = getAccessToken();
// //   return token ? { Authorization: `Bearer ${token}` } : {};
// // }

// // /* =======================
// //    Utils
// //    ======================= */
// // function safeNumber(n: any) {
// //   const x = Number(n);
// //   return Number.isFinite(x) ? x : 0;
// // }
// // function sumBy<T>(arr: T[], fn: (x: T) => number) {
// //   return arr.reduce((a, b) => a + safeNumber(fn(b)), 0);
// // }
// // function groupCount<T>(arr: T[], keyFn: (x: T) => string) {
// //   const map: Record<string, number> = {};
// //   for (const it of arr) {
// //     const k = keyFn(it) || "Unknown";
// //     map[k] = (map[k] || 0) + 1;
// //   }
// //   return map;
// // }
// // function toSeriesByDay(items: { created_at?: string; date_joined?: string }[], valueFn: (it: any) => number, days = 14) {
// //   const now = new Date();
// //   const map: Record<string, number> = {};

// //   for (const it of items as any[]) {
// //     const ts = it.created_at || it.date_joined;
// //     if (!ts) continue;
// //     const d = new Date(ts);
// //     if (Number.isNaN(d.getTime())) continue;
// //     const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
// //     map[key] = (map[key] || 0) + safeNumber(valueFn(it));
// //   }

// //   const labels: string[] = [];
// //   const values: number[] = [];
// //   for (let i = days - 1; i >= 0; i--) {
// //     const d = new Date(now);
// //     d.setDate(now.getDate() - i);
// //     const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
// //     labels.push(`${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`);
// //     values.push(map[key] || 0);
// //   }
// //   return { labels, values };
// // }

// // function niceTicks(min: number, max: number, count = 5) {
// //   // returns tick values from min..max
// //   if (max <= min) return [min, min + 1];
// //   const range = max - min;
// //   const step0 = range / (count - 1);

// //   const pow = Math.pow(10, Math.floor(Math.log10(step0)));
// //   const err = step0 / pow;

// //   let step = pow;
// //   if (err >= 7.5) step = 10 * pow;
// //   else if (err >= 3) step = 5 * pow;
// //   else if (err >= 1.5) step = 2 * pow;

// //   const start = Math.floor(min / step) * step;
// //   const end = Math.ceil(max / step) * step;

// //   const ticks: number[] = [];
// //   for (let v = start; v <= end + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));
// //   return ticks;
// // }

// // /* =======================
// //    Tooltip (global overlay)
// //    ======================= */
// // type Tip = {
// //   show: boolean;
// //   x: number;
// //   y: number;
// //   title: string;
// //   value: string;
// //   color?: string;
// // };
// // function Tooltip({ tip }: { tip: Tip }) {
// //   if (!tip.show) return null;
// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         left: tip.x + 12,
// //         top: tip.y + 12,
// //         background: "rgba(15,23,42,0.95)",
// //         color: "white",
// //         padding: "10px 12px",
// //         borderRadius: 12,
// //         boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
// //         zIndex: 5000,
// //         minWidth: 160,
// //         pointerEvents: "none",
// //         border: "1px solid rgba(255,255,255,0.08)",
// //       }}
// //     >
// //       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //         {tip.color ? <div style={{ width: 10, height: 10, borderRadius: 4, background: tip.color }} /> : null}
// //         <div style={{ fontWeight: 950 as any, fontSize: 13 }}>{tip.title}</div>
// //       </div>
// //       <div style={{ marginTop: 6, fontWeight: 900, fontSize: 14 }}>{tip.value}</div>
// //     </div>
// //   );
// // }

// // /* =======================
// //    Color palette (fixed)
// //    ======================= */


// //    // ✅ FIXED PALETTE (NO GREEN) — based on your screenshot vibe
// // const PALETTE = [
// //   "#2E3192", // deep indigo
// //   "#08115C", // navy
// //   "#6D1B7B", // purple
// //   "#E6005C", // magenta
// //   "#E91E63", // hot pink
// //   "#FF6F61", // coral
// //   "#F07C65", // salmon
// //   "#FF9800", // orange
// //   "#FFD200", // yellow
// //   "#C79B61", // tan
// //   "#D9C6B5", // beige
// //   "#F2F1E7", // off-white
// //   "#5B0B0B", // maroon
// //   "#3C7A8A", // teal (NOT green)
// //   "#111111", // near-black
// // ];

// // function pickColor(i: number) {
// //   return PALETTE[i % PALETTE.length];
// // }

// // /* =======================
// //    CHARTS (with axis + tooltip)
// //    ======================= */

// // function AxisY({
// //   x,
// //   y,
// //   h,
// //   ticks,
// //   maxLabelWidth = 36,
// // }: {
// //   x: number;
// //   y: number;
// //   h: number;
// //   ticks: number[];
// //   maxLabelWidth?: number;
// // }) {
// //   const maxTick = Math.max(...ticks);
// //   const minTick = Math.min(...ticks);
// //   const range = maxTick - minTick || 1;

// //   return (
// //     <g>
// //       {/* y axis line */}
// //       <line x1={x} y1={y} x2={x} y2={y + h} stroke="#e2e8f0" />
// //       {ticks.map((t, idx) => {
// //         const yy = y + h - ((t - minTick) / range) * h;
// //         return (
// //           <g key={idx}>
// //             <line x1={x - 4} y1={yy} x2={x} y2={yy} stroke="#cbd5e1" />
// //             <text x={x - 8} y={yy + 4} textAnchor="end" fontSize="11" fill="#64748b" fontWeight={900}>
// //               {t >= 1000 ? `${(t / 1000).toFixed(t % 1000 === 0 ? 0 : 1)}k` : String(t)}
// //             </text>
// //             {/* grid line */}
// //             <line x1={x} y1={yy} x2={x + 520 - maxLabelWidth} y2={yy} stroke="#f1f5f9" />
// //           </g>
// //         );
// //       })}
// //     </g>
// //   );
// // }

// // function BarChartPro({
// //   title,
// //   labels,
// //   values,
// //   tipSetter,
// //   height = 200,
// // }: {
// //   title?: string;
// //   labels: string[];
// //   values: number[];
// //   tipSetter: (t: Tip) => void;
// //   height?: number;
// // }) {
// //   const width = 560;
// //   const padL = 46;
// //   const padR = 16;
// //   const padT = 20;
// //   const padB = 34;

// //   const n = Math.max(values.length, 1);
// //   const max = Math.max(...values, 1);
// //   const ticks = niceTicks(0, max, 5);

// //   const innerW = width - padL - padR;
// //   const innerH = height - padT - padB;

// //   const gap = 10;
// //   const barW = Math.max(16, Math.floor((innerW - (n - 1) * gap) / n));

// //   return (
// //     <div style={styles.chartShell}>
// //       {title ? <div style={styles.chartHeader}>{title}</div> : null}
// //       <svg width={width} height={height} style={{ display: "block" }}>
// //         <AxisY x={padL} y={padT} h={innerH} ticks={ticks} />
// //         {/* X axis */}
// //         <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#e2e8f0" />

// //         {values.map((v, i) => {
// //           const color = pickColor(i);
// //           const h = (v / max) * innerH;
// //           const x = padL + i * (barW + gap);
// //           const y = padT + innerH - h;

// //           return (
// //             <g key={i}>
// //               {/* shadow */}
// //               <rect x={x + 3} y={y + 3} width={barW} height={h} rx={10} fill="#0f172a" opacity={0.08} />
// //               {/* main */}
// //               <rect
// //                 x={x}
// //                 y={y}
// //                 width={barW}
// //                 height={h}
// //                 rx={10}
// //                 fill={color}
// //                 onMouseMove={(e) => {
// //                   tipSetter({
// //                     show: true,
// //                     x: e.clientX,
// //                     y: e.clientY,
// //                     title: labels[i],
// //                     value: `${v}`,
// //                     color,
// //                   });
// //                 }}
// //                 onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
// //               />
// //               {/* highlight strip */}
// //               <rect x={x + 5} y={y + 8} width={Math.max(6, barW * 0.24)} height={Math.max(10, h - 16)} rx={8} fill="white" opacity={0.16} />

// //               {/* X labels */}
// //               <text x={x + barW / 2} y={padT + innerH + 20} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight={900}>
// //                 {(labels[i] || "").slice(0, 10)}
// //               </text>
// //             </g>
// //           );
// //         })}
// //       </svg>
// //     </div>
// //   );
// // }

// // function LineChartPro({
// //   title,
// //   labels,
// //   values,
// //   tipSetter,
// //   height = 210,
// // }: {
// //   title?: string;
// //   labels: string[];
// //   values: number[];
// //   tipSetter: (t: Tip) => void;
// //   height?: number;
// // }) {
// //   const width = 560;
// //   const padL = 46;
// //   const padR = 16;
// //   const padT = 20;
// //   const padB = 38;

// //   const min = Math.min(...values, 0);
// //   const max = Math.max(...values, 1);
// //   const ticks = niceTicks(min, max, 5);

// //   const innerW = width - padL - padR;
// //   const innerH = height - padT - padB;

// //   const range = max - min || 1;
// //   const pts = values.map((v, i) => {
// //     const x = padL + (i / Math.max(values.length - 1, 1)) * innerW;
// //     const y = padT + (1 - (v - min) / range) * innerH;
// //     return { x, y, v, label: labels[i] };
// //   });

// //   const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");

// //   return (
// //     <div style={styles.chartShell}>
// //       {title ? <div style={styles.chartHeader}>{title}</div> : null}
// //       <svg width={width} height={height} style={{ display: "block" }}>
// //         <AxisY x={padL} y={padT} h={innerH} ticks={ticks} />
// //         {/* X axis */}
// //         <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#e2e8f0" />

// //         {/* area fill */}
// //         <path d={`${d} L ${padL + innerW} ${padT + innerH} L ${padL} ${padT + innerH} Z`} fill="#0ea5e9" opacity={0.10} />

// //         {/* line */}
// //         <path d={d} fill="none" stroke="#0b5cff" strokeWidth={3.5} />

// //         {/* points */}
// //         {pts.map((p, i) => (
// //           <g key={i}>
// //             <circle
// //               cx={p.x}
// //               cy={p.y}
// //               r={5}
// //               fill="#ffffff"
// //               stroke="#0b5cff"
// //               strokeWidth={2.5}
// //               onMouseMove={(e) => {
// //                 tipSetter({
// //                   show: true,
// //                   x: e.clientX,
// //                   y: e.clientY,
// //                   title: p.label,
// //                   value: `${p.v}`,
// //                   color: "#0b5cff",
// //                 });
// //               }}
// //               onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
// //             />
// //           </g>
// //         ))}

// //         {/* X labels (only 3 to avoid clutter) */}
// //         <text x={padL} y={padT + innerH + 24} textAnchor="start" fontSize="11" fill="#64748b" fontWeight={900}>
// //           {labels[0]}
// //         </text>
// //         <text
// //           x={padL + innerW / 2}
// //           y={padT + innerH + 24}
// //           textAnchor="middle"
// //           fontSize="11"
// //           fill="#64748b"
// //           fontWeight={900}
// //         >
// //           {labels[Math.floor(labels.length / 2)]}
// //         </text>
// //         <text
// //           x={padL + innerW}
// //           y={padT + innerH + 24}
// //           textAnchor="end"
// //           fontSize="11"
// //           fill="#64748b"
// //           fontWeight={900}
// //         >
// //           {labels[labels.length - 1]}
// //         </text>
// //       </svg>
// //     </div>
// //   );
// // }

// // function PieChartPro({
// //   title,
// //   data,
// //   tipSetter,
// //   size = 200,
// // }: {
// //   title?: string;
// //   data: { label: string; value: number }[];
// //   tipSetter: (t: Tip) => void;
// //   size?: number;
// // }) {
// //   const colored = data.map((d, i) => ({ ...d, color: pickColor(i) }));
// //   const total = colored.reduce((a, b) => a + b.value, 0) || 1;

// //   const r = size / 2 - 12;
// //   const cx = size / 2;
// //   const cy = size / 2;

// //   let acc = 0;

// //   const slices = colored.map((d) => {
// //     const start = (acc / total) * Math.PI * 2;
// //     acc += d.value;
// //     const end = (acc / total) * Math.PI * 2;

// //     const x1 = cx + r * Math.cos(start);
// //     const y1 = cy + r * Math.sin(start);
// //     const x2 = cx + r * Math.cos(end);
// //     const y2 = cy + r * Math.sin(end);

// //     const largeArc = end - start > Math.PI ? 1 : 0;
// //     const path = [`M ${cx} ${cy}`, `L ${x1} ${y1}`, `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`, "Z"].join(" ");
// //     return { ...d, path };
// //   });

// //   return (
// //     <div style={styles.chartShell}>
// //       {title ? <div style={styles.chartHeader}>{title}</div> : null}
// //       <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
// //         <svg width={size} height={size} style={{ display: "block" }}>
// //           {slices.map((s, i) => (
// //             <path
// //               key={i}
// //               d={s.path}
// //               fill={s.color}
// //               stroke="white"
// //               strokeWidth={2}
// //               onMouseMove={(e) =>
// //                 tipSetter({
// //                   show: true,
// //                   x: e.clientX,
// //                   y: e.clientY,
// //                   title: s.label,
// //                   value: `${s.value} (${((s.value / total) * 100).toFixed(1)}%)`,
// //                   color: s.color,
// //                 })
// //               }
// //               onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
// //             />
// //           ))}
// //         </svg>

// //         <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
// //           {colored.map((d) => (
// //             <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //               <div style={{ width: 10, height: 10, borderRadius: 4, background: d.color }} />
// //               <div style={{ fontSize: 13, fontWeight: 950 as any, color: "#0f172a" }}>
// //                 {d.label}: <span style={{ color: "#334155" }}>{d.value}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function DonutPro({
// //   title,
// //   label,
// //   value,
// //   total,
// //   color = "#22c55e",
// //   tipSetter,
// // }: {
// //   title?: string;
// //   label: string;
// //   value: number;
// //   total: number;
// //   color?: string;
// //   tipSetter: (t: Tip) => void;
// // }) {
// //   const pct = total ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
// //   const r = 42;
// //   const c = 2 * Math.PI * r;
// //   const dash = (pct / 100) * c;

// //   return (
// //     <div style={{ ...styles.chartShell, width: 280 }}>
// //       {title ? <div style={styles.chartHeader}>{title}</div> : null}
// //       <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
// //         <svg
// //           width={120}
// //           height={120}
// //           onMouseMove={(e) =>
// //             tipSetter({
// //               show: true,
// //               x: e.clientX,
// //               y: e.clientY,
// //               title: label,
// //               value: `${pct.toFixed(1)}% (${value}/${total})`,
// //               color,
// //             })
// //           }
// //           onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
// //           style={{ cursor: "default" }}
// //         >
// //           <circle cx={60} cy={60} r={r} stroke="#e2e8f0" strokeWidth={10} fill="none" />
// //           <circle
// //             cx={60}
// //             cy={60}
// //             r={r}
// //             stroke={color}
// //             strokeWidth={10}
// //             fill="none"
// //             strokeDasharray={`${dash} ${c}`}
// //             strokeLinecap="round"
// //             transform="rotate(-90 60 60)"
// //           />
// //           <text x="60" y="60" textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="950" fill="#0f172a">
// //             {pct.toFixed(0)}%
// //           </text>
// //         </svg>

// //         <div>
// //           <div style={{ fontSize: 13, fontWeight: 950 as any, color: "#0f172a" }}>{label}</div>
// //           <div style={{ marginTop: 6, color: "#64748b", fontWeight: 900, fontSize: 12 }}>
// //             {value} / {total}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* =======================
// //    UI small blocks
// //    ======================= */
// // function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
// //   return (
// //     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
// //       <h3 style={{ margin: 0, color: "#0f172a", fontWeight: 950 as any }}>{title}</h3>
// //       <div style={{ color: "#64748b", fontSize: 12, fontWeight: 900 }}>{subtitle}</div>
// //     </div>
// //   );
// // }
// // function KpiCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
// //   return (
// //     <div style={styles.kpiCard}>
// //       <div style={styles.kpiTitle}>{title}</div>
// //       <div style={styles.kpiValue}>{value}</div>
// //       {sub ? <div style={styles.kpiSub}>{sub}</div> : null}
// //     </div>
// //   );
// // }
// // function Placeholder({ text }: { text: string }) {
// //   return <div style={styles.placeholderBox}>{text}</div>;
// // }

// // /* =======================
// //    Main Component
// //    ======================= */
// // export default function AdminDashboard() {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState<
// //     "dashboard" | "analytics" | "users" | "templates" | "templatespricing" | "students" | "subscriptions"
// //   >("dashboard");

// //   const [users, setUsers] = useState<AdminUser[]>([]);
// //   const [templates, setTemplates] = useState<TemplateRow[]>([]);
// //   const [pricing, setPricing] = useState<PricingRow[]>([]);
// //   const [subs, setSubs] = useState<SubscriptionRow[]>([]);
// //   const [payments, setPayments] = useState<PaymentRow[]>([]);
// //   const [aiUsage, setAiUsage] = useState<AiUsageRow[]>([]);

// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   const [tip, setTip] = useState<Tip>({ show: false, x: 0, y: 0, title: "", value: "" });

// //   const admin = useMemo(() => {
// //     try {
// //       return JSON.parse(localStorage.getItem("admin") || "null");
// //     } catch {
// //       return null;
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (!admin) {
// //       navigate("/admin/login");
// //       return;
// //     }
// //     fetchAll();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [admin, navigate]);

// //   const safeGet = async (url: string) => {
// //     try {
// //       const res = await axios.get(url, { headers: authHeaders() });
// //       return res.data;
// //     } catch {
// //       return null;
// //     }
// //   };

// //   const fetchAll = async () => {
// //     const [u, t, p, s, pay, ai] = await Promise.all([
// //       safeGet("/auth/admin/users/"),
// //       safeGet("/auth/admin/templates/"),
// //       safeGet("/auth/admin/template-pricing/"),
// //       safeGet("/auth/admin/subscriptions/"),
// //       safeGet("/auth/admin/payments/"), // optional
// //       safeGet("/auth/admin/ai-usage/"), // optional
// //     ]);

// //     setUsers(u || []);
// //     setTemplates(t || []);
// //     setPricing(p || []);
// //     setSubs(s || []);
// //     setPayments(pay || []);
// //     setAiUsage(ai || []);
// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     navigate("/admin/login");
// //   };

// //   const goTab = (tab: typeof activeTab) => {
// //     setActiveTab(tab);
// //     setIsMobileMenuOpen(false);
// //     setTip({ show: false, x: 0, y: 0, title: "", value: "" });
// //   };

// //   /* ===== Derived analytics ===== */
// //   // USERS
// //   const usersByPincode = groupCount(users, (u) => (u.pincode || "NA").slice(0, 3));
// //   const upLabels = Object.keys(usersByPincode).slice(0, 10);
// //   const upValues = upLabels.map((k) => usersByPincode[k]);
// //   const userJoinSeries = toSeriesByDay(users as any, () => 1, 14);

// //   // TEMPLATES
// //   const byCategory = groupCount(templates, (t) => t.category || "Other");
// //   const catLabels = Object.keys(byCategory).slice(0, 10);
// //   const catValues = catLabels.map((k) => byCategory[k]);

// //   const byStatus = groupCount(templates, (t) => t.status || "Unknown");
// //   const stLabels = Object.keys(byStatus);
// //   const stValues = stLabels.map((k) => byStatus[k]);

// //   const totalDownloads = sumBy(templates, (t) => safeNumber(t.downloads));
// //   const avgRating = templates.length ? sumBy(templates, (t) => safeNumber(t.rating)) / templates.length : 0;

// //   // PRICING
// //   const byBilling = groupCount(pricing, (p) => p.billing_type || "Unknown");
// //   const billLabels = Object.keys(byBilling);
// //   const billValues = billLabels.map((k) => byBilling[k]);
// //   const avgPrice = pricing.length ? sumBy(pricing, (p) => safeNumber(p.price)) / pricing.length : 0;
// //   const avgFinal = pricing.length ? sumBy(pricing, (p) => safeNumber(p.final_price)) / pricing.length : 0;

// //   // SUBS
// //   const subTotal = subs.length;
// //   const subActive = subs.filter((x) => (x.status || "") === "Active").length;
// //   const subCancelled = subs.filter((x) => (x.status || "") === "Cancelled").length;
// //   const subPastDue = subs.filter((x) => (x.status || "") === "Past Due").length;
// //   const subExpired = subs.filter((x) => (x.status || "") === "Expired").length;

// //   const monthlyRevenue = sumBy(subs.filter((x) => (x.status || "") === "Active"), (x) => safeNumber(x.amount));
// //   const churnRate = subTotal ? (subCancelled / subTotal) * 100 : 0;

// //   const planCounts = groupCount(subs, (x) => String(x.plan || "Unknown"));
// //   const planLabels = Object.keys(planCounts);
// //   const planValues = planLabels.map((k) => planCounts[k]);
// //   const subSeries = toSeriesByDay(subs as any, () => 1, 14);

// //   // PAYMENTS optional
// //   const paymentsTotal = payments.length;
// //   const paymentsSum = sumBy(payments, (p) => safeNumber(p.amount));
// //   const paymentSeries = toSeriesByDay(payments as any, (p) => safeNumber(p.amount), 14);

// //   // AI optional
// //   const aiTotalTokens = sumBy(aiUsage, (a) => safeNumber(a.tokens));
// //   const aiTotalCost = sumBy(aiUsage, (a) => safeNumber(a.cost));
// //   const aiCostSeries = toSeriesByDay(aiUsage as any, (a) => safeNumber(a.cost), 14);
// //   const aiTokensSeries = toSeriesByDay(aiUsage as any, (a) => safeNumber(a.tokens), 14);

// //   return (
// //     <div style={styles.adminWrapper}>
// //       <Tooltip tip={tip} />

// //       <style>{`
// //         @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
// //         @media (max-width: 768px) {
// //           .sidebar { position: fixed; left: -300px; top: 0; z-index: 1000; height: 100vh; transition: 0.25s ease; }
// //           .sidebar.open { left: 0; }
// //           .main-area { width: 100vw; }
// //           .mobile-toggle { display: inline-flex !important; }
// //           .overlay { display: block !important; }
// //         }
// //       `}</style>

// //       {isMobileMenuOpen && (
// //         <div className="overlay" onClick={() => setIsMobileMenuOpen(false)} style={styles.mobileOverlay} />
// //       )}

// //       <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} style={styles.sidebar}>
// //         <div style={styles.sidebarLogo}>
// //           <div style={{ fontSize: 26 }}>🛡️</div>
// //           <div>
// //             <h2 style={styles.logoText}>Admin Pro</h2>
// //             <p style={styles.logoSub}>Resume Builder Console</p>
// //           </div>
// //         </div>

// //         <nav style={styles.navLinks}>
// //           <div style={navStyle(activeTab === "dashboard")} onClick={() => goTab("dashboard")}>
// //             📊 Dashboard
// //           </div>

// //           <div style={navStyle(activeTab === "analytics")} onClick={() => goTab("analytics")}>
// //             📈 Analytics
// //           </div>

// //           <div style={navStyle(activeTab === "templatespricing")} onClick={() => goTab("templatespricing")}>
// //             💰 Templates Pricing
// //           </div>

// //           <div style={navStyle(activeTab === "templates")} onClick={() => goTab("templates")}>
// //             📄 Resume Templates
// //           </div>

// //           <div style={navStyle(activeTab === "students")} onClick={() => goTab("students")}>
// //             🎓 Students
// //           </div>

// //           <div style={navStyle(activeTab === "subscriptions")} onClick={() => goTab("subscriptions")}>
// //             🧾 Subscriptions
// //           </div>

// //           <div style={navStyle(activeTab === "users")} onClick={() => goTab("users")}>
// //             👤 Users
// //           </div>
// //         </nav>

// //         <div style={styles.sidebarBottom}>
// //           <p style={styles.adminName}>{admin?.name || "System Admin"}</p>
// //           <button style={styles.logoutBtn} onClick={logout}>
// //             Logout
// //           </button>
// //         </div>
// //       </aside>

// //       <main className="main-area" style={styles.mainArea}>
// //         <header style={styles.topHeader}>
// //           <button
// //             style={styles.mobileToggle}
// //             className="mobile-toggle"
// //             onClick={() => setIsMobileMenuOpen((s) => !s)}
// //             aria-label="Open Menu"
// //           >
// //             ☰
// //           </button>

// //           <h3 style={{ margin: 0, color: "#0f172a" }}>Console</h3>

// //           <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
// //             <button style={styles.addBtn} onClick={fetchAll}>
// //               Refresh
// //             </button>
// //             <div style={styles.statusContainer}>
// //               <div style={styles.statusPulse} />
// //               <span style={styles.statusText}>System Live</span>
// //             </div>
// //           </div>
// //         </header>

// //         <div style={styles.contentPadding}>
// //           {/* DASHBOARD */}
// //           {activeTab === "dashboard" && (
// //             <div style={styles.fadeEffect}>
// //               <h1 style={styles.welcomeTitle}>Hello, Admin</h1>

// //               <div style={styles.statGrid}>
// //                 <div style={styles.statCard}>
// //                   <p style={styles.statLabel}>Total Users</p>
// //                   <h2 style={styles.statValue}>{users.length}</h2>
// //                 </div>

// //                 <div style={styles.statCard}>
// //                   <p style={styles.statLabel}>Templates</p>
// //                   <h2 style={styles.statValue}>{templates.length}</h2>
// //                 </div>

// //                 <div style={styles.statCard}>
// //                   <p style={styles.statLabel}>Pricing Rows</p>
// //                   <h2 style={styles.statValue}>{pricing.length}</h2>
// //                 </div>

// //                 <div style={styles.statCard}>
// //                   <p style={styles.statLabel}>Subscriptions</p>
// //                   <h2 style={styles.statValue}>{subTotal}</h2>
// //                 </div>

// //                 <div style={styles.statCard}>
// //                   <p style={styles.statLabel}>Monthly Revenue</p>
// //                   <h2 style={styles.statValue}>${monthlyRevenue.toFixed(2)}</h2>
// //                 </div>

// //                 <div style={styles.statCard}>
// //                   <p style={styles.statLabel}>Churn Rate</p>
// //                   <h2 style={{ ...styles.statValue, color: "#f97316" }}>{churnRate.toFixed(2)}%</h2>
// //                 </div>

// //                 <div style={styles.statCard}>
// //                   <p style={styles.statLabel}>Payments (optional)</p>
// //                   <h2 style={styles.statValue}>{paymentsTotal ? `$${paymentsSum.toFixed(2)}` : "—"}</h2>
// //                 </div>

// //                 <div style={styles.statCard}>
// //                   <p style={styles.statLabel}>AI Cost (optional)</p>
// //                   <h2 style={styles.statValue}>{aiUsage.length ? `$${aiTotalCost.toFixed(2)}` : "—"}</h2>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* ANALYTICS (COLORFUL + TOOLTIP + AXIS) */}
// //           {activeTab === "analytics" && (
// //             <div style={styles.fadeEffect}>
// //               <div style={styles.tableHeader}>
// //                 <h2 style={{ margin: 0, color: "#0f172a" }}>Analytics</h2>
// //                 <div style={{ color: "#64748b", fontSize: 13, fontWeight: 900 }}>
// //                   Hover on charts for values • Axis numbering enabled
// //                 </div>
// //               </div>

// //               {/* USERS */}
// //               <div style={styles.sectionCard}>
// //                 <SectionHeader title="Users Analytics" subtitle="Colorful • Axis • Tooltip" />
// //                 <div style={styles.kpiGrid}>
// //                   <KpiCard title="Total Users" value={`${users.length}`} sub="All registered users" />
// //                   <KpiCard title="Pincode Groups" value={`${Object.keys(usersByPincode).length}`} sub="Grouped by first 3 digits" />
// //                   <KpiCard title="14 Days Joins" value={`${userJoinSeries.values.reduce((a, b) => a + b, 0)}`} sub="Based on date_joined" />
// //                   <KpiCard title="Top Pincode" value={`${upLabels[0] || "—"}`} sub="Most frequent prefix" />
// //                 </div>

// //                 <div style={styles.chartsGrid2}>
// //                   <LineChartPro title="User Joins Trend (Line)" labels={userJoinSeries.labels} values={userJoinSeries.values} tipSetter={setTip} />
// //                   <BarChartPro title="Users by Pincode Prefix (Bar)" labels={upLabels.length ? upLabels : ["—"]} values={upValues.length ? upValues : [0]} tipSetter={setTip} />
// //                 </div>

// //                 <div style={styles.chartsGrid2}>
// //                   <BarChartPro title="Users by Pincode (3D Look Bars)" labels={upLabels.length ? upLabels : ["—"]} values={upValues.length ? upValues : [0]} tipSetter={setTip} />
// //                   <DonutPro title="User Density" label="Users vs 100" value={Math.min(users.length, 100)} total={100} color="#a855f7" tipSetter={setTip} />
// //                 </div>
// //               </div>

// //               {/* TEMPLATES */}
// //               <div style={styles.sectionCard}>
// //                 <SectionHeader title="Templates Analytics" subtitle="Colorful • Axis • Tooltip" />
// //                 <div style={styles.kpiGrid}>
// //                   <KpiCard title="Total Templates" value={`${templates.length}`} sub="All templates" />
// //                   <KpiCard title="Total Downloads" value={`${totalDownloads}`} sub="Sum downloads" />
// //                   <KpiCard title="Avg Rating" value={`${avgRating.toFixed(2)}`} sub="Average rating" />
// //                   <KpiCard title="Top Category" value={`${catLabels[0] || "—"}`} sub="Highest count" />
// //                 </div>

// //                 <div style={styles.chartsGrid2}>
// //                   <BarChartPro title="Templates by Category (Bar)" labels={catLabels.length ? catLabels : ["—"]} values={catValues.length ? catValues : [0]} tipSetter={setTip} />
// //                   <PieChartPro
// //                     title="Templates by Status (Pie)"
// //                     data={stLabels.length ? stLabels.map((k, i) => ({ label: k, value: stValues[i] })) : [{ label: "—", value: 1 }]}
// //                     tipSetter={setTip}
// //                   />
// //                 </div>

// //                 <div style={styles.chartsGrid2}>
// //                   <LineChartPro
// //                     title="Downloads Trend (Line, approx 14d)"
// //                     labels={toSeriesByDay(templates as any, (t) => safeNumber(t.downloads), 14).labels}
// //                     values={toSeriesByDay(templates as any, (t) => safeNumber(t.downloads), 14).values}
// //                     tipSetter={setTip}
// //                   />
// //                   <DonutPro title="Avg Rating" label="Rating / 5" value={avgRating} total={5} color="#f97316" tipSetter={setTip} />
// //                 </div>
// //               </div>

// //               {/* PRICING */}
// //               <div style={styles.sectionCard}>
// //                 <SectionHeader title="Pricing Analytics" subtitle="Colorful • Axis • Tooltip" />
// //                 <div style={styles.kpiGrid}>
// //                   <KpiCard title="Pricing Rows" value={`${pricing.length}`} sub="All pricing records" />
// //                   <KpiCard title="Avg Price" value={`$${avgPrice.toFixed(2)}`} sub="Average base price" />
// //                   <KpiCard title="Avg Final" value={`$${avgFinal.toFixed(2)}`} sub="After discount" />
// //                   <KpiCard title="Top Billing" value={`${billLabels[0] || "—"}`} sub="Most common billing type" />
// //                 </div>

// //                 <div style={styles.chartsGrid2}>
// //                   <PieChartPro
// //                     title="Billing Type (Pie)"
// //                     data={billLabels.length ? billLabels.map((k, i) => ({ label: k, value: billValues[i] })) : [{ label: "—", value: 1 }]}
// //                     tipSetter={setTip}
// //                   />
// //                   <BarChartPro title="Billing Type (Bar)" labels={billLabels.length ? billLabels : ["—"]} values={billValues.length ? billValues : [0]} tipSetter={setTip} />
// //                 </div>

// //                 <div style={styles.chartsGrid2}>
// //                   <LineChartPro
// //                     title="Final Price Trend (Line, approx 14d)"
// //                     labels={toSeriesByDay(pricing as any, (p) => safeNumber(p.final_price), 14).labels}
// //                     values={toSeriesByDay(pricing as any, (p) => safeNumber(p.final_price), 14).values}
// //                     tipSetter={setTip}
// //                   />
// //                   <DonutPro title="Final vs Base" label="Final/Base Ratio" value={avgFinal} total={Math.max(1, avgPrice)} color="#22c55e" tipSetter={setTip} />
// //                 </div>
// //               </div>

// //               {/* SUBSCRIPTIONS */}
// //               <div style={styles.sectionCard}>
// //                 <SectionHeader title="Subscriptions Analytics" subtitle="Colorful • Axis • Tooltip" />
// //                 <div style={styles.kpiGrid}>
// //                   <KpiCard title="Subscriptions" value={`${subTotal}`} sub="All subscriptions" />
// //                   <KpiCard title="Active" value={`${subActive}`} sub="Active subscriptions" />
// //                   <KpiCard title="Revenue" value={`$${monthlyRevenue.toFixed(2)}`} sub="Active sum(amount)" />
// //                   <KpiCard title="Churn" value={`${churnRate.toFixed(2)}%`} sub="Cancelled/Total" />
// //                 </div>

// //                 <div style={styles.chartsGrid2}>
// //                   <PieChartPro
// //                     title="Status (Pie)"
// //                     data={[
// //                       { label: "Active", value: subActive },
// //                       { label: "Cancelled", value: subCancelled },
// //                       { label: "Expired", value: subExpired },
// //                       { label: "Past Due", value: subPastDue },
// //                     ]}
// //                     tipSetter={setTip}
// //                   />
// //                   <BarChartPro title="Plans (Bar)" labels={planLabels.length ? planLabels : ["—"]} values={planValues.length ? planValues : [0]} tipSetter={setTip} />
// //                 </div>

// //                 <div style={styles.chartsGrid2}>
// //                   <LineChartPro title="New Subs Trend (Line)" labels={subSeries.labels} values={subSeries.values} tipSetter={setTip} />
// //                   <DonutPro title="Active Ratio" label="Active / Total" value={subActive} total={Math.max(1, subTotal)} color="#0ea5e9" tipSetter={setTip} />
// //                 </div>
// //               </div>

// //               {/* PAYMENTS (optional) */}
// //               <div style={styles.sectionCard}>
// //                 <SectionHeader title="Payments Analytics (Optional)" subtitle="If endpoint exists" />
// //                 {payments.length ? (
// //                   <>
// //                     <div style={styles.kpiGrid}>
// //                       <KpiCard title="Payments Count" value={`${paymentsTotal}`} sub="Total payments" />
// //                       <KpiCard title="Total Amount" value={`$${paymentsSum.toFixed(2)}`} sub="Sum(amount)" />
// //                       <KpiCard title="Avg Amount" value={`$${(paymentsTotal ? paymentsSum / paymentsTotal : 0).toFixed(2)}`} sub="Average" />
// //                       <KpiCard title="14 Days" value="Trend" sub="Recent 14 days" />
// //                     </div>

// //                     <div style={styles.chartsGrid2}>
// //                       <LineChartPro title="Payments Amount Trend (Line)" labels={paymentSeries.labels} values={paymentSeries.values} tipSetter={setTip} />
// //                       <BarChartPro title="Payments Amount (Bar)" labels={paymentSeries.labels.slice(-10)} values={paymentSeries.values.slice(-10)} tipSetter={setTip} />
// //                     </div>

// //                     <div style={styles.chartsGrid2}>
// //                       <DonutPro title="Collected Ratio" label="Collected" value={paymentsSum} total={Math.max(1, paymentsSum * 1.2)} color="#22c55e" tipSetter={setTip} />
// //                       <PieChartPro
// //                         title="Payments Status (Pie)"
// //                         data={Object.entries(groupCount(payments, (p) => p.status || "Unknown")).map(([k, v]) => ({ label: k, value: v }))}
// //                         tipSetter={setTip}
// //                       />
// //                     </div>
// //                   </>
// //                 ) : (
// //                   <Placeholder text="Payments endpoint not available or no data. Add backend endpoint: /auth/admin/payments/" />
// //                 )}
// //               </div>

// //               {/* AI USAGE (optional) */}
// //               <div style={styles.sectionCard}>
// //                 <SectionHeader title="AI Usage Analytics (Optional)" subtitle="If endpoint exists" />
// //                 {aiUsage.length ? (
// //                   <>
// //                     <div style={styles.kpiGrid}>
// //                       <KpiCard title="Total Tokens" value={`${aiTotalTokens.toFixed(0)}`} sub="Sum(tokens)" />
// //                       <KpiCard title="Total Cost" value={`$${aiTotalCost.toFixed(2)}`} sub="Sum(cost)" />
// //                       <KpiCard title="Avg Cost / Day" value={`$${(aiTotalCost / 14).toFixed(2)}`} sub="Approx 14 days" />
// //                       <KpiCard title="Avg Tokens / Day" value={`${(aiTotalTokens / 14).toFixed(0)}`} sub="Approx 14 days" />
// //                     </div>

// //                     <div style={styles.chartsGrid2}>
// //                       <LineChartPro title="AI Cost Trend (Line)" labels={aiCostSeries.labels} values={aiCostSeries.values} tipSetter={setTip} />
// //                       <LineChartPro title="AI Tokens Trend (Line)" labels={aiTokensSeries.labels} values={aiTokensSeries.values} tipSetter={setTip} />
// //                     </div>

// //                     <div style={styles.chartsGrid2}>
// //                       <BarChartPro title="AI Cost (Bar)" labels={aiCostSeries.labels.slice(-10)} values={aiCostSeries.values.slice(-10)} tipSetter={setTip} />
// //                       <DonutPro title="Token Utilization" label="Tokens" value={aiTotalTokens} total={Math.max(1, aiTotalTokens * 1.2)} color="#4f46e5" tipSetter={setTip} />
// //                     </div>
// //                   </>
// //                 ) : (
// //                   <Placeholder text="AI usage endpoint not available or no data. Add backend endpoint: /auth/admin/ai-usage/" />
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {/* EXISTING PAGES */}
// //           {activeTab === "templates" && (
// //             <div style={styles.fadeEffect}>
// //               <AdminTemplates />
// //             </div>
// //           )}
// //           {activeTab === "templatespricing" && (
// //             <div style={styles.fadeEffect}>
// //               <TemplatesPricing />
// //             </div>
// //           )}
// //           {activeTab === "students" && (
// //             <div style={styles.fadeEffect}>
// //               <Students />
// //             </div>
// //           )}
// //           {activeTab === "subscriptions" && (
// //             <div style={styles.fadeEffect}>
// //               <Subscriptions />
// //             </div>
// //           )}

// //           {/* USERS TABLE */}
// //           {activeTab === "users" && (
// //             <div style={styles.fadeEffect}>
// //               <div style={styles.tableHeader}>
// //                 <h2 style={{ margin: 0, color: "#0f172a" }}>Users</h2>
// //               </div>

// //               <div style={styles.scrollContainer}>
// //                 <table style={styles.adminTable}>
// //                   <thead>
// //                     <tr style={styles.thRow}>
// //                       <th style={styles.th}>Name</th>
// //                       <th style={styles.th}>Mobile</th>
// //                       <th style={styles.th}>Pincode</th>
// //                     </tr>
// //                   </thead>

// //                   <tbody>
// //                     {users.map((u) => (
// //                       <tr key={u.id} style={styles.tr}>
// //                         <td style={styles.td}>{u.name}</td>
// //                         <td style={styles.td}>{u.phone}</td>
// //                         <td style={styles.td}>{u.pincode}</td>
// //                       </tr>
// //                     ))}

// //                     {users.length === 0 && (
// //                       <tr>
// //                         <td colSpan={3} style={{ ...styles.td, padding: 18, textAlign: "center" }}>
// //                           No users found.
// //                         </td>
// //                       </tr>
// //                     )}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // /* =======================
// //    Styles
// //    ======================= */
// // const styles: Record<string, React.CSSProperties> = {
// //   adminWrapper: {
// //     display: "flex",
// //     width: "100vw",
// //     height: "100vh",
// //     backgroundColor: "#f1f5f9",
// //     fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// //     overflow: "hidden",
// //     position: "fixed",
// //     top: 0,
// //     left: 0,
// //   },

// //   mobileOverlay: {
// //     display: "none",
// //     position: "fixed",
// //     inset: 0,
// //     backgroundColor: "rgba(15, 23, 42, 0.35)",
// //     zIndex: 900,
// //   },

// //   sidebar: {
// //     width: 280,
// //     backgroundColor: "#0f172a",
// //     color: "#fff",
// //     display: "flex",
// //     flexDirection: "column",
// //     padding: "26px 18px",
// //     boxSizing: "border-box",
// //     flexShrink: 0,
// //   },

// //   sidebarLogo: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 12,
// //     marginBottom: 22,
// //     padding: "6px 10px",
// //     borderRadius: 12,
// //     backgroundColor: "rgba(255,255,255,0.04)",
// //     border: "1px solid rgba(255,255,255,0.06)",
// //   },

// //   logoText: { margin: 0, fontSize: 18, fontWeight: 800 },
// //   logoSub: { margin: "2px 0 0", fontSize: 12, color: "#94a3b8" },

// //   navLinks: { display: "flex", flexDirection: "column", gap: 10, flexGrow: 1, marginTop: 12 },

// //   sidebarBottom: { borderTop: "1px solid #1e293b", paddingTop: 16 },

// //   adminName: { fontSize: 13, color: "#94a3b8", marginBottom: 10 },

// //   logoutBtn: {
// //     width: "100%",
// //     padding: "10px",
// //     backgroundColor: "#ef4444",
// //     color: "white",
// //     border: "none",
// //     borderRadius: 10,
// //     cursor: "pointer",
// //     fontWeight: 800,
// //   },

// //   mainArea: { flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" },

// //   topHeader: {
// //     height: 60,
// //     backgroundColor: "#fff",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     padding: "0 18px",
// //     borderBottom: "1px solid #e2e8f0",
// //   },

// //   mobileToggle: {
// //     display: "none",
// //     background: "#0f172a",
// //     color: "#fff",
// //     border: "1px solid #0b1220",
// //     padding: "8px 12px",
// //     borderRadius: 10,
// //     cursor: "pointer",
// //   },

// //   statusContainer: { display: "flex", alignItems: "center", gap: 8 },
// //   statusPulse: { width: 8, height: 8, backgroundColor:  "#3E0703", borderRadius: "50%" },
// //   statusText: { fontSize: 12, fontWeight: 900, color: "#64748b" },

// //   contentPadding: { padding: 20, overflowY: "auto", flexGrow: 1 },

// //   welcomeTitle: { fontSize: 22, color: "#0f172a", margin: 0, fontWeight: 950 as any },

// //   statGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
// //     gap: 14,
// //     marginTop: 16,
// //   },

// //   statCard: {
// //     backgroundColor: "#fff",
// //     padding: 18,
// //     borderRadius: 14,
// //     border: "1px solid #e2e8f0",
// //     boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
// //   },

// //   statLabel: { margin: 0, color: "#64748b", fontSize: 13, fontWeight: 900 },
// //   statValue: { margin: "8px 0 0", fontSize: 28, fontWeight: 950 as any, color: "#0f172a" },

// //   tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 },

// //   addBtn: {
// //     backgroundColor: "#4f46e5",
// //     color: "#fff",
// //     border: "1px solid #4338ca",
// //     padding: "10px 14px",
// //     borderRadius: 12,
// //     cursor: "pointer",
// //     fontWeight: 950 as any,
// //     boxShadow: "0 10px 25px rgba(79, 70, 229, 0.18)",
// //   },

// //   scrollContainer: {
// //     width: "100%",
// //     overflowX: "auto",
// //     backgroundColor: "#fff",
// //     borderRadius: 14,
// //     border: "1px solid #e2e8f0",
// //   },

// //   adminTable: { width: "100%", borderCollapse: "collapse", minWidth: 650 },
// //   thRow: { backgroundColor: "#f8fafc" },
// //   th: { textAlign: "left", padding: 12, color: "#64748b", fontSize: 13, fontWeight: 950 as any },
// //   td: { padding: 12, borderTop: "1px solid #f1f5f9", fontSize: 14, backgroundColor: "white" },
// //   tr: { transition: "0.2s", backgroundColor: "white" },

// //   fadeEffect: { animation: "fadeIn 0.35s ease-out" },

// //   sectionCard: {
// //     background: "white",
// //     borderRadius: 16,
// //     border: "1px solid #e2e8f0",
// //     padding: 16,
// //     marginBottom: 14,
// //     boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
// //   },

// //   kpiGrid: {
// //     marginTop: 12,
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
// //     gap: 12,
// //   },

// //   kpiCard: {
// //     border: "1px solid #e2e8f0",
// //     borderRadius: 14,
// //     padding: 14,
// //     background: "#fff",
// //   },
// //   kpiTitle: { fontSize: 12, color: "#64748b", fontWeight: 950 as any },
// //   kpiValue: { marginTop: 8, fontSize: 22, fontWeight: 950 as any, color: "#0f172a" },
// //   kpiSub: { marginTop: 6, fontSize: 12, color: "#64748b", fontWeight: 900 },

// //   placeholderBox: {
// //     padding: 14,
// //     borderRadius: 14,
// //     border: "1px dashed #cbd5e1",
// //     background: "#f8fafc",
// //     color: "#64748b",
// //     fontSize: 13,
// //     fontWeight: 900,
// //   },

// //   chartsGrid2: {
// //     marginTop: 12,
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
// //     gap: 12,
// //     alignItems: "start",
// //   },

// //   chartShell: {
// //     background: "white",
// //     border: "1px solid #e2e8f0",
// //     borderRadius: 14,
// //     padding: 12,
// //     boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
// //     overflowX: "auto",
// //   },
// //   chartHeader: {
// //     fontSize: 13,
// //     fontWeight: 950 as any,
// //     color: "#0f172a",
// //     marginBottom: 10,
// //   },
// // };

// // function navStyle(active: boolean): React.CSSProperties {
// //   return {
// //     padding: "12px 14px",
// //     borderRadius: 12,
// //     cursor: "pointer",
// //     color: active ? "#ffffff" : "#cbd5e1",
// //     backgroundColor: active ? "#4f46e5" : "transparent",
// //     transition: "0.2s",
// //     fontWeight: 900,
// //     userSelect: "none",
// //     border: active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
// //   };
// // }

// // src/pages/admin/AdminDashboard.tsx
// import { useEffect, useMemo, useState } from "react";
// //import { useNavigate } from "react-router-dom";
// import axios from "../../api/axiosInstance";
// import { useLocation, useNavigate } from "react-router-dom";

// import AdminTemplates from "./AdminTemplates";
// import TemplatesPricing from "./AdminTemplatesPricing";
// import Students from "./Students";
// import Subscriptions from "./Subscriptions";
// /* =======================
//    Types
//    ======================= */
// type AdminUser = {
//   id: number;
//   name: string;
//   phone: string;
//   email?: string;
//   pincode: string;
//   date_joined?: string;
// };

// type TemplateRow = {
//   id: number;
//   name: string;
//   category?: string;
//   status?: string;
//   downloads?: number;
//   rating?: number;
//   created_at?: string;
//   updated_at?: string;
// };

// type PricingRow = {
//   id: number;
//   templateName?: string;
//   billing_type?: string;
//   currency?: string;
//   price?: number;
//   final_price?: number;
//   status?: string;
//   created_at?: string;
//   updated_at?: string;
// };

// type SubscriptionRow = {
//   id: number;
//   user_name?: string;
//   user_email?: string;
//   user_phone?: string;
//   plan?: "Pro" | "Enterprise" | string;
//   amount?: number;
//   status?: "Active" | "Cancelled" | "Expired" | "Past Due" | string;
//   start_date?: string;
//   end_date?: string;
//   auto_renew?: boolean;
//   created_at?: string;
// };

// type PaymentRow = {
//   id: number;
//   amount?: number;
//   status?: string;
//   created_at?: string;
// };

// type AiUsageRow = {
//   id: number;
//   tokens?: number;
//   cost?: number;
//   created_at?: string;
// };

// /* =======================
//    Auth helpers
//    ======================= */
// function getAccessToken() {
//   return localStorage.getItem("access") || "";
// }
// function authHeaders() {
//   const token = getAccessToken();
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// /* =======================
//    Utils
//    ======================= */
// function safeNumber(n: any) {
//   const x = Number(n);
//   return Number.isFinite(x) ? x : 0;
// }
// function sumBy<T>(arr: T[], fn: (x: T) => number) {
//   return arr.reduce((a, b) => a + safeNumber(fn(b)), 0);
// }
// function groupCount<T>(arr: T[], keyFn: (x: T) => string) {
//   const map: Record<string, number> = {};
//   for (const it of arr) {
//     const k = keyFn(it) || "Unknown";
//     map[k] = (map[k] || 0) + 1;
//   }
//   return map;
// }
// function toSeriesByDay(items: { created_at?: string; date_joined?: string }[], valueFn: (it: any) => number, days = 14) {
//   const now = new Date();
//   const map: Record<string, number> = {};

//   for (const it of items as any[]) {
//     const ts = it.created_at || it.date_joined;
//     if (!ts) continue;
//     const d = new Date(ts);
//     if (Number.isNaN(d.getTime())) continue;
//     const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
//     map[key] = (map[key] || 0) + safeNumber(valueFn(it));
//   }

//   const labels: string[] = [];
//   const values: number[] = [];
//   for (let i = days - 1; i >= 0; i--) {
//     const d = new Date(now);
//     d.setDate(now.getDate() - i);
//     const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
//     labels.push(`${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`);
//     values.push(map[key] || 0);
//   }
//   return { labels, values };
// }

// function niceTicks(min: number, max: number, count = 5) {
//   if (max <= min) return [min, min + 1];
//   const range = max - min;
//   const step0 = range / (count - 1);

//   const pow = Math.pow(10, Math.floor(Math.log10(step0)));
//   const err = step0 / pow;

//   let step = pow;
//   if (err >= 7.5) step = 10 * pow;
//   else if (err >= 3) step = 5 * pow;
//   else if (err >= 1.5) step = 2 * pow;

//   const start = Math.floor(min / step) * step;
//   const end = Math.ceil(max / step) * step;

//   const ticks: number[] = [];
//   for (let v = start; v <= end + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));
//   return ticks;
// }

// /* =======================
//    Tooltip overlay
//    ======================= */
// type Tip = {
//   show: boolean;
//   x: number;
//   y: number;
//   title: string;
//   value: string;
//   color?: string;
// };
// function Tooltip({ tip }: { tip: Tip }) {
//   if (!tip.show) return null;
//   return (
//     <div
//       style={{
//         position: "fixed",
//         left: tip.x + 12,
//         top: tip.y + 12,
//         background: "rgba(15,23,42,0.95)",
//         color: "white",
//         padding: "10px 12px",
//         borderRadius: 12,
//         boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
//         zIndex: 5000,
//         minWidth: 160,
//         pointerEvents: "none",
//         border: "1px solid rgba(255,255,255,0.08)",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//         {tip.color ? <div style={{ width: 10, height: 10, borderRadius: 4, background: tip.color }} /> : null}
//         <div style={{ fontWeight: 950 as any, fontSize: 13 }}>{tip.title}</div>
//       </div>
//       <div style={{ marginTop: 6, fontWeight: 900, fontSize: 14 }}>{tip.value}</div>
//     </div>
//   );
// }

// /* =======================
//    FIXED PALETTE (NO GREEN)
//    Based on your uploaded palette vibe.
//    Uses all colors style (indigo, navy, purple, pink, coral, orange, yellow, tan, beige, maroon, teal, black).
//    ======================= */
// const PALETTE = [
//   "#2E3192", // deep indigo
//   "#08115C", // navy
//   "#6D1B7B", // purple
//   "#E6005C", // magenta
//   "#E91E63", // hot pink
//   "#FF6F61", // coral
//   "#F07C65", // salmon
//   "#FF9800", // orange
//   "#FFD200", // yellow
//   "#C79B61", // tan
//   "#D9C6B5", // beige
//   "#F2F1E7", // off-white
//   "#5B0B0B", // maroon
//   "#3C7A8A", // teal (not green)
//   "#111111", // near-black
// ];

// function pickColor(i: number) {
//   return PALETTE[i % PALETTE.length];
// }

// /* =======================
//    SVG axis helper
//    ======================= */
// function AxisY({ x, y, h, ticks }: { x: number; y: number; h: number; ticks: number[] }) {
//   const maxTick = Math.max(...ticks);
//   const minTick = Math.min(...ticks);
//   const range = maxTick - minTick || 1;

//   return (
//     <g>
//       <line x1={x} y1={y} x2={x} y2={y + h} stroke="#e2e8f0" />
//       {ticks.map((t, idx) => {
//         const yy = y + h - ((t - minTick) / range) * h;
//         return (
//           <g key={idx}>
//             <line x1={x - 4} y1={yy} x2={x} y2={yy} stroke="#cbd5e1" />
//             <text x={x - 8} y={yy + 4} textAnchor="end" fontSize="11" fill="#64748b" fontWeight={900}>
//               {t >= 1000 ? `${(t / 1000).toFixed(t % 1000 === 0 ? 0 : 1)}k` : String(t)}
//             </text>
//             <line x1={x} y1={yy} x2={x + 520} y2={yy} stroke="#f1f5f9" />
//           </g>
//         );
//       })}
//     </g>
//   );
// }

// /* =======================
//    Charts (Colorful + tooltip + axis)
//    ======================= */

// function BarChartPro({
//   title,
//   labels,
//   values,
//   tipSetter,
//   height = 210,
// }: {
//   title?: string;
//   labels: string[];
//   values: number[];
//   tipSetter: (t: Tip) => void;
//   height?: number;
// }) {
//   const width = 560;
//   const padL = 46;
//   const padR = 16;
//   const padT = 20;
//   const padB = 40;

//   const n = Math.max(values.length, 1);
//   const max = Math.max(...values, 1);
//   const ticks = niceTicks(0, max, 5);

//   const innerW = width - padL - padR;
//   const innerH = height - padT - padB;

//   const gap = 10;
//   const barW = Math.max(16, Math.floor((innerW - (n - 1) * gap) / n));

//   return (
//     <div style={styles.chartShell}>
//       {title ? <div style={styles.chartHeader}>{title}</div> : null}
//       <svg width={width} height={height} style={{ display: "block" }}>
//         <AxisY x={padL} y={padT} h={innerH} ticks={ticks} />
//         <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#e2e8f0" />

//         {values.map((v, i) => {
//           const color = pickColor(i);
//           const h = (v / max) * innerH;
//           const x = padL + i * (barW + gap);
//           const y = padT + innerH - h;

//           return (
//             <g key={i}>
//               <rect x={x + 3} y={y + 3} width={barW} height={h} rx={10} fill="#0f172a" opacity={0.10} />
//               <rect
//                 x={x}
//                 y={y}
//                 width={barW}
//                 height={h}
//                 rx={10}
//                 fill={color}
//                 onMouseMove={(e) =>
//                   tipSetter({
//                     show: true,
//                     x: e.clientX,
//                     y: e.clientY,
//                     title: labels[i],
//                     value: `${v}`,
//                     color,
//                   })
//                 }
//                 onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
//               />
//               <rect x={x + 5} y={y + 8} width={Math.max(6, barW * 0.24)} height={Math.max(10, h - 16)} rx={8} fill="white" opacity={0.16} />
//               <text x={x + barW / 2} y={padT + innerH + 22} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight={900}>
//                 {(labels[i] || "").slice(0, 10)}
//               </text>
//             </g>
//           );
//         })}
//       </svg>
//     </div>
//   );
// }

// function LineChartPro({
//   title,
//   labels,
//   values,
//   tipSetter,
//   height = 220,
// }: {
//   title?: string;
//   labels: string[];
//   values: number[];
//   tipSetter: (t: Tip) => void;
//   height?: number;
// }) {
//   const width = 560;
//   const padL = 46;
//   const padR = 16;
//   const padT = 20;
//   const padB = 44;

//   const min = Math.min(...values, 0);
//   const max = Math.max(...values, 1);
//   const ticks = niceTicks(min, max, 5);

//   const innerW = width - padL - padR;
//   const innerH = height - padT - padB;

//   const range = max - min || 1;

//   const pts = values.map((v, i) => {
//     const x = padL + (i / Math.max(values.length - 1, 1)) * innerW;
//     const y = padT + (1 - (v - min) / range) * innerH;
//     return { x, y, v, label: labels[i] };
//   });

//   const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");

//   // colorful line color depends on series
//   const stroke = pickColor(1);

//   return (
//     <div style={styles.chartShell}>
//       {title ? <div style={styles.chartHeader}>{title}</div> : null}
//       <svg width={width} height={height} style={{ display: "block" }}>
//         <AxisY x={padL} y={padT} h={innerH} ticks={ticks} />
//         <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#e2e8f0" />

//         <path d={`${d} L ${padL + innerW} ${padT + innerH} L ${padL} ${padT + innerH} Z`} fill={stroke} opacity={0.12} />
//         <path d={d} fill="none" stroke={stroke} strokeWidth={3.8} />

//         {pts.map((p, i) => (
//           <circle
//             key={i}
//             cx={p.x}
//             cy={p.y}
//             r={5}
//             fill="#ffffff"
//             stroke={stroke}
//             strokeWidth={2.6}
//             onMouseMove={(e) =>
//               tipSetter({
//                 show: true,
//                 x: e.clientX,
//                 y: e.clientY,
//                 title: p.label,
//                 value: `${p.v}`,
//                 color: stroke,
//               })
//             }
//             onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
//           />
//         ))}

//         {/* X labels */}
//         <text x={padL} y={padT + innerH + 28} textAnchor="start" fontSize="11" fill="#64748b" fontWeight={900}>
//           {labels[0]}
//         </text>
//         <text x={padL + innerW / 2} y={padT + innerH + 28} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight={900}>
//           {labels[Math.floor(labels.length / 2)]}
//         </text>
//         <text x={padL + innerW} y={padT + innerH + 28} textAnchor="end" fontSize="11" fill="#64748b" fontWeight={900}>
//           {labels[labels.length - 1]}
//         </text>
//       </svg>
//     </div>
//   );
// }

// function PieChartPro({
//   title,
//   data,
//   tipSetter,
//   size = 200,
// }: {
//   title?: string;
//   data: { label: string; value: number }[];
//   tipSetter: (t: Tip) => void;
//   size?: number;
// }) {
//   const colored = data.map((d, i) => ({ ...d, color: pickColor(i) }));
//   const total = colored.reduce((a, b) => a + b.value, 0) || 1;

//   const r = size / 2 - 12;
//   const cx = size / 2;
//   const cy = size / 2;

//   let acc = 0;
//   const slices = colored.map((d) => {
//     const start = (acc / total) * Math.PI * 2;
//     acc += d.value;
//     const end = (acc / total) * Math.PI * 2;

//     const x1 = cx + r * Math.cos(start);
//     const y1 = cy + r * Math.sin(start);
//     const x2 = cx + r * Math.cos(end);
//     const y2 = cy + r * Math.sin(end);

//     const largeArc = end - start > Math.PI ? 1 : 0;
//     const path = [`M ${cx} ${cy}`, `L ${x1} ${y1}`, `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`, "Z"].join(" ");
//     return { ...d, path };
//   });

//   return (
//     <div style={styles.chartShell}>
//       {title ? <div style={styles.chartHeader}>{title}</div> : null}
//       <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
//         <svg width={size} height={size} style={{ display: "block" }}>
//           {slices.map((s, i) => (
//             <path
//               key={i}
//               d={s.path}
//               fill={s.color}
//               stroke="white"
//               strokeWidth={2}
//               onMouseMove={(e) =>
//                 tipSetter({
//                   show: true,
//                   x: e.clientX,
//                   y: e.clientY,
//                   title: s.label,
//                   value: `${s.value} (${((s.value / total) * 100).toFixed(1)}%)`,
//                   color: s.color,
//                 })
//               }
//               onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
//             />
//           ))}
//         </svg>

//         <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//           {colored.map((d) => (
//             <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <div style={{ width: 10, height: 10, borderRadius: 4, background: d.color }} />
//               <div style={{ fontSize: 13, fontWeight: 950 as any, color: "#0f172a" }}>
//                 {d.label}: <span style={{ color: "#334155" }}>{d.value}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function DonutPro({
//   title,
//   label,
//   value,
//   total,
//   color,
//   tipSetter,
// }: {
//   title?: string;
//   label: string;
//   value: number;
//   total: number;
//   color: string;
//   tipSetter: (t: Tip) => void;
// }) {
//   const pct = total ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
//   const r = 42;
//   const c = 2 * Math.PI * r;
//   const dash = (pct / 100) * c;

//   return (
//     <div style={{ ...styles.chartShell, width: 300 }}>
//       {title ? <div style={styles.chartHeader}>{title}</div> : null}
//       <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
//         <svg
//           width={120}
//           height={120}
//           onMouseMove={(e) =>
//             tipSetter({
//               show: true,
//               x: e.clientX,
//               y: e.clientY,
//               title: label,
//               value: `${pct.toFixed(1)}% (${value}/${total})`,
//               color,
//             })
//           }
//           onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
//         >
//           <circle cx={60} cy={60} r={r} stroke="#e2e8f0" strokeWidth={10} fill="none" />
//           <circle
//             cx={60}
//             cy={60}
//             r={r}
//             stroke={color}
//             strokeWidth={10}
//             fill="none"
//             strokeDasharray={`${dash} ${c}`}
//             strokeLinecap="round"
//             transform="rotate(-90 60 60)"
//           />
//           <text x="60" y="60" textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="950" fill="#0f172a">
//             {pct.toFixed(0)}%
//           </text>
//         </svg>

//         <div>
//           <div style={{ fontSize: 13, fontWeight: 950 as any, color: "#0f172a" }}>{label}</div>
//           <div style={{ marginTop: 6, color: "#64748b", fontWeight: 900, fontSize: 12 }}>
//             {value} / {total}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =======================
//    UI blocks
//    ======================= */
// function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
//       <h3 style={{ margin: 0, color: "#0f172a", fontWeight: 950 as any }}>{title}</h3>
//       <div style={{ color: "#64748b", fontSize: 12, fontWeight: 900 }}>{subtitle}</div>
//     </div>
//   );
// }
// function KpiCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
//   return (
//     <div style={styles.kpiCard}>
//       <div style={styles.kpiTitle}>{title}</div>
//       <div style={styles.kpiValue}>{value}</div>
//       {sub ? <div style={styles.kpiSub}>{sub}</div> : null}
//     </div>
//   );
// }
// function Placeholder({ text }: { text: string }) {
//   return <div style={styles.placeholderBox}>{text}</div>;
// }

// /* =======================
//    Main Component
//    ======================= */
// export default function AdminDashboard() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState<
//     "dashboard" | "analytics" | "users" | "templates" | "templatespricing" | "students" | "subscriptions"
//   >("dashboard");

//   const [users, setUsers] = useState<AdminUser[]>([]);
//   const [templates, setTemplates] = useState<TemplateRow[]>([]);
//   const [pricing, setPricing] = useState<PricingRow[]>([]);
//   const [subs, setSubs] = useState<SubscriptionRow[]>([]);
//   const [payments, setPayments] = useState<PaymentRow[]>([]);
//   const [aiUsage, setAiUsage] = useState<AiUsageRow[]>([]);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [tip, setTip] = useState<Tip>({ show: false, x: 0, y: 0, title: "", value: "" });

//   const admin = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("admin") || "null");
//     } catch {
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     if (!admin) {
//       navigate("/admin/login");
//       return;
//     }
//     fetchAll();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [admin, navigate]);

//   const safeGet = async (url: string) => {
//     try {
//       const res = await axios.get(url, { headers: authHeaders() });
//       return res.data;
//     } catch {
//       return null;
//     }
//   };

//   const fetchAll = async () => {
//     const [u, t, p, s, pay, ai] = await Promise.all([
//       safeGet("/auth/admin/users/"),
//       safeGet("/auth/admin/templates/"),
//       safeGet("/auth/admin/template-pricing/"),
//       safeGet("/auth/admin/subscriptions/"),
//       safeGet("/auth/admin/payments/"), // optional
//       safeGet("/auth/admin/ai-usage/"), // optional
//     ]);

//     setUsers(u || []);
//     setTemplates(t || []);
//     setPricing(p || []);
//     setSubs(s || []);
//     setPayments(pay || []);
//     setAiUsage(ai || []);
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/admin/login");
//   };

//   const goTab = (tab: typeof activeTab) => {
//     setActiveTab(tab);
//     setIsMobileMenuOpen(false);
//     setTip({ show: false, x: 0, y: 0, title: "", value: "" });
//   };

//   /* ===== Derived analytics ===== */
//   const usersByPincode = groupCount(users, (u) => (u.pincode || "NA").slice(0, 3));
//   const upLabels = Object.keys(usersByPincode).slice(0, 10);
//   const upValues = upLabels.map((k) => usersByPincode[k]);
//   const userJoinSeries = toSeriesByDay(users as any, () => 1, 14);

//   const byCategory = groupCount(templates, (t) => t.category || "Other");
//   const catLabels = Object.keys(byCategory).slice(0, 10);
//   const catValues = catLabels.map((k) => byCategory[k]);

//   const byStatus = groupCount(templates, (t) => t.status || "Unknown");
//   const stLabels = Object.keys(byStatus);
//   const stValues = stLabels.map((k) => byStatus[k]);

//   const totalDownloads = sumBy(templates, (t) => safeNumber(t.downloads));
//   const avgRating = templates.length ? sumBy(templates, (t) => safeNumber(t.rating)) / templates.length : 0;

//   const byBilling = groupCount(pricing, (p) => p.billing_type || "Unknown");
//   const billLabels = Object.keys(byBilling);
//   const billValues = billLabels.map((k) => byBilling[k]);
//   const avgPrice = pricing.length ? sumBy(pricing, (p) => safeNumber(p.price)) / pricing.length : 0;
//   const avgFinal = pricing.length ? sumBy(pricing, (p) => safeNumber(p.final_price)) / pricing.length : 0;

//   const subTotal = subs.length;
//   const subActive = subs.filter((x) => (x.status || "") === "Active").length;
//   const subCancelled = subs.filter((x) => (x.status || "") === "Cancelled").length;
//   const subPastDue = subs.filter((x) => (x.status || "") === "Past Due").length;
//   const subExpired = subs.filter((x) => (x.status || "") === "Expired").length;

//   const monthlyRevenue = sumBy(subs.filter((x) => (x.status || "") === "Active"), (x) => safeNumber(x.amount));
//   const churnRate = subTotal ? (subCancelled / subTotal) * 100 : 0;

//   const planCounts = groupCount(subs, (x) => String(x.plan || "Unknown"));
//   const planLabels = Object.keys(planCounts);
//   const planValues = planLabels.map((k) => planCounts[k]);
//   const subSeries = toSeriesByDay(subs as any, () => 1, 14);

//   const paymentsTotal = payments.length;
//   const paymentsSum = sumBy(payments, (p) => safeNumber(p.amount));
//   const paymentSeries = toSeriesByDay(payments as any, (p) => safeNumber(p.amount), 14);

//   const aiTotalTokens = sumBy(aiUsage, (a) => safeNumber(a.tokens));
//   const aiTotalCost = sumBy(aiUsage, (a) => safeNumber(a.cost));
//   const aiCostSeries = toSeriesByDay(aiUsage as any, (a) => safeNumber(a.cost), 14);
//   const aiTokensSeries = toSeriesByDay(aiUsage as any, (a) => safeNumber(a.tokens), 14);

//   return (
//     <div style={styles.adminWrapper}>
//       <Tooltip tip={tip} />

//       <style>{`
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
//         @media (max-width: 768px) {
//           .sidebar { position: fixed; left: -300px; top: 0; z-index: 1000; height: 100vh; transition: 0.25s ease; }
//           .sidebar.open { left: 0; }
//           .main-area { width: 100vw; }
//           .mobile-toggle { display: inline-flex !important; }
//           .overlay { display: block !important; }
//         }
//       `}</style>

//       {isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)} style={styles.mobileOverlay} />}

//       <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} style={styles.sidebar}>
//         <div style={styles.sidebarLogo}>
//           <div style={{ fontSize: 26 }}>🛡️</div>
//           <div>
//             <h2 style={styles.logoText}>Admin Pro</h2>
//             <p style={styles.logoSub}>Resume Builder Console</p>
//           </div>
//         </div>

//         <nav style={styles.navLinks}>
//           <div style={navStyle(activeTab === "dashboard")} onClick={() => goTab("dashboard")}>
//             📊 Dashboard
//           </div>

//           <div style={navStyle(activeTab === "analytics")} onClick={() => goTab("analytics")}>
//             📈 Analytics
//           </div>

//           <div style={navStyle(activeTab === "templatespricing")} onClick={() => goTab("templatespricing")}>
//             💰 Templates Pricing
//           </div>

//           <div style={navStyle(activeTab === "templates")} onClick={() => goTab("templates")}>
//             📄 Resume Templates
//           </div>

//           <div style={navStyle(activeTab === "students")} onClick={() => goTab("students")}>
//             🎓 Students
//           </div>

//           <div style={navStyle(activeTab === "subscriptions")} onClick={() => goTab("subscriptions")}>
//             🧾 Subscriptions
//           </div>
          
// {/* 
//           <div style={navStyle(activeTab === "users")} onClick={() => goTab("users")}>
//             👤 Users
//           </div> */}
//         </nav>

//         <div style={styles.sidebarBottom}>
//           <p style={styles.adminName}>{admin?.name || "System Admin"}</p>
//           <button style={styles.logoutBtn} onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </aside>

//       <main className="main-area" style={styles.mainArea}>
//         <header style={styles.topHeader}>
//           <button style={styles.mobileToggle} className="mobile-toggle" onClick={() => setIsMobileMenuOpen((s) => !s)} aria-label="Open Menu">
//             ☰
//           </button>

//           <h3 style={{ margin: 0, color: "#0f172a" }}>Console</h3>

//           <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//             <button style={styles.addBtn} onClick={fetchAll}>
//               Refresh
//             </button>
//             <div style={styles.statusContainer}>
//               <div style={styles.statusPulse} />
//               <span style={styles.statusText}>System Live</span>
//             </div>
//           </div>
//         </header>

//         <div style={styles.contentPadding}>
//           {activeTab === "dashboard" && (
//             <div style={styles.fadeEffect}>
//               <h1 style={styles.welcomeTitle}>Hello, Admin</h1>

//               <div style={styles.statGrid}>
//                 <div style={styles.statCard}>
//                   <p style={styles.statLabel}>Total Users</p>
//                   <h2 style={styles.statValue}>{users.length}</h2>
//                 </div>

//                 <div style={styles.statCard}>
//                   <p style={styles.statLabel}>Templates</p>
//                   <h2 style={styles.statValue}>{templates.length}</h2>
//                 </div>

//                 <div style={styles.statCard}>
//                   <p style={styles.statLabel}>Pricing Rows</p>
//                   <h2 style={styles.statValue}>{pricing.length}</h2>
//                 </div>

//                 <div style={styles.statCard}>
//                   <p style={styles.statLabel}>Subscriptions</p>
//                   <h2 style={styles.statValue}>{subTotal}</h2>
//                 </div>

//                 <div style={styles.statCard}>
//                   <p style={styles.statLabel}>Monthly Revenue</p>
//                   <h2 style={styles.statValue}>₹{monthlyRevenue.toFixed(2)}</h2>
//                 </div>

//                 <div style={styles.statCard}>
//                   <p style={styles.statLabel}>Churn Rate</p>
//                   <h2 style={{ ...styles.statValue, color: "#FF9800" }}>{churnRate.toFixed(2)}%</h2>
//                 </div>

//                 <div style={styles.statCard}>
//                   <p style={styles.statLabel}>Payments (optional)</p>
//                   <h2 style={styles.statValue}>{paymentsTotal ? `$${paymentsSum.toFixed(2)}` : "—"}</h2>
//                 </div>

//                 <div style={styles.statCard}>
//                   <p style={styles.statLabel}>AI Cost (optional)</p>
//                   <h2 style={styles.statValue}>{aiUsage.length ? `$${aiTotalCost.toFixed(2)}` : "—"}</h2>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "analytics" && (
//             <div style={styles.fadeEffect}>
//               <div style={styles.tableHeader}>
//                 <h2 style={{ margin: 0, color: "#0f172a" }}>Analytics</h2>
//                 <div style={{ color: "#64748b", fontSize: 13, fontWeight: 900 }}>Hover on charts for exact values</div>
//               </div>

//               {/* USERS */}
//               <div style={styles.sectionCard}>
//                 <SectionHeader title="Users Analytics" subtitle="Color palette as per your uploaded image (no green)" />
//                 <div style={styles.kpiGrid}>
//                   <KpiCard title="Total Users" value={`${users.length}`} sub="All registered users" />
//                   <KpiCard title="Pincode Groups" value={`${Object.keys(usersByPincode).length}`} sub="Grouped by first 3 digits" />
//                   <KpiCard title="14 Days Joins" value={`${userJoinSeries.values.reduce((a, b) => a + b, 0)}`} sub="Based on date_joined" />
//                   <KpiCard title="Top Pincode" value={`${upLabels[0] || "—"}`} sub="Most frequent prefix" />
//                 </div>

//                 <div style={styles.chartsGrid2}>
//                   <LineChartPro title="User Joins Trend" labels={userJoinSeries.labels} values={userJoinSeries.values} tipSetter={setTip} />
//                   <BarChartPro title="Users by Pincode Prefix" labels={upLabels.length ? upLabels : ["—"]} values={upValues.length ? upValues : [0]} tipSetter={setTip} />
//                 </div>

//                 <div style={styles.chartsGrid2}>
//                   <DonutPro title="Users vs 100" label="Users / 100" value={Math.min(users.length, 100)} total={100} color={pickColor(3)} tipSetter={setTip} />
//                   <PieChartPro
//                     title="Pincode Distribution (Top 6)"
//                     data={(upLabels.slice(0, 6).length ? upLabels.slice(0, 6) : ["—"]).map((l, i) => ({
//                       label: l,
//                       value: upValues[i] || 0,
//                     }))}
//                     tipSetter={setTip}
//                   />
//                 </div>
//               </div>

//               {/* TEMPLATES */}
//               <div style={styles.sectionCard}>
//                 <SectionHeader title="Templates Analytics" subtitle="Colorful charts + tooltip + axis" />
//                 <div style={styles.kpiGrid}>
//                   <KpiCard title="Total Templates" value={`${templates.length}`} sub="All templates" />
//                   <KpiCard title="Total Downloads" value={`${totalDownloads}`} sub="Sum downloads" />
//                   <KpiCard title="Avg Rating" value={`${avgRating.toFixed(2)}`} sub="Average rating" />
//                   <KpiCard title="Top Category" value={`${catLabels[0] || "—"}`} sub="Highest count" />
//                 </div>

//                 <div style={styles.chartsGrid2}>
//                   <BarChartPro title="Templates by Category" labels={catLabels.length ? catLabels : ["—"]} values={catValues.length ? catValues : [0]} tipSetter={setTip} />
//                   <PieChartPro
//                     title="Templates by Status"
//                     data={stLabels.length ? stLabels.map((k, i) => ({ label: k, value: stValues[i] })) : [{ label: "—", value: 1 }]}
//                     tipSetter={setTip}
//                   />
//                 </div>

//                 <div style={styles.chartsGrid2}>
//                   <LineChartPro
//                     title="Downloads Trend (approx 14d)"
//                     labels={toSeriesByDay(templates as any, (t) => safeNumber(t.downloads), 14).labels}
//                     values={toSeriesByDay(templates as any, (t) => safeNumber(t.downloads), 14).values}
//                     tipSetter={setTip}
//                   />
//                   <DonutPro title="Rating / 5" label="Avg Rating" value={avgRating} total={5} color={pickColor(8)} tipSetter={setTip} />
//                 </div>
//               </div>

//               {/* PRICING */}
//               <div style={styles.sectionCard}>
//                 <SectionHeader title="Pricing Analytics" subtitle="Billing type + Avg price trends" />
//                 <div style={styles.kpiGrid}>
//                   <KpiCard title="Pricing Rows" value={`${pricing.length}`} sub="All pricing records" />
//                   <KpiCard title="Avg Price" value={`$${avgPrice.toFixed(2)}`} sub="Base price avg" />
//                   <KpiCard title="Avg Final" value={`$${avgFinal.toFixed(2)}`} sub="Final price avg" />
//                   <KpiCard title="Top Billing" value={`${billLabels[0] || "—"}`} sub="Most common" />
//                 </div>

//                 <div style={styles.chartsGrid2}>
//                   <PieChartPro
//                     title="Billing Type (Pie)"
//                     data={billLabels.length ? billLabels.map((k, i) => ({ label: k, value: billValues[i] })) : [{ label: "—", value: 1 }]}
//                     tipSetter={setTip}
//                   />
//                   <BarChartPro title="Billing Type (Bar)" labels={billLabels.length ? billLabels : ["—"]} values={billValues.length ? billValues : [0]} tipSetter={setTip} />
//                 </div>

//                 <div style={styles.chartsGrid2}>
//                   <LineChartPro
//                     title="Final Price Trend (approx 14d)"
//                     labels={toSeriesByDay(pricing as any, (p) => safeNumber(p.final_price), 14).labels}
//                     values={toSeriesByDay(pricing as any, (p) => safeNumber(p.final_price), 14).values}
//                     tipSetter={setTip}
//                   />
//                   <DonutPro title="Final vs Base" label="Avg Final / Avg Base" value={avgFinal} total={Math.max(1, avgPrice)} color={pickColor(4)} tipSetter={setTip} />
//                 </div>
//               </div>

//               {/* SUBSCRIPTIONS */}
//               <div style={styles.sectionCard}>
//                 <SectionHeader title="Subscriptions Analytics" subtitle="Status + Plans + Trend" />
//                 <div style={styles.kpiGrid}>
//                   <KpiCard title="Subscriptions" value={`${subTotal}`} sub="All subscriptions" />
//                   <KpiCard title="Active" value={`${subActive}`} sub="Active subscriptions" />
//                   <KpiCard title="Revenue" value={`₹${monthlyRevenue.toFixed(2)}`} sub="Active sum(amount)" />
//                   <KpiCard title="Churn" value={`${churnRate.toFixed(2)}%`} sub="Cancelled/Total" />
//                 </div>

//                 <div style={styles.chartsGrid2}>
//                   <PieChartPro
//                     title="Status (Pie)"
//                     data={[
//                       { label: "Active", value: subActive },
//                       { label: "Cancelled", value: subCancelled },
//                       { label: "Expired", value: subExpired },
//                       { label: "Past Due", value: subPastDue },
//                     ]}
//                     tipSetter={setTip}
//                   />
//                   <BarChartPro title="Plans (Bar)" labels={planLabels.length ? planLabels : ["—"]} values={planValues.length ? planValues : [0]} tipSetter={setTip} />
//                 </div>

//                 <div style={styles.chartsGrid2}>
//                   <LineChartPro title="New Subs Trend" labels={subSeries.labels} values={subSeries.values} tipSetter={setTip} />
//                   <DonutPro title="Active Ratio" label="Active / Total" value={subActive} total={Math.max(1, subTotal)} color={pickColor(2)} tipSetter={setTip} />
//                 </div>
//               </div>

//               {/* PAYMENTS (optional) */}
//               <div style={styles.sectionCard}>
//                 <SectionHeader title="Payments Analytics (Optional)" subtitle="Will show only if endpoint exists" />
//                 {payments.length ? (
//                   <>
//                     <div style={styles.kpiGrid}>
//                       <KpiCard title="Payments Count" value={`${paymentsTotal}`} sub="Total payments" />
//                       <KpiCard title="Total Amount" value={`$${paymentsSum.toFixed(2)}`} sub="Sum(amount)" />
//                       <KpiCard title="Avg Amount" value={`$${(paymentsTotal ? paymentsSum / paymentsTotal : 0).toFixed(2)}`} sub="Average" />
//                       <KpiCard title="14 Day Trend" value="Enabled" sub="Line + Bar" />
//                     </div>

//                     <div style={styles.chartsGrid2}>
//                       <LineChartPro title="Payments Amount Trend" labels={paymentSeries.labels} values={paymentSeries.values} tipSetter={setTip} />
//                       <BarChartPro title="Payments Amount (Bar)" labels={paymentSeries.labels.slice(-10)} values={paymentSeries.values.slice(-10)} tipSetter={setTip} />
//                     </div>

//                     <div style={styles.chartsGrid2}>
//                       <DonutPro title="Collected Ratio" label="Collected" value={paymentsSum} total={Math.max(1, paymentsSum * 1.2)} color={pickColor(6)} tipSetter={setTip} />
//                       <PieChartPro
//                         title="Payments Status (Pie)"
//                         data={Object.entries(groupCount(payments, (p) => p.status || "Unknown")).map(([k, v]) => ({ label: k, value: v }))}
//                         tipSetter={setTip}
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <Placeholder text="Payments endpoint not available or no data. Add backend endpoint: /auth/admin/payments/" />
//                 )}
//               </div>

//               {/* AI USAGE (optional) */}
//               <div style={styles.sectionCard}>
//                 <SectionHeader title="AI Usage Analytics (Optional)" subtitle="Will show only if endpoint exists" />
//                 {aiUsage.length ? (
//                   <>
//                     <div style={styles.kpiGrid}>
//                       <KpiCard title="Total Tokens" value={`${aiTotalTokens.toFixed(0)}`} sub="Sum(tokens)" />
//                       <KpiCard title="Total Cost" value={`$${aiTotalCost.toFixed(2)}`} sub="Sum(cost)" />
//                       <KpiCard title="Avg Cost / Day" value={`$${(aiTotalCost / 14).toFixed(2)}`} sub="Approx 14 days" />
//                       <KpiCard title="Avg Tokens / Day" value={`${(aiTotalTokens / 14).toFixed(0)}`} sub="Approx 14 days" />
//                     </div>

//                     <div style={styles.chartsGrid2}>
//                       <LineChartPro title="AI Cost Trend" labels={aiCostSeries.labels} values={aiCostSeries.values} tipSetter={setTip} />
//                       <LineChartPro title="AI Tokens Trend" labels={aiTokensSeries.labels} values={aiTokensSeries.values} tipSetter={setTip} />
//                     </div>

//                     <div style={styles.chartsGrid2}>
//                       <BarChartPro title="AI Cost (Bar)" labels={aiCostSeries.labels.slice(-10)} values={aiCostSeries.values.slice(-10)} tipSetter={setTip} />
//                       <DonutPro title="Token Utilization" label="Tokens" value={aiTotalTokens} total={Math.max(1, aiTotalTokens * 1.2)} color={pickColor(0)} tipSetter={setTip} />
//                     </div>
//                   </>
//                 ) : (
//                   <Placeholder text="AI usage endpoint not available or no data. Add backend endpoint: /auth/admin/ai-usage/" />
//                 )}
//               </div>
//             </div>
//           )}

//           {/* EXISTING PAGES */}
//           {activeTab === "templates" && (
//             <div style={styles.fadeEffect}>
//               <AdminTemplates />
//             </div>
//           )}
//           {activeTab === "templatespricing" && (
//             <div style={styles.fadeEffect}>
//               <TemplatesPricing />
//             </div>
//           )}
//           {activeTab === "students" && (
//             <div style={styles.fadeEffect}>
//               <Students />
//             </div>
//           )}
//           {activeTab === "subscriptions" && (
//             <div style={styles.fadeEffect}>
//               <Subscriptions />
//             </div>
//           )}
          
//           {/* USERS TABLE */}
//           {activeTab === "users" && (
//             <div style={styles.fadeEffect}>
//               <div style={styles.tableHeader}>
//                 <h2 style={{ margin: 0, color: "#0f172a" }}>Users</h2>
//               </div>

//               <div style={styles.scrollContainer}>
//                 <table style={styles.adminTable}>
//                   <thead>
//                     <tr style={styles.thRow}>
//                       <th style={styles.th}>Name</th>
//                       <th style={styles.th}>Mobile</th>
//                       <th style={styles.th}>Pincode</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {users.map((u) => (
//                       <tr key={u.id} style={styles.tr}>
//                         <td style={styles.td}>{u.name}</td>
//                         <td style={styles.td}>{u.phone}</td>
//                         <td style={styles.td}>{u.pincode}</td>
//                       </tr>
//                     ))}

//                     {users.length === 0 && (
//                       <tr>
//                         <td colSpan={3} style={{ ...styles.td, padding: 18, textAlign: "center" }}>
//                           No users found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// /* =======================
//    Styles
//    ======================= */
// const styles: Record<string, React.CSSProperties> = {
//   adminWrapper: {
//     display: "flex",
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "#f1f5f9",
//     fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
//     overflow: "hidden",
//     position: "fixed",
//     top: 0,
//     left: 0,
//   },

//   mobileOverlay: {
//     display: "none",
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(15, 23, 42, 0.35)",
//     zIndex: 900,
//   },

//   sidebar: {
//     width: 280,
//     backgroundColor: "#0f172a",
//     color: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     padding: "26px 18px",
//     boxSizing: "border-box",
//     flexShrink: 0,
//   },

//   sidebarLogo: {
//     display: "flex",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 22,
//     padding: "6px 10px",
//     borderRadius: 12,
//     backgroundColor: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.06)",
//   },

//   logoText: { margin: 0, fontSize: 18, fontWeight: 800 },
//   logoSub: { margin: "2px 0 0", fontSize: 12, color: "#94a3b8" },

//   navLinks: { display: "flex", flexDirection: "column", gap: 10, flexGrow: 1, marginTop: 12 },

//   sidebarBottom: { borderTop: "1px solid #1e293b", paddingTop: 16 },

//   adminName: { fontSize: 13, color: "#94a3b8", marginBottom: 10 },

//   logoutBtn: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#ef4444",
//     color: "white",
//     border: "none",
//     borderRadius: 10,
//     cursor: "pointer",
//     fontWeight: 800,
//   },

//   mainArea: { flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" },

//   topHeader: {
//     height: 60,
//     backgroundColor: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "0 18px",
//     borderBottom: "1px solid #e2e8f0",
//   },

//   mobileToggle: {
//     display: "none",
//     background: "#0f172a",
//     color: "#fff",
//     border: "1px solid #0b1220",
//     padding: "8px 12px",
//     borderRadius: 10,
//     cursor: "pointer",
//   },

//   statusContainer: { display: "flex", alignItems: "center", gap: 8 },
//   // ✅ NO GREEN HERE
//   statusPulse: { width: 8, height: 8, backgroundColor: "#0ea5e9", borderRadius: "50%" },
//   statusText: { fontSize: 12, fontWeight: 900, color: "#64748b" },

//   contentPadding: { padding: 20, overflowY: "auto", flexGrow: 1 },

//   welcomeTitle: { fontSize: 22, color: "#0f172a", margin: 0, fontWeight: 950 as any },

//   statGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: 14,
//     marginTop: 16,
//   },

//   statCard: {
//     backgroundColor: "#fff",
//     padding: 18,
//     borderRadius: 14,
//     border: "1px solid #e2e8f0",
//     boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
//   },

//   statLabel: { margin: 0, color: "#64748b", fontSize: 13, fontWeight: 900 },
//   statValue: { margin: "8px 0 0", fontSize: 28, fontWeight: 950 as any, color: "#0f172a" },

//   tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 },

//   addBtn: {
//     backgroundColor: "#4f46e5",
//     color: "#fff",
//     border: "1px solid #4338ca",
//     padding: "10px 14px",
//     borderRadius: 12,
//     cursor: "pointer",
//     fontWeight: 950 as any,
//     boxShadow: "0 10px 25px rgba(79, 70, 229, 0.18)",
//   },

//   scrollContainer: {
//     width: "100%",
//     overflowX: "auto",
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     border: "1px solid #e2e8f0",
//   },

//   adminTable: { width: "100%", borderCollapse: "collapse", minWidth: 650 },
//   thRow: { backgroundColor: "#f8fafc" },
//   th: { textAlign: "left", padding: 12, color: "#64748b", fontSize: 13, fontWeight: 950 as any },
//   td: { padding: 12, borderTop: "1px solid #f1f5f9", fontSize: 14, backgroundColor: "white" },
//   tr: { transition: "0.2s", backgroundColor: "white" },

//   fadeEffect: { animation: "fadeIn 0.35s ease-out" },

//   sectionCard: {
//     background: "white",
//     borderRadius: 16,
//     border: "1px solid #e2e8f0",
//     padding: 16,
//     marginBottom: 14,
//     boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
//   },

//   kpiGrid: {
//     marginTop: 12,
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: 12,
//   },

//   kpiCard: {
//     border: "1px solid #e2e8f0",
//     borderRadius: 14,
//     padding: 14,
//     background: "#fff",
//   },
//   kpiTitle: { fontSize: 12, color: "#64748b", fontWeight: 950 as any },
//   kpiValue: { marginTop: 8, fontSize: 22, fontWeight: 950 as any, color: "#0f172a" },
//   kpiSub: { marginTop: 6, fontSize: 12, color: "#64748b", fontWeight: 900 },

//   placeholderBox: {
//     padding: 14,
//     borderRadius: 14,
//     border: "1px dashed #cbd5e1",
//     background: "#f8fafc",
//     color: "#64748b",
//     fontSize: 13,
//     fontWeight: 900,
//   },

//   chartsGrid2: {
//     marginTop: 12,
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
//     gap: 12,
//     alignItems: "start",
//   },

//   chartShell: {
//     background: "white",
//     border: "1px solid #e2e8f0",
//     borderRadius: 14,
//     padding: 12,
//     boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
//     overflowX: "auto",
//   },
//   chartHeader: {
//     fontSize: 13,
//     fontWeight: 950 as any,
//     color: "#0f172a",
//     marginBottom: 10,
//   },
// };

// function navStyle(active: boolean): React.CSSProperties {
//   return {
//     padding: "12px 14px",
//     borderRadius: 12,
//     cursor: "pointer",
//     color: active ? "#ffffff" : "#cbd5e1",
//     backgroundColor: active ? "#4f46e5" : "transparent",
//     transition: "0.2s",
//     fontWeight: 900,
//     userSelect: "none",
//     border: active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
//   };
// }


// src/pages/dashboard/AdminDashboard.tsx
import { useEffect, useMemo, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

import AdminTemplates from "./AdminTemplates";
import AdminTemplatesPricing from "./AdminTemplatesPricing";
import Students from "./Students";
import Subscriptions from "./Subscriptions";

/* =======================
   Types
   ======================= */
type AdminUser = {
  id: number;
  name: string;
  phone: string;
  email?: string;
  pincode: string;
  date_joined?: string;
};

type TemplateRow = {
  id: number;
  name: string;
  category?: string;
  status?: string;
  downloads?: number;
  rating?: number;
  created_at?: string;
  updated_at?: string;
};

type PricingRow = {
  id: number;
  templateName?: string;
  billing_type?: string;
  currency?: string;
  price?: number;
  final_price?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

type SubscriptionRow = {
  id: number;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  plan?: "Pro" | "Enterprise" | string;
  amount?: number;
  status?: "Active" | "Cancelled" | "Expired" | "Past Due" | string;
  start_date?: string;
  end_date?: string;
  auto_renew?: boolean;
  created_at?: string;
};

type PaymentRow = {
  id: number;
  amount?: number;
  status?: string;
  created_at?: string;
};

type AiUsageRow = {
  id: number;
  tokens?: number;
  cost?: number;
  created_at?: string;
};

/* =======================
   Auth helpers
   ======================= */
function getAccessToken() {
  return localStorage.getItem("access") || "";
}
function authHeaders() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* =======================
   Utils
   ======================= */
function safeNumber(n: any) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}
function sumBy<T>(arr: T[], fn: (x: T) => number) {
  return arr.reduce((a, b) => a + safeNumber(fn(b)), 0);
}
function groupCount<T>(arr: T[], keyFn: (x: T) => string) {
  const map: Record<string, number> = {};
  for (const it of arr) {
    const k = keyFn(it) || "Unknown";
    map[k] = (map[k] || 0) + 1;
  }
  return map;
}
function toSeriesByDay(items: { created_at?: string; date_joined?: string }[], valueFn: (it: any) => number, days = 14) {
  const now = new Date();
  const map: Record<string, number> = {};

  for (const it of items as any[]) {
    const ts = it.created_at || it.date_joined;
    if (!ts) continue;
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    map[key] = (map[key] || 0) + safeNumber(valueFn(it));
  }

  const labels: string[] = [];
  const values: number[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    labels.push(`${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`);
    values.push(map[key] || 0);
  }
  return { labels, values };
}

function niceTicks(min: number, max: number, count = 5) {
  if (max <= min) return [min, min + 1];
  const range = max - min;
  const step0 = range / (count - 1);

  const pow = Math.pow(10, Math.floor(Math.log10(step0)));
  const err = step0 / pow;

  let step = pow;
  if (err >= 7.5) step = 10 * pow;
  else if (err >= 3) step = 5 * pow;
  else if (err >= 1.5) step = 2 * pow;

  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;

  const ticks: number[] = [];
  for (let v = start; v <= end + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));
  return ticks;
}

/* =======================
   Tooltip overlay
   ======================= */
type Tip = {
  show: boolean;
  x: number;
  y: number;
  title: string;
  value: string;
  color?: string;
};
function Tooltip({ tip }: { tip: Tip }) {
  if (!tip.show) return null;
  return (
    <div
      style={{
        position: "fixed",
        left: tip.x + 12,
        top: tip.y + 12,
        background: "rgba(15,23,42,0.95)",
        color: "white",
        padding: "10px 12px",
        borderRadius: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
        zIndex: 5000,
        minWidth: 160,
        pointerEvents: "none",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {tip.color ? <div style={{ width: 10, height: 10, borderRadius: 4, background: tip.color }} /> : null}
        <div style={{ fontWeight: 950 as any, fontSize: 13 }}>{tip.title}</div>
      </div>
      <div style={{ marginTop: 6, fontWeight: 900, fontSize: 14 }}>{tip.value}</div>
    </div>
  );
}

/* =======================
   FIXED PALETTE (NO GREEN)
   ======================= */
const PALETTE = [
  "#2E3192", // deep indigo
  "#08115C", // navy
  "#6D1B7B", // purple
  "#E6005C", // magenta
  "#E91E63", // hot pink
  "#FF6F61", // coral
  "#F07C65", // salmon
  "#FF9800", // orange
  "#FFD200", // yellow
  "#C79B61", // tan
  "#D9C6B5", // beige
  "#F2F1E7", // off-white
  "#5B0B0B", // maroon
  "#3C7A8A", // teal (not green)
  "#111111", // near-black
];

function pickColor(i: number) {
  return PALETTE[i % PALETTE.length];
}

/* =======================
   SVG axis helper
   ======================= */
function AxisY({ x, y, h, ticks }: { x: number; y: number; h: number; ticks: number[] }) {
  const maxTick = Math.max(...ticks);
  const minTick = Math.min(...ticks);
  const range = maxTick - minTick || 1;

  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + h} stroke="#e2e8f0" />
      {ticks.map((t, idx) => {
        const yy = y + h - ((t - minTick) / range) * h;
        return (
          <g key={idx}>
            <line x1={x - 4} y1={yy} x2={x} y2={yy} stroke="#cbd5e1" />
            <text x={x - 8} y={yy + 4} textAnchor="end" fontSize="11" fill="#64748b" fontWeight={900}>
              {t >= 1000 ? `${(t / 1000).toFixed(t % 1000 === 0 ? 0 : 1)}k` : String(t)}
            </text>
            <line x1={x} y1={yy} x2={x + 520} y2={yy} stroke="#f1f5f9" />
          </g>
        );
      })}
    </g>
  );
}

/* =======================
   Charts (Colorful + tooltip + axis)
   ======================= */
function BarChartPro({
  title,
  labels,
  values,
  tipSetter,
  height = 210,
}: {
  title?: string;
  labels: string[];
  values: number[];
  tipSetter: (t: Tip) => void;
  height?: number;
}) {
  const width = 560;
  const padL = 46;
  const padR = 16;
  const padT = 20;
  const padB = 40;

  const n = Math.max(values.length, 1);
  const max = Math.max(...values, 1);
  const ticks = niceTicks(0, max, 5);

  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const gap = 10;
  const barW = Math.max(16, Math.floor((innerW - (n - 1) * gap) / n));

  return (
    <div style={styles.chartShell}>
      {title ? <div style={styles.chartHeader}>{title}</div> : null}
      <svg width={width} height={height} style={{ display: "block" }}>
        <AxisY x={padL} y={padT} h={innerH} ticks={ticks} />
        <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#e2e8f0" />

        {values.map((v, i) => {
          const color = pickColor(i);
          const h = (v / max) * innerH;
          const x = padL + i * (barW + gap);
          const y = padT + innerH - h;

          return (
            <g key={i}>
              <rect x={x + 3} y={y + 3} width={barW} height={h} rx={10} fill="#0f172a" opacity={0.10} />
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx={10}
                fill={color}
                onMouseMove={(e) =>
                  tipSetter({
                    show: true,
                    x: e.clientX,
                    y: e.clientY,
                    title: labels[i],
                    value: `${v}`,
                    color,
                  })
                }
                onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
              />
              <rect x={x + 5} y={y + 8} width={Math.max(6, barW * 0.24)} height={Math.max(10, h - 16)} rx={8} fill="white" opacity={0.16} />
              <text x={x + barW / 2} y={padT + innerH + 22} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight={900}>
                {(labels[i] || "").slice(0, 10)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LineChartPro({
  title,
  labels,
  values,
  tipSetter,
  height = 220,
}: {
  title?: string;
  labels: string[];
  values: number[];
  tipSetter: (t: Tip) => void;
  height?: number;
}) {
  const width = 560;
  const padL = 46;
  const padR = 16;
  const padT = 20;
  const padB = 44;

  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const ticks = niceTicks(min, max, 5);

  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const range = max - min || 1;

  const pts = values.map((v, i) => {
    const x = padL + (i / Math.max(values.length - 1, 1)) * innerW;
    const y = padT + (1 - (v - min) / range) * innerH;
    return { x, y, v, label: labels[i] };
  });

  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const stroke = pickColor(1);

  return (
    <div style={styles.chartShell}>
      {title ? <div style={styles.chartHeader}>{title}</div> : null}
      <svg width={width} height={height} style={{ display: "block" }}>
        <AxisY x={padL} y={padT} h={innerH} ticks={ticks} />
        <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#e2e8f0" />

        <path d={`${d} L ${padL + innerW} ${padT + innerH} L ${padL} ${padT + innerH} Z`} fill={stroke} opacity={0.12} />
        <path d={d} fill="none" stroke={stroke} strokeWidth={3.8} />

        {pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={5}
            fill="#ffffff"
            stroke={stroke}
            strokeWidth={2.6}
            onMouseMove={(e) =>
              tipSetter({
                show: true,
                x: e.clientX,
                y: e.clientY,
                title: p.label,
                value: `${p.v}`,
                color: stroke,
              })
            }
            onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
          />
        ))}

        <text x={padL} y={padT + innerH + 28} textAnchor="start" fontSize="11" fill="#64748b" fontWeight={900}>
          {labels[0]}
        </text>
        <text x={padL + innerW / 2} y={padT + innerH + 28} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight={900}>
          {labels[Math.floor(labels.length / 2)]}
        </text>
        <text x={padL + innerW} y={padT + innerH + 28} textAnchor="end" fontSize="11" fill="#64748b" fontWeight={900}>
          {labels[labels.length - 1]}
        </text>
      </svg>
    </div>
  );
}

function PieChartPro({
  title,
  data,
  tipSetter,
  size = 200,
}: {
  title?: string;
  data: { label: string; value: number }[];
  tipSetter: (t: Tip) => void;
  size?: number;
}) {
  const colored = data.map((d, i) => ({ ...d, color: pickColor(i) }));
  const total = colored.reduce((a, b) => a + b.value, 0) || 1;

  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;

  let acc = 0;
  const slices = colored.map((d) => {
    const start = (acc / total) * Math.PI * 2;
    acc += d.value;
    const end = (acc / total) * Math.PI * 2;

    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);

    const largeArc = end - start > Math.PI ? 1 : 0;
    const path = [`M ${cx} ${cy}`, `L ${x1} ${y1}`, `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`, "Z"].join(" ");
    return { ...d, path };
  });

  return (
    <div style={styles.chartShell}>
      {title ? <div style={styles.chartHeader}>{title}</div> : null}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <svg width={size} height={size} style={{ display: "block" }}>
          {slices.map((s, i) => (
            <path
              key={i}
              d={s.path}
              fill={s.color}
              stroke="white"
              strokeWidth={2}
              onMouseMove={(e) =>
                tipSetter({
                  show: true,
                  x: e.clientX,
                  y: e.clientY,
                  title: s.label,
                  value: `${s.value} (${((s.value / total) * 100).toFixed(1)}%)`,
                  color: s.color,
                })
              }
              onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
            />
          ))}
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {colored.map((d) => (
            <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 4, background: d.color }} />
              <div style={{ fontSize: 13, fontWeight: 950 as any, color: "#0f172a" }}>
                {d.label}: <span style={{ color: "#334155" }}>{d.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonutPro({
  title,
  label,
  value,
  total,
  color,
  tipSetter,
}: {
  title?: string;
  label: string;
  value: number;
  total: number;
  color: string;
  tipSetter: (t: Tip) => void;
}) {
  const pct = total ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
  const r = 42;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <div style={{ ...styles.chartShell, width: 300 }}>
      {title ? <div style={styles.chartHeader}>{title}</div> : null}
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <svg
          width={120}
          height={120}
          onMouseMove={(e) =>
            tipSetter({
              show: true,
              x: e.clientX,
              y: e.clientY,
              title: label,
              value: `${pct.toFixed(1)}% (${value}/${total})`,
              color,
            })
          }
          onMouseLeave={() => tipSetter({ show: false, x: 0, y: 0, title: "", value: "" })}
        >
          <circle cx={60} cy={60} r={r} stroke="#e2e8f0" strokeWidth={10} fill="none" />
          <circle
            cx={60}
            cy={60}
            r={r}
            stroke={color}
            strokeWidth={10}
            fill="none"
            strokeDasharray={`${dash} ${c}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="60" textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="950" fill="#0f172a">
            {pct.toFixed(0)}%
          </text>
        </svg>

        <div>
          <div style={{ fontSize: 13, fontWeight: 950 as any, color: "#0f172a" }}>{label}</div>
          <div style={{ marginTop: 6, color: "#64748b", fontWeight: 900, fontSize: 12 }}>
            {value} / {total}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================
   UI blocks
   ======================= */
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
      <h3 style={{ margin: 0, color: "#0f172a", fontWeight: 950 as any }}>{title}</h3>
      <div style={{ color: "#64748b", fontSize: 12, fontWeight: 900 }}>{subtitle}</div>
    </div>
  );
}
function KpiCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div style={styles.kpiCard}>
      <div style={styles.kpiTitle}>{title}</div>
      <div style={styles.kpiValue}>{value}</div>
      {sub ? <div style={styles.kpiSub}>{sub}</div> : null}
    </div>
  );
}
function Placeholder({ text }: { text: string }) {
  return <div style={styles.placeholderBox}>{text}</div>;
}

/* =======================
   Main Component
   ======================= */
export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "analytics" | "users" | "templates" | "templatespricing" | "students" | "subscriptions"
  >("dashboard");

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [templates, setTemplates] = useState<TemplateRow[]>([]);
  const [pricing, setPricing] = useState<PricingRow[]>([]);
  const [subs, setSubs] = useState<SubscriptionRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [aiUsage, setAiUsage] = useState<AiUsageRow[]>([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tip, setTip] = useState<Tip>({ show: false, x: 0, y: 0, title: "", value: "" });

  const admin = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("admin") || "null");
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
      return;
    }
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, navigate]);

  const safeGet = async (url: string) => {
    try {
      const res = await axios.get(url, { headers: authHeaders() });
      return res.data;
    } catch {
      return null;
    }
  };

  const fetchAll = async () => {
    const [u, t, p, s, pay, ai] = await Promise.all([
      safeGet("/auth/admin/users/"),
      safeGet("/auth/admin/templates/"),
      safeGet("/auth/admin/template-pricing/"),
      safeGet("/auth/admin/subscriptions/"),
      safeGet("/auth/admin/payments/"),
      safeGet("/auth/admin/ai-usage/"),
    ]);

    setUsers(u || []);
    setTemplates(t || []);
    setPricing(p || []);
    setSubs(s || []);
    setPayments(pay || []);
    setAiUsage(ai || []);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const goTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setTip({ show: false, x: 0, y: 0, title: "", value: "" });
  };

  /* ===== Derived analytics ===== */
  const usersByPincode = groupCount(users, (u) => (u.pincode || "NA").slice(0, 3));
  const upLabels = Object.keys(usersByPincode).slice(0, 10);
  const upValues = upLabels.map((k) => usersByPincode[k]);
  const userJoinSeries = toSeriesByDay(users as any, () => 1, 14);

  const byCategory = groupCount(templates, (t) => t.category || "Other");
  const catLabels = Object.keys(byCategory).slice(0, 10);
  const catValues = catLabels.map((k) => byCategory[k]);

  const byStatus = groupCount(templates, (t) => t.status || "Unknown");
  const stLabels = Object.keys(byStatus);
  const stValues = stLabels.map((k) => byStatus[k]);

  const totalDownloads = sumBy(templates, (t) => safeNumber(t.downloads));
  const avgRating = templates.length ? sumBy(templates, (t) => safeNumber(t.rating)) / templates.length : 0;

  const byBilling = groupCount(pricing, (p) => p.billing_type || "Unknown");
  const billLabels = Object.keys(byBilling);
  const billValues = billLabels.map((k) => byBilling[k]);
  const avgPrice = pricing.length ? sumBy(pricing, (p) => safeNumber(p.price)) / pricing.length : 0;
  const avgFinal = pricing.length ? sumBy(pricing, (p) => safeNumber(p.final_price)) / pricing.length : 0;

  const subTotal = subs.length;
  const subActive = subs.filter((x) => (x.status || "") === "Active").length;
  const subCancelled = subs.filter((x) => (x.status || "") === "Cancelled").length;
  const subPastDue = subs.filter((x) => (x.status || "") === "Past Due").length;
  const subExpired = subs.filter((x) => (x.status || "") === "Expired").length;

  const monthlyRevenue = sumBy(subs.filter((x) => (x.status || "") === "Active"), (x) => safeNumber(x.amount));
  const churnRate = subTotal ? (subCancelled / subTotal) * 100 : 0;

  const planCounts = groupCount(subs, (x) => String(x.plan || "Unknown"));
  const planLabels = Object.keys(planCounts);
  const planValues = planLabels.map((k) => planCounts[k]);
  const subSeries = toSeriesByDay(subs as any, () => 1, 14);

  const paymentsTotal = payments.length;
  const paymentsSum = sumBy(payments, (p) => safeNumber(p.amount));
  const paymentSeries = toSeriesByDay(payments as any, (p) => safeNumber(p.amount), 14);

  const aiTotalTokens = sumBy(aiUsage, (a) => safeNumber(a.tokens));
  const aiTotalCost = sumBy(aiUsage, (a) => safeNumber(a.cost));
  const aiCostSeries = toSeriesByDay(aiUsage as any, (a) => safeNumber(a.cost), 14);
  const aiTokensSeries = toSeriesByDay(aiUsage as any, (a) => safeNumber(a.tokens), 14);

  return (
    <div style={styles.adminWrapper}>
      <Tooltip tip={tip} />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
        @media (max-width: 768px) {
          .sidebar { position: fixed; left: -300px; top: 0; z-index: 1000; height: 100vh; transition: 0.25s ease; }
          .sidebar.open { left: 0; }
          .main-area { width: 100vw; }
          .mobile-toggle { display: inline-flex !important; }
          .overlay { display: block !important; }
        }
      `}</style>

      {isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)} style={styles.mobileOverlay} />}

      <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={{ fontSize: 26 }}>🛡️</div>
          <div>
            <h2 style={styles.logoText}>Admin Pro</h2>
            <p style={styles.logoSub}>Resume Builder Console</p>
          </div>
        </div>

        <nav style={styles.navLinks}>
          <div style={navStyle(activeTab === "dashboard")} onClick={() => goTab("dashboard")}>
            📊 Dashboard
          </div>

          <div style={navStyle(activeTab === "analytics")} onClick={() => goTab("analytics")}>
            📈 Analytics
          </div>

          <div style={navStyle(activeTab === "templates")} onClick={() => goTab("templates")}>
            📄 Resume Templates
          </div>

          <div style={navStyle(activeTab === "templatespricing")} onClick={() => goTab("templatespricing")}>
            💰 Templates Pricing
          </div>

          <div style={navStyle(activeTab === "students")} onClick={() => goTab("students")}>
            🎓 Students
          </div>

          <div style={navStyle(activeTab === "subscriptions")} onClick={() => goTab("subscriptions")}>
            🧾 Subscriptions
          </div>
          <button onClick={() => navigate("/admin/staff")}>
          Manage Admin Staff
        </button>
         <button onClick={() => navigate("/ai-resume")}>
         AI Resume Generator
        </button>

        </nav>

        <div style={styles.sidebarBottom}>
          <p style={styles.adminName}>{admin?.name || "System Admin"}</p>
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-area" style={styles.mainArea}>
        <header style={styles.topHeader}>
          <button style={styles.mobileToggle} className="mobile-toggle" onClick={() => setIsMobileMenuOpen((s) => !s)} aria-label="Open Menu">
            ☰
          </button>

          <h3 style={{ margin: 0, color: "#0f172a" }}>Console</h3>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button style={styles.addBtn} onClick={fetchAll}>
              Refresh
            </button>
            <div style={styles.statusContainer}>
              <div style={styles.statusPulse} />
              <span style={styles.statusText}>System Live</span>
            </div>
          </div>
        </header>

        <div style={styles.contentPadding}>
          {activeTab === "dashboard" && (
            <div style={styles.fadeEffect}>
              <h1 style={styles.welcomeTitle}>Hello, Admin</h1>

              <div style={styles.statGrid}>
                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Total Users</p>
                  <h2 style={styles.statValue}>{users.length}</h2>
                </div>

                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Templates</p>
                  <h2 style={styles.statValue}>{templates.length}</h2>
                </div>

                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Pricing Rows</p>
                  <h2 style={styles.statValue}>{pricing.length}</h2>
                </div>

                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Subscriptions</p>
                  <h2 style={styles.statValue}>{subTotal}</h2>
                </div>

                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Monthly Revenue</p>
                  <h2 style={styles.statValue}>₹{monthlyRevenue.toFixed(2)}</h2>
                </div>

                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Churn Rate</p>
                  <h2 style={{ ...styles.statValue, color: "#FF9800" }}>{churnRate.toFixed(2)}%</h2>
                </div>

                <div style={styles.statCard}>
                  <p style={styles.statLabel}>Payments</p>
                  <h2 style={styles.statValue}>{paymentsTotal ? `$${paymentsSum.toFixed(2)}` : "—"}</h2>
                </div>

                <div style={styles.statCard}>
                  <p style={styles.statLabel}>AI Cost</p>
                  <h2 style={styles.statValue}>{aiUsage.length ? `$${aiTotalCost.toFixed(2)}` : "—"}</h2>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div style={styles.fadeEffect}>
              <div style={styles.tableHeader}>
                <h2 style={{ margin: 0, color: "#0f172a" }}>Analytics</h2>
                <div style={{ color: "#64748b", fontSize: 13, fontWeight: 900 }}>Hover on charts for exact values</div>
              </div>

              {/* USERS */}
              <div style={styles.sectionCard}>
                <SectionHeader title="Users Analytics" subtitle="Color palette as per your uploaded image (no green)" />
                <div style={styles.kpiGrid}>
                  <KpiCard title="Total Users" value={`${users.length}`} sub="All registered users" />
                  <KpiCard title="Pincode Groups" value={`${Object.keys(usersByPincode).length}`} sub="Grouped by first 3 digits" />
                  <KpiCard title="14 Days Joins" value={`${userJoinSeries.values.reduce((a, b) => a + b, 0)}`} sub="Based on date_joined" />
                  <KpiCard title="Top Pincode" value={`${upLabels[0] || "—"}`} sub="Most frequent prefix" />
                </div>

                <div style={styles.chartsGrid2}>
                  <LineChartPro title="User Joins Trend" labels={userJoinSeries.labels} values={userJoinSeries.values} tipSetter={setTip} />
                  <BarChartPro title="Users by Pincode Prefix" labels={upLabels.length ? upLabels : ["—"]} values={upValues.length ? upValues : [0]} tipSetter={setTip} />
                </div>

                <div style={styles.chartsGrid2}>
                  <DonutPro title="Users vs 100" label="Users / 100" value={Math.min(users.length, 100)} total={100} color={pickColor(3)} tipSetter={setTip} />
                  <PieChartPro
                    title="Pincode Distribution (Top 6)"
                    data={(upLabels.slice(0, 6).length ? upLabels.slice(0, 6) : ["—"]).map((l, i) => ({
                      label: l,
                      value: upValues[i] || 0,
                    }))}
                    tipSetter={setTip}
                  />
                </div>
              </div>

              {/* TEMPLATES */}
              <div style={styles.sectionCard}>
                <SectionHeader title="Templates Analytics" subtitle="Colorful charts + tooltip + axis" />
                <div style={styles.kpiGrid}>
                  <KpiCard title="Total Templates" value={`${templates.length}`} sub="All templates" />
                  <KpiCard title="Total Downloads" value={`${totalDownloads}`} sub="Sum downloads" />
                  <KpiCard title="Avg Rating" value={`${avgRating.toFixed(2)}`} sub="Average rating" />
                  <KpiCard title="Top Category" value={`${catLabels[0] || "—"}`} sub="Highest count" />
                </div>

                <div style={styles.chartsGrid2}>
                  <BarChartPro title="Templates by Category" labels={catLabels.length ? catLabels : ["—"]} values={catValues.length ? catValues : [0]} tipSetter={setTip} />
                  <PieChartPro
                    title="Templates by Status"
                    data={stLabels.length ? stLabels.map((k, i) => ({ label: k, value: stValues[i] })) : [{ label: "—", value: 1 }]}
                    tipSetter={setTip}
                  />
                </div>

                <div style={styles.chartsGrid2}>
                  <LineChartPro
                    title="Downloads Trend (approx 14d)"
                    labels={toSeriesByDay(templates as any, (t) => safeNumber(t.downloads), 14).labels}
                    values={toSeriesByDay(templates as any, (t) => safeNumber(t.downloads), 14).values}
                    tipSetter={setTip}
                  />
                  <DonutPro title="Rating / 5" label="Avg Rating" value={avgRating} total={5} color={pickColor(8)} tipSetter={setTip} />
                </div>
              </div>

              {/* PRICING */}
              <div style={styles.sectionCard}>
                <SectionHeader title="Pricing Analytics" subtitle="Billing type + Avg price trends" />
                <div style={styles.kpiGrid}>
                  <KpiCard title="Pricing Rows" value={`${pricing.length}`} sub="All pricing records" />
                  <KpiCard title="Avg Price" value={`$${avgPrice.toFixed(2)}`} sub="Base price avg" />
                  <KpiCard title="Avg Final" value={`$${avgFinal.toFixed(2)}`} sub="Final price avg" />
                  <KpiCard title="Top Billing" value={`${billLabels[0] || "—"}`} sub="Most common" />
                </div>

                <div style={styles.chartsGrid2}>
                  <PieChartPro
                    title="Billing Type (Pie)"
                    data={billLabels.length ? billLabels.map((k, i) => ({ label: k, value: billValues[i] })) : [{ label: "—", value: 1 }]}
                    tipSetter={setTip}
                  />
                  <BarChartPro title="Billing Type (Bar)" labels={billLabels.length ? billLabels : ["—"]} values={billValues.length ? billValues : [0]} tipSetter={setTip} />
                </div>

                <div style={styles.chartsGrid2}>
                  <LineChartPro
                    title="Final Price Trend (approx 14d)"
                    labels={toSeriesByDay(pricing as any, (p) => safeNumber(p.final_price), 14).labels}
                    values={toSeriesByDay(pricing as any, (p) => safeNumber(p.final_price), 14).values}
                    tipSetter={setTip}
                  />
                  <DonutPro title="Final vs Base" label="Avg Final / Avg Base" value={avgFinal} total={Math.max(1, avgPrice)} color={pickColor(4)} tipSetter={setTip} />
                </div>
              </div>

              {/* SUBSCRIPTIONS */}
              <div style={styles.sectionCard}>
                <SectionHeader title="Subscriptions Analytics" subtitle="Status + Plans + Trend" />
                <div style={styles.kpiGrid}>
                  <KpiCard title="Subscriptions" value={`${subTotal}`} sub="All subscriptions" />
                  <KpiCard title="Active" value={`${subActive}`} sub="Active subscriptions" />
                  <KpiCard title="Revenue" value={`₹${monthlyRevenue.toFixed(2)}`} sub="Active sum(amount)" />
                  <KpiCard title="Churn" value={`${churnRate.toFixed(2)}%`} sub="Cancelled/Total" />
                </div>

                <div style={styles.chartsGrid2}>
                  <PieChartPro
                    title="Status (Pie)"
                    data={[
                      { label: "Active", value: subActive },
                      { label: "Cancelled", value: subCancelled },
                      { label: "Expired", value: subExpired },
                      { label: "Past Due", value: subPastDue },
                    ]}
                    tipSetter={setTip}
                  />
                  <BarChartPro title="Plans (Bar)" labels={planLabels.length ? planLabels : ["—"]} values={planValues.length ? planValues : [0]} tipSetter={setTip} />
                </div>

                <div style={styles.chartsGrid2}>
                  <LineChartPro title="New Subs Trend" labels={subSeries.labels} values={subSeries.values} tipSetter={setTip} />
                  <DonutPro title="Active Ratio" label="Active / Total" value={subActive} total={Math.max(1, subTotal)} color={pickColor(2)} tipSetter={setTip} />
                </div>
              </div>

              {/* PAYMENTS (optional) */}
              <div style={styles.sectionCard}>
                <SectionHeader title="Payments Analytics (Optional)" subtitle="Will show only if endpoint exists" />
                {payments.length ? (
                  <>
                    <div style={styles.kpiGrid}>
                      <KpiCard title="Payments Count" value={`${paymentsTotal}`} sub="Total payments" />
                      <KpiCard title="Total Amount" value={`$${paymentsSum.toFixed(2)}`} sub="Sum(amount)" />
                      <KpiCard title="Avg Amount" value={`$${(paymentsTotal ? paymentsSum / paymentsTotal : 0).toFixed(2)}`} sub="Average" />
                      <KpiCard title="14 Day Trend" value="Enabled" sub="Line + Bar" />
                    </div>

                    <div style={styles.chartsGrid2}>
                      <LineChartPro title="Payments Amount Trend" labels={paymentSeries.labels} values={paymentSeries.values} tipSetter={setTip} />
                      <BarChartPro title="Payments Amount (Bar)" labels={paymentSeries.labels.slice(-10)} values={paymentSeries.values.slice(-10)} tipSetter={setTip} />
                    </div>

                    <div style={styles.chartsGrid2}>
                      <DonutPro title="Collected Ratio" label="Collected" value={paymentsSum} total={Math.max(1, paymentsSum * 1.2)} color={pickColor(6)} tipSetter={setTip} />
                      <PieChartPro
                        title="Payments Status (Pie)"
                        data={Object.entries(groupCount(payments, (p) => p.status || "Unknown")).map(([k, v]) => ({ label: k, value: v }))}
                        tipSetter={setTip}
                      />
                    </div>
                  </>
                ) : (
                  <Placeholder text="Payments endpoint not available or no data. Add backend endpoint: /auth/admin/payments/" />
                )}
              </div>

              {/* AI USAGE (optional) */}
              <div style={styles.sectionCard}>
                <SectionHeader title="AI Usage Analytics (Optional)" subtitle="Will show only if endpoint exists" />
                {aiUsage.length ? (
                  <>
                    <div style={styles.kpiGrid}>
                      <KpiCard title="Total Tokens" value={`${aiTotalTokens.toFixed(0)}`} sub="Sum(tokens)" />
                      <KpiCard title="Total Cost" value={`$${aiTotalCost.toFixed(2)}`} sub="Sum(cost)" />
                      <KpiCard title="Avg Cost / Day" value={`$${(aiTotalCost / 14).toFixed(2)}`} sub="Approx 14 days" />
                      <KpiCard title="Avg Tokens / Day" value={`${(aiTotalTokens / 14).toFixed(0)}`} sub="Approx 14 days" />
                    </div>

                    <div style={styles.chartsGrid2}>
                      <LineChartPro title="AI Cost Trend" labels={aiCostSeries.labels} values={aiCostSeries.values} tipSetter={setTip} />
                      <LineChartPro title="AI Tokens Trend" labels={aiTokensSeries.labels} values={aiTokensSeries.values} tipSetter={setTip} />
                    </div>

                    <div style={styles.chartsGrid2}>
                      <BarChartPro title="AI Cost (Bar)" labels={aiCostSeries.labels.slice(-10)} values={aiCostSeries.values.slice(-10)} tipSetter={setTip} />
                      <DonutPro title="Token Utilization" label="Tokens" value={aiTotalTokens} total={Math.max(1, aiTotalTokens * 1.2)} color={pickColor(0)} tipSetter={setTip} />
                    </div>
                  </>
                ) : (
                  <Placeholder text="AI usage endpoint not available or no data. Add backend endpoint: /auth/admin/ai-usage/" />
                )}
              </div>
            </div>
          )}

          {/* EXISTING PAGES */}
          {activeTab === "templates" && (
            <div style={styles.fadeEffect}>
              <AdminTemplates />
            </div>
          )}
          {activeTab === "templatespricing" && (
            <div style={styles.fadeEffect}>
              <AdminTemplatesPricing />
            </div>
          )}
          {activeTab === "students" && (
            <div style={styles.fadeEffect}>
              <Students />
            </div>
          )}
          {activeTab === "subscriptions" && (
            <div style={styles.fadeEffect}>
              <Subscriptions />
            </div>
          )}
          
          {/* USERS TABLE */}
          {activeTab === "users" && (
            <div style={styles.fadeEffect}>
              <div style={styles.tableHeader}>
                <h2 style={{ margin: 0, color: "#0f172a" }}>Users</h2>
              </div>

              <div style={styles.scrollContainer}>
                <table style={styles.adminTable}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Mobile</th>
                      <th style={styles.th}>Pincode</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} style={styles.tr}>
                        <td style={styles.td}>{u.name}</td>
                        <td style={styles.td}>{u.phone}</td>
                        <td style={styles.td}>{u.pincode}</td>
                      </tr>
                    ))}

                    {users.length === 0 && (
                      <tr>
                        <td colSpan={3} style={{ ...styles.td, padding: 18, textAlign: "center" }}>
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* =======================
   Styles
   ======================= */
const styles: Record<string, React.CSSProperties> = {
  adminWrapper: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f1f5f9",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
  },

  mobileOverlay: {
    display: "none",
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    zIndex: 900,
  },

  sidebar: {
    width: 280,
    backgroundColor: "#0f172a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "26px 18px",
    boxSizing: "border-box",
    flexShrink: 0,
  },

  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
    padding: "6px 10px",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  logoText: { margin: 0, fontSize: 18, fontWeight: 800 },
  logoSub: { margin: "2px 0 0", fontSize: 12, color: "#94a3b8" },

  navLinks: { display: "flex", flexDirection: "column", gap: 10, flexGrow: 1, marginTop: 12 },

  sidebarBottom: { borderTop: "1px solid #1e293b", paddingTop: 16 },

  adminName: { fontSize: 13, color: "#94a3b8", marginBottom: 10 },

  logoutBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
  },

  mainArea: { flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" },

  topHeader: {
    height: 60,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 18px",
    borderBottom: "1px solid #e2e8f0",
  },

  mobileToggle: {
    display: "none",
    background: "#0f172a",
    color: "#fff",
    border: "1px solid #0b1220",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },

  statusContainer: { display: "flex", alignItems: "center", gap: 8 },
  statusPulse: { width: 8, height: 8, backgroundColor: "#0ea5e9", borderRadius: "50%" },
  statusText: { fontSize: 12, fontWeight: 900, color: "#64748b" },

  contentPadding: { padding: 20, overflowY: "auto", flexGrow: 1 },

  welcomeTitle: { fontSize: 22, color: "#0f172a", margin: 0, fontWeight: 950 as any },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    marginTop: 16,
  },

  statCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
  },

  statLabel: { margin: 0, color: "#64748b", fontSize: 13, fontWeight: 900 },
  statValue: { margin: "8px 0 0", fontSize: 28, fontWeight: 950 as any, color: "#0f172a" },

  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 },

  addBtn: {
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "1px solid #4338ca",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 950 as any,
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.18)",
  },

  scrollContainer: {
    width: "100%",
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: 14,
    border: "1px solid #e2e8f0",
  },

  adminTable: { width: "100%", borderCollapse: "collapse", minWidth: 650 },
  thRow: { backgroundColor: "#f8fafc" },
  th: { textAlign: "left", padding: 12, color: "#64748b", fontSize: 13, fontWeight: 950 as any },
  td: { padding: 12, borderTop: "1px solid #f1f5f9", fontSize: 14, backgroundColor: "white" },
  tr: { transition: "0.2s", backgroundColor: "white" },

  fadeEffect: { animation: "fadeIn 0.35s ease-out" },

  sectionCard: {
    background: "white",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    padding: 16,
    marginBottom: 14,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },

  kpiGrid: {
    marginTop: 12,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },

  kpiCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 14,
    background: "#fff",
  },
  kpiTitle: { fontSize: 12, color: "#64748b", fontWeight: 950 as any },
  kpiValue: { marginTop: 8, fontSize: 22, fontWeight: 950 as any, color: "#0f172a" },
  kpiSub: { marginTop: 6, fontSize: 12, color: "#64748b", fontWeight: 900 },

  placeholderBox: {
    padding: 14,
    borderRadius: 14,
    border: "1px dashed #cbd5e1",
    background: "#f8fafc",
    color: "#64748b",
    fontSize: 13,
    fontWeight: 900,
  },

  chartsGrid2: {
    marginTop: 12,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))",
    gap: 12,
    alignItems: "start",
  },

  chartShell: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 12,
    boxShadow: "0 8px 18px rgba(15,23,42,0.05)",
    overflowX: "auto",
  },
  chartHeader: {
    fontSize: 13,
    fontWeight: 950 as any,
    color: "#0f172a",
    marginBottom: 10,
  },
};

function navStyle(active: boolean): React.CSSProperties {
  return {
    padding: "12px 14px",
    borderRadius: 12,
    cursor: "pointer",
    color: active ? "#ffffff" : "#cbd5e1",
    backgroundColor: active ? "#4f46e5" : "transparent",
    transition: "0.2s",
    fontWeight: 900,
    userSelect: "none",
    border: active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
  };
}