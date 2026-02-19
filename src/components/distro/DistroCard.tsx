import "../../styles/distro-card.css";
import type { Distro } from "../../types/distro";
import { getCategoryLabel } from "../../utils/categories";
import StatusBadge from "../ui/StatusBadge";
import Tag from "../ui/Tag";
import ExpandableTagList from "../ui/ExpandableTagList";
import { IMAGE_BASE_URL } from "../../congig";

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
  return (
    <article className="distro-card" data-selected={selected}>
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
            e.preventDefault();
            onToggleSelect?.(distro.slug);
          }}
        >
          {selected ? "✓" : "+"}
        </button>
      </div>

      {distro.localPaths?.thumbnail && (
        <img
          src={`${IMAGE_BASE_URL}/${distro.localPaths?.thumbnail}`}
          alt={`${distro.name} thumbnail`}
          className="distro-card__thumbnail"
        />
      )}

      <h2>{distro.name}</h2>
      <p className="muted">{distro.basedOn}</p>
      <p className="clamp">{distro.description}</p>

      <div className="meta">
        {distro.desktop && (
          <ExpandableTagList
            tags={distro.desktop.split(",").map((s) => s.trim())}
            maxVisible={5}
            tagName="desktop"
          />
        )}
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
