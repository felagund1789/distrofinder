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
