import { useNavigate } from "react-router-dom";
import Tag from "../ui/Tag";

interface CategoryTagProps {
  category: string;
}

export function CategoryTag({ category }: CategoryTagProps) {
  const navigate = useNavigate();

  return (
    <Tag
      interactive
      onClick={() => navigate(`/?category=${encodeURIComponent(category)}`)}
      label={category}
    />
  );
}
