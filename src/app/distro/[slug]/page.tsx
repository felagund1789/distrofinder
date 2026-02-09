import DistroDetail from "@/components/distro/DistroDetail";
import { getDistroBySlug } from "@/data/distroService";

export default function DistroDetailPage({
  params,
}: {
  params: { slug?: string };
}) {
  const distro = params?.slug ? getDistroBySlug(params.slug) : undefined;

  return <DistroDetail distro={distro} />;
}
