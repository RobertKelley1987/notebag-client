import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type DropdownOpenContextType = {
  dropdownOpen: boolean;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

const DEFAULT = {
  dropdownOpen: false,
  setDropdownOpen: () => null,
};

export const DropdownOpenContext =
  createContext<DropdownOpenContextType>(DEFAULT);
