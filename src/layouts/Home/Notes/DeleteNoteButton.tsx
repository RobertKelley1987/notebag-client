import { useContext } from "react";
import { UserNotesContext } from "../../../context/UserNotesContext";
import { NoteContext } from "../../../context/NoteContext";
import { IsSavingContext } from "../../../context/IsSavingContext";
import { useNoteService } from "../../../hooks/useNoteService";
import optimistic from "../../../lib/optimistic";

function DeleteNoteButton() {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const currentNote = useContext(NoteContext)?.note;
  const notes = useNoteService();

  async function handleClick() {
    if (!currentNote) return;

    const { error } = await notes.delete(currentNote.id);
    if (!error) {
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

  return (
    <button onClick={handleClick} className="hover:text-aqua">
      Delete Note
    </button>
  );
}

export default DeleteNoteButton;
