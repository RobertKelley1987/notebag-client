import { useNoteForm } from "./useNoteForm";
import { useUserNotes } from "../hooks/useUserNotes";
import { useIsSaving } from "../hooks/useIsSaving";
import { useModal } from "../hooks/useModal";
import { useNoteService } from "../hooks/useNoteService";
import optimistic from "../lib/optimistic";
import { isEmpty } from "../lib/strings";

export function useUpdateNote() {
  const { noteForm } = useNoteForm();
  const { userNotes, setUserNotes, selected } = useUserNotes();
  const { setModal } = useModal();
  const { setIsSaving } = useIsSaving();
  const selectedNote = userNotes.find((note) => note.id === selected);
  const noteService = useNoteService();

  async function updatedNote() {
    if (!selectedNote) return;
    const updatedNote = { ...noteForm, id: selectedNote.id };

    // Allow user to save empty notes, but replace all whitespace
    // title or content with empty strings.
    if (isEmpty(updatedNote.title)) updatedNote.title = "";
    if (isEmpty(updatedNote.content)) updatedNote.content = "";

    // Set optimistic notes
    const optimisticNotes = optimistic.notes.updateOne(userNotes, updatedNote);
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

  return updatedNote;
}
