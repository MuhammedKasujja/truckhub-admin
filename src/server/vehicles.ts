"use server";

import apiClient from "@/lib/api-client";
import { Vehicle } from "@/types/vehicle";
import {
  VehicleCreateSchemaType,
  VehicleListSearchParams,
  VehicleUpdateSchemaType,
} from "@/schemas/vehicle";

export async function getVehicles(input: VehicleListSearchParams) {
  console.log("Vehicle Params", input)
  const { data, isSuccess } = await apiClient.get<Vehicle[]>("/v1/vehicles");
  return { data: isSuccess ? data! : [] };
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
