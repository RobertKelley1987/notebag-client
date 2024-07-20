import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

// Hook to confirm note context is accessed within note provider.
export function useNote() {
  const noteContext = useContext(NoteContext);
  if (!noteContext)
    throw new Error("Use NoteContext.Provider to access this context.");

  return noteContext;
}
