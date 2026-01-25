import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { scoreDistros, type WizardAnswers } from "../utils/scoring";
import { getCategoryInfo } from "../utils/categories";
import type { Distro } from "../types/distro";

const distros = [
  {
    slug: "arch",
    category: "Desktop, Server",
    popularity: 25,
  },
  {
    slug: "bazzite",
    category: "Desktop, Gaming, Immutable",
    popularity: 28,
  },
  {
    slug: "mint",
    category: "Beginners, Desktop, Live Medium",
    popularity: 2,
  },
  {
    slug: "tails",
    category: "From RAM, Live Medium, Privacy, Security",
    popularity: 34,
  },
  {
    slug: "ubuntu",
    category: "Beginners, Desktop, Immutable, Server, Live Medium",
    popularity: 8,
  },
];

describe("scoreDistros", () => {
  it("scores distros higher when categories match user answers", () => {
    const answers: WizardAnswers = {
      experienceLevel: "beginner",
      primaryUse: ["Gaming"],
      hardware: [],
      priorities: [],
      philosophy: [],
      initSystem: [],
    };

    const results = scoreDistros(distros as Distro[], answers);

    const bazzite = results.find((r) => r.distro.slug === "bazzite");
    const arch = results.find((r) => r.distro.slug === "arch");

    expect(bazzite?.score).toBeGreaterThan(arch?.score ?? 0);
  });

  it("includes matched categories as reasons", () => {
    const answers: WizardAnswers = {
      experienceLevel: "beginner",
      primaryUse: ["Privacy", "Security"],
      hardware: [],
      priorities: [],
      philosophy: [],
      initSystem: [],
    };

    const [result] = scoreDistros(distros as Distro[], answers);

    expect(result.reasons).toContain(getCategoryInfo("Privacy").explanation);
  });

  it("sorts results by descending score", () => {
    const answers: WizardAnswers = {
      experienceLevel: "beginner",
      primaryUse: ["Gaming"],
      hardware: [],
      priorities: [],
      philosophy: [],
      initSystem: [],
    };

    const results = scoreDistros(distros as Distro[], answers);

    expect(results[0].distro.slug).toBe("bazzite");
  });

  it("scores distros according to experience penalties", () => {
    const answers: WizardAnswers = {
      experienceLevel: "beginner",
      primaryUse: ["Desktop"],
      hardware: [],
      priorities: [],
      philosophy: [],
      initSystem: [],
    };

    const results = scoreDistros(distros as Distro[], answers);

    const arch = results.find((r) => r.distro.slug === "arch");
    const mint = results.find((r) => r.distro.slug === "mint");

    expect(arch?.score).toBeLessThan(mint?.score ?? 0);
  });
});
