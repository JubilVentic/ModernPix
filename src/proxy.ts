import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OWNER_COOKIE, verifyOwnerSessionToken } from "@/lib/auth-token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/owner" || pathname === "/owner/") {
    const token = request.cookies.get(OWNER_COOKIE)?.value;
    const authed = await verifyOwnerSessionToken(token);
    return NextResponse.redirect(
      new URL(authed ? "/owner/bookings" : "/owner/login", request.url),
    );
  }

  if (pathname.startsWith("/owner/bookings")) {
    const token = request.cookies.get(OWNER_COOKIE)?.value;
    const authed = await verifyOwnerSessionToken(token);
    if (!authed) {
      const loginUrl = new URL("/owner/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/owner/login") {
    const token = request.cookies.get(OWNER_COOKIE)?.value;
    const authed = await verifyOwnerSessionToken(token);
    if (authed) {
      return NextResponse.redirect(new URL("/owner/bookings", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner", "/owner/:path*"],
};
