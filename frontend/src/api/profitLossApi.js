// api/profitLossApi.js
// Thin axios wrapper around the Spring Boot Profit & Loss endpoints.
// Backend tables: profit_loss_daily, steam_parameters
// Adjust BASE_URL to match your environment / .env config.

import axios from "axios";

const API_BASE = import.meta.env?.VITE_API_BASE_URL || "";
const BASE_URL = `${API_BASE}/api/profit-loss`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT if present (matches existing SteamGuard auth pattern)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const ProfitLossAPI = {
  getAll: (params) => api.get("/", { params }),
  getById: (id) => api.get(`/${id}`),
  create: (payload) => api.post("/", payload),
  update: (id, payload) => api.put(`/${id}`, payload),
  remove: (id) => api.delete(`/${id}`),
  getCustomers: () => api.get("/customers"),
  getSummary: (params) => api.get("/summary", { params }),
};

export default ProfitLossAPI;
