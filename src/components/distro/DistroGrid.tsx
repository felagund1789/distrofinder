import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDistros } from "../../context/DistroContext";
import type {
  DistroFilters,
  SortByType,
  SortDirType,
} from "../../data/distroService";
import { useDebouncedValue } from "../../hooks/useDebouncedSearch";
import {
  filtersFromSearchParams,
  filtersToSearchParams,
} from "../../utils/filters";
import { CompareFAB } from "../compare/CompareFAB";
import DistroWizardCallout from "../wizard/DistroWizardCallout";
import DistroCard from "./DistroCard";

const DEFAULT_FILTERS: DistroFilters = {
  search: "",
  status: undefined,
  desktop: undefined,
  category: undefined,
  sortBy: "popularity" as SortByType,
  sortDir: "asc" as SortDirType,
};

export default function DistroGrid() {
  const [selected, setSelected] = useState<string[]>([]);
  const { search, desktopFacets, categoryFacets, baseDistroFacets } =
    useDistros();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<DistroFilters>(() =>
    filtersFromSearchParams(searchParams)
  );

  const toggleSelection = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < 3
          ? [...prev, slug]
          : prev
    );
  };

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

  const baseDistroOptions = baseDistroFacets({
    ...filters,
    search: debouncedSearch,
  });

  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.status) ||
    Boolean(filters.desktop) ||
    Boolean(filters.category) ||
    Boolean(filters.basedOn);

  return (
    <>
      <DistroWizardCallout />

      <section className="filters">
        <input
          type="search"
          placeholder="Search distributions…"
          value={filters.search ?? ""}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />
        {/* 
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
        </select> */}

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
          {desktopOptions.map(({ value, count }) => (
            <option key={value} value={value}>
              {value} ({count})
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
          {categoryOptions.map(({ value, count }) => (
            <option key={value} value={value}>
              {value} ({count})
            </option>
          ))}
        </select>

        <select
          value={filters.basedOn ?? ""}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              basedOn: e.target.value || undefined,
            }))
          }
        >
          <option value="">All base distros</option>
          {baseDistroOptions.map(({ value, count }) => (
            <option key={value} value={value}>
              {value} ({count})
            </option>
          ))}
        </select>

        <div className="filter-separator" />

        <select
          value={`${filters.sortBy ?? "popularity"}.${filters.sortDir ?? "asc"}`}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              sortBy:
                (e.target.value.split(".")[0] as SortByType) || "popularity",
              sortDir: (e.target.value.split(".")[1] as SortDirType) || "asc",
            }))
          }
        >
          <option value="name.asc">Sort by Name ↑</option>
          <option value="name.desc">Sort by Name ↓</option>
          <option value="lastUpdate.asc">Sort by Last updated ↑</option>
          <option value="lastUpdate.desc">Sort by Last updated ↓</option>
          <option value="popularity.asc">Sort by Popularity ↑</option>
          <option value="popularity.desc">Sort by Popularity ↓</option>
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
          <DistroCard
            key={distro.slug}
            distro={distro}
            selected={selected.includes(distro.slug)}
            selectionDisabled={
              selected.length >= 3 && !selected.includes(distro.slug)
            }
            onToggleSelect={toggleSelection}
          />
        ))}
      </section>

      <CompareFAB selected={selected} />
    </>
  );
}
