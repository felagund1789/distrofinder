import type {
  DistroFilters,
  DistroStatus,
  SortByType,
  SortDirType,
} from "../data/distroService";

export function filtersFromSearchParams(
  params: URLSearchParams
): DistroFilters {
  return {
    search: params.get("q") || "",
    status: (params.get("status") as DistroStatus) || undefined,
    desktop: params.get("desktop") || undefined,
    category: params.get("category") || undefined,
    sortBy: (params.get("sort")?.split(".")[0] as SortByType) || "popularity",
    sortDir: (params.get("sort")?.split(".")[1] as SortDirType) || "asc",
  };
}

export function filtersToSearchParams(filters: DistroFilters) {
  const params = new URLSearchParams();

  if (filters.search) params.set("q", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.desktop) params.set("desktop", filters.desktop);
  if (filters.category) params.set("category", filters.category);
  if (filters.sortBy) params.set("sort", `${filters.sortBy}.${filters.sortDir || "asc"}`);

  return params;
}
