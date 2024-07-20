import { useUserNotes } from "./useUserNotes";

// Hook to provide data for a single note using the selected id from user notes
// context.
export function useSelectedNote() {
  const { userNotes, selected } = useUserNotes();
  const selectedNote = userNotes.find((note) => note.id === selected);

  if (!selectedNote)
    throw new Error("The note selected for editing does not exist.");

  return { selectedNote };
}
