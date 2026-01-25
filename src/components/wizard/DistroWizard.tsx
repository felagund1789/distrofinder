import { useState } from "react";
import "../../styles/wizard.css";
import type { WizardAnswers } from "../../utils/scoring";
import { DesktopStep } from "./steps/DesktopStep";
import ExperienceStep from "./steps/ExperienceStep";
import HardwareStep from "./steps/HardwareStep";
import PrimaryUseStep from "./steps/PrimaryUseStep";
import PrioritiesStep from "./steps/PrioritiesStep";
import ResultsStep from "./steps/ResultsStep";
import WizardProgress from "./WizardProgress";
import { PackageManagerStep } from "./steps/PackageManagerStep";

const INITIAL_ANSWERS: WizardAnswers = {
  experienceLevel: "beginner",
  primaryUse: [],
  hardware: [],
  priorities: [],
  philosophy: [],
  desktop: null,
  packageManager: null,
};

export default function DistroWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>(INITIAL_ANSWERS);

  const WIZARD_STEPS = [
    "Experience",
    "Use",
    "Hardware",
    ...(answers.experienceLevel !== "beginner" ? ["Desktop Environment"] : []),
    ...(answers.experienceLevel === "advanced" ? ["Package Manager"] : []),
    "Priorities",
    "Results",
  ];

  return (
    <section className="wizard">
      <WizardProgress currentStep={step} totalSteps={WIZARD_STEPS.length} />

      {WIZARD_STEPS[step] === "Experience" && (
        <ExperienceStep
          value={answers.experienceLevel}
          onChange={(v) => setAnswers((a) => ({ ...a, experienceLevel: v }))}
          onNext={() => setStep(step + 1)}
        />
      )}

      {WIZARD_STEPS[step] === "Use" && (
        <PrimaryUseStep
          value={answers.primaryUse}
          onChange={(v) => setAnswers((a) => ({ ...a, primaryUse: v }))}
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
        />
      )}

      {WIZARD_STEPS[step] === "Hardware" && (
        <HardwareStep
          value={answers.hardware}
          onChange={(v) => setAnswers((a) => ({ ...a, hardware: v }))}
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
        />
      )}

      {WIZARD_STEPS[step] === "Desktop Environment" && (
        <DesktopStep
          value={answers.desktop ?? null}
          onChange={(v) => setAnswers((a) => ({ ...a, desktop: v }))}
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
        />
      )}

      {WIZARD_STEPS[step] === "Package Manager" && (
        <PackageManagerStep
          value={answers.packageManager ?? null}
          onChange={(v) => setAnswers((a) => ({ ...a, packageManager: v }))}
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
        />
      )}

      {WIZARD_STEPS[step] === "Priorities" && (
        <PrioritiesStep
          value={[...answers.priorities, ...answers.philosophy]}
          onChange={(v) =>
            setAnswers((a) => ({
              ...a,
              priorities: v,
              philosophy: v,
            }))
          }
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
        />
      )}

      {WIZARD_STEPS[step] === "Results" && (
        <ResultsStep
          answers={answers}
          onRestart={() => {
            setAnswers(INITIAL_ANSWERS);
            setStep(0);
          }}
        />
      )}
    </section>
  );
}
