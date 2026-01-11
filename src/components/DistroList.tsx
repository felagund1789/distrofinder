import type { Distro } from "../types";
import DistroCard from "./DistroCard";

interface Props {
  distros: Distro[];
  query: string;
}

export default function DistroList({ distros, query }: Props) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? distros.filter((d) =>
        [d.name, d.origin, d.desktop, d.slug]
          .filter(Boolean)
          .some((s) => s!.toLowerCase().includes(q))
      )
    : distros;

  return (
    <main className="px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-slate-400 mb-4">
          Showing {filtered.length} distributions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <DistroCard key={d.slug} distro={d} />
          ))}
        </div>
      </div>
    </main>
  );
}
