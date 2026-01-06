import React, { useEffect, useMemo, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // ✅ use your axiosInstance
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type PlanType = "Pro" | "Enterprise";
type StatusType = "Active" | "Cancelled" | "Expired" | "Past Due";

type SubscriptionRow = {
  id: number;
  user_name: string;
  user_email: string;
  user_phone?: string;
  plan: PlanType;
  amount: number;
  status: StatusType;
  start_date: string;
  end_date: string;
  auto_renew: boolean;
};

type Stats = {
  total: number;
  active: number;
  revenue: number;
  churn: number;
};

type UserRow = {
  id: number;
  phone: string;
  name: string;
  email: string;
};

type FormState = {
  user_id: number | "";
  plan: PlanType;
  amount: string;
  status: StatusType;
  start_date: string;
  end_date: string;
  auto_renew: boolean;
};

const PLANS: { value: "" | PlanType; label: string }[] = [
  { value: "", label: "All Plans" },
  { value: "Pro", label: "Pro" },
  { value: "Enterprise", label: "Enterprise" },
];

const STATUSES: { value: "" | StatusType; label: string }[] = [
  { value: "", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Expired", label: "Expired" },
  { value: "Past Due", label: "Past Due" },
];

const money = (n: number) => {
  const x = Number(n || 0);
  return `$${x.toFixed(2)}`;
};

function initials(name: string) {
  const s = (name || "").trim();
  if (!s) return "U";
  const parts = s.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] || "U";
  const b = parts.length > 1 ? parts[1]?.[0] : parts[0]?.[1] || "";
  return (a + b).toUpperCase();
}

function pillStyle(kind: "plan" | "status", value: string): React.CSSProperties {
  if (kind === "plan") {
    if (value === "Enterprise") {
      return {
        background: "#0b5cff",
        color: "white",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        display: "inline-block",
      };
    }
    return {
      background: "#eef2ff",
      color: "#1e293b",
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      display: "inline-block",
      border: "1px solid #e2e8f0",
    };
  }

  // status
  if (value === "Active") {
    return {
      background: "#0b5cff",
      color: "white",
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      display: "inline-block",
    };
  }
  if (value === "Past Due") {
    return {
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
      display: "inline-block",
      border: "1px solid #fecaca",
    };
  }
  return {
    background: "#f1f5f9",
    color: "#334155",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    display: "inline-block",
    border: "1px solid #e2e8f0",
  };
}

function StatCard({
  title,
  value,
  valueColor,
}: {
  title: string;
  value: string;
  valueColor: string;
}) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statTitle}>{title}</div>
      <div style={{ ...styles.statValue, color: valueColor }}>{value}</div>
    </div>
  );
}

