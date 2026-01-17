// src/data/distros.ts
import rawData from "./distros.json";
import type { Distro } from "../types/distro";

const distros = rawData as Distro[];

export function getAllDistros(): readonly Distro[] {
  return distros;
}

export function getDistroBySlug(slug: string): Distro | undefined {
  return distros.find((d) => d.slug === slug);
}

/* ---------- selectors ---------- */

export interface DistroFilters {
  search?: string;
  status?: Distro["status"];
  desktop?: string;
  category?: string;
  basedOn?: string;
}

export function filterDistros(filters: DistroFilters = {}): readonly Distro[] {
  const { search, status, desktop, category, basedOn } = filters;

  return distros.filter((d) => {
    if (status && d.status !== status) return false;
    if (desktop && !d.desktop?.includes(desktop)) return false;
    if (category && !d.category.includes(category)) return false;
    if (basedOn && !d.basedOn.includes(basedOn)) return false;

    if (search) {
      const q = search.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.desktop?.toLowerCase().includes(q) ||
        d.basedOn.toLowerCase().includes(q)
      );
    }

    return true;
  });
}
