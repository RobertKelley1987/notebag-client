import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type AuthContextType = {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [accessToken, setAccessToken] = useState("");

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
