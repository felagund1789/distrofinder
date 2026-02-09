import DistroComparisonView from "@/components/compare/DistroComparisonView";
import { getDistroBySlug } from "@/data/distroService";
import type { Distro } from "@/types/distro";
import Link from "next/link";

export default async function ComparePage({ searchParams}: { searchParams?: Promise<{ distros?: string }> }) {
  const paramsResolved = await searchParams;

  const slugs = paramsResolved?.distros
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) as string[];

  const distros: Distro[] = slugs
    .map((slug) => getDistroBySlug(slug))
    .filter(Boolean) as Distro[];

  return (
    <section className="compare-page">
      <header className="compare-header">
        <h1>Compare Distributions</h1>
        <Link href="/" className="back-btn">
          Back to Distro list
        </Link>
      </header>
      {distros.length > 1 && <DistroComparisonView distros={distros} />}
    </section>
  );
}
