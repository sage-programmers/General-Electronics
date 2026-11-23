export type DocItem = { description: string; quantity: number; unit_price: number }
export type Doc = {
  id: string; type: 'quote' | 'receipt'; doc_number: string
  client_name: string; client_email: string | null; client_phone: string | null
  tax_rate: number; notes: string | null; created_at: string; items: DocItem[]
}

export function totals(items: DocItem[], taxRate: number) {
  const subtotal = items.reduce((s, i) => s + Number(i.quantity) * Number(i.unit_price), 0)
  const tax = (subtotal * Number(taxRate)) / 100
  return { subtotal, tax, total: subtotal + tax }
}

export const kes = (n: number) =>
  'KES ' + new Intl.NumberFormat('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadDoc(supabase: any, id: string): Promise<Doc | null> {
  const { data: doc } = await supabase.from('documents').select('*').eq('id', id).single()
  if (!doc) return null
  const { data: items } = await supabase.from('document_items').select('description, quantity, unit_price').eq('document_id', id)
  return { ...doc, items: items ?? [] } as Doc
}
