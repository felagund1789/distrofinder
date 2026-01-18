import { useState } from "react";
import { useDistros } from "../../context/DistroContext";
import type { DistroFilters } from "../../data/distroService";
import DistroCard from "./DistroCard";

export default function DistroGrid() {
  const { search } = useDistros();

  const [filters, setFilters] = useState<DistroFilters>({
    search: '',
    status: undefined
  });

  const distros = search({
    ...filters,
    search: filters.search?.trim() || undefined
  });

  return (
    <>
      <section className="filters">
        <input
          type="search"
          placeholder="Search distributions…"
          value={filters.search ?? ''}
          onChange={e =>
            setFilters(f => ({ ...f, search: e.target.value }))
          }
        />

        <select
          value={filters.status ?? ''}
          onChange={e =>
            setFilters(f => ({
              ...f,
              status: e.target.value || undefined
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
        {distros.map(distro => (
          <DistroCard key={distro.slug} distro={distro} />
        ))}
      </section>
    </>
  );
}
