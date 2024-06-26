import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Note } from "../types";

type UserNotesContextType = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  userNotes: Note[];
  setUserNotes: Dispatch<SetStateAction<Note[]>>;
};

const DEFAULT = {
  selected: "",
  setSelected: () => null,
  userNotes: [],
  setUserNotes: () => null,
};

export default createContext<UserNotesContextType>(DEFAULT);
