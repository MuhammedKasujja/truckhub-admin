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
  const { page, perPage } = input;
  const params = generateApiSearchParams(input);

  const {
    data,
    isSuccess,
    error,
    pagination: paginator,
  } = await apiClient.get<Trip[]>(`/v1/trips/?${params}`);
  const pagination = paginator ?? { page, perPage, totalPages: 0, total: 0 };

  return { data: isSuccess ? data! : [], error, pagination };
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
