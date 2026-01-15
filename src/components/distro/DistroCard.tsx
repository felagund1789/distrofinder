import type { Distro } from "../../types/distro";

interface Props {
  distro: Distro;
}

export default function DistroCard({ distro }: Props) {
  return (
    <article className="card">
      <img
        src={distro.localPaths.thumbnail}
        alt={`${distro.name} logo`}
        className="card-logo"
      />
      <h2>{distro.name}</h2>
      <p className="muted">{distro.basedOn}</p>
      <p className="clamp">{distro.description}</p>
      <div className="meta">
        <span>{distro.desktop}</span>
        <span>{distro.architecture}</span>
      </div>
      <span className={`status ${distro.status.toLowerCase()}`}>
        {distro.status}
      </span>
    </article>
  );
}
