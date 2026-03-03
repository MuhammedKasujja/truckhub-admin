"use server";

import { apiClient } from "@/lib/api-client";
import { Passenger } from "@/types/passenger";

export async function getPassengers() {
  const { data, isSuccess } =
    await apiClient.get<Passenger[]>("/v1/passengers");
  return { data: isSuccess ? data! : [] };
}

export async function getPassengerById(passengerId: number | string) {
  return await apiClient.get<Passenger>(`/v1/passengers/${passengerId}`);
}

export async function deletePassengerById(passengerId: number | string) {
  return await apiClient.delete(`/v1/passengers/${passengerId}`);
}

export async function updatePassenger(passengerId: number | string) {
  return await apiClient.put(`/v1/passengers/${passengerId}`);
}

export async function createPassenger(data: unknown) {
  return await apiClient.post("/v1/passengers", data);
}
