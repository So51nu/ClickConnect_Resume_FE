// import React, { useEffect, useMemo, useState } from "react";
// import axios from "../../api/axiosInstance";

// type Student = {
//   id: number;
//   phone: string;
//   name: string;
//   email?: string;
//   pincode: string;
//   date_joined?: string;
// };

// function todayDDMMYYYY() {
//   const d = new Date();
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   return `${dd}/${mm}/${yyyy}`;
// }

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
//     backgroundColor: "#f8fafc",
//     borderRadius: 14,
//   },
//   headerRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 12,
//     flexWrap: "wrap",
//     marginBottom: 14,
//   },
//   title: { margin: 0, fontSize: 20, fontWeight: 900, color: "#0f172a" },
//   sub: { margin: "6px 0 0", color: "#64748b", fontSize: 13, fontWeight: 650 },

//   btnPrimary: {
//     backgroundColor: "#4f46e5",
//     color: "#fff",
//     border: "1px solid #4338ca",
//     padding: "10px 14px",
//     borderRadius: 12,
//     cursor: "pointer",
//     fontWeight: 900,
//     boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
//   },
//   btnGhost: {
//     backgroundColor: "#fff",
//     color: "#0f172a",
//     border: "1px solid #e2e8f0",
//     padding: "10px 14px",
//     borderRadius: 12,
//     cursor: "pointer",
//     fontWeight: 850,
//   },
//   btnDanger: {
//     backgroundColor: "#fee2e2",
//     color: "#b91c1c",
//     border: "1px solid #fecaca",
//     padding: "8px 10px",
//     borderRadius: 12,
//     cursor: "pointer",
//     fontWeight: 850,
//   },

//   filters: {
//     backgroundColor: "#fff",
//     border: "1px solid #e2e8f0",
//     borderRadius: 14,
//     padding: 12,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 10,
//     flexWrap: "wrap",
//     marginBottom: 12,
//   },
//   input: {
//     padding: "9px 12px",
//     border: "1px solid #d1d5db",
//     borderRadius: 12,
//     fontSize: 14,
//     outline: "none",
//     minWidth: 260,
//   },

//   tableWrap: {
//     backgroundColor: "#fff",
//     border: "1px solid #e2e8f0",
//     borderRadius: 14,
//     overflow: "hidden",
//   },
//   scrollX: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", minWidth: 820 },
//   thRow: { backgroundColor: "#f8fafc" },
//   th: { textAlign: "left", padding: 12, color: "#64748b", fontSize: 13, fontWeight: 900 },
//   td: { padding: 12, borderTop: "1px solid #f1f5f9", fontSize: 14, color: "#0f172a" },

//   pill: {
//     display: "inline-flex",
//     alignItems: "center",
//     padding: "5px 10px",
//     borderRadius: 999,
//     fontSize: 12,
//     fontWeight: 850,
//     border: "1px solid #e2e8f0",
//     color: "#334155",
//     backgroundColor: "#f1f5f9",
//   },

//   // Modal
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(15,23,42,0.45)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     zIndex: 60,
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
//   modalTitle: { margin: 0, fontSize: 16, fontWeight: 900, color: "#111827" },
//   modalBody: { padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
//   field: { display: "flex", flexDirection: "column", gap: 6 },
//   label: { fontSize: 12, fontWeight: 900, color: "#374151" },
//   full: { gridColumn: "1 / -1" },
//   error: {
//     gridColumn: "1 / -1",
//     backgroundColor: "#fef2f2",
//     color: "#991b1b",
//     border: "1px solid #fecaca",
//     padding: "10px 12px",
//     borderRadius: 12,
//     fontSize: 13,
//     fontWeight: 700,
//   },
//   modalFooter: {
//     padding: "14px 18px",
//     borderTop: "1px solid #eef2f7",
//     display: "flex",
//     justifyContent: "flex-end",
//     gap: 10,
//   },
// };

// export default function Students() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");

//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState<"add" | "edit">("add");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [err, setErr] = useState("");

//   const [form, setForm] = useState({
//     phone: "",
//     name: "",
//     email: "",
//     pincode: "",
//   });

//   const filtered = useMemo(() => {
//     const s = search.trim().toLowerCase();
//     if (!s) return students;
//     return students.filter((u) => {
//       const hay = `${u.name} ${u.phone} ${u.email || ""} ${u.pincode}`.toLowerCase();
//       return hay.includes(s);
//     });
//   }, [students, search]);

