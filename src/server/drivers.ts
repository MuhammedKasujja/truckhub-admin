"use server";

import apiClient from "@/lib/api-client";

export async function getDrivers() {
  try {
    const response = await apiClient.get("/v1/drivers");
    return response.data.data;
  } catch (error) {
    return null;
  }
}
