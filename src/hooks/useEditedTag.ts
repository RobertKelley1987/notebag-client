import { useContext } from "react";
import { EditedTagContext } from "../context/EditedTagContext";

export function useEditedTag() {
  const editedTagContext = useContext(EditedTagContext);
  if (!editedTagContext) {
    throw new Error("Use EditedTagContext.Provider to access this context.");
  }

  return editedTagContext;
}
