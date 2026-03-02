"use server";

import apiClient from "@/lib/api-client";

export async function getDrivers() {
  const { isSuccess, data } = await apiClient.get("/v1/drivers");
  return { data: isSuccess ? data! : [] };
}
