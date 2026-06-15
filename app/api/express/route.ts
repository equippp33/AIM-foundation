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
  const refNumber = `SSE-${Math.floor(100000 + Math.random() * 900000)}`;

  // ── Shared email style tokens ─────────────────────────────────────────────
  const F = `font-family:'Segoe UI',Arial,Helvetica,sans-serif`;
  const BRAND = "#0ea5e9";
  const BRAND_DARK = "#0369a1";
  const BRAND_BG = "#f0f9ff";
  const BRAND_BORDER = "#bae6fd";

  // ── Donor acknowledgement HTML ────────────────────────────────────────────
  const donorHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
<tr><td align="center">

  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12);">

    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,${BRAND_BG},#e0f2fe);padding:48px 48px 40px;text-align:center;">
        <p style="${F};font-size:11px;font-weight:700;color:${BRAND};letter-spacing:2px;text-transform:uppercase;margin:0 0 14px;">SSE Pledge Received</p>
        <h2 style="${F};font-size:26px;font-weight:800;color:#0c1a2e;margin:0 0 12px;line-height:1.3;">Thank You for Backing<br>AI-Driven Healthcare in India</h2>
        <p style="${F};font-size:15px;color:#475569;margin:0;">Your pledge of <strong style="color:${BRAND_DARK};">₹${amountFmt}</strong> is a step toward reaching 1,00,000 underserved patients by FY 2026-27.</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#ffffff;padding:40px 48px;">

        <p style="${F};font-size:15px;color:#334155;line-height:1.8;margin:0 0 24px;">
          Dear <strong>${escapeHtml(name)}</strong>,
        </p>

        <p style="${F};font-size:15px;color:#334155;line-height:1.8;margin:0 0 28px;">
          We have successfully received your expression of support through <strong style="color:#0c1a2e;">SEBI's Social Stock Exchange (SSE)</strong>. AIM Foundation (AI &amp; MedTech Alliance) is dedicated to engineering scalable, AI-powered healthcare access for India's most underserved communities.
        </p>

        <!-- Pledge details card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND_BG};border:1px solid ${BRAND_BORDER};border-radius:14px;margin-bottom:28px;">
          <tr>
            <td style="padding:24px 28px;">
              <p style="${F};font-size:11px;font-weight:700;color:${BRAND};letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">Your Pledge Details</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid ${BRAND_BORDER};">
                    <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Pledge Amount</p>
                    <p style="${F};font-size:20px;font-weight:800;color:${BRAND_DARK};margin:4px 0 0;">₹${amountFmt}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid ${BRAND_BORDER};">
                    <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Instrument</p>
                    <p style="${F};font-size:14px;font-weight:700;color:#0c1a2e;margin:4px 0 0;">Social Stock Exchange (SEBI SSE) — Zero Coupon Zero Principal</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Reference Number</p>
                    <p style="${F};font-size:14px;font-weight:700;color:#0c1a2e;margin:4px 0 0;">${refNumber}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Impact stats -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,${BRAND_BG},#e0f2fe);border:1px solid ${BRAND_BORDER};border-radius:16px;margin-bottom:28px;">
          <tr>
            <td style="padding:28px 24px;">
              <p style="${F};font-size:11px;font-weight:700;color:${BRAND};letter-spacing:1.5px;text-transform:uppercase;margin:0 0 20px;text-align:center;">Your Pledge Fuels</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:0 8px;">
                    <div style="font-size:22px;margin-bottom:6px;">🏥</div>
                    <div style="${F};font-size:20px;font-weight:800;color:#0c1a2e;">15×</div>
                    <div style="${F};font-size:11px;color:#64748b;margin-top:2px;">Capital Multiplier</div>
                  </td>
                  <td align="center" style="padding:0 8px;">
                    <div style="font-size:22px;margin-bottom:6px;">👩‍⚕️</div>
                    <div style="${F};font-size:20px;font-weight:800;color:#0c1a2e;">1,00,000+</div>
                    <div style="${F};font-size:11px;color:#64748b;margin-top:2px;">Patients by FY27</div>
                  </td>
                  <td align="center" style="padding:0 8px;">
                    <div style="font-size:22px;margin-bottom:6px;">🤖</div>
                    <div style="${F};font-size:20px;font-weight:800;color:#0c1a2e;">AI+</div>
                    <div style="${F};font-size:11px;color:#64748b;margin-top:2px;">Powered Diagnostics</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Next steps -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:28px;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="${F};font-size:13px;font-weight:700;color:#92400e;margin:0 0 8px;">⚡ What happens next?</p>
              <p style="${F};font-size:13px;color:#78350f;line-height:1.7;margin:0;">
                Our team will reach out within <strong>2–3 business days</strong> to guide you through the formal SSE subscription process, KYC documentation, and fund transfer via the registered depository. No payment has been processed at this stage — this is your expression of intent.
              </p>
            </td>
          </tr>
        </table>

        <!-- Closing -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,${BRAND_BG},#e0f2fe);border-radius:14px;margin-bottom:32px;">
          <tr>
            <td style="padding:28px 32px;text-align:center;">
              <p style="${F};font-size:15px;color:#475569;line-height:1.8;margin:0 0 8px;">
                Your belief in <strong style="color:#0c1a2e;">AI-powered healthcare</strong> is the foundation we build on. Together, we are closing the gap between cutting-edge medicine and the communities that need it most.
              </p>
              <p style="${F};font-size:13px;color:${BRAND};margin:0;font-style:italic;">
                Engineering healthcare. At scale. For everyone.
              </p>
            </td>
          </tr>
        </table>

        <!-- Sign-off -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:24px;">
          <tr>
            <td>
              <p style="${F};font-size:14px;color:#334155;margin:0 0 4px;">Warm Regards,</p>
              <p style="${F};font-size:15px;font-weight:700;color:#0c1a2e;margin:0 0 2px;">AIM Foundation Team</p>
              <p style="${F};font-size:13px;color:#64748b;margin:0 0 2px;">AI &amp; MedTech Alliance Foundation</p>
              <p style="${F};font-size:13px;color:#64748b;margin:0;">Supported by AIG Hospitals · Section 8 Non-Profit</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:28px 48px;text-align:center;">
        <p style="${F};font-size:12px;color:#64748b;margin:0 0 6px;">AIM Foundation · AI &amp; MedTech Alliance · Registered Section 8 Non-Profit · SEBI SSE Listed</p>
        <p style="${F};font-size:11px;color:#94a3b8;margin:0;font-style:italic;">Bridging the gap between cutting-edge medicine and underserved communities.</p>
      </td>
    </tr>

  </table>

