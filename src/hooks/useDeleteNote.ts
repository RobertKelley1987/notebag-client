import { useDemo } from "./useDemo";
import { useUserNotes } from "./useUserNotes";
import { useNote } from "./useNote";
import { useIsSaving } from "./useIsSaving";
import { useModal } from "./useModal";
import { useNoteService } from "./useNoteService";
import { removeNote } from "../lib/notes";

// Hook that returns function to delete a note.
export function useDeleteNote() {
  const { isDemo } = useDemo();
  const { userNotes, setUserNotes } = useUserNotes();
  const { note } = useNote();
  const { setIsSaving } = useIsSaving();
  const { setModal } = useModal();
  const noteService = useNoteService();

  // Function that deletes note from db and updates state
  // with optimistic values.
  async function deleteNote() {
    // If using edit note modal, remove modal from screen
    setModal("");

    // Set optimistic notes
    const optimisticNotes = removeNote(userNotes, note);
    setUserNotes(optimisticNotes);

    // If demo mode is on, do not save to db.
    if (isDemo) return;

    // Delete note from db and set updated notes
    setIsSaving(true);
    await noteService.delete(note.id);
    const data = await noteService.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
  }

  return deleteNote;
}
