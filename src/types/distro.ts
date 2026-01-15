export interface LocalPaths {
  logo: string;
  thumbnail: string;
  screenshot: string;
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
  desktop: string;
  category: string;
  status: "Active" | "Discontinued" | "Dormant" | string;
  popularity: number | null;
  rating: number | null;
  reviewCount: number | null;
  logo: string;
  thumbnail: string;
  screenshot: string;
  localPaths: LocalPaths;
}
