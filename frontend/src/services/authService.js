import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await API.post("/auth/verify-otp", data);
  return response.data;
};
export const resendOtp = async (userId) => {
  const response = await API.post(
    "/auth/resend-otp",
    null,
    {
      params: {
        userId,
      },
    }
  );

  return response.data;
};