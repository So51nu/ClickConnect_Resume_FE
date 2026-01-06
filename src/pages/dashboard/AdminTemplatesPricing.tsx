// // src/TemplatePricing.tsx
// import React, { useMemo, useState } from "react";

// type PricingStatus = "active" | "inactive";
// type BillingType = "free" | "one_time" | "subscription";

// interface PricingRow {
//   id: string;
//   templateName: string;
//   category: "Modern" | "Classic";
//   billingType: BillingType;
//   currency: "INR" | "USD";
//   price: number; // base price
//   discountPercent: number; // 0-100
//   finalPrice: number; // auto calculated
//   status: PricingStatus;
//   updated: string; // dd/mm/yyyy
// }

// const dummyPricing: PricingRow[] = [
//   {
//     id: "p-aurora",
//     templateName: "Aurora modern-01",
//     category: "Modern",
//     billingType: "free",
//     currency: "INR",
//     price: 0,
//     discountPercent: 0,
//     finalPrice: 0,
//     status: "active",
//     updated: "02/01/2026",
//   },
//   {
//     id: "p-zenith",
//     templateName: "Zenith modern-02",
//     category: "Modern",
//     billingType: "one_time",
//     currency: "INR",
//     price: 199,
//     discountPercent: 10,
//     finalPrice: 179,
//     status: "active",
//     updated: "03/01/2026",
//   },
//   {
//     id: "p-prism",
//     templateName: "Prism modern-03",
//     category: "Modern",
//     billingType: "subscription",
//     currency: "INR",
//     price: 99,
//     discountPercent: 0,
//     finalPrice: 99,
//     status: "active",
//     updated: "01/01/2026",
//   },
//   {
//     id: "p-legacy",
//     templateName: "Legacy classic-02",
//     category: "Classic",
//     billingType: "one_time",
//     currency: "USD",
//     price: 5,
//     discountPercent: 20,
//     finalPrice: 4,
//     status: "inactive",
//     updated: "28/12/2025",
//   },
// ];

// function todayDDMMYYYY() {
//   const d = new Date();
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   return `${dd}/${mm}/${yyyy}`;
// }

// function safeId() {
//   return "p-" + Math.random().toString(16).slice(2, 10);
// }

// function calcFinalPrice(price: number, discountPercent: number) {
//   const p = Number.isFinite(price) ? price : 0;
//   const d = Number.isFinite(discountPercent) ? discountPercent : 0;
//   const final = p - (p * d) / 100;
//   // keep 2 decimals if needed
//   return Math.round(final * 100) / 100;
// }

// function currencySymbol(c: PricingRow["currency"]) {
//   return c === "INR" ? "₹" : "$";
// }

// function badge(status: PricingStatus) {
//   if (status === "active") {
//     return { bg: "#dcfce7", fg: "#166534", border: "#bbf7d0", text: "Active" };
//   }
//   return { bg: "#f3f4f6", fg: "#374151", border: "#e5e7eb", text: "Inactive" };
// }

// function billingPill(b: BillingType) {
//   if (b === "free") return { bg: "#e0f2fe", fg: "#075985", border: "#bae6fd", text: "Free" };
//   if (b === "one_time") return { bg: "#fef3c7", fg: "#92400e", border: "#fde68a", text: "One-time" };
//   return { bg: "#ede9fe", fg: "#5b21b6", border: "#ddd6fe", text: "Subscription" };
// }

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
//     backgroundColor: "#f9fafb",
//     minHeight: "100vh",
//   },
//   header: {
//     position: "sticky",
//     top: 0,
//     zIndex: 10,
//     backgroundColor: "rgba(255,255,255,0.85)",
//     backdropFilter: "blur(8px)",
//     borderBottom: "1px solid #e5e7eb",
//   },
//   headerInner: {
//     maxWidth: 1440,
//     margin: "0 auto",
//     padding: "16px 24px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 16,
//   },
//   title: { margin: 0, fontSize: 22, fontWeight: 750, color: "#111827" },
//   subtitle: { margin: "4px 0 0", fontSize: 13, color: "#6b7280" },
//   container: { maxWidth: 1440, margin: "0 auto", padding: 24 },

//   btnPrimary: {
//     backgroundColor: "#2563eb",
//     color: "white",
//     padding: "10px 14px",
//     borderRadius: 12,
//     border: "1px solid #1d4ed8",
//     fontWeight: 750,
//     cursor: "pointer",
//     boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 8,
//     userSelect: "none",
//   },
//   btnGhost: {
//     padding: "10px 12px",
//     borderRadius: 12,
//     border: "1px solid #e5e7eb",
//     backgroundColor: "white",
//     color: "#111827",
//     fontWeight: 700,
//     cursor: "pointer",
//   },

