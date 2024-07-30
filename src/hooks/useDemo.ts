import { useContext } from "react";
import { DemoContext } from "../context/DemoContext";

// Hook to confirm demo context is accessed within demo provider.
export function useDemo() {
  const demoContext = useContext(DemoContext);
  if (!demoContext) {
    throw new Error("Use DemoContext.Provider to access this context.");
  }

  return demoContext;
}
