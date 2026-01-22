import { useSearchParams, useNavigate } from "react-router-dom";
import ComparisonTable from "../components/compare/ComparisonTable";
import { getDistroBySlug } from "../data/distroService";
import type { Distro } from "../types/distro";

export default function ComparePage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const slugs =
    params
      .get("distros")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const distros = slugs
    .map((slug) => getDistroBySlug(slug))
    .filter(Boolean) as Distro[];

  const removeDistro = (slug: string) => {
    const next = slugs.filter((s) => s !== slug);

    if (next.length < 2) {
      navigate("/");
      return;
    }

    setParams({ distros: next.join(",") });
  };

  if (distros.length < 2) {
    return null;
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

      <ComparisonTable distros={distros} onRemove={removeDistro} />
    </section>
  );
}
