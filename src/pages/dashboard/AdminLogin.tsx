import { useState } from "react";
import type React from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      setError("Please fill all fields");
      return;
    }
    if (phone.replace(/\D/g, "").length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/admin/login/", {
        phone,
        password,
      });

      const data = res.data;

      if (!data?.admin_access || !data?.admin) {
        throw new Error("Invalid admin login response");
      }

      localStorage.setItem("admin_access", data.admin_access);

      if (data.admin_refresh) {
        localStorage.setItem("admin_refresh", data.admin_refresh);
      } else {
        localStorage.removeItem("admin_refresh");
      }

      localStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin/dashboard", { replace: true });
    } catch (e: any) {
      setError(
        e?.response?.data?.detail ||
          e?.response?.data?.message ||
          "Invalid admin credentials"
      );
      localStorage.removeItem("admin_access");
      localStorage.removeItem("admin_refresh");
      localStorage.removeItem("admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <style>{responsiveStyles}</style>

      <div className="login-container" style={container}>
        {/* LEFT INFO PANEL - First on Mobile */}
        <div className="side-panel" style={leftPanel}>
          <div style={{ fontSize: 50, marginBottom: 20 }}>🛡️</div>
          <h2 style={panelTitle}>Admin Portal</h2>
          <p style={panelText}>
            Authorized personnel only <br />
            Secure access required
          </p>

          <button style={ghostBtn} onClick={() => navigate("/login")}>
            USER LOGIN
          </button>
          
          <p style={{ marginTop: 15, fontSize: 14 }}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline", fontWeight: 700, color: "#fff" }}
              onClick={() => navigate("/admin/forgot-password")}
            >
              Forgot password?
            </span>
          </p>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="form-side" style={formSide}>
          <h2 style={title}>Admin Login</h2>
          <p style={subtitle}>Enter your credentials</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* PHONE INPUT */}
            <div style={inputWrapper}>
              <input
                style={inputField}
                type="tel"
                inputMode="numeric"
                placeholder="Phone Number"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                autoComplete="username"
              />
            </div>

            {/* PASSWORD INPUT WITH TOGGLE */}
            <div style={inputWrapper}>
              <input
                style={inputField}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <span 
                style={toggleIcon} 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {error && <div style={errorBox}>{error}</div>}

            <button
              type="submit"
              className="admin-btn"
              style={{ ...btn, opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? "Authenticating..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= CSS & RESPONSIVE LOGIC ================= */
const responsiveStyles = `
@keyframes slideFromRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.admin-btn:hover {
  background: #1e293b !important;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column !important;
    width: 90% !important;
    max-width: 450px !important;
    margin: 20px auto !important;
    min-height: auto !important;
  }
  
  .side-panel {
    order: 1 !important; /* Admin Info Panel first on mobile */
    border-radius: 0 0 50px 50px !important;
    padding: 40px 20px !important;
    animation: fadeIn 0.8s ease !important;
  }

  .form-side {
    order: 2 !important; /* Login form second on mobile */
    padding: 40px 25px !important;
  }
}
`;

/* ================= STYLES ================= */
const page: React.CSSProperties = {
  width: "100vw",
  minHeight: "100vh",
  background: "#001F3D",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Inter','Segoe UI',sans-serif",
  padding: "10px",
  boxSizing: "border-box"
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: 1000,
  minHeight: 550,
  background: "#fff",
  display: "flex",
  borderRadius: 25,
  overflow: "hidden",
  boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
};

const leftPanel: React.CSSProperties = {
  flex: 1,
  background: "#0f172a",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 40,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  animation: "slideFromRight 0.8s ease",
};

const panelTitle = { fontSize: 32, marginBottom: 10, textAlign: 'center' as const };
const panelText = { textAlign: "center" as const, opacity: 0.85, marginBottom: 30 };

const formSide: React.CSSProperties = {
  flex: 1,
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  animation: "fadeIn 0.8s ease",
};

const title = { fontSize: 30, fontWeight: 800, marginBottom: 5, color: "#020617" };
const subtitle = { fontSize: 15, color: "#64748b", marginBottom: 25 };

const inputWrapper: React.CSSProperties = {
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginBottom: 15,
};

const inputField: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  paddingRight: "45px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "2px solid #e2e8f0",
  boxSizing: "border-box",
  outline: "none",
};

const toggleIcon: React.CSSProperties = {
  position: "absolute",
  right: "15px",
  cursor: "pointer",
  fontSize: "18px",
  userSelect: "none",
  zIndex: 10,
};

const btn: React.CSSProperties = {
  width: "100%",
  padding: 14,
  background: "#020617",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 16,
  transition: "all 0.3s ease",
  marginTop: 10,
};

const ghostBtn: React.CSSProperties = {
  padding: "12px 30px",
  background: "transparent",
  border: "2px solid #fff",
  color: "#fff",
  borderRadius: 25,
  cursor: "pointer",
};

const errorBox: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "13px",
  marginBottom: "15px",
  border: "1px solid #fee2e2",
};