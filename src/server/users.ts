"use server";

import apiClient from "@/lib/api-client";

export type SystemUser = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

export async function getUsers() {
  const { data, isSuccess } = await apiClient.get<SystemUser[]>("/v1/users");
  return { data: isSuccess ? data! : [] };
}

export async function getUserById(userId: number | string) {
  return await apiClient.get<SystemUser>(`/v1/users/${userId}`);
}

export async function deleteUserById(userId: number | string) {
  return await apiClient.delete(`/v1/users/${userId}`);
}

export async function updateUser(userId: number | string) {
  return await apiClient.put(`/v1/users/${userId}`);
}

export async function createUser(data: unknown) {
  return await apiClient.post("/v1/users", data);
}
