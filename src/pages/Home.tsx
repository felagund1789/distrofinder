import { Route, Routes } from "react-router-dom";
import DistroGrid from "../components/distro/DistroGrid";
import AppLayout from "../components/layout/AppLayout";
import DistroDetail from "./DistroDetail";

export default function Home() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DistroGrid />} />
        <Route path="/d/:slug" element={<DistroDetail />} />
      </Routes>
    </AppLayout>
  );
}