//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       // ✅ your AdminDashboard already uses this endpoint
//       const res = await axios.get("/auth/admin/users/");
//       setStudents(res.data || []);
//     } catch (e) {
//       console.error(e);
//       alert("Failed to load students.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const openAdd = () => {
//     setMode("add");
//     setEditingId(null);
//     setErr("");
//     setForm({ phone: "", name: "", email: "", pincode: "" });
//     setOpen(true);
//   };

//   const openEdit = (u: Student) => {
//     setMode("edit");
//     setEditingId(u.id);
//     setErr("");
//     setForm({
//       phone: u.phone || "",
//       name: u.name || "",
//       email: u.email || "",
//       pincode: u.pincode || "",
//     });
//     setOpen(true);
//   };

//   const closeModal = () => setOpen(false);

//   const validate = () => {
//     const phone = form.phone.trim();
//     const name = form.name.trim();
//     const pincode = form.pincode.trim();

//     if (!phone) return "Phone required";
//     if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits";
//     if (!name) return "Name required";
//     if (pincode && !/^\d{6}$/.test(pincode)) return "Pincode must be 6 digits";
//     return "";
//   };

//   const submit = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     setErr("");

//     const v = validate();
//     if (v) {
//       setErr(v);
//       return;
//     }

//     try {
//       if (mode === "add") {
//         const res = await axios.post("/auth/admin/users/", {
//           phone: form.phone.trim(),
//           name: form.name.trim(),
//           email: form.email.trim(),
//           pincode: form.pincode.trim(),
//         });
//         // add at top
//         setStudents((prev) => [res.data, ...prev]);
//         setOpen(false);
//         return;
//       }

//       if (!editingId) {
//         setErr("Missing user id");
//         return;
//       }

//       // PATCH for edit
//       const res = await axios.patch(`/auth/admin/users/${editingId}/`, {
//         phone: form.phone.trim(),
//         name: form.name.trim(),
//         email: form.email.trim(),
//         pincode: form.pincode.trim(),
//       });

//       setStudents((prev) => prev.map((u) => (u.id === editingId ? res.data : u)));
//       setOpen(false);
//     } catch (e: any) {
//       console.error(e);
//       const msg =
//         e?.response?.data
//           ? JSON.stringify(e.response.data)
//           : "Save failed";
//       setErr(msg);
//     }
//   };

//   const remove = async (id: number) => {
//     const ok = window.confirm("Delete this student?");
//     if (!ok) return;

//     try {
//       await axios.delete(`/auth/admin/users/${id}/`);
//       setStudents((prev) => prev.filter((u) => u.id !== id));
//     } catch (e) {
//       console.error(e);
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.headerRow}>
//         <div>
//           <h2 style={styles.title}>Students</h2>
//           <p style={styles.sub}>
//             {loading ? "Loading..." : `Total: ${students.length}`} • Updated: {todayDDMMYYYY()}
//           </p>
//         </div>

//         <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//           <button style={styles.btnGhost} onClick={fetchStudents}>
//             Refresh
//           </button>
//           <button style={styles.btnPrimary} onClick={openAdd}>
//             + Add Student
//           </button>
//         </div>
//       </div>

//       <div style={styles.filters}>
//         <span style={{ color: "#64748b", fontWeight: 800, fontSize: 13 }}>
//           Showing <span style={{ color: "#0f172a" }}>{filtered.length}</span> students
//         </span>

//         <input
//           style={styles.input}
//           placeholder="Search by name / phone / email / pincode..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div style={styles.tableWrap}>
//         <div style={styles.scrollX}>
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.thRow}>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Phone</th>
//                 <th style={styles.th}>Email</th>
//                 <th style={styles.th}>Pincode</th>
//                 <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((u) => (
//                 <tr key={u.id}>
//                   <td style={styles.td}>{u.name || "-"}</td>
//                   <td style={styles.td}>
//                     <span style={styles.pill}>{u.phone}</span>
//                   </td>
//                   <td style={styles.td}>{u.email || "-"}</td>
//                   <td style={styles.td}>{u.pincode || "-"}</td>
//                   <td style={{ ...styles.td, textAlign: "right", whiteSpace: "nowrap" }}>
//                     <button
//                       style={{ ...styles.btnGhost, padding: "8px 10px", borderRadius: 12, marginRight: 8 }}
//                       onClick={() => openEdit(u)}
//                     >
//                       Edit
//                     </button>
//                     <button style={styles.btnDanger} onClick={() => remove(u.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={5} style={{ ...styles.td, textAlign: "center", padding: 18 }}>
//                     No students found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
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
//           <div style={styles.modal} role="dialog" aria-modal="true" aria-label="Student modal">
//             <div style={styles.modalHeader}>
//               <div>
//                 <p style={styles.modalTitle}>{mode === "add" ? "Add Student" : "Edit Student"}</p>
//                 <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13, fontWeight: 650 }}>
//                   Admin can create / update / delete students.
//                 </p>
//               </div>

