"use server";

import apiClient from "@/lib/api-client";
import { SystemUser, UserListResponse } from "@/types/user";
import {
  UserCreateSchemaType,
  UserListSearchParams,
  UserUpdateSchemaType,
} from "@/schemas/user";

export async function getUsers(input: UserListSearchParams) {
  const { data, isSuccess } =
    await apiClient.get<UserListResponse>("/v1/users");
  return { data: isSuccess ? data!.users : [] };
}

export async function getUserById(userId: number | string) {
  return await apiClient.get<SystemUser>(`/v1/users/${userId}`);
}

export async function deleteUserById(userId: number | string) {
  return await apiClient.delete(`/v1/users/${userId}`);
}

export async function updateUser(data: UserUpdateSchemaType) {
  const { id: userId, ...rest } = data;
  return await apiClient.put(`/v1/users/${userId}`, rest);
}

export async function createUser(data: UserCreateSchemaType) {
  return await apiClient.post("/v1/users", data);
}
