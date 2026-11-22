'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email: String(f.get('email')), password: String(f.get('password')),
    })
    if (error) return setError('Wrong email or password.')
    router.push('/admin'); router.refresh()
  }

  const input = 'w-full rounded-md border border-ink/20 bg-white px-3 py-2'
  return (
    <main className="mx-auto max-w-sm px-4 py-20">
      <h1 className="mb-6 text-2xl font-bold">Admin sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" className={input} />
        <input name="password" type="password" required placeholder="Password" className={input} />
        <button className="w-full rounded-md bg-ink px-5 py-2 font-semibold text-white">Sign in</button>
        {error && <p className="text-red-700">{error}</p>}
      </form>
    </main>
  )
}
