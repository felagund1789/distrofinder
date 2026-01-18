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
import { FacetGroup } from "../ui/FacetGroup";

const DEFAULT_FILTERS: DistroFilters = {
  search: "",
  status: undefined,
  desktop: undefined,
  category: undefined,
};

export default function DistroGrid() {
  const { search, desktopFacets, categoryFacets } = useDistros();
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

  const desktopOptions = desktopFacets({
    ...filters,
    search: debouncedSearch,
  });

  const categoryOptions = categoryFacets({
    ...filters,
    search: debouncedSearch,
  });

  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.status) ||
    Boolean(filters.desktop) ||
    Boolean(filters.category);

  return (
    <div className="page-layout">
      <aside className="filters">
        <input
          type="search"
          placeholder="Search distributions…"
          value={filters.search ?? ""}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />

        {hasActiveFilters && (
          <button
            type="button"
            className="filter-clear"
            onClick={() => setFilters(DEFAULT_FILTERS)}
          >
            Clear filters
          </button>
        )}

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

        <FacetGroup
          facets={desktopOptions}
          label="Desktop Environment"
          activeValue={filters.desktop}
          onChange={(value) => setFilters((f) => ({ ...f, desktop: value }))}
        />

        <FacetGroup
          facets={categoryOptions}
          label="Category"
          activeValue={filters.category}
          onChange={(value) => setFilters((f) => ({ ...f, category: value }))}
        />
      </aside>

      <main className="results">
        {distros.map((distro) => (
          <DistroCard key={distro.slug} distro={distro} />
        ))}
      </main>
    </div>
  );
}
