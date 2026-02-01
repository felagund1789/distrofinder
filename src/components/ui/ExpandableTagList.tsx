import { useState } from "react";
import Tag from "./Tag";

interface ExpandableTagListProps {
  tags: string[];
  maxVisible?: number;
  tagVariant?: "default" | "subtle";
  tagName?: string;
}

export default function ExpandableTagList({
  tags,
  maxVisible = 3,
  tagVariant = "default",
  tagName = "tag",
}: ExpandableTagListProps) {
  const [expanded, setExpanded] = useState(false);

  if (!tags || tags.length === 0) return null;

  const total = tags.length;
  const visibleTags = expanded ? tags : tags.slice(0, maxVisible);

  return (
    <>
      {visibleTags.map((t) => (
        <Tag key={t} label={t.trim()} />
      ))}

      {total > maxVisible && (
        <button
          type="button"
          className="expandable-tag-btn"
          onClick={(e) => {
            e.preventDefault();
            setExpanded((s) => !s);
          }}
          aria-expanded={expanded}
          title={expanded ? `Show fewer ${tagName}s` : `Show all ${total} ${tagName}s`}
        >
          <Tag
            label={expanded ? `Show less` : `+${total - maxVisible}`}
            variant={tagVariant}
          />
        </button>
      )}
    </>
  );
}
