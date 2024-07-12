import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export function useNote() {
  const noteContext = useContext(NoteContext);
  if (!noteContext)
    throw new Error("Use NoteContext.Provider to access this context.");

  return noteContext;
}
