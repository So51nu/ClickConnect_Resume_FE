// // src/pages/VerifyOtp.tsx
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { verifyOTP } from "../api/authApi";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const { state }: any = useLocation();

//   // Redirect if accessed directly without state
//   if (!state || !state.phone) {
//     return (
//       <div style={pageWrapper}>
//         <div style={card}>
//           <h2 style={title}>Session Expired</h2>
//           <p style={subtitle}>Please go back and request a new OTP.</p>
//           <button style={btn} onClick={() => navigate("/login")}>
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleVerify = async () => {
//     if (otp.length !== 6) {
//       setError("OTP must be 6 digits");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     const payload: any = {
//       phone: state.phone,
//       otp: otp,
//     };

//     if (state.mode === "register") {
//       payload.name = state.name;
//       payload.email = state.email;
//       payload.pincode = state.pincode;
//     }

//     try {
//       const data = await verifyOTP(payload);

//       // ✅ single standard keys
//       localStorage.setItem("access", data.access);
//       localStorage.setItem("refresh", data.refresh);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // cleanup old keys (optional)
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");

//       navigate("/dashboard", { replace: true });
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const keyframeStyles = `
//     @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//     @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
//   `;

//   return (
//     <div style={pageWrapper}>
//       <style>{keyframeStyles}</style>

//       <div style={card}>
//         <div style={headerSection}>
//           <h2 style={title}>Verify OTP</h2>
//           <p style={subtitle}>Sent to +91 {state.phone}</p>
//         </div>

//         <div style={formGroup}>
//           <input
//             style={input}
//             type="tel"
//             placeholder="Enter 6-digit OTP"
//             value={otp}
//             maxLength={6}
//             onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//           />
//         </div>

//         {error && <p style={errorStyle}>{error}</p>}

//         <button style={{ ...btn, opacity: loading ? 0.8 : 1 }} onClick={handleVerify} disabled={loading}>
//           {loading ? "Verifying..." : "Verify & Continue"}
//         </button>

//         <p style={footerText}>
//           Didn't receive code?{" "}
//           <span style={resendLink} onClick={() => navigate(-1)}>
//             Request again
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ---------- Styles (same theme) ---------- */
// const pageWrapper = {
//   position: "fixed" as const,
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: "20px",
//   boxSizing: "border-box" as const,
//   background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
//   backgroundSize: "400% 400%",
//   animation: "gradientBG 15s ease infinite",
//   fontFamily: "'Segoe UI', Roboto, sans-serif",
// };

// const card = {
//   width: "100%",
//   maxWidth: "400px",
//   backgroundColor: "rgba(255, 255, 255, 0.95)",
//   backdropFilter: "blur(10px)",
//   padding: "40px 30px",
//   borderRadius: "25px",
//   boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//   textAlign: "center" as const,
//   animation: "fadeInUp 0.6s ease-out forwards",
// };

// const headerSection = { marginBottom: "30px" };
// const title = {
//   fontSize: "30px",
//   fontWeight: "800",
//   margin: "0 0 10px 0",
//   background: "linear-gradient(to right, #e73c7e, #23a6d5)",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
// };
// const subtitle = { fontSize: "15px", color: "#666", margin: 0 };
// const formGroup = { display: "flex", flexDirection: "column" as const, gap: "18px", marginBottom: "25px" };

// const input = {
//   width: "100%",
//   padding: "15px",
//   fontSize: "18px",
//   textAlign: "center" as const,
//   letterSpacing: "4px",
//   borderRadius: "15px",
//   border: "2px solid #eee",
//   boxSizing: "border-box" as const,
//   outline: "none",
//   backgroundColor: "#fcfcfc",
// };

// const btn = {
//   width: "100%",
//   padding: "16px",
//   background: "linear-gradient(to right, #e73c7e, #23a6d5)",
//   color: "#fff",
//   border: "none",
//   borderRadius: "15px",
//   cursor: "pointer",
//   fontSize: "17px",
//   fontWeight: "bold",
// };

// const errorStyle = {
//   color: "#d32f2f",
//   backgroundColor: "#ffebee",
//   padding: "10px",
//   borderRadius: "10px",
//   fontSize: "14px",
//   marginBottom: "20px",
// };

// const footerText = { marginTop: "25px", fontSize: "15px", color: "#555" };
// const resendLink = {
//   color: "#23a6d5",
//   cursor: "pointer",
//   fontWeight: "bold" as const,
//   textDecoration: "underline",
//   marginLeft: "5px",
// };

// src/pages/VerifyOtp.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../api/authApi";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const { state }: any = useLocation();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // safety
  if (!state || !state.phone) {
    return (
      <div style={page}>
        <div style={container}>
          <div style={formSide}>
            <h2 style={title}>Session Expired</h2>
            <p style={subtitle}>Please request OTP again</p>
            <button style={btn} onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    const payload: any = {
      phone: state.phone,
      otp,
    };

    if (state.mode === "register") {
      payload.name = state.name;
      payload.email = state.email;
      payload.pincode = state.pincode;
    }

    try {
      const data = await verifyOTP(payload);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <style>{keyframes}</style>

      <div style={container}>
        {/* LEFT FORM */}
        <div style={formSide}>
          <h2 style={title}>Verify OTP</h2>
          <p style={subtitle}>Sent to +91 {state.phone}</p>

          <div style={otpWrapper}>
            <input
              style={otpInput}
              placeholder="• • • • • •"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          {error && <div style={errorBox}>{error}</div>}

          <button
            style={{ ...btn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
            onClick={handleVerify}
          >
            {loading ? "Verifying..." : "VERIFY & CONTINUE"}
          </button>

          <p style={resend}>
            Didn't receive OTP?
            <span style={resendLink} onClick={() => navigate(-1)}>
              Resend
            </span>
          </p>
        </div>

        {/* RIGHT PANEL (SAME ANIMATION) */}
        <div style={rightPanel}>
          <h2 style={panelTitle}>Almost There!</h2>
          <p style={panelText}>
            Please enter the OTP sent <br /> to your mobile number
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= ANIMATION ================= */

const keyframes = `
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
`;

/* ================= STYLES ================= */

const page: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  background: "#001F3D",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Segoe UI', sans-serif",
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  minHeight: 600,
  background: "#fff",
  display: "flex",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
};

/* FORM SIDE */

const formSide: React.CSSProperties = {
  flex: 1,
  padding: "60px 50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const title = { fontSize: 32, fontWeight: 800, marginBottom: 6 };
const subtitle = { fontSize: 15, color: "#64748b", marginBottom: 30 };

const otpWrapper = {
  marginBottom: 20,
};

const otpInput: React.CSSProperties = {
  width: "100%",
  padding: "18px",
  fontSize: 24,
  textAlign: "center",
  letterSpacing: 10,
  borderRadius: 10,
  border: "2px solid #cbd5e1",
  outline: "none",
};

/* BUTTON */

const btn: React.CSSProperties = {
  padding: 16,
  background: "#cddc39",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
};

/* RIGHT PANEL */

const rightPanel: React.CSSProperties = {
  flex: 1,
  background: "#0b4f4a",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 40,
  borderTopLeftRadius: 150,
  borderBottomLeftRadius: 150,
  animation: "slideIn 0.9s ease",
};

const panelTitle = { fontSize: 32, marginBottom: 10 };
const panelText: React.CSSProperties = {
  textAlign: "center",
  opacity: 0.9,
  marginBottom: 30,
};


/* EXTRA */

const resend = { marginTop: 25, fontSize: 15, color: "#555" };

const resendLink = {
  marginLeft: 6,
  cursor: "pointer",
  fontWeight: "bold" as const,
  textDecoration: "underline",
};

const errorBox: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: 12,
  borderRadius: 8,
  fontSize: 13,
  marginBottom: 15,
  border: "1px solid #fee2e2",
};
