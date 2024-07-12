import { createContext, useRef, useState } from "react";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

type TagFormContextType = {
  inputRef: RefObject<HTMLInputElement>;
  formActive: boolean;
  setFormActive: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
};

export const TagFormContext = createContext<TagFormContextType | null>(null);

type TagFormContextProps = {
  children: ReactNode;
};

export default function TagFormContextProvider({
  children,
}: TagFormContextProps) {
  const [formActive, setFormActive] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <TagFormContext.Provider
      value={{ inputRef, formActive, setFormActive, error, setError }}
    >
      {children}
    </TagFormContext.Provider>
  );
}
