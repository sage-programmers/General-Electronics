import './globals.css'
import type { Metadata } from 'next'
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google'
import { site } from '@/lib/site'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800'] })
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body' })

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: `${site.name} | Electronics Shop`, template: `%s | ${site.name}` },
  description: `${site.tagline} ${site.intro}`,
  openGraph: { title: site.name, description: site.tagline, type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'ElectronicsStore',
    name: site.name, telephone: site.phone, email: site.email,
    address: site.address, openingHours: site.hours,
  }
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
