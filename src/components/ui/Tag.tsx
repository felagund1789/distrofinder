interface TagProps {
  label: string;
  variant?: "default" | "subtle";
}

export default function Tag({ label, variant = "default" }: TagProps) {
  return <span className={`tag ${variant}`}>{label}</span>;
}
