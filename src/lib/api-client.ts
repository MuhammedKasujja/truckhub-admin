import { api } from "./api";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";
import { logout } from "@/features/auth/service";

async function get<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await api.get(url);
    return {
      isSuccess: true,
      data: response.data.data,
      message: response.data.message,
      pagination: response.data.meta,
    };
  } catch (error) {
    if (error instanceof AxiosError && error.status == 401) {
      // await logout();
    }
    return {
      isSuccess: false,
      error: {
        message: (error as any).response.data.error.message,
        code: (error as any).response.data.error.code,
      },
    };
  }
}

async function post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
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

async function put<T>(
  url: string,
  data: unknown = {},
): Promise<ApiResponse<T>> {
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

async function patch<T>(
  url: string,
  data: unknown = {},
): Promise<ApiResponse<T>> {
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

async function deleteFn(url: string): Promise<ApiResponse> {
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

const apiClient = { get, post, deleteFn, put, patch };

export { apiClient };

export default apiClient;
