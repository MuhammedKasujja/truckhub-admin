"use server";

import * as apiClient from "@/lib/api-client";

export async function fetchPermissions() {
  try {
    const response = await apiClient.postFn<string[]>("/permissions/generate", {});
    return response.data;
  } catch (error) {
    console.log("Error fetchPermissions");
  }
}
