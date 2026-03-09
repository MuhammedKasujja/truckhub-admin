"use server";

import { Trip } from "@/features/trips/types";
import  * as apiClient from "@/lib/api-client";
import {
  TripCreateSchemaType,
  TripListSearchParams,
  TripUpdateSchemaType,
} from "@/features/trips/schemas";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getTrips(input: TripListSearchParams) {
  const { page, perPage } = input;
  const params = generateApiSearchParams(input);

  const {
    data,
    isSuccess,
    error,
    pagination: paginator,
  } = await apiClient.getPaginatedFn<Trip[]>(`/v1/trips/?${params}`);
  const pagination = paginator ?? { page, perPage, totalPages: 0, total: 0 };

  return { data: isSuccess ? data! : [], error, pagination };
}

export async function getTripById(tripId: number | string) {
  return await apiClient.getFn<Trip>(`/v1/trips/${tripId}`);
}

export async function deleteTripById(tripId: number | string) {
  return await apiClient.deleteFn(`/v1/trips/${tripId}`);
}

export async function updateTrip(data: TripUpdateSchemaType) {
  const { id: tripId, ...rest } = data;
  return await apiClient.putFn(`/v1/trips/${tripId}`, rest);
}

export async function createTrip(data: TripCreateSchemaType) {
  return await apiClient.postFn("/v1/trips", data);
}
