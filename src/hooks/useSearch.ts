import { useSearchParams } from "react-router-dom";
import { useUserNotes } from "./useUserNotes";
import type { Note } from "../types";

function noteHasStr(note: Note, str: string) {
  str = str.toLowerCase();
  const title = note.title.toLowerCase();
  const content = note.content.toLowerCase();
  return title.includes(str) || content.includes(str);
}

export function useSearch() {
  const { userNotes } = useUserNotes();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const results = userNotes.filter((note) => noteHasStr(note, search));

  return { results };
}
