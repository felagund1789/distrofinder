import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDistros } from "../../context/DistroContext";
import type { DistroFilters } from "../../data/distroService";
import { useDebouncedValue } from "../../hooks/useDebouncedSearch";
import {
  filtersFromSearchParams,
  filtersToSearchParams,
} from "../../utils/filters";
import DistroCard from "./DistroCard";

const DEFAULT_FILTERS: DistroFilters = {
  search: "",
  status: undefined,
  desktop: undefined,
  category: undefined,
};

const DESKTOP_OPTIONS = [
  'Cinnamon',
  'GNOME',
  'KDE',
  'Xfce',
  'MATE',
  'LXQt',
  'LXDE'
];

const CATEGORY_OPTIONS = [
  'Beginners',
  'Desktop',
  'Server',
  'Live Medium',
  'Minimal',
  'Security'
];


export default function DistroGrid() {
  const { search } = useDistros();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<DistroFilters>(() =>
    filtersFromSearchParams(searchParams)
  );

  /* debounce only the search text */
  const debouncedSearch = useDebouncedValue(filters.search ?? "", 300);

  /* Keep URL in sync when filters change */
  useEffect(() => {
    setSearchParams(
      filtersToSearchParams({
        ...filters,
        search: debouncedSearch || undefined,
      }),
      { replace: true }
    );
  }, [filters, debouncedSearch, setSearchParams]);

  const distros = search({
    ...filters,
    search: debouncedSearch.trim() || undefined,
  });

  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.status) ||
    Boolean(filters.desktop) ||
    Boolean(filters.category);

  return (
    <>
      <section className="filters">
        <input
          type="search"
          placeholder="Search distributions…"
          value={filters.search ?? ""}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />

        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              status: e.target.value || undefined,
            }))
          }
        >
          <option value="">All statuses</option>
          <option value="Active">Active</option>
          <option value="Dormant">Dormant</option>
          <option value="Discontinued">Discontinued</option>
        </select>

        <select
          value={filters.desktop ?? ""}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              desktop: e.target.value || undefined,
            }))
          }
        >
          <option value="">All desktops</option>
          {DESKTOP_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={filters.category ?? ""}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              category: e.target.value || undefined,
            }))
          }
        >
          <option value="">All categories</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            className="filter-clear"
            onClick={() => setFilters(DEFAULT_FILTERS)}
          >
            Clear filters
          </button>
        )}
      </section>

      <section className="grid">
        {distros.map((distro) => (
          <DistroCard key={distro.slug} distro={distro} />
        ))}
      </section>
    </>
  );
}
