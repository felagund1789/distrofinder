import { useNavigate } from "react-router-dom";
import { useDistros } from "../../../context/DistroContext";
import type { WizardAnswers } from "../../../utils/scoring";
import { scoreDistros } from "../../../utils/scoring";

interface ResultsStepProps {
  answers: WizardAnswers;
  onRestart: () => void;
  onExit: () => void;
}

export default function ResultsStep({
  answers,
  onRestart,
  onExit,
}: ResultsStepProps) {
  const { distros } = useDistros();
  const navigate = useNavigate();

  const scored = scoreDistros(distros, answers)
    .filter((r) => r.score > 0)
    .slice(0, 5);

  if (scored.length === 0) {
    return (
      <>
        <h2>No strong matches found</h2>
        <p>Try adjusting your answers or browsing all distributions.</p>

        <div className="wizard-actions">
          <button onClick={onRestart}>Start over</button>
          <button onClick={onExit}>Browse all distros</button>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Recommended distributions</h2>
      <p className="wizard-subtitle">
        Based on your answers, these distros best match your needs.
      </p>

      <div className="wizard-results">
        {scored.map(({ distro, reasons }) => (
          <div key={distro.slug} className="wizard-result-card">
            <div className="wizard-result-header">
              <img
                src={distro.localPaths?.logo || ""}
                alt=""
                className="wizard-result-logo"
              />
              <h3>{distro.name}</h3>
            </div>

            <div className="wizard-result-about">
              <div className="wizard-result-about__content">
                <p>{distro.description}</p>
              </div>
              <div className="wizard-result-about__media">
                <img src={distro.localPaths?.thumbnail || ""} alt="" />
              </div>
            </div>

            <div className="wizard-result-why">
              <h4>Why this matches you</h4>

              <p className="wizard-result-why__intro">
                This distro was recommended based on your answers:
              </p>

              <div className="wizard-result-why__tags">
                {reasons.slice(0, 4).map((reason) => (
                  <span key={reason} className="wizard-result-why__tag">
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            <div className="wizard-result-actions">
              <button
                className="button-primary"
                onClick={() => navigate(`/d/${distro.slug}`)}
              >
                View details
              </button>

              <button className="button-secondary" onClick={onExit}>
                Browse all
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="wizard-actions">
        <button className="button-secondary" onClick={onRestart}>
          Start over
        </button>
        <button className="button-secondary" onClick={onExit}>
          Exit wizard
        </button>
      </div>
    </>
  );
}
