// // // // // // // // // src/router/AppRouter.tsx
// // // // // // // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // // // // // // // import Register from "../pages/Register";
// // // // // // // // import Login from "../pages/Login";
// // // // // // // // import VerifyOtp from "../pages/VerifyOtp";
// // // // // // // // import Dashboard from "../pages/Dashboard";
// // // // // // // // import AdminLogin from "../pages/dashboard/AdminLogin";
// // // // // // // // import AdminDashboard from "../pages/dashboard/AdminDashboard";

// // // // // // // // export default function AppRouter() {
// // // // // // // //   // ✅ correct key
// // // // // // // //   const isAuth = !!localStorage.getItem("access");

// // // // // // // //   return (
// // // // // // // //     <BrowserRouter>
// // // // // // // //       <Routes>
// // // // // // // //         <Route path="/" element={<Navigate to="/register" />} />
// // // // // // // //         <Route path="/register" element={<Register />} />
// // // // // // // //         <Route path="/login" element={<Login />} />
// // // // // // // //         <Route path="/verify-otp" element={<VerifyOtp />} />

// // // // // // // //         {/* ✅ Protected user route */}
// // // // // // // //         <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />

// // // // // // // //         {/* Admin */}
// // // // // // // //         <Route path="/admin/login" element={<AdminLogin />} />
// // // // // // // //         <Route path="/admin/dashboard" element={<AdminDashboard />} />
// // // // // // // //       </Routes>
// // // // // // // //     </BrowserRouter>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // src/router/AppRouter.tsx
// // // // // // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // // // // // // import Register from "../pages/Register";
// // // // // // // import Login from "../pages/Login";
// // // // // // // import VerifyOtp from "../pages/VerifyOtp";
// // // // // // // import Dashboard from "../pages/Dashboard";

// // // // // // // import AdminLogin from "../pages/dashboard/AdminLogin";
// // // // // // // import AdminDashboard from "../pages/dashboard/AdminDashboard";

// // // // // // // // ✅ ADD THESE IMPORTS (files already in your tree)
// // // // // // // import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
// // // // // // // import ResumePreview from "../pages/dashboard/ResumePreview";

// // // // // // // export default function AppRouter() {
// // // // // // //   const isAuth = !!localStorage.getItem("access");

// // // // // // //   return (
// // // // // // //     <BrowserRouter>
// // // // // // //       <Routes>
// // // // // // //         <Route path="/" element={<Navigate to="/register" replace />} />
// // // // // // //         <Route path="/register" element={<Register />} />
// // // // // // //         <Route path="/login" element={<Login />} />
// // // // // // //         <Route path="/verify-otp" element={<VerifyOtp />} />

// // // // // // //         {/* ✅ Protected user route */}
// // // // // // //         <Route
// // // // // // //           path="/dashboard"
// // // // // // //           element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />}
// // // // // // //         />

// // // // // // //         {/* ✅ Admin */}
// // // // // // //         <Route path="/admin/login" element={<AdminLogin />} />
// // // // // // //         <Route path="/admin/dashboard" element={<AdminDashboard />} />

// // // // // // //         {/* ✅ NEW: Template Builder (id can be number OR "new") */}
// // // // // // //         <Route path="/admin/templates/builder/:id" element={<AdminTemplateBuilder />} />

// // // // // // //         {/* ✅ NEW: Template Preview */}
// // // // // // //         <Route path="/admin/templates/preview/:id" element={<ResumePreview />} />

// // // // // // //         {/* ✅ Optional nice URLs -> redirect to dashboard tabs */}
// // // // // // //         <Route path="/admin/templates" element={<Navigate to="/admin/dashboard?tab=templates" replace />} />
// // // // // // //         <Route path="/admin/templates/pricing" element={<Navigate to="/admin/dashboard?tab=templatespricing" replace />} />

// // // // // // //         {/* ✅ fallback */}
// // // // // // //         <Route path="*" element={<Navigate to="/login" replace />} />
// // // // // // //       </Routes>
// // // // // // //     </BrowserRouter>
// // // // // // //   );
// // // // // // // }


// // // // // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // // // // // import Register from "../pages/Register";
// // // // // // import Login from "../pages/Login";
// // // // // // import VerifyOtp from "../pages/VerifyOtp";
// // // // // // import Dashboard from "../pages/Dashboard";

