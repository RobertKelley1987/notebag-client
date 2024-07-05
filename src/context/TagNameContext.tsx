import { createContext } from "react";
import type { Tag } from "../types";

type TagNameContextType = {
  updateTagName: (editedTag: Tag, closeFn: () => void) => Promise<void>;
};

const DEFAULT = {
  updateTagName: (tag: Tag, closeFn: () => void) =>
    new Promise<void>((res) => null),
};

export const TagNameContext = createContext<TagNameContextType>(DEFAULT);
