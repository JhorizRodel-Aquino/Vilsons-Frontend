// utils/axiosInstance.ts
import axios from "axios";
import { refresh, getAccessToken } from "../services/authService";
import API_URL from "../constants/API_URL";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // allow sending cookies
});

api.interceptors.request.use((config) => {
  if (!config.url?.includes("/refresh")) {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refresh();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.log(err)
        console.warn("Refresh failed, redirecting to login");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;