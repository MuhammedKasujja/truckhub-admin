import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { systemDateTime } from "./utils";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { AuthResponse, AuthUser } from "@/features/auth/types";import { AuthResponse, AuthUser } from "@/features/auth/types";import { AuthResponse, AuthUser } from "@/features/auth/types";import { AuthResponse, AuthUser } from "@/features/auth/types";

const secretKey = process.env.JWT_SECRET;
const encodedSecret = new TextEncoder().encode(secretKey);
const AUTH_ALGORITHM = "HS256";
const SESSION_KEY = "session";

export async function encrypt(payload: AuthResponse) {
  const sessionDuration = systemDateTime
    .plus({ minutes: payload.expires_in })
    .toJSDate();

  return new SignJWT({
    sub: `${payload.user.id}`,
    ...payload,
  })
    .setProtectedHeader({ alg: AUTH_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(sessionDuration)
    .sign(encodedSecret);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedSecret, {
      algorithms: [AUTH_ALGORITHM],
    });
    return payload;
  } catch (error) {
    console.log(`Failed to verify session ${error?.toString()}`);
  }
}

export async function createSession(payload: AuthResponse) {
  const session = await encrypt(payload);

  const cookieStore = await cookies();

  const sessionDuration = systemDateTime
    .plus({ minutes: payload.expires_in })
    .toJSDate();

  cookieStore.set(SESSION_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: sessionDuration,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get(SESSION_KEY)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = systemDateTime
    .plus({ minutes: Number(payload.expires_in) })
    .toJSDate();

  const cookieStore = await cookies();
  cookieStore.set(SESSION_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}

/**
 * Verify user login auth token `server-only`
 */
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get(SESSION_KEY)?.value;
  const session = await decrypt(cookie);

  if (!session?.access_token) {
    redirect("/login");
  }

  return {
    access_token: session.access_token,
    user: session.user,
  };
});

export async function getAccessToken(): Promise<String> {
  const authData = await verifySession();
  return authData.access_token as string;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const authData = await verifySession();
  return authData.user as AuthUser;
}
