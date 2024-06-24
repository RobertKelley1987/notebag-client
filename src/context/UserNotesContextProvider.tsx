import { useUserNotes } from "../hooks/useUserNotes";
import UserNotesContext from "./UserNotesContext";
import type { ReactNode } from "react";

type UserNotesContextProviderProps = {
  children: ReactNode;
};

function UserNotesContextProvider({ children }: UserNotesContextProviderProps) {
  return (
    <UserNotesContext.Provider value={useUserNotes()}>
      {children}
    </UserNotesContext.Provider>
  );
}

export default UserNotesContextProvider;
