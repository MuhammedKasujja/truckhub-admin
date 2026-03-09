"use server";

import apiClient from "@/lib/api-client";
import { CarBrand } from "@/features/setiings/car-brand/types";
import {
  CarBrandCreateSchemaType,
  CarBrandListSearchParams,
  CarBrandUpdateSchemaType,
} from "@/features/setiings/car-brand/schemas";

export async function getCarBrands(input: CarBrandListSearchParams) {
  const { data, isSuccess, error } = await apiClient.get<CarBrand[]>("/v1/car-brands");
  return { data: isSuccess ? data! : [], error };
}

export async function getCarBrandById(carBrandId: number | string) {
  return await apiClient.get<CarBrand>(`/v1/car-brands/${carBrandId}`);
}

export async function deleteCarBrandById(carBrandId: number | string) {
  return await apiClient.delete(`/v1/car-brands/${carBrandId}`);
}

export async function updateCarBrand(data: CarBrandUpdateSchemaType) {
  const { id: carBrandId, ...rest } = data;
  return await apiClient.put(`/v1/car-brands/${carBrandId}`, rest);
}

export async function createCarBrand(data: CarBrandCreateSchemaType) {
  return await apiClient.post("/v1/car-brands", data);
}
