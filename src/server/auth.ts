"use server";
import axios from "axios";
import { createSession, deleteUserSession } from "@/lib/session";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/v1/auth/login`,
      { email, password },
    );
    const authData = response.data.data;
    console.log("Auth Data",authData)
    await createSession({
      user: authData.user,
      access_token: authData.access_token,
      sessionMinutes: authData.expires_in,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as any).response.data.error.message,
    };
  }
}

export async function logout() {
  await deleteUserSession();
}
