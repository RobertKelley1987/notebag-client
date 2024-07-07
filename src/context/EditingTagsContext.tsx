import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type EditingTagsContextType = {
  editingTags: boolean;
  setEditingTags: Dispatch<SetStateAction<boolean>>;
};

const DEFAULT = {
  editingTags: false,
  setEditingTags: () => null,
};

export const EditingTagsContext =
  createContext<EditingTagsContextType>(DEFAULT);
