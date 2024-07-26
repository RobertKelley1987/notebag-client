import { useFilteredNotes } from "./useFilteredNotes";
import { comparePinnedTimes } from "../lib/notes";

// Hook to split user notes into 2 arrays: one array of pinned notes
// and a second array containing all other notes.
export function usePinnedNotes() {
  const { filteredNotes } = useFilteredNotes();
  const pinned = filteredNotes.filter((note) => note.pinned);
  pinned.sort(comparePinnedTimes);
  const unpinned = filteredNotes.filter((note) => !note.pinned);

  pinned.forEach((note) => {
    console.log(note.pinnedAt);
  });
  return { pinned, unpinned };
}