// // // // // // import AdminLogin from "../pages/dashboard/AdminLogin";
// // // // // // import AdminDashboard from "../pages/dashboard/AdminDashboard";

// // // // // // import AdminTemplates from "../pages/dashboard/AdminTemplates";
// // // // // // import AdminTemplatesPricing from "../pages/dashboard/AdminTemplatesPricing";
// // // // // // import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
// // // // // // import ResumePreview from "../pages/dashboard/ResumePreview";

// // // // // // function isAdminAuthed() {
// // // // // //   const token = localStorage.getItem("access");
// // // // // //   if (!token) return false;
// // // // // //   try {
// // // // // //     const admin = JSON.parse(localStorage.getItem("admin") || "null");
// // // // // //     return !!admin; // (optional) admin?.role === "admin"
// // // // // //   } catch {
// // // // // //     return false;
// // // // // //   }
// // // // // // }

// // // // // // export default function AppRouter() {
// // // // // //   const isAuth = !!localStorage.getItem("access");
// // // // // //   const isAdmin = isAdminAuthed();

// // // // // //   return (
// // // // // //     <BrowserRouter>
// // // // // //       <Routes>
// // // // // //         <Route path="/" element={<Navigate to="/register" />} />
// // // // // //         <Route path="/register" element={<Register />} />
// // // // // //         <Route path="/login" element={<Login />} />
// // // // // //         <Route path="/verify-otp" element={<VerifyOtp />} />

// // // // // //         {/* ✅ User dashboard */}
// // // // // //         <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />} />

// // // // // //         {/* ✅ Admin */}
// // // // // //         <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
// // // // // //         <Route path="/admin/login" element={<AdminLogin />} />
// // // // // //         <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" replace />} />

// // // // // //         {/* ✅ Template Module Routes */}
// // // // // //         <Route path="/admin/templates" element={isAdmin ? <AdminTemplates /> : <Navigate to="/admin/login" replace />} />
// // // // // //         <Route path="/admin/templates/pricing" element={isAdmin ? <AdminTemplatesPricing /> : <Navigate to="/admin/login" replace />} />
// // // // // //         <Route path="/admin/templates/builder/:id" element={isAdmin ? <AdminTemplateBuilder /> : <Navigate to="/admin/login" replace />} />
// // // // // //         <Route path="/admin/templates/preview/:id" element={isAdmin ? <ResumePreview /> : <Navigate to="/admin/login" replace />} />
// // // // // //       </Routes>
// // // // // //     </BrowserRouter>
// // // // // //   );
// // // // // // }

// // // // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // // // // import Register from "../pages/Register";
// // // // // import Login from "../pages/Login";
// // // // // import VerifyOtp from "../pages/VerifyOtp";
// // // // // import Dashboard from "../pages/Dashboard";

// // // // // import AdminLogin from "../pages/dashboard/AdminLogin";
// // // // // import AdminDashboard from "../pages/dashboard/AdminDashboard";

// // // // // import AdminTemplates from "../pages/dashboard/AdminTemplates";
// // // // // import AdminTemplatesPricing from "../pages/dashboard/AdminTemplatesPricing";
// // // // // import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
// // // // // import AdminResumeEditor from "../pages/dashboard/AdminResumeEditor";
// // // // // import AdminTemplateTestEditor from "../pages/dashboard/AdminTemplateTestEditor";
// // // // // import ResumePreview from "../pages/dashboard/ResumePreview";

// // // // // function isAdminAuthed() {
// // // // //   const token = localStorage.getItem("access");
// // // // //   if (!token) return false;
// // // // //   try {
// // // // //     const admin = JSON.parse(localStorage.getItem("admin") || "null");
// // // // //     return !!admin;
// // // // //   } catch {
// // // // //     return false;
// // // // //   }
// // // // // }

// // // // // export default function AppRouter() {
// // // // //   const isAuth = !!localStorage.getItem("access");
// // // // //   const isAdmin = isAdminAuthed();

// // // // //   return (
// // // // //     <BrowserRouter>
// // // // //       <Routes>
// // // // //         <Route path="/" element={<Navigate to="/register" />} />
// // // // //         <Route path="/register" element={<Register />} />
// // // // //         <Route path="/login" element={<Login />} />
// // // // //         <Route path="/verify-otp" element={<VerifyOtp />} />

// // // // //         {/* User dashboard */}
// // // // //         <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />} />

