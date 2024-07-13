import { useContext } from "react";
import { InitAppDataContext } from "../context/InitAppDataContext";

export function useInitAppData() {
  const initAppDataContext = useContext(InitAppDataContext);
  if (!initAppDataContext) {
    throw new Error("Use InitAppDataContext.Provider to access this context.");
  }

  return initAppDataContext;
}
