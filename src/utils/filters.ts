import type { DistroFilters } from "../data/distroService";

export function filtersFromSearchParams(
  params: URLSearchParams
): DistroFilters {
  return {
    search: params.get("q") || "",
    status: (params.get("status") as DistroFilters["status"]) || undefined,
  };
}

export function filtersToSearchParams(filters: DistroFilters) {
  const params = new URLSearchParams();

  if (filters.search) params.set("q", filters.search);
  if (filters.status) params.set("status", filters.status);

  return params;
}
