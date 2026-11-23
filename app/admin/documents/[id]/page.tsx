import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { loadDoc, totals, kes } from '@/lib/documents'
import EmailButton from '@/components/EmailButton'

export const dynamic = 'force-dynamic'

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin()
  if (!admin) redirect('/admin/login')
  const { id } = await params
  const doc = await loadDoc(admin.supabase, id)
  if (!doc) notFound()
  const t = totals(doc.items, doc.tax_rate)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/admin" className="text-sm underline">← Back to dashboard</Link>
      <h1 className="mt-2 text-2xl font-bold">{doc.type === 'quote' ? 'Quotation' : 'Receipt'} {doc.doc_number}</h1>
      <p className="text-ink/70">{doc.client_name}{doc.client_phone ? ` · ${doc.client_phone}` : ''}{doc.client_email ? ` · ${doc.client_email}` : ''}</p>

      <div className="mt-6 flex flex-wrap items-start gap-3">
        <a href={`/api/documents/${doc.id}/pdf`} target="_blank" className="rounded-md bg-ink px-5 py-2 font-semibold text-white">View PDF</a>
        <a href={`/api/documents/${doc.id}/pdf?download=1`} className="rounded-md border border-ink/30 px-5 py-2 font-semibold">Download PDF</a>
        <EmailButton id={doc.id} email={doc.client_email} />
      </div>

      <div className="mt-8 rounded-lg bg-white p-5 ring-1 ring-ink/10">
        {doc.items.map((i, idx) => (
          <div key={idx} className="flex justify-between gap-4 border-b border-ink/10 py-2">
            <span>{i.description} <span className="text-ink/60">× {Number(i.quantity)}</span></span>
            <span>{kes(Number(i.quantity) * Number(i.unit_price))}</span>
          </div>
        ))}
        <p className="mt-3 flex justify-between"><span>Subtotal</span><span>{kes(t.subtotal)}</span></p>
        <p className="flex justify-between"><span>VAT ({Number(doc.tax_rate)}%)</span><span>{kes(t.tax)}</span></p>
        <p className="mt-1 flex justify-between border-t-2 border-ink pt-2 text-lg font-bold"><span>Total</span><span>{kes(t.total)}</span></p>
      </div>
    </main>
  )
}
