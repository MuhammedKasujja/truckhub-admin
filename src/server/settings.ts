import apiClient from "@/lib/api-client";

export async function getSettings() {
  return await apiClient.get("/v1/settings");
}

export async function getVehicleSettings() {
  return await apiClient.get("/v1/settings/vehicle-config");
}
