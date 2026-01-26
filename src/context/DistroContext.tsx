// src/context/DistroContext.tsx
import { createContext, useContext } from "react";
import {
  filterDistros,
  getAllDistros,
  getBaseDistroFacets,
  getCategoryFacets,
  getDesktopFacets,
  getDistroBySlug,
  type DistroFilters,
  type Facet,
} from "../data/distroService";
import type { Distro } from "../types/distro";

interface DistroContextValue {
  distros: readonly Distro[];
  getBySlug: (slug: string) => Distro | undefined;
  search: (filters?: DistroFilters) => readonly Distro[];
  desktopFacets: (filters: DistroFilters) => readonly Facet[];
  categoryFacets: (filters: DistroFilters) => readonly Facet[];
  baseDistroFacets: (filters: DistroFilters) => readonly Facet[];
}

const DistroContext = createContext<DistroContextValue | null>(null);

export function DistroProvider({ children }: { children: React.ReactNode }) {
  const value: DistroContextValue = {
    distros: getAllDistros(),
    getBySlug: getDistroBySlug,
    search: filterDistros,
    desktopFacets: getDesktopFacets,
    categoryFacets: getCategoryFacets,
    baseDistroFacets: getBaseDistroFacets,
  };

  return (
    <DistroContext.Provider value={value}>{children}</DistroContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDistros() {
  const context = useContext(DistroContext);
  if (!context) {
    throw new Error("useDistros must be used within DistroProvider");
  }
  return context;
}
