"use server";

import { EntityId } from "@/types";
import * as apiClient from "@/lib/api-client";
import {
  SpecialBookingCreateSchemaType,
  SpecialBookingUpdateSchemaType,
} from "../schemas";

export async function deleteSpecialBookingById(bookingId: EntityId) {
  return await apiClient.deleteFn(`/v1/bookings/special/${bookingId}`);
}

export async function updateSpecialBooking(data: SpecialBookingUpdateSchemaType) {
  const { id: bookingId, ...rest } = data;
  return await apiClient.putFn(`/v1/bookings/special/${bookingId}`, rest);
}

export async function createSpecialBooking(data: SpecialBookingCreateSchemaType) {
  return await apiClient.postFn("/v1/bookings/special", data);
}
