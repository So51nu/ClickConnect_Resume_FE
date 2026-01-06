import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const keyframeStyles = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }

    /* ✅ responsive using real CSS (inline media query doesn't work) */
    @media (max-width: 768px) {
      .mobileHeader { display: flex !important; }
      .sidebar { position: fixed; left: -280px; top: 0; height: 100vh; z-index: 50; transition: 0.25s ease; }
      .sidebar.open { left: 0; }
      .overlay { display: block !important; }
      .contentPadding { padding: 20px !important; }
    }

    @media (min-width: 769px) {
      .mobileHeader { display: none !important; }
      .sidebar { position: relative; left: 0; }
      .overlay { display: none !important; }
    }
  `;

  return (
    <div style={dashboardWrapper}>
      <style>{keyframeStyles}</style>

      {/* ✅ overlay (mobile) */}
      {isMobileMenuOpen && (
        <div
          className="overlay"
          style={overlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <div className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} style={sidebar}>
        <div style={logoSection}>
          <h2 style={logoText}>My App</h2>
          <p style={logoSub}>Student Dashboard</p>
        </div>

        <nav style={navLinks}>
          <div
            style={{
              ...navItem,
              backgroundColor: activeTab === "home" ? "rgba(255,255,255,0.2)" : "transparent",
            }}
            onClick={() => {
              setActiveTab("home");
              setIsMobileMenuOpen(false);
            }}
          >
            🏠 Dashboard
          </div>

          <div
            style={{
              ...navItem,
              backgroundColor: activeTab === "profile" ? "rgba(255,255,255,0.2)" : "transparent",
            }}
            onClick={() => {
              setActiveTab("profile");
              setIsMobileMenuOpen(false);
            }}
          >
            👤 Profile Details
          </div>
        </nav>

        <button style={sidebarLogout} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div style={mainContent}>
        {/* ✅ Mobile Header */}
        <div className="mobileHeader" style={mobileHeader}>
          <button style={menuBtn} onClick={() => setIsMobileMenuOpen((s) => !s)}>
            ☰ Menu
          </button>
          <span style={{ fontWeight: "bold" }}>Dashboard</span>
        </div>

        <div className="contentPadding" style={contentPadding}>
          {activeTab === "home" ? (
            <div style={sectionAnimation}>
              <h1 style={greeting}>Hello, {user.name || "User"}! 👋</h1>
              <p style={breadcrumb}>Welcome back to your full-screen overview.</p>

              <div style={gridContainer}>
                <div style={infoCard}>
                  <h3 style={{ marginTop: 0 }}>Account Status</h3>
                  <p style={{ color: "#16a34a", fontSize: 20, fontWeight: 800, margin: 0 }}>
                    Verified ✅
                  </p>
                </div>

                <div style={infoCard}>
                  <h3 style={{ marginTop: 0 }}>Mobile</h3>
                  <p style={{ fontSize: 18, margin: 0 }}>+91 {user.phone}</p>
                </div>

                <div style={infoCard}>
                  <h3 style={{ marginTop: 0 }}>Email</h3>
                  <p style={{ fontSize: 18, margin: 0 }}>{user.email || "N/A"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div style={sectionAnimation}>
              <h1 style={greeting}>My Profile Details</h1>

              <div style={profileDetailCard}>
                <div style={detailRow}>
                  <span style={detailLabel}>Full Name</span>
                  <span style={detailValue}>{user.name || "N/A"}</span>
                </div>

                <div style={detailRow}>
                  <span style={detailLabel}>Mobile Number</span>
                  <span style={detailValue}>+91 {user.phone}</span>
                </div>

                <div style={detailRow}>
                  <span style={detailLabel}>Email Address</span>
                  <span style={detailValue}>{user.email || "N/A"}</span>
                </div>

                <div style={detailRow}>
                  <span style={detailLabel}>Pincode</span>
                  <span style={detailValue}>{user.pincode || "N/A"}</span>
                </div>

                <div style={{ ...detailRow, borderBottom: "none" }}>
                  <span style={detailLabel}>User ID</span>
                  <span style={{ ...detailValue, fontSize: 12, color: "#64748b" }}>
                    {user.id || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Full Screen Styles ---------- */

const dashboardWrapper: React.CSSProperties = {
  display: "flex",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#f4f7fe",
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
};

const overlay: React.CSSProperties = {
  display: "none",
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15,23,42,0.35)",
  zIndex: 40,
};

const sidebar: React.CSSProperties = {
  width: 260,
  height: "100%",
  background: "linear-gradient(180deg, #764ba2 0%, #667eea 100%)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: 20,
  boxSizing: "border-box",
  zIndex: 50,
};

const logoSection: React.CSSProperties = {
  padding: "14px 0 18px",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,0.15)",
  marginBottom: 18,
};

const logoText: React.CSSProperties = { margin: 0, fontSize: 22, letterSpacing: "0.5px", fontWeight: 900 };
const logoSub: React.CSSProperties = { margin: "6px 0 0", fontSize: 12, color: "rgba(255,255,255,0.85)" };

const navLinks: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  flexGrow: 1,
};

const navItem: React.CSSProperties = {
  padding: "13px 16px",
  borderRadius: 12,
  cursor: "pointer",
  transition: "0.2s",
  fontWeight: 700,
  userSelect: "none",
};

const sidebarLogout: React.CSSProperties = {
  padding: 14,
  backgroundColor: "rgba(255, 255, 255, 0.14)",
  border: "1px solid rgba(255,255,255,0.18)",
  color: "white",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 900,
};

const mainContent: React.CSSProperties = {
  flexGrow: 1,
  height: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
};

const mobileHeader: React.CSSProperties = {
  display: "none", // shown by CSS media query
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "14px 16px",
  backgroundColor: "#fff",
  borderBottom: "1px solid #e5e7eb",
};

const menuBtn: React.CSSProperties = {
  padding: "8px 12px",
  backgroundColor: "#764ba2",
  color: "white",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 800,
};

const contentPadding: React.CSSProperties = {
  padding: 40,
  boxSizing: "border-box",
  maxWidth: 1200,
};

const sectionAnimation: React.CSSProperties = {
  animation: "fadeIn 0.4s ease-in",
};

const greeting: React.CSSProperties = {
  fontSize: 32,
  margin: "0 0 5px 0",
  color: "#111827",
  fontWeight: 900,
};

const breadcrumb: React.CSSProperties = { color: "#6b7280", marginBottom: 28 };

const gridContainer: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 20,
};

const infoCard: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: 22,
  borderRadius: 18,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  border: "1px solid #eef2ff",
};

const profileDetailCard: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: 26,
  borderRadius: 18,
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  marginTop: 18,
  border: "1px solid #eef2ff",
};

const detailRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 0",
  borderBottom: "1px solid #f1f5f9",
  gap: 16,
};

const detailLabel: React.CSSProperties = { fontWeight: 900, color: "#64748b" };
const detailValue: React.CSSProperties = { fontWeight: 800, color: "#111827" };
