import apiClient from "@/lib/api-client";
import { Setting, VehicleConfigurations } from "@/types/setting";

export async function getSettings() {
  return await apiClient.get<Setting[]>("/v1/settings");
}

export async function getVehicleSettings() {
  return await apiClient.get<VehicleConfigurations>(
    "/v1/settings/vehicle-config",
  );
}
