import Link from 'next/link'
import DocumentForm from '@/components/DocumentForm'

export default async function NewDocument({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/admin" className="text-sm underline">← Back to dashboard</Link>
      <h1 className="mb-6 mt-2 text-2xl font-bold">New document</h1>
      <DocumentForm initialType={type === 'receipt' ? 'receipt' : 'quote'} />
    </main>
  )
}
