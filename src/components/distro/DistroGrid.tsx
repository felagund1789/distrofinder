import { useDistros } from "../../context/DistroContext";
import DistroCard from "./DistroCard";

export default function DistroGrid() {
  const { distros } = useDistros();

  return (
    <div className="grid">
      {distros.map((distro) => (
        <DistroCard key={distro.slug} distro={distro} />
      ))}
    </div>
  );
}
