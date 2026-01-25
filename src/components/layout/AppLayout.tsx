import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <header className="topnav">DistroFinder</header>
      <main>{children}</main>
    </div>
  );
}
