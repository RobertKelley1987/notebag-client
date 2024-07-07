import DeleteButton from "../../../components/Note/DeleteButton";
import type { MouseEvent } from "react";

type NewNoteDeleteButtonProps = {
  resetForm: () => void;
};

function NewNoteDeleteButton({ resetForm }: NewNoteDeleteButtonProps) {
  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    resetForm();
  }

  return <DeleteButton onClick={handleClick} className="px-3 sm:px-0" />;
}

export default NewNoteDeleteButton;
