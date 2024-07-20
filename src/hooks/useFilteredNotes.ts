import { useSearchParams } from "react-router-dom";
import { useUserNotes } from "./useUserNotes";
import type { Note } from "../types";

// Helper to determine if a note has the specified tag.
function noteHasTag(note: Note, tagName: string) {
  return note.tags.findIndex((tag) => tag.name === tagName) !== -1;
}

// Hook to return notes filtered by tag name if one exists
// in url search params.
export function useFilteredNotes() {
  const { userNotes } = useUserNotes();
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  // If tag filter is applied in url, filter notes.
  let filteredNotes = [...userNotes];
  if (tagFilter) {
    filteredNotes = userNotes.filter((note) => noteHasTag(note, tagFilter));
  }

  return { filteredNotes };
}