//               <button style={styles.btnGhost} onClick={closeModal} aria-label="Close">
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={submit}>
//               <div style={styles.modalBody}>
//                 {err && <div style={styles.error}>{err}</div>}

//                 <div style={styles.field}>
//                   <label style={styles.label}>Phone</label>
//                   <input
//                     style={{ ...styles.input, minWidth: "unset" }}
//                     value={form.phone}
//                     onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
//                     placeholder="10 digit phone"
//                   />
//                 </div>

//                 <div style={styles.field}>
//                   <label style={styles.label}>Pincode</label>
//                   <input
//                     style={{ ...styles.input, minWidth: "unset" }}
//                     value={form.pincode}
//                     onChange={(e) => setForm((p) => ({ ...p, pincode: e.target.value }))}
//                     placeholder="6 digit pincode"
//                   />
//                 </div>

//                 <div style={{ ...styles.field, ...styles.full }}>
//                   <label style={styles.label}>Name</label>
//                   <input
//                     style={{ ...styles.input, minWidth: "unset", width: "100%" }}
//                     value={form.name}
//                     onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
//                     placeholder="Student name"
//                     autoFocus
//                   />
//                 </div>

//                 <div style={{ ...styles.field, ...styles.full }}>
//                   <label style={styles.label}>Email</label>
//                   <input
//                     style={{ ...styles.input, minWidth: "unset", width: "100%" }}
//                     value={form.email}
//                     onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
//                     placeholder="email (optional)"
//                   />
//                 </div>
//               </div>

//               <div style={styles.modalFooter}>
//                 <button type="button" style={styles.btnGhost} onClick={closeModal}>
//                   Cancel
//                 </button>
//                 <button type="submit" style={styles.btnPrimary}>
//                   {mode === "add" ? "Create Student" : "Save Changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "../../api/axiosInstance";
type Student = {
  id: number;
  phone: string;
  name: string;
  email?: string;
  pincode?: string;

  // optional fields (if your API returns them, UI will show)
  whatsapp?: string;
  plan?: "Free" | "Pro" | "Enterprise" | string;
  status?: "Active" | "Inactive" | "Suspended" | string;
  resumes?: number;
  date_joined?: string;
};

type ExportScope = "all" | "free" | "paid";
type ExportFormat = "excel" | "pdf";

function todayDDMMYYYY() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function isPaidPlan(plan?: string) {
  const p = (plan || "").toLowerCase();
  if (!p) return false;
  return p.includes("pro") || p.includes("enterprise") || p.includes("paid");
}

