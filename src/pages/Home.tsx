import { Route, Routes } from "react-router-dom";
import DistroGrid from "../components/distro/DistroGrid";
import AppLayout from "../components/layout/AppLayout";
import DistroDetail from "./DistroDetail";
import { ScrollToTop } from "../components/routing/ScrollToTop";

export default function Home() {
  return (
    <AppLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DistroGrid />} />
        <Route path="/d/:slug" element={<DistroDetail />} />
      </Routes>
    </AppLayout>
  );
}
