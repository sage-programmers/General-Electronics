import Photo from '@/components/Photo'
import { site, whatsappLink } from '@/lib/site'
export const metadata = { title: 'Products & Services' }

export default function Products() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold">Products & Services</h1>
      <p className="mt-3 max-w-xl text-ink/70">Ask about price and availability on WhatsApp, or visit the shop.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.categories.map((c) => (
          <div key={c.name} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-ink/10">
            <Photo name={c.photo} alt={c.name} label={c.name} className="aspect-[5/2] w-full object-right" />
            <div className="p-5">
              <h2 className="text-lg font-bold">{c.name}</h2>
              <p className="mt-1 text-sm text-ink/70">{c.text}</p>
              <a href={whatsappLink(`Hello, I would like to ask about ${c.name}.`)} target="_blank" rel="noopener" className="mt-4 inline-block font-semibold text-volt-dark underline">Ask on WhatsApp</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
