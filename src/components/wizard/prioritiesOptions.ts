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
