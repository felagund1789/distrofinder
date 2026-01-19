interface TagProps {
  label: string;
  variant?: "default" | "subtle";
  onClick?: () => void;
  interactive?: boolean;
}

export default function Tag({
  label,
  variant = "default",
  interactive,
  onClick,
}: TagProps) {
  return (
    <span
      className={`tag ${variant} ${interactive ? "interactive" : ""}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
}
