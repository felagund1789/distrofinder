import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import distros from "../data/distros.json";
import { scoreDistros, type WizardAnswers } from "../utils/scoring";
import { getCategoryInfo } from "../utils/categories";

describe("scoreDistros", () => {
  const inputDistros = distros.filter((d) => ["bazzite", "arch"].includes(d.slug));

  it("scores distros higher when categories match user answers", () => {
    const answers: WizardAnswers = {
      experienceLevel: "beginner",
      primaryUse: ["Gaming"],
      hardware: [],
      priorities: [],
      philosophy: [],
    };

    const results = scoreDistros(inputDistros, answers);

    const bazzite = results.find((r) => r.distro.slug === "bazzite");
    const arch = results.find((r) => r.distro.slug === "arch");

    expect(bazzite?.score).toBeGreaterThan(arch?.score ?? 0);
  });

  it("includes matched categories as reasons", () => {
    const inputDistros = distros.filter((d) =>
      ["ubuntu", "tails"].includes(d.slug)
    );

    const answers: WizardAnswers = {
      experienceLevel: "beginner",
      primaryUse: ["Privacy", "Security"],
      hardware: [],
      priorities: [],
      philosophy: [],
    };

    const [result] = scoreDistros(inputDistros, answers);
    console.log(result.reasons);

    expect(result.reasons).toContain(getCategoryInfo("Privacy").explanation);
  });

  it("returns zero score when no categories match", () => {
    const inputDistros = distros.filter((d) =>
      ["mint", "arch"].includes(d.slug)
    );

    const answers: WizardAnswers = {
      experienceLevel: "beginner",
      primaryUse: ["Gaming"],
      hardware: [],
      priorities: [],
      philosophy: [],
    };

    const results = scoreDistros(inputDistros, answers);

    results.forEach((r) => {
      expect(r.score).toBe(0);
    });
  });

  it("sorts results by descending score", () => {
    const inputDistros = distros.filter((d) =>
      ["bazzite", "arch"].includes(d.slug)
    );

    const answers: WizardAnswers = {
      experienceLevel: "beginner",
      primaryUse: ["Gaming"],
      hardware: [],
      priorities: [],
      philosophy: [],
    };

    const results = scoreDistros(inputDistros, answers);

    expect(results[0].distro.slug).toBe("bazzite");
  });
});
