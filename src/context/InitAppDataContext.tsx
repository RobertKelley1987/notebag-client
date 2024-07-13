import { createContext, useEffect, useState } from "react";
import { useUserNotes } from "../hooks/useUserNotes";
import { useUserTags } from "../hooks/useUserTags";
import { useNoteService } from "../hooks/useNoteService";
import { useTagService } from "../hooks/useTagService";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type InitAppDataContextType = {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const InitAppDataContext = createContext<InitAppDataContextType | null>(
  null
);

type InitAppDataContextProviderProps = {
  children: ReactNode;
};

export default function InitAppDataContextProvider({
  children,
}: InitAppDataContextProviderProps) {
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

  return (
    <InitAppDataContext.Provider
      value={{ error, setError, isLoading, setIsLoading }}
    >
      {children}
    </InitAppDataContext.Provider>
  );
}
