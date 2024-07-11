import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type EditingTagsContextType = {
  editingTags: boolean;
  setEditingTags: Dispatch<SetStateAction<boolean>>;
};

export const EditingTagsContext = createContext<EditingTagsContextType | null>(
  null
);

type EditingTagsContextProviderProps = {
  children: ReactNode;
};

function EditingTagsContextProvider({
  children,
}: EditingTagsContextProviderProps) {
  const [editingTags, setEditingTags] = useState(false);

  return (
    <EditingTagsContext.Provider value={{ editingTags, setEditingTags }}>
      {children}
    </EditingTagsContext.Provider>
  );
}

export default EditingTagsContextProvider;
