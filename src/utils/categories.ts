export type CategoryKey =
  | "Assistive"
  | "Beginners"
  | "Clusters"
  | "Container"
  | "Data Rescue"
  | "Declarative"
  | "Desktop"
  | "Disk Management"
  | "Education"
  | "Firewall"
  | "Forensics"
  | "Free Software"
  | "From RAM"
  | "Gaming"
  | "High Performance Computing"
  | "Immutable"
  | "Kubernetes"
  | "Live Medium"
  | "Mobile"
  | "Multimedia"
  | "MythTV"
  | "NAS"
  | "Netbooks"
  | "Old Computers"
  | "Privacy"
  | "Raspberry Pi"
  | "Scientific"
  | "Server"
  | "Security"
  | "Source-based"
  | "Specialist"
  | "Telephony"
  | "Thin Client";

interface CategoryInfo {
  label: string;
  explanation?: string;
}

const CATEGORY_INFO: Record<CategoryKey, CategoryInfo> = {
  Beginners: {
    label: "Beginner-friendly",
    explanation: "Designed to be easy to install and use for new Linux users.",
  },
  Desktop: {
    label: "Desktop use",
    explanation: "Suitable for everyday personal computing.",
  },
  Gaming: {
    label: "Gaming-focused",
    explanation: "Optimized for gaming and compatibility with modern GPUs.",
  },
  "Old Computers": {
    label: "Optimized for older hardware",
    explanation: "Runs well on low-resource or aging systems.",
  },
  Privacy: {
    label: "Privacy-focused",
    explanation:
      "Includes tools and defaults aimed at protecting user privacy.",
  },
  Server: {
    label: "Server workloads",
    explanation: "Intended for hosting services and long-running processes.",
  },
  "Source-based": {
    label: "Built from source (advanced)",
    explanation:
      "Requires compiling software locally; suited for advanced users.",
  },
  Declarative: {
    label: "Declarative / config-driven",
    explanation:
      "System configuration is defined declaratively rather than manually.",
  },
  Immutable: {
    label: "Immutable system",
    explanation:
      "The base system is read-only, enhancing stability and security.",
  },
  "Live Medium": {
    label: "Bootable live system",
    explanation:
      "Can be run directly from external media without installation.",
  },
  "Free Software": {
    label: "Free software only",
    explanation:
      "Includes only free and open-source software, excluding proprietary components.",
  },
  Education: {
    label: "Learning & education",
    explanation: "Tailored for educational environments and learning.",
  },
  Multimedia: {
    label: "Multimedia production",
    explanation: "Focused on audio, video, and graphic content creation.",
  },
  Scientific: {
    label: "Scientific computing",
    explanation: "Equipped for research and scientific applications.",
  },
  "High Performance Computing": {
    label: "High Performance Computing (HPC)",
    explanation: "Optimized for supercomputing and parallel processing tasks.",
  },
  Container: {
    label: "Container-focused",
    explanation: "Designed for containerization and microservices.",
  },
  Kubernetes: {
    label: "Kubernetes-ready",
    explanation: "Specialized for Kubernetes orchestration and workloads.",
  },
  "Data Rescue": {
    label: "Data recovery tools",
    explanation: "Includes tools for recovering lost or damaged data.",
  },
  "Disk Management": {
    label: "Disk & partition tools",
    explanation:
      "Provides utilities for managing disk partitions and filesystems.",
  },
  MythTV: {
    label: "Media center (MythTV)",
    explanation: "Optimized for use as a MythTV media center.",
  },
  NAS: {
    label: "Network Attached Storage (NAS)",
    explanation: "Designed for file sharing and storage over a network.",
  },
  Telephony: {
    label: "Telephony / VoIP",
    explanation: "Focused on voice over IP (VoIP) and telephony services.",
  },
  Clusters: {
    label: "Cluster computing",
    explanation: "Intended for use in computing clusters.",
  },
  Netbooks: {
    label: "Netbook-optimized",
    explanation: "Tailored for low-power netbook devices.",
  },
  Assistive: {
    label: "Accessibility / assistive technologies",
    explanation: "Designed to support users with disabilities.",
  },
  Specialist: {
    label: "Specialist use cases",
    explanation: "Catered to specific professional or niche applications.",
  },
  Firewall: {
    label: "Firewall appliances",
    explanation: "Focused on network security and firewall functionalities.",
  },
  Forensics: {
    label: "Digital forensics",
    explanation:
      "Equipped with tools for digital forensics and investigations.",
  },
  "From RAM": {
    label: "Runs entirely from RAM",
    explanation:
      "Can load entirely into RAM for faster performance and portability.",
  },
  Mobile: {
    label: "Mobile",
    explanation: "Optimized for mobile devices and smartphones.",
  },
  "Raspberry Pi": {
    label: "Raspberry Pi support",
    explanation: "Designed specifically for Raspberry Pi hardware.",
  },
  Security: {
    label: "Security",
    explanation: "Focused on security features and hardening.",
  },
  "Thin Client": {
    label: "Thin-client systems",
    explanation: "Intended for thin client computing environments.",
  },
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_INFO[category as CategoryKey]?.label ?? category;
}

export function getCategoryInfo(category: string): CategoryInfo {
  return CATEGORY_INFO[category as CategoryKey] ?? { label: category };
}
