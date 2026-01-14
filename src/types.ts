export interface Distro {
  slug: string
  name: string
  description?: string
  osType?: string
  basedOn?: string
  origin?: string
  architecture?: string
  desktop?: string
  category?: string
  status?: string
  popularity?: string
  rating?: string
  reviewCount?: string
  thumbnail?: string
  screenshot?: string
  logo?: string
  lastUpdate?: string
  localPaths?: Record<string, string>
}
