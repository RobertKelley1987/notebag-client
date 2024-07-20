import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Hook to confirm auth context is accessed within auth provider.
export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Use AuthContext.Provider to access this context.");
  }

  return authContext;
}