// // // // //         {/* Admin */}
// // // // //         <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
// // // // //         <Route path="/admin/login" element={<AdminLogin />} />
// // // // //         <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" replace />} />

// // // // //         {/* Template Module Routes */}
// // // // //         <Route path="/admin/templates" element={isAdmin ? <AdminTemplates /> : <Navigate to="/admin/login" replace />} />
// // // // //         <Route path="/admin/templates/pricing" element={isAdmin ? <AdminTemplatesPricing /> : <Navigate to="/admin/login" replace />} />
// // // // //         <Route path="/admin/templates/builder/:id" element={isAdmin ? <AdminTemplateBuilder /> : <Navigate to="/admin/login" replace />} />
// // // // //         <Route path="/admin/templates/preview/:id" element={isAdmin ? <ResumePreview /> : <Navigate to="/admin/login" replace />} />
// // // // //         <Route path="/admin/templates/:id/test" element={isAdmin ? <AdminTemplateTestEditor /> : <Navigate to="/admin/login" replace />} />
// // // // //         <Route path="/admin/resumes/editor/:templateId" element={isAdmin ? <AdminResumeEditor /> : <Navigate to="/admin/login" replace />} />
// // // // //       </Routes>
// // // // //     </BrowserRouter>
// // // // //   );
// // // // // }

// // // // // src/router/AppRouter.tsx
// // // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // // // // User Pages
// // // // import Register from "../pages/Register";
// // // // import Login from "../pages/Login";
// // // // import VerifyOtp from "../pages/VerifyOtp";
// // // // import Dashboard from "../pages/Dashboard";
// // // // import StudentTemplatePreview from '../pages/StudentTemplatePreview';
// // // // import StudentResumeEditor from '../pages/StudentResumeEditor';
// // // // // Admin Pages
// // // // import AdminLogin from "../pages/dashboard/AdminLogin";
// // // // import AdminDashboard from "../pages/dashboard/AdminDashboard";
// // // // import AdminTemplates from "../pages/dashboard/AdminTemplates";
// // // // import AdminTemplatesPricing from "../pages/dashboard/AdminTemplatesPricing";
// // // // import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
// // // // import AdminResumeEditor from "../pages/dashboard/AdminResumeEditor";
// // // // import AdminTemplateTestEditor from "../pages/dashboard/AdminTemplateTestEditor";

// // // // function isAdminAuthed() {
// // // //   const token = localStorage.getItem("access");
// // // //   if (!token) return false;
// // // //   try {
// // // //     const admin = JSON.parse(localStorage.getItem("admin") || "null");
// // // //     return !!admin;
// // // //   } catch {
// // // //     return false;
// // // //   }
// // // // }

// // // // export default function AppRouter() {
// // // //   const isAuth = !!localStorage.getItem("access");
// // // //   const isAdmin = isAdminAuthed();

// // // //   return (
// // // //     <BrowserRouter>
// // // //       <Routes>
// // // //         {/* Public Routes */}
// // // //         <Route path="/" element={<Navigate to="/register" />} />
// // // //         <Route path="/register" element={<Register />} />
// // // //         <Route path="/login" element={<Login />} />
// // // //         <Route path="/verify-otp" element={<VerifyOtp />} />

// // // //         {/* User Dashboard (Protected) */}
// // // //         <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />} />
// // // //         <Route path="/template/preview/:id" element={<StudentTemplatePreview />} />
// // // //         <Route path="/resume/create/:templateId" element={<StudentResumeEditor />} />
// // // //         <Route path="/resume/edit/:resumeId" element={<StudentResumeEditor />} />
// // // //         {/* Admin Routes */}
// // // //         <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
// // // //         <Route path="/admin/login" element={<AdminLogin />} />
// // // //         <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" replace />} />
// // // //         <Route path="/student/template/preview/:id" element={<StudentTemplatePreview />} />
// // // //         {/* Template Management */}
// // // //         <Route path="/admin/templates" element={isAdmin ? <AdminTemplates /> : <Navigate to="/admin/login" replace />} />
// // // //         <Route path="/admin/templates/pricing" element={isAdmin ? <AdminTemplatesPricing /> : <Navigate to="/admin/login" replace />} />
// // // //         <Route path="/admin/templates/builder/:id" element={isAdmin ? <AdminTemplateBuilder /> : <Navigate to="/admin/login" replace />} />
        
