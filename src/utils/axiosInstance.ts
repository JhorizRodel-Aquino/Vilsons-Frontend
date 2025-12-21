// utils/axiosInstance.ts
import axios from "axios";
import { refresh, getAccessToken, clearAccessToken } from "../services/authService";
import API_URL from "../constants/API_URL";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // allow sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  
  console.log(`Request to ${config.url} - Token exists: ${!!token}`);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set with token');
  } else {
    console.log('No token available for request');
  }
  
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    console.log(`Response ${response.status} from ${response.config.url}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.log(`Response error for ${originalRequest.url}:`, {
      status: error.response?.status,
      message: error.response?.data?.message
    });

    // If 401 and not already retried, and not a refresh/login request
    if (error.response?.status === 403 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('/refresh') &&
        !originalRequest.url?.includes('/auth')) {
      
      console.log('401 detected, attempting token refresh...');
      
      originalRequest._retry = true;

      if (isRefreshing) {
        // If already refreshing, queue this request
        console.log('Already refreshing, queueing request');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        console.log('Starting token refresh...');
        const newToken = await refresh();
        console.log('Refresh successful, got new token');
        
        // Update the original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Process queued requests
        processQueue(null, newToken);
        
        // Retry the original request
        console.log('Retrying original request...');
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed completely:', refreshError);
        
        // Clear token and redirect to login
        clearAccessToken();
        processQueue(refreshError, null);
        
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          console.log('Redirecting to login page...');
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For other errors or if refresh endpoint returns 401
    if (error.response?.status === 401) {
      console.log('401 on auth/refresh endpoint, redirecting to login');
      clearAccessToken();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;