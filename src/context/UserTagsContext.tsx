import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Tag } from "../types";

type UserTagsContextType = {
  userTags: Tag[];
  setUserTags: Dispatch<SetStateAction<Tag[]>>;
};

export const UserTagsContext = createContext<UserTagsContextType | null>(null);

type UserTagsContextProviderProps = {
  children: ReactNode;
};

function UserTagsContextProvider({ children }: UserTagsContextProviderProps) {
  const [userTags, setUserTags] = useState<Tag[]>([]);

  return (
    <UserTagsContext.Provider value={{ userTags, setUserTags }}>
      {children}
    </UserTagsContext.Provider>
  );
}

export default UserTagsContextProvider;
