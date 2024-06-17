import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../types";

type UserTagsContextType = {
  userTags: Tag[];
  setUserTags: Dispatch<SetStateAction<Tag[]>>;
  isLoading: boolean;
};

const DEFAULT = {
  userTags: [],
  setUserTags: () => null,
  isLoading: true,
};

export default createContext<UserTagsContextType>(DEFAULT);
