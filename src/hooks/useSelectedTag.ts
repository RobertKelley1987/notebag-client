import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Tag } from "../types";

// Hook to find tag in array of tags using tag id from url.
// Requires array of tags as arg.
export function useSelectedTag(tags: Tag[]) {
  const { tagId } = useParams();
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  useEffect(() => {
    const selectedTag = tags.find((tag) => tag.id === tagId) || null;
    setSelectedTag(selectedTag);
  }, [tagId]);

  return { selectedTag };
}
