"use server";

import { Trip } from "@/types/trip";
import apiClient from "@/lib/api-client";
import {
  TripCreateSchemaType,
  TripListSearchParams,
  TripUpdateSchemaType,
} from "@/schemas/trip";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getTrips(input: TripListSearchParams) {
  const params = generateApiSearchParams(input);

  const { data, isSuccess, error } = await apiClient.get<Trip[]>(
    `/v1/trips/?${params}`,
  );
  return { data: isSuccess ? data! : [], error };
}

export async function getTripById(tripId: number | string) {
  return await apiClient.get<Trip>(`/v1/trips/${tripId}`);
}

export async function deleteTripById(tripId: number | string) {
  return await apiClient.delete(`/v1/trips/${tripId}`);
}

export async function updateTrip(data: TripUpdateSchemaType) {
  const { id: tripId, ...rest } = data;
  return await apiClient.put(`/v1/trips/${tripId}`, rest);
}

export async function createTrip(data: TripCreateSchemaType) {
  return await apiClient.post("/v1/trips", data);
}
