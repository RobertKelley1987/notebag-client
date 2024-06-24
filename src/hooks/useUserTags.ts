import { useEffect, useState } from "react";
import { useTagService } from "./useTagService";
import type { Tag as TagType } from "../types";

export function useUserTags() {
  const [userTags, setUserTags] = useState<TagType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const tags = useTagService();

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
