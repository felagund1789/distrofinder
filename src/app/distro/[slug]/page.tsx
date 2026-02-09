import DistroDetail from "@/components/distro/DistroDetail";
import { getAllDistros, getDistroBySlug } from "@/data/distroService";

export async function generateStaticParams() {
  return getAllDistros().map((d) => ({ slug: d.slug }));
}

export default async function DistroDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const paramsResolved = await params;
  const distro = paramsResolved?.slug
    ? await getDistroBySlug(paramsResolved.slug)
    : undefined;

  return <DistroDetail distro={distro} />;
}
