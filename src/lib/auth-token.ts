const encoder = new TextEncoder();

export const OWNER_COOKIE = "mp_owner_session";

export type SessionPayload = {
  role: "owner";
  exp: number;
};

function getSecret() {
  return process.env.OWNER_SESSION_SECRET || process.env.OWNER_PASSWORD || "";
}

function bytesToBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < view.length; i += 1) {
    binary += String.fromCharCode(view[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function stringToBase64Url(value: string) {
  return bytesToBase64Url(encoder.encode(value));
}

function base64UrlToString(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function sign(payload: string) {
  const secret = getSecret();
  if (!secret) return "";
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  return bytesToBase64Url(signature);
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

export async function createOwnerSessionToken() {
  const payload: SessionPayload = {
    role: "owner",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  const encoded = stringToBase64Url(JSON.stringify(payload));
  const signature = await sign(encoded);
  return `${encoded}.${signature}`;
}

export async function verifyOwnerSessionToken(
  token: string | undefined | null,
) {
  if (!token || !token.includes(".")) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;
  if (!getSecret()) return false;

  try {
    const expected = await sign(encoded);
    if (!safeEqual(signature, expected)) return false;
    const payload = JSON.parse(base64UrlToString(encoded)) as SessionPayload;
    if (payload.role !== "owner") return false;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
