import { useUserNotes } from "./useUserNotes";

export function useSelectedNote() {
  const { userNotes, selected } = useUserNotes();
  const selectedNote = userNotes.find((note) => note.id === selected);

  if (!selectedNote)
    throw new Error("The note selected for editing does not exist.");

  return { selectedNote };
}
