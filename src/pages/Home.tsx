import DistroGrid from "../components/distro/DistroGrid";
import AppLayout from "../components/layout/AppLayout";
import { useDistros } from "../context/DistroContext";

export default function Home() {
  const { distros } = useDistros();

  return (
    <AppLayout>
      <DistroGrid distros={distros} />
    </AppLayout>
  );
}
