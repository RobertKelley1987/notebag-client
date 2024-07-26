import { useSearch } from "../../hooks/useSearch";
import NoteGrid from "./NoteGrid";
import ZeroResults from "./ZeroResults";

function SearchResults() {
  const { results, isBlank } = useSearch();

  const emptyInputMessage = (
    <div className="basis-full grow flex justify-center items-center">
      <p>Use the search bar to search your notes.</p>
    </div>
  );

  function renderResults() {
    if (isBlank) {
      return emptyInputMessage;
    } else if (results.length > 0) {
      return <NoteGrid notes={results} />;
    } else {
      return <ZeroResults />;
    }
  }

  return renderResults();
}

export default SearchResults;
