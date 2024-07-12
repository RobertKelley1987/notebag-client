import { usePinnedNotes } from "../../../hooks/usePinnedNotes";
import NoteGrid from "../NoteGrid";

function PinnedNotes() {
  const { pinned } = usePinnedNotes();

  function renderNotes() {
    return (
      <div>
        <h2 className="mb-3">Pinned</h2>
        <NoteGrid notes={pinned} />
      </div>
    );
  }

  return pinned.length ? renderNotes() : null;
}

export default PinnedNotes;
