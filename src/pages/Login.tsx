import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter valid email");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginStudent({ email, password });
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard", { replace: true });
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
          e?.response?.data?.detail ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <style>{responsiveStyles}</style>

      <div className="login-container" style={container}>
        {/* LEFT PANEL (Ab mobile par ye uupar dikhega) */}
        <div className="side-panel" style={leftPanel}>
          <h2 style={panelTitle}>Hello, Friend!</h2>
          <p style={panelText}>
            Create your account and <br /> start your journey with us
          </p>

          <button style={ghostBtn} onClick={() => navigate("/register")}>
            SIGN UP
          </button>
          
          <p style={{ marginTop: 20, fontSize: 14 }}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline", fontWeight: 700 }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </p>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="form-side" style={formSide}>
          <h2 style={title}>Sign In</h2>
          <p style={subtitle}>Login with Email & Password</p>

          <div style={inputWrapper}>
            <input
              style={inputField}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={inputWrapper}>
            <input
              style={inputField}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              style={toggleIcon} 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          <button
            className="login-btn"
            style={{ ...btn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <p style={adminText}>
            Are you an Admin?
            <span style={adminLink} onClick={() => navigate("/admin/login")}>
              Admin Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= RESPONSIVE LOGIC ================= */
const responsiveStyles = `
@keyframes slideFromLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.login-btn:hover {
  background: #b8c732 !important;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column !important;
    width: 90% !important;
    max-width: 450px !important;
    margin: 20px auto !important;
    min-height: auto !important;
    border-radius: 20px !important;
  }
  
  .side-panel {
    order: 1 !important; /* Hello Friend panel comes FIRST on mobile */
    border-radius: 0 0 50px 50px !important; /* Bottom curve for design */
    padding: 40px 20px !important;
    animation: fadeIn 0.8s ease !important; /* Slide animation disabled for vertical stack */
  }

  .form-side {
    order: 2 !important; /* Login form comes SECOND on mobile */
    padding: 40px 25px !important;
  }

  h2 { font-size: 26px !important; }
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
  fontFamily: "'Segoe UI', sans-serif",
  padding: "20px 10px",
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
  background: "#0b4f4a",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 40,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  animation: "slideFromLeft 0.8s ease",
};

const panelTitle = { fontSize: 32, marginBottom: 10, textAlign: 'center' as const };
const panelText = { textAlign: "center" as const, opacity: 0.9, marginBottom: 30 };

const formSide: React.CSSProperties = {
  flex: 1,
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  animation: "fadeIn 0.8s ease",
};

const title = { fontSize: 30, fontWeight: 800, marginBottom: 5 };
const subtitle = { fontSize: 15, color: "#666", marginBottom: 25 };

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
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.2s",
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
  background: "#cddc39",
  border: "none",
  borderRadius: 8,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 16,
  transition: "all 0.3s ease",
  marginTop: 10,
};

const ghostBtn: React.CSSProperties = {
  padding: "12px 40px",
  background: "transparent",
  border: "2px solid #fff",
  color: "#fff",
  borderRadius: 25,
  cursor: "pointer",
  fontWeight: 600,
};

const errorStyle = { color: "#ff4d4d", fontSize: 14, marginBottom: 12 };
const adminText = { marginTop: 25, fontSize: 14, color: "#555", textAlign: 'center' as const };
const adminLink = { marginLeft: 6, cursor: "pointer", fontWeight: "bold" as const, textDecoration: "underline" };