import { useState } from "react";
import IsSavingContext from "./IsSavingContext";
import type { ReactNode } from "react";

type IsSavingProviderProps = {
  children: ReactNode;
};

function IsSavingContextProvider({ children }: IsSavingProviderProps) {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <IsSavingContext.Provider value={{ isSaving, setIsSaving }}>
      {children}
    </IsSavingContext.Provider>
  );
}

export default IsSavingContextProvider;
