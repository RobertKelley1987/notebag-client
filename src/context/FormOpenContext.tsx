import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type FormOpenContextType = {
  formOpen: boolean;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
};

const DEFAULT = {
  formOpen: false,
  setFormOpen: () => null,
};

export const FormOpenContext = createContext<FormOpenContextType>(DEFAULT);
