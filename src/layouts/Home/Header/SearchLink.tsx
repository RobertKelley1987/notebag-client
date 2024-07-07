import { useSearchParams } from "react-router-dom";
import SearchIcon from "../../../components/icons/SearchIcon";

function SearchLink() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <button
      onClick={() => setSearchParams({ search: "" })}
      className="sm:hidden hover:text-aqua"
    >
      <SearchIcon />
    </button>
  );
}

export default SearchLink;
