import { useNote } from "./useNote";
import { useUserNotes } from "../hooks/useUserNotes";
import { useIsSaving } from "../hooks/useIsSaving";
import { useNoteService } from "../hooks/useNoteService";
import optimistic from "../lib/optimistic";

// Hook that returns a function to update the pinned status
// of a note.
export function useUpdatePinned() {
  const { note } = useNote();
  const { userNotes, setUserNotes } = useUserNotes();
  const { setIsSaving } = useIsSaving();
  const noteService = useNoteService();

  // Function that update the pinned status of a note and updates
  // state with optimistic values.
  async function updatePinned() {
    // Create note with updated pinned status
    const pinned = !note.pinned;
    const updatedNote = { ...note, pinned };

    // Set optimistic values with updated note
    const optimisticNotes = optimistic.notes.updateOne(userNotes, updatedNote);
    setUserNotes(optimisticNotes);

    // Edit note in db and fetch updated notes.
    setIsSaving(true);
    await noteService.updatePinned(note.id, pinned);
    const data = await noteService.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
  }

  return updatePinned;
}
