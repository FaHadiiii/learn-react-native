import { create, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { secureStorage, STORAGE_KEYS } from "../storage/secure-storage";

// Replace with your API base URL or environment variable (e.g. process.env.EXPO_PUBLIC_API_URL)
export const API_BASE_URL = "https://api.example.com/v1";

export const apiClient: AxiosInstance = create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach bearer token to outgoing requests if available
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await secureStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error handling / Token refresh trigger
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 401 Unauthorized: token expired or invalid
      // In a real app, trigger refresh token logic or emit logout event
      console.warn("API request returned 401. User session may be expired.");
    }
    return Promise.reject(error);
  }
);
