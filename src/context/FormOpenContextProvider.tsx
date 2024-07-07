import { useEffect, useState } from "react";
import { FormOpenContext } from "./FormOpenContext";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

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
