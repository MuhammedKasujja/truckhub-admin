"use server";

import apiClient from "@/lib/api-client";
import { Passenger } from "@/features/clients/types";
import {
  PassengerCreateSchemaType,
  PassengerListSearchParams,
  PassengerUpdateSchemaType,
} from "@/features/clients/schemas";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getPassengers(input: PassengerListSearchParams) {
  const { page, perPage } = input;

  const params = generateApiSearchParams(input);

  const {
    data,
    isSuccess,
    error,
    pagination: paginator,
  } = await apiClient.get<Passenger[]>(`/v1/passengers/?${params}`);

  const pagination = paginator ?? { page, perPage, totalPages: 0, total: 0 };
  return { data: isSuccess ? data! : [], error, pagination };
}

export async function getPassengerById(passengerId: number | string) {
  return await apiClient.get<Passenger>(`/v1/passengers/${passengerId}`);
}

export async function deletePassengerById(passengerId: number | string) {
  return await apiClient.deleteFn(`/v1/passengers/${passengerId}`);
}

export async function updatePassenger(data: PassengerUpdateSchemaType) {
  const { id: passengerId, ...rest } = data;
  return await apiClient.put(`/v1/passengers/${passengerId}`, rest);
}

export async function createPassenger(data: PassengerCreateSchemaType) {
  return await apiClient.post("/v1/passengers", data);
}
