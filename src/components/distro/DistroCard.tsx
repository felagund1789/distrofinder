import type { Distro } from "../../types/distro";
import StatusBadge from "../ui/StatusBadge";
import Tag from "../ui/Tag";

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
        {distro.desktop?.split(",").map((d) => (
          <Tag key={d} label={d.trim()} />
        ))}
        {distro.architecture?.split(",").map((a) => (
          <Tag key={a} label={a.trim()} variant="subtle" />
        ))}
      </div>

      <StatusBadge status={distro.status} />
    </article>
  );
}
