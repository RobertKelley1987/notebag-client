import { useNoteForm } from "./useNoteForm";
import { useUserNotes } from "../hooks/useUserNotes";
import { useSelectedNote } from "./useSelectedNote";
import { useIsSaving } from "../hooks/useIsSaving";
import { useModal } from "../hooks/useModal";
import { useNoteService } from "../hooks/useNoteService";
import { replaceNote } from "../lib/notes";
import { isEmpty } from "../lib/strings";

// Hook that returns a function for updating a note.
export function useUpdateNote() {
  const { getForm } = useNoteForm();
  const { userNotes, setUserNotes } = useUserNotes();
  const { selectedNote } = useSelectedNote();
  const { setModal } = useModal();
  const { setIsSaving } = useIsSaving();
  const noteService = useNoteService();

  // Function that updates a note with values from the
  // edit note modal.
  async function updateNote() {
    if (!selectedNote) return;

    const form = getForm();
    const pinnedAt = selectedNote.pinnedAt ? selectedNote.pinnedAt : "";
    const updatedNote = { ...form, id: selectedNote.id, pinnedAt };

    // Allow user to save empty notes, but replace all whitespace
    // title or content with empty strings.
    if (isEmpty(updatedNote.title)) updatedNote.title = "";
    if (isEmpty(updatedNote.content)) updatedNote.content = "";

    // Set optimistic notes
    const optimisticNotes = replaceNote(userNotes, updatedNote);
    setUserNotes(optimisticNotes);

    // Close modal and set saving state.
    setModal("");
    setIsSaving(true);

    // Edit note in db and fetch updated notes.
    await noteService.update(updatedNote);
    const data = await noteService.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
  }

  return updateNote;
}
