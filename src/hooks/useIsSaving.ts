import { useContext } from "react";
import { IsSavingContext } from "../context/IsSavingContext";

export function useIsSaving() {
  const isSavingContext = useContext(IsSavingContext);
  if (!isSavingContext) {
    throw new Error("Use IsSavingContext.Provider to access this context.");
  }

  return isSavingContext;
}
