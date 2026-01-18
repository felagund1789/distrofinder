import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDistros } from "../../context/DistroContext";
import type { DistroFilters } from "../../data/distroService";
import {
  filtersFromSearchParams,
  filtersToSearchParams,
} from "../../utils/filters";
import DistroCard from "./DistroCard";

export default function DistroGrid() {
  const { search } = useDistros();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<DistroFilters>(() =>
    filtersFromSearchParams(searchParams)
  );

  /* Keep URL in sync when filters change */
  useEffect(() => {
    setSearchParams(filtersToSearchParams(filters), { replace: true });
  }, [filters, setSearchParams]);

  const distros = search({
    ...filters,
    search: filters.search?.trim() || undefined,
  });

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
      </section>

      <section className="grid">
        {distros.map((distro) => (
          <DistroCard key={distro.slug} distro={distro} />
        ))}
      </section>
    </>
  );
}
