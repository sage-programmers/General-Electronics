'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    })
    if (res.ok) { setStatus('done'); form.reset() } else setStatus('error')
  }

  const input = 'w-full rounded-md border border-ink/20 bg-white px-3 py-2'
  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <input name="full_name" required placeholder="Full name" className={input} />
      <input name="email_or_phone" required placeholder="Email or phone number" className={input} />
      <input name="subject" placeholder="Subject" className={input} />
      <textarea name="message" required rows={5} placeholder="How can we help?" className={input} />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button disabled={status === 'sending'} className="rounded-md bg-volt px-5 py-2 font-semibold text-white hover:bg-volt-dark disabled:opacity-50">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'done' && <p className="text-volt-dark">Message sent. We will reply soon.</p>}
      {status === 'error' && <p className="text-red-700">Message not sent. Check your details and try again.</p>}
    </form>
  )
}
