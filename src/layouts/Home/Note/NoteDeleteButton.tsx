import { useDeleteNote } from "../../../hooks/useDeleteNote";
import type { MouseEvent } from "react";

function NoteDeleteButton() {
  const deleteNote = useDeleteNote();

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    deleteNote();
  }

  return (
    <button onClick={handleClick} className="hover:text-aqua px-3 sm:px-0">
      Delete Note
    </button>
  );
}

export default NoteDeleteButton;
