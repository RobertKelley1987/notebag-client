import { Fragment, useContext } from "react";
import DropdownOpenContextProvider from "../../context/DropdownOpenContextProvider";
import EditingTagsContextProvider from "../../context/EditingTagsContextProvider";
import { NoteContext } from "../../context/NoteContext";
import { UserNotesContext } from "../../context/UserNotesContext";
import { ModalContext } from "../../context/ModalContext";
import { useScreenSize } from "../../hooks/useScreenSize";
import NoteOptions from "./NoteOptions";
import NoteTagsTrimmed from "./NoteTagsTrimmed";
import NoteEditTags from "./NoteEditTags";
import NoteDeleteButton from "./NoteDeleteButton";
import type { Note as NoteType } from "../../types";

type NoteProps = {
  note: NoteType;
};

function Note({ note }: NoteProps) {
  const { setSelected } = useContext(UserNotesContext);
  const { setModal } = useContext(ModalContext);
  const { isSmallScreen } = useScreenSize();

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
      <div className="border border-black p-2 has-[article:hover]:bg-aqua has-[a:hover]:border-black">
        <article onClick={handleClick} className="cursor-pointer">
          {!note.title && !note.content ? emptyNote : noteElement}
          <NoteTagsTrimmed tags={note.tags} />
        </article>
        <DropdownOpenContextProvider>
          <EditingTagsContextProvider>
            <NoteOptions
              editTagsForm={<NoteEditTags />}
              deleteButton={<NoteDeleteButton />}
              hideOptions={true}
            />
          </EditingTagsContextProvider>
        </DropdownOpenContextProvider>
      </div>
    </NoteContext.Provider>
  );
}

export default Note;
