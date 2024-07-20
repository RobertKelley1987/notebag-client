import { createContext } from "react";
import { useFetchAppData } from "../hooks/useFetchAppData";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type InitAppDataContextType = {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const InitAppDataContext = createContext<InitAppDataContextType | null>(
  null
);

type InitAppDataContextProviderProps = {
  children: ReactNode;
};

export default function InitAppDataContextProvider({
  children,
}: InitAppDataContextProviderProps) {
  const appDataStatus = useFetchAppData();

  return (
    <InitAppDataContext.Provider value={appDataStatus}>
      {children}
    </InitAppDataContext.Provider>
  );
}
