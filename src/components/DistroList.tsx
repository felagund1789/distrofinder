import type { Distro } from "../types";
import DistroCard from "./DistroCard";
import "./DistroList.css";

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
    <main className="list">
      <div className="container">
        <p className="count">Showing {filtered.length} distributions</p>
        <div className="grid">
          {filtered.map((d) => (
            <DistroCard key={d.slug} distro={d} />
          ))}
        </div>
      </div>
    </main>
  );
}
