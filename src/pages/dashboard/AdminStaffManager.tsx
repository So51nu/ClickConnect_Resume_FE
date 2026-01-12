// // // // src/pages/dashboard/AdminStaffManager.tsx
// // // import { useEffect, useMemo, useState } from "react";
// // // import type React from "react";
// // // import axios from "../../api/axiosInstance";
// // // import { useNavigate } from "react-router-dom";

// // // type AdminStaff = {
// // //   id: number;
// // //   phone: string;
// // //   name: string;
// // //   email: string | null;
// // //   is_staff: boolean;
// // //   is_active: boolean;
// // //   date_joined?: string;
// // // };

// // // export default function AdminStaffManager() {
// // //   const navigate = useNavigate();

// // //   const [loading, setLoading] = useState(false);
// // //   const [saving, setSaving] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const [staff, setStaff] = useState<AdminStaff[]>([]);
// // //   const [search, setSearch] = useState("");

// // //   const [showForm, setShowForm] = useState(false);
// // //   const [editId, setEditId] = useState<number | null>(null);

// // //   const [form, setForm] = useState({
// // //     phone: "",
// // //     name: "",
// // //     email: "",
// // //     password: "",
// // //     is_active: true,
// // //   });

// // //   const filtered = useMemo(() => {
// // //     const q = search.trim().toLowerCase();
// // //     if (!q) return staff;
// // //     return staff.filter((u) => {
// // //       const phone = (u.phone || "").toLowerCase();
// // //       const name = (u.name || "").toLowerCase();
// // //       const email = (u.email || "").toLowerCase();
// // //       return phone.includes(q) || name.includes(q) || email.includes(q);
// // //     });
// // //   }, [staff, search]);

// // //   const resetForm = () => {
// // //     setEditId(null);
// // //     setForm({
// // //       phone: "",
// // //       name: "",
// // //       email: "",
// // //       password: "",
// // //       is_active: true,
// // //     });
// // //   };

// // //   const fetchStaff = async () => {
// // //     setLoading(true);
// // //     setError("");
// // //     try {
// // //       // baseURL: http://127.0.0.1:8000/api
// // //       // hits: /api/auth/admin/staff/
// // //       const res = await axios.get("/auth/admin/staff/");
// // //       setStaff(res.data || []);
// // //     } catch (e: any) {
// // //       setError(e?.response?.data?.detail || "Failed to load admin staff");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchStaff();
// // //   }, []);

// // //   const openCreate = () => {
// // //     resetForm();
// // //     setShowForm(true);
// // //   };

// // //   const openEdit = (u: AdminStaff) => {
// // //     setEditId(u.id);
// // //     setForm({
// // //       phone: u.phone || "",
// // //       name: u.name || "",
// // //       email: u.email || "",
// // //       password: "",
// // //       is_active: !!u.is_active,
// // //     });
// // //     setShowForm(true);
// // //   };

// // //   const validate = () => {
// // //     const phone = form.phone.replace(/\D/g, "");
// // //     if (phone.length !== 10) return "Phone must be 10 digits";
// // //     if (!form.name.trim()) return "Name is required";
// // //     if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter valid email";
// // //     // create ke time password recommended
// // //     if (!editId && form.password.trim().length < 6) return "Password must be at least 6 characters";
// // //     // edit me password optional, but if given then validate
// // //     if (editId && form.password.trim() && form.password.trim().length < 6)
// // //       return "Password must be at least 6 characters";
// // //     return "";
// // //   };

// // //   const handleSave = async () => {
// // //     const err = validate();
// // //     if (err) {
// // //       setError(err);
// // //       return;
// // //     }

// // //     setSaving(true);
// // //     setError("");

// // //     const payload: any = {
// // //       phone: form.phone.replace(/\D/g, ""),
// // //       name: form.name.trim(),
// // //       email: form.email.trim(),
// // //       is_active: form.is_active,
// // //     };

// // //     if (form.password.trim()) payload.password = form.password.trim();

// // //     try {
// // //       if (editId) {
// // //         await axios.patch(`/auth/admin/staff/${editId}/`, payload);
// // //       } else {
// // //         await axios.post("/auth/admin/staff/", payload);
// // //       }

