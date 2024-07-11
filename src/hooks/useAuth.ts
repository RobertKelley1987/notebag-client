import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Use AuthContext.Provider to access this context.");
  }

  return authContext;
}
