import { api } from "./api";
import { AxiosError } from "axios";
import { logout } from "@/features/auth/service";
import { ApiResponse, ApiPaginatedResponse } from "@/types";

async function get<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await api.get(url);
    return {
      isSuccess: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    return _handleApiException(error);
  }
}

async function getPaginated<T>(url: string): Promise<ApiPaginatedResponse<T>> {
  try {
    const response = await api.get(url);
    return {
      isSuccess: true,
      data: response.data.data,
      message: response.data.message,
      pagination: response.data.meta,
    };
  } catch (error) {
    return _handleApiException(error);
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
    return _handleApiException(error);
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
    return _handleApiException(error);
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
    return _handleApiException(error);
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
    return _handleApiException(error);
  }
}

const apiClient = { get, post, deleteFn, put, patch, getPaginated };

export { apiClient };

export default apiClient;

function _handleApiException<T>(error: unknown): ApiResponse<T> {
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
