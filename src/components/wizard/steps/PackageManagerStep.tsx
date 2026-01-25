import { RadioGroup } from "../../ui/RadioGroup";
import { PACKAGE_MANAGER_OPTIONS } from "../wizardOptions";

interface PackageManagerStepProps {
  value: string | null;
  onChange: (value: string | null) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export function PackageManagerStep({
  value,
  onChange,
  onNext,
  onBack,
}: PackageManagerStepProps) {
  return (
    <>
      <h2>How do you prefer to install software?</h2>
      <p className="wizard-subtitle">
        Choose the package manager you prefer.
      </p>

      <div className="wizard-options">
        <RadioGroup
          value={value ?? "Any"}
          options={PACKAGE_MANAGER_OPTIONS.map((option) => ({
            value: option.packages,
            label: option.label,
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