// // // //         {/* Resume Editor (Create/Edit Resume using Template) */}
// // // //         <Route path="/admin/resume/edit/:resumeId" element={isAdmin ? <AdminResumeEditor /> : <Navigate to="/admin/login" replace />} />
// // // //         <Route path="/admin/resume/create/:templateId" element={isAdmin ? <AdminResumeEditor /> : <Navigate to="/admin/login" replace />} />
        
// // // //         {/* Template Test Editor */}
// // // //         <Route path="/admin/template/test/:templateId" element={isAdmin ? <AdminTemplateTestEditor /> : <Navigate to="/admin/login" replace />} />

// // // //         {/* Fallback */}
// // // //         <Route path="*" element={<Navigate to="/login" replace />} />
// // // //       </Routes>
// // // //     </BrowserRouter>
// // // //   );
// // // // }

// // // // src/router/AppRouter.tsx
// // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // // // Public
// // // import Register from "../pages/Register";
// // // import Login from "../pages/Login";
// // // import VerifyOtp from "../pages/VerifyOtp";

// // // // Student
// // // import Dashboard from "../pages/Dashboard";

// // // // Admin
// // // import AdminLogin from "../pages/dashboard/AdminLogin";
// // // import AdminDashboard from "../pages/dashboard/AdminDashboard";
// // // import AdminTemplates from "../pages/dashboard/AdminTemplates";
// // // import AdminTemplatesPricing from "../pages/dashboard/AdminTemplatesPricing";
// // // import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
// // // import AdminResumeEditor from "../pages/dashboard/AdminResumeEditor";
// // // import AdminTemplateTestEditor from "../pages/dashboard/AdminTemplateTestEditor";

// // // // ✅ Auth helpers
// // // function isUserAuthed() {
// // //   return !!localStorage.getItem("access");
// // // }

// // // function isAdminAuthed() {
// // //   const token = localStorage.getItem("access");
// // //   if (!token) return false;
// // //   try {
// // //     const admin = JSON.parse(localStorage.getItem("admin") || "null");
// // //     return !!admin;
// // //   } catch {
// // //     return false;
// // //   }
// // // }

// // // // ✅ Route guards
// // // function RequireUser({ children }: { children: JSX.Element }) {
// // //   return isUserAuthed() ? children : <Navigate to="/login" replace />;
// // // }

// // // function RequireAdmin({ children }: { children: JSX.Element }) {
// // //   return isAdminAuthed() ? children : <Navigate to="/admin/login" replace />;
// // // }

// // // export default function AppRouter() {
// // //   return (
// // //     <BrowserRouter>
// // //       <Routes>
// // //         {/* Public */}
// // //         <Route path="/" element={<Navigate to="/register" replace />} />
// // //         <Route path="/register" element={<Register />} />
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="/verify-otp" element={<VerifyOtp />} />

// // //         {/* ✅ Student routes */}
// // //         <Route
// // //           path="/dashboard"
// // //           element={
// // //             <RequireUser>
// // //               <Dashboard />
// // //             </RequireUser>
// // //           }
// // //         />

// // //         {/* ✅ Student Resume Editor -> SAME AdminResumeEditor component */}
// // //         <Route
// // //           path="/resume/create/:templateId"
// // //           element={
// // //             <RequireUser>
// // //               <AdminResumeEditor mode="student" />
// // //             </RequireUser>
// // //           }
// // //         />
// // //         <Route
// // //           path="/resume/edit/:resumeId"
// // //           element={
// // //             <RequireUser>
// // //               <AdminResumeEditor mode="student" />
// // //             </RequireUser>
// // //           }
// // //         />

// // //         {/* ✅ Admin routes */}
// // //         <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
// // //         <Route path="/admin/login" element={<AdminLogin />} />

// // //         <Route
// // //           path="/admin/dashboard"
// // //           element={
// // //             <RequireAdmin>
// // //               <AdminDashboard />
// // //             </RequireAdmin>
// // //           }
// // //         />

