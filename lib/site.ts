// EDIT THIS FILE to personalise the whole website.
export const site = {
  name: 'Premier Electronics',
  tagline: 'Shop Smart. Live Better.',
  intro: 'Phones, televisions, computers, solar power and professional repairs, all under one roof.',
  phone: '+254 700 000 000',
  kraPin: '', // shown on quotes and receipts if filled, e.g. 'P051234567X'
  whatsapp: '254700000000', // digits only, with country code, no + sign
  email: 'info@example.com',
  address: 'Main Street, Kisii, Kenya',
  hours: 'Mon–Sat 8:00am – 6:30pm',
  mapEmbed: 'https://www.google.com/maps?q=Kisii,Kenya&output=embed',
  socials: { Facebook: '#', Instagram: '#', TikTok: '#' },
  trust: [
    { title: 'Genuine products', text: 'Sourced from trusted suppliers' },
    { title: 'Expert support', text: 'Advice and help after you buy' },
    { title: 'Great prices', text: 'Fair pricing with a receipt every time' },
    { title: 'Trusted partner', text: 'Retail, repairs and wholesale' },
  ],
  // Photo names: put a file called e.g. phones.jpg in /public/images and it appears automatically.
  categories: [
    { name: 'Phones & Tablets', photo: 'phones', text: 'New handsets, chargers, cases and screen guards.' },
    { name: 'Televisions', photo: 'tvs', text: 'Smart TVs, home theatre, speakers and decoders.' },
    { name: 'Computers', photo: 'computers', text: 'Laptops, printers, storage and networking.' },
    { name: 'Solar Power', photo: 'power', text: 'Solar panels, inverters, batteries and clean backup power.' },
    { name: 'Repairs', photo: 'repairs', text: 'Diagnosis and repair for phones, TVs and small appliances.' },
    { name: 'Wholesale & Supply', photo: 'wholesale', text: 'Bulk orders for resellers, schools and offices.' },
  ],
  why: [
    { title: 'Genuine, tested stock', text: 'We check every item before it goes on the shelf, so you take home something that works.' },
    { title: 'Prices you can compare', text: 'Fair pricing with a written quote or receipt every time.' },
    { title: 'Help after you buy', text: 'Setup, advice and warranty support from the people who sold it to you.' },
  ],
  steps: [
    { title: 'Bring it in', text: 'Walk in or send photos on WhatsApp.' },
    { title: 'Get a quote', text: 'We diagnose it and tell you the cost before any work starts.' },
    { title: 'Collect it fixed', text: 'We call you when it is ready, with a receipt and a warranty.' },
  ],
  // Add REAL customer reviews only. The reviews section stays hidden while this list is empty.
  reviews: [] as { name: string; text: string }[],
}

export const whatsappLink = (msg = 'Hello, I would like to ask about a product.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
