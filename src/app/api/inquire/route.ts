import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

export const runtime = "nodejs";

/* =====================================================================
   BOOKING INQUIRY ENDPOINT
   ---------------------------------------------------------------------
   Sends two emails via Resend:
     1. the inquiry to IBK Horbs
     2. an immediate confirmation to the client

   Environment (.env.local locally, host dashboard in production):
     RESEND_API_KEY   required in production
     INQUIRY_TO       inbox that receives inquiries (falls back to site config)
     INQUIRY_FROM     verified sender, e.g. "IBK Horbs <hello@ibkhorbs.com>"

   With no RESEND_API_KEY set, the route logs the submission to the server
   console and returns success, so the form is fully testable offline.
   ===================================================================== */

const FIELD_LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  service: 40,
  date: 40,
  location: 160,
  budget: 60,
  message: 4000,
  source: 120,
  packageName: 120,
} as const;

type Field = keyof typeof FIELD_LIMITS;

// Deliberately loose: enough to catch typos, not to reject valid addresses.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot — real people leave this empty.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const data = {} as Record<Field, string>;
  for (const key of Object.keys(FIELD_LIMITS) as Field[]) {
    const raw = body[key];
    data[key] = typeof raw === "string" ? raw.trim().slice(0, FIELD_LIMITS[key]) : "";
  }

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Tell me who you are.";
  if (!data.email) errors.email = "I need an email to reply to.";
  else if (!EMAIL.test(data.email)) errors.email = "That email doesn't look right.";
  if (!data.service) errors.service = "Pick what you're booking.";
  if (data.message.length < 10) errors.message = "A sentence or two, so I know what this is.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "Not given"],
    ["Service", data.service],
    ["Package", data.packageName || "Not given"],
    ["Date", data.date || "Not set"],
    ["Location", data.location || "Not given"],
    ["Budget", data.budget || "Not given"],
    ["Heard via", data.source || "Not given"],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;

  /* ---- Delivery option B: Web3Forms -------------------------------
     No domain, no DNS — you get an access key emailed to you and paste
     it into WEB3FORMS_ACCESS_KEY. Used only when Resend isn't set up.
     The key stays server-side here rather than sitting in the page
     source, and the form still gets our own validation and honeypot. */
  if (!apiKey && web3Key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `New ${data.service} inquiry from ${data.name}${data.date ? ` (${data.date})` : ""}`,
          from_name: `${site.name} website`,
          replyto: data.email,
          ...Object.fromEntries(rows),
          Message: data.message,
        }),
      });
      /* Web3Forms answers a rejected key with an HTML error page, not JSON,
         so parse defensively — res.json() would throw before we could read
         the status and produce a useful log line. */
      const raw = await res.text();
      let json: { success?: boolean; message?: string } = {};
      try {
        json = JSON.parse(raw);
      } catch {
        /* non-JSON response; fall through to the status check below */
      }
      if (!res.ok || !json.success) {
        throw new Error(json.message ?? `HTTP ${res.status} — ${raw.slice(0, 200)}`);
      }
      // Web3Forms' free tier has no branded auto-reply, so the client
      // sees the on-page confirmation only.
      return NextResponse.json({ ok: true, delivered: true, via: "web3forms" });
    } catch (err) {
      console.error("[inquire] web3forms send failed", err);
      return NextResponse.json(
        { error: `Something broke on my end. Email me directly at ${site.contact.email}.` },
        { status: 502 },
      );
    }
  }

  if (!apiKey) {
    console.warn(
      "[inquire] No RESEND_API_KEY or WEB3FORMS_ACCESS_KEY set — logging instead of sending.\n" +
        rows.map(([k, v]) => `  ${k}: ${v}`).join("\n") +
        `\n  Message: ${data.message}`,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const to = process.env.INQUIRY_TO || site.contact.email;
  const from = process.env.INQUIRY_FROM || `${site.name} <onboarding@resend.dev>`;

  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6d6862;font:13px system-ui">${k}</td><td style="padding:6px 0;color:#101015;font:14px system-ui">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  try {
    const notify = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New ${data.service} inquiry from ${data.name}${data.date ? ` (${data.date})` : ""}`,
      html: `
        <div style="max-width:560px;margin:0 auto;font:14px system-ui;color:#101015">
          <p style="font:600 18px system-ui;margin:0 0 20px">New booking inquiry</p>
          <table style="border-collapse:collapse;width:100%">${table}</table>
          <p style="margin:24px 0 6px;color:#6d6862;font:13px system-ui">Message</p>
          <p style="white-space:pre-wrap;line-height:1.6;margin:0;padding:16px;background:#f5f3f0">${escapeHtml(
            data.message,
          )}</p>
          <p style="margin-top:24px"><a href="mailto:${escapeHtml(data.email)}" style="color:#c2340f">Reply to ${escapeHtml(data.name)}</a></p>
        </div>`,
    });

    if (notify.error) throw new Error(notify.error.message);

    // Client confirmation. Failure here must not fail the submission —
    // the inquiry is already safely in the inbox.
    try {
      await resend.emails.send({
        from,
        to: data.email,
        replyTo: to,
        subject: `Got it · ${site.name}`,
        html: `
          <div style="max-width:520px;margin:0 auto;font:15px/1.65 system-ui;color:#101015">
            <p style="font:600 20px system-ui;margin:0 0 20px">Thanks, ${escapeHtml(data.name)}.</p>
            <p style="margin:0 0 16px">Your ${escapeHtml(data.service)} inquiry has landed${
              data.date ? ` for <strong>${escapeHtml(data.date)}</strong>` : ""
            }. ${site.contact.responseTime}</p>
            <p style="margin:0 0 16px">If it's urgent, reply straight to this email or call ${escapeHtml(
              site.contact.phone,
            )}.</p>
            <p style="margin:28px 0 0;color:#6d6862;font-size:13px">${site.name} · ${site.tagline}</p>
          </div>`,
      });
    } catch (err) {
      console.error("[inquire] confirmation email failed", err);
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[inquire] send failed", err);
    return NextResponse.json(
      { error: `Something broke on my end. Email me directly at ${site.contact.email}.` },
      { status: 502 },
    );
  }
}
