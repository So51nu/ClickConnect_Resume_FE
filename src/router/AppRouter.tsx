// // // src/router/AppRouter.tsx
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import Register from "../pages/Register";
// // import Login from "../pages/Login";
// // import VerifyOtp from "../pages/VerifyOtp";
// // import Dashboard from "../pages/Dashboard";
// // import AdminLogin from "../pages/dashboard/AdminLogin";
// // import AdminDashboard from "../pages/dashboard/AdminDashboard";

// // export default function AppRouter() {
// //   // ✅ correct key
// //   const isAuth = !!localStorage.getItem("access");

// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Navigate to="/register" />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/verify-otp" element={<VerifyOtp />} />

// //         {/* ✅ Protected user route */}
// //         <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />

// //         {/* Admin */}
// //         <Route path="/admin/login" element={<AdminLogin />} />
// //         <Route path="/admin/dashboard" element={<AdminDashboard />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // src/router/AppRouter.tsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import VerifyOtp from "../pages/VerifyOtp";
// import Dashboard from "../pages/Dashboard";

// import AdminLogin from "../pages/dashboard/AdminLogin";
// import AdminDashboard from "../pages/dashboard/AdminDashboard";

// // ✅ ADD THESE IMPORTS (files already in your tree)
// import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
// import ResumePreview from "../pages/dashboard/ResumePreview";

// export default function AppRouter() {
//   const isAuth = !!localStorage.getItem("access");

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/register" replace />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />

//         {/* ✅ Protected user route */}
//         <Route
//           path="/dashboard"
//           element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />}
//         />

//         {/* ✅ Admin */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />

//         {/* ✅ NEW: Template Builder (id can be number OR "new") */}
//         <Route path="/admin/templates/builder/:id" element={<AdminTemplateBuilder />} />

//         {/* ✅ NEW: Template Preview */}
//         <Route path="/admin/templates/preview/:id" element={<ResumePreview />} />

//         {/* ✅ Optional nice URLs -> redirect to dashboard tabs */}
//         <Route path="/admin/templates" element={<Navigate to="/admin/dashboard?tab=templates" replace />} />
//         <Route path="/admin/templates/pricing" element={<Navigate to="/admin/dashboard?tab=templatespricing" replace />} />

//         {/* ✅ fallback */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import Dashboard from "../pages/Dashboard";

import AdminLogin from "../pages/dashboard/AdminLogin";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import AdminTemplates from "../pages/dashboard/AdminTemplates";
import AdminTemplatesPricing from "../pages/dashboard/AdminTemplatesPricing";
import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
import ResumePreview from "../pages/dashboard/ResumePreview";

function isAdminAuthed() {
  const token = localStorage.getItem("access");
  if (!token) return false;
  try {
    const admin = JSON.parse(localStorage.getItem("admin") || "null");
    return !!admin; // (optional) admin?.role === "admin"
  } catch {
    return false;
  }
}

export default function AppRouter() {
  const isAuth = !!localStorage.getItem("access");
  const isAdmin = isAdminAuthed();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* ✅ User dashboard */}
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />} />

        {/* ✅ Admin */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" replace />} />

        {/* ✅ Template Module Routes */}
        <Route path="/admin/templates" element={isAdmin ? <AdminTemplates /> : <Navigate to="/admin/login" replace />} />
        <Route path="/admin/templates/pricing" element={isAdmin ? <AdminTemplatesPricing /> : <Navigate to="/admin/login" replace />} />
        <Route path="/admin/templates/builder/:id" element={isAdmin ? <AdminTemplateBuilder /> : <Navigate to="/admin/login" replace />} />
        <Route path="/admin/templates/preview/:id" element={isAdmin ? <ResumePreview /> : <Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
