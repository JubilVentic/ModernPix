import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  OWNER_COOKIE,
  createOwnerSessionToken,
  verifyOwnerSessionToken,
} from "@/lib/auth-token";

export { OWNER_COOKIE, createOwnerSessionToken, verifyOwnerSessionToken };

export function verifyOwnerCredentials(username: string, password: string) {
  const expectedUser = process.env.OWNER_USERNAME || "owner";
  const expectedPass = process.env.OWNER_PASSWORD || "";

  if (!expectedPass) return false;

  const userOk = username.trim().toLowerCase() === expectedUser.toLowerCase();
  const passA = Buffer.from(password);
  const passB = Buffer.from(expectedPass);
  const passOk =
    passA.length === passB.length && timingSafeEqual(passA, passB);

  return userOk && passOk;
}

export async function isOwnerAuthenticated() {
  const jar = await cookies();
  return verifyOwnerSessionToken(jar.get(OWNER_COOKIE)?.value);
}

export function ownerCookieOptions(maxAgeSeconds = 7 * 24 * 60 * 60) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
