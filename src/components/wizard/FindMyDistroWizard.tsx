import { useState } from "react";
import "../../styles/wizard.css";
import type { WizardAnswers } from "../../utils/scoring";
import ExperienceStep from "./ExperienceStep";
import PrimaryUseStep from "./PrimaryUseStep";

export function FindMyDistroWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>({
    experienceLevel: "beginner",
    primaryUse: [],
    hardware: [],
    priorities: [],
    philosophy: [],
  });

  return (
    <section className="wizard">
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

      {/* More steps follow */}
    </section>
  );
}
