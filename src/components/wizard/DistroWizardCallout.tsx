import { useNavigate } from 'react-router-dom';

export default function DistroWizardCallout() {
  const navigate = useNavigate();

  return (
    <div className="wizard-callout">
      <div className="wizard-callout__content">
        <h2>Not sure which distro to choose?</h2>
        <p>
          Answer a few questions and we’ll recommend Linux
          distributions that best match your needs.
        </p>
      </div>

      <button
        className="wizard-callout__action"
        onClick={() => navigate('/wizard')}
      >
        Find my distro
      </button>
    </div>
  );
}
