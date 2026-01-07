// // // src/App.tsx
// // import React, { useMemo, useState } from "react";

// // type TemplateStatus = "active" | "draft";
// // type Category = "Modern" | "Classic";
// // type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

// // interface Template {
// //   id: string;
// //   name: string;
// //   category: Category;
// //   layout: Layout;
// //   status: TemplateStatus;
// //   downloads: number;
// //   rating: number;
// //   updated: string; // dd/mm/yyyy
// //   color: string; // HEX or any CSS color
// // }

// // const dummyTemplates: Template[] = [
// //   { id: "aurora-01", name: "Aurora modern-01", category: "Modern", layout: "Two Column", status: "draft", downloads: 2462, rating: 3.1, updated: "16/12/2025", color: "#06b6d4" },
// //   { id: "zenith-02", name: "Zenith modern-02", category: "Modern", layout: "Sidebar Left", status: "active", downloads: 4992, rating: 3.6, updated: "19/12/2025", color: "#22c55e" },
// //   { id: "prism-03", name: "Prism modern-03", category: "Modern", layout: "Two Column", status: "active", downloads: 2659, rating: 4.6, updated: "30/12/2025", color: "#a855f7" },
// //   { id: "nexus-04", name: "Nexus modern-04", category: "Modern", layout: "Sidebar Right", status: "active", downloads: 3059, rating: 4.6, updated: "29/12/2025", color: "#f97316" },
// //   { id: "vertex-05", name: "Vertex modern-05", category: "Modern", layout: "Two Column", status: "active", downloads: 4829, rating: 4.1, updated: "10/12/2025", color: "#14b8a6" },
// //   { id: "pulse-06", name: "Pulse modern-06", category: "Modern", layout: "Single Column", status: "active", downloads: 844, rating: 4.1, updated: "22/12/2025", color: "#ef4444" },
// //   { id: "nova-07", name: "Nova modern-07", category: "Modern", layout: "Sidebar Left", status: "active", downloads: 2977, rating: 4.5, updated: "01/01/2026", color: "#a855f7" },
// //   { id: "flux-08", name: "Flux modern-08", category: "Modern", layout: "Two Column", status: "active", downloads: 2601, rating: 4.2, updated: "27/12/2025", color: "#ec4899" },
// //   { id: "edge-09", name: "Edge modern-09", category: "Modern", layout: "Sidebar Right", status: "active", downloads: 564, rating: 3.3, updated: "15/12/2025", color: "#22c55e" },
// //   { id: "spark-10", name: "Spark modern-10", category: "Modern", layout: "Two Column", status: "active", downloads: 2618, rating: 4.6, updated: "18/12/2025", color: "#eab308" },
// //   { id: "heritage-01", name: "Heritage classic-01", category: "Classic", layout: "Single Column", status: "draft", downloads: 612, rating: 4.5, updated: "26/12/2025", color: "#111827" },
// //   { id: "legacy-02", name: "Legacy classic-02", category: "Classic", layout: "Single Column", status: "active", downloads: 3544, rating: 3.7, updated: "14/12/2025", color: "#374151" },
// //   { id: "prestige-03", name: "Prestige classic-03", category: "Classic", layout: "Two Column", status: "active", downloads: 551, rating: 4.8, updated: "22/12/2025", color: "#92400e" },
// //   { id: "tradition-04", name: "Tradition classic-04", category: "Classic", layout: "Single Column", status: "active", downloads: 2273, rating: 3.4, updated: "08/12/2025", color: "#0b1220" },
// //   { id: "regal-05", name: "Regal classic-05", category: "Classic", layout: "Sidebar Left", status: "active", downloads: 1168, rating: 3.4, updated: "13/12/2025", color: "#7f1d1d" },
// // ];

// // function formatNumber(n: number) {
// //   return n.toLocaleString();
// // }

// // function todayDDMMYYYY() {
// //   const d = new Date();
// //   const dd = String(d.getDate()).padStart(2, "0");
// //   const mm = String(d.getMonth() + 1).padStart(2, "0");
// //   const yyyy = d.getFullYear();
// //   return `${dd}/${mm}/${yyyy}`;
// // }

// // function safeIdFromName(name: string) {
// //   return (
// //     name
// //       .trim()
// //       .toLowerCase()
// //       .replace(/[^a-z0-9]+/g, "-")
// //       .replace(/^-+|-+$/g, "") +
// //     "-" +
// //     Math.random().toString(16).slice(2, 6)
// //   );
// // }

// // function statusBadge(status: TemplateStatus) {
// //   if (status === "active") {
// //     return { bg: "#dbeafe", fg: "#1e40af", border: "#bfdbfe", text: "Active" };
// //   }
// //   return { bg: "#fee2e2", fg: "#991b1b", border: "#fecaca", text: "Draft" };
// // }

// // const styles = {
// //   page: {
// //     fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
// //     backgroundColor: "#f9fafb",
// //     minHeight: "100vh",
// //   } as React.CSSProperties,

// //   container: {
// //     maxWidth: 1440,
// //     margin: "0 auto",
// //     padding: 24,
// //   } as React.CSSProperties,

// //   header: {
// //     position: "sticky" as const,
// //     top: 0,
// //     zIndex: 10,
// //     backgroundColor: "rgba(255,255,255,0.85)",
// //     backdropFilter: "blur(8px)",
// //     borderBottom: "1px solid #e5e7eb",
// //   } as React.CSSProperties,

// //   headerInner: {
// //     maxWidth: 1440,
// //     margin: "0 auto",
// //     padding: "16px 24px",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     gap: 16,
// //   } as React.CSSProperties,

// //   title: {
// //     margin: 0,
// //     fontSize: 22,
// //     fontWeight: 650,
// //     color: "#111827",
// //   } as React.CSSProperties,

// //   subtitle: {
// //     margin: "4px 0 0",
// //     fontSize: 13,
// //     color: "#6b7280",
// //   } as React.CSSProperties,

// //   addBtn: {
// //     backgroundColor: "#2563eb",
// //     color: "white",
// //     padding: "10px 14px",
// //     borderRadius: 10,
// //     border: "1px solid #1d4ed8",
// //     fontWeight: 650,
// //     cursor: "pointer",
// //     boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
// //     display: "inline-flex",
// //     alignItems: "center",
// //     gap: 8,
// //     userSelect: "none",
// //   } as React.CSSProperties,

// //   addBtnDisabled: {
// //     opacity: 0.7,
// //     cursor: "not-allowed",
// //   } as React.CSSProperties,

// //   statsGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
// //     gap: 16,
// //     marginTop: 18,
// //   } as React.CSSProperties,

