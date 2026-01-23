import "../../styles/radio-group.css";

interface RadioOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface RadioGroupProps<T extends string> {
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
}

export function RadioGroup<T extends string>({
  value,
  options,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <div className="radio-group">
      {options.map((option) => (
        <label
          key={option.value}
          className={`radio-option ${
            value === option.value ? "is-selected" : ""
          }`}
        >
          <input
            type="radio"
            name="radio-group"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />

          <div className="radio-option__content">
            <span className="radio-option__label">{option.label}</span>

            {option.description && (
              <span className="radio-option__description">
                {option.description}
              </span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
