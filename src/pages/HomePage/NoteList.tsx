import Masonry from "react-responsive-masonry";
import Note from "./Note";
import { Note as NoteType } from "../../types";

type NoteListProps = {
  notes: NoteType[];
};

function NoteList({ notes }: NoteListProps) {
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

export default NoteList;
