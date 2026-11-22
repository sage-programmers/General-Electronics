import ContactForm from '@/components/ContactForm'
import { site } from '@/lib/site'
export const metadata = { title: 'Contact Us' }
export default function Contact() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
      <div className="grid gap-10 lg:grid-cols-2">
        <ContactForm />
        <div>
          <p>{site.address}</p><p>{site.phone}</p><p>{site.email}</p>
          <iframe title="Shop location" src={site.mapEmbed} loading="lazy" className="mt-4 h-72 w-full rounded-lg border-0" />
        </div>
      </div>
    </main>
  )
}
