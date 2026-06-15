import axios from "axios";

// TEMPORARY LOCAL DEBUG
const API = "http://localhost:5009";

// console.log("🚀 API URL:", API);

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;