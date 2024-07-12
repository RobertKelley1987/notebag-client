import { useFilteredNotes } from "./useFilteredNotes";

export function usePinnedNotes() {
  const { filteredNotes } = useFilteredNotes();
  const pinned = filteredNotes.filter((note) => note.pinned);
  const unpinned = filteredNotes.filter((note) => !note.pinned);

  return { pinned, unpinned };
}
