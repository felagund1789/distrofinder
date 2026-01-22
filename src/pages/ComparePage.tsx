import { useSearchParams, useNavigate } from "react-router-dom";
import ComparisonTable from "../components/compare/ComparisonTable";
import { getDistroBySlug } from "../data/distroService";
import type { Distro } from "../types/distro";

export default function ComparePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const slugs = params
    .get("distros")
    ?.split(",")
    .map(s => s.trim())
    .filter(Boolean) ?? [];

  const distros = slugs
    .map(slug => getDistroBySlug(slug))
    .filter(Boolean) as Distro[];

  // Guard: invalid state
  if (!distros || distros.length < 2) {
    return (
      <section className="compare-empty">
        <h1>Compare Distributions</h1>
        <p>Select at least two distributions to compare.</p>
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Back to Distro list
        </button>
      </section>
    );
  }

  return (
    <section className="compare-page">
      <header className="compare-header">
        <h1>Compare Distributions</h1>
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Back to Distro list
        </button>
      </header>

      <ComparisonTable distros={distros} />
    </section>
  );
}
