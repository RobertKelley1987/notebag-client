import { useContext } from "react";
import { TagSearchContext } from "../context/TagSearchContext";

export function useTagSearch() {
  const tagSearchContext = useContext(TagSearchContext);
  if (!tagSearchContext) {
    throw new Error("Use TagSearchContext.Provider to access this context.");
  }

  return tagSearchContext;
}
