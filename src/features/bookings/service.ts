"use server";

import  * as apiClient from "@/lib/api-client";
import { Booking } from "@/features/bookings/types";
import{
  BookingListSearchParams,
  BookingUpdateSchemaType,
  BookingCreateSchemaType,
} from "@/features/bookings/schemas";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getBookings(input: BookingListSearchParams) {
  const { page, perPage } = input;
  const params = generateApiSearchParams(input);

  const {
    data,
    isSuccess,
    error,
    pagination: paginator,
  } = await apiClient.getPaginatedFn<Booking[]>(`/v1/bookings/?${params}`);
  const pagination = paginator ?? { page, perPage, totalPages: 0, total: 0 };

  return { data: isSuccess ? data! : [], error, pagination };
}

export async function getBookingById(tripId: number | string) {
  return await apiClient.getFn<Booking>(`/v1/bookings/${tripId}`);
}

export async function deleteBookingById(tripId: number | string) {
  return await apiClient.deleteFn(`/v1/bookings/${tripId}`);
}

export async function updateBooking(data: BookingUpdateSchemaType) {
  const { id: tripId, ...rest } = data;
  return await apiClient.putFn(`/v1/bookings/${tripId}`, rest);
}

export async function createBooking(data: BookingCreateSchemaType) {
  return await apiClient.postFn("/v1/bookings", data);
}
