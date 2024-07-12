import { createContext, useRef, useState } from "react";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import type { Tag } from "../types";
import { isEmpty } from "../lib/strings";

type NoteForm = {
  title: string;
  content: string;
  tags: Tag[];
};

type NoteFormContextType = {
  titleRef: RefObject<HTMLInputElement>;
  contentRef: RefObject<HTMLDivElement>;
  getForm: () => NoteForm;
  setForm: (form: NoteForm) => void;
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
};

export const NoteFormContext = createContext<NoteFormContextType | null>(null);

type NoteFormContextProviderProps = {
  children: ReactNode;
};

export default function NoteFormContextProvider({
  children,
}: NoteFormContextProviderProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  function getForm() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";
    const form = {
      title: isEmpty(title) ? "" : title,
      content: isEmpty(content) ? "" : content,
      tags: tags,
    };

    return form;
  }

  function setForm(form: NoteForm) {
    if (titleRef.current) titleRef.current.value = form.title;
    if (contentRef.current) contentRef.current.innerText = form.content;
    setTags(form.tags);
  }

  return (
    <NoteFormContext.Provider
      value={{ titleRef, contentRef, getForm, setForm, tags, setTags }}
    >
      {children}
    </NoteFormContext.Provider>
  );
}
