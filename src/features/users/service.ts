"use server";

import { SystemUser } from "./types";
import apiClient from "@/lib/api-client";
import {
  UserCreateSchemaType,
  UserListSearchParams,
  UserUpdateSchemaType,
} from "@/features/users/schemas";
import { EntityId } from "@/types";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getUsers(input: UserListSearchParams) {
  const { page, perPage } = input;

  const params = generateApiSearchParams(input);

  const {
    data,
    isSuccess,
    pagination: paginator,
    error,
  } = await apiClient.get<SystemUser[]>(`/v1/users/?${params}`);

  const pagination = paginator ?? { page, perPage, totalPages: 0, total: 0 };

  return { data: isSuccess ? data! : [], pagination, error };
}

export async function getUserById(userId: EntityId) {
  return await apiClient.get<SystemUser>(`/v1/users/${userId}`);
}

export async function deleteUserById(userId: EntityId) {
  return await apiClient.delete(`/v1/users/${userId}`);
}

export async function updateUser(
  userId: EntityId,
  data: Partial<UserUpdateSchemaType>,
) {
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
