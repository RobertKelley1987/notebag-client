import { useUserNotes } from "./useUserNotes";
import { useNote } from "./useNote";
import { useIsSaving } from "./useIsSaving";
import { useModal } from "./useModal";
import { useNoteService } from "./useNoteService";
import optimistic from "../lib/optimistic";

export function useDeleteNote() {
  const { userNotes, setUserNotes } = useUserNotes();
  const { note } = useNote();
  const { setIsSaving } = useIsSaving();
  const { setModal } = useModal();
  const notes = useNoteService();

  async function deleteNote() {
    const { error } = await notes.delete(note.id);
    if (!error) {
      // If using edit note modal, set remove from screen
      setModal("");

      // Set optimistic notes
      const optimisticNotes = optimistic.notes.removeOne(userNotes, note);
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
