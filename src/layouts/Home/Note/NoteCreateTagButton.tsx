import { useCreateTagFromNote } from "../../../hooks/useCreateTagFromNote";
import CreateTagButton from "../../../components/NoteOptions/EditTags/CreateTagButton";

function NoteCreateTagButton() {
  const createTagFromNote = useCreateTagFromNote();
  return <CreateTagButton createTag={createTagFromNote} />;
}

export default NoteCreateTagButton;
