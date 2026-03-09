"use server";

import  * as apiClient from "@/lib/api-client";
import { Service } from "@/features/services/types";
import {
  ServiceListSearchParams,
  ServiceUpdateSchemaType,
  ServiceCreateSchemaType,
} from "./schemas";

export async function getServices(input: ServiceListSearchParams) {
  const { data, isSuccess, error } =
    await apiClient.getFn<Service[]>("/v1/services");
  return { data: isSuccess ? data! : [], error };
}

export async function getServiceById(serviceId: number | string) {
  return await apiClient.getFn<Service>(`/v1/services/${serviceId}`);
}

export async function deleteServiceById(serviceId: number | string) {
  return await apiClient.deleteFn(`/v1/services/${serviceId}`);
}

export async function updateService(data: ServiceUpdateSchemaType) {
  const { id: serviceId, ...rest } = data;
  return await apiClient.putFn(`/v1/services/${serviceId}`, rest);
}

export async function createService(data: ServiceCreateSchemaType) {
  return await apiClient.postFn("/v1/services", data);
}
