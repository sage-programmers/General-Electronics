import { site } from '@/lib/site'
export const metadata = { title: 'About Us' }
export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">About {site.name}</h1>
      <p className="mt-4 leading-7">Replace this text with the shop's story: when it opened, who runs it, and why customers keep coming back. Mention warranties, brands you stock and your repair experience.</p>
      <p className="mt-4 leading-7">Find us at {site.address}. Open {site.hours}.</p>
    </main>
  )
}