// // //         <Route
// // //           path="/admin/templates"
// // //           element={
// // //             <RequireAdmin>
// // //               <AdminTemplates />
// // //             </RequireAdmin>
// // //           }
// // //         />
// // //         <Route
// // //           path="/admin/templates/pricing"
// // //           element={
// // //             <RequireAdmin>
// // //               <AdminTemplatesPricing />
// // //             </RequireAdmin>
// // //           }
// // //         />
// // //         <Route
// // //           path="/admin/templates/builder/:id"
// // //           element={
// // //             <RequireAdmin>
// // //               <AdminTemplateBuilder />
// // //             </RequireAdmin>
// // //           }
// // //         />

// // //         <Route
// // //           path="/admin/resume/create/:templateId"
// // //           element={
// // //             <RequireAdmin>
// // //               <AdminResumeEditor mode="admin" />
// // //             </RequireAdmin>
// // //           }
// // //         />
// // //         <Route
// // //           path="/admin/resume/edit/:resumeId"
// // //           element={
// // //             <RequireAdmin>
// // //               <AdminResumeEditor mode="admin" />
// // //             </RequireAdmin>
// // //           }
// // //         />

// // //         <Route
// // //           path="/admin/template/test/:templateId"
// // //           element={
// // //             <RequireAdmin>
// // //               <AdminTemplateTestEditor />
// // //             </RequireAdmin>
// // //           }
// // //         />

// // //         {/* Fallback */}
// // //         <Route path="*" element={<Navigate to="/login" replace />} />
// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // src/router/AppRouter.tsx
// // import React from "react";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // // Public
// // import Register from "../pages/Register";
// // import Login from "../pages/Login";
// // import VerifyOtp from "../pages/VerifyOtp";

// // // Student
// // import Dashboard from "../pages/Dashboard";

// // // Admin
// // import AdminLogin from "../pages/dashboard/AdminLogin";
// // import AdminDashboard from "../pages/dashboard/AdminDashboard";
// // import AdminTemplates from "../pages/dashboard/AdminTemplates";
// // import AdminTemplatesPricing from "../pages/dashboard/AdminTemplatesPricing";
// // import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
// // import AdminResumeEditor from "../pages/dashboard/AdminResumeEditor";
// // import AdminTemplateTestEditor from "../pages/dashboard/AdminTemplateTestEditor";

// // // ✅ Auth helpers
// // function isUserAuthed() {
// //   // user token
// //   return !!localStorage.getItem("access");
// // }

// // function isAdminAuthed() {
// //   const token = localStorage.getItem("access");
// //   if (!token) return false;
// //   try {
// //     const admin = JSON.parse(localStorage.getItem("admin") || "null");
// //     return !!admin;
// //   } catch {
// //     return false;
// //   }
// // }

// // // ✅ Route guards (no JSX namespace usage)
// // type GuardProps = { children: React.ReactElement };

// // function RequireUser({ children }: GuardProps) {
// //   return isUserAuthed() ? children : <Navigate to="/login" replace />;
// // }

// // function RequireAdmin({ children }: GuardProps) {
// //   return isAdminAuthed() ? children : <Navigate to="/admin/login" replace />;
// // }

// // export default function AppRouter() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* Public */}
// //         <Route path="/" element={<Navigate to="/register" replace />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/verify-otp" element={<VerifyOtp />} />

// //         {/* ✅ Student routes */}
// //         <Route
// //           path="/dashboard"
// //           element={
// //             <RequireUser>
// //               <Dashboard />
// //             </RequireUser>
// //           }
// //         />

// //         {/* ✅ Student Resume Editor -> SAME AdminResumeEditor component
// //             NOTE: AdminResumeEditor auto-detects mode using pathname:
// //             /admin/* => admin, else student
// //         */}
// //         <Route
// //           path="/resume/create/:templateId"
// //           element={
// //             <RequireUser>
// //               <AdminResumeEditor />
// //             </RequireUser>
// //           }
// //         />
// //         <Route
// //           path="/resume/edit/:resumeId"
// //           element={
// //             <RequireUser>
// //               <AdminResumeEditor />
// //             </RequireUser>
// //           }
// //         />

// //         {/* ✅ Admin routes */}
// //         <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
// //         <Route path="/admin/login" element={<AdminLogin />} />

// //         <Route
// //           path="/admin/dashboard"
// //           element={
// //             <RequireAdmin>
// //               <AdminDashboard />
// //             </RequireAdmin>
// //           }
// //         />

