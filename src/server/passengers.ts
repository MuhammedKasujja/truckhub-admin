"use server";

import apiClient from "@/lib/api-client";

export async function getPassengers() {
  try {
    const response = await apiClient.get("/v1/passengers");
    return response.data.data;
  } catch (error) {
    return null;
  }
}
