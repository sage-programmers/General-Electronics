'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Item = { description: string; quantity: string; unit_price: string }
const num = (v: string) => parseFloat(v) || 0
const money = (n: number) => n.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function DocumentForm({ initialType }: { initialType: 'quote' | 'receipt' }) {
  const router = useRouter()
  const [type, setType] = useState<'quote' | 'receipt'>(initialType)
  const [items, setItems] = useState<Item[]>([{ description: '', quantity: '1', unit_price: '' }])
  const [tax, setTax] = useState('16')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const subtotal = items.reduce((s, i) => s + num(i.quantity) * num(i.unit_price), 0)
  const taxAmt = (subtotal * num(tax)) / 100

  const setItem = (idx: number, patch: Partial<Item>) =>
    setItems(items.map((it, i) => (i === idx ? { ...it, ...patch } : it)))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true); setError('')
    const f = new FormData(e.currentTarget)
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        client_name: String(f.get('client_name') || ''),
        client_email: String(f.get('client_email') || ''),
        client_phone: String(f.get('client_phone') || ''),
        notes: String(f.get('notes') || ''),
        tax_rate: num(tax),
        items: items.filter((i) => i.description.trim()).map((i) => ({
          description: i.description, quantity: num(i.quantity), unit_price: num(i.unit_price),
        })),
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) router.push(`/admin/documents/${data.id}`)
    else { setError(data.error || 'Something went wrong.'); setBusy(false) }
  }

  const input = 'w-full rounded-md border border-ink/20 bg-white px-3 py-2'
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex gap-2">
        {(['quote', 'receipt'] as const).map((t) => (
          <button type="button" key={t} onClick={() => setType(t)}
            className={`rounded-md px-4 py-2 font-semibold ${type === t ? 'bg-ink text-white' : 'bg-white ring-1 ring-ink/20'}`}>
            {t === 'quote' ? 'Quotation' : 'Receipt'}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <input name="client_name" required placeholder="Client name" className={input} />
        <input name="client_phone" placeholder="Client phone" className={input} />
        <input name="client_email" type="email" placeholder="Client email (to send PDF)" className={input} />
      </div>

      <div className="space-y-2">
        <div className="hidden gap-2 text-sm font-semibold sm:grid sm:grid-cols-[1fr_90px_130px_110px_36px]">
          <span>Item</span><span>Qty</span><span>Unit price (KES)</span><span className="text-right">Amount</span><span />
        </div>
        {items.map((it, idx) => (
          <div key={idx} className="grid gap-2 sm:grid-cols-[1fr_90px_130px_110px_36px] sm:items-center">
            <input value={it.description} onChange={(e) => setItem(idx, { description: e.target.value })} placeholder="Description" className={input} />
            <input value={it.quantity} onChange={(e) => setItem(idx, { quantity: e.target.value })} inputMode="decimal" placeholder="Qty" className={input} />
            <input value={it.unit_price} onChange={(e) => setItem(idx, { unit_price: e.target.value })} inputMode="decimal" placeholder="Price" className={input} />
            <span className="text-right">{money(num(it.quantity) * num(it.unit_price))}</span>
            <button type="button" aria-label="Remove item" disabled={items.length === 1}
              onClick={() => setItems(items.filter((_, i) => i !== idx))} className="text-red-700 disabled:opacity-30">✕</button>
          </div>
        ))}
        <button type="button" onClick={() => setItems([...items, { description: '', quantity: '1', unit_price: '' }])}
          className="font-semibold text-volt-dark underline">+ Add item</button>
      </div>

      <div className="ml-auto max-w-xs space-y-1">
        <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1">VAT <input value={tax} onChange={(e) => setTax(e.target.value)} inputMode="decimal" className="w-16 rounded border border-ink/20 bg-white px-2 py-1" />%</span>
          <span>{money(taxAmt)}</span>
        </div>
        <div className="flex justify-between border-t-2 border-ink pt-2 text-lg font-bold"><span>Total</span><span>KES {money(subtotal + taxAmt)}</span></div>
      </div>

      <textarea name="notes" rows={3} placeholder="Notes (payment method, warranty, delivery…)" className={input} />
      <button disabled={busy} className="rounded-md bg-ink px-6 py-3 font-semibold text-white disabled:opacity-50">
        {busy ? 'Saving…' : `Create ${type === 'quote' ? 'quotation' : 'receipt'}`}
      </button>
      {error && <p className="text-red-700">{error}</p>}
    </form>
  )
}
