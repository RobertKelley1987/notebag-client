import { useContext } from "react";
import { TagSearchContext } from "../context/TagSearchContext";

// Hook to confirm tag search is accessed within tag search context provider.
export function useTagSearch() {
  const tagSearchContext = useContext(TagSearchContext);
  if (!tagSearchContext) {
    throw new Error("Use TagSearchContext.Provider to access this context.");
  }

  return tagSearchContext;
}
