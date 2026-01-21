export interface LocalPaths {
  logo: string | null;
  thumbnail: string | null;
  screenshot: string | null;
}

export interface Distro {
  slug: string;
  name: string;
  lastUpdate: string;
  description: string;
  osType: string;
  basedOn: string;
  origin: string;
  architecture: string;
  desktop: string | null;
  category: string;
  status: "Active" | "Discontinued" | "Dormant" | string;
  defaultDesktop: string | null;
  installation: string | null;
  defaultBrowser: string | null;
  popularity: number | null;
  rating: number | null;
  reviewCount: number | null;
  logo: string | null;
  thumbnail: string | null;
  screenshot: string | null;
  localPaths: LocalPaths;
}

export interface DistroFilters {
  search?: string;
  status?: Distro["status"];
  desktop?: string;
  category?: string;
  basedOn?: string;
}
