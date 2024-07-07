import { useState } from "react";
import { IsSavingContext } from "./IsSavingContext";
import type { ReactNode } from "react";

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
