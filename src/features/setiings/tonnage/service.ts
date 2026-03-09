"use server";

import apiClient from "@/lib/api-client";
import { Tonnage } from "@/features/setiings/tonnage/types";
import {
  TonnageCreateSchemaType,
  TonnageUpdateSchemaType,
} from "@/features/setiings/tonnage/schemas";

export async function getTonnages() {
  const { data, isSuccess, error } = await apiClient.get<Tonnage[]>("/v1/tonnages");
  return { data: isSuccess ? data! : [], error };
}

// export async function getTonnageById(tonnageId: number | string) {
//   return await apiClient.get<Tonnage>(`/v1/tonnages/${tonnageId}`);
// }

export async function deleteTonnageById(tonnageId: number | string) {
  return await apiClient.deleteFn(`/v1/tonnages/${tonnageId}`);
}

export async function updateTonnage(data: TonnageUpdateSchemaType) {
  const { id: tonnageId, ...rest } = data;
  return await apiClient.put(`/v1/tonnages/${tonnageId}`, rest);
}

export async function createTonnage(data: TonnageCreateSchemaType) {
  return await apiClient.post("/v1/tonnages", data);
}
