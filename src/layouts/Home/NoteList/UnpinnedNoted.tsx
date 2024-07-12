import { usePinnedNotes } from "../../../hooks/usePinnedNotes";
import NoteGrid from "../NoteGrid";

function UnpinnedNotes() {
  const { pinned, unpinned } = usePinnedNotes();
  const showHeading = pinned.length > 0 && unpinned.length > 0;

  return (
    <div>
      {showHeading && <h2 className="mb-3">Others</h2>}
      <NoteGrid notes={unpinned} />
    </div>
  );
}

export default UnpinnedNotes;