// // //       setShowForm(false);
// // //       resetForm();
// // //       await fetchStaff();
// // //     } catch (e: any) {
// // //       setError(
// // //         e?.response?.data?.detail ||
// // //           (typeof e?.response?.data === "object" ? JSON.stringify(e.response.data) : "") ||
// // //           "Save failed"
// // //       );
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   const handleDelete = async (id: number) => {
// // //     if (!confirm("Delete this admin?")) return;

// // //     setSaving(true);
// // //     setError("");

// // //     try {
// // //       await axios.delete(`/auth/admin/staff/${id}/`);
// // //       await fetchStaff();
// // //     } catch (e: any) {
// // //       setError(e?.response?.data?.detail || "Delete failed");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   return (
// // //     <div style={page}>
// // //       <div style={header}>
// // //         <div>
// // //           <h1 style={h1}>Admin Staff</h1>
// // //           <p style={sub}>Create / update admin accounts (email + password)</p>
// // //         </div>

// // //         <div style={{ display: "flex", gap: 10 }}>
// // //           <button style={outlineBtn} onClick={() => navigate("/admin/dashboard")}>
// // //             Back
// // //           </button>
// // //           <button style={btn} onClick={openCreate}>
// // //             + Create Admin
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div style={card}>
// // //         <div style={topRow}>
// // //           <input
// // //             style={searchInput}
// // //             placeholder="Search by name, email, phone..."
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //           />
// // //           <button style={miniBtn} onClick={fetchStaff} disabled={loading}>
// // //             {loading ? "Refreshing..." : "Refresh"}
// // //           </button>
// // //         </div>

// // //         {error && <div style={errorBox}>{error}</div>}

// // //         {loading ? (
// // //           <div style={empty}>Loading...</div>
// // //         ) : filtered.length === 0 ? (
// // //           <div style={empty}>No admin staff found.</div>
// // //         ) : (
// // //           <div style={{ overflowX: "auto" }}>
// // //             <table style={table}>
// // //               <thead>
// // //                 <tr>
// // //                   <th style={th}>ID</th>
// // //                   <th style={th}>Phone</th>
// // //                   <th style={th}>Name</th>
// // //                   <th style={th}>Email</th>
// // //                   <th style={th}>Active</th>
// // //                   <th style={{ ...th, width: 220 }}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {filtered.map((u) => (
// // //                   <tr key={u.id}>
// // //                     <td style={td}>{u.id}</td>
// // //                     <td style={td}>{u.phone}</td>
// // //                     <td style={td}>{u.name || "-"}</td>
// // //                     <td style={td}>{u.email || "-"}</td>
// // //                     <td style={td}>
// // //                       <span style={{ ...pill, background: u.is_active ? "#ecfdf5" : "#fef2f2", color: u.is_active ? "#047857" : "#b91c1c" }}>
// // //                         {u.is_active ? "Active" : "Disabled"}
// // //                       </span>
// // //                     </td>
// // //                     <td style={td}>
// // //                       <div style={{ display: "flex", gap: 8 }}>
// // //                         <button style={miniBtn} onClick={() => openEdit(u)}>
// // //                           Edit
// // //                         </button>
// // //                         <button
// // //                           style={dangerBtn}
// // //                           onClick={() => handleDelete(u.id)}
// // //                           disabled={saving}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* FORM MODAL */}
// // //       {showForm && (
// // //         <div style={modalBackdrop} onClick={() => !saving && setShowForm(false)}>
// // //           <div style={modal} onClick={(e) => e.stopPropagation()}>
// // //             <div style={modalHeader}>
// // //               <h2 style={{ margin: 0 }}>
// // //                 {editId ? `Edit Admin #${editId}` : "Create Admin"}
// // //               </h2>
// // //               <button style={xBtn} onClick={() => !saving && setShowForm(false)}>
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             <div style={grid}>
// // //               <div style={field}>
// // //                 <label style={label}>Phone (10 digits)</label>
// // //                 <input
// // //                   style={input}
// // //                   maxLength={10}
// // //                   value={form.phone}
// // //                   onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
// // //                   placeholder="9999999999"
// // //                 />
// // //               </div>

// // //               <div style={field}>
// // //                 <label style={label}>Name</label>
// // //                 <input
// // //                   style={input}
// // //                   value={form.name}
// // //                   onChange={(e) => setForm({ ...form, name: e.target.value })}
// // //                   placeholder="Admin Name"
// // //                 />
// // //               </div>

// // //               <div style={field}>
// // //                 <label style={label}>Email</label>
// // //                 <input
// // //                   style={input}
// // //                   value={form.email}
// // //                   onChange={(e) => setForm({ ...form, email: e.target.value })}
// // //                   placeholder="admin@gmail.com"
// // //                 />
// // //               </div>

// // //               <div style={field}>
// // //                 <label style={label}>
// // //                   Password {editId ? "(optional)" : "(required)"}
// // //                 </label>
// // //                 <input
// // //                   style={input}
// // //                   type="password"
// // //                   value={form.password}
// // //                   onChange={(e) => setForm({ ...form, password: e.target.value })}
// // //                   placeholder={editId ? "Leave blank to keep same" : "Set new password"}
// // //                 />
// // //               </div>

// // //               <div style={{ ...field, flexDirection: "row", alignItems: "center", gap: 10 }}>
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={form.is_active}
// // //                   onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
// // //                 />
// // //                 <label style={{ ...label, marginBottom: 0 }}>Active</label>
// // //               </div>
// // //             </div>

// // //             {error && <div style={{ ...errorBox, marginTop: 10 }}>{error}</div>}

// // //             <div style={modalFooter}>
// // //               <button
// // //                 style={outlineBtn}
// // //                 onClick={() => {
// // //                   if (saving) return;
// // //                   setShowForm(false);
// // //                   resetForm();
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button style={btn} onClick={handleSave} disabled={saving}>
// // //                 {saving ? "Saving..." : "Save"}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // /* ================= STYLES ================= */

// // // const page: React.CSSProperties = {
// // //   padding: 24,
// // //   fontFamily: "'Inter','Segoe UI',sans-serif",
// // //   background: "#0b1220",
// // //   minHeight: "100vh",
// // //   color: "#e5e7eb",
// // // };

// // // const header: React.CSSProperties = {
// // //   display: "flex",
// // //   justifyContent: "space-between",
// // //   alignItems: "center",
// // //   gap: 12,
// // //   marginBottom: 18,
// // // };

// // // const h1: React.CSSProperties = { margin: 0, fontSize: 28, fontWeight: 800 };
// // // const sub: React.CSSProperties = { margin: "6px 0 0", opacity: 0.8 };

// // // const card: React.CSSProperties = {
// // //   background: "#0f172a",
// // //   border: "1px solid rgba(255,255,255,0.08)",
// // //   borderRadius: 14,
// // //   padding: 16,
// // //   boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
// // // };

// // // const topRow: React.CSSProperties = {
// // //   display: "flex",
// // //   gap: 10,
// // //   justifyContent: "space-between",
// // //   alignItems: "center",
// // //   marginBottom: 12,
// // // };

// // // const searchInput: React.CSSProperties = {
// // //   flex: 1,
// // //   padding: 12,
// // //   borderRadius: 10,
// // //   border: "1px solid rgba(255,255,255,0.12)",
// // //   background: "#0b1220",
// // //   color: "#e5e7eb",
// // //   outline: "none",
// // // };

// // // const table: React.CSSProperties = {
// // //   width: "100%",
// // //   borderCollapse: "collapse",
// // // };

// // // const th: React.CSSProperties = {
// // //   textAlign: "left",
// // //   padding: 12,
// // //   fontSize: 13,
// // //   opacity: 0.85,
// // //   borderBottom: "1px solid rgba(255,255,255,0.08)",
// // // };

// // // const td: React.CSSProperties = {
// // //   padding: 12,
// // //   borderBottom: "1px solid rgba(255,255,255,0.06)",
// // //   fontSize: 14,
// // // };

// // // const pill: React.CSSProperties = {
// // //   display: "inline-block",
// // //   padding: "4px 10px",
// // //   borderRadius: 999,
// // //   fontSize: 12,
// // //   fontWeight: 700,
// // // };

// // // const empty: React.CSSProperties = {
// // //   padding: 16,
// // //   opacity: 0.8,
// // // };

// // // const btn: React.CSSProperties = {
// // //   padding: "10px 14px",
// // //   background: "#cddc39",
// // //   border: "none",
// // //   borderRadius: 10,
// // //   fontWeight: 800,
// // //   cursor: "pointer",
// // // };

// // // const outlineBtn: React.CSSProperties = {
// // //   padding: "10px 14px",
// // //   background: "transparent",
// // //   color: "#e5e7eb",
// // //   border: "1px solid rgba(255,255,255,0.20)",
// // //   borderRadius: 10,
// // //   fontWeight: 700,
// // //   cursor: "pointer",
// // // };

// // // const miniBtn: React.CSSProperties = {
// // //   padding: "8px 12px",
// // //   background: "transparent",
// // //   color: "#e5e7eb",
// // //   border: "1px solid rgba(255,255,255,0.20)",
// // //   borderRadius: 10,
// // //   fontWeight: 700,
// // //   cursor: "pointer",
// // // };

// // // const dangerBtn: React.CSSProperties = {
// // //   padding: "8px 12px",
// // //   background: "#7f1d1d",
// // //   color: "#fff",
// // //   border: "1px solid rgba(255,255,255,0.15)",
// // //   borderRadius: 10,
// // //   fontWeight: 700,
// // //   cursor: "pointer",
// // // };

// // // const errorBox: React.CSSProperties = {
// // //   backgroundColor: "#3b0a0a",
// // //   color: "#fecaca",
// // //   padding: 12,
// // //   borderRadius: 10,
// // //   fontSize: 13,
// // //   marginBottom: 12,
// // //   border: "1px solid rgba(255,255,255,0.12)",
// // // };

// // // /* MODAL */
// // // const modalBackdrop: React.CSSProperties = {
// // //   position: "fixed",
// // //   inset: 0,
// // //   background: "rgba(0,0,0,0.65)",
// // //   display: "flex",
// // //   justifyContent: "center",
// // //   alignItems: "center",
// // //   padding: 16,
// // // };

// // // const modal: React.CSSProperties = {
// // //   width: "100%",
// // //   maxWidth: 720,
// // //   background: "#0f172a",
// // //   color: "#e5e7eb",
// // //   borderRadius: 14,
// // //   border: "1px solid rgba(255,255,255,0.10)",
// // //   padding: 16,
// // // };

// // // const modalHeader: React.CSSProperties = {
// // //   display: "flex",
// // //   justifyContent: "space-between",
// // //   alignItems: "center",
// // //   marginBottom: 14,
// // // };

// // // const xBtn: React.CSSProperties = {
// // //   background: "transparent",
// // //   border: "1px solid rgba(255,255,255,0.20)",
// // //   color: "#e5e7eb",
// // //   borderRadius: 10,
// // //   padding: "6px 10px",
// // //   cursor: "pointer",
// // // };

// // // const grid: React.CSSProperties = {
// // //   display: "grid",
// // //   gridTemplateColumns: "1fr 1fr",
// // //   gap: 12,
// // // };

// // // const field: React.CSSProperties = { display: "flex", flexDirection: "column" };

// // // const label: React.CSSProperties = {
// // //   fontSize: 13,
// // //   fontWeight: 700,
// // //   marginBottom: 6,
// // //   opacity: 0.9,
// // // };

// // // const input: React.CSSProperties = {
// // //   padding: 12,
// // //   borderRadius: 10,
// // //   border: "1px solid rgba(255,255,255,0.12)",
// // //   background: "#0b1220",
// // //   color: "#e5e7eb",
// // //   outline: "none",
// // // };

// // // const modalFooter: React.CSSProperties = {
// // //   display: "flex",
// // //   justifyContent: "flex-end",
// // //   gap: 10,
// // //   marginTop: 14,
// // // };

// // // src/pages/dashboard/AdminStaffManager.tsx
// // import { useEffect, useMemo, useState } from "react";
// // import type React from "react";
// // import axios from "../../api/axiosInstance";
// // import { useNavigate } from "react-router-dom";

// // type AdminStaff = {
// //   id: number;
// //   phone: string;
// //   name: string;
// //   email: string | null;
// //   is_staff: boolean;
// //   is_active: boolean;
// //   date_joined?: string;
// // };

// // export default function AdminStaffManager() {
// //   const navigate = useNavigate();

// //   const [loading, setLoading] = useState(false);
// //   const [saving, setSaving] = useState(false);
// //   const [error, setError] = useState("");

// //   const [staff, setStaff] = useState<AdminStaff[]>([]);
// //   const [search, setSearch] = useState("");

// //   const [showForm, setShowForm] = useState(false);
// //   const [editId, setEditId] = useState<number | null>(null);

// //   const [form, setForm] = useState({
// //     phone: "",
// //     name: "",
// //     email: "",
// //     password: "",
// //     is_active: true,
// //   });

// //   const filtered = useMemo(() => {
// //     const q = search.trim().toLowerCase();
// //     if (!q) return staff;
// //     return staff.filter((u) => {
// //       const phone = (u.phone || "").toLowerCase();
// //       const name = (u.name || "").toLowerCase();
// //       const email = (u.email || "").toLowerCase();
// //       return phone.includes(q) || name.includes(q) || email.includes(q);
// //     });
// //   }, [staff, search]);

// //   const resetForm = () => {
// //     setEditId(null);
// //     setForm({
// //       phone: "",
// //       name: "",
// //       email: "",
// //       password: "",
// //       is_active: true,
// //     });
// //   };

// //   const fetchStaff = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const res = await axios.get("/auth/admin/staff/");
// //       setStaff(res.data || []);
// //     } catch (e: any) {
// //       setError(e?.response?.data?.detail || "Failed to load admin staff");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStaff();
// //   }, []);

// //   const openCreate = () => {
// //     resetForm();
// //     setShowForm(true);
// //   };

// //   const openEdit = (u: AdminStaff) => {
// //     setEditId(u.id);
// //     setForm({
// //       phone: u.phone || "",
// //       name: u.name || "",
// //       email: u.email || "",
// //       password: "",
// //       is_active: !!u.is_active,
// //     });
// //     setShowForm(true);
// //   };

// //   const validate = () => {
// //     const phone = form.phone.replace(/\D/g, "");
// //     if (phone.length !== 10) return "Phone must be 10 digits";
// //     if (!form.name.trim()) return "Name is required";
// //     if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter valid email";
// //     if (!editId && form.password.trim().length < 6) return "Password must be at least 6 characters";
// //     if (editId && form.password.trim() && form.password.trim().length < 6)
// //       return "Password must be at least 6 characters";
// //     return "";
// //   };

// //   const handleSave = async () => {
// //     const err = validate();
// //     if (err) {
// //       setError(err);
// //       return;
// //     }

// //     setSaving(true);
// //     setError("");

// //     const payload: any = {
// //       phone: form.phone.replace(/\D/g, ""),
// //       name: form.name.trim(),
// //       email: form.email.trim(),
// //       is_active: form.is_active,
// //     };
// //     if (form.password.trim()) payload.password = form.password.trim();

// //     try {
// //       if (editId) {
// //         await axios.patch(`/auth/admin/staff/${editId}/`, payload);
// //       } else {
// //         await axios.post("/auth/admin/staff/", payload);
// //       }
// //       setShowForm(false);
// //       resetForm();
// //       await fetchStaff();
// //     } catch (e: any) {
// //       setError(
// //         e?.response?.data?.detail ||
// //           (typeof e?.response?.data === "object" ? JSON.stringify(e.response.data) : "") ||
// //           "Save failed"
// //       );
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const handleDelete = async (id: number) => {
// //     if (!confirm("Delete this admin?")) return;

// //     setSaving(true);
// //     setError("");
// //     try {
// //       await axios.delete(`/auth/admin/staff/${id}/`);
// //       await fetchStaff();
// //     } catch (e: any) {
// //       setError(e?.response?.data?.detail || "Delete failed");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   return (
// //     <div style={page}>
// //       <div style={wrap}>
// //         {/* HEADER */}
// //         <div style={header}>
// //           <div style={{ minWidth: 0 }}>
// //             <h1 style={h1}>Admin Staff</h1>
// //             <p style={sub}>Create / update admin accounts (email + password)</p>
// //           </div>

// //           <div style={headerBtns}>
// //             <button style={outlineBtn} onClick={() => navigate("/admin/dashboard")}>
// //               Back
// //             </button>
// //             <button style={btn} onClick={openCreate}>
// //               + Create Admin
// //             </button>
// //           </div>
// //         </div>

// //         {/* CARD */}
// //         <div style={card}>
// //           <div style={topRow}>
// //             <input
// //               style={searchInput}
// //               placeholder="Search by name, email, phone..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //             />

// //             <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
// //               <button style={miniBtn} onClick={fetchStaff} disabled={loading}>
// //                 {loading ? "Refreshing..." : "Refresh"}
// //               </button>
// //               <button style={miniBtn} onClick={openCreate}>
// //                 + Add
// //               </button>
// //             </div>
// //           </div>

// //           {error && <div style={errorBox}>{error}</div>}

// //           {/* LIST */}
// //           {loading ? (
// //             <div style={empty}>Loading...</div>
// //           ) : filtered.length === 0 ? (
// //             <div style={empty}>No admin staff found.</div>
// //           ) : (
// //             <>
// //               {/* ✅ Mobile cards */}
// //               <div style={mobileOnly}>
// //                 <div style={cardsWrap}>
// //                   {filtered.map((u) => (
// //                     <div key={u.id} style={cardItem}>
// //                       <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
// //                         <div style={{ minWidth: 0 }}>
// //                           <div style={nameRow}>
// //                             <span style={nameText}>{u.name || "—"}</span>
// //                             <span
// //                               style={{
// //                                 ...pill,
// //                                 background: u.is_active ? "#ecfdf5" : "#fef2f2",
// //                                 color: u.is_active ? "#047857" : "#b91c1c",
// //                               }}
// //                             >
// //                               {u.is_active ? "Active" : "Disabled"}
// //                             </span>
// //                           </div>

// //                           <div style={metaText}>ID: {u.id}</div>
// //                           <div style={metaText}>Phone: {u.phone}</div>
// //                           <div style={metaText}>Email: {u.email || "—"}</div>
// //                         </div>
// //                       </div>

// //                       <div style={actionsRow}>
// //                         <button style={miniBtn} onClick={() => openEdit(u)}>
// //                           Edit
// //                         </button>
// //                         <button style={dangerBtn} onClick={() => handleDelete(u.id)} disabled={saving}>
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* ✅ Desktop table */}
// //               <div style={desktopOnly}>
// //                 <div style={tableWrap}>
// //                   <table style={table}>
// //                     <thead>
// //                       <tr>
// //                         <th style={th}>ID</th>
// //                         <th style={th}>Phone</th>
// //                         <th style={th}>Name</th>
// //                         <th style={th}>Email</th>
// //                         <th style={th}>Active</th>
// //                         <th style={{ ...th, width: 220 }}>Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {filtered.map((u) => (
// //                         <tr key={u.id}>
// //                           <td style={td}>{u.id}</td>
// //                           <td style={td}>{u.phone}</td>
// //                           <td style={td}>{u.name || "-"}</td>
// //                           <td style={td}>{u.email || "-"}</td>
// //                           <td style={td}>
// //                             <span
// //                               style={{
// //                                 ...pill,
// //                                 background: u.is_active ? "#ecfdf5" : "#fef2f2",
// //                                 color: u.is_active ? "#047857" : "#b91c1c",
// //                               }}
// //                             >
// //                               {u.is_active ? "Active" : "Disabled"}
// //                             </span>
// //                           </td>
// //                           <td style={td}>
// //                             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// //                               <button style={miniBtn} onClick={() => openEdit(u)}>
// //                                 Edit
// //                               </button>
// //                               <button style={dangerBtn} onClick={() => handleDelete(u.id)} disabled={saving}>
// //                                 Delete
// //                               </button>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* ✅ Modal */}
// //       {showForm && (
// //         <div style={modalBackdrop} onClick={() => !saving && setShowForm(false)}>
// //           <div style={modal} onClick={(e) => e.stopPropagation()}>
// //             <div style={modalHeader}>
// //               <h2 style={{ margin: 0, fontSize: 18 }}>
// //                 {editId ? `Edit Admin #${editId}` : "Create Admin"}
// //               </h2>
// //               <button style={xBtn} onClick={() => !saving && setShowForm(false)}>
// //                 ✕
// //               </button>
// //             </div>

// //             <div style={grid}>
// //               <div style={field}>
// //                 <label style={label}>Phone (10 digits)</label>
// //                 <input
// //                   style={input}
// //                   maxLength={10}
// //                   value={form.phone}
// //                   onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
// //                   placeholder="9999999999"
// //                 />
// //               </div>

// //               <div style={field}>
// //                 <label style={label}>Name</label>
// //                 <input
// //                   style={input}
// //                   value={form.name}
// //                   onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                   placeholder="Admin Name"
// //                 />
// //               </div>

// //               <div style={field}>
// //                 <label style={label}>Email</label>
// //                 <input
// //                   style={input}
// //                   value={form.email}
// //                   onChange={(e) => setForm({ ...form, email: e.target.value })}
// //                   placeholder="admin@gmail.com"
// //                 />
// //               </div>

// //               <div style={field}>
// //                 <label style={label}>
// //                   Password {editId ? "(optional)" : "(required)"}
// //                 </label>
// //                 <input
// //                   style={input}
// //                   type="password"
// //                   value={form.password}
// //                   onChange={(e) => setForm({ ...form, password: e.target.value })}
// //                   placeholder={editId ? "Leave blank to keep same" : "Set new password"}
// //                 />
// //               </div>

// //               <div style={{ ...field, flexDirection: "row", alignItems: "center", gap: 10 }}>
// //                 <input
// //                   type="checkbox"
// //                   checked={form.is_active}
// //                   onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
// //                 />
// //                 <label style={{ ...label, marginBottom: 0 }}>Active</label>
// //               </div>
// //             </div>

// //             {error && <div style={{ ...errorBox, marginTop: 10 }}>{error}</div>}

// //             <div style={modalFooter}>
// //               <button
// //                 style={outlineBtn}
// //                 onClick={() => {
// //                   if (saving) return;
// //                   setShowForm(false);
// //                   resetForm();
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //               <button style={btn} onClick={handleSave} disabled={saving}>
// //                 {saving ? "Saving..." : "Save"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ✅ Responsive CSS (inline style tag) */}
// //       <style>{responsiveCss}</style>
// //     </div>
// //   );
// // }

// // /* ================= RESPONSIVE CSS ================= */
// // const responsiveCss = `
// //   /* mobile-only and desktop-only switches */
// //   .mobile-only { display: block; }
// //   .desktop-only { display: none; }

// //   @media (min-width: 900px) {
// //     .mobile-only { display: none; }
// //     .desktop-only { display: block; }
// //   }

// //   /* modal for mobile: fullscreen-ish */
// //   @media (max-width: 560px) {
// //     .modalBox {
// //       width: 100% !important;
// //       height: 100% !important;
// //       max-width: 100% !important;
// //       max-height: 100% !important;
// //       border-radius: 0 !important;
// //     }
// //     .modalGrid {
// //       grid-template-columns: 1fr !important;
// //     }
// //   }

// //   @media (min-width: 561px) and (max-width: 900px) {
// //     .modalGrid {
// //       grid-template-columns: 1fr !important;
// //     }
// //   }
// // `;

// // /* ================= STYLES ================= */

// // const page: React.CSSProperties = {
// //   minHeight: "100vh",
// //   width: "100%",
// //   background: "#0b1220",
// //   color: "#e5e7eb",
// //   fontFamily: "'Inter','Segoe UI',sans-serif",
// // };

// // const wrap: React.CSSProperties = {
// //   maxWidth: 1200,
// //   margin: "0 auto",
// //   padding: "18px 14px",
// // };

// // const header: React.CSSProperties = {
// //   display: "flex",
// //   justifyContent: "space-between",
// //   alignItems: "flex-start",
// //   gap: 12,
// //   marginBottom: 16,
// //   flexWrap: "wrap",
// // };

// // const headerBtns: React.CSSProperties = {
// //   display: "flex",
// //   gap: 10,
// //   flexWrap: "wrap",
// // };

// // const h1: React.CSSProperties = { margin: 0, fontSize: 26, fontWeight: 800 };
// // const sub: React.CSSProperties = { margin: "6px 0 0", opacity: 0.8, fontSize: 14 };

// // const card: React.CSSProperties = {
// //   background: "#0f172a",
// //   border: "1px solid rgba(255,255,255,0.08)",
// //   borderRadius: 14,
// //   padding: 14,
// //   boxShadow: "0 18px 38px rgba(0,0,0,0.35)",
// // };

// // const topRow: React.CSSProperties = {
// //   display: "flex",
// //   gap: 10,
// //   flexWrap: "wrap",
// //   justifyContent: "space-between",
// //   alignItems: "center",
// //   marginBottom: 12,
// // };

// // const searchInput: React.CSSProperties = {
// //   flex: "1 1 260px",
// //   padding: 12,
// //   borderRadius: 10,
// //   border: "1px solid rgba(255,255,255,0.12)",
// //   background: "#0b1220",
// //   color: "#e5e7eb",
// //   outline: "none",
// //   minWidth: 220,
// // };

// // const tableWrap: React.CSSProperties = {
// //   overflowX: "auto",
// //   width: "100%",
// // };

// // const table: React.CSSProperties = {
// //   width: "100%",
// //   borderCollapse: "collapse",
// //   minWidth: 760,
// // };

// // const th: React.CSSProperties = {
// //   textAlign: "left",
// //   padding: 12,
// //   fontSize: 13,
// //   opacity: 0.85,
// //   borderBottom: "1px solid rgba(255,255,255,0.08)",
// //   whiteSpace: "nowrap",
// // };

// // const td: React.CSSProperties = {
// //   padding: 12,
// //   borderBottom: "1px solid rgba(255,255,255,0.06)",
// //   fontSize: 14,
// //   verticalAlign: "top",
// // };

// // const pill: React.CSSProperties = {
// //   display: "inline-block",
// //   padding: "4px 10px",
// //   borderRadius: 999,
// //   fontSize: 12,
// //   fontWeight: 800,
// // };

// // const empty: React.CSSProperties = {
// //   padding: 14,
// //   opacity: 0.8,
// // };

// // const btn: React.CSSProperties = {
// //   padding: "10px 14px",
// //   background: "#cddc39",
// //   border: "none",
// //   borderRadius: 10,
// //   fontWeight: 900,
// //   cursor: "pointer",
// // };

// // const outlineBtn: React.CSSProperties = {
// //   padding: "10px 14px",
// //   background: "transparent",
// //   color: "#e5e7eb",
// //   border: "1px solid rgba(255,255,255,0.20)",
// //   borderRadius: 10,
// //   fontWeight: 800,
// //   cursor: "pointer",
// // };

// // const miniBtn: React.CSSProperties = {
// //   padding: "9px 12px",
// //   background: "transparent",
// //   color: "#e5e7eb",
// //   border: "1px solid rgba(255,255,255,0.20)",
// //   borderRadius: 10,
// //   fontWeight: 800,
// //   cursor: "pointer",
// // };

// // const dangerBtn: React.CSSProperties = {
// //   padding: "9px 12px",
// //   background: "#7f1d1d",
// //   color: "#fff",
// //   border: "1px solid rgba(255,255,255,0.15)",
// //   borderRadius: 10,
// //   fontWeight: 800,
// //   cursor: "pointer",
// // };

// // const errorBox: React.CSSProperties = {
// //   backgroundColor: "#3b0a0a",
// //   color: "#fecaca",
// //   padding: 12,
// //   borderRadius: 10,
// //   fontSize: 13,
// //   marginBottom: 12,
// //   border: "1px solid rgba(255,255,255,0.12)",
// // };

// // /* ✅ Mobile cards */
// // const cardsWrap: React.CSSProperties = {
// //   display: "grid",
// //   gridTemplateColumns: "1fr",
// //   gap: 12,
// // };

// // const cardItem: React.CSSProperties = {
// //   background: "#0b1220",
// //   border: "1px solid rgba(255,255,255,0.10)",
// //   borderRadius: 14,
// //   padding: 14,
// // };

// // const nameRow: React.CSSProperties = {
// //   display: "flex",
// //   alignItems: "center",
// //   gap: 10,
// //   flexWrap: "wrap",
// // };

// // const nameText: React.CSSProperties = {
// //   fontSize: 16,
// //   fontWeight: 900,
// //   maxWidth: "100%",
// //   overflow: "hidden",
// //   textOverflow: "ellipsis",
// //   whiteSpace: "nowrap",
// // };

// // const metaText: React.CSSProperties = {
// //   marginTop: 6,
// //   opacity: 0.9,
// //   fontSize: 13,
// //   wordBreak: "break-word",
// // };

// // const actionsRow: React.CSSProperties = {
// //   marginTop: 12,
// //   display: "flex",
// //   gap: 10,
// //   flexWrap: "wrap",
// // };

// // /* Show/Hide wrappers via classnames */
// // const mobileOnly: React.CSSProperties = {};
// // const desktopOnly: React.CSSProperties = {};

// // /* Modal */
// // const modalBackdrop: React.CSSProperties = {
// //   position: "fixed",
// //   inset: 0,
// //   background: "rgba(0,0,0,0.65)",
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   padding: 0,
// //   zIndex: 9999,
// // };

// // const modal: React.CSSProperties = {
// //   width: "100%",
// //   maxWidth: 720,
// //   maxHeight: "100vh",
// //   background: "#0f172a",
// //   color: "#e5e7eb",
// //   borderRadius: 14,
// //   border: "1px solid rgba(255,255,255,0.10)",
// //   padding: 16,
// //   overflowY: "auto",
// // };

// // /* We'll add class using style tag pattern */
// // (modal as any).className = "modalBox";

// // const modalHeader: React.CSSProperties = {
// //   display: "flex",
// //   justifyContent: "space-between",
// //   alignItems: "center",
// //   marginBottom: 14,
// //   gap: 10,
// // };

// // const xBtn: React.CSSProperties = {
// //   background: "transparent",
// //   border: "1px solid rgba(255,255,255,0.20)",
// //   color: "#e5e7eb",
// //   borderRadius: 10,
// //   padding: "6px 10px",
// //   cursor: "pointer",
// // };

// // const grid: React.CSSProperties = {
// //   display: "grid",
// //   gridTemplateColumns: "1fr 1fr",
// //   gap: 12,
// // };

// // /* We'll add class for grid too */
// // (grid as any).className = "modalGrid";

// // const field: React.CSSProperties = { display: "flex", flexDirection: "column" };

// // const label: React.CSSProperties = {
// //   fontSize: 13,
// //   fontWeight: 800,
// //   marginBottom: 6,
// //   opacity: 0.9,
// // };

// // const input: React.CSSProperties = {
// //   padding: 12,
// //   borderRadius: 10,
// //   border: "1px solid rgba(255,255,255,0.12)",
// //   background: "#0b1220",
// //   color: "#e5e7eb",
// //   outline: "none",
// // };

// // const modalFooter: React.CSSProperties = {
// //   display: "flex",
// //   justifyContent: "flex-end",
// //   gap: 10,
// //   marginTop: 14,
// //   flexWrap: "wrap",
// // };

// import { useEffect, useMemo, useState } from "react";
// import type React from "react";
// import axios from "../../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// type AdminStaff = {
//   id: number;
//   phone: string;
//   name: string;
//   email: string | null;
//   is_staff: boolean;
//   is_active: boolean;
//   is_superuser?: boolean;
//   date_joined?: string;
// };

// export default function AdminStaffManager() {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const [staff, setStaff] = useState<AdminStaff[]>([]);
//   const [search, setSearch] = useState("");

//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState<number | null>(null);

//   const [form, setForm] = useState({
//     phone: "",
//     name: "",
//     email: "",
//     password: "",
//     is_active: true,
//     is_superuser: false, // ✅ NEW
//   });

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return staff;
//     return staff.filter((u) => {
//       const phone = (u.phone || "").toLowerCase();
//       const name = (u.name || "").toLowerCase();
//       const email = (u.email || "").toLowerCase();
//       return phone.includes(q) || name.includes(q) || email.includes(q);
//     });
//   }, [staff, search]);

//   const resetForm = () => {
//     setEditId(null);
//     setForm({
//       phone: "",
//       name: "",
//       email: "",
//       password: "",
//       is_active: true,
//       is_superuser: false,
//     });
//   };

//   const pickError = (e: any) => {
//     const data = e?.response?.data;
//     if (!data) return "Request failed";

//     if (typeof data === "string") return data;
//     if (data.detail) return String(data.detail);
//     if (data.message) return String(data.message);

//     // DRF field errors {field: ["msg"]}
//     if (typeof data === "object") {
//       const firstKey = Object.keys(data)[0];
//       const firstVal = data[firstKey];
//       if (Array.isArray(firstVal)) return `${firstKey}: ${firstVal[0]}`;
//       return JSON.stringify(data);
//     }
//     return "Request failed";
//   };

//   const fetchStaff = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("/auth/admin/staff/");
//       setStaff(res.data || []);
//     } catch (e: any) {
//       setError(pickError(e));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   const openCreate = () => {
//     resetForm();
//     setShowForm(true);
//   };

//   const openEdit = (u: AdminStaff) => {
//     setEditId(u.id);
//     setForm({
//       phone: u.phone || "",
//       name: u.name || "",
//       email: u.email || "",
//       password: "",
//       is_active: !!u.is_active,
//       is_superuser: !!u.is_superuser,
//     });
//     setShowForm(true);
//   };

//   const validate = () => {
//     const phone = form.phone.replace(/\D/g, "");
//     if (phone.length !== 10) return "Phone must be 10 digits";
//     if (!form.name.trim()) return "Name is required";
//     if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter valid email";

//     // superuser ke liye password strongly recommended (backend bhi require karega)
//     if (form.is_superuser && form.password.trim().length < 6 && !editId) {
//       return "Superuser password must be at least 6 characters";
//     }

//     if (!editId && form.password.trim().length < 6) return "Password must be at least 6 characters";
//     if (editId && form.password.trim() && form.password.trim().length < 6) return "Password must be at least 6 characters";

//     return "";
//   };

//   const handleSave = async () => {
//     const err = validate();
//     if (err) {
//       setError(err);
//       return;
//     }

//     setSaving(true);
//     setError("");

//     const payload: any = {
//       phone: form.phone.replace(/\D/g, ""),
//       name: form.name.trim(),
//       email: form.email.trim(),
//       is_active: form.is_active,
//       is_superuser: form.is_superuser, // ✅ send to backend
//     };

//     if (form.password.trim()) payload.password = form.password.trim();

//     try {
//       if (editId) {
//         await axios.patch(`/auth/admin/staff/${editId}/`, payload);
//       } else {
//         await axios.post("/auth/admin/staff/", payload);
//       }

//       setShowForm(false);
//       resetForm();
//       await fetchStaff();
//     } catch (e: any) {
//       setError(pickError(e));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Delete this admin?")) return;
//     setSaving(true);
//     setError("");
//     try {
//       await axios.delete(`/auth/admin/staff/${id}/`);
//       await fetchStaff();
//     } catch (e: any) {
//       setError(pickError(e));
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div style={page}>
//       <style>{responsiveCss}</style>

//       <div style={wrap}>
//         {/* HEADER */}
//         <div style={header}>
//           <div style={{ minWidth: 0 }}>
//             <h1 style={h1}>Admin Staff</h1>
//             <p style={sub}>Create / update admin accounts (staff + superuser)</p>
//           </div>

//           <div style={headerBtns}>
//             <button style={outlineBtn} onClick={() => navigate("/admin/dashboard")}>
//               Back
//             </button>
//             <button style={btn} onClick={openCreate}>
//               + Create Admin
//             </button>
//           </div>
//         </div>

//         {/* CARD */}
//         <div style={card}>
//           <div style={topRow}>
//             <input
//               style={searchInput}
//               placeholder="Search by name, email, phone..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//               <button style={miniBtn} onClick={fetchStaff} disabled={loading}>
//                 {loading ? "Refreshing..." : "Refresh"}
//               </button>
//               <button style={miniBtn} onClick={openCreate}>
//                 + Add
//               </button>
//             </div>
//           </div>

//           {error && <div style={errorBox}>{error}</div>}

//           {loading ? (
//             <div style={empty}>Loading...</div>
//           ) : filtered.length === 0 ? (
//             <div style={empty}>No admin staff found.</div>
//           ) : (
//             <>
//               {/* Mobile cards */}
//               <div className="mobile-only">
//                 <div style={cardsWrap}>
//                   {filtered.map((u) => (
//                     <div key={u.id} style={cardItem}>
//                       <div style={nameRow}>
//                         <span style={nameText}>{u.name || "—"}</span>

//                         <span
//                           style={{
//                             ...pill,
//                             background: u.is_active ? "#ecfdf5" : "#fef2f2",
//                             color: u.is_active ? "#047857" : "#b91c1c",
//                           }}
//                         >
//                           {u.is_active ? "Active" : "Disabled"}
//                         </span>

//                         {u.is_superuser ? (
//                           <span style={{ ...pill, background: "#e0f2fe", color: "#075985" }}>Superuser</span>
//                         ) : (
//                           <span style={{ ...pill, background: "#f3f4f6", color: "#111827" }}>Staff</span>
//                         )}
//                       </div>

//                       <div style={metaText}>ID: {u.id}</div>
//                       <div style={metaText}>Phone: {u.phone}</div>
//                       <div style={metaText}>Email: {u.email || "—"}</div>

//                       <div style={actionsRow}>
//                         <button style={miniBtn} onClick={() => openEdit(u)}>
//                           Edit
//                         </button>
//                         <button style={dangerBtn} onClick={() => handleDelete(u.id)} disabled={saving}>
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Desktop table */}
//               <div className="desktop-only">
//                 <div style={tableWrap}>
//                   <table style={table}>
//                     <thead>
//                       <tr>
//                         <th style={th}>ID</th>
//                         <th style={th}>Phone</th>
//                         <th style={th}>Name</th>
//                         <th style={th}>Email</th>
//                         <th style={th}>Role</th>
//                         <th style={th}>Active</th>
//                         <th style={{ ...th, width: 230 }}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filtered.map((u) => (
//                         <tr key={u.id}>
//                           <td style={td}>{u.id}</td>
//                           <td style={td}>{u.phone}</td>
//                           <td style={td}>{u.name || "-"}</td>
//                           <td style={td}>{u.email || "-"}</td>
//                           <td style={td}>{u.is_superuser ? "Superuser" : "Staff"}</td>
//                           <td style={td}>
//                             <span
//                               style={{
//                                 ...pill,
//                                 background: u.is_active ? "#ecfdf5" : "#fef2f2",
//                                 color: u.is_active ? "#047857" : "#b91c1c",
//                               }}
//                             >
//                               {u.is_active ? "Active" : "Disabled"}
//                             </span>
//                           </td>
//                           <td style={td}>
//                             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                               <button style={miniBtn} onClick={() => openEdit(u)}>
//                                 Edit
//                               </button>
//                               <button style={dangerBtn} onClick={() => handleDelete(u.id)} disabled={saving}>
//                                 Delete
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       {showForm && (
//         <div style={modalBackdrop} onClick={() => !saving && setShowForm(false)}>
//           <div className="modalBox" style={modal} onClick={(e) => e.stopPropagation()}>
//             <div style={modalHeader}>
//               <h2 style={{ margin: 0, fontSize: 18 }}>
//                 {editId ? `Edit Admin #${editId}` : "Create Admin"}
//               </h2>
//               <button style={xBtn} onClick={() => !saving && setShowForm(false)}>
//                 ✕
//               </button>
//             </div>

//             <div className="modalGrid" style={grid}>
//               <div style={field}>
//                 <label style={label}>Phone (10 digits)</label>
//                 <input
//                   style={input}
//                   maxLength={10}
//                   value={form.phone}
//                   onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
//                   placeholder="9999999999"
//                 />
//               </div>

//               <div style={field}>
//                 <label style={label}>Name</label>
//                 <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//               </div>

//               <div style={field}>
//                 <label style={label}>Email</label>
//                 <input
//                   style={input}
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   placeholder="admin@gmail.com"
//                 />
//               </div>

//               <div style={field}>
//                 <label style={label}>
//                   Password {editId ? "(optional)" : "(required)"} {form.is_superuser ? "(required for superuser)" : ""}
//                 </label>
//                 <input
//                   style={input}
//                   type="password"
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   placeholder={editId ? "Leave blank to keep same" : "Set password"}
//                 />
//               </div>

//               <div style={{ ...field, flexDirection: "row", alignItems: "center", gap: 10 }}>
//                 <input
//                   type="checkbox"
//                   checked={form.is_active}
//                   onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
//                 />
//                 <label style={{ ...label, marginBottom: 0 }}>Active</label>
//               </div>

//               <div style={{ ...field, flexDirection: "row", alignItems: "center", gap: 10 }}>
//                 <input
//                   type="checkbox"
//                   checked={form.is_superuser}
//                   onChange={(e) => setForm({ ...form, is_superuser: e.target.checked })}
//                 />
//                 <label style={{ ...label, marginBottom: 0 }}>Make Superuser</label>
//               </div>
//             </div>

//             {error && <div style={{ ...errorBox, marginTop: 10 }}>{error}</div>}

//             <div style={modalFooter}>
//               <button
//                 style={outlineBtn}
//                 onClick={() => {
//                   if (saving) return;
//                   setShowForm(false);
//                   resetForm();
//                 }}
//               >
//                 Cancel
//               </button>
//               <button style={btn} onClick={handleSave} disabled={saving}>
//                 {saving ? "Saving..." : "Save"}
//               </button>
//             </div>

//             <p style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
//               Note: Superuser toggle will work only if currently logged-in admin is a Superuser.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* Responsive CSS */
// const responsiveCss = `
//   .mobile-only{ display:block; }
//   .desktop-only{ display:none; }
//   @media (min-width: 900px){
//     .mobile-only{ display:none; }
//     .desktop-only{ display:block; }
//   }
//   @media (max-width: 560px){
//     .modalBox{
//       width: 100% !important;
//       height: 100% !important;
//       max-width: 100% !important;
//       max-height: 100% !important;
//       border-radius: 0 !important;
//     }
//     .modalGrid{ grid-template-columns: 1fr !important; }
//   }
//   @media (min-width: 561px) and (max-width: 900px){
//     .modalGrid{ grid-template-columns: 1fr !important; }
//   }
// `;

// /* Styles */
// const page: React.CSSProperties = { minHeight: "100vh", width: "100%", background: "#0b1220", color: "#e5e7eb" };
// const wrap: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "18px 14px", fontFamily: "'Inter','Segoe UI',sans-serif" };
// const header: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 16, flexWrap: "wrap" };
// const headerBtns: React.CSSProperties = { display: "flex", gap: 10, flexWrap: "wrap" };
// const h1: React.CSSProperties = { margin: 0, fontSize: 26, fontWeight: 900 };
// const sub: React.CSSProperties = { margin: "6px 0 0", opacity: 0.8, fontSize: 14 };

// const card: React.CSSProperties = { background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 14, boxShadow: "0 18px 38px rgba(0,0,0,0.35)" };
// const topRow: React.CSSProperties = { display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: 12 };
// const searchInput: React.CSSProperties = { flex: "1 1 260px", padding: 12, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "#0b1220", color: "#e5e7eb", outline: "none", minWidth: 220 };

// const tableWrap: React.CSSProperties = { overflowX: "auto", width: "100%" };
// const table: React.CSSProperties = { width: "100%", borderCollapse: "collapse", minWidth: 820 };
// const th: React.CSSProperties = { textAlign: "left", padding: 12, fontSize: 13, opacity: 0.85, borderBottom: "1px solid rgba(255,255,255,0.08)", whiteSpace: "nowrap" };
// const td: React.CSSProperties = { padding: 12, borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 14, verticalAlign: "top" };

// const pill: React.CSSProperties = { display: "inline-block", padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 900 };
// const empty: React.CSSProperties = { padding: 14, opacity: 0.8 };

// const btn: React.CSSProperties = { padding: "10px 14px", background: "#cddc39", border: "none", borderRadius: 10, fontWeight: 900, cursor: "pointer" };
// const outlineBtn: React.CSSProperties = { padding: "10px 14px", background: "transparent", color: "#e5e7eb", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 10, fontWeight: 800, cursor: "pointer" };
// const miniBtn: React.CSSProperties = { padding: "9px 12px", background: "transparent", color: "#e5e7eb", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 10, fontWeight: 800, cursor: "pointer" };
// const dangerBtn: React.CSSProperties = { padding: "9px 12px", background: "#7f1d1d", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontWeight: 800, cursor: "pointer" };

// const errorBox: React.CSSProperties = { backgroundColor: "#3b0a0a", color: "#fecaca", padding: 12, borderRadius: 10, fontSize: 13, marginBottom: 12, border: "1px solid rgba(255,255,255,0.12)" };

// const cardsWrap: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr", gap: 12 };
// const cardItem: React.CSSProperties = { background: "#0b1220", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 14 };
// const nameRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" };
// const nameText: React.CSSProperties = { fontSize: 16, fontWeight: 900, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
// const metaText: React.CSSProperties = { marginTop: 6, opacity: 0.9, fontSize: 13, wordBreak: "break-word" };
// const actionsRow: React.CSSProperties = { marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" };

// const modalBackdrop: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", justifyContent: "center", alignItems: "center", padding: 0, zIndex: 9999 };
// const modal: React.CSSProperties = { width: "100%", maxWidth: 720, maxHeight: "100vh", background: "#0f172a", borderRadius: 14, border: "1px solid rgba(255,255,255,0.10)", padding: 16, overflowY: "auto" };

// const modalHeader: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 10 };
// const xBtn: React.CSSProperties = { background: "transparent", border: "1px solid rgba(255,255,255,0.20)", color: "#e5e7eb", borderRadius: 10, padding: "6px 10px", cursor: "pointer" };

// const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
// const field: React.CSSProperties = { display: "flex", flexDirection: "column" };
// const label: React.CSSProperties = { fontSize: 13, fontWeight: 900, marginBottom: 6, opacity: 0.9 };
// const input: React.CSSProperties = { padding: 12, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "#0b1220", color: "#e5e7eb", outline: "none" };

// const modalFooter: React.CSSProperties = { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14, flexWrap: "wrap" };
import { useEffect, useMemo, useState } from "react";
import type React from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

type AdminStaff = {
  id: number;
  phone: string;
  name: string;
  email: string | null;
  is_staff: boolean;
  is_active: boolean;
  is_superuser?: boolean;
  date_joined?: string;
};

export default function AdminStaffManager() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [staff, setStaff] = useState<AdminStaff[]>([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    phone: "",
    name: "",
    email: "",
    password: "",
    is_active: true,
    is_superuser: false,
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter((u) => {
      const phone = (u.phone || "").toLowerCase();
      const name = (u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return phone.includes(q) || name.includes(q) || email.includes(q);
    });
  }, [staff, search]);

  const resetForm = () => {
    setEditId(null);
    setForm({
      phone: "",
      name: "",
      email: "",
      password: "",
      is_active: true,
      is_superuser: false,
    });
  };

  const pickError = (e: any) => {
    const data = e?.response?.data;
    if (!data) return "Request failed";

    if (typeof data === "string") return data;
    if (data.detail) return String(data.detail);
    if (data.message) return String(data.message);

    // DRF field errors {field: ["msg"]}
    if (typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      const firstVal = data[firstKey];
      if (Array.isArray(firstVal)) return `${firstKey}: ${firstVal[0]}`;
      return JSON.stringify(data);
    }
    return "Request failed";
  };

  const fetchStaff = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/auth/admin/staff/");
      setStaff(res.data || []);
    } catch (e: any) {
      setError(pickError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (u: AdminStaff) => {
    setEditId(u.id);
    setForm({
      phone: u.phone || "",
      name: u.name || "",
      email: u.email || "",
      password: "",
      is_active: !!u.is_active,
      is_superuser: !!u.is_superuser,
    });
    setShowForm(true);
  };

  const validate = () => {
    const phone = form.phone.replace(/\D/g, "");
    if (phone.length !== 10) return "Phone must be 10 digits";
    if (!form.name.trim()) return "Name is required";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter valid email";

    if (form.is_superuser && form.password.trim().length < 6 && !editId) {
      return "Superuser password must be at least 6 characters";
    }

    if (!editId && form.password.trim().length < 6) return "Password must be at least 6 characters";
    if (editId && form.password.trim() && form.password.trim().length < 6) return "Password must be at least 6 characters";

    return "";
  };

  const handleSave = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setSaving(true);
    setError("");

    const payload: any = {
      phone: form.phone.replace(/\D/g, ""),
      name: form.name.trim(),
      email: form.email.trim(),
      is_active: form.is_active,
      is_superuser: form.is_superuser,
    };

    if (form.password.trim()) payload.password = form.password.trim();

    try {
      if (editId) {
        await axios.patch(`/auth/admin/staff/${editId}/`, payload);
      } else {
        await axios.post("/auth/admin/staff/", payload);
      }

      setShowForm(false);
      resetForm();
      await fetchStaff();
    } catch (e: any) {
      setError(pickError(e));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this admin?")) return;
    setSaving(true);
    setError("");
    try {
      await axios.delete(`/auth/admin/staff/${id}/`);
      await fetchStaff();
    } catch (e: any) {
      setError(pickError(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={page}>
      <style>{responsiveCss}</style>

      <div style={wrap}>
        {/* HEADER */}
        <div className="header" style={header}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={h1}>Admin Staff</h1>
            <p style={sub}>Create / update admin accounts (staff + superuser)</p>
          </div>

          <div className="header-btns" style={headerBtns}>
            <button style={outlineBtn} onClick={() => navigate("/admin/dashboard")}>
              Back
            </button>
            <button style={btn} onClick={openCreate}>
              + Create Admin
            </button>
          </div>
        </div>

        {/* CARD */}
        <div style={card}>
          <div className="top-row" style={topRow}>
            <input
              className="search-input"
              style={searchInput}
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={miniBtn} onClick={fetchStaff} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </button>
              <button style={miniBtn} onClick={openCreate}>
                + Add
              </button>
            </div>
          </div>

          {error && <div style={errorBox}>{error}</div>}

          {loading ? (
            <div style={empty}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={empty}>No admin staff found.</div>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="mobile-only">
                <div className="cards-wrap-mobile" style={cardsWrap}>
                  {filtered.map((u) => (
                    <div key={u.id} className="card-item-mobile" style={cardItem}>
                      <div style={nameRow}>
                        <span style={nameText}>{u.name || "—"}</span>

                        <span
                          style={{
                            ...pill,
                            background: u.is_active ? "#ecfdf5" : "#fef2f2",
                            color: u.is_active ? "#047857" : "#b91c1c",
                          }}
                        >
                          {u.is_active ? "Active" : "Disabled"}
                        </span>

                        {u.is_superuser ? (
                          <span style={{ ...pill, background: "#e0f2fe", color: "#075985" }}>Superuser</span>
                        ) : (
                          <span style={{ ...pill, background: "#f3f4f6", color: "#111827" }}>Staff</span>
                        )}
                      </div>

                      <div style={metaText}>ID: {u.id}</div>
                      <div style={metaText}>Phone: {u.phone}</div>
                      <div style={metaText}>Email: {u.email || "—"}</div>

                      <div className="actions-row-mobile" style={actionsRow}>
                        <button style={miniBtn} onClick={() => openEdit(u)}>
                          Edit
                        </button>
                        <button style={dangerBtn} onClick={() => handleDelete(u.id)} disabled={saving}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop table */}
              <div className="desktop-only">
                <div style={tableWrap}>
                  <table style={table}>
                    <thead>
                      <tr>
                        <th style={th}>ID</th>
                        <th style={th}>Phone</th>
                        <th style={th}>Name</th>
                        <th style={th}>Email</th>
                        <th style={th}>Role</th>
                        <th style={th}>Active</th>
                        <th style={{ ...th, width: 230 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((u) => (
                        <tr key={u.id}>
                          <td style={td}>{u.id}</td>
                          <td style={td}>{u.phone}</td>
                          <td style={td}>{u.name || "-"}</td>
                          <td style={td}>{u.email || "-"}</td>
                          <td style={td}>{u.is_superuser ? "Superuser" : "Staff"}</td>
                          <td style={td}>
                            <span
                              style={{
                                ...pill,
                                background: u.is_active ? "#ecfdf5" : "#fef2f2",
                                color: u.is_active ? "#047857" : "#b91c1c",
                              }}
                            >
                              {u.is_active ? "Active" : "Disabled"}
                            </span>
                          </td>
                          <td style={td}>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                              <button style={miniBtn} onClick={() => openEdit(u)}>
                                Edit
                              </button>
                              <button style={dangerBtn} onClick={() => handleDelete(u.id)} disabled={saving}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div style={modalBackdrop} onClick={() => !saving && setShowForm(false)}>
          <div className="modalBox" style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={{ margin: 0, fontSize: 18 }}>
                {editId ? `Edit Admin #${editId}` : "Create Admin"}
              </h2>
              <button style={xBtn} onClick={() => !saving && setShowForm(false)}>
                ✕
              </button>
            </div>

            <div className="modalGrid" style={grid}>
              <div style={field}>
                <label style={label}>Phone (10 digits)</label>
                <input
                  style={input}
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  placeholder="9999999999"
                />
              </div>

              <div style={field}>
                <label style={label}>Name</label>
                <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>

              <div style={field}>
                <label style={label}>Email</label>
                <input
                  style={input}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@gmail.com"
                />
              </div>

              <div style={field}>
                <label style={label}>
                  Password {editId ? "(optional)" : "(required)"} {form.is_superuser ? "(required for superuser)" : ""}
                </label>
                <input
                  style={input}
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={editId ? "Leave blank to keep same" : "Set password"}
                />
              </div>

              <div style={{ ...field, flexDirection: "row", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                />
                <label style={{ ...label, marginBottom: 0 }}>Active</label>
              </div>

              <div style={{ ...field, flexDirection: "row", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox"
                  checked={form.is_superuser}
                  onChange={(e) => setForm({ ...form, is_superuser: e.target.checked })}
                />
                <label style={{ ...label, marginBottom: 0 }}>Make Superuser</label>
              </div>
            </div>

            {error && <div style={{ ...errorBox, marginTop: 10 }}>{error}</div>}

            <div className="modal-footer" style={modalFooter}>
              <button
                style={outlineBtn}
                onClick={() => {
                  if (saving) return;
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button style={btn} onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>

            <p style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
              Note: Superuser toggle will work only if currently logged-in admin is a Superuser.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* Responsive CSS */
const responsiveCss = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    overflow-x: hidden;
    width: 100%;
  }
  
  .mobile-only{ display:block; }
  .desktop-only{ display:none; }
  
  @media (min-width: 768px){
    .mobile-only{ display:none; }
    .desktop-only{ display:block; }
  }
  
  @media (max-width: 767px){
    .cards-wrap-mobile {
      grid-template-columns: 1fr !important;
      gap: 10px !important;
    }
    
    .card-item-mobile {
      padding: 12px !important;
    }
    
    .actions-row-mobile {
      flex-direction: column !important;
      gap: 8px !important;
    }
    
    .actions-row-mobile button {
      width: 100% !important;
    }
  }
  
  @media (max-width: 480px){
    .header {
      flex-direction: column !important;
      gap: 16px !important;
      align-items: stretch !important;
    }
    
    .header-btns {
      width: 100% !important;
      display: flex !important;
      gap: 8px !important;
    }
    
    .header-btns button {
      flex: 1 !important;
      min-width: 120px !important;
      padding: 12px 8px !important;
      font-size: 14px !important;
    }
    
    .top-row {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 12px !important;
    }
    
    .search-input {
      width: 100% !important;
      min-width: unset !important;
      padding: 14px 12px !important;
    }
  }
  
  /* Modal responsiveness */
  @media (max-width: 640px){
    .modalBox{
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      border-radius: 0 !important;
      margin: 0 !important;
      padding: 16px !important;
      display: flex !important;
      flex-direction: column !important;
    }
    
    .modalGrid{ 
      grid-template-columns: 1fr !important;
      gap: 16px !important;
      flex: 1 !important;
      overflow-y: auto !important;
    }
    
    .modal-footer {
      flex-direction: column !important;
      gap: 10px !important;
      width: 100% !important;
    }
    
    .modal-footer button {
      width: 100% !important;
      padding: 14px !important;
    }
  }
  
  @media (min-width: 641px) and (max-width: 1024px){
    .modalBox{
      width: 90vw !important;
      max-width: 600px !important;
      max-height: 90vh !important;
    }
    
    .modalGrid{ 
      grid-template-columns: 1fr !important;
    }
  }
  
  /* Tablet specific */
  @media (min-width: 768px) and (max-width: 1024px){
    .table-wrap {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch !important;
    }
    
    table {
      min-width: 700px !important;
    }
  }
  
  /* Large screen */
  @media (min-width: 1200px){
    .cards-wrap-mobile {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
    }
  }
`;

/* Styles */
const page: React.CSSProperties = { 
  minHeight: "100vh", 
  width: "100vw",
  background: "#0b1220", 
  color: "#e5e7eb",
  overflowX: "hidden"
};

const wrap: React.CSSProperties = { 
  maxWidth: "100%",
  margin: "0 auto", 
  padding: "18px 14px", 
  fontFamily: "'Inter','Segoe UI',sans-serif",
  boxSizing: "border-box"
};

const header: React.CSSProperties = { 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "flex-start", 
  gap: 12, 
  marginBottom: 16, 
  flexWrap: "wrap" 
};

const headerBtns: React.CSSProperties = { 
  display: "flex", 
  gap: 10, 
  flexWrap: "wrap" 
};

const h1: React.CSSProperties = { 
  margin: 0, 
  fontSize: "clamp(22px, 4vw, 26px)", 
  fontWeight: 900 
};

const sub: React.CSSProperties = { 
  margin: "6px 0 0", 
  opacity: 0.8, 
  fontSize: "clamp(12px, 2vw, 14px)" 
};

const card: React.CSSProperties = { 
  background: "#0f172a", 
  border: "1px solid rgba(255,255,255,0.08)", 
  borderRadius: 14, 
  padding: 14, 
  boxShadow: "0 18px 38px rgba(0,0,0,0.35)",
  width: "100%",
  boxSizing: "border-box"
};

const topRow: React.CSSProperties = { 
  display: "flex", 
  gap: 10, 
  flexWrap: "wrap", 
  justifyContent: "space-between", 
  alignItems: "center", 
  marginBottom: 12 
};

const searchInput: React.CSSProperties = { 
  flex: "1 1 260px", 
  padding: 12, 
  borderRadius: 10, 
  border: "1px solid rgba(255,255,255,0.12)", 
  background: "#0b1220", 
  color: "#e5e7eb", 
  outline: "none", 
  minWidth: 220,
  fontSize: "14px"
};

const tableWrap: React.CSSProperties = { 
  overflowX: "auto", 
  width: "100%",
  WebkitOverflowScrolling: "touch",
  msOverflowStyle: "-ms-autohiding-scrollbar"
};

const table: React.CSSProperties = { 
  width: "100%", 
  borderCollapse: "collapse", 
  minWidth: 820 
};

const th: React.CSSProperties = { 
  textAlign: "left", 
  padding: 12, 
  fontSize: 13, 
  opacity: 0.85, 
  borderBottom: "1px solid rgba(255,255,255,0.08)", 
  whiteSpace: "nowrap" 
};

const td: React.CSSProperties = { 
  padding: 12, 
  borderBottom: "1px solid rgba(255,255,255,0.06)", 
  fontSize: 14, 
  verticalAlign: "top" 
};

const pill: React.CSSProperties = { 
  display: "inline-block", 
  padding: "4px 10px", 
  borderRadius: 999, 
  fontSize: 12, 
  fontWeight: 900 
};

const empty: React.CSSProperties = { 
  padding: 14, 
  opacity: 0.8, 
  textAlign: "center" 
};

const btn: React.CSSProperties = { 
  padding: "12px 20px", 
  background: "#cddc39", 
  border: "none", 
  borderRadius: 10, 
  fontWeight: 900, 
  cursor: "pointer",
  fontSize: "14px",
  minHeight: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  transition: "all 0.2s ease"
};

const outlineBtn: React.CSSProperties = { 
  padding: "12px 20px", 
  background: "transparent", 
  color: "#e5e7eb", 
  border: "1px solid rgba(255,255,255,0.20)", 
  borderRadius: 10, 
  fontWeight: 800, 
  cursor: "pointer",
  fontSize: "14px",
  minHeight: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease"
};

const miniBtn: React.CSSProperties = { 
  padding: "10px 16px", 
  background: "transparent", 
  color: "#e5e7eb", 
  border: "1px solid rgba(255,255,255,0.20)", 
  borderRadius: 10, 
  fontWeight: 800, 
  cursor: "pointer",
  fontSize: "14px",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease"
};

const dangerBtn: React.CSSProperties = { 
  padding: "10px 16px", 
  background: "#7f1d1d", 
  color: "#fff", 
  border: "1px solid rgba(255,255,255,0.15)", 
  borderRadius: 10, 
  fontWeight: 800, 
  cursor: "pointer",
  fontSize: "14px",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease"
};

const errorBox: React.CSSProperties = { 
  backgroundColor: "#3b0a0a", 
  color: "#fecaca", 
  padding: 12, 
  borderRadius: 10, 
  fontSize: 13, 
  marginBottom: 12, 
  border: "1px solid rgba(255,255,255,0.12)" 
};

const cardsWrap: React.CSSProperties = { 
  display: "grid", 
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 12,
  padding: "8px 4px"
};

const cardItem: React.CSSProperties = { 
  background: "#0b1220", 
  border: "1px solid rgba(255,255,255,0.10)", 
  borderRadius: 14, 
  padding: 14,
  minHeight: 180
};

const nameRow: React.CSSProperties = { 
  display: "flex", 
  alignItems: "center", 
  gap: 10, 
  flexWrap: "wrap",
  marginBottom: 8
};

const nameText: React.CSSProperties = { 
  fontSize: 16, 
  fontWeight: 900, 
  maxWidth: "100%", 
  overflow: "hidden", 
  textOverflow: "ellipsis", 
  whiteSpace: "nowrap",
  flex: 1
};

const metaText: React.CSSProperties = { 
  marginTop: 6, 
  opacity: 0.9, 
  fontSize: 13, 
  wordBreak: "break-word" 
};

const actionsRow: React.CSSProperties = { 
  marginTop: 12, 
  display: "flex", 
  gap: 10, 
  flexWrap: "wrap" 
};

const modalBackdrop: React.CSSProperties = { 
  position: "fixed", 
  inset: 0, 
  background: "rgba(0,0,0,0.85)", 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  padding: "16px",
  zIndex: 9999,
  overflow: "auto"
};

const modal: React.CSSProperties = { 
  width: "100%", 
  maxWidth: "90vw",
  maxHeight: "90vh",
  background: "#0f172a", 
  borderRadius: 14, 
  border: "1px solid rgba(255,255,255,0.10)", 
  padding: 20,
  overflowY: "auto",
  margin: "auto",
  boxSizing: "border-box"
};

const modalHeader: React.CSSProperties = { 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  marginBottom: 20, 
  gap: 10 
};

const xBtn: React.CSSProperties = { 
  background: "transparent", 
  border: "1px solid rgba(255,255,255,0.20)", 
  color: "#e5e7eb", 
  borderRadius: 10, 
  padding: "8px 12px", 
  cursor: "pointer",
  fontSize: "16px",
  minWidth: "40px",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const grid: React.CSSProperties = { 
  display: "grid", 
  gridTemplateColumns: "1fr 1fr", 
  gap: 16 
};

const field: React.CSSProperties = { 
  display: "flex", 
  flexDirection: "column" 
};

const label: React.CSSProperties = { 
  fontSize: 13, 
  fontWeight: 900, 
  marginBottom: 6, 
  opacity: 0.9 
};

const input: React.CSSProperties = { 
  padding: 14, 
  borderRadius: 10, 
  border: "1px solid rgba(255,255,255,0.12)", 
  background: "#0b1220", 
  color: "#e5e7eb", 
  outline: "none",
  fontSize: "14px"
};

const modalFooter: React.CSSProperties = { 
  display: "flex", 
  justifyContent: "flex-end", 
  gap: 10, 
  marginTop: 20, 
  flexWrap: "wrap" 
};