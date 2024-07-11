import { useContext } from "react";
import { FormOpenContext } from "../context/FormOpenContext";

export function useFormOpen() {
  const formOpenContext = useContext(FormOpenContext);
  if (!formOpenContext) {
    throw new Error("Use FormOpenContext.Provider to access this context.");
  }

  return formOpenContext;
}
