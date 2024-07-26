import { useSearchParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchIcon from "../../../components/icons/SearchIcon";
import CancelSearchButton from "./CancelSearchButton";

function Searchbar() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  let classNames =
    "absolute left-[50%] -translate-x-[50%] bg-white px-3 sm:px-0 w-full sm:w-auto z-10 items-center";

  if (search === null) {
    classNames += " hidden sm:flex";
  } else {
    classNames += " flex";
  }

  return (
    <div className={classNames}>
      <CancelSearchButton />
      <SearchIcon className="hidden sm:block" />
      <SearchInput />
    </div>
  );
}

export default Searchbar;
