import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { requireAdmin } from '@/lib/auth'
import { loadDoc } from '@/lib/documents'
import DocumentPDF from '@/lib/pdf'

export const runtime = 'nodejs'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin()
  if (!admin) return new NextResponse('Not allowed', { status: 401 })
  const { id } = await params
  const doc = await loadDoc(admin.supabase, id)
  if (!doc) return new NextResponse('Not found', { status: 404 })
  const buf = await renderToBuffer(<DocumentPDF doc={doc} />)
  const download = new URL(req.url).searchParams.get('download') === '1'
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${doc.doc_number}.pdf"`,
    },
  })
}
