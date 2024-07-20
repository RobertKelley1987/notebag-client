import { useSearchParams } from "react-router-dom";
import SearchResults from "./SearchResults";
import NoteList from "./NoteList";

function Notes() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const searching = search !== null;

  return searching ? <SearchResults /> : <NoteList />;
}

export default Notes;
