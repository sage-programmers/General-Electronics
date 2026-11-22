import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email_or_phone: z.string().trim().min(5).max(100),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().optional(),
})

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid details' }, { status: 400 })
  const { website, ...data } = parsed.data
  if (website) return NextResponse.json({ ok: true })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { error } = await supabase.from('contact_messages').insert(data)
  if (error) return NextResponse.json({ error: 'Save failed' }, { status: 500 })

  try {
    if (process.env.RESEND_API_KEY && process.env.OWNER_EMAIL) {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: 'Website <onboarding@resend.dev>', // change after verifying the client's domain
        to: process.env.OWNER_EMAIL,
        subject: `New inquiry: ${data.subject || 'Website contact form'}`,
        text: `From: ${data.full_name}\nContact: ${data.email_or_phone}\n\n${data.message}`,
      })
    }
  } catch (e) { console.error('Email failed', e) }
  return NextResponse.json({ ok: true })
}
