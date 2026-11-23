import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderToBuffer } from '@react-pdf/renderer'
import { requireAdmin } from '@/lib/auth'
import { loadDoc } from '@/lib/documents'
import DocumentPDF from '@/lib/pdf'
import { site } from '@/lib/site'

export const runtime = 'nodejs'

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Not allowed' }, { status: 401 })
  const { id } = await params
  const doc = await loadDoc(admin.supabase, id)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!doc.client_email) return NextResponse.json({ error: 'This document has no client email.' }, { status: 400 })
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: 'Email is not set up yet (RESEND_API_KEY missing).' }, { status: 500 })

  const buf = await renderToBuffer(<DocumentPDF doc={doc} />)
  const label = doc.type === 'quote' ? 'quotation' : 'receipt'
  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: process.env.RESEND_FROM || `${site.name} <onboarding@resend.dev>`,
    to: doc.client_email,
    subject: `Your ${label} ${doc.doc_number} from ${site.name}`,
    text: `Hello ${doc.client_name},\n\nPlease find your ${label} ${doc.doc_number} attached.\n\nThank you,\n${site.name}\n${site.phone}`,
    attachments: [{ filename: `${doc.doc_number}.pdf`, content: buf }],
  })
  if (error) return NextResponse.json({ error: 'Email could not be sent. Check the Resend settings.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
