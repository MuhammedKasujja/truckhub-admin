import axios from "axios";
import { getAccessToken } from "./session";

const apiClient = axios.create({
  baseURL: `${process.env.BACKEND_URL}`,
  timeout: 15000, // ← prevents hanging forever after 15 secs
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
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
  (error) => {
    console.error("ApiError.....", error);
    if (
      error.code === "ECONNREFUSED" ||
      error.message.includes("Network Error")
    ) {
      error.response = {
        data: {
          status: 503,
          success: false,
          error: {
            code: "SERVICE_UNAVAILABLE",
            message: "Could not connect to server",
          },
        },
      };
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
