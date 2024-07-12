import { createContext, useRef, useState } from "react";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import type { Tag } from "../types";

type NoteFormContextType = {
  titleRef: RefObject<HTMLInputElement>;
  contentRef: RefObject<HTMLDivElement>;
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  pinned: boolean;
  setPinned: Dispatch<SetStateAction<boolean>>;
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
  const [pinned, setPinned] = useState(false);

  return (
    <NoteFormContext.Provider
      value={{
        titleRef,
        contentRef,
        tags,
        setTags,
        pinned,
        setPinned,
      }}
    >
      {children}
    </NoteFormContext.Provider>
  );
}
