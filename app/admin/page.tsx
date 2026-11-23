import Link from 'next/link'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function signOut() {
  'use server'
  await (await supabaseServer()).auth.signOut()
  redirect('/admin/login')
}

export default async function Admin() {
  const admin = await requireAdmin()
  if (!admin) redirect('/admin/login')
  const { supabase } = admin

  const { data: docs } = await supabase.from('documents').select('id, type, doc_number, client_name, created_at').order('created_at', { ascending: false }).limit(30)
  const { data: messages } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(30)

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin dashboard</h1>
        <form action={signOut}><button className="rounded-md border border-ink/30 px-4 py-1">Sign out</button></form>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/admin/documents/new?type=quote" className="rounded-md bg-ink px-5 py-3 font-semibold text-white">+ New quotation</Link>
        <Link href="/admin/documents/new?type=receipt" className="rounded-md bg-amber px-5 py-3 font-semibold text-ink">+ New receipt</Link>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Recent quotes and receipts</h2>
      <div className="mt-3 divide-y divide-ink/10 rounded-lg bg-white ring-1 ring-ink/10">
        {docs?.length ? docs.map((d) => (
          <Link key={d.id} href={`/admin/documents/${d.id}`} className="flex justify-between gap-4 px-4 py-3 hover:bg-paper">
            <span><span className="font-semibold">{d.doc_number}</span> · {d.client_name}</span>
            <span className="text-sm text-ink/60">{new Date(d.created_at).toLocaleDateString('en-GB')}</span>
          </Link>
        )) : <p className="p-4">Nothing yet. Create your first quotation above.</p>}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Contact messages</h2>
      <div className="mt-3 space-y-3">
        {messages?.length ? messages.map((m) => (
          <div key={m.id} className="rounded-lg bg-white p-4 ring-1 ring-ink/10">
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
