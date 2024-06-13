import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Note } from "../types";

type UserContextType = {
  userNotes: Note[];
  setUserNotes: Dispatch<SetStateAction<Note[]>>;
  isLoading: boolean;
};

const DEFAULT = {
  userNotes: [],
  setUserNotes: () => null,
  isLoading: true,
};

export default createContext<UserContextType>(DEFAULT);