</td></tr>
</table>

</body>
</html>`;

  // ── Internal notification HTML ────────────────────────────────────────────
  const notifyHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
    <tr>
      <td style="background:linear-gradient(135deg,${BRAND_BG},#e0f2fe);padding:32px 40px;text-align:center;">
        <p style="${F};font-size:11px;font-weight:700;color:${BRAND};letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">New SSE Pledge</p>
        <h2 style="${F};font-size:22px;font-weight:800;color:#0c1a2e;margin:0;">₹${amountFmt} — ${escapeHtml(name)}</h2>
        <p style="${F};font-size:12px;color:#64748b;margin:8px 0 0;">Ref: ${refNumber}</p>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;padding:32px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND_BORDER};border-radius:12px;overflow:hidden;">
          <tr><td style="padding:14px 20px;border-bottom:1px solid #f1f5f9;">
            <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Name</p>
            <p style="${F};font-size:14px;font-weight:700;color:#0c1a2e;margin:3px 0 0;">${escapeHtml(name)}</p>
          </td></tr>
          <tr><td style="padding:14px 20px;border-bottom:1px solid #f1f5f9;">
            <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Email</p>
            <p style="${F};font-size:14px;font-weight:700;color:#0c1a2e;margin:3px 0 0;">${escapeHtml(email)}</p>
          </td></tr>
          <tr><td style="padding:14px 20px;border-bottom:1px solid #f1f5f9;">
            <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Phone</p>
            <p style="${F};font-size:14px;font-weight:700;color:#0c1a2e;margin:3px 0 0;">${escapeHtml(phone)}</p>
          </td></tr>
          <tr><td style="padding:14px 20px;">
            <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Pledge Amount</p>
            <p style="${F};font-size:18px;font-weight:800;color:${BRAND_DARK};margin:3px 0 0;">₹${amountFmt}</p>
          </td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 40px;text-align:center;">
        <p style="${F};font-size:11px;color:#94a3b8;margin:0;">AIM Foundation · Internal Notification · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
      </td>
    </tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  try {
    // Primary email — to the address entered in the form (the member).
    await transporter.sendMail({
      from,
      to: email,
      replyTo: sender,
      subject: `Your SSE Pledge is Confirmed — AIM Foundation (Ref: ${refNumber})`,
      html: donorHtml,
    });

    // Internal notification — to the org inbox (non-fatal).
    try {
      await transporter.sendMail({
        from,
        to: sender,
        replyTo: email,
        subject: `New SSE Pledge — ${name} — ₹${amountFmt} — ${refNumber}`,
        html: notifyHtml,
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
