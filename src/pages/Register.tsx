// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { sendOTP } from "../api/authApi";

// // export default function Register() {
// //   const [form, setForm] = useState({
// //     phone: "",
// //     name: "",
// //     email: "",
// //     pincode: "",
// //   });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const validate = () => {
// //     if (form.phone.length !== 10) return "Mobile number must be 10 digits";
// //     if (!form.name.trim()) return "Name is required";
// //     if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email";
// //     if (form.pincode.length !== 6) return "Pincode must be 6 digits";
// //     return "";
// //   };

// //  const handleRegister = async () => {
// //   const err = validate()
// //   if (err) {
// //     setError(err)
// //     return
// //   }

// //   setLoading(true)
// //   setError("")

// //   try {
// //     await sendOTP(form.phone)

// //     // 🔥 ALWAYS go to verify-otp for register
// //     navigate("/verify-otp", {
// //       state: {
// //         phone: form.phone,
// //         name: form.name,
// //         email: form.email,
// //         pincode: form.pincode,
// //         mode: "register",
// //       },
// //     })
// //   } catch {
// //     setError("Failed to send OTP")
// //   } finally {
// //     setLoading(false)
// //   }
// // }


// //   // We need to inject keyframes for animations since we are using inline styles
// //   const keyframeStyles = `
// //     @keyframes fadeInUp {
// //       from { opacity: 0; transform: translateY(50px); }
// //       to { opacity: 1; transform: translateY(0); }
// //     }
// //     @keyframes gradientBG {
// //       0% { background-position: 0% 50%; }
// //       50% { background-position: 100% 50%; }
// //       100% { background-position: 0% 50%; }
// //     }
// //   `;

// //   return (
// //     <div style={pageWrapper}>
// //       {/* Injecting style tag for animations */}
// //       <style>{keyframeStyles}</style>
      
// //       <div style={card}>
// //         <div style={headerSection}>
// //           <h2 style={title}>Create Account</h2>
// //           <p style={subtitle}>Join our colorful community</p>
// //         </div>

// //         <div style={formGroup}>
// //           <input
// //             style={input}
// //             type="tel"
// //             placeholder="Mobile Number"
// //             value={form.phone}
// //             maxLength={10}
// //             onChange={(e) =>
// //               setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
// //             }
// //           />
// //           <input
// //             style={input}
// //             type="text"
// //             placeholder="Full Name"
// //             value={form.name}
// //             onChange={(e) => setForm({ ...form, name: e.target.value })}
// //           />
// //           <input
// //             style={input}
// //             type="email"
// //             placeholder="Email Address"
// //             value={form.email}
// //             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //           />
// //           <input
// //             style={input}
// //             type="tel"
// //             placeholder="Pincode"
// //             value={form.pincode}
// //             maxLength={6}
// //             onChange={(e) =>
// //               setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })
// //             }
// //           />
// //         </div>

// //         {error && <p style={errorStyle}>{error}</p>}

// //         <button
// //           style={{ ...btn, opacity: loading ? 0.8 : 1 }}
// //           onClick={handleRegister}
// //           disabled={loading}
// //         >
// //           {loading ? "Sending..." : "Send OTP"}
// //         </button>

// //         <p style={footerText}>
// //           Already have an account?{" "}
// //           <span style={loginLink} onClick={() => navigate("/login")}>
// //             Login
// //           </span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ---------- Animated Colorful Styles ---------- */

// // const pageWrapper = {
// //   // FIX: Ensure full coverage and centering
// //   position: "fixed",
// //   top: 0,
// //   left: 0,
// //   width: "100vw",
// //   height: "100vh",
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   padding: "20px",
// //   boxSizing: "border-box",
// //   // VIBRANT ANIMATED BACKGROUND
// //   background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
// //   backgroundSize: "400% 400%",
// //   animation: "gradientBG 15s ease infinite", // Background moves slowly
// //   fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
// //   overflowY: "auto", // Allows scrolling on small screens if needed
// // };

// // const card = {
// //   width: "100%",
// //   maxWidth: "420px",
// //   backgroundColor: "rgba(255, 255, 255, 0.95)", // Glass-morphism look
// //   backdropFilter: "blur(10px)", // Blurs background behind card (supported browsers)
// //   padding: "40px 30px",
// //   borderRadius: "25px",
// //   boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
// //   textAlign: "center",
// //   // CARD ENTRANCE ANIMATION
// //   animation: "fadeInUp 0.8s ease-out forwards",
// // };

