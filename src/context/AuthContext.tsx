import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type AuthState = {
  accessToken: string;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
};

const DEFAULT = {
  auth: { accessToken: "" },
  setAuth: () => null,
};

export const AuthContext = createContext<AuthContextType>(DEFAULT);
