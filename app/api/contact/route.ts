import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const Body = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(5)
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  const TO = process.env.CONTACT_TO ?? "natul0636@natul.com";
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    // No email provider configured; pretend success and log.
    console.log("CONTACT (dry-run):", { name, email, message });
    return NextResponse.json({ ok: true, dryRun: true });
  }

  const resend = new Resend(RESEND_API_KEY);
  await resend.emails.send({
    to: TO,
    from: "portfolio@your-domain.dev",
    subject: "Portfolio enquiry",
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  });

  return NextResponse.json({ ok: true });
}
