import { useState } from "react";
import { DropdownOpenContext } from "./DropdownOpenContext";
import type { ReactNode } from "react";

type DropdownOpenContextProviderProps = {
  children: ReactNode;
};

function DropdownOpenContextProvider({
  children,
}: DropdownOpenContextProviderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownOpenContext.Provider value={{ dropdownOpen, setDropdownOpen }}>
      {children}
    </DropdownOpenContext.Provider>
  );
}

export default DropdownOpenContextProvider;
