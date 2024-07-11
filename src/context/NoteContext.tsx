import { createContext } from "react";
import type { Note } from "../types";

type NoteContextType = {
  note: Note;
};

export const NoteContext = createContext<NoteContextType | null>(null);
