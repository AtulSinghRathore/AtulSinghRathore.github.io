// app/api/contact/route.ts
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    // Accept JSON or Form submissions
    const ctype = req.headers.get("content-type") || "";
    let name = "";
    let email = "";
    let message = "";

    if (ctype.includes("application/json")) {
      const data: any = await req.json();
      name = (data?.name ?? "").toString();
      email = (data?.email ?? "").toString();
      message = (data?.message ?? "").toString();
    } else {
      const fd = await req.formData();
      name = String(fd.get("name") ?? "");
      email = String(fd.get("email") ?? "");
      message = String(fd.get("message") ?? "");
    }

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: (process.env.CONTACT_TO || "natul0636@gmail.com").split(","),
      // 👇 resend@6 uses camelCase:
      replyTo: email,
      subject: `New portfolio lead from ${name}`,
      text: message,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_ERR:", err);
    return Response.json({ ok: false, error: "Email send failed" }, { status: 500 });
  }
}
