import { Fragment, useContext } from "react";
import NoteContext from "../../../context/NoteContext";
import UserNotesContext from "../../../context/UserNotesContext";
import NoteOptions from "./NoteOptions";
import NoteTags from "./NoteTags";
import type { Note as NoteType } from "../../../types";
import { ModalContext } from "../../../context/ModalContext";

type NoteProps = {
  note: NoteType;
};

function Note({ note }: NoteProps) {
  const { setSelected } = useContext(UserNotesContext);
  const { setModal } = useContext(ModalContext);

  const handleClick = () => {
    setSelected(note.id);
    setModal("note");
  };

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
        <div onClick={handleClick} className="hover:cursor-pointer">
          {!note.title && !note.content ? emptyNote : noteElement}
        </div>
        <NoteTags tags={note.tags} />
        <NoteOptions />
      </article>
    </NoteContext.Provider>
  );
}

export default Note;
