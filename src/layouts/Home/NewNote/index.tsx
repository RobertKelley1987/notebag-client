import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFormOpen } from "../../../hooks/useFormOpen";
import { useCreateNote } from "../../../hooks/useCreateNote";
import NewNoteForm from "./NewNoteForm";
import { MouseEvent } from "react";

function NewNote() {
  const { formOpen, setFormOpen } = useFormOpen();
  const createNote = useCreateNote();
  const { wrapperRef } = useClickOutside(createNote);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setFormOpen(true);
  }

  const openButton = <button onClick={handleClick}>new note...</button>;

  let wrapperClassNames =
    "group fixed sm:static z-20 sm:z-0 left-0 top-0 w-full sm:w-[300px] h-screen sm:h-auto p-3 bg-white sm:border border-black";
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
