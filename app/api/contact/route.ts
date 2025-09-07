// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const s = (x: unknown) => (x ?? "").toString();
const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: Request) {
  try {
    // Accept JSON or form submissions
    const ctype = req.headers.get("content-type") ?? "";
    let name = "";
    let email = "";
    let message = "";

    if (ctype.includes("application/json")) {
      const data: any = await req.json();
      name = s(data?.name);
      email = s(data?.email);
      message = s(data?.message);
    } else {
      const fd = await req.formData();
      name = s(fd.get("name"));
      email = s(fd.get("email"));
      message = s(fd.get("message"));
    }

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const toList = (process.env.CONTACT_TO || "atul0636@gmail.com")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const from =
      process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

    const subject = `New portfolio lead${name ? ` from ${name}` : ""}`;
    const text = `${message}\n\nFrom: ${name || "Anonymous"} <${email}>`;
    const html = `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
<hr/>
<p>From: <strong>${escapeHtml(name || "Anonymous")}</strong>
&lt;${escapeHtml(email)}&gt;</p>`;

    // Use `any` so TypeScript accepts both reply_to (older typings) and replyTo (newer)
    const payload: any = {
      from,
      to: toList,
      subject,
      text,
      html,
      reply_to: email, // older SDK typings
      replyTo: email,  // newer SDK typings
    };

    const { data, error } = await resend.emails.send(payload);
    if (error) throw error;

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err: any) {
    console.error("CONTACT_ERR:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Email send failed" },
      { status: 500 }
    );
  }
}

// Avoid caching for this route (optional, but handy on Vercel)
export const dynamic = "force-dynamic";
