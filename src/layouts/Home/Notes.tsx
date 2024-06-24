import { useContext } from "react";
import NoteList from "../../pages/NotesPage/NoteList";
import Loading from "../../pages/NotesPage/Loading";
import UserNotesContext from "../../context/UserNotesContext";

function NotesPage() {
  const { userNotes, isLoading } = useContext(UserNotesContext);
  return isLoading ? <Loading /> : <NoteList notes={userNotes} />;
}

export default NotesPage;
