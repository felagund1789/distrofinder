import { useNavigate } from "react-router-dom";

interface CompareFABProps {
  selected: string[];
}

export function CompareFAB({ selected }: CompareFABProps) {
  const navigate = useNavigate();

  if (selected.length < 2) {
    return null;
  }

  const handleClick = () => {
    const params = selected.join(",");
    navigate(`/compare?distros=${encodeURIComponent(params)}`);
  };

  return (
    <button
      className="compare-fab"
      onClick={handleClick}
      aria-label={`Compare ${selected.length} distributions`}
    >
      Compare ({selected.length})
    </button>
  );
}
