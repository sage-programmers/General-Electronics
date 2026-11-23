import { NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdmin } from '@/lib/auth'

export const runtime = 'nodejs'

const schema = z.object({
  type: z.enum(['quote', 'receipt']),
  client_name: z.string().trim().min(2).max(120),
  client_email: z.string().trim().email().or(z.literal('')).optional(),
  client_phone: z.string().trim().max(40).optional(),
  tax_rate: z.number().min(0).max(100),
  notes: z.string().trim().max(1000).optional(),
  items: z.array(z.object({
    description: z.string().trim().min(1).max(200),
    quantity: z.number().positive().max(1000000),
    unit_price: z.number().min(0).max(100000000),
  })).min(1).max(100),
})

export async function POST(req: Request) {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Not allowed' }, { status: 401 })
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Please check the form details.' }, { status: 400 })
  const d = parsed.data
  const { supabase, user } = admin

  const prefix = d.type === 'quote' ? 'QT' : 'RC'
  const { data: last } = await supabase.from('documents').select('doc_number').eq('type', d.type).order('doc_number', { ascending: false }).limit(1)
  const next = last?.[0] ? parseInt(String(last[0].doc_number).split('-')[1], 10) + 1 : 1
  const doc_number = `${prefix}-${String(next).padStart(4, '0')}`

  const { data: doc, error } = await supabase.from('documents').insert({
    type: d.type, doc_number, client_name: d.client_name,
    client_email: d.client_email || null, client_phone: d.client_phone || null,
    tax_rate: d.tax_rate, notes: d.notes || null, created_by: user.id,
  }).select('id').single()
  if (error || !doc) return NextResponse.json({ error: 'Could not save the document.' }, { status: 500 })

  const { error: itemsError } = await supabase.from('document_items').insert(d.items.map((i) => ({ ...i, document_id: doc.id })))
  if (itemsError) {
    await supabase.from('documents').delete().eq('id', doc.id)
    return NextResponse.json({ error: 'Could not save the items.' }, { status: 500 })
  }
  return NextResponse.json({ id: doc.id })
}
