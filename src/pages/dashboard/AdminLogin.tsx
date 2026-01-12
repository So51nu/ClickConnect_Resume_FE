// // // src/pages/admin/AdminLogin.tsx
// // import { useState } from "react";
// // import axios from "../../api/axiosInstance";
// // import { useNavigate } from "react-router-dom";

// // export default function AdminLogin() {
// //   const [phone, setPhone] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleLogin = async () => {
// //     if (!phone || !password) {
// //       setError("Please fill all fields");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");

// //     try {
// //       const res = await axios.post("/auth/admin/login/", {
// //         phone,
// //         password,
// //       });

// //       // ✅ IMPORTANT: axiosInstance reads admin_access / access
// //       localStorage.setItem("admin_access", res.data.access);
// //       localStorage.setItem("access", res.data.access); // keep common key too
// //       if (res.data.refresh) localStorage.setItem("admin_refresh", res.data.refresh);

// //       localStorage.setItem("admin", JSON.stringify(res.data.user));

// //       navigate("/admin/dashboard");
// //     } catch (err) {
// //       setError("Invalid admin credentials or unauthorized access");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const keyframeStyles = `
// //     @keyframes slideDown {
// //       from { opacity: 0; transform: translateY(-20px); }
// //       to { opacity: 1; transform: translateY(0); }
// //     }
// //   `;

// //   return (
// //     <div style={pageWrapper}>
// //       <style>{keyframeStyles}</style>

// //       <div style={loginCard}>
// //         <div style={headerSection}>
// //           <div style={adminIcon}>🛡️</div>
// //           <h2 style={title}>Admin Portal</h2>
// //           <p style={subtitle}>Authorized Personnel Only</p>
// //         </div>

// //         <div style={formGroup}>
// //           <div style={inputContainer}>
// //             <label style={label}>Phone Number</label>
// //             <input
// //               style={input}
// //               type="tel"
// //               placeholder="Enter admin phone"
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
// //             />
// //           </div>

// //           <div style={inputContainer}>
// //             <label style={label}>Security Password</label>
// //             <input
// //               style={input}
// //               type="password"
// //               placeholder="••••••••"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />
// //           </div>
// //         </div>

// //         {error && <div style={errorBox}>{error}</div>}

// //         <button
// //           style={{ ...btn, opacity: loading ? 0.7 : 1 }}
// //           onClick={handleLogin}
// //           disabled={loading}
// //         >
// //           {loading ? "Authenticating..." : "Login to Console"}
// //         </button>

// //         <p style={footerLink} onClick={() => navigate("/login")}>
// //           ← Back to User Login
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ---------- Admin UI Styles ---------- */

// // const pageWrapper: React.CSSProperties = {
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   width: "100vw",
// //   height: "100vh",
// //   margin: 0,
// //   padding: 0,
// //   position: "fixed",
// //   top: 0,
// //   left: 0,
// //   backgroundColor: "#0f172a",
// //   backgroundImage: "radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)",
// //   fontFamily: "'Inter', 'Segoe UI', sans-serif",
// // };

// // const loginCard: React.CSSProperties = {
// //   width: "100%",
// //   maxWidth: "400px",
// //   backgroundColor: "#ffffff",
// //   padding: "40px 32px",
// //   borderRadius: "20px",
// //   boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
// //   animation: "slideDown 0.5s ease-out",
// //   textAlign: "center",
// // };

// // const headerSection: React.CSSProperties = { marginBottom: "30px" };
// // const adminIcon: React.CSSProperties = { fontSize: "40px", marginBottom: "10px" };

// // const title: React.CSSProperties = {
// //   fontSize: "26px",
// //   fontWeight: 800,
// //   color: "#1e293b",
// //   margin: "0 0 5px 0",
// // };

// // const subtitle: React.CSSProperties = { fontSize: "14px", color: "#64748b", margin: 0 };

// // const formGroup: React.CSSProperties = {
// //   display: "flex",
// //   flexDirection: "column",
// //   gap: "20px",
// //   textAlign: "left",
// //   marginBottom: "25px",
// // };

// // const inputContainer: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "8px" };

// // const label: React.CSSProperties = { fontSize: "13px", fontWeight: 600, color: "#475569" };

// // const input: React.CSSProperties = {
// //   padding: "12px 16px",
// //   fontSize: "16px",
// //   borderRadius: "10px",
// //   border: "2px solid #e2e8f0",
// //   outline: "none",
// //   transition: "all 0.2s",
// //   backgroundColor: "#f8fafc",
// // };

