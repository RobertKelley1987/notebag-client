import { useNavigate } from "react-router-dom";
import { useFilteredNotes } from "../../../hooks/useFilteredNotes";
import PinnedNotes from "./PinnedNotes";
import UnpinnedNotes from "./UnpinnedNoted";
import ZeroNotes from "./ZeroNotes";

function NoteList() {
  const { filteredNotes } = useFilteredNotes();

  function renderList() {
    return (
      <div className="flex flex-col gap-6 w-full mb-6 mt-0 sm:mt-6">
        <PinnedNotes />
        <UnpinnedNotes />
      </div>
    );
  }

  return filteredNotes.length > 0 ? renderList() : <ZeroNotes />;
}

export default NoteList;
