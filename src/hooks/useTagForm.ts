import { useContext } from "react";
import { TagFormContext } from "../context/TagFormContext";

export function useTagForm() {
  const tagFormContext = useContext(TagFormContext);
  if (!tagFormContext) {
    throw new Error("Use TagFormContext.Provider to access this context.");
  }

  return tagFormContext;
}
