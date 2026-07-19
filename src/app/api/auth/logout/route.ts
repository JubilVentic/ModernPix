import { NextResponse } from "next/server";
import { OWNER_COOKIE, ownerCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(OWNER_COOKIE, "", {
    ...ownerCookieOptions(0),
    maxAge: 0,
  });
  return response;
}
