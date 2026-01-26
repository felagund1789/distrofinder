import type { WizardAnswers } from "../../../utils/scoring";
import { RadioGroup } from "../../ui/RadioGroup";

interface ExperienceStepProps {
  value: WizardAnswers["experienceLevel"];
  onChange: (v: WizardAnswers["experienceLevel"]) => void;
  onNext: () => void;
  onExit: () => void;
}

export default function ExperienceStep({
  value,
  onChange,
  onNext,
  onExit,
}: ExperienceStepProps) {
  return (
    <>
      <h2>How familiar are you with Linux?</h2>

      <div className="wizard-options">
        <RadioGroup
          value={value}
          options={[
            { value: "beginner", label: "I am new to Linux" },
            { value: "intermediate", label: "I have used Linux before" },
            { value: "advanced", label: "I am an experienced user" },
          ]}
          onChange={onChange}
        />
      </div>

      <div className="wizard-actions">
        <button onClick={onExit} className="button-secondary">
          Exit wizard
        </button>
        <button onClick={onNext} className="button-primary">
          Next
        </button>
      </div>
    </>
  );
}
