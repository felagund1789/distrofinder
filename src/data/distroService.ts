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

export function getAllDesktops(): readonly string[] {
  const set = new Set<string>();

  distros.forEach((d) => {
    if (!d.desktop) return;
    splitAndNormalize(d.desktop).forEach((desktop) => set.add(desktop));
  });

  return Array.from(set).sort();
}

export function getAllCategories(): readonly string[] {
  const set = new Set<string>();

  distros.forEach((d) => {
    splitAndNormalize(d.category).forEach((category) => set.add(category));
  });

  return Array.from(set).sort();
}

export function getAllStatuses(): readonly Distro["status"][] {
  return Array.from(new Set(distros.map((d) => d.status)));
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
    if (desktop && !d.desktop?.split(",").map((v) => v.trim()).includes(desktop)) return false;
    if (category && !d.category.split(",").map((v) => v.trim()).includes(category)) return false;
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

/* ---------- facets ---------- */

export interface Facet {
  value: string;
  count: number;
}

export function getDesktopFacets(
  activeFilters: DistroFilters
): readonly Facet[] {
  const baseFilters = { ...activeFilters, desktop: undefined };

  const filtered = filterDistros(baseFilters);
  const counts = new Map<string, number>();

  filtered.forEach((distro) => {
    if (!distro.desktop) return;
    splitAndNormalize(distro.desktop).forEach((desktop) => {
      counts.set(desktop, (counts.get(desktop) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCategoryFacets(
  activeFilters: DistroFilters
): readonly Facet[] {
  const baseFilters = { ...activeFilters, category: undefined };

  const filtered = filterDistros(baseFilters);
  const counts = new Map<string, number>();

  filtered.forEach((distro) => {
    splitAndNormalize(distro.category).forEach((category) => {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

/* ---------- helpers ---------- */

// utility function to split comma-separated values and normalize them
function splitAndNormalize(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}
