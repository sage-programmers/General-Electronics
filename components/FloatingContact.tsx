import { site, whatsappLink } from '@/lib/site'

export default function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-lg md:hidden">Call us</a>
      <a href={whatsappLink()} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-ink shadow-lg hover:brightness-95">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.8-.1 1.4Z"/></svg>
        Chat on WhatsApp
      </a>
    </div>
  )
}
