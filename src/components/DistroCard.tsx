import type { Distro } from '../types'
import './DistroCard.css'

interface Props {
  distro: Distro
}

export default function DistroCard({ distro }: Props) {
  const local = distro.localPaths?.thumbnail || distro.localPaths?.screenshot || distro.localPaths?.logo
  const thumb = (() => {
    if (local) {
      const normalized = local.replace(/\\\\|\\/g, '/')
      return normalized.startsWith('/') ? normalized : `/${normalized}`
    }
    return distro.thumbnail || distro.screenshot || distro.logo || ''
  })()

  return (
    <article className="card">
      <div className="card-row">
        <img src={thumb} alt={`${distro.name} logo`} className="thumb" loading="lazy" />
        <div style={{flex:1}}>
          <h3 className="card-title">{distro.name}</h3>
          <p className="card-meta">{distro.origin || '—'} • {distro.desktop || '—'}</p>
        </div>
      </div>
      <p className="card-desc">{distro.description}</p>
    </article>
  )
}
