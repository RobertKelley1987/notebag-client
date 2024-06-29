import { useSearchParams } from "react-router-dom";
import Masonry from "react-responsive-masonry";
import Note from "./Note";
import ZeroNotes from "./ZeroNotes";
import type { Note as NoteType } from "../../../types";

type NoteListProps = {
  notes: NoteType[];
};

// Helper to determine if a note has the specified tag.
function noteHasTag(note: NoteType, tagName: string) {
  return note.tags.findIndex((tag) => tag.name === tagName) !== -1;
}

function NoteList({ notes }: NoteListProps) {
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  // If tag filter does exist, filter away my friend.
  if (tagFilter) {
    notes = notes.filter((note) => noteHasTag(note, tagFilter));
  }

  function renderNotesGrid() {
    return (
      <div className="w-[700px] mb-6">
        <Masonry columnsCount={3} gutter="1rem">
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Masonry>
      </div>
    );
  }

  return notes.length > 0 ? renderNotesGrid() : <ZeroNotes />;
}

export default NoteList;
