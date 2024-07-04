import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../types";

type NoteTagsContextType = {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
};

const DEFAULT = {
  tags: [],
  setTags: () => null,
};

export const NoteTagsContext = createContext<NoteTagsContextType>(DEFAULT);
