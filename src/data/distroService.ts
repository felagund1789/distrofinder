// src/data/distros.ts
import rawData from "./distros.json";
import type { Distro } from "../types/distro";

const distros = rawData as Distro[];

export function getAllDistros(): readonly Distro[] {
  return distros;
}

export function getDistroBySlug(slug: string): Distro | undefined {
  return distros.find((d) => d.slug === slug);
}