//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//     gap: 16,
//     marginTop: 12,
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 14,
//     padding: 18,
//     boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
//     border: "1px solid #f1f5f9",
//   },
//   statLabel: { margin: 0, fontSize: 13, color: "#6b7280" },
//   statValue: { margin: "10px 0 0", fontSize: 30, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" },

//   filtersWrap: {
//     marginTop: 16,
//     backgroundColor: "white",
//     borderRadius: 14,
//     padding: 14,
//     boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
//     border: "1px solid #f1f5f9",
//   },
//   filtersRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 12,
//     flexWrap: "wrap",
//   },
//   foundText: { margin: 0, fontSize: 13, color: "#6b7280" },
//   controls: { display: "flex", gap: 10, flexWrap: "wrap" },
//   input: {
//     padding: "9px 12px",
//     border: "1px solid #d1d5db",
//     borderRadius: 12,
//     minWidth: 240,
//     fontSize: 14,
//     outline: "none",
//     boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)",
//     backgroundColor: "white",
//   },
//   select: {
//     padding: "9px 12px",
//     border: "1px solid #d1d5db",
//     borderRadius: 12,
//     fontSize: 14,
//     outline: "none",
//     backgroundColor: "white",
//   },

//   tableCard: {
//     marginTop: 14,
//     backgroundColor: "white",
//     borderRadius: 14,
//     boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
//     overflow: "hidden",
//     border: "1px solid #f1f5f9",
//   },
//   tableWrap: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", minWidth: 1100 },
//   th: {
//     backgroundColor: "#f3f4f6",
//     textAlign: "left",
//     padding: "12px 14px",
//     fontSize: 12,
//     letterSpacing: "0.04em",
//     textTransform: "uppercase",
//     color: "#4b5563",
//     borderBottom: "1px solid #e5e7eb",
//     whiteSpace: "nowrap",
//   },
//   td: {
//     padding: "14px",
//     fontSize: 14,
//     color: "#374151",
//     borderTop: "1px solid #eef2f7",
//     verticalAlign: "middle",
//     whiteSpace: "nowrap",
//   },
//   pill: {
//     display: "inline-flex",
//     alignItems: "center",
//     padding: "5px 10px",
//     borderRadius: 999,
//     fontSize: 12,
//     fontWeight: 750,
//     border: "1px solid transparent",
//   },
//   menuBtn: {
//     background: "transparent",
//     border: "1px solid transparent",
//     color: "#6b7280",
//     fontSize: 18,
//     cursor: "pointer",
//     borderRadius: 10,
//     padding: "6px 8px",
//   },

//   footer: {
//     borderTop: "1px solid #eef2f7",
//     padding: "10px 14px",
//     fontSize: 13,
//     color: "#6b7280",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 10,
//     flexWrap: "wrap",
//   },

//   // Modal
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(17,24,39,0.45)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     zIndex: 50,
//   },
//   modal: {
//     width: "100%",
//     maxWidth: 640,
//     backgroundColor: "white",
//     borderRadius: 16,
//     boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
//     overflow: "hidden",
//     border: "1px solid rgba(255,255,255,0.6)",
//   },
//   modalHeader: {
//     padding: "16px 18px",
//     borderBottom: "1px solid #eef2f7",
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     gap: 12,
//   },
//   modalTitle: { margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" },
//   modalBody: {
//     padding: 18,
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 12,
//   },
//   field: { display: "flex", flexDirection: "column", gap: 6 },
//   label: { fontSize: 12, fontWeight: 750, color: "#374151" },
//   full: { gridColumn: "1 / -1" },
//   error: {
//     gridColumn: "1 / -1",
//     backgroundColor: "#fef2f2",
//     color: "#991b1b",
//     border: "1px solid #fecaca",
//     padding: "10px 12px",
//     borderRadius: 12,
//     fontSize: 13,
//   },
//   modalFooter: {
//     padding: "14px 18px",
//     borderTop: "1px solid #eef2f7",
//     display: "flex",
//     justifyContent: "flex-end",
//     gap: 10,
//   },
// };

// function StatCard({ label, value }: { label: string; value: string | number }) {
//   return (
//     <div style={styles.card}>
//       <p style={styles.statLabel}>{label}</p>
//       <p style={styles.statValue}>{value}</p>
//     </div>
//   );
// }

// export default function TemplatePricing() {
//   const [rows, setRows] = useState<PricingRow[]>(dummyPricing);

//   // filters
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState<"All" | PricingRow["category"]>("All");
//   const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

//   // modal state
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState<"add" | "edit">("add");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [err, setErr] = useState("");

//   const [form, setForm] = useState({
//     templateName: "",
//     category: "Modern" as PricingRow["category"],
//     billingType: "one_time" as BillingType,
//     currency: "INR" as PricingRow["currency"],
//     price: 199,
//     discountPercent: 0,
//     status: "active" as PricingStatus,
//   });

