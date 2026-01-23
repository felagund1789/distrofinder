import { Route, Routes } from "react-router-dom";
import DistroGrid from "../components/distro/DistroGrid";
import AppLayout from "../components/layout/AppLayout";
import { ScrollToTop } from "../components/routing/ScrollToTop";
import { FindMyDistroWizard } from "../components/wizard/FindMyDistroWizard";
import ComparePage from "./ComparePage";
import DistroDetail from "./DistroDetail";

export default function Home() {
  return (
    <AppLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DistroGrid />} />
        <Route path="/d/:slug" element={<DistroDetail />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/wizard" element={<FindMyDistroWizard />} />
      </Routes>
    </AppLayout>
  );
}
