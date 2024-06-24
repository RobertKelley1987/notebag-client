import { Dispatch, SetStateAction, createContext } from "react";

type IsSavingContextType = {
  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
};

const DEFAULT = {
  isSaving: false,
  setIsSaving: () => null,
};

export default createContext<IsSavingContextType>(DEFAULT);
