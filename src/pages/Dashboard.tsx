import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const keyframeStyles = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
  `;

  return (
    <div style={dashboardWrapper}>
      <style>{keyframeStyles}</style>

      {/* --- SIDEBAR --- */}
      <div style={{
        ...sidebar,
        display: isMobileMenuOpen ? "flex" : (window.innerWidth <= 768 ? "none" : "flex")
      }}>
        <div style={logoSection}>
          <h2 style={logoText}>My App</h2>
        </div>

        <nav style={navLinks}>
          <div 
            style={{ ...navItem, backgroundColor: activeTab === "home" ? "rgba(255,255,255,0.2)" : "transparent" }}
            onClick={() => { setActiveTab("home"); setIsMobileMenuOpen(false); }}
          >
            🏠 Dashboard
          </div>
          <div 
            style={{ ...navItem, backgroundColor: activeTab === "profile" ? "rgba(255,255,255,0.2)" : "transparent" }}
            onClick={() => { setActiveTab("profile"); setIsMobileMenuOpen(false); }}
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
        {/* Mobile Header */}
        <div style={mobileHeader}>
          <button style={menuBtn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰ Menu
          </button>
          <span style={{ fontWeight: "bold" }}>Dashboard</span>
        </div>

        <div style={contentPadding}>
          {activeTab === "home" ? (
            <div style={sectionAnimation}>
              <h1 style={greeting}>Hello, {user.name || "User"}! 👋</h1>
              <p style={breadcrumb}>Welcome back to your full-screen overview.</p>
              
              <div style={gridContainer}>
                <div style={infoCard}>
                  <h3>Account Status</h3>
                  <p style={{ color: "#4caf50", fontSize: "20px", fontWeight: "bold" }}>Verified ✅</p>
                </div>
                <div style={infoCard}>
                  <h3>Active Since</h3>
                  <p style={{ fontSize: "20px" }}>Jan 2026</p>
                </div>
                <div style={infoCard}>
                  <h3>Notifications</h3>
                  <p style={{ fontSize: "20px" }}>0 New Messages</p>
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
                <div style={detailRow}>
                  <span style={detailLabel}>User ID</span>
                  <span style={{ ...detailValue, fontSize: "12px", color: "#888" }}>{user.id || "ID-99283"}</span>
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

const dashboardWrapper = {
  display: "flex",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#f4f7fe",
  fontFamily: "'Segoe UI', Roboto, sans-serif",
};

const sidebar = {
  width: "260px",
  height: "100%",
  background: "linear-gradient(180deg, #764ba2 0%, #667eea 100%)",
  color: "#fff",
  flexDirection: "column",
  padding: "20px",
  boxSizing: "border-box",
  transition: "0.3s ease",
  zIndex: 1000,
};

const logoSection = {
  padding: "20px 0",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  marginBottom: "20px",
};

const logoText = {
  margin: 0,
  fontSize: "24px",
  letterSpacing: "1px",
};

const navLinks = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flexGrow: 1,
};

const navItem = {
  padding: "15px 20px",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "0.2s",
  fontWeight: "500",
};

const sidebarLogout = {
  padding: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: "none",
  color: "white",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
};

const mainContent = {
  flexGrow: 1,
  height: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
};

const mobileHeader = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "15px 20px",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ddd",
  // Show only on mobile
  "@media (min-width: 769px)": { display: "none" },
};

const menuBtn = {
  padding: "8px 12px",
  backgroundColor: "#764ba2",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

const contentPadding = {
  padding: "40px",
  boxSizing: "border-box",
  maxWidth: "1200px", // Content limited for readability but page is full screen
};

const sectionAnimation = {
  animation: "fadeIn 0.5s ease-in",
};

const greeting = {
  fontSize: "32px",
  margin: "0 0 5px 0",
  color: "#1a1a1a",
};

const breadcrumb = {
  color: "#666",
  marginBottom: "30px",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const infoCard = {
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const profileDetailCard = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  marginTop: "20px",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "18px 0",
  borderBottom: "1px solid #f0f0f0",
};

const detailLabel = {
  fontWeight: "bold",
  color: "#777",
};

const detailValue = {
  fontWeight: "600",
  color: "#333",
};