//   const filtered = useMemo(() => {
//     const s = search.trim().toLowerCase();
//     return rows.filter((r) => {
//       const matchesSearch = s === "" || r.templateName.toLowerCase().includes(s);
//       const matchesCat = categoryFilter === "All" || r.category === categoryFilter;
//       const matchesStatus =
//         statusFilter === "All" ||
//         (statusFilter === "Active" && r.status === "active") ||
//         (statusFilter === "Inactive" && r.status === "inactive");
//       return matchesSearch && matchesCat && matchesStatus;
//     });
//   }, [rows, search, categoryFilter, statusFilter]);

//   // stats
//   const total = rows.length;
//   const active = rows.filter((r) => r.status === "active").length;
//   const freeCount = rows.filter((r) => r.billingType === "free").length;
//   const avgPriceINR = (() => {
//     const paid = rows.filter((r) => r.currency === "INR" && r.finalPrice > 0);
//     if (paid.length === 0) return 0;
//     const sum = paid.reduce((a, b) => a + b.finalPrice, 0);
//     return Math.round((sum / paid.length) * 100) / 100;
//   })();

//   const openAdd = () => {
//     setMode("add");
//     setEditingId(null);
//     setErr("");
//     setForm({
//       templateName: "",
//       category: "Modern",
//       billingType: "one_time",
//       currency: "INR",
//       price: 199,
//       discountPercent: 0,
//       status: "active",
//     });
//     setOpen(true);
//   };

//   const openEdit = (row: PricingRow) => {
//     setMode("edit");
//     setEditingId(row.id);
//     setErr("");
//     setForm({
//       templateName: row.templateName,
//       category: row.category,
//       billingType: row.billingType,
//       currency: row.currency,
//       price: row.price,
//       discountPercent: row.discountPercent,
//       status: row.status,
//     });
//     setOpen(true);
//   };

//   const closeModal = () => setOpen(false);

//   const submit = (e?: React.FormEvent) => {
//     e?.preventDefault();
//     setErr("");

//     const templateName = form.templateName.trim();
//     if (!templateName) return setErr("Template name required.");
//     if (templateName.length < 3) return setErr("Template name min 3 characters.");

//     const price = Number(form.price);
//     const discountPercent = Number(form.discountPercent);

//     if (!Number.isFinite(price) || price < 0) return setErr("Price must be 0 or more.");
//     if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
//       return setErr("Discount must be between 0 and 100.");
//     }

//     // if billingType is free -> force price/discount = 0
//     const normalizedPrice = form.billingType === "free" ? 0 : price;
//     const normalizedDiscount = form.billingType === "free" ? 0 : discountPercent;
//     const finalPrice = calcFinalPrice(normalizedPrice, normalizedDiscount);

//     if (mode === "add") {
//       const exists = rows.some((r) => r.templateName.toLowerCase() === templateName.toLowerCase());
//       if (exists) return setErr("Same template pricing already exists.");

//       const newRow: PricingRow = {
//         id: safeId(),
//         templateName,
//         category: form.category,
//         billingType: form.billingType,
//         currency: form.currency,
//         price: normalizedPrice,
//         discountPercent: normalizedDiscount,
//         finalPrice,
//         status: form.status,
//         updated: todayDDMMYYYY(),
//       };
//       setRows((prev) => [newRow, ...prev]);
//       setOpen(false);
//       return;
//     }

//     // edit
//     if (!editingId) return setErr("Edit error: missing id.");
//     setRows((prev) =>
//       prev.map((r) =>
//         r.id === editingId
//           ? {
//               ...r,
//               templateName,
//               category: form.category,
//               billingType: form.billingType,
//               currency: form.currency,
//               price: normalizedPrice,
//               discountPercent: normalizedDiscount,
//               finalPrice,
//               status: form.status,
//               updated: todayDDMMYYYY(),
//             }
//           : r
//       )
//     );
//     setOpen(false);
//   };

//   const toggleStatus = (id: string) => {
//     setRows((prev) =>
//       prev.map((r) =>
//         r.id === id
//           ? { ...r, status: r.status === "active" ? "inactive" : "active", updated: todayDDMMYYYY() }
//           : r
//       )
//     );
//   };

//   const removeRow = (id: string) => {
//     // simple confirm
//     const ok = window.confirm("Delete this pricing row?");
//     if (!ok) return;
//     setRows((prev) => prev.filter((r) => r.id !== id));
//   };

//   return (
//     <div style={styles.page}>
//       <header style={styles.header}>
//         <div style={styles.headerInner}>
//           <div>
//             <h1 style={styles.title}>Template Pricing</h1>
//             <p style={styles.subtitle}>Manage price, discount, billing type & status</p>
//           </div>

//           <button
//             type="button"
//             style={styles.btnPrimary}
//             onClick={openAdd}
//             onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
//             onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
//             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
//             Add Pricing
//           </button>
//         </div>
//       </header>

