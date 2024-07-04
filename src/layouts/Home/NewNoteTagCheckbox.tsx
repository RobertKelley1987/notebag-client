import { useContext } from "react";
import { NoteTagsContext } from "../../context/NoteTagsContext";
import TagCheckbox from "./TagCheckbox";
import type { Tag } from "../../types";

type NewNoteTagCheckboxProps = {
  tag: Tag;
};

// Tag checkbox with change function required for a new note.
function NewNoteTagCheckbox({ tag }: NewNoteTagCheckboxProps) {
  const { tags, setTags } = useContext(NoteTagsContext);
  const tagIndex = tags.findIndex((noteTag) => noteTag.id === tag.id);

  async function handleChange() {
    if (tagIndex !== -1) {
      setTags((prev) => prev.filter((noteTag) => noteTag.id !== tag.id));
    } else {
      setTags((prev) => [...prev, tag]);
    }
  }

  return (
    <TagCheckbox
      handleChange={handleChange}
      tag={tag}
      isChecked={tagIndex !== -1}
    />
  );
}

export default NewNoteTagCheckbox;
