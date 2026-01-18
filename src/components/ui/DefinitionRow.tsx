import type { ReactNode } from "react";

interface DefinitionRowProps {
  label: string;
  children: ReactNode;
}

export default function DefinitionRow({ label, children }: DefinitionRowProps) {
  return (
    <div className="definition-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
