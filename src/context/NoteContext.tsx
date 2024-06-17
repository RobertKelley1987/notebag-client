import { createContext } from "react";
import type { Note } from "../types";

type NoteContextType = {
  note: Note;
};

const DEFAULT = {
  note: {
    id: "",
    title: "",
    content: "",
    tags: [],
  },
};

export default createContext<NoteContextType>(DEFAULT);