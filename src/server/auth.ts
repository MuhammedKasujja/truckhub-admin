"use server";
import { AuthResponse } from "@/types";
import { apiClient } from "@/lib/api-client";
import { createSession, deleteUserSession } from "@/lib/session";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
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