// //         <Route
// //           path="/admin/templates"
// //           element={
// //             <RequireAdmin>
// //               <AdminTemplates />
// //             </RequireAdmin>
// //           }
// //         />
// //         <Route
// //           path="/admin/templates/pricing"
// //           element={
// //             <RequireAdmin>
// //               <AdminTemplatesPricing />
// //             </RequireAdmin>
// //           }
// //         />
// //         <Route
// //           path="/admin/templates/builder/:id"
// //           element={
// //             <RequireAdmin>
// //               <AdminTemplateBuilder />
// //             </RequireAdmin>
// //           }
// //         />

// //         {/* ✅ Admin Resume Editor */}
// //         <Route
// //           path="/admin/resume/create/:templateId"
// //           element={
// //             <RequireAdmin>
// //               <AdminResumeEditor />
// //             </RequireAdmin>
// //           }
// //         />
// //         <Route
// //           path="/admin/resume/edit/:resumeId"
// //           element={
// //             <RequireAdmin>
// //               <AdminResumeEditor />
// //             </RequireAdmin>
// //           }
// //         />

// //         <Route
// //           path="/admin/template/test/:templateId"
// //           element={
// //             <RequireAdmin>
// //               <AdminTemplateTestEditor />
// //             </RequireAdmin>
// //           }
// //         />

// //         {/* Fallback */}
// //         <Route path="*" element={<Navigate to="/login" replace />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Public
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import VerifyOtp from "../pages/VerifyOtp";

// // Student
// import Dashboard from "../pages/Dashboard";
// import AdminStaffManager from "../pages/dashboard/AdminStaffManager";

// // Admin
// import AdminLogin from "../pages/dashboard/AdminLogin";
// import AdminDashboard from "../pages/dashboard/AdminDashboard";
// import AdminTemplates from "../pages/dashboard/AdminTemplates";
// import AdminTemplatesPricing from "../pages/dashboard/AdminTemplatesPricing";
// import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
// import AdminResumeEditor from "../pages/dashboard/AdminResumeEditor";
// import AdminTemplateTestEditor from "../pages/dashboard/AdminTemplateTestEditor";
// import ForgotPassword from "../pages/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword";
// import AdminForgotPassword from "../pages/dashboard/AdminForgotPassword";
// import AdminResetPassword from "../pages/dashboard/AdminResetPassword";
// import AIResumeGenerator from "../pages/dashboard/AIResumeGenerator";
// import AIUses from "../pages/dashboard/AIUses";
// // ✅ Auth helpers
// function isUserAuthed() {
//   return !!localStorage.getItem("access");
// }

// function isAdminAuthed() {
//   return !!localStorage.getItem("admin_access") && !!localStorage.getItem("admin");
// }

// // ✅ Route guards
// type GuardProps = { children: React.ReactElement };

// function RequireUser({ children }: GuardProps) {
//   return isUserAuthed() ? children : <Navigate to="/login" replace />;
// }

// function RequireAdmin({ children }: GuardProps) {
//   return isAdminAuthed() ? children : <Navigate to="/admin/login" replace />;
// }

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
//         <Route path="/admin/reset-password" element={<AdminResetPassword />} />
//         <Route path="/ai-resume" element={<AIResumeGenerator />} />
//         <Route path="/admin/ai-uses" element={<AIUses />} />
//         {/* Optional legacy route (now disabled screen) */}
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route
//           path="/admin/staff"
//           element={
//             <RequireAdmin>
//               <AdminStaffManager />
//             </RequireAdmin>
//           }
//         />

//         {/* Student */}
//         <Route
//           path="/dashboard"
//           element={
//             <RequireUser>
//               <Dashboard />
//             </RequireUser>
//           }
//         />

//         <Route
//           path="/resume/create/:templateId"
//           element={
//             <RequireUser>
//               <AdminResumeEditor />
//             </RequireUser>
//           }
//         />
//         <Route
//           path="/resume/edit/:resumeId"
//           element={
//             <RequireUser>
//               <AdminResumeEditor />
//             </RequireUser>
//           }
//         />

//         {/* Admin */}
//         <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
//         <Route path="/admin/login" element={<AdminLogin />} />

