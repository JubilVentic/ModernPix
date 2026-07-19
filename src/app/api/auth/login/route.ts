import { NextResponse } from "next/server";
import {
  OWNER_COOKIE,
  createOwnerSessionToken,
  ownerCookieOptions,
  verifyOwnerCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!process.env.OWNER_PASSWORD) {
    return NextResponse.json(
      {
        error:
          "Owner login is not configured. Set OWNER_PASSWORD in .env.local.",
      },
      { status: 503 },
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = String(body.username ?? "");
  const password = String(body.password ?? "");

  if (!verifyOwnerCredentials(username, password)) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 },
    );
  }

  const token = await createOwnerSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(OWNER_COOKIE, token, ownerCookieOptions());
  return response;
}
