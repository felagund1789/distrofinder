import DistroComparisonView from "@/components/compare/DistroComparisonView";
import { getDistroBySlug } from "@/data/distroService";
import type { Distro } from "@/types/distro";

export default function ComparePage({ searchParams }: { searchParams?: { distros?: string } }) {
  const raw = searchParams?.distros ?? "";

  const slugs = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as string[];

  const distros: Distro[] = slugs
    .map((slug) => getDistroBySlug(slug))
    .filter(Boolean) as Distro[];

  if (distros.length < 2) return null;

  return <DistroComparisonView distros={distros} />;
}
