"use server";

import apiClient from "@/lib/api-client";

export async function fetchPermissions() {
  try {
    const response = await apiClient.post("/permissions/generate", {});
    return response.data;
  } catch (error) {
    console.log("Error fetchPermissions");
  }
}
