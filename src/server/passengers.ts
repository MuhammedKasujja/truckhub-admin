"use server";

import { apiClient } from "@/lib/api-client";
import { Passenger } from "@/types/passenger";
import {
  PassengerCreateSchemaType,
  PassengerListSearchParams,
  PassengerUpdateSchemaType,
} from "@/schemas/passenger";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getPassengers(input: PassengerListSearchParams) {
  const params = generateApiSearchParams(input);

  const { data, isSuccess } = await apiClient.get<Passenger[]>(
    `/v1/passengers/?${params}`,
  );
  return { data: isSuccess ? data! : [] };
}

export async function getPassengerById(passengerId: number | string) {
  return await apiClient.get<Passenger>(`/v1/passengers/${passengerId}`);
}

export async function deletePassengerById(passengerId: number | string) {
  return await apiClient.delete(`/v1/passengers/${passengerId}`);
}

export async function updatePassenger(data: PassengerUpdateSchemaType) {
  const { id: passengerId, ...rest } = data;
  return await apiClient.put(`/v1/passengers/${passengerId}`, rest);
}

export async function createPassenger(data: PassengerCreateSchemaType) {
  return await apiClient.post("/v1/passengers", data);
}
