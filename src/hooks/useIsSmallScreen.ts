import { useContext } from "react";
import { ScreenSizeContext } from "../context/ScreenSizeContext";

// Hook to confirm screen size context is accessed within screen size provider.
export function useIsSmallScreen() {
  const smallScreenContext = useContext(ScreenSizeContext);
  if (!smallScreenContext)
    throw new Error("Use ScreenSizeContext.Provider to access this context.");

  return smallScreenContext;
}
