import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Note } from "../types";

// Hook to find note in array of notes using note id from url.
// Requires array of notes as arg.
export function useSelectedNote(notes: Note[]) {
  const { noteId } = useParams();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Adding useLayoutEffect here made the transition to the edit note modal
  // less jittery / janky.
  useLayoutEffect(() => {
    const selectedNote = notes.find((note) => note.id === noteId) || null;
    setSelectedNote(selectedNote);
  }, [noteId]);

  return { selectedNote };
}