// // const btn: React.CSSProperties = {
// //   width: "100%",
// //   padding: "14px",
// //   backgroundColor: "#0f172a",
// //   color: "#fff",
// //   border: "none",
// //   borderRadius: "10px",
// //   fontSize: "16px",
// //   fontWeight: 700,
// //   cursor: "pointer",
// //   transition: "transform 0.1s, background-color 0.2s",
// //   boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
// // };

// // const errorBox: React.CSSProperties = {
// //   backgroundColor: "#fef2f2",
// //   color: "#dc2626",
// //   padding: "12px",
// //   borderRadius: "8px",
// //   fontSize: "13px",
// //   fontWeight: 500,
// //   marginBottom: "20px",
// //   border: "1px solid #fee2e2",
// // };

// // const footerLink: React.CSSProperties = {
// //   marginTop: "25px",
// //   fontSize: "14px",
// //   color: "#64748b",
// //   cursor: "pointer",
// //   textDecoration: "underline",
// // };

// // src/pages/admin/AdminLogin.tsx
// import { useState } from "react";
// import axios from "../../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const navigate = useNavigate();

//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!phone || !password) {
//       setError("Please fill all fields");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("/auth/admin/login/", {
//         phone,
//         password,
//       });

//       localStorage.setItem("admin_access", res.data.access);
//       localStorage.setItem("access", res.data.access);
//       if (res.data.refresh) {
//         localStorage.setItem("admin_refresh", res.data.refresh);
//       }
//       localStorage.setItem("admin", JSON.stringify(res.data.user));

//       navigate("/admin/dashboard");
//     } catch {
//       setError("Invalid admin credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={page}>
//       <style>{keyframes}</style>

//       <div style={container}>
//         {/* LEFT INFO PANEL */}
//         <div style={leftPanel}>
//           <div style={{ fontSize: 50, marginBottom: 20 }}>🛡️</div>
//           <h2 style={panelTitle}>Admin Portal</h2>
//           <p style={panelText}>
//             Authorized personnel only <br />
//             Secure access required
//           </p>

//           <button
//             style={ghostBtn}
//             onClick={() => navigate("/login")}
//           >
//             USER LOGIN
//           </button>
//         </div>

//         {/* RIGHT LOGIN FORM */}
//         <form
//           style={formSide}
//           onSubmit={(e) => {
//             e.preventDefault(); // 🔥 password DOM warning fix
//             handleLogin();
//           }}
//         >
//           <h2 style={title}>Admin Login</h2>
//           <p style={subtitle}>Enter your credentials</p>

//           <input
//             style={input}
//             type="tel"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) =>
//               setPhone(e.target.value.replace(/\D/g, ""))
//             }
//           />

//           <input
//             style={input}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <div style={errorBox}>{error}</div>}

//           <button
//             type="submit"
//             style={{ ...btn, opacity: loading ? 0.7 : 1 }}
//             disabled={loading}
//           >
//             {loading ? "Authenticating..." : "LOGIN"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ================= ANIMATIONS ================= */

// const keyframes = `
// @keyframes slideFromRight {
//   from { transform: translateX(100%); }
//   to { transform: translateX(0); }
// }

// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// `;

// /* ================= STYLES ================= */

// const page: React.CSSProperties = {
//   width: "100vw",
//   height: "100vh",
//   background: "#001F3D",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   fontFamily: "'Inter','Segoe UI',sans-serif",
// };

// const container: React.CSSProperties = {
//   width: "100%",
//   maxWidth: 1200,
//   minHeight: 550,
//   background: "#fff",
//   display: "flex",
//   borderRadius: 20,
//   overflow: "hidden",
//   boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
// };

// /* LEFT PANEL */

// const leftPanel: React.CSSProperties = {
//   flex: 1,
//   background: "#0f172a",
//   color: "#fff",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: 40,
//   borderTopRightRadius: 150,
//   borderBottomRightRadius: 150,
//   animation: "slideFromRight 0.9s ease",
// };

// const panelTitle = {
//   fontSize: 32,
//   marginBottom: 10,
// };

// const panelText = {
//   textAlign: "center" as const,
//   opacity: 0.85,
//   marginBottom: 30,
// };

// /* FORM SIDE */

// const formSide: React.CSSProperties = {
//   flex: 1,
//   padding: "60px 40px",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   animation: "fadeIn 0.8s ease",
// };

// const title = {
//   fontSize: 30,
//   fontWeight: 800,
//   marginBottom: 5,
//   color: "#020617",
// };

// const subtitle = {
//   fontSize: 15,
//   color: "#64748b",
//   marginBottom: 25,
// };

// const input: React.CSSProperties = {
//   padding: 14,
//   fontSize: 16,
//   borderRadius: 10,
//   border: "2px solid #e2e8f0",
//   marginBottom: 15,
//   outline: "none",
// };

