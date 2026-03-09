"use server"

import { api } from "./api";
import { logger } from "./logger";
import { AxiosError } from "axios";
import { logout } from "@/features/auth/service";
import { ApiResponse, ApiPaginatedResponse } from "@/types";

export async function getFn<T>(url: string): Promise<ApiResponse<T>> {
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

export async function getPaginatedFn<T>(
  url: string,
): Promise<ApiPaginatedResponse<T>> {
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

export async function postFn<T>(
  url: string,
  data: unknown,
): Promise<ApiResponse<T>> {
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

export async function putFn<T>(
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

export async function patchFn<T>(
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

export async function deleteFn(url: string): Promise<ApiResponse> {
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

function _handleApiException<T>(error: unknown): ApiResponse<T> {
  if (error instanceof AxiosError && error.status == 401) {
    // await logout();
    logger.info("Now logging out.....")
  }
  return {
    isSuccess: false,
    error: {
      message: (error as any).response.data.error.message,
      code: (error as any).response.data.error.code,
    },
  };
}
