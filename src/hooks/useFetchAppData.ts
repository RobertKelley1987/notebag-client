import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useDemo } from "./useDemo";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";
import { useUserNotes } from "./useUserNotes";
import { useUserTags } from "./useUserTags";
import { demoTags, demoNotes } from "../demo-data";

// Hook to fetch user's notes and tags when app first renders and return
// loading and error state of intial fetch. Also redirects user to login
// if refresh token is expired.
export function useFetchAppData() {
  const { isDemo } = useDemo();
  const { setUserNotes } = useUserNotes();
  const { setUserTags } = useUserTags();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const noteService = useNoteService();
  const tagService = useTagService();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      // If in demo mode, get app data from local file.
      if (isDemo) {
        setUserTags(demoTags);
        setUserNotes(demoNotes);
        setIsLoading(false);
        return;
      }

      // Otherwise get user's data from db
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
        if (error instanceof AxiosError) {
          const status = error?.response?.status;
          if (status === 403 || status === 401) {
            navigate("/login", { state: { from: location }, replace: true });
            return;
          }
        }
        setError(true);
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
      noteService.abort();
      tagService.abort();
    };
  }, [error]);

  return { error, setError, isLoading, setIsLoading };
}
