import { useUserNotes } from "./useUserNotes";
import { useNote } from "./useNote";
import { useIsSaving } from "./useIsSaving";
import { useModal } from "./useModal";
import { useNoteService } from "./useNoteService";
import { removeNote } from "../lib/notes";

// Hook that returns function to delete a note.
export function useDeleteNote() {
  const { userNotes, setUserNotes } = useUserNotes();
  const { note } = useNote();
  const { setIsSaving } = useIsSaving();
  const { setModal } = useModal();
  const notes = useNoteService();

  // Function that deletes note from db and updates state
  // with optimistic values.
  async function deleteNote() {
    const { error } = await notes.delete(note.id);
    if (!error) {
      // If using edit note modal, set remove from screen
      setModal("");

      // Set optimistic notes
      const optimisticNotes = removeNote(userNotes, note);
      setUserNotes(optimisticNotes);

      // Set saving state.
      setIsSaving(true);

      // Delete note from db and set updated notes
      const data = await notes.findAll();
      setUserNotes(data.notes);
      setIsSaving(false);
    }
  }

  return deleteNote;
}