function SelectLike({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const label = options.find((o) => o.value === value)?.label || options[0].label;

  return (
    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
      <button style={styles.selectBtn} onClick={() => setOpen((v) => !v)}>
        <span>{label}</span>
        <span style={{ opacity: 0.6 }}>▾</span>
      </button>

      {open && (
        <div style={styles.selectMenu}>
          {options.map((o) => (
            <button
              key={o.value}
              style={{
                ...styles.selectItem,
                background: o.value === value ? "#f1f5f9" : "white",
              }}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              <span>{o.label}</span>
              {o.value === value ? <span>✓</span> : <span />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div style={styles.modalTitle}>{title}</div>
          <button style={styles.iconBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Subscriptions() {
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, revenue: 0, churn: 0 });
  const [rows, setRows] = useState<SubscriptionRow[]>([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState<"" | PlanType>("");
  const [status, setStatus] = useState<"" | StatusType>("");

  // export dropdown
  const [exportOpen, setExportOpen] = useState(false);

  // row menu
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<SubscriptionRow | null>(null);
  const [saving, setSaving] = useState(false);

  // users list for Add/Edit
  const [users, setUsers] = useState<UserRow[]>([]);
  const [userSearch, setUserSearch] = useState("");

  const [form, setForm] = useState<FormState>({
    user_id: "",
    plan: "Pro",
    amount: "9.99",
    status: "Active",
    start_date: "",
    end_date: "",
    auto_renew: true,
  });

  const debounceRef = useRef<number | null>(null);

  const countText = useMemo(() => `${rows.length} subscriptions found`, [rows.length]);

  const closeAllMenus = () => {
    setExportOpen(false);
    setOpenMenuId(null);
  };

  const fetchAll = async (params?: { search?: string; plan?: string; status?: string }) => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        // ✅ IMPORTANT: leading "/" so baseURL joins correctly
        axiosInstance.get("/auth/admin/subscriptions/", { params }),
        axiosInstance.get("/auth/admin/subscriptions/stats/"),
      ]);
      setRows(listRes.data || []);
      setStats(statsRes.data || { total: 0, active: 0, revenue: 0, churn: 0 });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const res = await axiosInstance.get("/auth/admin/users/");
    setUsers(res.data || []);
  };

  useEffect(() => {
    fetchAll({ search: "", plan: "", status: "" });
    fetchUsers();

    window.addEventListener("click", closeAllMenus);
    return () => window.removeEventListener("click", closeAllMenus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      fetchAll({
        search: search.trim() || "",
        plan: plan || "",
        status: status || "",
      });
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, plan, status]);

  const exportExcel = () => {
    const data = rows.map((r) => ({
      User: (r.user_name || r.user_phone || "User").trim(),
      Email: r.user_email,
      Plan: r.plan,
      Amount: `${r.amount}/mo`,
      Status: r.status,
      "Start Date": r.start_date,
      "End Date": r.end_date,
      "Auto Renew": r.auto_renew ? "Yes" : "No",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subscriptions");
    XLSX.writeFile(wb, "subscriptions.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Subscriptions", 14, 14);
    doc.setFontSize(10);
    doc.text(`Rows: ${rows.length}`, 14, 20);

    autoTable(doc, {
      startY: 26,
      head: [["User", "Plan", "Amount", "Status", "Start", "End", "Auto Renew"]],
      body: rows.map((r) => [
        `${(r.user_name || r.user_phone || "User").trim()}\n${r.user_email || ""}`,
        r.plan,
        `$${r.amount}/mo`,
        r.status,
        r.start_date,
        r.end_date,
        r.auto_renew ? "Yes" : "No",
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [241, 245, 249] },
    });

    doc.save("subscriptions.pdf");
  };

  const openAdd = () => {
    setEditRow(null);
    setUserSearch("");
    setForm({
      user_id: "",
      plan: "Pro",
      amount: "9.99",
      status: "Active",
      start_date: "",
      end_date: "",
      auto_renew: true,
    });
    setModalOpen(true);
  };

  const openEdit = (row: SubscriptionRow) => {
    setEditRow(row);
    setUserSearch("");
    // NOTE: edit me user change optional; backend expects user_id if you send it
    setForm({
      user_id: "",
      plan: row.plan,
      amount: String(row.amount ?? ""),
      status: row.status,
      start_date: row.start_date,
      end_date: row.end_date,
      auto_renew: !!row.auto_renew,
    });
    setModalOpen(true);
  };

  const deleteRow = async (id: number) => {
    const ok = window.confirm("Delete subscription?");
    if (!ok) return;
    await axiosInstance.delete(`/auth/admin/subscriptions/${id}/`);
    await fetchAll({ search: search.trim() || "", plan: plan || "", status: status || "" });
  };

  const submit = async () => {
    // validations
    if (!editRow && !form.user_id) {
      alert("Please select a user.");
      return;
    }
    if (!form.start_date || !form.end_date) {
      alert("Please select start and end date.");
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        plan: form.plan,
        amount: Number(form.amount || 0),
        status: form.status,
        start_date: form.start_date,
        end_date: form.end_date,
        auto_renew: form.auto_renew,
      };

      if (!editRow) {
        payload.user_id = form.user_id;
        await axiosInstance.post("/auth/admin/subscriptions/", payload);
      } else {
        // edit: user_id optional (only send if you selected)
        if (form.user_id) payload.user_id = form.user_id;
        await axiosInstance.put(`/auth/admin/subscriptions/${editRow.id}/`, payload);
      }

      setModalOpen(false);
      setEditRow(null);
      await fetchAll({ search: search.trim() || "", plan: plan || "", status: status || "" });
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const name = (u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const phone = (u.phone || "").toLowerCase();
      return name.includes(q) || email.includes(q) || phone.includes(q);
    });
  }, [users, userSearch]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.headerRow}>
          <div>
            <div style={styles.title}>Subscriptions</div>
            <div style={styles.subtitle}>Manage user subscriptions and billing</div>
          </div>

          {/* Export */}
          <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button style={styles.exportBtn} onClick={() => setExportOpen((v) => !v)}>
              <span style={{ fontSize: 14, opacity: 0.9 }}>⬇</span>
              Export
            </button>

            {exportOpen && (
              <div style={styles.dropdown}>
                <button
                  style={styles.dropdownItem}
                  onClick={() => {
                    setExportOpen(false);
                    exportExcel();
                  }}
                >
                  Export Excel
                </button>
                <button
                  style={styles.dropdownItem}
                  onClick={() => {
                    setExportOpen(false);
                    exportPDF();
                  }}
                >
                  Export PDF
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <StatCard title="Total Subscriptions" value={`${stats.total}`} valueColor="#0f172a" />
          <StatCard title="Active" value={`${stats.active}`} valueColor="#16a34a" />
          <StatCard title="Monthly Revenue" value={money(stats.revenue)} valueColor="#0f172a" />
          <StatCard title="Churn Rate" value={`${stats.churn}%`} valueColor="#f97316" />
        </div>

        {/* Table card */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            <div>
              <div style={styles.cardTitle}>All Subscriptions</div>
              <div style={styles.cardSub}>{countText}</div>
            </div>

            <div style={styles.filtersRow}>
              {/* Search */}
              <div style={styles.searchWrap}>
                <div style={styles.searchIcon}>🔍</div>
                <input
                  style={styles.searchInput}
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* All Plans */}
              <SelectLike value={plan} onChange={(v) => setPlan(v as any)} options={PLANS} />

              {/* All Status */}
              <SelectLike value={status} onChange={(v) => setStatus(v as any)} options={STATUSES} />

              {/* Add */}
              <button style={styles.addBtn} onClick={openAdd}>
                + Add
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: 360 }}>User</th>
                  <th style={styles.th}>Plan</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Start Date</th>
                  <th style={styles.th}>End Date</th>
                  <th style={styles.th}>Auto Renew</th>
                  <th style={{ ...styles.th, width: 60 }} />
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td style={styles.td} colSpan={8}>
                      Loading...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td style={styles.td} colSpan={8}>
                      No subscriptions found.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => {
                    const displayName = (r.user_name || r.user_phone || "User").trim();
                    return (
                      <tr key={r.id} style={styles.trHover}>
                        <td style={styles.td}>
                          <div style={styles.userCell}>
                            <div style={styles.avatar}>{initials(displayName)}</div>
                            <div>
                              <div style={styles.userName}>{displayName}</div>
                              <div style={styles.userEmail}>{r.user_email || ""}</div>
                            </div>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <span style={pillStyle("plan", r.plan)}>{r.plan}</span>
                        </td>

                        <td style={styles.td}>
                          <span style={{ fontWeight: 600 }}>${Number(r.amount || 0).toFixed(2)}/mo</span>
                        </td>

                        <td style={styles.td}>
                          <span style={pillStyle("status", r.status)}>{r.status}</span>
                        </td>

                        <td style={styles.td}>{r.start_date}</td>
                        <td style={styles.td}>{r.end_date}</td>

                        <td style={styles.td}>
                          <span style={r.auto_renew ? styles.yesPill : styles.noPill}>
                            {r.auto_renew ? "Yes" : "No"}
                          </span>
                        </td>

                        <td style={styles.td} onClick={(e) => e.stopPropagation()}>
                          <button
                            style={styles.dotsBtn}
                            onClick={() => setOpenMenuId((v) => (v === r.id ? null : r.id))}
                          >
                            ⋯
                          </button>

                          {openMenuId === r.id && (
                            <div style={styles.rowMenu}>
                              <button
                                style={styles.rowMenuItem}
                                onClick={() => {
                                  setOpenMenuId(null);
                                  openEdit(r);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                style={{ ...styles.rowMenuItem, color: "#b91c1c" }}
                                onClick={() => {
                                  setOpenMenuId(null);
                                  deleteRow(r.id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Add/Edit */}
        <Modal
          open={modalOpen}
          title={editRow ? "Edit Subscription" : "Add Subscription"}
          onClose={() => setModalOpen(false)}
        >
          <div style={styles.modalBody}>
            {/* User pick (only required for Add) */}
            <div style={styles.formRow}>
              <div style={styles.formLabel}>
                User {editRow ? "(optional change)" : "*"}
              </div>

              <input
                style={styles.input}
                placeholder="Search user by name/email/phone..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />

              <div style={styles.userSelectWrap}>
                <select
                  style={styles.select}
                  value={form.user_id}
                  onChange={(e) => setForm((p) => ({ ...p, user_id: Number(e.target.value) || "" }))}
                >
                  <option value="">
                    {editRow ? "Keep same user" : "Select user"}
                  </option>
                  {filteredUsers.map((u) => {
                    const dn = (u.name || u.phone || "User").trim();
                    return (
                      <option key={u.id} value={u.id}>
                        {dn} {u.email ? `(${u.email})` : ""} {u.phone ? `- ${u.phone}` : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Plan + Status */}
            <div style={styles.grid2}>
              <div>
                <div style={styles.formLabel}>Plan</div>
                <select
                  style={styles.select}
                  value={form.plan}
                  onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value as PlanType }))}
                >
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <div style={styles.formLabel}>Status</div>
                <select
                  style={styles.select}
                  value={form.status}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as StatusType }))}
                >
                  <option value="Active">Active</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Expired">Expired</option>
                  <option value="Past Due">Past Due</option>
                </select>
              </div>
            </div>

            {/* Amount + dates */}
            <div style={styles.grid2}>
              <div>
                <div style={styles.formLabel}>Amount (monthly)</div>
                <input
                  style={styles.input}
                  value={form.amount}
                  onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
                  placeholder="9.99"
                />
              </div>

              <div>
                <div style={styles.formLabel}>Auto Renew</div>
                <label style={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={form.auto_renew}
                    onChange={(e) => setForm((p) => ({ ...p, auto_renew: e.target.checked }))}
                  />
                  <span>Enable</span>
                </label>
              </div>
            </div>

            <div style={styles.grid2}>
              <div>
                <div style={styles.formLabel}>Start Date</div>
                <input
                  type="date"
                  style={styles.input}
                  value={form.start_date}
                  onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))}
                />
              </div>
              <div>
                <div style={styles.formLabel}>End Date</div>
                <input
                  type="date"
                  style={styles.input}
                  value={form.end_date}
                  onChange={(e) => setForm((p) => ({ ...p, end_date: e.target.value }))}
                />
              </div>
            </div>

            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button style={styles.saveBtn} disabled={saving} onClick={submit}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
  },
  container: {
    padding: "22px 28px",
  },
  headerRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1.1,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748b",
  },

  exportBtn: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 1px 0 rgba(15,23,42,0.04)",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 44,
    width: 170,
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
    overflow: "hidden",
    zIndex: 50,
  },
  dropdownItem: {
    width: "100%",
    padding: "12px 12px",
    border: "none",
    background: "white",
    textAlign: "left",
    cursor: "pointer",
    fontSize: 14,
  },

  statsGrid: {
    marginTop: 18,
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 14,
  },
  statCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: "16px 16px",
    boxShadow: "0 1px 0 rgba(15,23,42,0.04)",
  },
  statTitle: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: 700,
  },
  statValue: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: 900,
  },

  card: {
    marginTop: 18,
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    boxShadow: "0 1px 0 rgba(15,23,42,0.04)",
  },
  cardTop: {
    padding: "14px 18px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: "#0f172a",
  },
  cardSub: {
    marginTop: 3,
    fontSize: 13,
    color: "#64748b",
  },

  filtersRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid #e2e8f0",
    background: "white",
    borderRadius: 10,
    padding: "8px 10px",
    minWidth: 240,
  },
  searchIcon: { fontSize: 14, opacity: 0.65 },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: 14,
  },

  selectBtn: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: "9px 12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    minWidth: 140,
  },
  selectMenu: {
    position: "absolute",
    top: 44,
    right: 0,
    width: 160,
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
    overflow: "hidden",
    zIndex: 60,
  },
  selectItem: {
    width: "100%",
    padding: "12px 12px",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  addBtn: {
    background: "#0b5cff",
    border: "1px solid #0b5cff",
    color: "white",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 800,
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: 13,
    color: "#64748b",
    fontWeight: 800,
    borderBottom: "1px solid #e2e8f0",
    background: "white",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: "14px 16px",
    fontSize: 14,
    color: "#0f172a",
    borderBottom: "1px solid #f1f5f9",
    verticalAlign: "middle",
    background: "white",
  },
  trHover: {
    cursor: "default",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 999,
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    color: "#334155",
    fontSize: 12,
  },
  userName: {
    fontWeight: 900,
    color: "#0f172a",
  },
  userEmail: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748b",
  },

  yesPill: {
    background: "#0b5cff",
    color: "white",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    display: "inline-block",
  },
  noPill: {
    background: "white",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    display: "inline-block",
  },

  dotsBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    border: "1px solid transparent",
    background: "transparent",
    cursor: "pointer",
    fontSize: 20,
    lineHeight: "20px",
  },
  rowMenu: {
    position: "absolute",
    right: 12,
    marginTop: 6,
    width: 140,
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
    overflow: "hidden",
    zIndex: 70,
  },
  rowMenuItem: {
    width: "100%",
    padding: "12px 12px",
    border: "none",
    background: "white",
    textAlign: "left",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
  },

  // modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 1000,
  },
  modalCard: {
    width: "min(720px, 100%)",
    background: "white",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 30px 70px rgba(15,23,42,0.25)",
    overflow: "hidden",
  },
  modalHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 900,
    color: "#0f172a",
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "white",
    cursor: "pointer",
  },
  modalBody: {
    padding: 16,
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 14,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: 800,
    color: "#0f172a",
  },
  input: {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 14,
    outline: "none",
  },
  select: {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 12px",
    fontSize: 14,
    outline: "none",
    background: "white",
  },
  userSelectWrap: {
    width: "100%",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
    marginBottom: 14,
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 12px",
  },
  modalActions: {
    marginTop: 6,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelBtn: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
  },
  saveBtn: {
    background: "#0f172a",
    border: "1px solid #0f172a",
    color: "white",
    borderRadius: 12,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
    opacity: 1,
  },
};
