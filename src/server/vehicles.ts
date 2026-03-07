"use server";

import apiClient from "@/lib/api-client";
import { Vehicle } from "@/types/vehicle";
import {
  VehicleCreateSchemaType,
  VehicleListSearchParams,
  VehicleUpdateSchemaType,
} from "@/schemas/vehicle";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getVehicles(input: VehicleListSearchParams) {
  const { page, perPage } = input;
  const params = generateApiSearchParams(input);

  const {
    data,
    isSuccess,
    error,
    pagination: paginator,
  } = await apiClient.get<Vehicle[]>(`/v1/vehicles/?${params}`);

  const pagination = paginator ?? { page, perPage, totalPages: 0, total: 0 };
  return { data: isSuccess ? data! : [], error, pagination };
}

export async function getVehicleById(vehicleId: number | string) {
  return await apiClient.get<Vehicle>(`/v1/vehicles/${vehicleId}`);
}

export async function deleteVehicleById(vehicleId: number | string) {
  return await apiClient.delete(`/v1/vehicles/${vehicleId}`);
}

export async function updateVehicle(data: VehicleUpdateSchemaType) {
  const { id: vehicleId, ...rest } = data;
  return await apiClient.put(`/v1/vehicles/${vehicleId}`, rest);
}

export async function createVehicle(data: VehicleCreateSchemaType) {
  return await apiClient.post("/v1/vehicles", data);
}
