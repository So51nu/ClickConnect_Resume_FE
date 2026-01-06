import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({
    phone: "",
    name: "",
    email: "",
    pincode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (form.phone.length !== 10) return "Mobile number must be 10 digits";
    if (!form.name.trim()) return "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email";
    if (form.pincode.length !== 6) return "Pincode must be 6 digits";
    return "";
  };

 const handleRegister = async () => {
  const err = validate()
  if (err) {
    setError(err)
    return
  }

  setLoading(true)
  setError("")

  try {
    await sendOTP(form.phone)

    // 🔥 ALWAYS go to verify-otp for register
    navigate("/verify-otp", {
      state: {
        phone: form.phone,
        name: form.name,
        email: form.email,
        pincode: form.pincode,
        mode: "register",
      },
    })
  } catch {
    setError("Failed to send OTP")
  } finally {
    setLoading(false)
  }
}


  // We need to inject keyframes for animations since we are using inline styles
  const keyframeStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(50px); }
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
      {/* Injecting style tag for animations */}
      <style>{keyframeStyles}</style>
      
      <div style={card}>
        <div style={headerSection}>
          <h2 style={title}>Create Account</h2>
          <p style={subtitle}>Join our colorful community</p>
        </div>

        <div style={formGroup}>
          <input
            style={input}
            type="tel"
            placeholder="Mobile Number"
            value={form.phone}
            maxLength={10}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
            }
          />
          <input
            style={input}
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            style={input}
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            style={input}
            type="tel"
            placeholder="Pincode"
            value={form.pincode}
            maxLength={6}
            onChange={(e) =>
              setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })
            }
          />
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <button
          style={{ ...btn, opacity: loading ? 0.8 : 1 }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <p style={footerText}>
          Already have an account?{" "}
          <span style={loginLink} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* ---------- Animated Colorful Styles ---------- */

const pageWrapper = {
  // FIX: Ensure full coverage and centering
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  boxSizing: "border-box",
  // VIBRANT ANIMATED BACKGROUND
  background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
  backgroundSize: "400% 400%",
  animation: "gradientBG 15s ease infinite", // Background moves slowly
  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  overflowY: "auto", // Allows scrolling on small screens if needed
};

const card = {
  width: "100%",
  maxWidth: "420px",
  backgroundColor: "rgba(255, 255, 255, 0.95)", // Glass-morphism look
  backdropFilter: "blur(10px)", // Blurs background behind card (supported browsers)
  padding: "40px 30px",
  borderRadius: "25px",
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
  textAlign: "center",
  // CARD ENTRANCE ANIMATION
  animation: "fadeInUp 0.8s ease-out forwards",
};

const headerSection = {
  marginBottom: "30px",
};

const title = {
  fontSize: "30px",
  fontWeight: "800",
  margin: "0 0 10px 0",
  color: "#333",
  // Gradient Text
  background: "linear-gradient(to right, #e73c7e, #23a6d5)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subtitle = {
  fontSize: "15px",
  color: "#666",
  fontWeight: "500",
  margin: 0,
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  marginBottom: "25px",
};

const input = {
  width: "100%",
  padding: "15px",
  fontSize: "16px", // Prevents iOS zoom
  borderRadius: "15px",
  border: "2px solid transparent",
  boxSizing: "border-box",
  outline: "none",
  backgroundColor: "#f0f2f5",
  transition: "all 0.3s ease",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
};

// Note: To add focus styles (e.g., glowing border on click) with inline styles
// requires state management for 'isFocused', which complicates the component significantly.
// The current setup is clean and functional.

const btn = {
  width: "100%",
  padding: "16px",
  // Button gradient matches theme
  background: "linear-gradient(to right, #e73c7e, #23a6d5)",
  color: "#fff",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  fontSize: "17px",
  fontWeight: "bold",
  boxShadow: "0 10px 20px -10px rgba(35, 166, 213, 0.5)",
  transition: "transform 0.2s, opacity 0.2s",
};

const errorStyle = {
  color: "#d32f2f",
  backgroundColor: "#ffebee",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "14px",
  marginBottom: "20px",
  fontWeight: "500",
};

const footerText = {
  marginTop: "25px",
  fontSize: "15px",
  color: "#555",
};

const loginLink = {
  color: "#e73c7e",
  cursor: "pointer",
  fontWeight: "bold",
  marginLeft: "5px",
};