//         <Route
//           path="/admin/dashboard"
//           element={
//             <RequireAdmin>
//               <AdminDashboard />
//             </RequireAdmin>
//           }
//         />
//         <Route
//           path="/admin/templates"
//           element={
//             <RequireAdmin>
//               <AdminTemplates />
//             </RequireAdmin>
//           }
//         />
//         <Route
//           path="/admin/templates/pricing"
//           element={
//             <RequireAdmin>
//               <AdminTemplatesPricing />
//             </RequireAdmin>
//           }
//         />
//         <Route
//           path="/admin/templates/builder/:id"
//           element={
//             <RequireAdmin>
//               <AdminTemplateBuilder />
//             </RequireAdmin>
//           }
//         />
//         <Route
//           path="/admin/resume/create/:templateId"
//           element={
//             <RequireAdmin>
//               <AdminResumeEditor />
//             </RequireAdmin>
//           }
//         />
//         <Route
//           path="/admin/resume/edit/:resumeId"
//           element={
//             <RequireAdmin>
//               <AdminResumeEditor />
//             </RequireAdmin>
//           }
//         />
//         <Route
//           path="/admin/template/test/:templateId"
//           element={
//             <RequireAdmin>
//               <AdminTemplateTestEditor />
//             </RequireAdmin>
//           }
//         />

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public
import Register from "../pages/Register";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";

// Student
import Dashboard from "../pages/Dashboard";
import AdminStaffManager from "../pages/dashboard/AdminStaffManager";

// Admin
import AdminLogin from "../pages/dashboard/AdminLogin";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import AdminTemplates from "../pages/dashboard/AdminTemplates";
import AdminTemplatesPricing from "../pages/dashboard/AdminTemplatesPricing";
import AdminTemplateBuilder from "../pages/dashboard/AdminTemplateBuilder";
import AdminResumeEditor from "../pages/dashboard/AdminResumeEditor";
import AdminTemplateTestEditor from "../pages/dashboard/AdminTemplateTestEditor";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AdminForgotPassword from "../pages/dashboard/AdminForgotPassword";
import AdminResetPassword from "../pages/dashboard/AdminResetPassword";
import AIResumeGenerator from "../pages/dashboard/AIResumeGenerator";
import AIUses from "../pages/dashboard/AIUses";
import AdminTemplateJsonStudio from "../pages/dashboard/AdminTemplateJsonStudio";

// ✅ Auth helpers
function isUserAuthed() {
  return !!localStorage.getItem("access");
}

function isAdminAuthed() {
  return !!localStorage.getItem("admin_access") && !!localStorage.getItem("admin");
}

// ✅ Route guards
type GuardProps = { children: React.ReactElement };

function RequireUser({ children }: GuardProps) {
  return isUserAuthed() ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }: GuardProps) {
  return isAdminAuthed() ? children : <Navigate to="/admin/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        <Route path="/ai-resume" element={<AIResumeGenerator />} />
        <Route path="/admin/ai-uses" element={<AIUses />} />
        {/* Optional legacy route (now disabled screen) */}
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route
          path="/admin/staff"
          element={
            <RequireAdmin>
              <AdminStaffManager />
            </RequireAdmin>
          }
        />

        {/* Student */}
        <Route
          path="/dashboard"
          element={
            <RequireUser>
              <Dashboard />
            </RequireUser>
          }
        />

        {/* ✅ Student Templates page (uses AdminTemplates component in student mode) */}
        <Route
          path="/templates"
          element={
            <RequireUser>
              <AdminTemplates />
            </RequireUser>
          }
        />

        <Route
          path="/resume/create/:templateId"
          element={
            <RequireUser>
              <AdminResumeEditor />
            </RequireUser>
          }
        />
        <Route
          path="/resume/edit/:resumeId"
          element={
            <RequireUser>
              <AdminResumeEditor />
            </RequireUser>
          }
        />

        {/* Admin */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/templates"
          element={
            <RequireAdmin>
              <AdminTemplates />
            </RequireAdmin>
          }
        />
        <Route path="/admin/templates/:id/json-studio" element={<AdminTemplateJsonStudio />} />

        <Route
          path="/admin/templates/pricing"
          element={
            <RequireAdmin>
              <AdminTemplatesPricing />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/templates/builder/:id"
          element={
            <RequireAdmin>
              <AdminTemplateBuilder />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/resume/create/:templateId"
          element={
            <RequireAdmin>
              <AdminResumeEditor />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/resume/edit/:resumeId"
          element={
            <RequireAdmin>
              <AdminResumeEditor />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/template/test/:templateId"
          element={
            <RequireAdmin>
              <AdminTemplateTestEditor />
            </RequireAdmin>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
