"use server";

import apiClient from "@/lib/api-client";
import { VehicleType } from "@/types/vehicle-type";
import {
  VehicleTypeCreateSchemaType,
  VehicleTypeListSearchParams,
  VehicleTypeUpdateSchemaType,
} from "@/schemas/vehicle-type";

export async function getVehicleTypes(input: VehicleTypeListSearchParams) {
  const { data, isSuccess } =
    await apiClient.get<VehicleType[]>("/v1/vehicle-types");
  return { data: isSuccess ? data! : [] };
}

export async function getVehicleTypeById(vehicleTypeId: number | string) {
  return await apiClient.get<VehicleType>(`/v1/vehicle-types/${vehicleTypeId}`);
}

export async function deleteVehicleTypeById(vehicleTypeId: number | string) {
  return await apiClient.delete(`/v1/vehicle-types/${vehicleTypeId}`);
}

export async function updateVehicleType(data: VehicleTypeUpdateSchemaType) {
  const { id: vehicleTypeId, ...rest } = data;
  return await apiClient.put(`/v1/vehicle-types/${vehicleTypeId}`, rest);
}

export async function createVehicleType(data: VehicleTypeCreateSchemaType) {
  return await apiClient.post("/v1/vehicle-types", data);
}
