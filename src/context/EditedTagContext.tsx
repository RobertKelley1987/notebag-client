import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../types";

type EditedTagContextType = {
  editedTag: Tag | null;
  setEditedTag: Dispatch<SetStateAction<Tag | null>>;
};

const DEFAULT = {
  editedTag: null,
  setEditedTag: () => null,
};

export const EditedTagContext = createContext<EditedTagContextType>(DEFAULT);
