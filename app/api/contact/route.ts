import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { CONTACT_TO } from '../../../lib/constants'

export async function POST(request: Request) {
  const { name, email, message } = await request.json()
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || '')
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: CONTACT_TO,
      replyTo: email,
      subject: `New message from ${name}`,
      text: String(message)
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
