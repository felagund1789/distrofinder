import { useNavigate } from "@/hooks/useNavigate";
import Tag from "../ui/Tag";

interface DesktopTagProps {
  desktop: string;
}

export function DesktopTag({ desktop }: DesktopTagProps) {
  const navigate = useNavigate();

  return (
    <Tag
      interactive
      onClick={() => navigate(`/?desktop=${encodeURIComponent(desktop)}`)}
      label={desktop}
    />
  );
}
