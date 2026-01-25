export const DESKTOP_OPTIONS = [
  "Any",
  "KDE Plasma",
  "GNOME",
  "Xfce",
  "MATE",
  "Cinnamon",
  "Unity",
  "Budgie",
  "Deepin",
  "Pantheon",
  "COSMIC",
  "LXQt",
  "LXDE",
  "i3",
  "Fluxbox",
  "Openbox",
  "hyprland",
  "Sway",
  "AwesomeWM",
];

export const PACKAGE_MANAGER_OPTIONS = [
  {
    label: "Any",
    packages: "Any",
  },
  {
    label: "APT (Debian, Ubuntu, etc.)",
    packages: "DEB",
  },
  {
    label: "DNF/YUM (Fedora, RHEL, CentOS, etc.)",
    packages: "RPM",
  },
  {
    label: "Pacman (Arch, Manjaro, etc.)",
    packages: "Pacman",
  },
  {
    label: "Source-based (Gentoo, Source Mage, etc.)",
    packages: "SRC",
  },
  {
    label: "pkg (FreeBSD, TrueNAS, etc.)",
    packages: "PKG",
  },
  {
    label: "Snap (Canonical's package format)",
    packages: "Snap",
  },
  {
    label: "Flatpak (Universal Linux packages)",
    packages: "Flatpak",
  },
  {
    label: "Nix (NixOS and others)",
    packages: "Nix",
  },
];

export interface HardwareOption {
  label: string;
  description: string;
  categories: string[];
}

export const HARDWARE_OPTIONS: HardwareOption[] = [
  {
    label: "Older computer",
    description: "Low RAM, older CPU, or limited resources",
    categories: ["Old Computers", "Netbooks"],
  },
  {
    label: "Modern PC or laptop",
    description: "Standard desktop or laptop hardware",
    categories: [], // neutral baseline
  },
  {
    label: "Raspberry Pi / SBC",
    description: "Single-board computers and ARM devices",
    categories: ["Raspberry Pi"],
  },
  {
    label: "Server hardware",
    description: "Dedicated server or homelab machine",
    categories: ["Server", "NAS"],
  },
  {
    label: "Live / recovery environment",
    description: "Bootable system for repair or recovery",
    categories: ["Live Medium", "From RAM"],
  },
];

export interface PrimaryUseOption {
  label: string;
  description: string;
  categories: string[];
}

export const PRIMARY_USE_OPTIONS: PrimaryUseOption[] = [
  {
    label: "Daily desktop use",
    description: "Web browsing, documents, everyday tasks",
    categories: ["Desktop"],
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
    label: "Education & learning",
    description: "Educational tools and environments",
    categories: ["Education"],
  },
  {
    label: "Specialized tasks",
    description: "Recovery, forensics, or niche use cases",
    categories: ["Data Rescue", "Forensics", "Live Medium"],
  },
];

export interface PriorityOption {
  label: string;
  description: string;
  categories: string[];
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    label: "Ease of use",
    description: "Simple setup and intuitive desktop experience",
    categories: ["Beginners"],
  },
  {
    label: "Privacy",
    description: "Protecting your data and online activity",
    categories: ["Privacy", "Security"],
  },
  {
    label: "Stability",
    description: "Reliable system with predictable updates",
    categories: ["Immutable", "Declarative"],
  },
  {
    label: "Performance",
    description: "Speed and efficiency, especially on limited hardware",
    categories: ["Old Computers", "High Performance Computing"],
  },
  {
    label: "Free software only",
    description: "Strict adherence to free and open-source principles",
    categories: ["Free Software"],
  },
];
