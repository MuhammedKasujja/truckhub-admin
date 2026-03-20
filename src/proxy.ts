import { logger } from "@/lib/logger";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/session";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  logger.info(`Route Logged -> ${request.nextUrl.pathname}`);
  const session = await getAuthSession();
  if (session) {
  }
  return NextResponse.next();
}
