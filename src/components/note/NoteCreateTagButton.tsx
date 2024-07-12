import { useCreateTagFromNote } from "../../hooks/useCreateTagFromNote";
import CreateTagButton from "../NoteOptions/EditTags/CreateTagButton";

function NoteCreateTagButton() {
  const createTagFromNote = useCreateTagFromNote();
  return <CreateTagButton createTag={createTagFromNote} />;
}

export default NoteCreateTagButton;
