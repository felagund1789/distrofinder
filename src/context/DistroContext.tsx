// src/context/DistroContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  ensureDistrosLoaded,
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
  isLoading: boolean;
  loadError: string | null;
  getBySlug: (slug: string) => Distro | undefined;
  search: (filters?: DistroFilters) => readonly Distro[];
  desktopFacets: (filters: DistroFilters) => readonly Facet[];
  categoryFacets: (filters: DistroFilters) => readonly Facet[];
  baseDistroFacets: (filters: DistroFilters) => readonly Facet[];
}

const DistroContext = createContext<DistroContextValue | null>(null);

export function DistroProvider({ children }: { children: React.ReactNode }) {
  const [distros, setDistros] = useState<readonly Distro[]>(getAllDistros());
  const [isLoading, setIsLoading] = useState(distros.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const loadedDistros = await ensureDistrosLoaded();
        if (cancelled) return;
        setDistros(loadedDistros);
      } catch (error) {
        if (cancelled) return;
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load distro data.";
        setLoadError(message);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const value: DistroContextValue = useMemo(
    () => ({
      distros,
      isLoading,
      loadError,
      getBySlug: getDistroBySlug,
      search: filterDistros,
      desktopFacets: getDesktopFacets,
      categoryFacets: getCategoryFacets,
      baseDistroFacets: getBaseDistroFacets,
    }),
    [distros, isLoading, loadError],
  );

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
