import type { ReactNode } from "react";
import "./../../styles/app-layout.css";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <header className="topnav">DistroFinder</header>
      <main>{children}</main>
      <footer className="site-footer" role="contentinfo">
        <div className="site-footer__inner">
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} DistroFinder. All rights reserved. Made
            with React.
          </p>

          <p className="site-footer__disclaimer">
            Data are sourced from DistroWatch. DistroFinder is not affiliated
            with or endorsed by DistroWatch. For more information, packages, and
            distribution insights visit{" "}
            <a
              href="https://distrowatch.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://distrowatch.com
            </a>
            .
          </p>

          <p className="site-footer__repo">
            View the code on{" "}
            <a
              href="https://github.com/felagund1789/distrofinder"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            <img
              src="/github-logo.svg"
              alt="GitHub logo"
              className="site-footer__repo-logo"
            />
          </p>
        </div>
      </footer>
    </div>
  );
}
