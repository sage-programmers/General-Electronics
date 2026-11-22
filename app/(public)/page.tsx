import Link from 'next/link'
import { site } from '@/lib/site'

export default function Home() {
  return (
    <main>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">{site.tagline}</h1>
          <p className="mt-4 max-w-xl text-white/80">Genuine products, honest prices and repairs done right the first time.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-md bg-amber px-5 py-3 font-semibold text-ink">See what we stock</Link>
            <Link href="/contact" className="rounded-md border border-white/40 px-5 py-3 font-semibold">Ask for a quote</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold">What we sell and fix</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.categories.map((c) => (
            <div key={c.name} className="rounded-lg border-l-4 border-volt bg-white p-5">
              <h3 className="font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm text-ink/70">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
