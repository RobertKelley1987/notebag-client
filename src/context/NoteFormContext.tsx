import { createContext, useRef, useState } from "react";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import type { Tag } from "../types";

type NoteForm = {
  title: string;
  content: string;
  tags: Tag[];
};

type NoteFormContextType = {
  noteForm: NoteForm;
  setNoteForm: Dispatch<SetStateAction<NoteForm>>;
};

export const NoteFormContext = createContext<NoteFormContextType | null>(null);

const DEFAULT: NoteForm = {
  title: "",
  content: "",
  tags: [],
};

type NoteFormContextProviderProps = {
  children: ReactNode;
};

export default function NoteFormContextProvider({
  children,
}: NoteFormContextProviderProps) {
  const [noteForm, setNoteForm] = useState<NoteForm>(DEFAULT);

  return (
    <NoteFormContext.Provider value={{ noteForm, setNoteForm }}>
      {children}
    </NoteFormContext.Provider>
  );
}
