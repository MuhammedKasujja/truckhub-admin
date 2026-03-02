"use server";
import apiClient from "@/lib/api-client";
import { createSession, deleteUserSession } from "@/lib/session";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await apiClient.post(`/v1/auth/login`, {
      email,
      password,
    });

    const authData = response.data.data;
    await createSession({
      user: authData.user,
      access_token: authData.access_token,
      sessionMinutes: authData.expires_in,
      permissions: authData.permissions,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: (error as any).response.data.error.message,
    };
  }
}

export async function logout() {
  await deleteUserSession();
}
