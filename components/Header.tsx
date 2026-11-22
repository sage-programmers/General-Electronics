import Link from 'next/link'
import { site } from '@/lib/site'

const links = [['Home', '/'], ['About', '/about'], ['Products & Services', '/products'], ['Contact', '/contact']]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-extrabold">{site.name}</Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {links.map(([l, h]) => <Link key={h} href={h} className="py-1 hover:text-amber">{l}</Link>)}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-white/30 px-3 py-1.5 text-sm">Menu</summary>
          <nav className="absolute right-0 mt-2 flex w-56 flex-col rounded-lg bg-ink p-2 shadow-xl ring-1 ring-white/15">
            {links.map(([l, h]) => <Link key={h} href={h} className="rounded px-3 py-2 hover:bg-white/10">{l}</Link>)}
          </nav>
        </details>
      </div>
    </header>
  )
}
