"use server";

import apiClient from "@/lib/api-client";

type Driver = {
  id: number;
  name: string;
};

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

export async function updateDriver(driverId: number | string) {
  return await apiClient.put(`/v1/drivers/${driverId}`);
}

export async function createDriver(data: unknown) {
  return await apiClient.post("/v1/drivers", data);
}
