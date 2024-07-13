import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  // If user clicked link to open search mode in mobile mode, focus the
  // search input.
  useEffect(() => {
    if (search !== null) searchRef.current?.focus();
  }, [search]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams({ search: e.target.value });
  }

  return (
    <input
      ref={searchRef}
      value={search ? search : ""}
      onChange={handleChange}
      onFocus={() => search === null && setSearchParams({ search: "" })}
      type="text"
      placeholder="search"
      className="p-2 focus:outline-none placeholder:text-black bg-white w-full"
    />
  );
}

export default SearchInput;
