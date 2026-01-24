import { HARDWARE_OPTIONS } from "./hardwareOptions";

interface HardwareStepProps {
  value: string[];
  onChange: (categories: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function HardwareStep({
  value,
  onChange,
  onNext,
  onBack,
}: HardwareStepProps) {
  const toggleOption = (categories: string[]) => {
    if (categories.length === 0) {
      // Neutral option selected → clear hardware constraints
      onChange([]);
      return;
    }

    const exists = categories.every((c) => value.includes(c));

    if (exists) {
      onChange(value.filter((v) => !categories.includes(v)));
    } else {
      onChange([...new Set([...value, ...categories])]);
    }
  };

  return (
    <>
      <h2>What hardware will you use?</h2>
      <p className="wizard-subtitle">Select all that apply.</p>

      <div className="wizard-options">
        {HARDWARE_OPTIONS.map((option) => {
          const selected =
            option.categories.length === 0
              ? value.length === 0
              : option.categories.some((c) => value.includes(c));

          return (
            <button
              key={option.label}
              type="button"
              className={`wizard-option ${selected ? "is-selected" : ""}`}
              onClick={() => toggleOption(option.categories)}
            >
              <span className="wizard-option__label">{option.label}</span>
              <span className="wizard-option__description">
                {option.description}
              </span>
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
