import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import NoteGrid from "../../components/note/NoteGrid";
import ZeroResults from "./ZeroResults";

function SearchResults() {
  const { results } = useContext(SearchContext);

  return results.length > 0 ? <NoteGrid notes={results} /> : <ZeroResults />;
}

export default SearchResults;
