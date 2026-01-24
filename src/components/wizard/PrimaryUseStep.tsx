import { PRIMARY_USE_OPTIONS } from "./primaryUseOptions";

interface PrimaryUseStepProps {
  value: string[];
  onChange: (categories: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PrimaryUseStep({
  value,
  onChange,
  onNext,
  onBack,
}: PrimaryUseStepProps) {
  const toggleOption = (categories: string[]) => {
    const exists = categories.every((c) => value.includes(c));

    if (exists) {
      onChange(value.filter((v) => !categories.includes(v)));
    } else {
      onChange([...new Set([...value, ...categories])]);
    }
  };

  return (
    <>
      <h2>What do you want to use Linux for?</h2>
      <p className="wizard-subtitle">You can select more than one option.</p>

      <div className="wizard-options">
        {PRIMARY_USE_OPTIONS.map((option) => {
          const selected = option.categories.some((c) => value.includes(c));

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
        <button
          onClick={onNext}
          className="button-primary"
          disabled={value.length === 0}
        >
          Next
        </button>
      </div>
    </>
  );
}
