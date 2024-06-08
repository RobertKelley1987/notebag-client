import { useAsyncValue } from "react-router-dom";
import Masonry from "react-responsive-masonry";
import Note from "./Note";
import { Note as NoteType } from "../../types";

function NoteList() {
  const { notes } = useAsyncValue() as { notes: NoteType[] };

  return (
    <Masonry columnsCount={3} gutter="1rem">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </Masonry>
  );
}

export default NoteList;
