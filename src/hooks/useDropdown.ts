import { useContext } from "react";
import { DropdownContext } from "../context/DropdownContext";

// Hook to confirm dropdown context is accessed within dropdown provider.
export function useDropdown() {
  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) {
    throw new Error("Use DropdownContext.Provider to access this context.");
  }

  return dropdownContext;
}
