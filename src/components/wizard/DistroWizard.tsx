import { useState } from "react";
import "../../styles/wizard.css";
import type { WizardAnswers } from "../../utils/scoring";
import ExperienceStep from "./ExperienceStep";
import HardwareStep from "./HardwareStep";
import PrimaryUseStep from "./PrimaryUseStep";
import PrioritiesStep from "./PrioritiesStep";
import WizardProgress from "./WizardProgress";
import ResultsStep from "./ResultsStep";

const WIZARD_STEPS = ["Experience", "Use", "Hardware", "Priorities", "Results"];

const INITIAL_ANSWERS: WizardAnswers = {
  experienceLevel: "beginner",
  primaryUse: [],
  hardware: [],
  priorities: [],
  philosophy: [],
};

export default function DistroWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>(INITIAL_ANSWERS);

  return (
    <section className="wizard">
      <WizardProgress currentStep={step} totalSteps={WIZARD_STEPS.length} />

      {step === 0 && (
        <ExperienceStep
          value={answers.experienceLevel}
          onChange={(v) => setAnswers((a) => ({ ...a, experienceLevel: v }))}
          onNext={() => setStep(1)}
        />
      )}

      {step === 1 && (
        <PrimaryUseStep
          value={answers.primaryUse}
          onChange={(v) => setAnswers((a) => ({ ...a, primaryUse: v }))}
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && (
        <HardwareStep
          value={answers.hardware}
          onChange={(v) => setAnswers((a) => ({ ...a, hardware: v }))}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <PrioritiesStep
          value={[...answers.priorities, ...answers.philosophy]}
          onChange={(v) =>
            setAnswers((a) => ({
              ...a,
              priorities: v,
              philosophy: v,
            }))
          }
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
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
