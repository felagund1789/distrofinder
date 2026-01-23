export interface PrimaryUseOption {
  label: string;
  description: string;
  categories: string[];
}

export const PRIMARY_USE_OPTIONS: PrimaryUseOption[] = [
  {
    label: "Daily desktop use",
    description: "Web browsing, documents, everyday tasks",
    categories: ["Desktop", "Beginners"],
  },
  {
    label: "Gaming",
    description: "PC gaming and graphics performance",
    categories: ["Gaming"],
  },
  {
    label: "Server / homelab",
    description: "Hosting services and self-hosted apps",
    categories: ["Server", "NAS"],
  },
  {
    label: "Privacy & security",
    description: "Anonymity, security, and privacy tools",
    categories: ["Privacy", "Security"],
  },
  {
    label: "Learning Linux",
    description: "Exploring and understanding Linux systems",
    categories: ["Education"],
  },
  {
    label: "Specialized tasks",
    description: "Recovery, forensics, or niche use cases",
    categories: ["Data Rescue", "Forensics", "Live Medium"],
  },
];
