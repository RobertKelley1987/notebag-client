import NoteFormContextProvider from "../../../context/NoteFormContext";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useUserNotes } from "../../../hooks/useUserNotes";
import { useFormOpen } from "../../../hooks/useFormOpen";
import { useCreateNote } from "../../../hooks/useCreateNote";
import NewNoteForm from "./NewNoteForm";
import { MouseEvent } from "react";

type NewNoteProps = {
  isLoading: boolean;
};

function NewNote({ isLoading }: NewNoteProps) {
  const { userNotes } = useUserNotes();
  const { formOpen, setFormOpen } = useFormOpen();
  const createNote = useCreateNote();
  const { wrapperRef } = useClickOutside(createNote, [userNotes, isLoading]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setFormOpen(true);
  }

  const openButton = <button onClick={handleClick}>new note...</button>;

  let wrapperClassNames =
    "group fixed sm:static left-0 top-0 w-full sm:w-[300px] h-screen sm:h-auto sm:mt-6 p-3 bg-white sm:border border-black z-20";
  if (!formOpen)
    wrapperClassNames += " hidden sm:block cursor-pointer hover:bg-aqua";

  return (
    <div
      className={wrapperClassNames}
      ref={wrapperRef}
      onClick={() => setFormOpen(true)}
    >
      {formOpen ? <NewNoteForm /> : openButton}
    </div>
  );
}

export default NewNote;
