import { useParams } from "react-router-dom";
import DefinitionRow from "../components/ui/DefinitionRow";
import StatusBadge from "../components/ui/StatusBadge";
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

      <section className="distro-about">
        <div className="distro-about__content">
          <h2>About</h2>
          <p>{distro.description}</p>
        </div>

        <div className="distro-about__media">
          <img
            src={screenshot}
            alt={`${distro.name} screenshot`}
            loading="lazy"
          />
        </div>
      </section>

      <section className="distro-tech">
        <h2>Technical Overview</h2>

        <div className="distro-tech__group">
          <DefinitionRow label="OS Type">{distro.osType}</DefinitionRow>
          <DefinitionRow label="Based on">{distro.basedOn}</DefinitionRow>
          <DefinitionRow label="Architecture">
            {distro.architecture}
          </DefinitionRow>
        </div>

        <div className="distro-tech__group">
          <DefinitionRow label="Desktop">{distro.desktop}</DefinitionRow>
          <DefinitionRow label="Category">{distro.category}</DefinitionRow>
        </div>

        <div className="distro-tech__group">
          <DefinitionRow label="Status">{distro.status}</DefinitionRow>
          <DefinitionRow label="Origin">{distro.origin}</DefinitionRow>
          <DefinitionRow label="Last Update">{distro.lastUpdate}</DefinitionRow>
        </div>
      </section>

      <footer className="detail-footer">
        <DefinitionRow label="Slug">
          <code>{distro.slug}</code>
        </DefinitionRow>
      </footer>
    </article>
  );
}
