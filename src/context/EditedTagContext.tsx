import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Tag } from "../types";

type EditedTagContextType = {
  editedTag: Tag | null;
  setEditedTag: Dispatch<SetStateAction<Tag | null>>;
};

export const EditedTagContext = createContext<EditedTagContextType | null>(
  null
);

type EditedTagContextProviderProps = {
  children: ReactNode;
};

function EditedTagContextProvider({ children }: EditedTagContextProviderProps) {
  const [editedTag, setEditedTag] = useState<Tag | null>(null);

  return (
    <EditedTagContext.Provider value={{ editedTag, setEditedTag }}>
      {children}
    </EditedTagContext.Provider>
  );
}

export default EditedTagContextProvider;
