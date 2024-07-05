import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import { useSearch } from "../hooks/useSearch";
import type { ReactNode } from "react";

type SearchContextProviderProps = {
  children: ReactNode;
};

function SearchContextProvider({ children }: SearchContextProviderProps) {
  const [isSearching, setIsSearching] = useState(false);
  const { search, setSearch, results } = useSearch();
  const location = useLocation();

  useEffect(() => {
    setIsSearching(false);
  }, [location]);

  return (
    <SearchContext.Provider
      value={{ isSearching, setIsSearching, search, setSearch, results }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
