import { useUpdateNoteTags } from "../../../hooks/useUpdateNoteTags";
import { useNote } from "../../../hooks/useNote";
import TagCheckbox from "../../../components/NoteOptions/EditTags/TagCheckbox";
import type { Tag } from "../../../types";

type NoteTagCheckboxProps = {
  tag: Tag;
};

// Tag checkbox with change function required for an existing note.
function NoteTagCheckbox({ tag }: NoteTagCheckboxProps) {
  const updateNoteTags = useUpdateNoteTags(tag);
  const { note } = useNote();
  const tagIndex = note?.tags.findIndex((noteTag) => noteTag.id === tag.id);

  return (
    <TagCheckbox
      handleChange={updateNoteTags}
      tag={tag}
      isChecked={tagIndex !== -1}
    />
  );
}

export default NoteTagCheckbox;
