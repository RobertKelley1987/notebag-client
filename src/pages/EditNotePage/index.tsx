import { useDropdown } from "../../hooks/useDropdown";
import { useModal } from "../../hooks/useModal";
import { useUpdateNote } from "../../hooks/useUpdateNote";
import Modal from "../../components/Modal";
import ErrorBoundary from "../../components/ErrorBoundary";
import EditNoteError from "./EditNoteError";
import EditNoteForm from "./EditNoteForm";
import type { MouseEvent } from "react";

function EditNotePage() {
  const { setDropdownOpen, setEditingTags } = useDropdown();
  const updateNote = useUpdateNote();

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setDropdownOpen(false);
    setEditingTags(false);
  }

  return (
    <Modal handleDismiss={updateNote}>
      <div
        id="edit-note"
        onClick={handleClick}
        className="font-ibm flex flex-col justify-between w-full sm:w-[350px] h-full sm:h-auto sm:max-h-[350px] overflow-y-auto bg-white p-3 sm:border border-black"
      >
        <ErrorBoundary fallback={<EditNoteError />}>
          <EditNoteForm />
        </ErrorBoundary>
      </div>
    </Modal>
  );
}

export default EditNotePage;
