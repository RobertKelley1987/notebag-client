import { useSearchParams } from "react-router-dom";
import { useInitAppData } from "../../hooks/useInitAppData";
import FetchError from "./FetchError";
import SearchResults from "./SearchResults";
import NoteList from "./NoteList";

function Notes() {
  const { error, setError } = useInitAppData();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const searching = search !== null;

  if (error) {
    return <FetchError setError={setError} />;
  }
  return searching ? <SearchResults /> : <NoteList />;
}

export default Notes;
