import { v4 as uuid } from "uuid";
import { useNoteForm } from "./useNoteForm";
import { useUserNotes } from "./useUserNotes";
import { useFormOpen } from "./useFormOpen";
import { useNoteService } from "./useNoteService";
import { useIsSaving } from "./useIsSaving";
import { isEmpty } from "../lib/strings";
import { now } from "../lib/time";
import { addNote } from "../lib/notes";
import { EMPTY_NOTE } from "../lib/constants";

// Hook that returns function to create a note.
export function useCreateNote() {
  const { getForm, setForm } = useNoteForm();
  const { userNotes, setUserNotes } = useUserNotes();
  const { setFormOpen } = useFormOpen();
  const { setIsSaving } = useIsSaving();
  const noteService = useNoteService();

  // Function that creates a note in db and updates state
  // with optimistic values.
  async function createNote() {
    // If user typed only whitespaces in form, clear form values and close.
    const form = getForm();
    const { title, content } = form;
    if (isEmpty(title) && isEmpty(content)) {
      setFormOpen(false);
      return setForm(EMPTY_NOTE);
    }

    // Config pinned time (for sorting) and add to new note.
    const pinnedAt = form.pinned ? now() : undefined;
    const newNote = { id: uuid(), pinnedAt, ...form };

    // Set optimistic notes.
    const optimisticNotes = addNote(userNotes, newNote);
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
