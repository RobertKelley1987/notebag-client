import { useContext } from "react";
import { TagFormContext } from "../context/TagFormContext";

// Hook to confirm tag form context is accessed within tag form context
// provider.
export function useTagForm() {
  const tagFormContext = useContext(TagFormContext);
  if (!tagFormContext) {
    throw new Error("Use TagFormContext.Provider to access this context.");
  }

  return tagFormContext;
}
