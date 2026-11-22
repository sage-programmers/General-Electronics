import { site } from '@/lib/site'
export const metadata = { title: 'Products & Services' }
export default function Products() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Products & Services</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {site.categories.map((c) => (
          <div key={c.name} className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{c.name}</h2>
            <p className="mt-2 text-ink/70">{c.text}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
