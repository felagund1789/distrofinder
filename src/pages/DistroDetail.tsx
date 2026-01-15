import DefinitionRow from "../components/ui/DefinitionRow";
import StatusBadge from "../components/ui/StatusBadge";
import Tag from "../components/ui/Tag";
import { useDistros } from "../context/DistroContext";

interface Props {
  slug: string;
}

export default function DistroDetail({ slug }: Props) {
  const { distros } = useDistros();
  const distro = distros.find((d) => d.slug === slug);

  if (!distro) {
    return <p>Distro not found.</p>;
  }

  return (
    <article className="detail">
      <header className="detail-hero">
        <img
          src={distro.localPaths.logo}
          alt={`${distro.name} logo`}
          className="detail-logo"
        />
        <div>
          <h1>{distro.name}</h1>
          <p className="muted">{distro.basedOn}</p>
          <div className="detail-hero-meta">
            <StatusBadge status={distro.status} />
            <span className="muted">Origin: {distro.origin}</span>
            <span className="muted">OS: {distro.osType}</span>
          </div>
        </div>
      </header>

      <section className="detail-section">
        <img
          src={distro.localPaths.screenshot}
          alt={`${distro.name} screenshot`}
          className="detail-screenshot"
        />
      </section>

      <section className="detail-section">
        <h2>About</h2>
        <p className="detail-description">{distro.description}</p>
      </section>

      <section className="detail-section">
        <h2>Technical Overview</h2>
        <DefinitionRow label="Architecture">
          {distro.architecture.split(",").map((a) => (
            <Tag key={a} label={a.trim()} variant="subtle" />
          ))}
        </DefinitionRow>
        <DefinitionRow label="Desktop">
          {distro.desktop.split(",").map((d) => (
            <Tag key={d} label={d.trim()} />
          ))}
        </DefinitionRow>
        <DefinitionRow label="Category">
          {distro.category.split(",").map((c) => (
            <Tag key={c} label={c.trim()} variant="subtle" />
          ))}
        </DefinitionRow>
        <DefinitionRow label="Based On">
          <span>{distro.basedOn}</span>
        </DefinitionRow>
      </section>

      <footer className="detail-footer">
        <DefinitionRow label="Last Update">
          <span>{distro.lastUpdate}</span>
        </DefinitionRow>
        <DefinitionRow label="Slug">
          <code>{distro.slug}</code>
        </DefinitionRow>
      </footer>
    </article>
  );
}
