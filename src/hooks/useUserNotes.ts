import { useContext } from "react";
import { UserNotesContext } from "../context/UserNotesContext";

export function useUserNotes() {
  const userNotesContext = useContext(UserNotesContext);
  if (!userNotesContext) {
    throw new Error("Use UserNotesContext.Provider to access this context.");
  }

  return userNotesContext;
}