function normalizePlan(plan?: string) {
  if (!plan) return "-";
  return plan;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 14,
  },
  title: { margin: 0, fontSize: 20, fontWeight: 900, color: "#0f172a" },
  sub: { margin: "6px 0 0", color: "#64748b", fontSize: 13, fontWeight: 650 },

  btnPrimary: {
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "1px solid #4338ca",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 900,
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  },
  btnGhost: {
    backgroundColor: "#fff",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 850,
  },
  btnDanger: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    padding: "8px 10px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 850,
  },

  // export buttons row (like screenshot)
  exportRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  exportBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 900,
  },
  iconBox: {
    width: 18,
    height: 18,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: 12,
  },

  filters: {
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  input: {
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 12,
    fontSize: 14,
    outline: "none",
    minWidth: 260,
  },

  tableWrap: {
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    overflow: "hidden",
  },
  scrollX: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 980 },
  thRow: { backgroundColor: "#f8fafc" },
  th: { textAlign: "left", padding: 12, color: "#64748b", fontSize: 13, fontWeight: 900 },
  td: { padding: 12, borderTop: "1px solid #f1f5f9", fontSize: 14, color: "#0f172a" },

  pill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 850,
    border: "1px solid #e2e8f0",
    color: "#334155",
    backgroundColor: "#f1f5f9",
  },

  pillBlue: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    border: "1px solid #dbeafe",
    color: "#1d4ed8",
    backgroundColor: "#eff6ff",
  },
  pillGreen: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    border: "1px solid #dcfce7",
    color: "#15803d",
    backgroundColor: "#f0fdf4",
  },
  pillGray: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    border: "1px solid #e2e8f0",
    color: "#475569",
    backgroundColor: "#f8fafc",
  },

  // dropdown
  popover: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
    minWidth: 180,
    zIndex: 50,
    overflow: "hidden",
  },
  popItem: {
    padding: "10px 12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 850,
    color: "#0f172a",
  },
  popItemSub: { fontSize: 12, fontWeight: 750, color: "#64748b" },

  // Modal
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15,23,42,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 60,
  },
  modal: {
    width: "100%",
    maxWidth: 640,
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.6)",
  },
  modalHeader: {
    padding: "16px 18px",
    borderBottom: "1px solid #eef2f7",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  modalTitle: { margin: 0, fontSize: 16, fontWeight: 900, color: "#111827" },
  modalBody: { padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 900, color: "#374151" },
  full: { gridColumn: "1 / -1" },
  error: {
    gridColumn: "1 / -1",
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    border: "1px solid #fecaca",
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 700,
  },
  modalFooter: {
    padding: "14px 18px",
    borderTop: "1px solid #eef2f7",
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
};
function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onOutside: () => void
) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        onOutside();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onOutside]);
}


