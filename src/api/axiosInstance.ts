// src/api/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("admin_access") ||
    localStorage.getItem("access") ||          // ✅ user token
    localStorage.getItem("access_token") ||     // old fallback
    localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
