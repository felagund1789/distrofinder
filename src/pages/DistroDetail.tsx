import { useParams } from "react-router-dom";
import DefinitionRow from "../components/ui/DefinitionRow";
import StatusBadge from "../components/ui/StatusBadge";
import Tag from "../components/ui/Tag";
import { useDistros } from "../context/DistroContext";

export default function DistroDetail() {
  const { slug } = useParams();
  const { getBySlug } = useDistros();
  const distro = slug ? getBySlug(slug) : undefined;

  if (!distro) {
    return <p>Distro not found.</p>;
  }

  const logo = (() => {
    if (distro.localPaths?.logo) {
      const normalized = distro.localPaths?.logo.replace(/\\\\|\\/g, "/");
      return normalized.startsWith("/") ? normalized : `/${normalized}`;
    }
    return distro.logo || "";
  })();

  const screenshot = (() => {
    if (distro.localPaths?.screenshot) {
      const normalized = distro.localPaths?.screenshot.replace(/\\\\|\\/g, "/");
      return normalized.startsWith("/") ? normalized : `/${normalized}`;
    }
    return distro.screenshot || "";
  })();

  return (
    <article className="detail">
      <header className="distro-hero">
        <div className="distro-hero__identity">
          <div className="distro-hero__logo-wrap">
            <img
              src={logo}
              alt={`${distro.name} logo`}
              className="distro-hero__logo"
            />
          </div>

          <div className="distro-hero__title">
            <h1>{distro.name}</h1>
            <StatusBadge status={distro.status} />
          </div>
        </div>

        <div className="distro-hero__meta">
          {distro.basedOn && (
            <div className="distro-hero__meta-item">
              <span className="label">Based on</span>
              <span>{distro.basedOn}</span>
            </div>
          )}

          <div className="distro-hero__meta-item">
            <span className="label">Origin</span>
            <span>{distro.origin}</span>
          </div>

          <div className="distro-hero__meta-item">
            <span className="label">OS Type</span>
            <span>{distro.osType}</span>
          </div>
        </div>
      </header>

      <section className="detail-section">
        <img
          src={screenshot}
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
          {distro.desktop?.split(",").map((d) => (
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
