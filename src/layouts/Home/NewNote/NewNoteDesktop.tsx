import { useCreateNote } from "../../../hooks/useCreateNote";
import { useClickOutside } from "../../../hooks/useClickOutside";
import NewNoteForm from "./NewNoteForm";

function NewNoteDesktop() {
  const createNote = useCreateNote();
  const { wrapperRef } = useClickOutside(createNote);

  return (
    <div
      className="group static w-[300px] h-auto bg-white border border-black p-3"
      ref={wrapperRef}
    >
      <NewNoteForm />
    </div>
  );
}

export default NewNoteDesktop;
