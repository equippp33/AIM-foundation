import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, amount, created_at
       FROM public.sse_pledges
       ORDER BY created_at ASC
       LIMIT 100`
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/pledges error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
