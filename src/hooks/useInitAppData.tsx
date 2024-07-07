import { useContext, useEffect, useState } from "react";
import { UserNotesContext } from "../context/UserNotesContext";
import { UserTagsContext } from "../context/UserTagsContext";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";

export function useInitAppData() {
  const { setUserNotes } = useContext(UserNotesContext);
  const { setUserTags } = useContext(UserTagsContext);
  const notes = useNoteService();
  const tags = useTagService();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const [notesData, tagsData] = await Promise.all([
          notes.findAll(),
          tags.findAll(),
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
      notes.abort();
      tags.abort();
    };
  }, [error]);

  return { isLoading, setIsLoading, error, setError };
}
