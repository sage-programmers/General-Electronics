import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function signOut() {
  'use server'
  await (await supabaseServer()).auth.signOut()
  redirect('/admin/login')
}

export default async function Admin() {
  const supabase = await supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/admin/login')

  const { data: messages } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(50)

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin dashboard</h1>
        <form action={signOut}><button className="rounded-md border border-ink/30 px-4 py-1">Sign out</button></form>
      </div>
      <p className="mt-2 text-ink/70">Quotes and receipts will appear here once the generator is added.</p>
      <h2 className="mt-8 text-lg font-semibold">Contact messages</h2>
      <div className="mt-3 space-y-3">
        {messages?.length ? messages.map((m) => (
          <div key={m.id} className="rounded-lg bg-white p-4">
            <p className="font-semibold">{m.full_name} <span className="font-normal text-ink/60">({m.email_or_phone})</span></p>
            {m.subject && <p className="text-sm">{m.subject}</p>}
            <p className="mt-1 whitespace-pre-wrap">{m.message}</p>
            <p className="mt-1 text-xs text-ink/50">{new Date(m.created_at).toLocaleString()}</p>
          </div>
        )) : <p>No messages yet.</p>}
      </div>
    </main>
  )
}
