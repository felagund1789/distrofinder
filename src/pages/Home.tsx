import { Route, Routes } from "react-router-dom";
import DistroGrid from "../components/distro/DistroGrid";
import AppLayout from "../components/layout/AppLayout";
import { useDistros } from "../context/DistroContext";
import DistroDetail from "./DistroDetail";

export default function Home() {
  const { distros } = useDistros();

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DistroGrid distros={distros} />} />
        <Route path="/d/:slug" element={<DistroDetail />} />
      </Routes>
    </AppLayout>
  );
}
