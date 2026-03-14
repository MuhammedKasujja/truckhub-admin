"use server";

import * as apiClient from "@/lib/api-client";
import { Passenger } from "@/features/clients/types";
import {
  PassengerCreateSchemaType,
  PassengerListSearchParams,
  PassengerUpdateSchemaType,
} from "@/features/clients/schemas";
import { SearchQuery } from "@/types";
import { generateApiSearchParams } from "@/lib/search-params";
import { DEFAULT_FITER_QUERY_PER_PAGE } from "@/config/constants";

export async function getPassengers(input: PassengerListSearchParams) {
  const { page, perPage } = input;

  const params = generateApiSearchParams(input);

  const {
    data,
    isSuccess,
    error,
    pagination: paginator,
  } = await apiClient.getPaginatedFn<Passenger[]>(`/v1/passengers/?${params}`);

  const pagination = paginator ?? { page, perPage, totalPages: 0, total: 0 };
  return { data: isSuccess ? data! : [], error, pagination };
}

export async function getPassengersByQuery({ search }: SearchQuery) {
  return getPassengers({
    page: 1,
    perPage: DEFAULT_FITER_QUERY_PER_PAGE,
    sort: [],
    search: search ?? "",
    created_at: [],
    filters: [],
    joinOperator: "and",
  });
}

export async function getPassengerById(passengerId: number | string) {
  return await apiClient.getFn<Passenger>(`/v1/passengers/${passengerId}`);
}

export async function deletePassengerById(passengerId: number | string) {
  return await apiClient.deleteFn(`/v1/passengers/${passengerId}`);
}

export async function updatePassenger(data: PassengerUpdateSchemaType) {
  const { id: passengerId, ...rest } = data;
  return await apiClient.putFn(`/v1/passengers/${passengerId}`, rest);
}

export async function createPassenger(data: PassengerCreateSchemaType) {
  return await apiClient.postFn("/v1/passengers", data);
}
