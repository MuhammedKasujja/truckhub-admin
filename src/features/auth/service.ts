"use server";

import { redirect } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { AuthResponse } from "@/features/auth/types";
import { LoginSchemaType } from "@/features/auth/schemas";
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
  await deleteUserSession();
  redirect("/login");
}