//       <div style={styles.container}>
//         {/* Stats */}
//         <div style={styles.statsGrid}>
//           <StatCard label="Total Rows" value={total} />
//           <StatCard label="Active" value={active} />
//           <StatCard label="Free Templates" value={freeCount} />
//           <StatCard label="Avg Price (INR)" value={avgPriceINR} />
//         </div>

//         {/* Filters */}
//         <div style={styles.filtersWrap}>
//           <div style={styles.filtersRow}>
//             <p style={styles.foundText}>
//               <b style={{ color: "#111827" }}>{filtered.length}</b> results
//             </p>

//             <div style={styles.controls}>
//               <input
//                 style={styles.input}
//                 placeholder="Search template..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />

//               <select
//                 style={styles.select}
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value as any)}
//               >
//                 <option value="All">All Categories</option>
//                 <option value="Modern">Modern</option>
//                 <option value="Classic">Classic</option>
//               </select>

//               <select
//                 style={styles.select}
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value as any)}
//               >
//                 <option value="All">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div style={styles.tableCard}>
//           <div style={styles.tableWrap}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Template</th>
//                   <th style={styles.th}>Category</th>
//                   <th style={styles.th}>Billing</th>
//                   <th style={styles.th}>Currency</th>
//                   <th style={styles.th}>Price</th>
//                   <th style={styles.th}>Discount</th>
//                   <th style={styles.th}>Final</th>
//                   <th style={styles.th}>Status</th>
//                   <th style={styles.th}>Updated</th>
//                   <th style={{ ...styles.th, width: 170 }}></th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filtered.map((r) => {
//                   const s = badge(r.status);
//                   const b = billingPill(r.billingType);
//                   const sym = currencySymbol(r.currency);

//                   return (
//                     <tr key={r.id}>
//                       <td style={styles.td}>{r.templateName}</td>
//                       <td style={styles.td}>{r.category}</td>

//                       <td style={styles.td}>
//                         <span style={{ ...styles.pill, backgroundColor: b.bg, color: b.fg, borderColor: b.border }}>
//                           {b.text}
//                         </span>
//                       </td>

//                       <td style={styles.td}>{r.currency}</td>

//                       <td style={styles.td}>
//                         {sym}
//                         {r.price}
//                       </td>

//                       <td style={styles.td}>{r.discountPercent}%</td>

//                       <td style={styles.td}>
//                         <b style={{ color: "#111827" }}>
//                           {sym}
//                           {r.finalPrice}
//                         </b>
//                       </td>

//                       <td style={styles.td}>
//                         <span style={{ ...styles.pill, backgroundColor: s.bg, color: s.fg, borderColor: s.border }}>
//                           {s.text}
//                         </span>
//                       </td>

//                       <td style={styles.td}>{r.updated}</td>

//                       <td style={{ ...styles.td, textAlign: "right", whiteSpace: "nowrap" }}>
//                         <button
//                           style={{ ...styles.btnGhost, padding: "8px 10px", borderRadius: 10, marginRight: 8 }}
//                           onClick={() => openEdit(r)}
//                         >
//                           Edit
//                         </button>

//                         <button
//                           style={{ ...styles.btnGhost, padding: "8px 10px", borderRadius: 10, marginRight: 8 }}
//                           onClick={() => toggleStatus(r.id)}
//                         >
//                           {r.status === "active" ? "Disable" : "Enable"}
//                         </button>

//                         <button
//                           style={{
//                             ...styles.btnGhost,
//                             padding: "8px 10px",
//                             borderRadius: 10,
//                             borderColor: "#fecaca",
//                             color: "#991b1b",
//                           }}
//                           onClick={() => removeRow(r.id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}

//                 {filtered.length === 0 && (
//                   <tr>
//                     <td style={{ ...styles.td, padding: 22 }} colSpan={10}>
//                       <div style={{ textAlign: "center" }}>
//                         <p style={{ margin: 0, fontWeight: 800, color: "#111827" }}>No pricing rows found</p>
//                         <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
//                           Search/filters change karke try karo.
//                         </p>
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
//               <b style={{ color: "#111827" }}>{rows.length}</b>
//             </span>
//             <span>Admin • Pricing</span>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {open && (
//         <div
//           style={styles.overlay}
//           onClick={(e) => {
//             if (e.target === e.currentTarget) closeModal();
//           }}
//         >
//           <div style={styles.modal} role="dialog" aria-modal="true" aria-label="Pricing modal">
//             <div style={styles.modalHeader}>
//               <div>
//                 <p style={styles.modalTitle}>{mode === "add" ? "Add Pricing" : "Edit Pricing"}</p>
//                 <p style={{ ...styles.subtitle, marginTop: 6 }}>
//                   Billing, price & discount set karo. Final auto-calculate hoga.
//                 </p>
//               </div>

