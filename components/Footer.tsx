import { site } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-sm text-white/80">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div><p className="font-semibold text-white">{site.name}</p><p className="mt-2">{site.tagline}</p></div>
        <div><p className="font-semibold text-white">Visit us</p><p className="mt-2">{site.address}</p><p>{site.hours}</p></div>
        <div>
          <p className="font-semibold text-white">Get in touch</p>
          <p className="mt-2">{site.phone}</p><p>{site.email}</p>
          <p className="mt-2 flex gap-4">
            {Object.entries(site.socials).map(([n, h]) => <a key={n} href={h} className="underline hover:text-amber">{n}</a>)}
          </p>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  )
}
