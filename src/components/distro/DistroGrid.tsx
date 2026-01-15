import type { Distro } from "../../types/distro";
import DistroCard from "./DistroCard";

interface Props {
  distros: Distro[];
}

export default function DistroGrid({ distros }: Props) {
  return (
    <div className="grid">
      {distros.map((distro) => (
        <DistroCard key={distro.slug} distro={distro} />
      ))}
    </div>
  );
}
