"use client";

import { useNavigate } from "@/hooks/useNavigate";
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
