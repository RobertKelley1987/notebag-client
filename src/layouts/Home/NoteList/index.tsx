import { useSearchParams } from "react-router-dom";
import { useUserNotes } from "../../../hooks/useUserNotes";
import NoteGrid from "../../../components/NoteGrid";
import ZeroNotes from "./ZeroNotes";
import type { Note as NoteType } from "../../../types";

// Helper to determine if a note has the specified tag.
function noteHasTag(note: NoteType, tagName: string) {
  return note.tags.findIndex((tag) => tag.name === tagName) !== -1;
}

function NoteList() {
  let { userNotes } = useUserNotes();
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  // If tag filter does exist, filter away my friend.
  if (tagFilter) {
    userNotes = userNotes.filter((note) => noteHasTag(note, tagFilter));
  }

  return userNotes.length > 0 ? <NoteGrid notes={userNotes} /> : <ZeroNotes />;
}

export default NoteList;
