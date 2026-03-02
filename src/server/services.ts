"use server";

import apiClient from "@/lib/api-client";

export type Service = {
  name: string;
  display_name: string;
  seats: number;
  base_fare: number;
  min_fare: number;
  price_per_min: number;
  price_per_unit_distance: number;
  booking_fee: number;
  tax_fee: number;
  distance_unit: "km" | "miles";
  vehicle_type_id: number;
  description: string | null;
  id: number;
  is_truck: boolean;
};

export async function getServices() {
  const { data, isSuccess } = await apiClient.get<Service[]>("/v1/services");
  return { data: isSuccess ? data! : [] };
}

export async function getServiceById(serviceId: number | string) {
  return await apiClient.get<Service>(`/v1/services/${serviceId}`);
}

export async function deleteServiceById(serviceId: number | string) {
  return await apiClient.delete(`/v1/services/${serviceId}`);
}

export async function updateService(serviceId: number | string) {
  return await apiClient.put(`/v1/services/${serviceId}`);
}

export async function createService(data: unknown) {
  return await apiClient.post("/v1/services", data);
}