//               <button type="button" style={styles.btnGhost} onClick={closeModal} aria-label="Close">
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
//                     value={form.templateName}
//                     onChange={(e) => setForm((p) => ({ ...p, templateName: e.target.value }))}
//                     placeholder="e.g. Atlas modern-11"
//                     autoFocus
//                   />
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Category</label>
//                   <select
//                     style={styles.select}
//                     value={form.category}
//                     onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as any }))}
//                   >
//                     <option value="Modern">Modern</option>
//                     <option value="Classic">Classic</option>
//                   </select>
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Status</label>
//                   <select
//                     style={styles.select}
//                     value={form.status}
//                     onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as any }))}
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Billing Type</label>
//                   <select
//                     style={styles.select}
//                     value={form.billingType}
//                     onChange={(e) => {
//                       const billingType = e.target.value as BillingType;
//                       setForm((p) => ({
//                         ...p,
//                         billingType,
//                         price: billingType === "free" ? 0 : p.price,
//                         discountPercent: billingType === "free" ? 0 : p.discountPercent,
//                       }));
//                     }}
//                   >
//                     <option value="free">Free</option>
//                     <option value="one_time">One-time</option>
//                     <option value="subscription">Subscription</option>
//                   </select>
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Currency</label>
//                   <select
//                     style={styles.select}
//                     value={form.currency}
//                     onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value as any }))}
//                   >
//                     <option value="INR">INR (₹)</option>
//                     <option value="USD">USD ($)</option>
//                   </select>
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Price</label>
//                   <input
//                     type="number"
//                     style={{ ...styles.input, minWidth: "unset" }}
//                     value={form.price}
//                     disabled={form.billingType === "free"}
//                     onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
//                     min={0}
//                   />
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Discount %</label>
//                   <input
//                     type="number"
//                     style={{ ...styles.input, minWidth: "unset" }}
//                     value={form.discountPercent}
//                     disabled={form.billingType === "free"}
//                     onChange={(e) => setForm((p) => ({ ...p, discountPercent: Number(e.target.value) }))}
//                     min={0}
//                     max={100}
//                   />
//                 </div>

//                 <div style={{ ...styles.field, ...styles.full }}>
//                   <label style={styles.label}>Final Price (auto)</label>
//                   <div
//                     style={{
//                       ...styles.input,
//                       minWidth: "unset",
//                       width: "100%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       backgroundColor: "#f8fafc",
//                       borderColor: "#e5e7eb",
//                     }}
//                   >
//                     <span style={{ color: "#6b7280" }}>
//                       {form.currency} ({currencySymbol(form.currency)})
//                     </span>
//                     <b style={{ color: "#111827" }}>
//                       {currencySymbol(form.currency)}
//                       {calcFinalPrice(
//                         form.billingType === "free" ? 0 : Number(form.price),
//                         form.billingType === "free" ? 0 : Number(form.discountPercent)
//                       )}
//                     </b>
//                   </div>
//                 </div>
//               </div>

//               <div style={styles.modalFooter}>
//                 <button type="button" style={styles.btnGhost} onClick={closeModal}>
//                   Cancel
//                 </button>
//                 <button type="submit" style={styles.btnPrimary}>
//                   {mode === "add" ? "Create Pricing" : "Save Changes"}
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

type PricingStatus = "active" | "inactive";
type BillingType = "free" | "one_time" | "subscription";

type TemplateOption = {
  id: number;
  name: string;
  category: "Modern" | "Classic";
};

type PricingRow = {
  id: number;
  templateName: string;
  billing_type: BillingType;
  currency: "INR" | "USD";
  price: number;
  discount_percent: number;
  final_price: number;
  status: PricingStatus;
  updated: string;
  template_id?: number; // not returned in my serializer; optional
};

function getAccessToken() {
  return localStorage.getItem("access") || "";
}

function authHeaders() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function currencySymbol(c: PricingRow["currency"]) {
  return c === "INR" ? "₹" : "$";
}

function badge(status: PricingStatus) {
  if (status === "active") return { bg: "#dcfce7", fg: "#166534", border: "#bbf7d0", text: "Active" };
  return { bg: "#f3f4f6", fg: "#374151", border: "#e5e7eb", text: "Inactive" };
}

function billingPill(b: BillingType) {
  if (b === "free") return { bg: "#e0f2fe", fg: "#075985", border: "#bae6fd", text: "Free" };
  if (b === "one_time") return { bg: "#fef3c7", fg: "#92400e", border: "#fde68a", text: "One-time" };
  return { bg: "#ede9fe", fg: "#5b21b6", border: "#ddd6fe", text: "Subscription" };
}

