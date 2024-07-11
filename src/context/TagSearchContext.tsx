import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type TagSearchContextType = {
  tagSearch: string;
  setTagSearch: Dispatch<SetStateAction<string>>;
};

export const TagSearchContext = createContext<TagSearchContextType | null>(
  null
);

type TagSearchContextProviderProps = {
  children: ReactNode;
};

function TagSearchContextProvider({ children }: TagSearchContextProviderProps) {
  const [tagSearch, setTagSearch] = useState("");

  return (
    <TagSearchContext.Provider value={{ tagSearch, setTagSearch }}>
      {children}
    </TagSearchContext.Provider>
  );
}

export default TagSearchContextProvider;
