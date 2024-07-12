import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  let timeout = useRef<NodeJS.Timeout>();

  // If user clicked link to open search mode in mobile mode, focus the
  // search input.
  useEffect(() => {
    if (search !== null) searchRef.current?.focus();
  }, [search]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(
      () => setSearchParams({ search: e.target.value }),
      400
    );
  }

  return (
    <input
      ref={searchRef}
      onChange={handleChange}
      onFocus={() => search === null && setSearchParams({ search: "" })}
      type="text"
      placeholder="search"
      className="p-2 focus:outline-none placeholder:text-black bg-white w-full"
    />
  );
}

export default SearchInput;
