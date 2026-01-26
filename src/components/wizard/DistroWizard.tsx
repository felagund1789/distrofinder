import { useEffect, useState } from "react";
import "../../styles/wizard.css";
import type { WizardAnswers } from "../../utils/scoring";
import {
  clearWizardState,
  loadWizardState,
  saveWizardState,
} from "../../utils/wizardStorage";
import { DesktopStep } from "./steps/DesktopStep";
import ExperienceStep from "./steps/ExperienceStep";
import HardwareStep from "./steps/HardwareStep";
import { InitSystemStep } from "./steps/InitSystemStep";
import { PackageManagerStep } from "./steps/PackageManagerStep";
import PrimaryUseStep from "./steps/PrimaryUseStep";
import PrioritiesStep from "./steps/PrioritiesStep";
import ResultsStep from "./steps/ResultsStep";
import WizardProgress from "./WizardProgress";
import { useNavigate } from "react-router-dom";

const INITIAL_ANSWERS: WizardAnswers = {
  experienceLevel: "beginner",
  primaryUse: [],
  hardware: [],
  priorities: [],
  philosophy: [],
  desktop: null,
  packageManager: null,
  initSystem: [],
};

export default function DistroWizard() {
  const navigate = useNavigate();
  const persisted = loadWizardState();

  const [step, setStep] = useState(persisted?.step ?? 0);
  const [answers, setAnswers] = useState<WizardAnswers>(
    persisted?.answers ?? INITIAL_ANSWERS
  );

  useEffect(() => {
    document.title = "Distro Wizard - DistroFinder";
  }, []);

  useEffect(() => {
    saveWizardState({ step, answers });
  }, [step, answers]);

  const WIZARD_STEPS = [
    "Experience",
    "Use",
    "Hardware",
    ...(answers.experienceLevel !== "beginner" ? ["Desktop Environment"] : []),
    ...(answers.experienceLevel === "advanced" ? ["Package Manager"] : []),
    ...(answers.experienceLevel === "advanced" ? ["Init System"] : []),
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
          onExit={() => {
            clearWizardState();
            navigate("/");
          }}
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

      {WIZARD_STEPS[step] === "Init System" && (
        <InitSystemStep
          value={answers.initSystem ?? []}
          onChange={(v) => setAnswers((a) => ({ ...a, initSystem: v }))}
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
            clearWizardState();
            setAnswers(INITIAL_ANSWERS);
            setStep(0);
          }}
          onExit={() => {
            clearWizardState();
            navigate("/");
          }}
        />
      )}
    </section>
  );
}
