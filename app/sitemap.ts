export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return ['', '/about', '/products', '/contact'].map((p) => ({ url: base + p }))
}
