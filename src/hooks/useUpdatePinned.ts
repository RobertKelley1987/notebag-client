import { useDemo } from "./useDemo";
import { useNote } from "./useNote";
import { useUserNotes } from "../hooks/useUserNotes";
import { useIsSaving } from "../hooks/useIsSaving";
import { useNoteService } from "../hooks/useNoteService";
import { replaceNote } from "../lib/notes";

// Hook that returns a function to update the pinned status
// of a note.
export function useUpdatePinned() {
  const { isDemo } = useDemo();
  const { note } = useNote();
  const { userNotes, setUserNotes } = useUserNotes();
  const { setIsSaving } = useIsSaving();
  const noteService = useNoteService();

  // Function that update the pinned status of a note and updates
  // state with optimistic values.
  async function updatePinned() {
    // Create note with updated pinned status
    const pinned = !note.pinned;
    const pinnedAt = pinned ? new Date(Date.now()).toISOString() : "";
    const updatedNote = { ...note, pinned, pinnedAt };

    // Set optimistic values with updated note
    const optimisticNotes = replaceNote(userNotes, updatedNote);
    setUserNotes(optimisticNotes);

    // If demo mode is on, do not update db.
    if (isDemo) return;

    // Edit note in db and fetch updated notes.
    setIsSaving(true);
    await noteService.updatePinned(note.id, pinned);
    const data = await noteService.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
  }

  return updatePinned;
}
