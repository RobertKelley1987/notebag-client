import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../types";

type NoteTagsContextType = {
  noteTags: Tag[];
  setNoteTags: Dispatch<SetStateAction<Tag[]>>;
};

const DEFAULT = {
  noteTags: [],
  setNoteTags: () => null,
};

export const NoteTagsContext = createContext<NoteTagsContextType>(DEFAULT);
