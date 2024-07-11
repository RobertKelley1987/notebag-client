import { useContext } from "react";
import { NoteFormContext } from "../context/NoteFormContext";

export function useNoteForm() {
  const noteFormContext = useContext(NoteFormContext);
  if (!noteFormContext) {
    throw new Error("Use NoteFormContext.Provider to access this context.");
  }

  return noteFormContext;
}
