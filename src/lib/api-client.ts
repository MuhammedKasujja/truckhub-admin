import { logout } from "@/server/auth";
import { getAccessToken } from "./session";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.BACKEND_URL}`,
  timeout: 15000, // ← prevents hanging forever after 15 secs
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip adding token to login / refresh endpoints
    // const noAuthEndpoints = ["/login", "/refresh-token"];

    if (config.url?.includes("login")) {
      return config;
    }
    const accessToken = await getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    // console.error("Error.....", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.error("ApiError.....", error);
    if (
      error.code === "ECONNREFUSED" ||
      error.message.includes("Network Error")
    ) {
      return Promise.reject({
        ...error,
        response: {
          data: {
            status: 503,
            success: false,
            error: {
              code: "SERVICE_UNAVAILABLE",
              message: "Could not connect to server",
            },
          },
        },
      });
    }

    if (error.response?.status === 401) {
      // TODO: refresh auth token
      await logout();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
