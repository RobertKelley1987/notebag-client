import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Note } from "../types";

type SearchContextType = {
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  results: Note[];
};

const DEFAULT = {
  isSearching: false,
  setIsSearching: () => null,
  search: "",
  setSearch: () => null,
  results: [],
};

export const SearchContext = createContext<SearchContextType>(DEFAULT);