export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    phone: "",
    name: "",
    email: "",
    pincode: "",
  });

  // export dropdown state
  const [exportMenu, setExportMenu] = useState<null | ExportScope>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(exportMenuRef, () => setExportMenu(null));

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return students;
    return students.filter((u) => {
      const hay = `${u.name} ${u.phone} ${u.email || ""} ${u.pincode || ""} ${u.plan || ""} ${u.status || ""}`.toLowerCase();
      return hay.includes(s);
    });
  }, [students, search]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/auth/admin/users/");
      setStudents(res.data || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openAdd = () => {
    setMode("add");
    setEditingId(null);
    setErr("");
    setForm({ phone: "", name: "", email: "", pincode: "" });
    setOpen(true);
  };

  const openEdit = (u: Student) => {
    setMode("edit");
    setEditingId(u.id);
    setErr("");
    setForm({
      phone: u.phone || "",
      name: u.name || "",
      email: u.email || "",
      pincode: u.pincode || "",
    });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const validate = () => {
    const phone = form.phone.trim();
    const name = form.name.trim();
    const pincode = form.pincode.trim();

    if (!phone) return "Phone required";
    if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits";
    if (!name) return "Name required";
    if (pincode && !/^\d{6}$/.test(pincode)) return "Pincode must be 6 digits";
    return "";
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErr("");

    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    try {
      if (mode === "add") {
        const res = await axios.post("/auth/admin/users/", {
          phone: form.phone.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          pincode: form.pincode.trim(),
        });
        setStudents((prev) => [res.data, ...prev]);
        setOpen(false);
        return;
      }

      if (!editingId) {
        setErr("Missing user id");
        return;
      }

      const res = await axios.patch(`/auth/admin/users/${editingId}/`, {
        phone: form.phone.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        pincode: form.pincode.trim(),
      });

      setStudents((prev) => prev.map((u) => (u.id === editingId ? res.data : u)));
      setOpen(false);
    } catch (e: any) {
      console.error(e);
      const msg = e?.response?.data ? JSON.stringify(e.response.data) : "Save failed";
      setErr(msg);
    }
  };

  const remove = async (id: number) => {
    const ok = window.confirm("Delete this student?");
    if (!ok) return;

    try {
      await axios.delete(`/auth/admin/users/${id}/`);
      setStudents((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  const dataForScope = (scope: ExportScope) => {
    if (scope === "all") return filtered;

    // if plan not coming from API, paid exports may be empty. If your API sends plan, it will work.
    if (scope === "free") return filtered.filter((s) => !isPaidPlan(s.plan));
    if (scope === "paid") return filtered.filter((s) => isPaidPlan(s.plan));
    return filtered;
  };

  const exportExcel = async (scope: ExportScope) => {
    try {
      const { utils, writeFile } = await import("xlsx");
      const rows = dataForScope(scope).map((s) => ({
        ID: s.id,
        Name: s.name || "",
        Phone: s.phone || "",
        Email: s.email || "",
        WhatsApp: s.whatsapp || "",
        Pincode: s.pincode || "",
        Plan: s.plan || "",
        Status: s.status || "",
        Resumes: typeof s.resumes === "number" ? s.resumes : "",
      }));

      const ws = utils.json_to_sheet(rows);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Students");
      const fname = `students_${scope}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      writeFile(wb, fname);
    } catch (e) {
      console.error(e);
      alert("Excel export failed. Please install: npm i xlsx");
    }
  };

  const exportPDF = async (scope: ExportScope) => {
    try {
      const jsPDF = (await import("jspdf")).default;
      // @ts-ignore
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF({ orientation: "landscape" });
      const title = `Students Export (${scope.toUpperCase()})`;
      doc.setFontSize(14);
      doc.text(title, 14, 14);

      const body = dataForScope(scope).map((s) => [
        String(s.id),
        s.name || "-",
        s.phone || "-",
        s.email || "-",
        s.pincode || "-",
        normalizePlan(s.plan),
        s.status || "-",
        typeof s.resumes === "number" ? String(s.resumes) : "-",
      ]);

      autoTable(doc, {
        startY: 20,
        head: [["ID", "Name", "Phone", "Email", "Pincode", "Plan", "Status", "Resumes"]],
        body,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [248, 250, 252] },
      });

      const fname = `students_${scope}_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(fname);
    } catch (e) {
      console.error(e);
      alert("PDF export failed. Please install: npm i jspdf jspdf-autotable");
    }
  };

  const doExport = async (scope: ExportScope, format: ExportFormat) => {
    setExportMenu(null);
    if (format === "excel") return exportExcel(scope);
    return exportPDF(scope);
  };

  const PlanPill = ({ plan }: { plan?: string }) => {
    if (!plan) return <span style={styles.pillGray}>-</span>;
    if (isPaidPlan(plan)) return <span style={styles.pillBlue}>{plan}</span>;
    return <span style={styles.pillGray}>{plan}</span>;
  };

  const StatusPill = ({ status }: { status?: string }) => {
    const s = (status || "").toLowerCase();
    if (!status) return <span style={styles.pillGray}>-</span>;
    if (s.includes("active")) return <span style={styles.pillGreen}>{status}</span>;
    return <span style={styles.pillGray}>{status}</span>;
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>Students</h2>
          <p style={styles.sub}>
            {loading ? "Loading..." : `Total: ${students.length}`} • Updated: {todayDDMMYYYY()}
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={styles.btnGhost} onClick={fetchStudents}>
            Refresh
          </button>
          <button style={styles.btnPrimary} onClick={openAdd}>
            + Add Student
          </button>
        </div>
      </div>

      {/* ✅ Export Buttons (like your screenshot) */}
      <div style={{ ...styles.exportRow, marginBottom: 12 }}>
        <div style={{ position: "relative" }} ref={exportMenu === "all" ? exportMenuRef : null}>
          <button style={styles.exportBtn} onClick={() => setExportMenu((p) => (p === "all" ? null : "all"))}>
            <span style={styles.iconBox}>⭳</span> Export All
          </button>

          {exportMenu === "all" && (
            <div style={styles.popover}>
              <div style={styles.popItem} onClick={() => doExport("all", "excel")}>
                <div>
                  Excel <div style={styles.popItemSub}>.xlsx download</div>
                </div>
                <span>→</span>
              </div>
              <div style={{ height: 1, background: "#f1f5f9" }} />
              <div style={styles.popItem} onClick={() => doExport("all", "pdf")}>
                <div>
                  PDF <div style={styles.popItemSub}>table report</div>
                </div>
                <span>→</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ position: "relative" }} ref={exportMenu === "free" ? exportMenuRef : null}>
          <button style={styles.exportBtn} onClick={() => setExportMenu((p) => (p === "free" ? null : "free"))}>
            <span style={styles.iconBox}>📄</span> Export Free Users
          </button>

          {exportMenu === "free" && (
            <div style={styles.popover}>
              <div style={styles.popItem} onClick={() => doExport("free", "excel")}>
                <div>
                  Excel <div style={styles.popItemSub}>free users</div>
                </div>
                <span>→</span>
              </div>
              <div style={{ height: 1, background: "#f1f5f9" }} />
              <div style={styles.popItem} onClick={() => doExport("free", "pdf")}>
                <div>
                  PDF <div style={styles.popItemSub}>free users</div>
                </div>
                <span>→</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ position: "relative" }} ref={exportMenu === "paid" ? exportMenuRef : null}>
          <button style={styles.exportBtn} onClick={() => setExportMenu((p) => (p === "paid" ? null : "paid"))}>
            <span style={styles.iconBox}>₹</span> Export Paid Users
          </button>

          {exportMenu === "paid" && (
            <div style={styles.popover}>
              <div style={styles.popItem} onClick={() => doExport("paid", "excel")}>
                <div>
                  Excel <div style={styles.popItemSub}>paid users</div>
                </div>
                <span>→</span>
              </div>
              <div style={{ height: 1, background: "#f1f5f9" }} />
              <div style={styles.popItem} onClick={() => doExport("paid", "pdf")}>
                <div>
                  PDF <div style={styles.popItemSub}>paid users</div>
                </div>
                <span>→</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.filters}>
        <span style={{ color: "#64748b", fontWeight: 800, fontSize: 13 }}>
          Showing <span style={{ color: "#0f172a" }}>{filtered.length}</span> students
        </span>

        <input
          style={styles.input}
          placeholder="Search by name / phone / email / pincode / plan / status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.tableWrap}>
        <div style={styles.scrollX}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Pincode</th>
                <th style={styles.th}>Plan</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Resumes</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td style={styles.td}>{u.name || "-"}</td>

                  <td style={styles.td}>
                    <span style={styles.pill}>{u.phone}</span>
                  </td>

                  <td style={styles.td}>{u.email || "-"}</td>
                  <td style={styles.td}>{u.pincode || "-"}</td>

                  <td style={styles.td}>
                    <PlanPill plan={u.plan} />
                  </td>

                  <td style={styles.td}>
                    <StatusPill status={u.status} />
                  </td>

                  <td style={styles.td}>{typeof u.resumes === "number" ? u.resumes : "-"}</td>

                  <td style={{ ...styles.td, textAlign: "right", whiteSpace: "nowrap" }}>
                    <button
                      style={{ ...styles.btnGhost, padding: "8px 10px", borderRadius: 12, marginRight: 8 }}
                      onClick={() => openEdit(u)}
                    >
                      Edit
                    </button>
                    <button style={styles.btnDanger} onClick={() => remove(u.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ ...styles.td, textAlign: "center", padding: 18 }}>
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          style={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div style={styles.modal} role="dialog" aria-modal="true" aria-label="Student modal">
            <div style={styles.modalHeader}>
              <div>
                <p style={styles.modalTitle}>{mode === "add" ? "Add Student" : "Edit Student"}</p>
                <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13, fontWeight: 650 }}>
                  Admin can create / update / delete students.
                </p>
              </div>

              <button style={styles.btnGhost} onClick={closeModal} aria-label="Close">
                ✕
              </button>
            </div>

            <form onSubmit={submit}>
              <div style={styles.modalBody}>
                {err && <div style={styles.error}>{err}</div>}

                <div style={styles.field}>
                  <label style={styles.label}>Phone</label>
                  <input
                    style={{ ...styles.input, minWidth: "unset" }}
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="10 digit phone"
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Pincode</label>
                  <input
                    style={{ ...styles.input, minWidth: "unset" }}
                    value={form.pincode}
                    onChange={(e) => setForm((p) => ({ ...p, pincode: e.target.value }))}
                    placeholder="6 digit pincode"
                  />
                </div>

                <div style={{ ...styles.field, ...styles.full }}>
                  <label style={styles.label}>Name</label>
                  <input
                    style={{ ...styles.input, minWidth: "unset", width: "100%" }}
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Student name"
                    autoFocus
                  />
                </div>

                <div style={{ ...styles.field, ...styles.full }}>
                  <label style={styles.label}>Email</label>
                  <input
                    style={{ ...styles.input, minWidth: "unset", width: "100%" }}
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="email (optional)"
                  />
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button type="button" style={styles.btnGhost} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  {mode === "add" ? "Create Student" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
