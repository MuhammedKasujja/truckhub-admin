"use server";

import apiClient from "@/lib/api-client";
import { Service } from "@/types/service";
import {
  ServiceCreateSchemaType,
  ServiceUpdateSchemaType,
} from "@/schemas/service";

export async function getServices() {
  const { data, isSuccess } = await apiClient.get<Service[]>("/v1/services");
  return { data: isSuccess ? data! : [] };
}

export async function getServiceById(serviceId: number | string) {
  return await apiClient.get<Service>(`/v1/services/${serviceId}`);
}

export async function deleteServiceById(serviceId: number | string) {
  return await apiClient.delete(`/v1/services/${serviceId}`);
}

export async function updateService(data: ServiceUpdateSchemaType) {
  const { id: serviceId, ...rest } = data;
  return await apiClient.put(`/v1/services/${serviceId}`, rest);
}

export async function createService(data: ServiceCreateSchemaType) {
  return await apiClient.post("/v1/services", data);
}
