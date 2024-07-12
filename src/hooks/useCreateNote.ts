import { v4 as uuid } from "uuid";
import { useNoteForm } from "./useNoteForm";
import { useUserNotes } from "./useUserNotes";
import { useFormOpen } from "./useFormOpen";
import { useNoteService } from "./useNoteService";
import { useIsSaving } from "./useIsSaving";
import { isEmpty } from "../lib/strings";
import optimistic from "../lib/optimistic";
import { EMPTY_NOTE } from "../lib/constants";

export function useCreateNote() {
  const { getForm, setForm } = useNoteForm();
  const { userNotes, setUserNotes } = useUserNotes();
  const { setFormOpen } = useFormOpen();
  const { setIsSaving } = useIsSaving();
  const noteService = useNoteService();

  async function createNote() {
    // If user typed only whitespaces in form, clear form values and close.
    const form = getForm();
    const { title, content } = form;
    if (isEmpty(title) && isEmpty(content)) return setForm(EMPTY_NOTE);

    // Set optimistic notes.
    const newNote = { id: uuid(), ...form };
    const optimisticNotes = optimistic.notes.addOne(userNotes, newNote);
    setUserNotes(optimisticNotes);

    // Reset form and set saving state.
    setForm(EMPTY_NOTE);
    setFormOpen(false);
    setIsSaving(true);

    // Create new note and fetch updated note.
    await noteService.create(newNote);
    const data = await noteService.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
  }

  return createNote;
}
