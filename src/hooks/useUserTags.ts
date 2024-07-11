import { useContext } from "react";
import { UserTagsContext } from "../context/UserTagsContext";

export function useUserTags() {
  const userTagsContext = useContext(UserTagsContext);
  if (!userTagsContext) {
    throw new Error("Use UserTagsContext.Provider to access this context.");
  }

  return userTagsContext;
}
