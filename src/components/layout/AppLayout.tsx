import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function AppLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="layout">
    <header className="topnav" onClick={() => navigate("/")}>DistroFinder</header>
      <main>{children}</main>
    </div>
  );
}
