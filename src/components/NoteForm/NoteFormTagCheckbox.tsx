import TagCheckbox from "../NoteOptions/EditTags/TagCheckbox";
import { useNoteForm } from "../../hooks/useNoteForm";
import { compareTags } from "../../lib/optimistic";
import type { Tag } from "../../types";

type FormTagCheckboxProps = {
  tag: Tag;
};

// Tag checkbox with change function required for a new note.
function FormTagCheckbox({ tag }: FormTagCheckboxProps) {
  const { tags, setTags } = useNoteForm();
  const tagIndex = tags.findIndex((noteTag) => noteTag.id === tag.id);

  async function handleChange() {
    let updatedTags = [...tags];
    if (tagIndex !== -1) {
      updatedTags = tags.filter((noteTag) => noteTag.id !== tag.id);
    } else {
      updatedTags.push(tag);
      updatedTags.sort(compareTags);
    }
    setTags(updatedTags);
  }

  return (
    <TagCheckbox
      handleChange={handleChange}
      tag={tag}
      isChecked={tagIndex !== -1}
    />
  );
}

export default FormTagCheckbox;
