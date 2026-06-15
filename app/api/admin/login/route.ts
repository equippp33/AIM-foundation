import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, SESSION_TTL_MS, createSessionToken } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedPass) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_PASSWORD in the environment." },
      { status: 500 }
    );
  }

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = await createSessionToken();
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });

  return NextResponse.json({ ok: true });
}
