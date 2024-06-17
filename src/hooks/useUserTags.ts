import { useEffect, useState } from "react";
import tags from "../services/tags";
import type { Tag as TagType } from "../types";

export function useUserTags() {
  const [userTags, setUserTags] = useState<TagType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTags = async () => {
      const res = await tags.findAll();
      setUserTags(res.tags);
      setIsLoading(false);
    };

    getTags();
  }, []);

  return { userTags, setUserTags, isLoading };
}
