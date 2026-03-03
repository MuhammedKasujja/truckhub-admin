"use server";
import { AuthResponse } from "@/types/auth";
import { apiClient } from "@/lib/api-client";
import { LoginSchemaType } from "@/schemas/auth";
import { createSession, deleteUserSession } from "@/lib/session";

export async function login({ email, password }: LoginSchemaType) {
  const response = await apiClient.post<AuthResponse>(`/v1/auth/login`, {
    email,
    password,
  });
  if (response.isSuccess) {
    await createSession({ ...response.data! });
  }
  return response;
}

export async function logout() {
  return deleteUserSession();
}
