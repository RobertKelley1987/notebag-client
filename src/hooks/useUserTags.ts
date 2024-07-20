import { useContext } from "react";
import { UserTagsContext } from "../context/UserTagsContext";

// Hook to confirm user tags context is accessed within user tags context provider.
export function useUserTags() {
  const userTagsContext = useContext(UserTagsContext);
  if (!userTagsContext) {
    throw new Error("Use UserTagsContext.Provider to access this context.");
  }

  return userTagsContext;
}
