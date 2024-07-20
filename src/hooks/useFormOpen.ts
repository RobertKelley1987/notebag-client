import { useContext } from "react";
import { FormOpenContext } from "../context/FormOpenContext";

// Hook to confirm form open context is accessed within form open provider.
export function useFormOpen() {
  const formOpenContext = useContext(FormOpenContext);
  if (!formOpenContext) {
    throw new Error("Use FormOpenContext.Provider to access this context.");
  }

  return formOpenContext;
}
