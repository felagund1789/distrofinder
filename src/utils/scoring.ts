import type { Distro } from "../types/distro";
import { getCategoryInfo, getCategoryLabel } from "./categories";

export interface WizardAnswers {
  experienceLevel: "beginner" | "intermediate" | "advanced";
  primaryUse: string[]; // mapped to categories
  hardware: string[];
  priorities: string[];
  philosophy: string[];
}

const WEIGHTS = {
  PRIMARY_USE: 4,
  SECONDARY_USE: 2,
  HARDWARE: 3,
  EXPERIENCE_MATCH: 3,
  PHILOSOPHY: 1,
  EXPERIENCE_MISMATCH: -3,
};

const EXPERIENCE_PENALTIES: Record<WizardAnswers["experienceLevel"], string[]> =
  {
    beginner: ["Source-based", "Declarative"],
    intermediate: [],
    advanced: ["Beginners"],
  };

export interface ScoredDistro {
  distro: Distro;
  score: number;
  reasons: string[];
}

export function scoreDistro(
  distro: Distro,
  answers: WizardAnswers
): ScoredDistro {
  let score = 0;
  const reasons: Set<string> = new Set();

  const distroCategories = distro.category.split(",").map((c) => c.trim());

  // Primary use
  answers.primaryUse.forEach((cat) => {
    if (distroCategories.includes(cat)) {
      score += WEIGHTS.PRIMARY_USE;
      reasons.add(getCategoryInfo(cat).explanation ?? getCategoryLabel(cat));
    }
  });

  // Hardware
  answers.hardware.forEach((cat) => {
    if (distroCategories.includes(cat)) {
      score += WEIGHTS.HARDWARE;
      reasons.add(getCategoryInfo(cat).explanation ?? getCategoryLabel(cat));
    }
  });

  // Philosophy / priorities
  answers.philosophy.forEach((cat) => {
    if (distroCategories.includes(cat)) {
      score += WEIGHTS.PHILOSOPHY;
      reasons.add(getCategoryInfo(cat).explanation ?? getCategoryLabel(cat));
    }
  });

  // Experience penalties
  EXPERIENCE_PENALTIES[answers.experienceLevel].forEach((cat) => {
    if (distroCategories.includes(cat)) {
      score += WEIGHTS.EXPERIENCE_MISMATCH;
    }
  });

  return { distro, score, reasons: Array.from(reasons) };
}

export function scoreDistros(
  distros: Readonly<Distro[]>,
  answers: WizardAnswers
): ScoredDistro[] {
  return distros
    .map((d) => scoreDistro(d, answers))
    .filter((s) => Number(s.distro.popularity) > 0)
    .sort((a, b) => Number(a.distro.popularity) - Number(b.distro.popularity))
    .sort((a, b) => b.score - a.score);
}
