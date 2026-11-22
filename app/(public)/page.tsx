import Link from 'next/link'
import Photo from '@/components/Photo'
import { site, whatsappLink } from '@/lib/site'

const circuit = (
  <svg viewBox="0 0 320 320" className="h-full w-full p-8" fill="none" aria-hidden="true">
    <rect x="95" y="30" width="130" height="260" rx="22" stroke="#fff" strokeOpacity=".7" strokeWidth="3" />
    <rect x="108" y="54" width="104" height="190" rx="8" fill="#00a58e" fillOpacity=".18" stroke="#00a58e" strokeWidth="2" />
    <path d="M125 90h40v30h30M125 150h25v40h45M165 120v30" stroke="#00a58e" strokeWidth="3" strokeLinecap="round" />
    <circle cx="195" cy="120" r="6" fill="#f5a300" /><circle cx="195" cy="190" r="6" fill="#f5a300" /><circle cx="125" cy="90" r="5" fill="#fff" />
    <rect x="145" y="262" width="30" height="6" rx="3" fill="#fff" fillOpacity=".7" />
    <path d="M30 80h45M20 150h60M35 220h40M245 100h50M245 180h60M250 240h40" stroke="#fff" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export default function Home() {
  return (
    <main>
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="hero-in">
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{site.tagline}</h1>
            <p className="mt-5 max-w-md text-lg text-white/75">{site.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener" className="rounded-md bg-amber px-6 py-3 font-bold text-ink hover:brightness-95">Chat on WhatsApp</a>
              <Link href="/products" className="rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">Browse products</Link>
            </div>
          </div>
          <Photo name="hero" alt={`${site.name} shop`} className="aspect-[4/3] w-full rounded-2xl" fallback={circuit} />
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-px px-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.trust.map((t) => (
            <div key={t.title} className="py-5 lg:px-4">
              <p className="font-display font-bold">{t.title}</p>
              <p className="text-sm text-ink/65">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold">What we sell and fix</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.categories.map((c) => (
            <Link key={c.name} href="/products" className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-ink/10 transition hover:shadow-md">
              <Photo name={c.photo} alt={c.name} label={c.name} className="h-44 w-full" />
              <div className="p-5">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-ink/70">{c.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-extrabold">Why customers come back</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {site.why.map((w) => (
              <div key={w.title} className="border-t-4 border-volt pt-4">
                <h3 className="text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-ink/70">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold">How repairs work</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {site.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="font-display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-lg font-bold text-amber">{i + 1}</span>
              <div><h3 className="font-bold">{s.title}</h3><p className="mt-1 text-ink/70">{s.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {site.reviews.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-extrabold">What customers say</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {site.reviews.map((r) => (
                <figure key={r.name} className="rounded-xl bg-paper p-6">
                  <blockquote>{r.text}</blockquote>
                  <figcaption className="mt-3 text-sm font-semibold">{r.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold">Visit the shop</h2>
            <p className="mt-4 text-white/80">{site.address}</p>
            <p className="text-white/80">{site.hours}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="rounded-md bg-amber px-5 py-3 font-bold text-ink">Call {site.phone}</a>
              <Link href="/contact" className="rounded-md border border-white/40 px-5 py-3 font-semibold">Send a message</Link>
            </div>
          </div>
          <iframe title="Shop location" src={site.mapEmbed} loading="lazy" className="h-64 w-full rounded-xl border-0" />
        </div>
      </section>
    </main>
  )
}
