"use server";

import apiClient from "@/lib/api-client";
import { CarModel } from "@/features/setiings/car-model/types";
import {
  CarModelCreateSchemaType,
  CarModelListSearchParams,
  CarModelUpdateSchemaType,
} from "@/features/setiings/car-model/schemas";

export async function getCarModels(input: CarModelListSearchParams) {
  const { data, isSuccess, error } = await apiClient.get<CarModel[]>("/v1/car-models");
  return { data: isSuccess ? data! : [], error };
}

export async function getCarModelById(carModelId: number | string) {
  return await apiClient.get<CarModel>(`/v1/car-models/${carModelId}`);
}

export async function deleteCarModelById(carModelId: number | string) {
  return await apiClient.delete(`/v1/car-models/${carModelId}`);
}

export async function updateCarModel(data: CarModelUpdateSchemaType) {
  const { id: carModelId, ...rest } = data;
  return await apiClient.put(`/v1/car-models/${carModelId}`, rest);
}

export async function createCarModel(data: CarModelCreateSchemaType) {
  return await apiClient.post("/v1/car-models", data);
}
