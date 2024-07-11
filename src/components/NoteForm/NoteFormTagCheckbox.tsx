import TagCheckbox from "../NoteOptions/EditTags/TagCheckbox";
import { useNoteForm } from "../../hooks/useNoteForm";
import { compareTags } from "../../lib/optimistic";
import type { Tag } from "../../types";

type NoteFormTagCheckboxProps = {
  tag: Tag;
};

// Tag checkbox with change function required for a new note.
function NoteFormTagCheckbox({ tag }: NoteFormTagCheckboxProps) {
  const { noteForm, setNoteForm } = useNoteForm();
  const tagIndex = noteForm.tags.findIndex((noteTag) => noteTag.id === tag.id);

  async function handleChange() {
    let tags = [...noteForm.tags];
    if (tagIndex !== -1) {
      tags = tags.filter((noteTag) => noteTag.id !== tag.id);
    } else {
      tags.sort(compareTags);
    }
    setNoteForm((prev) => {
      return { ...prev, tags };
    });
  }

  return (
    <TagCheckbox
      handleChange={handleChange}
      tag={tag}
      isChecked={tagIndex !== -1}
    />
  );
}

export default NoteFormTagCheckbox;
