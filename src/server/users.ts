"use server";

import apiClient from "@/lib/api-client";
import { SystemUser, UserListResponse } from "@/types/user";
import {
  UserCreateSchemaType,
  UserListSearchParams,
  UserUpdateSchemaType,
} from "@/schemas/user";
import { EntityId } from "@/types";

export async function getUsers(input: UserListSearchParams) {
  const { data, isSuccess } =
    await apiClient.get<UserListResponse>("/v1/users");
  return { data: isSuccess ? data!.users : [] };
}

export async function getUserById(userId: EntityId) {
  return await apiClient.get<SystemUser>(`/v1/users/${userId}`);
}

export async function deleteUserById(userId: EntityId) {
  return await apiClient.delete(`/v1/users/${userId}`);
}

export async function updateUser(userId: EntityId, data: Partial<UserUpdateSchemaType>) {
  return await apiClient.patch(`/v1/users/${userId}`, data);
}

export async function createUser(data: UserCreateSchemaType) {
  return await apiClient.post("/v1/users", data);
}

// export async function editUser(
//   data: UserCreateSchemaType | UserUpdateSchemaType,
// ) {
//   if (data instanceof UserCreateSchemaType)
//   return createUser(data);
// }
