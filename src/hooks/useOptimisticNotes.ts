import { useEffect, useState } from "react";
import { useAsyncValue, useFetcher } from "react-router-dom";
import { Note as NoteType } from "../types";

export function useOptimisticNotes() {
  const fetcher = useFetcher({ key: "note-form" });
  const { notes: dbNotes } = useAsyncValue() as { notes: NoteType[] };
  const [notes, setNotes] = useState<NoteType[]>(dbNotes);

  useEffect(() => {
    if (fetcher.formData) getOptimisticNotes(fetcher.formData);
  }, [fetcher.formData]);

  const getOptimisticNotes = (formData: FormData) => {
    const newNote: NoteType = {
      id: formData?.get("noteId") as string,
      title: formData?.get("title") as string,
      content: formData?.get("content") as string,
    };

    if (fetcher.formMethod == "post") {
      setNotes([newNote, ...notes]);
    } else if (fetcher.formMethod === "put") {
      const updated = [...notes];
      const noteIndex = updated.findIndex((note) => note.id === newNote.id);
      updated.splice(noteIndex, 1, newNote);
      setNotes(updated);
    }
  };

  return {
    optimisticNotes: notes,
  };
}
