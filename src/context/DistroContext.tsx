// src/context/DistroContext.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import {
  filterDistros,
  getBaseDistroFacets,
  getCategoryFacets,
  getDesktopFacets,
  getDistroBySlug,
  type DistroFilters,
  type Facet,
} from "../data/distroService";
import type { Distro } from "../types/distro";

const PAGE_SIZE = 20;

interface DistroContextValue {
  distros: readonly Distro[];
  getBySlug: (slug: string) => Distro | undefined;
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  setQueryFilters: (filters: DistroFilters) => void;
  desktopFacets: (filters: DistroFilters) => readonly Facet[];
  categoryFacets: (filters: DistroFilters) => readonly Facet[];
  baseDistroFacets: (filters: DistroFilters) => readonly Facet[];
}

const DistroContext = createContext<DistroContextValue | null>(null);

export function DistroProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<DistroFilters | undefined>(undefined);

  const filtered = useMemo(() => filterDistros({ ...filters }), [filters]);

  const query = useInfiniteQuery({
    queryKey: ["distros", filters],
    queryFn: ({ pageParam = 0 }) => getPage(filtered, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const distros = query.data ? query.data.pages.flatMap((p) => p.items) : [];

  const value: DistroContextValue = {
    distros,
    getBySlug: getDistroBySlug,
    loadMore: () => query.fetchNextPage(),
    hasMore: !!query.hasNextPage,
    isLoading: query.isFetching && !query.data,
    isLoadingMore: query.isFetchingNextPage,
    setQueryFilters: setFilters,
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

function getPage(all: readonly Distro[], page: number) {
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return {
    items: all.slice(start, end),
    nextPage: end < all.length ? page + 1 : undefined,
  };
}
