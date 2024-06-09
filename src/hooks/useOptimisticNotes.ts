import { useAsyncValue, useFetcher } from "react-router-dom";
import { Note as NoteType } from "../types";

export function useOptimisticNotes() {
  const fetcher = useFetcher({ key: "new-note-form" });
  const { notes } = useAsyncValue() as { notes: NoteType[] };

  const getOptimisticNotes = (formData: FormData) => {
    const newNote: NoteType = {
      id: formData?.get("noteId") as string,
      title: formData?.get("title") as string,
      content: formData?.get("content") as string,
    };
    return [newNote, ...notes];
  };

  return {
    optimisticNotes: fetcher.formData
      ? getOptimisticNotes(fetcher.formData)
      : notes,
  };
}
