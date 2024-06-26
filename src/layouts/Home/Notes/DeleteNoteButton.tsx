import { useContext } from "react";
import UserNotesContext from "../../../context/UserNotesContext";
import NoteIdContext from "../../../context/NoteContext";
import { useNoteService } from "../../../hooks/useNoteService";

function DeleteNoteButton() {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const currentNote = useContext(NoteIdContext)?.note;
  const notes = useNoteService();

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
        const data = await notes.findAll();
        setUserNotes(data.notes);
      }
    }
  }

  return <button onClick={handleClick}>Delete Note</button>;
}

export default DeleteNoteButton;
