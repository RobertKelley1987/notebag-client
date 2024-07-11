import { useUserNotes } from "./useUserNotes";
import { useIsSaving } from "./useIsSaving";
import { useModal } from "./useModal";
import { useNote } from "./useNote";
import { useNoteService } from "./useNoteService";
import optimistic from "../lib/optimistic";

export function useDeleteNote() {
  const { userNotes, setUserNotes } = useUserNotes();
  const { setIsSaving } = useIsSaving();
  const { setModal } = useModal();
  const currentNote = useNote().note;
  const notes = useNoteService();

  async function deleteNote() {
    if (!currentNote) return;

    const { error } = await notes.delete(currentNote.id);
    if (!error) {
      // If using edit note modal, set remove from screen
      setModal("");

      // Set optimistic notes
      const optimisticNotes = optimistic.notes.removeOne(
        userNotes,
        currentNote
      );
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
