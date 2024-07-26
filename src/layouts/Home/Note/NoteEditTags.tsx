import { useCreateTagFromNote } from "../../../hooks/useCreateTagFromNote";
import EditTags from "../../../components/NoteOptions/EditTags";
import EditTagsInput from "../../../components/NoteOptions/EditTags/EditTagsInput";
import NoteTagCheckbox from "./NoteTagCheckbox";
import NoteCreateTagButton from "./NoteCreateTagButton";
import TagResults from "../../../components/NoteOptions/EditTags/TagResults";
import type { Tag } from "../../../types";

function NoteEditTags() {
  const createTagFromNote = useCreateTagFromNote();

  const renderCheckbox = (tag: Tag) => (
    <NoteTagCheckbox key={tag.id} tag={tag} />
  );

  return (
    <EditTags input={<EditTagsInput createTag={createTagFromNote} />}>
      <TagResults renderCheckbox={renderCheckbox} />
      <NoteCreateTagButton />
    </EditTags>
  );
}

export default NoteEditTags;
