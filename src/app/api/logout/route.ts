import { NextResponse } from 'next/server';
import { deleteUserSession } from '@/lib/session';
// Work around to delete user session cookie in the axios interceptor

export async function POST() {
  await deleteUserSession()
  return NextResponse.json({ success: true });
}