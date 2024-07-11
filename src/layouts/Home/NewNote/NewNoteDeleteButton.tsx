import { useResetNoteForm } from "../../../hooks/useResetNoteForm";
import type { MouseEvent } from "react";

function NewNoteDeleteButton() {
  const resetNoteForm = useResetNoteForm();

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    resetNoteForm();
  }

  return (
    <button onClick={handleClick} className="hover:text-aqua px-3 sm:px-0">
      Delete Note
    </button>
  );
}

export default NewNoteDeleteButton;
