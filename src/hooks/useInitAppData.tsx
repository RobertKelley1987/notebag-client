import { useEffect, useState } from "react";
import { useUserNotes } from "./useUserNotes";
import { useUserTags } from "./useUserTags";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";

export function useInitAppData() {
  const { setUserNotes } = useUserNotes();
  const { setUserTags } = useUserTags();
  const noteService = useNoteService();
  const tagService = useTagService();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const [notesData, tagsData] = await Promise.all([
          noteService.findAll(),
          tagService.findAll(),
        ]);
        if (isMounted) {
          setUserNotes(notesData.notes);
          setUserTags(tagsData.tags);
          setIsLoading(false);
        }
      } catch (error) {
        setError(true);
      }
    };

    getData();

    return () => {
      isMounted = false;
      noteService.abort();
      tagService.abort();
    };
  }, [error]);

  return { isLoading, setIsLoading, error, setError };
}
