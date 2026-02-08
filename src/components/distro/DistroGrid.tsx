"use client";

import { Distro } from "@/types/distro";
import Link from "next/link";
import { Suspense, useState } from "react";
import { CompareFAB } from "../compare/CompareFAB";
import DistroWizardCallout from "../wizard/DistroWizardCallout";
import DistroCard from "./DistroCard";
import Filters from "./Filters";

export default function DistroGrid() {
  const [distros, setDistros] = useState<readonly Distro[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < 3
          ? [...prev, slug]
          : prev,
    );
  };

  return (
    <>
      <DistroWizardCallout />

      <Suspense fallback={<div>Loading filters...</div>}>
        <Filters onDistrosChange={(distros) => setDistros(distros)} />
      </Suspense>

      <Suspense fallback={<div>Loading distros...</div>}>
        <section className="grid">
          {distros.map((distro) => (
            <Link key={distro.slug} href={`/distro/${distro.slug}`}>
              <DistroCard
                key={distro.slug}
                distro={distro}
                selected={selected.includes(distro.slug)}
                selectionDisabled={
                  selected.length >= 3 && !selected.includes(distro.slug)
                }
                onToggleSelect={toggleSelection}
              />
            </Link>
          ))}
        </section>
      </Suspense>

      <CompareFAB selected={selected} />
    </>
  );
}
