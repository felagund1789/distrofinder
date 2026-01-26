import { useNavigate } from "react-router-dom";
import "../../styles/distro-card.css";
import type { Distro } from "../../types/distro";
import { getCategoryLabel } from "../../utils/categories";
import StatusBadge from "../ui/StatusBadge";
import Tag from "../ui/Tag";

interface DistroCardProps {
  distro: Distro;
  selected?: boolean;
  selectionDisabled?: boolean;
  onToggleSelect?: (slug: string) => void;
}

export default function DistroCard({
  distro,
  selected,
  selectionDisabled,
  onToggleSelect,
}: DistroCardProps) {
  const navigate = useNavigate();

  return (
    <article
      className="distro-card"
      data-selected={selected}
      onClick={() => navigate(`/d/${distro.slug}`)}
    >
      <div className="distro-card__select">
        <button
          type="button"
          className="distro-card__select-btn"
          aria-pressed={selected}
          disabled={selectionDisabled && !selected}
          title={
            selected
              ? "Remove from distros selected for comparison"
              : "Add to distros selected for comparison"
          }
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect?.(distro.slug);
          }}
        >
          {selected ? "✓" : "+"}
        </button>
      </div>

      {distro.localPaths?.thumbnail && (
        <img
          src={distro.localPaths?.thumbnail}
          alt={`${distro.name} thumbnail`}
          className="distro-card__thumbnail"
        />
      )}

      <h2>{distro.name}</h2>
      <p className="muted">{distro.basedOn}</p>
      <p className="clamp">{distro.description}</p>

      <div className="meta">
        {(distro.defaultDesktop || distro.desktop)?.split(",").map((d) => (
          <Tag key={d} label={d.trim()} />
        ))}
        {distro.category?.split(",").map((a) => (
          <Tag key={a} label={getCategoryLabel(a.trim())} variant="subtle" />
        ))}
      </div>

      <div className="meta">
        <StatusBadge status={distro.status} />
      </div>
    </article>
  );
}
