const enc = new TextEncoder();

function bufferToHex(buf: ArrayBuffer) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Compatible Edge (middleware) et Node — ne logguez jamais cette valeur. */
export async function computeAdminSessionToken(secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("prisca-admin-session-v1"));
  return bufferToHex(sig);
}

export const COOKIE_NAME = "pm_admin";

export function getAdminSessionCookieName() {
  return COOKIE_NAME;
}

function timingSafeEqualString(a: string, b: string) {
  const ba = enc.encode(a);
  const bb = enc.encode(b);
  if (ba.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ba.length; i++) diff |= ba[i]! ^ bb[i]!;
  return diff === 0;
}

export async function isValidAdminSession(cookieValue: string | undefined, secret: string | undefined) {
  if (!cookieValue || !secret) return false;
  const expected = await computeAdminSessionToken(secret);
  return timingSafeEqualString(cookieValue, expected);
}
