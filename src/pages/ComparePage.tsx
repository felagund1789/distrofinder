import { useNavigate, useSearchParams } from "react-router-dom";
import ComparisonTable from "../components/compare/ComparisonTable";
import { useDistros } from "../context/DistroContext";
import "../styles/compare-page.css";
import type { Distro } from "../types/distro";
import { useEffect } from "react";

export default function ComparePage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { getBySlug, isLoading, loadError } = useDistros();

  const slugs =
    params
      .get("distros")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const distros = slugs
    .map((slug) => getBySlug(slug))
    .filter(Boolean) as Distro[];

  useEffect(() => {
    document.title = `Compare Distributions: ${distros.map(d => d.name).join(", ")} - DistroFinder`;
  }, [distros]);

  const removeDistro = (slug: string) => {
    const next = slugs.filter((s) => s !== slug);

    if (next.length < 2) {
      navigate("/");
      return;
    }

    setParams({ distros: next.join(",") });
  };

  if (isLoading) {
    return <p className="loading">Loading distributions...</p>;
  }

  if (loadError) {
    return <p className="error">Unable to load distributions: {loadError}</p>;
  }

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
