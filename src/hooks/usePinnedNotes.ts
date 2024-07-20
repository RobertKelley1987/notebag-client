import { useFilteredNotes } from "./useFilteredNotes";

// Hook to split user notes into 2 arrays: one array of pinned notes
// and a second array containing all other notes.
export function usePinnedNotes() {
  const { filteredNotes } = useFilteredNotes();
  const pinned = filteredNotes.filter((note) => note.pinned);
  const unpinned = filteredNotes.filter((note) => !note.pinned);

  return { pinned, unpinned };
}
