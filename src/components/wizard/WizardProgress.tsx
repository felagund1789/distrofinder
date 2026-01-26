interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function WizardProgress({
  currentStep,
  totalSteps,
}: WizardProgressProps) {
  return (
    <div className="wizard-progress">
      <div className="wizard-progress__track">
        <div
          className="wizard-progress__bar"
          style={{
            width: `${((currentStep + 1) / totalSteps) * 100}%`,
          }}
        />
      </div>

      <span className="wizard-progress__label">
        Step {currentStep + 1} of {totalSteps}
      </span>
    </div>
  );
}
