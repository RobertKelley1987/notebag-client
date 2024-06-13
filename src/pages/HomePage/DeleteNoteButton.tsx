import { useContext } from "react";
import UserNotesContext from "../../context/UserNotesContext";
import notes from "../../services/notes";

type DeleteNoteButtonProps = {
  noteId: string;
};

function DeleteNoteButton({ noteId }: DeleteNoteButtonProps) {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);

  async function handleClick() {
    const { error } = await notes.delete(noteId);
    if (!error) {
      // Set optimistic notes
      const optimistic = userNotes.filter((note) => note.id !== noteId);
      setUserNotes(optimistic);

      // Delete note from db and set updated notes
      const res = await notes.findAll();
      setUserNotes(res.notes);
    }
  }

  return <button onClick={handleClick}>Delete Note</button>;
}

export default DeleteNoteButton;
