import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'portfolio@example.com',
      to: process.env.CONTACT_TO ?? 'natul0636@natul.com',
      subject: `Message from ${name}`,
      replyTo: email,
      text: message
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
