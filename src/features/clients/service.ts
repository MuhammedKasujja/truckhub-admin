"use server";

import * as apiClient from "@/lib/api-client";
import { Passenger } from "@/features/clients/types";
import {
  PassengerCreateSchemaType,
  PassengerListSearchParams,
  PassengerUpdateSchemaType,
} from "@/features/clients/schemas";
import { EntityId, SearchQuery } from "@/types";
import { generateApiSearchParams } from "@/lib/search-params";
import { DEFAULT_FITER_QUERY_PER_PAGE } from "@/config/constants";

export async function getCustomers(input: PassengerListSearchParams) {
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

export async function getCustomersByQuery({ search }: SearchQuery) {
  return getCustomers({
    page: 1,
    perPage: DEFAULT_FITER_QUERY_PER_PAGE,
    sort: [],
    search: search ?? "",
    created_at: [],
    filters: [],
    joinOperator: "and",
  });
}

export async function getCustomerById(passengerId: EntityId) {
  return await apiClient.getFn<Passenger>(`/v1/passengers/${passengerId}`);
}

export async function getCustomerDetailsById(passengerId: EntityId) {
  return await apiClient.getFn<Passenger>(`/v1/passengers/${passengerId}`);
}

export async function deleteCustomerById(passengerId: EntityId) {
  return await apiClient.deleteFn(`/v1/passengers/${passengerId}`);
}

export async function updateCustomer(data: PassengerUpdateSchemaType) {
  const { id: passengerId, ...rest } = data;
  return await apiClient.putFn(`/v1/passengers/${passengerId}`, rest);
}

export async function createCustomer(data: PassengerCreateSchemaType) {
  return await apiClient.postFn("/v1/passengers", data);
}
