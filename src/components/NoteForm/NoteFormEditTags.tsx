import { useCreateTagFromForm } from "../../hooks/useCreateTagFromForm";
import EditTags from "../NoteOptions/EditTags/EditTags";
import EditTagsInput from "../NoteOptions/EditTags/EditTagsInput";
import NoteFormTagCheckbox from "./NoteFormTagCheckbox";
import NoteFormCreateTagButton from "./NoteFormCreateTagButton";
import TagResults from "../NoteOptions/EditTags/TagResults";
import type { Tag } from "../../types";

function NoteFormEditTags() {
  const createTagFromForm = useCreateTagFromForm();

  const renderCheckbox = (tag: Tag) => (
    <NoteFormTagCheckbox key={tag.id} tag={tag} />
  );

  return (
    <EditTags input={<EditTagsInput createTag={createTagFromForm} />}>
      <TagResults renderCheckbox={renderCheckbox} />
      <NoteFormCreateTagButton />
    </EditTags>
  );
}

export default NoteFormEditTags;
