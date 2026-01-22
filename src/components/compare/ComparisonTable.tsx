import type { Distro } from "../../types/distro";
import StatusBadge from "../ui/StatusBadge";
import Tag from "../ui/Tag";

interface ComparisonTableProps {
  distros: Distro[];
}

function ComparisonRow({
  label,
  children
}: {
  label: string;
  children: React.ReactNode[];
}) {
  return (
    <tr>
      <th scope="row" className="comparison-label">
        {label}
      </th>
      {children.map((child, i) => (
        <td key={i}>{child}</td>
      ))}
    </tr>
  );
}

function TagList({ value }: { value?: string }) {
  if (!value) return <span>—</span>;

  return (
    <div className="comparison-tags">
      {value.split(",").map(v => (
        <Tag key={v.trim()} label={v.trim()} />
      ))}
    </div>
  );
}

export default function ComparisonTable({ distros }: ComparisonTableProps) {
  return (
    <div className="comparison-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th scope="col"></th>
            {distros.map(distro => (
              <th scope="col" key={distro.slug}>
                <div className="comparison-header">
                  <img
                    src={distro.localPaths?.logo || ""}
                    alt=""
                    className="comparison-logo"
                  />
                  <span>{distro.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <ComparisonRow label="">
            {distros.map(d => (
              <img
                key={d.slug}
                className="comparison-thumbnail"
                src={d.localPaths?.thumbnail || ""} alt="" />
            ))}
          </ComparisonRow>

          <ComparisonRow label="Status">
            {distros.map(d => (
              <StatusBadge key={d.slug} status={d.status} />
            ))}
          </ComparisonRow>

          <ComparisonRow label="Based on">
            {distros.map(d => (
              <span key={d.slug}>{d.basedOn || "—"}</span>
            ))}
          </ComparisonRow>

          <ComparisonRow label="Architecture">
            {distros.map(d => (
              <span key={d.slug}>{d.architecture}</span>
            ))}
          </ComparisonRow>

          <ComparisonRow label="Default Desktop">
            {distros.map(d => (
              <TagList key={d.slug} value={d.defaultDesktop || undefined} />
            ))}
          </ComparisonRow>

          <ComparisonRow label="Available Desktops">
            {distros.map(d => (
              <TagList key={d.slug} value={d.desktop || undefined} />
            ))}
          </ComparisonRow>

          <ComparisonRow label="Default Browser">
            {distros.map(d => (
              <TagList key={d.slug} value={d.defaultBrowser || undefined} />
            ))}
          </ComparisonRow>

          <ComparisonRow label="Installation">
            {distros.map(d => (
              <TagList key={d.slug} value={d.installation || undefined} />
            ))}
          </ComparisonRow>

          <ComparisonRow label="Category">
            {distros.map(d => (
              <TagList key={d.slug} value={d.category} />
            ))}
          </ComparisonRow>

          <ComparisonRow label="Origin">
            {distros.map(d => (
              <span key={d.slug}>{d.origin}</span>
            ))}
          </ComparisonRow>
        </tbody>
      </table>
    </div>
  );
}
