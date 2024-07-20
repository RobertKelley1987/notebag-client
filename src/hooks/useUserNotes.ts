import { useContext } from "react";
import { UserNotesContext } from "../context/UserNotesContext";

// Hook to confirm user notes context is accessed within user notes context provider.
export function useUserNotes() {
  const userNotesContext = useContext(UserNotesContext);
  if (!userNotesContext) {
    throw new Error("Use UserNotesContext.Provider to access this context.");
  }

  return userNotesContext;
}
