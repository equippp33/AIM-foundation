/**
 * Admin session auth — HMAC-signed, stateless session token.
 *
 * Uses the Web Crypto API (`crypto.subtle`) so the same helpers work in both
 * the Node.js runtime (API routes) and the Edge runtime (middleware).
 *
 * The token is `"<expiry-ms>.<hmac-sha256-hex>"`. It is tamper-proof (the HMAC
 * is keyed with a server-only secret) and self-expiring. No DB table required.
 *
 * Never import the secret into a client component — this module is server-only.
 */

export const ADMIN_COOKIE = "aim_admin";

// 12-hour sessions.
export const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Secret used to sign sessions. Falls back to the admin password if unset. */
function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "aim-foundation-insecure-fallback-secret"
  );
}

async function hmacHex(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toHex(signature);
}

/** Create a signed session token valid for `ttlMs`. */
export async function createSessionToken(ttlMs: number = SESSION_TTL_MS): Promise<string> {
  const payload = String(Date.now() + ttlMs);
  const sig = await hmacHex(payload);
  return `${payload}.${sig}`;
}

/** Constant-time string comparison (avoids signature-timing leaks). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verify a session token: well-formed, not expired, signature valid. */
export async function verifySessionToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!payload || !sig) return false;

  const exp = Number(payload);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  const expected = await hmacHex(payload);
  return safeEqual(expected, sig);
}
