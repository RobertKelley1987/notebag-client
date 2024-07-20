import { useContext } from "react";
import { InitAppDataContext } from "../context/InitAppDataContext";

// Hook to confirm init app data context is accessed within init app data provider.
export function useInitAppData() {
  const initAppDataContext = useContext(InitAppDataContext);
  if (!initAppDataContext) {
    throw new Error("Use InitAppDataContext.Provider to access this context.");
  }

  return initAppDataContext;
}
