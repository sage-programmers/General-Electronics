'use client'
import { useState } from 'react'

export default function EmailButton({ id, email }: { id: string; email: string | null }) {
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  async function send() {
    setBusy(true); setMsg('')
    const res = await fetch(`/api/documents/${id}/email`, { method: 'POST' })
    const data = await res.json().catch(() => ({}))
    setMsg(res.ok ? `Sent to ${email}` : data.error || 'Could not send.')
    setBusy(false)
  }
  return (
    <div>
      <button onClick={send} disabled={busy || !email} className="rounded-md bg-volt px-5 py-2 font-semibold text-white disabled:opacity-40">
        {busy ? 'Sending…' : 'Email to client'}
      </button>
      {!email && <p className="mt-1 text-sm text-ink/60">No client email saved on this document.</p>}
      {msg && <p className="mt-1 text-sm">{msg}</p>}
    </div>
  )
}
