import { useContext } from "react";
import { NoteTagsContext } from "../../../context/NoteTagsContext";
import TagCheckbox from "../../../components/Note/TagCheckbox";
import type { Tag } from "../../../types";
import { compareTags } from "../../../lib/optimistic";

type NewNoteTagCheckboxProps = {
  tag: Tag;
};

// Tag checkbox with change function required for a new note.
function NewNoteTagCheckbox({ tag }: NewNoteTagCheckboxProps) {
  const { noteTags, setNoteTags } = useContext(NoteTagsContext);
  const tagIndex = noteTags.findIndex((noteTag) => noteTag.id === tag.id);

  async function handleChange() {
    if (tagIndex !== -1) {
      setNoteTags((prev) => prev.filter((noteTag) => noteTag.id !== tag.id));
    } else {
      setNoteTags((prev) => {
        const updated = [...prev, tag];
        updated.sort(compareTags);
        return updated;
      });
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
