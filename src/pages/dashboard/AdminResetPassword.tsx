import { useMemo, useState } from "react";
import type React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { adminResetPassword } from "../../api/authApi";

export default function AdminResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const uid = params.get("uid") || "";
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const linkValid = useMemo(() => !!uid && !!token, [uid, token]);

  const handleReset = async () => {
    if (!linkValid) {
      setError("Invalid reset link");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Confirm password does not match");
      return;
    }

    setLoading(true);
    setError("");
    setMsg("");

    try {
      const data = await adminResetPassword({ uid, token, password });
      setMsg(data?.message || "Admin password reset successful.");

      setTimeout(() => navigate("/admin/login", { replace: true }), 800);
    } catch (e: any) {
      setError(e?.response?.data?.detail || e?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={box}>
        <h2 style={title}>Admin Reset Password</h2>
        <p style={sub}>Set a new admin password.</p>

        {!linkValid && (
          <div style={errorBox}>
            Invalid or missing reset token. Please request a new link.
          </div>
        )}

        <input
          style={input}
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <div style={errorBox}>{error}</div>}
        {msg && <div style={successBox}>{msg}</div>}

        <button
          style={{ ...btn, opacity: loading ? 0.7 : 1 }}
          disabled={loading || !linkValid}
          onClick={handleReset}
        >
          {loading ? "Updating..." : "UPDATE PASSWORD"}
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
  marginBottom: 12,
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
