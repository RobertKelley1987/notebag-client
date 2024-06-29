import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../types";

type UserTagsContextType = {
  userTags: Tag[];
  setUserTags: Dispatch<SetStateAction<Tag[]>>;
};

const DEFAULT = {
  userTags: [],
  setUserTags: () => null,
};

export const UserTagsContext = createContext<UserTagsContextType>(DEFAULT);
