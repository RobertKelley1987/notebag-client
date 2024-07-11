import { useCreateTagFromForm } from "../../hooks/useCreateTagFromForm";
import CreateTagButton from "../NoteOptions/EditTags/CreateTagButton";

function NoteFormCreateTagButton() {
  const createTagFromForm = useCreateTagFromForm();
  return <CreateTagButton createTag={createTagFromForm} />;
}

export default NoteFormCreateTagButton;
