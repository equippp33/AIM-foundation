import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import pool from "@/lib/db";
import { isProjectCode, projectLabel } from "@/lib/projects";

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
  const projectRaw = String(body.project ?? "").trim();
  const amountNum = Number(body.amount);

  // Server-side validation (never trust the client).
  if (!name || !email || !phone || body.amount === undefined || body.amount === "") {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!Number.isFinite(amountNum) || amountNum < 1000) {
    return NextResponse.json(
      { error: "Amount must be at least ₹1,000." },
      { status: 400 }
    );
  }
  // `project` must be one of the DB enum codes (or empty). Reject anything else
  // so the insert never fails on an invalid enum value.
  if (projectRaw && !isProjectCode(projectRaw)) {
    return NextResponse.json({ error: "Please select a valid program." }, { status: 400 });
  }
  // Enum code stored in the DB; friendly label used in emails.
  const project = projectRaw || null;
  const projectName = projectLabel(projectRaw);

  // ── 1. Persist to RDS ─────────────────────────────────────────────────────
  try {
    await pool.query(
      `INSERT INTO public.sse_pledges (name, email, phone, amount, project, status)
       VALUES ($1, $2, $3, $4, $5::project_type, $6)`,
      [name, email, phone, amountNum, project, "pending"]
    );
  } catch (dbErr) {
    console.error("DB insert error:", dbErr);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again." },
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
  // Programs the support funds — the donor's selected program, or both when
  // none was specified.
  const programsDisplay = projectName || "Janani Mitra · MAP-AP";

  // Per-program description blurbs (HTML). The "funds" paragraph shows only the
  // selected program's blurb, or both when no program was specified.
  const JANANI_BLURB = `<strong style="color:#0c1a2e;">Janani Mitra</strong>, our AI-powered maternal health platform reaching pregnant women in rural communities`;
  const MAPAP_BLURB = `<strong style="color:#0c1a2e;">MAP-AP</strong>, India's first population-scale rural gut microbiome research initiative`;
  const programsParagraph =
    project === "JANANI_MITRA"
      ? `Your support directly funds an active program on the ground in Andhra Pradesh — ${JANANI_BLURB}.`
      : project === "MAP_AP"
      ? `Your support directly funds an active program on the ground in Andhra Pradesh — ${MAPAP_BLURB}.`
      : `Your support directly funds two active programs on the ground in Andhra Pradesh — ${JANANI_BLURB}, and ${MAPAP_BLURB}.`;

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
        <p style="${F};font-size:11px;font-weight:700;color:${BRAND};letter-spacing:2px;text-transform:uppercase;margin:0 0 14px;">Support Confirmed</p>
        <h2 style="${F};font-size:26px;font-weight:800;color:#0c1a2e;margin:0 0 12px;line-height:1.3;">Your Support is Confirmed</h2>
        <p style="${F};font-size:15px;color:#475569;margin:0;">Thank you for backing healthcare that reaches India's most underserved communities.</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#ffffff;padding:40px 48px;">

        <p style="${F};font-size:15px;color:#334155;line-height:1.8;margin:0 0 24px;">
          Dear <strong>${escapeHtml(name)}</strong>,
        </p>

        <p style="${F};font-size:15px;color:#334155;line-height:1.8;margin:0 0 28px;">
          Thank you. We have received your expression of support — <strong style="color:#0c1a2e;">₹${amountFmt}</strong> toward building healthcare infrastructure that reaches India's most underserved communities.
        </p>

        <!-- Pledge details card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND_BG};border:1px solid ${BRAND_BORDER};border-radius:14px;margin-bottom:28px;">
          <tr>
            <td style="padding:24px 28px;">
              <p style="${F};font-size:11px;font-weight:700;color:${BRAND};letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px;">Your Pledge Details</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid ${BRAND_BORDER};">
                    <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Amount</p>
                    <p style="${F};font-size:20px;font-weight:800;color:${BRAND_DARK};margin:4px 0 0;">₹${amountFmt}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid ${BRAND_BORDER};">
                    <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Programs</p>
                    <p style="${F};font-size:15px;font-weight:700;color:#0c1a2e;margin:4px 0 0;">${escapeHtml(programsDisplay)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Status</p>
                    <p style="${F};font-size:14px;font-weight:700;color:#0c1a2e;margin:4px 0 0;">Expression of Intent Received</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- What your support funds -->
        <p style="${F};font-size:15px;color:#334155;line-height:1.8;margin:0 0 28px;">
          ${programsParagraph}
        </p>

        <!-- Next steps -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:28px;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="${F};font-size:13px;font-weight:700;color:#92400e;margin:0 0 8px;">⚡ What happens next</p>
              <p style="${F};font-size:13px;color:#78350f;line-height:1.7;margin:0;">
                Our team will contact you within <strong>2–3 business days</strong> for documentation and onboarding. No payment has been processed at this stage.
              </p>
            </td>
          </tr>
        </table>

        <!-- Closing -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,${BRAND_BG},#e0f2fe);border-radius:14px;margin-bottom:32px;">
          <tr>
            <td style="padding:28px 32px;text-align:center;">
              <p style="${F};font-size:15px;color:#475569;line-height:1.8;margin:0;">
                We're glad to have you with us.
              </p>
            </td>
          </tr>
        </table>

        <!-- Sign-off -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:24px;">
          <tr>
            <td>
              <p style="${F};font-size:14px;color:#334155;margin:0 0 4px;">Warm regards,</p>
              <p style="${F};font-size:15px;font-weight:700;color:#0c1a2e;margin:0;">Equippp Team</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:28px 48px;text-align:center;">
        <p style="${F};font-size:12px;color:#64748b;margin:0 0 6px;">Registered Section 8 Non-Profit · Supported by AIG Hospitals</p>
        <p style="${F};font-size:11px;color:#94a3b8;margin:0;">CSR-eligible under Schedule VII, Companies Act, 2013</p>
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
        <p style="${F};font-size:11px;font-weight:700;color:${BRAND};letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">New Support Pledge</p>
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
          ${
            project
              ? `<tr><td style="padding:14px 20px;border-bottom:1px solid #f1f5f9;">
            <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Program of Interest</p>
            <p style="${F};font-size:14px;font-weight:700;color:#0c1a2e;margin:3px 0 0;">${escapeHtml(projectName)}</p>
          </td></tr>`
              : ""
          }
          <tr><td style="padding:14px 20px;">
            <p style="${F};font-size:12px;color:${BRAND};font-weight:600;margin:0;">Indicative Amount</p>
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
      subject: `Your Support is Confirmed — AIM Foundation`,
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
