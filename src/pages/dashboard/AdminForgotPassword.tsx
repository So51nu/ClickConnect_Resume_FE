import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { adminForgotPassword } from "../../api/authApi";

export default function AdminForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter valid email");
      return;
    }

    setLoading(true);
    setError("");
    setMsg("");

    try {
      const data = await adminForgotPassword(email);
      setMsg(data?.message || "Reset link sent if email exists.");
    } catch (e: any) {
      setError(e?.response?.data?.detail || e?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={box}>
        <h2 style={title}>Admin Forgot Password</h2>
        <p style={sub}>Enter admin email. We'll send a reset link.</p>

        <input
          style={input}
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <div style={errorBox}>{error}</div>}
        {msg && <div style={successBox}>{msg}</div>}

        <button
          style={{ ...btn, opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          onClick={handleSend}
        >
          {loading ? "Sending..." : "SEND RESET LINK"}
        </button>

        <p style={linkRow}>
          Back to{" "}
          <span style={link} onClick={() => navigate("/admin/login")}>
            Admin Login
          </span>
        </p>
      </div>
    </div>
  );
}

const page: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  background: "#001F3D",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Segoe UI', sans-serif",
};

const box: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  background: "#fff",
  borderRadius: 16,
  padding: 30,
  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
};

const title = { fontSize: 28, fontWeight: 800, marginBottom: 6 };
const sub = { fontSize: 14, color: "#64748b", marginBottom: 18 };

const input: React.CSSProperties = {
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  marginBottom: 14,
  fontSize: 15,
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
};

const errorBox: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: 12,
  borderRadius: 8,
  fontSize: 13,
  marginBottom: 12,
  border: "1px solid #fee2e2",
};

const successBox: React.CSSProperties = {
  backgroundColor: "#ecfdf5",
  color: "#047857",
  padding: 12,
  borderRadius: 8,
  fontSize: 13,
  marginBottom: 12,
  border: "1px solid #a7f3d0",
};

const linkRow: React.CSSProperties = { marginTop: 14, fontSize: 14, color: "#334155" };
const link: React.CSSProperties = { cursor: "pointer", fontWeight: 700, textDecoration: "underline" };
