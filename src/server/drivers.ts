"use server";

import { Driver } from "@/types/driver";
import apiClient from "@/lib/api-client";
import {
  DriverCreateSchemaType,
  DriverUpdateSchemaType,
} from "@/schemas/driver";

export async function getDrivers() {
  const { isSuccess, data } = await apiClient.get<Driver[]>("/v1/drivers");
  return { data: isSuccess ? data! : [] };
}

export async function getDriverById(driverId: number | string) {
  return await apiClient.get<Driver>(`/v1/drivers/${driverId}`);
}

export async function deleteDriverById(driverId: number | string) {
  return await apiClient.delete(`/v1/drivers/${driverId}`);
}

export async function updateDriver(data: DriverUpdateSchemaType) {
  const { id: driverId, ...rest } = data;
  return await apiClient.put(`/v1/drivers/${driverId}`, rest);
}

export async function createDriver(data: DriverCreateSchemaType) {
  return await apiClient.post("/v1/drivers", data);
}
