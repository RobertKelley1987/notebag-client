import { useSearch } from "../../hooks/useSearch";
import NoteGrid from "../../components/NoteGrid";
import ZeroResults from "./ZeroResults";

function SearchResults() {
  const { results } = useSearch();

  return results.length > 0 ? <NoteGrid notes={results} /> : <ZeroResults />;
}

export default SearchResults;
