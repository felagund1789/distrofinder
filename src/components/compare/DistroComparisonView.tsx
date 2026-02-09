"use client";

import ComparisonTable from "@/components/compare/ComparisonTable";
import { useURLSearchParams } from "@/hooks/useURLSearchParams";
import type { Distro } from "@/types/distro";
import { useEffect } from "react";
import "@/styles/compare-page.css";

export default function DistroComparisonView({ distros }: { distros: Distro[] }) {
  const [params, setParams] = useURLSearchParams();

  useEffect(() => {
    document.title = `Compare Distributions: ${distros.map((d) => d.name).join(", ")} - DistroFinder`;
  }, [distros]);

  const removeDistro = (slug: string) => {
    const slugs =
      params
        ?.get("distros")
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ?? [];

    const next = slugs.filter((s) => s !== slug);
    setParams(new URLSearchParams({ distros: next.join(",") }));
  };

  return <ComparisonTable distros={distros} onRemove={removeDistro} />;
}