// //   card: {
// //     backgroundColor: "white",
// //     borderRadius: 14,
// //     padding: 18,
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
// //     border: "1px solid #f1f5f9",
// //   } as React.CSSProperties,

// //   statTopRow: {
// //     display: "flex",
// //     alignItems: "flex-start",
// //     justifyContent: "space-between",
// //     gap: 12,
// //   } as React.CSSProperties,

// //   dot: {
// //     width: 10,
// //     height: 10,
// //     borderRadius: 999,
// //     marginTop: 3,
// //   } as React.CSSProperties,

// //   statLabel: {
// //     margin: 0,
// //     fontSize: 13,
// //     color: "#6b7280",
// //   } as React.CSSProperties,

// //   statValue: {
// //     margin: "10px 0 0",
// //     fontSize: 30,
// //     fontWeight: 750,
// //     color: "#111827",
// //     letterSpacing: "-0.02em",
// //   } as React.CSSProperties,

// //   filtersWrap: {
// //     marginTop: 16,
// //     backgroundColor: "white",
// //     borderRadius: 14,
// //     padding: 14,
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
// //     border: "1px solid #f1f5f9",
// //   } as React.CSSProperties,

// //   filtersRow: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     gap: 12,
// //     flexWrap: "wrap",
// //   } as React.CSSProperties,

// //   foundText: {
// //     margin: 0,
// //     fontSize: 13,
// //     color: "#6b7280",
// //   } as React.CSSProperties,

// //   controls: {
// //     display: "flex",
// //     gap: 10,
// //     flexWrap: "wrap",
// //   } as React.CSSProperties,

// //   input: {
// //     padding: "9px 12px",
// //     border: "1px solid #d1d5db",
// //     borderRadius: 10,
// //     minWidth: 240,
// //     fontSize: 14,
// //     outline: "none",
// //     boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)",
// //   } as React.CSSProperties,

// //   select: {
// //     padding: "9px 12px",
// //     border: "1px solid #d1d5db",
// //     borderRadius: 10,
// //     fontSize: 14,
// //     outline: "none",
// //     backgroundColor: "white",
// //   } as React.CSSProperties,

// //   tableCard: {
// //     marginTop: 14,
// //     backgroundColor: "white",
// //     borderRadius: 14,
// //     boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
// //     overflow: "hidden",
// //     border: "1px solid #f1f5f9",
// //   } as React.CSSProperties,

// //   tableWrap: {
// //     overflowX: "auto" as const,
// //   },

// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse" as const,
// //     minWidth: 950,
// //   } as React.CSSProperties,

// //   th: {
// //     backgroundColor: "#f3f4f6",
// //     textAlign: "left" as const,
// //     padding: "12px 14px",
// //     fontSize: 12,
// //     letterSpacing: "0.04em",
// //     textTransform: "uppercase" as const,
// //     color: "#4b5563",
// //     borderBottom: "1px solid #e5e7eb",
// //     whiteSpace: "nowrap" as const,
// //   } as React.CSSProperties,

// //   td: {
// //     padding: "14px",
// //     fontSize: 14,
// //     color: "#374151",
// //     borderTop: "1px solid #eef2f7",
// //     verticalAlign: "middle" as const,
// //   } as React.CSSProperties,

// //   templateCell: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 12,
// //     minWidth: 260,
// //   } as React.CSSProperties,

// //   colorBox: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 10,
// //     flexShrink: 0,
// //   } as React.CSSProperties,

// //   name: {
// //     fontWeight: 650,
// //     color: "#111827",
// //     margin: 0,
// //     lineHeight: 1.2,
// //   } as React.CSSProperties,

// //   small: {
// //     margin: "2px 0 0",
// //     fontSize: 12,
// //     color: "#6b7280",
// //   } as React.CSSProperties,

// //   badge: {
// //     display: "inline-flex",
// //     alignItems: "center",
// //     padding: "5px 10px",
// //     borderRadius: 999,
// //     fontSize: 12,
// //     fontWeight: 650,
// //     border: "1px solid transparent",
// //     whiteSpace: "nowrap" as const,
// //   } as React.CSSProperties,

// //   menuBtn: {
// //     background: "transparent",
// //     border: "1px solid transparent",
// //     color: "#6b7280",
// //     fontSize: 18,
// //     cursor: "pointer",
// //     borderRadius: 10,
// //     padding: "6px 8px",
// //   } as React.CSSProperties,

// //   footer: {
// //     borderTop: "1px solid #eef2f7",
// //     padding: "10px 14px",
// //     fontSize: 13,
// //     color: "#6b7280",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     gap: 10,
// //     flexWrap: "wrap" as const,
// //   } as React.CSSProperties,

// //   // Modal
// //   overlay: {
// //     position: "fixed" as const,
// //     inset: 0,
// //     backgroundColor: "rgba(17,24,39,0.45)",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     padding: 16,
// //     zIndex: 50,
// //   } as React.CSSProperties,

// //   modal: {
// //     width: "100%",
// //     maxWidth: 560,
// //     backgroundColor: "white",
// //     borderRadius: 16,
// //     boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
// //     border: "1px solid rgba(255,255,255,0.6)",
// //     overflow: "hidden",
// //   } as React.CSSProperties,

// //   modalHeader: {
// //     padding: "16px 18px",
// //     borderBottom: "1px solid #eef2f7",
// //     display: "flex",
// //     alignItems: "flex-start",
// //     justifyContent: "space-between",
// //     gap: 12,
// //   } as React.CSSProperties,

// //   modalTitle: {
// //     margin: 0,
// //     fontSize: 16,
// //     fontWeight: 750,
// //     color: "#111827",
// //   } as React.CSSProperties,

// //   modalBody: {
// //     padding: 18,
// //     display: "grid",
// //     gridTemplateColumns: "1fr 1fr",
// //     gap: 12,
// //   } as React.CSSProperties,

// //   field: {
// //     display: "flex",
// //     flexDirection: "column" as const,
// //     gap: 6,
// //   } as React.CSSProperties,

// //   label: {
// //     fontSize: 12,
// //     fontWeight: 650,
// //     color: "#374151",
// //   } as React.CSSProperties,

// //   full: {
// //     gridColumn: "1 / -1",
// //   } as React.CSSProperties,

// //   modalFooter: {
// //     padding: "14px 18px",
// //     borderTop: "1px solid #eef2f7",
// //     display: "flex",
// //     justifyContent: "flex-end",
// //     gap: 10,
// //   } as React.CSSProperties,

// //   btnGhost: {
// //     padding: "10px 12px",
// //     borderRadius: 12,
// //     border: "1px solid #e5e7eb",
// //     backgroundColor: "white",
// //     color: "#111827",
// //     fontWeight: 650,
// //     cursor: "pointer",
// //   } as React.CSSProperties,

