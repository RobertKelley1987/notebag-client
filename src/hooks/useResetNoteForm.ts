import { useFormOpen } from "./useFormOpen";
import { useNoteForm } from "./useNoteForm";

export function useResetNoteForm() {
  const { setNoteForm } = useNoteForm();
  const { setFormOpen } = useFormOpen();

  function resetNoteForm() {
    setNoteForm({ title: "", content: "", tags: [] });
    setFormOpen(false);
  }

  return resetNoteForm;
}
