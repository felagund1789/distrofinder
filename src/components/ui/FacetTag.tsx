export interface FacetTagProps {
  label: string;
  count?: number;
  active?: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export function FacetTag({
  label,
  count,
  active = false,
  disabled = false,
  onToggle,
}: FacetTagProps) {
  return (
    <button
      type="button"
      className="facet-tag"
      data-active={active || undefined}
      data-disabled={disabled || undefined}
      aria-pressed={active}
      disabled={disabled}
      onClick={onToggle}
    >
      <span className="facet-tag__label">{label}</span>

      {typeof count === "number" && (
        <span className="facet-tag__count">{count}</span>
      )}
    </button>
  );
}
