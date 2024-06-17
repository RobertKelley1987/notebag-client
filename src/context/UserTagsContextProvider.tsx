import { useUserTags } from "../hooks/useUserTags";
import UserTagsContext from "./UserTagsContext";
import type { ReactNode } from "react";

type UserContextProviderProps = {
  children: ReactNode;
};

function UserTagsContextProvider({ children }: UserContextProviderProps) {
  return (
    <UserTagsContext.Provider value={useUserTags()}>
      {children}
    </UserTagsContext.Provider>
  );
}

export default UserTagsContextProvider;