const styles: Record<string, React.CSSProperties> = {
  page: { fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" },
  header: { position: "sticky", top: 0, zIndex: 10, backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e5e7eb" },
  headerInner: { maxWidth: 1440, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 },
  title: { margin: 0, fontSize: 22, fontWeight: 750, color: "#111827" },
  subtitle: { margin: "4px 0 0", fontSize: 13, color: "#6b7280" },
  container: { maxWidth: 1440, margin: "0 auto", padding: 24 },

  btnPrimary: { backgroundColor: "#2563eb", color: "white", padding: "10px 14px", borderRadius: 12, border: "1px solid #1d4ed8", fontWeight: 750, cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.08)", display: "inline-flex", alignItems: "center", gap: 8, userSelect: "none" },
  btnGhost: { padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb", backgroundColor: "white", color: "#111827", fontWeight: 700, cursor: "pointer" },

  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 12 },
  card: { backgroundColor: "white", borderRadius: 14, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" },
  statLabel: { margin: 0, fontSize: 13, color: "#6b7280" },
  statValue: { margin: "10px 0 0", fontSize: 30, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" },

  filtersWrap: { marginTop: 16, backgroundColor: "white", borderRadius: 14, padding: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" },
  filtersRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" },
  foundText: { margin: 0, fontSize: 13, color: "#6b7280" },
  controls: { display: "flex", gap: 10, flexWrap: "wrap" },
  input: { padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 12, minWidth: 240, fontSize: 14, outline: "none", boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)", backgroundColor: "white" },
  select: { padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 12, fontSize: 14, outline: "none", backgroundColor: "white" },

  tableCard: { marginTop: 14, backgroundColor: "white", borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", border: "1px solid #f1f5f9" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 1100 },
  th: { backgroundColor: "#f3f4f6", textAlign: "left", padding: "12px 14px", fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "#4b5563", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" },
  td: { padding: "14px", fontSize: 14, color: "#374151", borderTop: "1px solid #eef2f7", verticalAlign: "middle", whiteSpace: "nowrap" },

  pill: { display: "inline-flex", alignItems: "center", padding: "5px 10px", borderRadius: 999, fontSize: 12, fontWeight: 750, border: "1px solid transparent" },

  footer: { borderTop: "1px solid #eef2f7", padding: "10px 14px", fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" },

  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(17,24,39,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50 },
  modal: { width: "100%", maxWidth: 640, backgroundColor: "white", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.25)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.6)" },
  modalHeader: { padding: "16px 18px", borderBottom: "1px solid #eef2f7", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  modalTitle: { margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" },
  modalBody: { padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 750, color: "#374151" },
  full: { gridColumn: "1 / -1" },
  error: { gridColumn: "1 / -1", backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "10px 12px", borderRadius: 12, fontSize: 13 },
  modalFooter: { padding: "14px 18px", borderTop: "1px solid #eef2f7", display: "flex", justifyContent: "flex-end", gap: 10 },
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={styles.card}>
      <p style={styles.statLabel}>{label}</p>
      <p style={styles.statValue}>{value}</p>
    </div>
  );
}

export default function AdminTemplatesPricing() {
  const [rows, setRows] = useState<PricingRow[]>([]);
  const [templates, setTemplates] = useState<TemplateOption[]>([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

  // modal
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    template_id: 0,
    billing_type: "one_time" as BillingType,
    currency: "INR" as "INR" | "USD",
    price: 199,
    discount_percent: 0,
    status: "active" as PricingStatus,
  });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [tplRes, prRes] = await Promise.all([
        axios.get("/auth/admin/templates/", { headers: authHeaders() }),
        axios.get("/auth/admin/template-pricing/", { headers: authHeaders() }),
      ]);

      const tpl: TemplateOption[] = (tplRes.data || []).map((t: any) => ({ id: t.id, name: t.name, category: t.category }));
      setTemplates(tpl);

      setRows(prRes.data || []);
    } catch (e) {
      console.error("Pricing fetch failed", e);
      setTemplates([]);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesSearch = s === "" || (r.templateName || "").toLowerCase().includes(s);
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && r.status === "active") ||
        (statusFilter === "Inactive" && r.status === "inactive");
      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  // stats
  const total = rows.length;
  const active = rows.filter((r) => r.status === "active").length;
  const freeCount = rows.filter((r) => r.billing_type === "free").length;
  const avgPriceINR = (() => {
    const paid = rows.filter((r) => r.currency === "INR" && Number(r.final_price) > 0);
    if (paid.length === 0) return 0;
    const sum = paid.reduce((a, b) => a + Number(b.final_price || 0), 0);
    return Math.round((sum / paid.length) * 100) / 100;
  })();

  const openAdd = () => {
    setMode("add");
    setEditingId(null);
    setErr("");
    setForm({
      template_id: templates[0]?.id || 0,
      billing_type: "one_time",
      currency: "INR",
      price: 199,
      discount_percent: 0,
      status: "active",
    });
    setOpen(true);
  };

  const openEdit = (row: PricingRow) => {
    setMode("edit");
    setEditingId(row.id);
    setErr("");

    // NOTE: serializer read-only templateName, write uses template_id
    // We can't know template_id from pricing list unless backend returns it;
    // so we infer by matching name in templates list.
    const foundTpl = templates.find((t) => t.name === row.templateName);

    setForm({
      template_id: foundTpl?.id || 0,
      billing_type: row.billing_type,
      currency: row.currency,
      price: Number(row.price || 0),
      discount_percent: Number(row.discount_percent || 0),
      status: row.status,
    });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErr("");

    if (!form.template_id) return setErr("Template select karo.");
    if (!Number.isFinite(Number(form.price)) || Number(form.price) < 0) return setErr("Price must be 0 or more.");
    if (!Number.isFinite(Number(form.discount_percent)) || Number(form.discount_percent) < 0 || Number(form.discount_percent) > 100) {
      return setErr("Discount must be between 0 and 100.");
    }

    // normalize if free
    const payload = {
      template_id: form.template_id,
      billing_type: form.billing_type,
      currency: form.currency,
      price: form.billing_type === "free" ? 0 : Number(form.price),
      discount_percent: form.billing_type === "free" ? 0 : Number(form.discount_percent),
      status: form.status,
    };

    try {
      if (mode === "add") {
        const res = await axios.post("/auth/admin/template-pricing/", payload, { headers: authHeaders() });
        setRows((prev) => [res.data, ...prev]);
        setOpen(false);
        return;
      }

      if (!editingId) return setErr("Edit error: missing id.");
      const res = await axios.put(`/auth/admin/template-pricing/${editingId}/`, payload, { headers: authHeaders() });
      setRows((prev) => prev.map((x) => (x.id === editingId ? res.data : x)));
      setOpen(false);
    } catch (e: any) {
      console.error("Pricing save failed", e);
      const msg = e?.response?.data?.detail || "Save failed (template duplicate / auth token / validation).";
      setErr(String(msg));
    }
  };

  const toggleStatus = async (row: PricingRow) => {
    try {
      const newStatus: PricingStatus = row.status === "active" ? "inactive" : "active";

      // Need template_id to patch safely
      const foundTpl = templates.find((t) => t.name === row.templateName);
      const template_id = foundTpl?.id;

      if (!template_id) {
        alert("Template not found for this pricing row. Refresh templates.");
        return;
      }

      const payload = {
        template_id,
        billing_type: row.billing_type,
        currency: row.currency,
        price: row.price,
        discount_percent: row.discount_percent,
        status: newStatus,
      };

      const res = await axios.put(`/auth/admin/template-pricing/${row.id}/`, payload, { headers: authHeaders() });
      setRows((prev) => prev.map((x) => (x.id === row.id ? res.data : x)));
    } catch (e) {
      alert("Status update failed");
    }
  };

  const removeRow = async (id: number) => {
    const ok = window.confirm("Delete this pricing row?");
    if (!ok) return;
    try {
      await axios.delete(`/auth/admin/template-pricing/${id}/`, { headers: authHeaders() });
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <h1 style={styles.title}>Template Pricing</h1>
            <p style={styles.subtitle}>Manage price, discount, billing type & status</p>
          </div>

          <button type="button" style={styles.btnPrimary} onClick={openAdd}>
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            Add Pricing
          </button>
        </div>
      </header>

      <div style={styles.container}>
        <div style={styles.statsGrid}>
          <StatCard label="Total Rows" value={total} />
          <StatCard label="Active" value={active} />
          <StatCard label="Free Templates" value={freeCount} />
          <StatCard label="Avg Price (INR)" value={avgPriceINR} />
        </div>

        <div style={styles.filtersWrap}>
          <div style={styles.filtersRow}>
            <p style={styles.foundText}>
              <b style={{ color: "#111827" }}>{filtered.length}</b> results {loading ? "• loading..." : ""}
            </p>

            <div style={styles.controls}>
              <input style={styles.input} placeholder="Search template..." value={search} onChange={(e) => setSearch(e.target.value)} />

              <select style={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button type="button" style={styles.btnGhost} onClick={fetchAll}>
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div style={styles.tableCard}>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Template</th>
                  <th style={styles.th}>Billing</th>
                  <th style={styles.th}>Currency</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Discount</th>
                  <th style={styles.th}>Final</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Updated</th>
                  <th style={{ ...styles.th, width: 210 }} />
                </tr>
              </thead>

              <tbody>
                {filtered.map((r) => {
                  const s = badge(r.status);
                  const b = billingPill(r.billing_type);
                  const sym = currencySymbol(r.currency);

                  return (
                    <tr key={r.id}>
                      <td style={styles.td}>{r.templateName}</td>

                      <td style={styles.td}>
                        <span style={{ ...styles.pill, backgroundColor: b.bg, color: b.fg, borderColor: b.border }}>{b.text}</span>
                      </td>

                      <td style={styles.td}>{r.currency}</td>

                      <td style={styles.td}>
                        {sym}
                        {Number(r.price || 0)}
                      </td>

                      <td style={styles.td}>{Number(r.discount_percent || 0)}%</td>

                      <td style={styles.td}>
                        <b style={{ color: "#111827" }}>
                          {sym}
                          {Number(r.final_price || 0)}
                        </b>
                      </td>

                      <td style={styles.td}>
                        <span style={{ ...styles.pill, backgroundColor: s.bg, color: s.fg, borderColor: s.border }}>{s.text}</span>
                      </td>

                      <td style={styles.td}>{r.updated}</td>

                      <td style={{ ...styles.td, textAlign: "right", whiteSpace: "nowrap" }}>
                        <button style={{ ...styles.btnGhost, padding: "8px 10px", borderRadius: 10, marginRight: 8 }} onClick={() => openEdit(r)}>
                          Edit
                        </button>

                        <button style={{ ...styles.btnGhost, padding: "8px 10px", borderRadius: 10, marginRight: 8 }} onClick={() => toggleStatus(r)}>
                          {r.status === "active" ? "Disable" : "Enable"}
                        </button>

                        <button
                          style={{ ...styles.btnGhost, padding: "8px 10px", borderRadius: 10, borderColor: "#fecaca", color: "#991b1b" }}
                          onClick={() => removeRow(r.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td style={{ ...styles.td, padding: 22 }} colSpan={9}>
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: 0, fontWeight: 800, color: "#111827" }}>No pricing rows found</p>
                        <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Search/filters change karke try karo.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={styles.footer}>
            <span>
              Showing <b style={{ color: "#111827" }}>{filtered.length}</b> of{" "}
              <b style={{ color: "#111827" }}>{rows.length}</b>
            </span>
            <span>Admin • Pricing</span>
          </div>
        </div>
      </div>

      {open && (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div style={styles.modal} role="dialog" aria-modal="true" aria-label="Pricing modal">
            <div style={styles.modalHeader}>
              <div>
                <p style={styles.modalTitle}>{mode === "add" ? "Add Pricing" : "Edit Pricing"}</p>
                <p style={{ ...styles.subtitle, marginTop: 6 }}>Billing, price & discount set karo. Final auto-calculate hoga.</p>
              </div>

              <button type="button" style={styles.btnGhost} onClick={closeModal} aria-label="Close">
                ✕
              </button>
            </div>

            <form onSubmit={submit}>
              <div style={styles.modalBody}>
                {err && <div style={styles.error}>{err}</div>}

                <div style={{ ...styles.field, ...styles.full }}>
                  <label style={styles.label}>Template</label>
                  <select
                    style={{ ...styles.select, width: "100%" }}
                    value={form.template_id}
                    onChange={(e) => setForm((p) => ({ ...p, template_id: Number(e.target.value) }))}
                  >
                    <option value={0}>Select template</option>
                    {templates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Status</label>
                  <select style={styles.select} value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as any }))}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Billing Type</label>
                  <select
                    style={styles.select}
                    value={form.billing_type}
                    onChange={(e) => {
                      const billing_type = e.target.value as BillingType;
                      setForm((p) => ({
                        ...p,
                        billing_type,
                        price: billing_type === "free" ? 0 : p.price,
                        discount_percent: billing_type === "free" ? 0 : p.discount_percent,
                      }));
                    }}
                  >
                    <option value="free">Free</option>
                    <option value="one_time">One-time</option>
                    <option value="subscription">Subscription</option>
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Currency</label>
                  <select style={styles.select} value={form.currency} onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value as any }))}>
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Price</label>
                  <input
                    type="number"
                    style={{ ...styles.input, minWidth: "unset" }}
                    value={form.price}
                    disabled={form.billing_type === "free"}
                    onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
                    min={0}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Discount %</label>
                  <input
                    type="number"
                    style={{ ...styles.input, minWidth: "unset" }}
                    value={form.discount_percent}
                    disabled={form.billing_type === "free"}
                    onChange={(e) => setForm((p) => ({ ...p, discount_percent: Number(e.target.value) }))}
                    min={0}
                    max={100}
                  />
                </div>

                <div style={{ ...styles.field, ...styles.full }}>
                  <label style={styles.label}>Final Price</label>
                  <div
                    style={{
                      ...styles.input,
                      minWidth: "unset",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f8fafc",
                      borderColor: "#e5e7eb",
                    }}
                  >
                    <span style={{ color: "#6b7280" }}>{form.currency}</span>
                    <b style={{ color: "#111827" }}>
                      {currencySymbol(form.currency)}
                      {/* backend will calculate final_price anyway */}
                      {form.billing_type === "free"
                        ? 0
                        : Math.round((Number(form.price) - (Number(form.price) * Number(form.discount_percent)) / 100) * 100) / 100}
                    </b>
                  </div>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button type="button" style={styles.btnGhost} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  {mode === "add" ? "Create Pricing" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
