import { Link } from "react-router-dom";
import type { Note as NoteType } from "../../types";

type NoteProps = {
  note: NoteType;
};

function Note({ note }: NoteProps) {
  return (
    <div className="border border-black p-2">
      <Link to={`/notes/${note.id}`}>
        {note.title && (
          <h2 className="font-semibold break-words">{note.title}</h2>
        )}
        {note.content && (
          <p className="break-words whitespace-pre-wrap">{note.content}</p>
        )}
      </Link>
    </div>
  );
}

export default Note;