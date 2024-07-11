import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type IsSavingContextType = {
  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
};

export const IsSavingContext = createContext<IsSavingContextType | null>(null);

type IsSavingContextProviderProps = {
  children: ReactNode;
};

function IsSavingContextProvider({ children }: IsSavingContextProviderProps) {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <IsSavingContext.Provider value={{ isSaving, setIsSaving }}>
      {children}
    </IsSavingContext.Provider>
  );
}

export default IsSavingContextProvider;
