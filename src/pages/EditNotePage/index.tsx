import { useDropdown } from "../../hooks/useDropdown";
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
        onClick={handleClick}
        className="font-ibm grid grid-rows-[auto_min-content] w-full sm:w-[250px] h-full sm:h-auto bg-white p-3 sm:border border-black"
      >
        <ErrorBoundary fallback={<EditNoteError />}>
          <EditNoteForm />
        </ErrorBoundary>
      </div>
    </Modal>
  );
}

export default EditNotePage;
