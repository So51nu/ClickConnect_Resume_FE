// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import Dashboard from "../pages/Dashboard";
import AdminLogin from "../pages/dashboard/AdminLogin";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

export default function AppRouter() {
  // ✅ correct key
  const isAuth = !!localStorage.getItem("access");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* ✅ Protected user route */}
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
