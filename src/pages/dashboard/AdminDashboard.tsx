import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  // Auth Protection
  useEffect(() => {
    if (!admin) navigate("/admin/login");
    fetchUsers();
  }, [admin, navigate]);

  const fetchUsers = async () => {
    try {
      // Replace with your actual endpoint
      const res = await axios.get("/auth/admin/users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users");
      // Dummy data for preview if API fails
      setUsers([
        { id: 1, name: "Rahul Sharma", phone: "9876543210", email: "rahul@test.com", pincode: "400001" },
        { id: 2, name: "Priya Singh", phone: "9123456789", email: "priya@test.com", pincode: "110001" },
      ]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/auth/admin/users/${id}/`);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) { alert("Delete failed"); }
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div style={adminWrapper}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .sidebar { position: fixed; left: -280px; z-index: 1000; height: 100vh; transition: 0.3s; }
          .sidebar.open { left: 0; }
          .main-area { width: 100vw; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>

      {/* --- SIDEBAR --- */}
      <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} style={sidebar}>
        <div style={sidebarLogo}>
          <div style={{ fontSize: "28px" }}>🛡️</div>
          <h2 style={logoText}>Admin Pro</h2>
        </div>

        <nav style={navLinks}>
          <div 
            style={{ ...navItem, backgroundColor: activeTab === "dashboard" ? "#4f46e5" : "transparent" }}
            onClick={() => { setActiveTab("dashboard"); setIsMobileMenuOpen(false); }}
          >
            📊 Dashboard
          </div>
          <div 
            style={{ ...navItem, backgroundColor: activeTab === "users" ? "#4f46e5" : "transparent" }}
            onClick={() => { setActiveTab("users"); setIsMobileMenuOpen(false); }}
          >
            👥 User Management
          </div>
        </nav>

        <div style={sidebarBottom}>
          <p style={adminName}>{admin?.name || "System Admin"}</p>
          <button style={logoutBtn} onClick={logout}>Logout</button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-area" style={mainArea}>
        <header style={topHeader}>
          <button 
            style={mobileToggle} 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
          <h3 style={{ margin: 0, color: "#1e293b" }}>Console</h3>
          <div style={statusContainer}>
            <div style={statusPulse}></div>
            <span style={statusText}>System Live</span>
          </div>
        </header>

        <div style={contentPadding}>
          {activeTab === "dashboard" && (
            <div style={fadeEffect}>
              <h1 style={welcomeTitle}>Hello, Admin</h1>
              <div style={statGrid}>
                <div style={statCard}><p>Total Users</p><h2>{users.length}</h2></div>
                <div style={statCard}><p>Active Now</p><h2>4</h2></div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div style={fadeEffect}>
              <div style={tableHeader}>
                <h1 style={welcomeTitle}>User Management</h1>
                <button style={addBtn} onClick={() => alert("Open Add User Modal")}>+ Add User</button>
              </div>

              <div style={scrollContainer}>
                <table style={adminTable}>
                  <thead>
                    <tr style={thRow}>
                      <th style={th}>Name</th>
                      <th style={th}>Mobile</th>
                      <th style={th}>Pincode</th>
                      <th style={th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={tr}>
                        <td style={td}>{u.name}</td>
                        <td style={td}>{u.phone}</td>
                        <td style={td}>{u.pincode}</td>
                        <td style={td}>
                          <button style={editBtn} onClick={() => alert("Edit " + u.name)}>Edit</button>
                          <button style={delBtn} onClick={() => handleDelete(u.id)}>Del</button>
                        </td>
                      </tr>
                    ))}
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

/* ---------- Responsive Admin Styles ---------- */

const adminWrapper = {
  display: "flex", width: "100vw", height: "100vh",
  backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif",
  overflow: "hidden", position: "fixed" as const, top: 0, left: 0,
};

const sidebar = {
  width: "280px", backgroundColor: "#0f172a", color: "#fff",
  display: "flex", flexDirection: "column" as const, padding: "30px 20px",
  boxSizing: "border-box" as const, flexShrink: 0,
};

const sidebarLogo = { display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" };
const logoText = { margin: 0, fontSize: "22px", fontWeight: "bold" };
const navLinks = { display: "flex", flexDirection: "column" as const, gap: "12px", flexGrow: 1 };
const navItem = { padding: "14px 18px", borderRadius: "10px", cursor: "pointer", color: "#cbd5e1", transition: "0.2s" };
const sidebarBottom = { borderTop: "1px solid #1e293b", paddingTop: "20px" };
const adminName = { fontSize: "13px", color: "#94a3b8", marginBottom: "10px" };
const logoutBtn = { width: "100%", padding: "10px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" };

const mainArea = { flexGrow: 1, display: "flex", flexDirection: "column" as const, height: "100vh" };
const topHeader = { height: "60px", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid #e2e8f0" };
const mobileToggle = { display: "none", background: "#0f172a", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "4px" };

const statusContainer = { display: "flex", alignItems: "center", gap: "8px" };
const statusPulse = { width: "8px", height: "8px", backgroundColor: "#22c55e", borderRadius: "50%" };
const statusText = { fontSize: "12px", fontWeight: "600", color: "#64748b" };

const contentPadding = { padding: "20px", overflowY: "auto" as const, flexGrow: 1 };
const welcomeTitle = { fontSize: "22px", color: "#0f172a", margin: 0 };
const statGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginTop: "20px" };
const statCard = { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" };

const tableHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" };
const addBtn = { backgroundColor: "#4f46e5", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };

const scrollContainer = { width: "100%", overflowX: "auto" as const, backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" };
const adminTable = { width: "100%", borderCollapse: "collapse" as const, minWidth: "600px" };
const thRow = { backgroundColor: "#f8fafc" };
const th = { textAlign: "left" as const, padding: "12px", color: "#64748b", fontSize: "14px" };
const td = { padding: "12px", borderTop: "1px solid #f1f5f9", fontSize: "14px" };
const tr = { transition: "0.2s" };

const editBtn = { padding: "5px 10px", marginRight: "5px", backgroundColor: "#e0f2fe", color: "#0369a1", border: "none", borderRadius: "4px", cursor: "pointer" };
const delBtn = { padding: "5px 10px", backgroundColor: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", cursor: "pointer" };
const fadeEffect = { animation: "fadeIn 0.4s ease-out" };