// // const headerSection = {
// //   marginBottom: "30px",
// // };

// // const title = {
// //   fontSize: "30px",
// //   fontWeight: "800",
// //   margin: "0 0 10px 0",
// //   color: "#333",
// //   // Gradient Text
// //   background: "linear-gradient(to right, #e73c7e, #23a6d5)",
// //   WebkitBackgroundClip: "text",
// //   WebkitTextFillColor: "transparent",
// // };

// // const subtitle = {
// //   fontSize: "15px",
// //   color: "#666",
// //   fontWeight: "500",
// //   margin: 0,
// // };

// // const formGroup = {
// //   display: "flex",
// //   flexDirection: "column",
// //   gap: "18px",
// //   marginBottom: "25px",
// // };

// // const input = {
// //   width: "100%",
// //   padding: "15px",
// //   fontSize: "16px", // Prevents iOS zoom
// //   borderRadius: "15px",
// //   border: "2px solid transparent",
// //   boxSizing: "border-box",
// //   outline: "none",
// //   backgroundColor: "#f0f2f5",
// //   transition: "all 0.3s ease",
// //   boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
// // };

// // // Note: To add focus styles (e.g., glowing border on click) with inline styles
// // // requires state management for 'isFocused', which complicates the component significantly.
// // // The current setup is clean and functional.

// // const btn = {
// //   width: "100%",
// //   padding: "16px",
// //   // Button gradient matches theme
// //   background: "linear-gradient(to right, #e73c7e, #23a6d5)",
// //   color: "#fff",
// //   border: "none",
// //   borderRadius: "15px",
// //   cursor: "pointer",
// //   fontSize: "17px",
// //   fontWeight: "bold",
// //   boxShadow: "0 10px 20px -10px rgba(35, 166, 213, 0.5)",
// //   transition: "transform 0.2s, opacity 0.2s",
// // };

// // const errorStyle = {
// //   color: "#d32f2f",
// //   backgroundColor: "#ffebee",
// //   padding: "10px",
// //   borderRadius: "10px",
// //   fontSize: "14px",
// //   marginBottom: "20px",
// //   fontWeight: "500",
// // };

// // const footerText = {
// //   marginTop: "25px",
// //   fontSize: "15px",
// //   color: "#555",
// // };

// // const loginLink = {
// //   color: "#e73c7e",
// //   cursor: "pointer",
// //   fontWeight: "bold",
// //   marginLeft: "5px",
// // };

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { sendOTP } from "../api/authApi";

// export default function Register() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     phone: "",
//     name: "",
//     email: "",
//     pincode: "",
//   });

//   const validate = () => {
//     if (form.phone.length !== 10) return "Mobile must be 10 digits";
//     if (!form.name.trim()) return "Name required";
//     if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email";
//     if (form.pincode.length !== 6) return "Pincode must be 6 digits";
//     return "";
//   };

//   const handleRegister = async () => {
//     const err = validate();
//     if (err) return setError(err);

//     setLoading(true);
//     setError("");

//     try {
//       await sendOTP(form.phone);
//       navigate("/verify-otp", {
//         state: { ...form, mode: "register" },
//       });
//     } catch {
//       setError("OTP send failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={page}>
//       <style>{keyframes}</style>

//       <div style={container}>
//         {/* LEFT FORM */}
//         <div style={left}>
//           <h2 style={title}>Create Account</h2>

//           <input style={input} placeholder="Mobile"
//             maxLength={10}
//             value={form.phone}
//             onChange={(e) =>
//               setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
//             }
//           />
//           <input style={input} placeholder="Full Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <input style={input} placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//           <input style={input} placeholder="Pincode"
//             maxLength={6}
//             value={form.pincode}
//             onChange={(e) =>
//               setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })
//             }
//           />

//           {error && <p style={errorStyle}>{error}</p>}

//           <button style={btn} disabled={loading} onClick={handleRegister}>
//             {loading ? "Sending..." : "SIGN UP"}
//           </button>
//         </div>

//         {/* RIGHT PANEL */}
//         <div style={right}>
//           <h2>Welcome Back!</h2>
//           <p style={{ textAlign: "center" }}>
//             Already have an account?
//           </p>
//           <button style={ghostBtn} onClick={() => navigate("/login")}>
//             SIGN IN
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===== ANIMATION ===== */
// const keyframes = `
// @keyframes slideIn {
//   from { transform: translateX(100%); }
//   to { transform: translateX(0); }
// }
// @media (max-width: 768px) {
//   .hide-mobile { display: none; }
// }
// `;

