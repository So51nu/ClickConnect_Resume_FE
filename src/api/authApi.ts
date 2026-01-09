// // // src/api/authApi.ts
// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://127.0.0.1:8000/api/auth/",
// //   headers: { "Content-Type": "application/json" },
// // });

// // export const sendOTP = async (phone: string) => {
// //   return api.post("send-otp/", { phone });
// // };

// // export const verifyOTP = async (payload: {
// //   phone: string;
// //   otp: string; // backend expects "otp"
// //   name?: string;
// //   email?: string;
// //   pincode?: string;
// // }) => {
// //   const res = await api.post("verify-otp/", payload);
// //   return res.data;
// // };
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/auth/",
//   headers: { "Content-Type": "application/json" },
// });

// /** ✅ NEW: Student Register (Email+Password) */
// export const registerStudent = async (payload: {
//   phone: string;
//   name: string;
//   email: string;
//   pincode: string;
//   password: string;
// }) => {
//   const res = await api.post("register/", payload);
//   return res.data;
// };

// /** ✅ NEW: Student Login (Email+Password) */
// export const loginStudent = async (payload: { email: string; password: string }) => {
//   const res = await api.post("login/", payload);
//   return res.data;
// };

// /** (Optional) Old OTP APIs - not used now */
// export const sendOTP = async (phone: string) => api.post("send-otp/", { phone });

// export const verifyOTP = async (payload: {
//   phone: string;
//   otp: string;
//   name?: string;
//   email?: string;
//   pincode?: string;
// }) => {
//   const res = await api.post("verify-otp/", payload);
//   return res.data;
// };

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
  headers: { "Content-Type": "application/json" },
});

export const registerStudent = async (payload: {
  phone: string;
  name: string;
  email: string;
  pincode: string;
  password: string;
}) => {
  const res = await api.post("register/", payload);
  return res.data;
};

export const loginStudent = async (payload: { email: string; password: string }) => {
  const res = await api.post("login/", payload);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await api.post("password/forgot/", { email });
  return res.data;
};

export const resetPassword = async (payload: {
  uid: string;
  token: string;
  password: string;
}) => {
  const res = await api.post("password/reset/", payload);
  return res.data;
};