// //   btnPrimary: {
// //     padding: "10px 12px",
// //     borderRadius: 12,
// //     border: "1px solid #1d4ed8",
// //     backgroundColor: "#2563eb",
// //     color: "white",
// //     fontWeight: 750,
// //     cursor: "pointer",
// //   } as React.CSSProperties,

// //   error: {
// //     gridColumn: "1 / -1",
// //     backgroundColor: "#fef2f2",
// //     color: "#991b1b",
// //     border: "1px solid #fecaca",
// //     padding: "10px 12px",
// //     borderRadius: 12,
// //     fontSize: 13,
// //   } as React.CSSProperties,
// // };

// // function StatCard({
// //   label,
// //   value,
// //   dotColor,
// // }: {
// //   label: string;
// //   value: string | number;
// //   dotColor: string;
// // }) {
// //   return (
// //     <div style={styles.card}>
// //       <div style={styles.statTopRow}>
// //         <p style={styles.statLabel}>{label}</p>
// //         <span style={{ ...styles.dot, backgroundColor: dotColor }} />
// //       </div>
// //       <p style={styles.statValue}>{value}</p>
// //     </div>
// //   );
// // }

// // export default function App() {
// //   const [templates, setTemplates] = useState<Template[]>(dummyTemplates);

// //   // filters
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [categoryFilter, setCategoryFilter] = useState<"All" | Category>("All");
// //   const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Draft">("All");

// //   // Add Template modal
// //   const [isAddOpen, setIsAddOpen] = useState(false);
// //   const [form, setForm] = useState({
// //     name: "",
// //     category: "Modern" as Category,
// //     layout: "Two Column" as Layout,
// //     status: "active" as TemplateStatus,
// //     color: "#2563eb",
// //   });
// //   const [formError, setFormError] = useState<string>("");

// //   const filtered = useMemo(() => {
// //     const s = searchTerm.trim().toLowerCase();
// //     return templates.filter((t) => {
// //       const matchesSearch = s === "" || t.name.toLowerCase().includes(s);
// //       const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
// //       const matchesStatus =
// //         statusFilter === "All" ||
// //         (statusFilter === "Active" && t.status === "active") ||
// //         (statusFilter === "Draft" && t.status === "draft");
// //       return matchesSearch && matchesCategory && matchesStatus;
// //     });
// //   }, [templates, searchTerm, categoryFilter, statusFilter]);

// //   // Stats
// //   const totalTemplates = templates.length;
// //   const activeCount = templates.filter((t) => t.status === "active").length;
// //   const draftCount = templates.filter((t) => t.status === "draft").length;
// //   const totalDownloads = templates.reduce((sum, t) => sum + t.downloads, 0);

// //   const openAdd = () => {
// //     setFormError("");
// //     setForm({
// //       name: "",
// //       category: "Modern",
// //       layout: "Two Column",
// //       status: "active",
// //       color: "#2563eb",
// //     });
// //     setIsAddOpen(true);
// //   };

// //   const closeAdd = () => setIsAddOpen(false);

// //   const submitAdd = (e?: React.FormEvent) => {
// //     e?.preventDefault();
// //     setFormError("");

// //     const name = form.name.trim();
// //     if (!name) {
// //       setFormError("Template name required.");
// //       return;
// //     }
// //     if (name.length < 3) {
// //       setFormError("Template name minimum 3 characters.");
// //       return;
// //     }

// //     // duplicate check
// //     const exists = templates.some((t) => t.name.toLowerCase() === name.toLowerCase());
// //     if (exists) {
// //       setFormError("Same name already exists. Please use different name.");
// //       return;
// //     }

// //     const newTemplate: Template = {
// //       id: safeIdFromName(name),
// //       name,
// //       category: form.category,
// //       layout: form.layout,
// //       status: form.status,
// //       downloads: 0,
// //       rating: 0,
// //       updated: todayDDMMYYYY(),
// //       color: form.color || "#2563eb",
// //     };

// //     setTemplates((prev) => [newTemplate, ...prev]);
// //     setIsAddOpen(false);
// //   };

// //   return (
// //     <div style={styles.page}>
// //       {/* Header */}
// //       <header style={styles.header}>
// //         <div style={styles.headerInner}>
// //           <div>
// //             <h1 style={styles.title}>Templates</h1>
// //             <p style={styles.subtitle}>Admin panel for managing resume templates</p>
// //           </div>

// //           <button
// //             type="button"
// //             style={styles.addBtn}
// //             onClick={openAdd}
// //             onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
// //             onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
// //             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
// //           >
// //             <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
// //             Add Template
// //           </button>
// //         </div>
// //       </header>

// //       <div style={styles.container}>
// //         {/* Stats */}
// //         <div style={styles.statsGrid}>
// //           <StatCard label="Total Templates" value={totalTemplates} dotColor="#111827" />
// //           <StatCard label="Active" value={activeCount} dotColor="#10b981" />
// //           <StatCard label="Drafts" value={draftCount} dotColor="#f59e0b" />
// //           <StatCard label="Total Downloads" value={formatNumber(totalDownloads)} dotColor="#2563eb" />
// //         </div>

// //         {/* Filters */}
// //         <div style={styles.filtersWrap}>
// //           <div style={styles.filtersRow}>
// //             <p style={styles.foundText}>
// //               <b style={{ color: "#111827" }}>{filtered.length}</b> templates found
// //             </p>

// //             <div style={styles.controls}>
// //               <input
// //                 type="text"
// //                 placeholder="Search templates..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 style={styles.input}
// //               />

// //               <select
// //                 value={categoryFilter}
// //                 onChange={(e) => setCategoryFilter(e.target.value as any)}
// //                 style={styles.select}
// //               >
// //                 <option value="All">All Categories</option>
// //                 <option value="Modern">Modern</option>
// //                 <option value="Classic">Classic</option>
// //               </select>

