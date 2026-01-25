import type { Distro } from "../types/distro";
import { getCategoryInfo, getCategoryLabel } from "./categories";

export interface WizardAnswers {
  experienceLevel: "beginner" | "intermediate" | "advanced";
  primaryUse: string[]; // mapped to categories
  hardware: string[];
  priorities: string[];
  philosophy: string[];
  desktop?: string | null;
}

const WEIGHTS = {
  PRIMARY_USE: 4,
  SECONDARY_USE: 2,
  HARDWARE: 3,
  DESKTOP_ENVIRONMENT: 20,
  EXPERIENCE_MATCH: 3,
  PHILOSOPHY: 1,
  EXPERIENCE_MISMATCH: -5,
};

const EXPERIENCE_BONUSES: Record<WizardAnswers["experienceLevel"], string[]> = {
  beginner: ["Beginners"],
  intermediate: [],
  advanced: ["Source-based", "Declarative"],
};

const EXPERIENCE_PENALTIES: Record<WizardAnswers["experienceLevel"], string[]> =
  {
    beginner: ["Source-based", "Declarative"],
    intermediate: ["Source-based", "Declarative", "Beginners"],
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

  // Experience bonuses
  EXPERIENCE_BONUSES[answers.experienceLevel].forEach((cat) => {
    if (distroCategories.includes(cat)) {
      score += WEIGHTS.EXPERIENCE_MATCH;
      reasons.add(getCategoryInfo(cat).explanation ?? getCategoryLabel(cat));
    }
  });

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

  // Desktop environment
  if (answers.desktop) {
    if (distro.defaultDesktop?.toLowerCase().includes(answers.desktop.toLowerCase())) {
      score += WEIGHTS.DESKTOP_ENVIRONMENT;
      reasons.add(`Comes with ${answers.desktop}`);
    }
  }

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
