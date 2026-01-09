// // src/api/axiosInstance.ts
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// api.interceptors.request.use((config) => {
//   const token =
//     localStorage.getItem("admin_access") ||
//     localStorage.getItem("access") ||          // ✅ user token
//     localStorage.getItem("access_token") ||     // old fallback
//     localStorage.getItem("token");

//   if (token) {
//     config.headers = config.headers ?? {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

// src/api/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  // ✅ If caller already set Authorization, DON'T override it
  const existingAuth =
    (config.headers as any)?.Authorization || (config.headers as any)?.authorization;

  if (existingAuth) return config;

  // ✅ Prefer STUDENT/USER token first
  const token =
    localStorage.getItem("access") || // ✅ student/user token
    localStorage.getItem("admin_access") || // admin fallback only
    localStorage.getItem("access_token") ||
    localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
