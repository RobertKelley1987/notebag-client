import { useContext } from "react";
import { EditedTagContext } from "../context/EditedTagContext";

// Hook to confirm edited tag context is accessed within edited tag provider.
export function useEditedTag() {
  const editedTagContext = useContext(EditedTagContext);
  if (!editedTagContext) {
    throw new Error("Use EditedTagContext.Provider to access this context.");
  }

  return editedTagContext;
}
