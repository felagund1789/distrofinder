import { INIT_SYSTEM_OPTIONS } from "../wizardOptions";

interface InitSystemStepProps {
  value: string[];
  onChange: (value: string[]) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export function InitSystemStep({
  value,
  onChange,
  onNext,
  onBack,
}: InitSystemStepProps) {
  return (
    <>
      <h2>Do you care about your init system?</h2>
      <p className="wizard-subtitle">Choose the init system you prefer.</p>

      <div className="wizard-options">
        {INIT_SYSTEM_OPTIONS.map((option) => {
          const selected =
            option.initSystems.length === 0
              ? value.length === 0
              : option.initSystems.some((c) => value.includes(c));

          return (
            <button
              key={option.label}
              type="button"
              className={`wizard-option ${selected ? "is-selected" : ""}`}
              onClick={() => onChange(option.initSystems)}
            >
              <span className="wizard-option__label">{option.label}</span>
            </button>
          );
        })}
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
