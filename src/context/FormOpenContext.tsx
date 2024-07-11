import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type FormOpenContextType = {
  formOpen: boolean;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
};

export const FormOpenContext = createContext<FormOpenContextType | null>(null);

type FormOpenContextProviderProps = {
  children: ReactNode;
};

function FormOpenContextProvider({ children }: FormOpenContextProviderProps) {
  const [formOpen, setFormOpen] = useState(false);
  const location = useLocation();

  // If user updates query params by clicking a tag link, close form.
  useEffect(() => {
    setFormOpen(false);
  }, [location]);

  return (
    <FormOpenContext.Provider value={{ formOpen, setFormOpen }}>
      {children}
    </FormOpenContext.Provider>
  );
}

export default FormOpenContextProvider;
