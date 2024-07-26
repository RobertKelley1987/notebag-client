import NoteFormContextProvider from "../../../context/NoteFormContext";
import { useIsSmallScreen } from "../../../hooks/useIsSmallScreen";
import NewNoteDesktop from "./NewNoteDesktop";
import NewNoteModal from "./NewNoteModal";

function NewNote() {
  const { isSmallScreen } = useIsSmallScreen();

  return (
    <NoteFormContextProvider>
      {isSmallScreen ? <NewNoteModal /> : <NewNoteDesktop />}
    </NoteFormContextProvider>
  );
}

export default NewNote;
