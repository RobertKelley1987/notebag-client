import { v4 as uuid } from "uuid";
import { useNoteForm } from "./useNoteForm";
import { useResetNoteForm } from "./useResetNoteForm";
import { useUserNotes } from "./useUserNotes";
import { useFormOpen } from "./useFormOpen";
import { useNoteService } from "./useNoteService";
import { useIsSaving } from "./useIsSaving";
import { isEmpty } from "../lib/strings";
import optimistic from "../lib/optimistic";

export function useCreateNote() {
  const { noteForm } = useNoteForm();
  const { userNotes, setUserNotes } = useUserNotes();
  const { setFormOpen } = useFormOpen();
  const { setIsSaving } = useIsSaving();
  const noteService = useNoteService();
  const resetNoteForm = useResetNoteForm();

  async function createNote() {
    // If user typed only whitespaces in form, clear form values and close.
    const { title, content } = noteForm;
    if (isEmpty(title) && isEmpty(content)) return resetNoteForm();

    // Set optimistic notes.
    const newNote = { id: uuid(), ...noteForm };
    const optimisticNotes = optimistic.notes.addOne(userNotes, newNote);
    setUserNotes(optimisticNotes);

    // Reset form and set saving state.
    resetNoteForm();
    setIsSaving(true);

    // Create new note and fetch updated note.
    await noteService.create(newNote);
    const data = await noteService.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
    setFormOpen(false);
  }

  return createNote;
}
