// src/pages/admin/AdminLogin.tsx
import { useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!phone || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/admin/login/", {
        phone,
        password,
      });

      // ✅ IMPORTANT: axiosInstance reads admin_access / access
      localStorage.setItem("admin_access", res.data.access);
      localStorage.setItem("access", res.data.access); // keep common key too
      if (res.data.refresh) localStorage.setItem("admin_refresh", res.data.refresh);

      localStorage.setItem("admin", JSON.stringify(res.data.user));

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid admin credentials or unauthorized access");
    } finally {
      setLoading(false);
    }
  };

  const keyframeStyles = `
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div style={pageWrapper}>
      <style>{keyframeStyles}</style>

      <div style={loginCard}>
        <div style={headerSection}>
          <div style={adminIcon}>🛡️</div>
          <h2 style={title}>Admin Portal</h2>
          <p style={subtitle}>Authorized Personnel Only</p>
        </div>

        <div style={formGroup}>
          <div style={inputContainer}>
            <label style={label}>Phone Number</label>
            <input
              style={input}
              type="tel"
              placeholder="Enter admin phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <div style={inputContainer}>
            <label style={label}>Security Password</label>
            <input
              style={input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <div style={errorBox}>{error}</div>}

        <button
          style={{ ...btn, opacity: loading ? 0.7 : 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Login to Console"}
        </button>

        <p style={footerLink} onClick={() => navigate("/login")}>
          ← Back to User Login
        </p>
      </div>
    </div>
  );
}

/* ---------- Admin UI Styles ---------- */

const pageWrapper: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  margin: 0,
  padding: 0,
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "#0f172a",
  backgroundImage: "radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)",
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
};

const loginCard: React.CSSProperties = {
  width: "100%",
  maxWidth: "400px",
  backgroundColor: "#ffffff",
  padding: "40px 32px",
  borderRadius: "20px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
  animation: "slideDown 0.5s ease-out",
  textAlign: "center",
};

const headerSection: React.CSSProperties = { marginBottom: "30px" };
const adminIcon: React.CSSProperties = { fontSize: "40px", marginBottom: "10px" };

const title: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: 800,
  color: "#1e293b",
  margin: "0 0 5px 0",
};

const subtitle: React.CSSProperties = { fontSize: "14px", color: "#64748b", margin: 0 };

const formGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  textAlign: "left",
  marginBottom: "25px",
};

const inputContainer: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "8px" };

const label: React.CSSProperties = { fontSize: "13px", fontWeight: 600, color: "#475569" };

const input: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "2px solid #e2e8f0",
  outline: "none",
  transition: "all 0.2s",
  backgroundColor: "#f8fafc",
};

const btn: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#0f172a",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
  transition: "transform 0.1s, background-color 0.2s",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const errorBox: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 500,
  marginBottom: "20px",
  border: "1px solid #fee2e2",
};

const footerLink: React.CSSProperties = {
  marginTop: "25px",
  fontSize: "14px",
  color: "#64748b",
  cursor: "pointer",
  textDecoration: "underline",
};
