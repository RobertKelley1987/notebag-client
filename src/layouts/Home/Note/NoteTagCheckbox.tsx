import { useUserNotes } from "../../../hooks/useUserNotes";
import { useIsSaving } from "../../../hooks/useIsSaving";
import { useNoteService } from "../../../hooks/useNoteService";
import { useNote } from "../../../hooks/useNote";
import { toggleNoteTag } from "../../../lib/notes";
import TagCheckbox from "../../../components/NoteOptions/EditTags/TagCheckbox";
import type { Tag } from "../../../types";

type NoteTagCheckboxProps = {
  tag: Tag;
};

// Tag checkbox with change function required for an existing note.
function NoteTagCheckbox({ tag }: NoteTagCheckboxProps) {
  const { setIsSaving } = useIsSaving();
  const { userNotes, setUserNotes } = useUserNotes();
  const { note } = useNote();
  const tagIndex = note?.tags.findIndex((noteTag) => noteTag.id === tag.id);
  const noteService = useNoteService();

  async function handleChange() {
    if (!note) return;

    // Set optimistic notes
    const optimisiticNotes = toggleNoteTag(userNotes, note, tag);
    setUserNotes(optimisiticNotes);

    // Set saving state.
    setIsSaving(true);

    // Add or remove tag in db and fetch updated notes
    await noteService.updateTags(note.id, tag.id);
    const data = await noteService.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
  }

  return (
    <TagCheckbox
      handleChange={handleChange}
      tag={tag}
      isChecked={tagIndex !== -1}
    />
  );
}

export default NoteTagCheckbox;
