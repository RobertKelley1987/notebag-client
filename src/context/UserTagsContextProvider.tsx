import { useState } from "react";
import UserTagsContext from "./UserTagsContext";
import type { ReactNode } from "react";
import type { Tag } from "../types";

type UserContextProviderProps = {
  children: ReactNode;
};

function UserTagsContextProvider({ children }: UserContextProviderProps) {
  const [userTags, setUserTags] = useState<Tag[]>([]);

  return (
    <UserTagsContext.Provider value={{ userTags, setUserTags }}>
      {children}
    </UserTagsContext.Provider>
  );
}

export default UserTagsContextProvider;
