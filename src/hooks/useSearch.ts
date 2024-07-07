import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserNotesContext } from "../context/UserNotesContext";
import type { Note } from "../types";

function noteHasStr(note: Note, str: string) {
  str = str.toLowerCase();
  const title = note.title.toLowerCase();
  const content = note.content.toLowerCase();
  return title.includes(str) || content.includes(str);
}

export function useSearch() {
  const { userNotes } = useContext(UserNotesContext);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const results = userNotes.filter((note) => noteHasStr(note, search));
  return { results };
}
