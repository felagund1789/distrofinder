// src/context/DistroContext.tsx
import { createContext, useContext } from "react";
import {
  getAllDistros,
  getDistroBySlug,
  filterDistros,
  type DistroFilters,
} from "../data/distroService";
import type { Distro } from "../types/distro";

interface DistroContextValue {
  distros: readonly Distro[];
  getBySlug: (slug: string) => Distro | undefined;
  search: (filters?: DistroFilters) => readonly Distro[];
}

const DistroContext = createContext<DistroContextValue | null>(null);

export function DistroProvider({ children }: { children: React.ReactNode }) {
  const value: DistroContextValue = {
    distros: getAllDistros(),
    getBySlug: getDistroBySlug,
    search: filterDistros,
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
