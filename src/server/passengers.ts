"use server";

import { apiClient } from "@/lib/api-client";

export async function getPassengers() {
  const { data, isSuccess } = await apiClient.get("/v1/passengers");
  return { data: isSuccess ? data! : [] };
}
