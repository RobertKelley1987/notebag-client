import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [auth, setAuth] = useState({ accessToken: "" });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
