import { useNoteForm } from "../../../hooks/useNoteForm";
import { useFormOpen } from "../../../hooks/useFormOpen";
import { EMPTY_NOTE } from "../../../lib/constants";
import type { MouseEvent } from "react";

function NewNoteDeleteButton() {
  const { setForm } = useNoteForm();
  const { setFormOpen } = useFormOpen();

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    setFormOpen(false);
    setForm(EMPTY_NOTE);
  }

  return (
    <button onClick={handleClick} className="hover:text-aqua px-3 sm:px-0">
      Delete Note
    </button>
  );
}

export default NewNoteDeleteButton;
