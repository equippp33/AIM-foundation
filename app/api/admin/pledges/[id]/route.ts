import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function checkAuth(): Promise<boolean> {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const id = params.id;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const allowed = ["name", "email", "phone", "amount", "status", "project"] as const;
  const setClauses: string[] = [];
  const values: unknown[] = [];

  for (const key of allowed) {
    if (key in body) {
      values.push(body[key]);
      if (key === "project") {
        setClauses.push(`${key} = $${values.length}::project_type`);
      } else {
        setClauses.push(`${key} = $${values.length}`);
      }
    }
  }

  if (!setClauses.length) {
    return NextResponse.json({ error: "No fields to update." }, { status: 400 });
  }

  values.push(id);
  const { rowCount } = await pool.query(
    `UPDATE public.sse_pledges SET ${setClauses.join(", ")} WHERE id = $${values.length}`,
    values
  );

  if (!rowCount) {
    return NextResponse.json({ error: "Record not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { rowCount } = await pool.query(
    `DELETE FROM public.sse_pledges WHERE id = $1`,
    [params.id]
  );

  if (!rowCount) {
    return NextResponse.json({ error: "Record not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
