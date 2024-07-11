import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type DropdownContextType = {
  dropdownOpen: boolean;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
  editingTags: boolean;
  setEditingTags: Dispatch<SetStateAction<boolean>>;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

type DropdownContextProviderProps = {
  children: ReactNode;
};

function DropdownContextProvider({ children }: DropdownContextProviderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingTags, setEditingTags] = useState(false);

  return (
    <DropdownContext.Provider
      value={{ dropdownOpen, setDropdownOpen, editingTags, setEditingTags }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

export default DropdownContextProvider;
