import { Fragment } from "react";
import { Link } from "react-router-dom";
import NoteContext from "../../context/NoteContext";
import NoteOptions from "./NoteOptions";
import NoteTags from "./NoteTags";
import type { Note as NoteType } from "../../types";

type NoteProps = {
  note: NoteType;
};

function Note({ note }: NoteProps) {
  const noteElement = (
    <Fragment>
      {note.title && (
        <h2 className="font-semibold break-words">{note.title}</h2>
      )}
      {note.content && (
        <p className="break-words whitespace-pre-wrap">{note.content}</p>
      )}
    </Fragment>
  );

  const emptyNote = <p className="italic text-slate-400">EMPTY NOTE</p>;

  return (
    <NoteContext.Provider value={{ note: note }}>
      <article className="border border-black p-2">
        <Link to={`/notes/${note.id}`}>
          {!note.title && !note.content ? emptyNote : noteElement}
        </Link>
        <NoteTags tags={note.tags} />
        <NoteOptions />
      </article>
    </NoteContext.Provider>
  );
}

export default Note;
