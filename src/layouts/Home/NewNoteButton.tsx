import { useFormOpen } from "../../hooks/useFormOpen";
import PlusIcon from "../../components/icons/PlusIcon";
import type { MouseEvent } from "react";

function NewNoteButton() {
  const { setFormOpen } = useFormOpen();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setFormOpen(true);
  }

  return (
    <button
      id="new-note-button"
      onClick={handleClick}
      className="bg-white fixed flex sm:hidden gap-1 right-0 bottom-0 mr-6 mb-6 p-3 pl-2 border border-black hover:bg-aqua"
    >
      <PlusIcon />
      new note
    </button>
  );
}

export default NewNoteButton;
