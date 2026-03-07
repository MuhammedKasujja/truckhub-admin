"use server";

import apiClient from "@/lib/api-client";
import { DriveTrain } from "@/types/drive-train";
import {
  DriveTrainCreateSchemaType,
  DriveTrainListSearchParams,
  DriveTrainUpdateSchemaType,
} from "@/schemas/drive-train";

export async function getDriveTrains(input: DriveTrainListSearchParams) {
  const { data, isSuccess, error } =
    await apiClient.get<DriveTrain[]>("/v1/drive-trains");
  return { data: isSuccess ? data! : [], error };
}

export async function getDriveTrainById(driveTrainId: number | string) {
  return await apiClient.get<DriveTrain>(`/v1/drive-trains/${driveTrainId}`);
}

export async function deleteDriveTrainById(driveTrainId: number | string) {
  return await apiClient.delete(`/v1/drive-trains/${driveTrainId}`);
}

export async function updateDriveTrain(data: DriveTrainUpdateSchemaType) {
  const { id: driveTrainId, ...rest } = data;
  return await apiClient.put(`/v1/drive-trains/${driveTrainId}`, rest);
}

export async function createDriveTrain(data: DriveTrainCreateSchemaType) {
  return await apiClient.post("/v1/drive-trains", data);
}
