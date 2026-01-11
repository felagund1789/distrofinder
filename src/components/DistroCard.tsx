import type { Distro } from "../types";

interface Props {
  distro: Distro;
}

export default function DistroCard({ distro }: Props) {
  const local = distro.localPaths?.thumbnail || distro.localPaths?.screenshot || distro.localPaths?.logo;
  const thumb = (() => {
    if (local) {
      const normalized = local.replace(/\\\\|\\/g, '/');
      return normalized.startsWith('/') ? normalized : `/${normalized}`;
    }
    return distro.thumbnail || distro.screenshot || distro.logo || '';
  })();
  return (
    <article className="group bg-slate-800 hover:bg-slate-700 transition p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={thumb}
          alt={`${distro.name} logo`}
          className="w-16 h-16 object-contain rounded-md bg-slate-900 p-1"
          loading="lazy"
        />
        <div className="flex-1 text-left">
          <h3 className="text-white text-lg font-medium">{distro.name}</h3>
          <p className="text-sm text-slate-400">
            {distro.origin || "—"} • {distro.desktop || "—"}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-300 max-h-14 overflow-hidden">
        {distro.description}
      </p>
    </article>
  );
}
