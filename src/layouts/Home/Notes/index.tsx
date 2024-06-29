import { useContext, useEffect, useState } from "react";
import { UserNotesContext } from "../../../context/UserNotesContext";
import { useNoteService } from "../../../hooks/useNoteService";
import NoteList from "./NoteList";
import Loading from "./Loading";

function NotesPage() {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const [isLoading, setIsLoading] = useState(false);
  const notes = useNoteService();

  useEffect(() => {
    const getNotes = async () => {
      const data = await notes.findAll();
      setUserNotes(data.notes);
      setIsLoading(false);
    };

    getNotes();
  }, []);

  return isLoading ? <Loading /> : <NoteList notes={userNotes} />;
}

export default NotesPage;
