import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sendOTP } from "../api/authApi";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  // Pre-filled phone (after register)
  const [phone, setPhone] = useState(location.state?.phone || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const handleLogin = async () => {
  if (phone.length !== 10) {
    setError("Mobile number must be 10 digits")
    return
  }

  setLoading(true)
  setError("")

  try {
    await sendOTP(phone)

    navigate("/verify-otp", {
      state: {
        phone: phone,
        mode: "login",
      },
    })
  } catch {
    setError("OTP send failed")
  } finally {
    setLoading(false)
  }
}

  const keyframeStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <div style={pageWrapper}>
      <style>{keyframeStyles}</style>

      <div style={card}>
        <div style={headerSection}>
          <h2 style={title}>Welcome Back</h2>
          <p style={subtitle}>Login to your account</p>
        </div>

        {/* USER LOGIN */}
        <div style={formGroup}>
          <input
            style={input}
            type="tel"
            placeholder="Mobile Number"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <button
          style={{ ...btn, opacity: loading ? 0.8 : 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Login with OTP"}
        </button>

        {/* REGISTER */}
        <p style={footerText}>
          New user?
          <span style={link} onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>

        {/* DIVIDER */}
        <hr style={divider} />

        {/* ADMIN LOGIN */}
        <p style={adminText}>
          Are you an Admin?
          <span
            style={adminLink}
            onClick={() => navigate("/admin/login")}
          >
            Admin Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const pageWrapper = {
  position: "fixed" as const,
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
  backgroundSize: "400% 400%",
  animation: "gradientBG 15s ease infinite",
  fontFamily: "'Segoe UI', Roboto, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: 400,
  backgroundColor: "rgba(255,255,255,0.95)",
  padding: "40px 30px",
  borderRadius: 25,
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
  textAlign: "center" as const,
  animation: "fadeInUp 0.6s ease-out forwards",
};

const headerSection = { marginBottom: 30 };

const title = {
  fontSize: 30,
  fontWeight: 800,
  background: "linear-gradient(to right, #e73c7e, #23a6d5)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitle = { fontSize: 15, color: "#666" };

const formGroup = { marginBottom: 25 };

const input = {
  width: "100%",
  padding: 15,
  fontSize: 16,
  borderRadius: 15,
  border: "none",
  backgroundColor: "#f0f2f5",
  outline: "none",
};

const btn = {
  width: "100%",
  padding: 16,
  background: "linear-gradient(to right, #e73c7e, #23a6d5)",
  color: "#fff",
  border: "none",
  borderRadius: 15,
  cursor: "pointer",
  fontSize: 17,
  fontWeight: "bold",
};

const errorStyle = {
  color: "#d32f2f",
  backgroundColor: "#ffebee",
  padding: 10,
  borderRadius: 10,
  marginBottom: 15,
};

const footerText = {
  marginTop: 20,
  fontSize: 15,
  color: "#555",
};

const link = {
  color: "#e73c7e",
  cursor: "pointer",
  fontWeight: "bold" as const,
  marginLeft: 6,
  textDecoration: "underline",
};

const divider = {
  margin: "30px 0",
  border: "none",
  borderTop: "1px solid #ddd",
};

const adminText = {
  fontSize: 14,
  color: "#444",
};

const adminLink = {
  marginLeft: 6,
  cursor: "pointer",
  fontWeight: "bold" as const,
  textDecoration: "underline",
};
