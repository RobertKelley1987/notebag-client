import { useState } from "react";
import { EditingTagsContext } from "./EditingTagsContext";
import type { ReactNode } from "react";

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
