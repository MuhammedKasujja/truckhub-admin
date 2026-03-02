import { ApiResponse } from "@/types";
import { logout } from "@/server/auth";
import { getAccessToken } from "./session";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: `${process.env.BACKEND_URL}`,
  timeout: 15000, // ← prevents hanging forever after 15 secs
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
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

api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("\nApi **************", response.config.url)
      console.log(response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      console.error("ApiError.....", error);
    }
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
      console.log("Logout user.....");
      // await logout();

      // Redirect to login
      // window.location.href = "/login";
      // return null
    }
    return Promise.reject(error);
  },
);

class ApiClient {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await api.get(url);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: (error as any).response.data.error.message,
          code: (error as any).response.data.error.code,
        },
      };
    }
  }

  async post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await api.post(url, data);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: (error as any).response.data.error.message,
          code: (error as any).response.data.error.code,
        },
      };
    }
  }

  async put<T>(url: string, data: unknown = {}): Promise<ApiResponse<T>> {
    try {
      const response = await api.put(url, data);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: (error as any).response.data.error.message,
          code: (error as any).response.data.error.code,
        },
      };
    }
  }

  async patch<T>(url: string, data: unknown = {}): Promise<ApiResponse<T>> {
    try {
      const response = await api.patch(url, data);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: (error as any).response.data.error.message,
          code: (error as any).response.data.error.code,
        },
      };
    }
  }

  async delete(url: string): Promise<ApiResponse> {
    try {
      const response = await api.delete(url);
      return {
        isSuccess: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: {
          message: (error as any).response.data.error.message,
          code: (error as any).response.data.error.code,
        },
      };
    }
  }
}

const apiClient = new ApiClient();

export { apiClient };

export default apiClient;
