import { useContext } from "react";
import { SearchContext } from "../../../context/SearchContext";
import SearchIcon from "../../../components/icons/SearchIcon";

function Search() {
  const { setIsSearching, search, setSearch } = useContext(SearchContext);

  return (
    <div className="flex items-center">
      <SearchIcon />
      <input
        type="text"
        onFocus={() => setIsSearching(true)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
        className="p-3 focus:outline-none"
      />
    </div>
  );
}

export default Search;
