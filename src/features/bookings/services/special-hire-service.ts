"use server";

import * as apiClient from "@/lib/api-client";
import { EntityId, SearchQuery } from "@/types";
import {
  BookingListSearchParams,
  SpecialBookingCreateSchemaType,
  SpecialBookingUpdateSchemaType,
} from "../schemas";
import { Booking } from "../types";
import { generateApiSearchParams } from "@/lib/search-params";
import { DEFAULT_FITER_QUERY_PER_PAGE } from "@/config/constants";

const endpoint = "/v1/bookings";

export async function getBookings(input: BookingListSearchParams) {
  const { page, perPage } = input;
  const params = generateApiSearchParams(input);

  const {
    data,
    isSuccess,
    error,
    pagination: paginator,
  } = await apiClient.getPaginatedFn<Booking[]>(`${endpoint}?${params}`);
  const pagination = paginator ?? { page, perPage, totalPages: 0, total: 0 };

  return { data: isSuccess ? data! : [], error, pagination };
}

export async function getBookingsByQuery({ search }: SearchQuery) {
  return getBookings({
    page: 1,
    perPage: DEFAULT_FITER_QUERY_PER_PAGE,
    sort: [],
    search: search ?? "",
    created_at: [],
    filters: [],
    joinOperator: "and",
  });
}

export async function updateSpecialBooking(
  data: SpecialBookingUpdateSchemaType,
) {
  const { id: bookingId, ...rest } = data;
  return await apiClient.putFn(`${endpoint}/${bookingId}`, rest);
}

export async function createSpecialBooking(
  data: SpecialBookingCreateSchemaType,
) {
  return await apiClient.postFn(endpoint, data);
}

export async function deleteSpecialBookingById(bookingId: EntityId) {
  return await apiClient.deleteFn(`${endpoint}/${bookingId}`);
}
