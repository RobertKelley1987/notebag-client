import { useEffect, useState } from "react";
import { useNoteService } from "./useNoteService";
import type { Note as NoteType } from "../types";

export function useUserNotes() {
  const [userNotes, setUserNotes] = useState<NoteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const notes = useNoteService();

  useEffect(() => {
    const getNotes = async () => {
      const data = await notes.findAll();
      setUserNotes(data.notes);
      setIsLoading(false);
    };

    getNotes();
  }, []);

  return { userNotes, setUserNotes, isLoading };
}
