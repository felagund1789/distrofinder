export interface Distro {
  slug: string
  name: string
  description?: string
  thumbnail?: string
  screenshot?: string
  logo?: string
  origin?: string
  desktop?: string
  status?: string
  lastUpdate?: string
  localPaths?: Record<string, string>
}
