import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPE[c]);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field. Pretend success without sending.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const amountNum = Number(body.amount);

  // Server-side validation (never trust the client).
  if (!name || !email || !phone || body.amount === undefined || body.amount === "") {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!Number.isFinite(amountNum) || amountNum <= 0 || amountNum % 10000 !== 0) {
    return NextResponse.json(
      { error: "Amount must be a positive multiple of ₹10,000." },
      { status: 400 }
    );
  }

  // ── 1. Persist to Supabase ────────────────────────────────────────────────
  try {
    const supabase = createServerSupabaseClient();
    const { error: dbError } = await supabase.from("sse_pledges").insert({
      name,
      email,
      phone,
      amount: amountNum,
      // status starts as 'pending'; can be updated to 'confirmed' / 'cancelled'
      status: "pending",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Could not save your pledge. Please try again." },
        { status: 500 }
      );
    }
  } catch (dbErr) {
    console.error("Supabase client error:", dbErr);
    return NextResponse.json(
      { error: "Database connection failed. Please try again." },
      { status: 500 }
    );
  }

  // ── 2. Send confirmation email via Amazon SES ─────────────────────────────
  const user = process.env.SES_USER;
  const pass = process.env.SES_PASSWORD;
  const sender = process.env.SENDER_EMAIL;
  const host = process.env.SES_HOST || "email-smtp.us-east-1.amazonaws.com";
  const port = Number(process.env.SES_PORT || 587);
  if (!user || !pass || !sender) {
    console.error("Express form: missing SES_USER / SES_PASSWORD / SENDER_EMAIL env vars.");
    // Pledge is already saved — return success even if email is misconfigured
    return NextResponse.json({ ok: true });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
    auth: { user, pass },
  });

  const from = `AIM Foundation <${sender}>`;
  const amountFmt = amountNum.toLocaleString("en-IN");

  try {
    // Primary email — to the address entered in the form (the member).
    await transporter.sendMail({
      from,
      to: email,
      replyTo: sender,
      subject: "Thank you for your pledge — AIM Foundation",
      html: `
        <p>Dear ${escapeHtml(name)},</p>
        <p>Thank you for pledging <strong>₹${amountFmt}</strong> in support of AIM Foundation through SEBI's Social Stock Exchange. Our team will reach out shortly to confirm your contribution.</p>
        <p style="margin-top:16px">— AIM Foundation · AI &amp; MedTech Alliance</p>
      `,
    });

    // Internal notification — to the org inbox (non-fatal).
    try {
      await transporter.sendMail({
        from,
        to: sender,
        replyTo: email,
        subject: `New SSE pledge — ${name} — ₹${amountFmt}`,
        html: `
          <h2 style="margin:0 0 12px">New Express Your Support pledge</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Amount:</strong> ₹${amountFmt}</p>
        `,
      });
    } catch (notifyErr) {
      console.error("Internal notification email failed (non-fatal):", notifyErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SES send failed:", err);
    const details =
      process.env.NODE_ENV !== "production"
        ? String((err as Error)?.message ?? err)
        : undefined;
    // Pledge is already in DB — return ok so the user isn't shown an error
    // just because of an email delivery issue. Log it for ops.
    return NextResponse.json(
      { ok: true, ...(details ? { warning: details } : {}) }
    );
  }
}
