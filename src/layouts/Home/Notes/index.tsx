import { useContext, useEffect, useState } from "react";
import { UserNotesContext } from "../../../context/UserNotesContext";
import { useNoteService } from "../../../hooks/useNoteService";
import NoteList from "./NoteList";
import Loading from "./Loading";
import FetchError from "./FetchError";

function NotesPage() {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const notes = useNoteService();

  useEffect(() => {
    let isMounted = true;

    const getNotes = async () => {
      try {
        const data = await notes.findAll();
        if (isMounted) {
          setUserNotes(data.notes);
          setIsLoading(false);
        }
      } catch (error) {
        setError(true);
      }
    };

    getNotes();

    return () => {
      isMounted = false;
      notes.abort();
    };
  }, [error]);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <FetchError setError={setError} />;
  } else {
    return <NoteList notes={userNotes} />;
  }
}

export default NotesPage;
