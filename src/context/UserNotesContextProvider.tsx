import { useUserNotes } from "../hooks/useUserNotes";
import UserNotesContext from "./UserNotesContext";
import type { ReactNode } from "react";

type UserContextProviderProps = {
  children: ReactNode;
};

function UserNotesContextProvider({ children }: UserContextProviderProps) {
  return (
    <UserNotesContext.Provider value={useUserNotes()}>
      {children}
    </UserNotesContext.Provider>
  );
}

export default UserNotesContextProvider;
