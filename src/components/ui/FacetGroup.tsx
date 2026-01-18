import { FacetTag } from "./FacetTag";

export interface FacetGroupProps {
  label: string;
  facets: readonly {
    value: string;
    count: number;
  }[];
  activeValue?: string;
  onChange: (value: string | undefined) => void;
}

export function FacetGroup({
  label,
  facets,
  activeValue,
  onChange,
}: FacetGroupProps) {
  return (
    <section className="facet-group" aria-labelledby={`facet-${label}`}>
      <h3 id={`facet-${label}`} className="facet-group__label">
        {label}
      </h3>

      <div className="facet-group__tags">
        {facets.map(({ value, count }) => {
          const isActive = value === activeValue;
          const isDisabled = count === 0 && !isActive;

          return (
            <FacetTag
              key={value}
              label={value}
              count={count}
              active={isActive}
              disabled={isDisabled}
              onToggle={() => onChange(isActive ? undefined : value)}
            />
          );
        })}
      </div>
    </section>
  );
}
