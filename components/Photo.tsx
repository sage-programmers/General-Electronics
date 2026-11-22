import fs from 'fs'
import path from 'path'

// Shows /public/images/<name>.(jpg|jpeg|png|webp) if it exists, else a designed placeholder.
export default function Photo({ name, alt, className = '', label, fallback }: {
  name: string; alt: string; className?: string; label?: string; fallback?: React.ReactNode
}) {
  const ext = ['jpg', 'jpeg', 'png', 'webp'].find((e) =>
    fs.existsSync(path.join(process.cwd(), 'public', 'images', `${name}.${e}`)))
  if (ext) return <img src={`/images/${name}.${ext}`} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  return (
    <div role="img" aria-label={alt} className={`grid place-items-center overflow-hidden bg-ink ${className}`}
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '22px 22px' }}>
      {fallback ?? <span className="font-display px-3 text-center text-2xl font-bold text-white/45">{label ?? alt}</span>}
    </div>
  )
}
