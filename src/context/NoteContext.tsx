import { createContext } from "react";
import type { Note } from "../types";

type NoteContextType = {
  note: Note;
};

export const DEFAULT = {
  note: {
    id: "",
    title: "",
    content: "",
    tags: [],
  },
};

export const NoteContext = createContext<NoteContextType>(DEFAULT);
