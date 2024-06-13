import { useEffect, useState } from "react";
import notes from "../services/notes";
import type { Note as NoteType } from "../types";

export function useUserNotes() {
  const [userNotes, setUserNotes] = useState<NoteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      const res = await notes.findAll();
      setUserNotes(res.notes);
      setIsLoading(false);
    };

    getNotes();
  }, []);

  return { userNotes, setUserNotes, isLoading };
}
