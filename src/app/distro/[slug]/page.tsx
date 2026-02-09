import DistroDetail from "@/components/distro/DistroDetail";
import { getDistroBySlug } from "@/data/distroService";

export default async function DistroDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsResolved = await params;
  const distro = paramsResolved?.slug ? await getDistroBySlug(paramsResolved.slug) : undefined;

  return <DistroDetail distro={distro} />;
}
