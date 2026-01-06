// src/api/authApi.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
  headers: { "Content-Type": "application/json" },
});

export const sendOTP = async (phone: string) => {
  return api.post("send-otp/", { phone });
};

export const verifyOTP = async (payload: {
  phone: string;
  otp: string; // backend expects "otp"
  name?: string;
  email?: string;
  pincode?: string;
}) => {
  const res = await api.post("verify-otp/", payload);
  return res.data;
};