// /* ===== STYLES ===== */
// const page: React.CSSProperties = {
//   minHeight: "100vh",
//   width: "100vw",
//   background: "#6b8e23",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const container: React.CSSProperties = {
//   width: "100%",
//   maxWidth: 1200,
//   minHeight: 550,
//   background: "#fff",
//   display: "flex",
//   borderRadius: 20,
//   overflow: "hidden",
// };

// const left: React.CSSProperties = {
//   flex: 1,
//   padding: "60px 40px",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
// };

// const right: React.CSSProperties = {
//   flex: 1,
//   background: "#0b4f4a",
//   color: "#fff",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   borderTopLeftRadius: 150,
//   borderBottomLeftRadius: 150,
//   animation: "slideIn 0.9s ease",
// };

// const title = { fontSize: 28, marginBottom: 20 };
// const input = { padding: 12, marginBottom: 12, fontSize: 14 };
// const btn = { padding: 14, fontWeight: 700, cursor: "pointer" };
// const ghostBtn = {
//   padding: "10px 30px",
//   background: "transparent",
//   border: "2px solid #fff",
//   color: "#fff",
//   borderRadius: 25,
//   cursor: "pointer",
// };
// const errorStyle = { color: "red", marginBottom: 10 };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    phone: "",
    name: "",
    email: "",
    pincode: "",
  });

  const validate = () => {
    if (form.phone.length !== 10) return "Mobile number must be 10 digits";
    if (!form.name.trim()) return "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter valid email";
    if (form.pincode.length !== 6) return "Pincode must be 6 digits";
    return "";
  };

  const handleRegister = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await sendOTP(form.phone);
      navigate("/verify-otp", {
        state: { ...form, mode: "register" },
      });
    } catch {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <style>{keyframes}</style>

      <div style={container}>
        {/* FORM SIDE */}
        <div style={formSide}>
          <h2 style={title}>Create Account</h2>
          <p style={subtitle}>Enter your details to get started</p>

          {/* FIELD */}
          <div style={field}>
            <label style={label}>Mobile Number</label>
            <input
              style={input}
              placeholder="10-digit mobile number"
              maxLength={10}
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>

          <div style={field}>
            <label style={label}>Full Name</label>
            <input
              style={input}
              placeholder="Your full name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div style={field}>
            <label style={label}>Email Address</label>
            <input
              style={input}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div style={field}>
            <label style={label}>Pincode</label>
            <input
              style={input}
              placeholder="6-digit pincode"
              maxLength={6}
              value={form.pincode}
              onChange={(e) =>
                setForm({
                  ...form,
                  pincode: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>

          {error && <div style={errorBox}>{error}</div>}

          <button
            style={{ ...btn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
            onClick={handleRegister}
          >
            {loading ? "Sending OTP..." : "SIGN UP"}
          </button>
        </div>

        {/* RIGHT PANEL (ANIMATION SAME) */}
        <div style={rightPanel}>
          <h2 style={panelTitle}>Welcome Back!</h2>
          <p style={panelText}>
            Already have an account?
            <br />
            Login to continue
          </p>

          <button
            style={ghostBtn}
            onClick={() => navigate("/login")}
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= ANIMATION (SAME AS BEFORE) ================= */

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

/* FORM */

const formSide: React.CSSProperties = {
  flex: 1,
  padding: "60px 50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const title = { fontSize: 32, fontWeight: 800, marginBottom: 5 };
const subtitle = { color: "#64748b", marginBottom: 30 };

const field: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: 18,
};

const label = {
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: "#334155",
};

const input: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  fontSize: 15,
  outline: "none",
};

const btn: React.CSSProperties = {
  marginTop: 10,
  padding: 14,
  borderRadius: 8,
  background: "#cddc39",
  border: "none",
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


const ghostBtn: React.CSSProperties = {
  padding: "10px 30px",
  background: "transparent",
  border: "2px solid #fff",
  color: "#fff",
  borderRadius: 25,
  cursor: "pointer",
};

/* ERROR */

const errorBox: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: 12,
  borderRadius: 8,
  fontSize: 13,
  marginBottom: 15,
  border: "1px solid #fee2e2",
};
