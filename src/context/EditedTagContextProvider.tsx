import { useState } from "react";
import { EditedTagContext } from "./EditedTagContext";
import type { ReactNode } from "react";
import type { Tag } from "../types";

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
