"use server";

import * as apiClient from "@/lib/api-client";
import { Role } from "@/features/settings/permissions/types";
import {
  RoleCreateSchemaType,
  RoleUpdateSchemaType,
} from "@/features/settings/permissions/schemas";

const endpoint = "/v1/permissions/roles";

export async function getRoleTypeById(roleId: number | string) {
  return await apiClient.getFn<Role>(`${endpoint}/${roleId}`);
}

export async function deleteRoleById(roleId: number | string) {
  return await apiClient.deleteFn(`${endpoint}/${roleId}`);
}

export async function updateRole(data: RoleUpdateSchemaType) {
  const { id: roleId, ...rest } = data;
  return await apiClient.putFn(`${endpoint}/${roleId}`, rest);
}

export async function createRole(data: RoleCreateSchemaType) {
  return await apiClient.postFn(endpoint, data);
}
