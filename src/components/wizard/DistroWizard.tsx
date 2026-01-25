import { useState } from "react";
import "../../styles/wizard.css";
import type { WizardAnswers } from "../../utils/scoring";
import ExperienceStep from "./ExperienceStep";
import HardwareStep from "./HardwareStep";
import PrimaryUseStep from "./PrimaryUseStep";
import PrioritiesStep from "./PrioritiesStep";
import WizardProgress from "./WizardProgress";
import ResultsStep from "./ResultsStep";
import { DesktopStep } from "./DesktopStep";

const INITIAL_ANSWERS: WizardAnswers = {
  experienceLevel: "beginner",
  primaryUse: [],
  hardware: [],
  priorities: [],
  philosophy: [],
  desktop: null,
};

export default function DistroWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>(INITIAL_ANSWERS);

  const WIZARD_STEPS = [
    "Experience",
    "Use",
    "Hardware",
    ...(answers.experienceLevel !== "beginner" ? ["Desktop Environment"] : []),
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
