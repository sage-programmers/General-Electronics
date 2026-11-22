import Link from 'next/link'
import { site } from '@/lib/site'

const links = [['Home', '/'], ['About', '/about'], ['Products & Services', '/products'], ['Contact', '/contact']]

export default function Header() {
  return (
    <header className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">{site.name}</Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="py-1 hover:text-amber">{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