// //               <select
// //                 value={statusFilter}
// //                 onChange={(e) => setStatusFilter(e.target.value as any)}
// //                 style={styles.select}
// //               >
// //                 <option value="All">All Status</option>
// //                 <option value="Active">Active</option>
// //                 <option value="Draft">Draft</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div style={styles.tableCard}>
// //           <div style={styles.tableWrap}>
// //             <table style={styles.table}>
// //               <thead>
// //                 <tr>
// //                   <th style={styles.th}>Template</th>
// //                   <th style={styles.th}>Category</th>
// //                   <th style={styles.th}>Layout</th>
// //                   <th style={styles.th}>Status</th>
// //                   <th style={styles.th}>Downloads</th>
// //                   <th style={styles.th}>Rating</th>
// //                   <th style={styles.th}>Updated</th>
// //                   <th style={{ ...styles.th, width: 60 }} />
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {filtered.map((t) => {
// //                   const badge = statusBadge(t.status);
// //                   return (
// //                     <tr key={t.id} style={{ backgroundColor: "white" }}>
// //                       <td style={styles.td}>
// //                         <div style={styles.templateCell}>
// //                           <div style={{ ...styles.colorBox, backgroundColor: t.color }} />
// //                           <div>
// //                             <p style={styles.name}>{t.name}</p>
// //                             <p style={styles.small}>Resume Template</p>
// //                           </div>
// //                         </div>
// //                       </td>

// //                       <td style={styles.td}>{t.category}</td>
// //                       <td style={styles.td}>{t.layout}</td>

// //                       <td style={styles.td}>
// //                         <span
// //                           style={{
// //                             ...styles.badge,
// //                             backgroundColor: badge.bg,
// //                             color: badge.fg,
// //                             borderColor: badge.border,
// //                           }}
// //                         >
// //                           {badge.text}
// //                         </span>
// //                       </td>

// //                       <td style={styles.td}>{formatNumber(t.downloads)}</td>

// //                       <td style={styles.td}>
// //                         <span style={{ color: "#f59e0b", marginRight: 6 }}>★</span>
// //                         {t.rating.toFixed(1)}
// //                       </td>

// //                       <td style={styles.td}>{t.updated}</td>

// //                       <td style={{ ...styles.td, textAlign: "right" }}>
// //                         <button
// //                           style={styles.menuBtn}
// //                           onClick={() => alert(`Actions for: ${t.name}`)}
// //                           onMouseEnter={(e) => {
// //                             e.currentTarget.style.backgroundColor = "#f3f4f6";
// //                             e.currentTarget.style.borderColor = "#e5e7eb";
// //                           }}
// //                           onMouseLeave={(e) => {
// //                             e.currentTarget.style.backgroundColor = "transparent";
// //                             e.currentTarget.style.borderColor = "transparent";
// //                           }}
// //                           aria-label={`More actions for ${t.name}`}
// //                           title="More"
// //                         >
// //                           ⋯
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}

// //                 {filtered.length === 0 && (
// //                   <tr>
// //                     <td style={{ ...styles.td, padding: 22 }} colSpan={8}>
// //                       <div style={{ textAlign: "center" }}>
// //                         <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>No templates found</p>
// //                         <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
// //                           Search ya filters change karke try karo.
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div style={styles.footer}>
// //             <span>
// //               Showing <b style={{ color: "#111827" }}>{filtered.length}</b> of{" "}
// //               <b style={{ color: "#111827" }}>{templates.length}</b>
// //             </span>
// //             <span>Admin • Templates</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Add Template Modal */}
// //       {isAddOpen && (
// //         <div
// //           style={styles.overlay}
// //           onClick={(e) => {
// //             // overlay click closes modal
// //             if (e.target === e.currentTarget) closeAdd();
// //           }}
// //         >
// //           <div style={styles.modal} role="dialog" aria-modal="true" aria-label="Add Template">
// //             <div style={styles.modalHeader}>
// //               <div>
// //                 <p style={styles.modalTitle}>Add New Template</p>
// //                 <p style={{ ...styles.subtitle, marginTop: 6 }}>
// //                   Name + settings fill karo, then create.
// //                 </p>
// //               </div>

// //               <button
// //                 type="button"
// //                 style={styles.btnGhost}
// //                 onClick={closeAdd}
// //                 aria-label="Close"
// //                 title="Close"
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             <form onSubmit={submitAdd}>
// //               <div style={styles.modalBody}>
// //                 {formError && <div style={styles.error}>{formError}</div>}

// //                 <div style={{ ...styles.field, ...styles.full }}>
// //                   <label style={styles.label}>Template Name</label>
// //                   <input
// //                     style={{ ...styles.input, minWidth: "unset", width: "100%" }}
// //                     value={form.name}
// //                     onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
// //                     placeholder="e.g. Atlas modern-11"
// //                     autoFocus
// //                   />
// //                 </div>

// //                 <div style={styles.field}>
// //                   <label style={styles.label}>Category</label>
// //                   <select
// //                     style={styles.select}
// //                     value={form.category}
// //                     onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
// //                   >
// //                     <option value="Modern">Modern</option>
// //                     <option value="Classic">Classic</option>
// //                   </select>
// //                 </div>

// //                 <div style={styles.field}>
// //                   <label style={styles.label}>Status</label>
// //                   <select
// //                     style={styles.select}
// //                     value={form.status}
// //                     onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as TemplateStatus }))}
// //                   >
// //                     <option value="active">Active</option>
// //                     <option value="draft">Draft</option>
// //                   </select>
// //                 </div>

// //                 <div style={styles.field}>
// //                   <label style={styles.label}>Layout</label>
// //                   <select
// //                     style={styles.select}
// //                     value={form.layout}
// //                     onChange={(e) => setForm((p) => ({ ...p, layout: e.target.value as Layout }))}
// //                   >
// //                     <option value="Two Column">Two Column</option>
// //                     <option value="Single Column">Single Column</option>
// //                     <option value="Sidebar Left">Sidebar Left</option>
// //                     <option value="Sidebar Right">Sidebar Right</option>
// //                   </select>
// //                 </div>

// //                 <div style={styles.field}>
// //                   <label style={styles.label}>Color</label>
// //                   <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
// //                     <input
// //                       type="color"
// //                       value={form.color}
// //                       onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
// //                       style={{
// //                         width: 44,
// //                         height: 40,
// //                         border: "1px solid #d1d5db",
// //                         borderRadius: 10,
// //                         padding: 3,
// //                         backgroundColor: "white",
// //                         cursor: "pointer",
// //                       }}
// //                     />
// //                     <input
// //                       value={form.color}
// //                       onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
// //                       placeholder="#2563eb"
// //                       style={{ ...styles.input, minWidth: "unset", width: "100%" }}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div style={styles.modalFooter}>
// //                 <button type="button" style={styles.btnGhost} onClick={closeAdd}>
// //                   Cancel
// //                 </button>
// //                 <button type="submit" style={styles.btnPrimary}>
// //                   Create Template
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "../../api/axiosInstance";

// type TemplateStatus = "active" | "draft";
// type Category = "Modern" | "Classic";
// type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

// type TemplateRow = {
//   id: number;
//   name: string;
//   category: Category;
//   layout: Layout;
//   status: TemplateStatus;
//   downloads: number;
//   rating: number;
//   updated: string; // dd/mm/yyyy
//   color: string;
// };

// function getAccessToken() {
//   return localStorage.getItem("access") || "";
// }

// function authHeaders() {
//   const token = getAccessToken();
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// function formatNumber(n: number) {
//   return Number(n || 0).toLocaleString();
// }

// function statusBadge(status: TemplateStatus) {
//   if (status === "active") {
//     return { bg: "#dbeafe", fg: "#1e40af", border: "#bfdbfe", text: "Active" };
//   }
//   return { bg: "#fee2e2", fg: "#991b1b", border: "#fecaca", text: "Draft" };
// }

// const styles: Record<string, React.CSSProperties> = {
//   page: { fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" },
//   header: { position: "sticky", top: 0, zIndex: 10, backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e5e7eb" },
//   headerInner: { maxWidth: 1440, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 },
//   title: { margin: 0, fontSize: 22, fontWeight: 750, color: "#111827" },
//   subtitle: { margin: "4px 0 0", fontSize: 13, color: "#6b7280" },
//   container: { maxWidth: 1440, margin: "0 auto", padding: 24 },

//   btnPrimary: { backgroundColor: "#2563eb", color: "white", padding: "10px 14px", borderRadius: 12, border: "1px solid #1d4ed8", fontWeight: 750, cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.08)", display: "inline-flex", alignItems: "center", gap: 8, userSelect: "none" },
//   btnGhost: { padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb", backgroundColor: "white", color: "#111827", fontWeight: 700, cursor: "pointer" },

//   statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 12 },
//   card: { backgroundColor: "white", borderRadius: 14, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" },
//   statLabel: { margin: 0, fontSize: 13, color: "#6b7280" },
//   statValue: { margin: "10px 0 0", fontSize: 30, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" },

//   filtersWrap: { marginTop: 16, backgroundColor: "white", borderRadius: 14, padding: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" },
//   filtersRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" },
//   foundText: { margin: 0, fontSize: 13, color: "#6b7280" },
//   controls: { display: "flex", gap: 10, flexWrap: "wrap" },
//   input: { padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 12, minWidth: 240, fontSize: 14, outline: "none", boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)", backgroundColor: "white" },
//   select: { padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 12, fontSize: 14, outline: "none", backgroundColor: "white" },

//   tableCard: { marginTop: 14, backgroundColor: "white", borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", border: "1px solid #f1f5f9" },
//   tableWrap: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", minWidth: 950 },
//   th: { backgroundColor: "#f3f4f6", textAlign: "left", padding: "12px 14px", fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "#4b5563", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" },
//   td: { padding: "14px", fontSize: 14, color: "#374151", borderTop: "1px solid #eef2f7", verticalAlign: "middle" },

//   templateCell: { display: "flex", alignItems: "center", gap: 12, minWidth: 260 },
//   colorBox: { width: 40, height: 40, borderRadius: 10, flexShrink: 0 },
//   name: { fontWeight: 650, color: "#111827", margin: 0, lineHeight: 1.2 },
//   small: { margin: "2px 0 0", fontSize: 12, color: "#6b7280" },
//   badge: { display: "inline-flex", alignItems: "center", padding: "5px 10px", borderRadius: 999, fontSize: 12, fontWeight: 650, border: "1px solid transparent", whiteSpace: "nowrap" },

//   footer: { borderTop: "1px solid #eef2f7", padding: "10px 14px", fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" },

//   overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(17,24,39,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50 },
//   modal: { width: "100%", maxWidth: 560, backgroundColor: "white", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.6)", overflow: "hidden" },
//   modalHeader: { padding: "16px 18px", borderBottom: "1px solid #eef2f7", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
//   modalTitle: { margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" },
//   modalBody: { padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
//   field: { display: "flex", flexDirection: "column", gap: 6 },
//   label: { fontSize: 12, fontWeight: 750, color: "#374151" },
//   full: { gridColumn: "1 / -1" },
//   error: { gridColumn: "1 / -1", backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "10px 12px", borderRadius: 12, fontSize: 13 },
//   modalFooter: { padding: "14px 18px", borderTop: "1px solid #eef2f7", display: "flex", justifyContent: "flex-end", gap: 10 },

//   dangerBtn: { padding: "8px 10px", borderRadius: 10, border: "1px solid #fecaca", backgroundColor: "#fff", color: "#991b1b", fontWeight: 750, cursor: "pointer" },
//   smallBtn: { padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", backgroundColor: "white", color: "#111827", fontWeight: 700, cursor: "pointer" },
// };

// function StatCard({ label, value }: { label: string; value: string | number }) {
//   return (
//     <div style={styles.card}>
//       <p style={styles.statLabel}>{label}</p>
//       <p style={styles.statValue}>{value}</p>
//     </div>
//   );
// }

// export default function AdminTemplates() {
//   const [templates, setTemplates] = useState<TemplateRow[]>([]);
//   const [loading, setLoading] = useState(false);

//   // filters
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState<"All" | Category>("All");
//   const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Draft">("All");

//   // modal
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState<"add" | "edit">("add");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [err, setErr] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     category: "Modern" as Category,
//     layout: "Two Column" as Layout,
//     status: "active" as TemplateStatus,
//     color: "#2563eb",
//   });

//   const fetchTemplates = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/auth/admin/templates/", { headers: authHeaders() });
//       setTemplates(res.data || []);
//     } catch (e) {
//       console.error("Templates fetch failed", e);
//       setTemplates([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const filtered = useMemo(() => {
//     const s = searchTerm.trim().toLowerCase();
//     return templates.filter((t) => {
//       const matchesSearch = s === "" || t.name.toLowerCase().includes(s);
//       const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
//       const matchesStatus =
//         statusFilter === "All" ||
//         (statusFilter === "Active" && t.status === "active") ||
//         (statusFilter === "Draft" && t.status === "draft");
//       return matchesSearch && matchesCategory && matchesStatus;
//     });
//   }, [templates, searchTerm, categoryFilter, statusFilter]);

//   // Stats
//   const totalTemplates = templates.length;
//   const activeCount = templates.filter((t) => t.status === "active").length;
//   const draftCount = templates.filter((t) => t.status === "draft").length;
//   const totalDownloads = templates.reduce((sum, t) => sum + (t.downloads || 0), 0);

//   const openAdd = () => {
//     setMode("add");
//     setEditingId(null);
//     setErr("");
//     setForm({ name: "", category: "Modern", layout: "Two Column", status: "active", color: "#2563eb" });
//     setOpen(true);
//   };

//   const openEdit = (t: TemplateRow) => {
//     setMode("edit");
//     setEditingId(t.id);
//     setErr("");
//     setForm({ name: t.name, category: t.category, layout: t.layout, status: t.status, color: t.color || "#2563eb" });
//     setOpen(true);
//   };

//   const close = () => setOpen(false);

//   const submit = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     setErr("");

//     const name = form.name.trim();
//     if (!name) return setErr("Template name required.");
//     if (name.length < 3) return setErr("Template name minimum 3 characters.");

//     try {
//       if (mode === "add") {
//         const payload = { name, category: form.category, layout: form.layout, status: form.status, color: form.color };
//         const res = await axios.post("/auth/admin/templates/", payload, { headers: authHeaders() });
//         setTemplates((prev) => [res.data, ...prev]);
//         setOpen(false);
//         return;
//       }

//       if (!editingId) return setErr("Edit error: missing id.");
//       const payload = { name, category: form.category, layout: form.layout, status: form.status, color: form.color };
//       const res = await axios.put(`/auth/admin/templates/${editingId}/`, payload, { headers: authHeaders() });

//       setTemplates((prev) => prev.map((x) => (x.id === editingId ? res.data : x)));
//       setOpen(false);
//     } catch (e: any) {
//       console.error("Template save failed", e);
//       const msg =
//         e?.response?.data?.name?.[0] ||
//         e?.response?.data?.detail ||
//         "Save failed (check unique name / auth token).";
//       setErr(String(msg));
//     }
//   };

//   const remove = async (id: number) => {
//     const ok = window.confirm("Delete this template?");
//     if (!ok) return;
//     try {
//       await axios.delete(`/auth/admin/templates/${id}/`, { headers: authHeaders() });
//       setTemplates((prev) => prev.filter((x) => x.id !== id));
//     } catch (e) {
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <header style={styles.header}>
//         <div style={styles.headerInner}>
//           <div>
//             <h1 style={styles.title}>Templates</h1>
//             <p style={styles.subtitle}>Admin panel for managing resume templates</p>
//           </div>

//           <button type="button" style={styles.btnPrimary} onClick={openAdd}>
//             <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
//             Add Template
//           </button>
//         </div>
//       </header>

//       <div style={styles.container}>
//         <div style={styles.statsGrid}>
//           <StatCard label="Total Templates" value={totalTemplates} />
//           <StatCard label="Active" value={activeCount} />
//           <StatCard label="Drafts" value={draftCount} />
//           <StatCard label="Total Downloads" value={formatNumber(totalDownloads)} />
//         </div>

//         <div style={styles.filtersWrap}>
//           <div style={styles.filtersRow}>
//             <p style={styles.foundText}>
//               <b style={{ color: "#111827" }}>{filtered.length}</b> templates found {loading ? "• loading..." : ""}
//             </p>

//             <div style={styles.controls}>
//               <input
//                 type="text"
//                 placeholder="Search templates..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={styles.input}
//               />

//               <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as any)} style={styles.select}>
//                 <option value="All">All Categories</option>
//                 <option value="Modern">Modern</option>
//                 <option value="Classic">Classic</option>
//               </select>

//               <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={styles.select}>
//                 <option value="All">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Draft">Draft</option>
//               </select>

//               <button type="button" style={styles.btnGhost} onClick={fetchTemplates}>
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>

//         <div style={styles.tableCard}>
//           <div style={styles.tableWrap}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Template</th>
//                   <th style={styles.th}>Category</th>
//                   <th style={styles.th}>Layout</th>
//                   <th style={styles.th}>Status</th>
//                   <th style={styles.th}>Downloads</th>
//                   <th style={styles.th}>Rating</th>
//                   <th style={styles.th}>Updated</th>
//                   <th style={{ ...styles.th, width: 220 }} />
//                 </tr>
//               </thead>

//               <tbody>
//                 {filtered.map((t) => {
//                   const badge = statusBadge(t.status);
//                   return (
//                     <tr key={t.id} style={{ backgroundColor: "white" }}>
//                       <td style={styles.td}>
//                         <div style={styles.templateCell}>
//                           <div style={{ ...styles.colorBox, backgroundColor: t.color || "#2563eb" }} />
//                           <div>
//                             <p style={styles.name}>{t.name}</p>
//                             <p style={styles.small}>Resume Template</p>
//                           </div>
//                         </div>
//                       </td>

//                       <td style={styles.td}>{t.category}</td>
//                       <td style={styles.td}>{t.layout}</td>

//                       <td style={styles.td}>
//                         <span style={{ ...styles.badge, backgroundColor: badge.bg, color: badge.fg, borderColor: badge.border }}>
//                           {badge.text}
//                         </span>
//                       </td>

//                       <td style={styles.td}>{formatNumber(t.downloads)}</td>

//                       <td style={styles.td}>
//                         <span style={{ color: "#f59e0b", marginRight: 6 }}>★</span>
//                         {(t.rating || 0).toFixed(1)}
//                       </td>

//                       <td style={styles.td}>{t.updated}</td>

//                       <td style={{ ...styles.td, textAlign: "right", whiteSpace: "nowrap" }}>
//                         <button style={{ ...styles.smallBtn, marginRight: 8 }} onClick={() => openEdit(t)}>
//                           Edit
//                         </button>
//                         <button style={styles.dangerBtn} onClick={() => remove(t.id)}>
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}

//                 {filtered.length === 0 && (
//                   <tr>
//                     <td style={{ ...styles.td, padding: 22 }} colSpan={8}>
//                       <div style={{ textAlign: "center" }}>
//                         <p style={{ margin: 0, fontWeight: 800, color: "#111827" }}>No templates found</p>
//                         <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Search/filters change karke try karo.</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div style={styles.footer}>
//             <span>
//               Showing <b style={{ color: "#111827" }}>{filtered.length}</b> of{" "}
//               <b style={{ color: "#111827" }}>{templates.length}</b>
//             </span>
//             <span>Admin • Templates</span>
//           </div>
//         </div>
//       </div>

//       {open && (
//         <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && close()}>
//           <div style={styles.modal} role="dialog" aria-modal="true" aria-label="Template modal">
//             <div style={styles.modalHeader}>
//               <div>
//                 <p style={styles.modalTitle}>{mode === "add" ? "Add New Template" : "Edit Template"}</p>
//                 <p style={{ ...styles.subtitle, marginTop: 6 }}>Name + settings fill karo.</p>
//               </div>

//               <button type="button" style={styles.btnGhost} onClick={close} aria-label="Close">
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={submit}>
//               <div style={styles.modalBody}>
//                 {err && <div style={styles.error}>{err}</div>}

//                 <div style={{ ...styles.field, ...styles.full }}>
//                   <label style={styles.label}>Template Name</label>
//                   <input
//                     style={{ ...styles.input, minWidth: "unset", width: "100%" }}
//                     value={form.name}
//                     onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
//                     placeholder="e.g. Atlas modern-11"
//                     autoFocus
//                   />
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Category</label>
//                   <select style={styles.select} value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}>
//                     <option value="Modern">Modern</option>
//                     <option value="Classic">Classic</option>
//                   </select>
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Status</label>
//                   <select style={styles.select} value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as TemplateStatus }))}>
//                     <option value="active">Active</option>
//                     <option value="draft">Draft</option>
//                   </select>
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Layout</label>
//                   <select style={styles.select} value={form.layout} onChange={(e) => setForm((p) => ({ ...p, layout: e.target.value as Layout }))}>
//                     <option value="Two Column">Two Column</option>
//                     <option value="Single Column">Single Column</option>
//                     <option value="Sidebar Left">Sidebar Left</option>
//                     <option value="Sidebar Right">Sidebar Right</option>
//                   </select>
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Color</label>
//                   <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//                     <input
//                       type="color"
//                       value={form.color}
//                       onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
//                       style={{ width: 44, height: 40, border: "1px solid #d1d5db", borderRadius: 10, padding: 3, backgroundColor: "white", cursor: "pointer" }}
//                     />
//                     <input
//                       value={form.color}
//                       onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))}
//                       placeholder="#2563eb"
//                       style={{ ...styles.input, minWidth: "unset", width: "100%" }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div style={styles.modalFooter}>
//                 <button type="button" style={styles.btnGhost} onClick={close}>
//                   Cancel
//                 </button>
//                 <button type="submit" style={styles.btnPrimary}>
//                   {mode === "add" ? "Create Template" : "Save Changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import ResumePreview from "./ResumePreview";

type TemplateStatus = "active" | "draft";
type Category = "Modern" | "Classic";
type Layout = "Two Column" | "Single Column" | "Sidebar Left" | "Sidebar Right";

type TemplateRow = {
  id: number;
  name: string;
  category: Category;
  layout: Layout;
  status: TemplateStatus;
  downloads: number;
  rating: number;
  color: string;

  source?: "custom" | "imported" | "duplicated";
  description?: string;
  schema?: any;
  preview_image?: string; // backend FileField url
  updated?: string;
};

type MarketplaceTpl = {
  key: string;
  name: string;
  category: Category;
  layout: Layout;
  color: string;
  price_type: "free" | "paid";
  price: number;
  preview_image_url: string;
  schema: any;
};

function authHeaders() {
  const token = localStorage.getItem("access") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function pill(text: string, bg: string, fg: string, border: string) {
  return (
    <span style={{ fontSize: 12, fontWeight: 900, padding: "4px 8px", borderRadius: 999, background: bg, color: fg, border: `1px solid ${border}` }}>
      {text}
    </span>
  );
}

export default function AdminTemplates() {
  const nav = useNavigate();

  const [templates, setTemplates] = useState<TemplateRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const [addTab, setAddTab] = useState<"market" | "scratch" | "duplicate">("market");
  const [market, setMarket] = useState<MarketplaceTpl[]>([]);
  const [marketLoading, setMarketLoading] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSchema, setPreviewSchema] = useState<any>(null);

  // scratch form
  const [scratch, setScratch] = useState({
    name: "",
    category: "Modern" as Category,
    layout: "Single Column" as Layout,
    color: "#2563eb",
  });

  // duplicate form
  const [dupFromId, setDupFromId] = useState<number | "">("");
  const [dupName, setDupName] = useState("");

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/auth/admin/templates/", { headers: authHeaders() });
      setTemplates(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketplace = async () => {
    setMarketLoading(true);
    try {
      const res = await axios.get("/auth/admin/template-marketplace/", { headers: authHeaders() });
      setMarket(res.data?.results || []);
    } finally {
      setMarketLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return templates;
    return templates.filter((t) => t.name.toLowerCase().includes(q));
  }, [templates, search]);

  const doDelete = async (id: number) => {
    if (!window.confirm("Delete this template?")) return;
    await axios.delete(`/auth/admin/templates/${id}/`, { headers: authHeaders() });
    fetchTemplates();
  };

  const toggleStatus = async (t: TemplateRow) => {
    const next = t.status === "active" ? "draft" : "active";
    await axios.put(
      `/auth/admin/templates/${t.id}/`,
      { ...t, status: next, schema: t.schema || {} },
      { headers: authHeaders() }
    );
    fetchTemplates();
  };

  const importFromMarketplace = async (tpl: MarketplaceTpl) => {
    const res = await axios.post(
      "/auth/admin/templates/import/",
      { marketplace_key: tpl.key },
      { headers: authHeaders() }
    );
    setOpenAdd(false);
    fetchTemplates();
    nav(`/admin/templates/builder/${res.data.id}`);
  };

  const createScratch = async () => {
    if (!scratch.name.trim()) return alert("Name required");
    const schema = {
      version: 1,
      layout: scratch.layout,
      theme: {
        primary: scratch.color,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        headingUppercase: true,
        titleSize: 12,
        bodySize: 10,
        lineHeight: 1.35,
      },
      order: ["header", "summary", "experience", "education", "skills", "projects"],
      columns: { left: ["summary", "skills", "education"], right: ["header", "experience", "projects"] },
      sections: {
        header: { enabled: true },
        summary: { enabled: true },
        experience: { enabled: true },
        education: { enabled: true },
        skills: { enabled: true },
        projects: { enabled: true },
        certifications: { enabled: false },
        languages: { enabled: false },
      },
    };

    const res = await axios.post(
      "/auth/admin/templates/",
      {
        name: scratch.name,
        category: scratch.category,
        layout: scratch.layout,
        status: "draft",
        color: scratch.color,
        source: "custom",
        schema,
      },
      { headers: authHeaders() }
    );

    setOpenAdd(false);
    fetchTemplates();
    nav(`/admin/templates/builder/${res.data.id}`);
  };

  const duplicate = async () => {
    if (!dupFromId) return alert("Select a template");
    const res = await axios.post(
      `/auth/admin/templates/${dupFromId}/duplicate/`,
      { name: dupName.trim() || undefined },
      { headers: authHeaders() }
    );
    setOpenAdd(false);
    fetchTemplates();
    nav(`/admin/templates/builder/${res.data.id}`);
  };

  const openAddModal = () => {
    setOpenAdd(true);
    setAddTab("market");
    fetchMarketplace();
  };

  const cardImg = (t: any) => {
    const src = t.preview_image || t.preview_image_url;
    if (src) return <img src={src} alt="" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12, border: "1px solid #e5e7eb" }} />;
    return (
      <div style={{ width: "100%", height: 180, borderRadius: 12, border: "1px solid #e5e7eb", background: "#f3f4f6", display: "grid", placeItems: "center", color: "#6b7280", fontWeight: 900 }}>
        No Preview
      </div>
    );
  };

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>Resume Templates</div>
          <div style={{ color: "#6b7280", fontSize: 12 }}>Import • Scratch • Duplicate • View/Edit/Delete</div>
        </div>
        <button onClick={openAddModal} style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>
          + Add Template
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." style={{ flex: 1, padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }} />
        <button onClick={() => nav("/admin/templates/pricing")} style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}>
          Pricing
        </button>
      </div>

      {loading ? (
        <div style={{ padding: 20 }}>Loading...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(240px, 1fr))", gap: 12 }}>
          {filtered.map((t) => (
            <div key={t.id} style={{ background: "white", border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
              {cardImg(t)}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <div style={{ fontWeight: 900 }}>{t.name}</div>
                {t.status === "active"
                  ? pill("ACTIVE", "#dcfce7", "#166534", "#bbf7d0")
                  : pill("DRAFT", "#f3f4f6", "#374151", "#e5e7eb")}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {pill(t.category, "#e0f2fe", "#075985", "#bae6fd")}
                {pill(t.layout, "#ede9fe", "#5b21b6", "#ddd6fe")}
                {t.source ? pill(t.source.toUpperCase(), "#fef3c7", "#92400e", "#fde68a") : null}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                <button
                  onClick={() => {
                    setPreviewSchema(t.schema || {});
                    setPreviewOpen(true);
                  }}
                  style={{ padding: "10px 10px", borderRadius: 12, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}
                >
                  View
                </button>
                <button
                  onClick={() => nav(`/admin/templates/builder/${t.id}`)}
                  style={{ padding: "10px 10px", borderRadius: 12, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleStatus(t)}
                  style={{ padding: "10px 10px", borderRadius: 12, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}
                >
                  {t.status === "active" ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => doDelete(t.id)}
                  style={{ padding: "10px 10px", borderRadius: 12, border: "1px solid #fecaca", background: "white", color: "#991b1b", fontWeight: 900 }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Preview Modal */}
      {previewOpen && (
        <div onClick={() => setPreviewOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "grid", placeItems: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 14, width: 560 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 900 }}>Preview</div>
              <button onClick={() => setPreviewOpen(false)} style={{ border: "1px solid #e5e7eb", background: "white", borderRadius: 10, padding: "8px 10px", fontWeight: 900 }}>Close</button>
            </div>
            <div style={{ display: "grid", placeItems: "center" }}>
              <ResumePreview schema={previewSchema || {}} />
            </div>
          </div>
        </div>
      )}

      {/* ✅ Add Template Modal */}
      {openAdd && (
        <div onClick={() => setOpenAdd(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "grid", placeItems: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 14, width: 980, maxHeight: "86vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Add Template</div>
              <button onClick={() => setOpenAdd(false)} style={{ border: "1px solid #e5e7eb", background: "white", borderRadius: 10, padding: "8px 10px", fontWeight: 900 }}>Close</button>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button onClick={() => setAddTab("market")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: addTab === "market" ? "#f3f4f6" : "white", fontWeight: 900 }}>
                Marketplace
              </button>
              <button onClick={() => setAddTab("scratch")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: addTab === "scratch" ? "#f3f4f6" : "white", fontWeight: 900 }}>
                Create from Scratch
              </button>
              <button onClick={() => setAddTab("duplicate")} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e5e7eb", background: addTab === "duplicate" ? "#f3f4f6" : "white", fontWeight: 900 }}>
                Duplicate Existing
              </button>
            </div>

            {addTab === "market" && (
              <>
                <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 10 }}>
                  ✅ Choose template → Import → Saved permanently in DB + storage (no external dependency).
                </div>

                {marketLoading ? (
                  <div style={{ padding: 20 }}>Loading marketplace...</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(260px, 1fr))", gap: 12 }}>
                    {market.map((m) => (
                      <div key={m.key} style={{ border: "1px solid #eef2f7", borderRadius: 14, padding: 12 }}>
                        {cardImg(m)}
                        <div style={{ fontWeight: 900, marginTop: 8 }}>{m.name}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                          {pill(m.category, "#e0f2fe", "#075985", "#bae6fd")}
                          {pill(m.layout, "#ede9fe", "#5b21b6", "#ddd6fe")}
                          {m.price_type === "free" ? pill("FREE", "#dcfce7", "#166534", "#bbf7d0") : pill(`₹${m.price}`, "#fef3c7", "#92400e", "#fde68a")}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                          <button
                            onClick={() => {
                              setPreviewSchema(m.schema);
                              setPreviewOpen(true);
                            }}
                            style={{ padding: "10px 10px", borderRadius: 12, border: "1px solid #e5e7eb", background: "white", fontWeight: 900 }}
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => importFromMarketplace(m)}
                            style={{ padding: "10px 10px", borderRadius: 12, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}
                          >
                            Use / Import
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {addTab === "scratch" && (
              <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
                <div style={{ color: "#6b7280", fontSize: 12 }}>
                  ✅ Blank canvas create → draft → open builder
                </div>
                <input value={scratch.name} onChange={(e) => setScratch((p) => ({ ...p, name: e.target.value }))} placeholder="Template name" style={{ padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }} />
                <select value={scratch.category} onChange={(e) => setScratch((p) => ({ ...p, category: e.target.value as Category }))} style={{ padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }}>
                  <option>Modern</option>
                  <option>Classic</option>
                </select>
                <select value={scratch.layout} onChange={(e) => setScratch((p) => ({ ...p, layout: e.target.value as Layout }))} style={{ padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }}>
                  <option>Single Column</option>
                  <option>Two Column</option>
                  <option>Sidebar Left</option>
                  <option>Sidebar Right</option>
                </select>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <label style={{ fontWeight: 900, fontSize: 12 }}>Color</label>
                  <input type="color" value={scratch.color} onChange={(e) => setScratch((p) => ({ ...p, color: e.target.value }))} />
                </div>
                <button onClick={createScratch} style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>
                  Create & Open Builder
                </button>
              </div>
            )}

            {addTab === "duplicate" && (
              <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
                <div style={{ color: "#6b7280", fontSize: 12 }}>
                  ✅ Existing template copy → schema cloned → open builder
                </div>
                <select value={dupFromId} onChange={(e) => setDupFromId(Number(e.target.value) || "")} style={{ padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }}>
                  <option value="">Select template</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <input value={dupName} onChange={(e) => setDupName(e.target.value)} placeholder="New name (optional)" style={{ padding: 10, borderRadius: 12, border: "1px solid #e5e7eb" }} />
                <button onClick={duplicate} style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #1d4ed8", background: "#2563eb", color: "white", fontWeight: 900 }}>
                  Duplicate & Open Builder
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
