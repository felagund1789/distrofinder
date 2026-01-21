import { useNavigate, useParams } from "react-router-dom";
import DefinitionRow from "../components/ui/DefinitionRow";
import StatusBadge from "../components/ui/StatusBadge";
import { useDistros } from "../context/DistroContext";
import { DesktopTag } from "../components/tags/DesktopTag";
import { CategoryTag } from "../components/tags/CategoryTag";

const splitValues = (value?: string | null) =>
  value
    ? value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

export default function DistroDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
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
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <button className="breadcrumbs__link" onClick={() => navigate("/")}>
          Home
        </button>
        <span className="breadcrumbs__separator">/</span>
        <span className="breadcrumbs__current">{distro.name}</span>
      </nav>
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

          {distro.popularity != null && (
            <div className="distro-hero__meta-item">
              <span className="label">Popularity</span>
              <span>{distro.popularity}</span>
            </div>
          )}

          {(distro.rating != null || distro.reviewCount != null) && (
            <div className="distro-hero__meta-item">
              <span className="label">Rating</span>
              <span>
                {distro.rating != null ? distro.rating : '—'}
                {distro.reviewCount != null ? ` (${distro.reviewCount})` : ''}
              </span>
            </div>
          )}
        </div>
      </header>

      <section className="distro-about">
        <div className="distro-about__content">
          <h2>About</h2>
          <p>{distro.description}</p>
        </div>

        <div className="distro-about__media">
          {screenshot && (
            <img
              src={screenshot}
              alt={`${distro.name} screenshot`}
              loading="lazy"
            />
          )}
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
          <DefinitionRow label="Desktop">
            <div className="definition-tags">
              {splitValues(distro.desktop).map((desktop) => (
                <DesktopTag key={desktop} desktop={desktop} />
              ))}
            </div>
          </DefinitionRow>

          <DefinitionRow label="Category">
            <div className="definition-tags">
              {splitValues(distro.category).map((category) => (
                <CategoryTag key={category} category={category} />
              ))}
            </div>
          </DefinitionRow>
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
