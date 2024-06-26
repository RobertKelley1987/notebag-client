import { useState } from "react";
import UserNotesContext from "./UserNotesContext";
import type { ReactNode } from "react";
import type { Note } from "../types";

type UserNotesContextProviderProps = {
  children: ReactNode;
};

function UserNotesContextProvider({ children }: UserNotesContextProviderProps) {
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState("");

  return (
    <UserNotesContext.Provider
      value={{ userNotes, setUserNotes, selected, setSelected }}
    >
      {children}
    </UserNotesContext.Provider>
  );
}

export default UserNotesContextProvider;
