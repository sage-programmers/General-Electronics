import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { site } from '@/lib/site'
import { Doc, kes, totals } from '@/lib/documents'

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', color: '#0b1f5b' },
  top: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  shop: { fontSize: 20, fontFamily: 'Helvetica-Bold' },
  muted: { color: '#555', marginTop: 2 },
  title: { fontSize: 20, fontFamily: 'Helvetica-Bold', textAlign: 'right', color: '#1d4fd8' },
  bill: { marginBottom: 20 },
  label: { fontSize: 8, color: '#777', marginBottom: 2 },
  head: { flexDirection: 'row', backgroundColor: '#0b1f5b', color: '#fff', padding: 6, fontFamily: 'Helvetica-Bold' },
  row: { flexDirection: 'row', padding: 6, borderBottom: '1pt solid #e3e7f0' },
  c1: { flex: 4 }, c2: { flex: 1, textAlign: 'right' }, c3: { flex: 2, textAlign: 'right' }, c4: { flex: 2, textAlign: 'right' },
  totals: { marginTop: 14, alignSelf: 'flex-end', width: 220 },
  tRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  grand: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderTop: '2pt solid #0b1f5b', fontFamily: 'Helvetica-Bold', fontSize: 12 },
  notes: { marginTop: 24 },
  foot: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', color: '#777', fontSize: 9 },
})

export default function DocumentPDF({ doc }: { doc: Doc }) {
  const t = totals(doc.items, doc.tax_rate)
  const isQuote = doc.type === 'quote'
  return (
    <Document title={`${doc.doc_number} - ${site.name}`}>
      <Page size="A4" style={s.page}>
        <View style={s.top}>
          <View>
            <Text style={s.shop}>{site.name}</Text>
            <Text style={s.muted}>{site.address}</Text>
            <Text style={s.muted}>{site.phone} | {site.email}</Text>
            {site.kraPin ? <Text style={s.muted}>PIN: {site.kraPin}</Text> : null}
          </View>
          <View>
            <Text style={s.title}>{isQuote ? 'QUOTATION' : 'RECEIPT'}</Text>
            <Text style={{ textAlign: 'right', marginTop: 4 }}>No: {doc.doc_number}</Text>
            <Text style={{ textAlign: 'right' }}>Date: {new Date(doc.created_at).toLocaleDateString('en-GB')}</Text>
          </View>
        </View>

        <View style={s.bill}>
          <Text style={s.label}>{isQuote ? 'QUOTED TO' : 'RECEIVED FROM'}</Text>
          <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 12 }}>{doc.client_name}</Text>
          {doc.client_phone ? <Text style={s.muted}>{doc.client_phone}</Text> : null}
          {doc.client_email ? <Text style={s.muted}>{doc.client_email}</Text> : null}
        </View>

        <View style={s.head}>
          <Text style={s.c1}>Description</Text><Text style={s.c2}>Qty</Text>
          <Text style={s.c3}>Unit price</Text><Text style={s.c4}>Amount</Text>
        </View>
        {doc.items.map((i, idx) => (
          <View key={idx} style={s.row} wrap={false}>
            <Text style={s.c1}>{i.description}</Text>
            <Text style={s.c2}>{Number(i.quantity)}</Text>
            <Text style={s.c3}>{kes(Number(i.unit_price))}</Text>
            <Text style={s.c4}>{kes(Number(i.quantity) * Number(i.unit_price))}</Text>
          </View>
        ))}

        <View style={s.totals}>
          <View style={s.tRow}><Text>Subtotal</Text><Text>{kes(t.subtotal)}</Text></View>
          <View style={s.tRow}><Text>VAT ({Number(doc.tax_rate)}%)</Text><Text>{kes(t.tax)}</Text></View>
          <View style={s.grand}><Text>TOTAL</Text><Text>{kes(t.total)}</Text></View>
        </View>

        {doc.notes ? <View style={s.notes}><Text style={s.label}>NOTES</Text><Text>{doc.notes}</Text></View> : null}
        {isQuote ? <Text style={{ marginTop: 12, color: '#555' }}>This quotation is valid for 14 days from the date above.</Text> : null}
        <Text style={s.foot}>Thank you for choosing {site.name}. {site.tagline}</Text>
      </Page>
    </Document>
  )
}
