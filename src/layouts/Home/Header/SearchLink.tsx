import { useSearchParams } from "react-router-dom";
import SearchIcon from "../../../components/icons/SearchIcon";

function SearchLink() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  let classNames = "hover:text-aqua";
  if (search !== null) classNames += " hidden";

  return (
    <button
      onClick={() => setSearchParams({ search: "" })}
      className={classNames}
    >
      <SearchIcon />
    </button>
  );
}

export default SearchLink;