// const btn: React.CSSProperties = {
//   padding: 14,
//   background: "#020617",
//   color: "#fff",
//   border: "none",
//   borderRadius: 10,
//   fontWeight: 700,
//   cursor: "pointer",
// };

// const ghostBtn: React.CSSProperties = {
//   padding: "10px 30px",
//   background: "transparent",
//   border: "2px solid #fff",
//   color: "#fff",
//   borderRadius: 25,
//   cursor: "pointer",
// };

// const errorBox: React.CSSProperties = {
//   backgroundColor: "#fef2f2",
//   color: "#dc2626",
//   padding: "12px",
//   borderRadius: "8px",
//   fontSize: "13px",
//   marginBottom: "15px",
//   border: "1px solid #fee2e2",
// };

// src/pages/dashboard/AdminLogin.tsx
import { useState } from "react";
import type React from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // ✅ basic validation
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
      // axiosInstance baseURL: http://127.0.0.1:8000/api
      // so this hits: http://127.0.0.1:8000/api/auth/admin/login/
      const res = await axios.post("/auth/admin/login/", {
        phone,
        password,
      });

      const data = res.data;

      // ✅ NEW backend keys
      // { admin_access, admin_refresh, admin: {...} }
      if (!data?.admin_access || !data?.admin) {
        throw new Error("Invalid admin login response");
      }

      // ✅ store ONLY admin keys (DON'T override student keys)
      localStorage.setItem("admin_access", data.admin_access);

      if (data.admin_refresh) {
        localStorage.setItem("admin_refresh", data.admin_refresh);
      } else {
        localStorage.removeItem("admin_refresh");
      }

      localStorage.setItem("admin", JSON.stringify(data.admin));

      navigate("/admin/dashboard", { replace: true });
    } catch (e: any) {
      // ✅ show backend error if present
      setError(
        e?.response?.data?.detail ||
          e?.response?.data?.message ||
          "Invalid admin credentials"
      );

      // ✅ cleanup partial tokens
      localStorage.removeItem("admin_access");
      localStorage.removeItem("admin_refresh");
      localStorage.removeItem("admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <style>{keyframes}</style>

      <div style={container}>
        {/* LEFT INFO PANEL */}
        <div style={leftPanel}>
          <div style={{ fontSize: 50, marginBottom: 20 }}>🛡️</div>
          <h2 style={panelTitle}>Admin Portal</h2>
          <p style={panelText}>
            Authorized personnel only <br />
            Secure access required
          </p>

          <button style={ghostBtn} onClick={() => navigate("/login")}>
            USER LOGIN
          </button>
          <p style={{ marginTop: 12, fontSize: 14, color: "#334155" }}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline", fontWeight: 700 }}
              onClick={() => navigate("/admin/forgot-password")}
            >
              Forgot password?
            </span>
          </p>

        </div>

        {/* RIGHT LOGIN FORM */}
        <form
          style={formSide}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <h2 style={title}>Admin Login</h2>
          <p style={subtitle}>Enter your credentials</p>

          <input
            style={input}
            type="tel"
            inputMode="numeric"
            placeholder="Phone Number"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            autoComplete="username"
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {error && <div style={errorBox}>{error}</div>}

          <button
            type="submit"
            style={{ ...btn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= ANIMATIONS ================= */

const keyframes = `
@keyframes slideFromRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
  fontFamily: "'Inter','Segoe UI',sans-serif",
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  minHeight: 550,
  background: "#fff",
  display: "flex",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
};

/* LEFT PANEL */

const leftPanel: React.CSSProperties = {
  flex: 1,
  background: "#0f172a",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 40,
  borderTopRightRadius: 150,
  borderBottomRightRadius: 150,
  animation: "slideFromRight 0.9s ease",
};

const panelTitle = {
  fontSize: 32,
  marginBottom: 10,
};

const panelText = {
  textAlign: "center" as const,
  opacity: 0.85,
  marginBottom: 30,
};

/* FORM SIDE */

const formSide: React.CSSProperties = {
  flex: 1,
  padding: "60px 40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  animation: "fadeIn 0.8s ease",
};

const title = {
  fontSize: 30,
  fontWeight: 800,
  marginBottom: 5,
  color: "#020617",
};

const subtitle = {
  fontSize: 15,
  color: "#64748b",
  marginBottom: 25,
};

const input: React.CSSProperties = {
  padding: 14,
  fontSize: 16,
  borderRadius: 10,
  border: "2px solid #e2e8f0",
  marginBottom: 15,
  outline: "none",
};

const btn: React.CSSProperties = {
  padding: 14,
  background: "#020617",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
};

const ghostBtn: React.CSSProperties = {
  padding: "10px 30px",
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
