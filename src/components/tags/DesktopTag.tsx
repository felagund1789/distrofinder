import { useNavigate } from "react-router-dom";
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
