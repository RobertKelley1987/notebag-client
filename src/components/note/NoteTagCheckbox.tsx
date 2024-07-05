import { useContext } from "react";
import { UserNotesContext } from "../../context/UserNotesContext";
import { NoteContext } from "../../context/NoteContext";
import { useNoteService } from "../../hooks/useNoteService";
import { IsSavingContext } from "../../context/IsSavingContext";
import optimistic from "../../lib/optimistic";
import TagCheckbox from "./TagCheckbox";
import type { Tag } from "../../types";

type NoteTagCheckboxProps = {
  tag: Tag;
};

// Tag checkbox with change function required for an existing note.
function NoteTagCheckbox({ tag }: NoteTagCheckboxProps) {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const { note } = useContext(NoteContext);
  const tagIndex = note.tags.findIndex((noteTag) => noteTag.id === tag.id);
  const notes = useNoteService();

  async function handleChange() {
    // Set optimistic notes
    const optimisiticNotes = optimistic.notes.toggleTag(userNotes, note, tag);
    setUserNotes(optimisiticNotes);

    // Set saving state.
    setIsSaving(true);

    // Add or remove tag in db and fetch updated notes
    await notes.updateTags(note.id, tag.id);
    const data = await notes.findAll();
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
