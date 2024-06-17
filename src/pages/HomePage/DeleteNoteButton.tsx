import { useContext } from "react";
import UserNotesContext from "../../context/UserNotesContext";
import NoteIdContext from "../../context/NoteContext";
import notes from "../../services/notes";

function DeleteNoteButton() {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const currentNote = useContext(NoteIdContext)?.note;

  async function handleClick() {
    if (currentNote) {
      const { error } = await notes.delete(currentNote.id);
      if (!error) {
        // Set optimistic notes
        const optimistic = userNotes.filter(
          (note) => note.id !== currentNote.id
        );
        setUserNotes(optimistic);

        // Delete note from db and set updated notes
        const res = await notes.findAll();
        setUserNotes(res.notes);
      }
    }
  }

  return <button onClick={handleClick}>Delete Note</button>;
}

export default DeleteNoteButton;
