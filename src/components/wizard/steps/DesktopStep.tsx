import { RadioGroup } from "../../ui/RadioGroup";
import { DESKTOP_OPTIONS } from "../wizardOptions";

interface DesktopStepProps {
  value: string | null;
  onChange: (value: string | null) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export function DesktopStep({
  value,
  onChange,
  onNext,
  onBack,
}: DesktopStepProps) {
  return (
    <>
      <h2>Do you have a preferred desktop environment?</h2>
      <p className="wizard-subtitle">
        Choose the desktop environment you prefer.
      </p>

      <div className="wizard-options">
        <RadioGroup
          value={value ?? "Any"}
          options={DESKTOP_OPTIONS.map((option) => ({
            value: option,
            label: option,
          }))}
          onChange={(val) => onChange(val === "Any" ? null : val)}
        />
      </div>

      <div className="wizard-actions">
        <button onClick={onBack} className="button-secondary">
          Back
        </button>

        <button onClick={onNext} className="button-primary">
          Next
        </button>
      </div>
    </>
  );
}
