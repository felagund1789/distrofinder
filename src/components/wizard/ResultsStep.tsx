import { useNavigate } from "react-router-dom";
import { useDistros } from "../../context/DistroContext";
import { getCategoryLabel } from "../../utils/categories";
import type { WizardAnswers } from "../../utils/scoring";
import { scoreDistros } from "../../utils/scoring";

interface ResultsStepProps {
  answers: WizardAnswers;
  onRestart: () => void;
}

export default function ResultsStep({ answers, onRestart }: ResultsStepProps) {
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
          <button onClick={() => navigate("/")}>Browse all distros</button>
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
                alt={`${distro.name} logo`}
                className="wizard-result-logo"
              />
              <h3>{distro.name}</h3>
            </div>

            <div className="wizard-result-about">
              <div className="wizard-result-about__content">
                <p>{distro.description}</p>
              </div>
              <div className="wizard-result-about__media">
                <img
                  src={distro.localPaths?.thumbnail || ""}
                  alt={`${distro.name} screenshot`}
                />
              </div>
            </div>

            <ul className="wizard-result-reasons">
              {reasons.slice(0, 3).map((reason) => (
                <li key={reason}>{getCategoryLabel(reason)}</li>
              ))}
            </ul>

            <div className="wizard-result-actions">
              <button
                className="button-primary"
                onClick={() => navigate(`/d/${distro.slug}`)}
              >
                View details
              </button>

              <button
                className="button-secondary"
                onClick={() => navigate("/")}
              >
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
      </div>
    </>
  );
}
