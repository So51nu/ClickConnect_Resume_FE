import axios from "axios"

/* -------- BASE AXIOS INSTANCE -------- */

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
  headers: {
    "Content-Type": "application/json",
  },
})

/* -------- SEND OTP -------- */

export const sendOTP = async (phone: string) => {
  return api.post("send-otp/", {
    phone: phone,
  })
}

/* -------- VERIFY OTP (🔥 FIXED) -------- */

export const verifyOTP = async (payload: {
  phone: string
  otp: string
  name?: string
  email?: string
  pincode?: string
}) => {
  console.log("VERIFY OTP API PAYLOAD 👉", payload) // 👈 MUST SEE THIS

  const res = await api.post("verify-otp/", payload)

  return res.data
}
