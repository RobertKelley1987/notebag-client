import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type IsSavingContextType = {
  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
};

const DEFAULT = {
  isSaving: false,
  setIsSaving: () => null,
};

export const IsSavingContext = createContext<IsSavingContextType>(DEFAULT);
