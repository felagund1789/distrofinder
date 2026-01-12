import type { Distro } from '../types'
import './DistroCard.css'

interface Props {
  distro: Distro
}

export default function DistroCard({ distro }: Props) {
  const logo = (() => {
    if (distro.localPaths?.logo) {
      const normalized = distro.localPaths?.logo.replace(/\\\\|\\/g, '/')
      return normalized.startsWith('/') ? normalized : `/${normalized}`
    }
    return distro.logo || ''
  })()

  return (
    <article className="card">
      <div className="thumb-container">
        <img src={logo} alt={`${distro.name} logo`} className="thumb" loading="lazy" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{distro.name}</h3>
        <p className="card-meta">{distro.origin || '—'} • {distro.desktop || '—'}</p>
      </div>
    </article>
  )
}
