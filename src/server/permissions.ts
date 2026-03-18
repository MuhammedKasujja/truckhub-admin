"use server";

import * as apiClient from "@/lib/api-client";

export type UserRole = {
  id: number;
  name: string;
  description: string | null;
  permissions: string[];
};

export async function fetchPermissions() {
  try {
    const response = await apiClient.postFn<string[]>(
      "/permissions/generate",
      {},
    );
    return response.data;
  } catch (error) {
    console.log("Error fetchPermissions");
  }
}

export async function getRoles() {
  return await apiClient.getFn<UserRole[]>("/permissions/roles");
}

export async function createRoles({
  name,
  description,
}: {
  name: string;
  description: string | null;
}) {
  return await apiClient.postFn<UserRole>("/permissions/roles", {
    name,
    description,
  });
}

export async function assignPermissionsToRole({
  roleId,
  permissions,
}: {
  roleId: string;
  permissions: string[];
}) {
  return await apiClient.postFn<UserRole>(
    `/permissions/roles/${roleId}/permissions`,
    {
      permissions,
    },
  );
}
