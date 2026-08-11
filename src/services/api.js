import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  const authData = localStorage.getItem("propertyHubAuth");
  if (authData && config.headers) {
    const { token } = JSON.parse(authData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
