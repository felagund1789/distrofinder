"use client";

import ComparisonTable from "@/components/compare/ComparisonTable";
import { getDistroBySlug } from "@/data/distroService";
import { useNavigate } from "@/hooks/useNavigate";
import { useURLSearchParams } from "@/hooks/useURLSearchParams";
import type { Distro } from "@/types/distro";
import { useEffect } from "react";
import "./compare-page.css";

export default function ComparePage() {
  const navigate = useNavigate();
  const [params, setParams] = useURLSearchParams();

  const slugs =
    params
      ?.get("distros")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const distros = slugs
    .map((slug) => getDistroBySlug(slug))
    .filter(Boolean) as Distro[];

  useEffect(() => {
    document.title = `Compare Distributions: ${distros.map((d) => d.name).join(", ")} - DistroFinder`;
  }, [distros]);

  const removeDistro = (slug: string) => {
    const next = slugs.filter((s) => s !== slug);

    if (next.length < 2) {
      navigate("/");
      return;
    }

    setParams(new URLSearchParams({ distros: next.join(",") }));
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
