import DistroGrid from "@/components/distro/DistroGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DistroFinder — Find Your Linux Distribution",
  description: "Discover and compare Linux distributions to find the one that fits your use case and experience level.",
};

export default function HomePage() {
  return <DistroGrid />;
}
