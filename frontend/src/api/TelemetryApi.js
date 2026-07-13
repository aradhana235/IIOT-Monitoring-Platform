// api/telemetryApi.js
// Thin axios wrapper around Spring Boot telemetry endpoints.
// Adjust BASE_URL / paths to match your backend once ready.

import axios from "axios";

const API_BASE = import.meta.env?.VITE_API_BASE_URL || "";
const BASE_URL = `${API_BASE}/api/telemetry`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const TelemetryAPI = {
  // Latest reading per device/sensor (device-wise live table)
  getLatest: (params) => api.get("/latest", { params }),
  getByDevice: (deviceId) => api.get(`/device/${deviceId}`),
};

export default TelemetryAPI;
