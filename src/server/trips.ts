"use server";

import { Trip } from "@/types/trip";
import apiClient from "@/lib/api-client";

export async function getTrips() {
  const { data, isSuccess } = await apiClient.get<Trip[]>("/v1/trips");
  return { data: isSuccess ? data! : [] };
}

export async function getTripById(tripId: number | string) {
  return await apiClient.get<Trip>(`/v1/trips/${tripId}`);
}

export async function deleteTripById(tripId: number | string) {
  return await apiClient.delete(`/v1/trips/${tripId}`);
}

export async function updateTrip(tripId: number | string) {
  return await apiClient.put(`/v1/trips/${tripId}`);
}

export async function createTrip(data: unknown) {
  return await apiClient.post("/v1/trips", data);
}
