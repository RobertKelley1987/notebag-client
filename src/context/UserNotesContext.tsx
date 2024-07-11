import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Note } from "../types";

type UserNotesContextType = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  userNotes: Note[];
  setUserNotes: Dispatch<SetStateAction<Note[]>>;
};

export const UserNotesContext = createContext<UserNotesContextType | null>(
  null
);

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
