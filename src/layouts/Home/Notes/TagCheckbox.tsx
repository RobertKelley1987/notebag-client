import { useContext } from "react";
import { UserNotesContext } from "../../../context/UserNotesContext";
import { NoteContext } from "../../../context/NoteContext";
import { useNoteService } from "../../../hooks/useNoteService";
import optimistic from "../../../lib/optimistic";
import type { Tag } from "../../../types";
import { IsSavingContext } from "../../../context/IsSavingContext";

type TagCheckboxProps = {
  tag: Tag;
};

function TagCheckbox({ tag }: TagCheckboxProps) {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { note } = useContext(NoteContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const notes = useNoteService();
  const tagIndex = note.tags.findIndex((noteTag) => noteTag.id === tag.id);

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
    <li className="flex gap-2">
      <input
        onChange={handleChange}
        type="checkbox"
        id={tag.name}
        value={tag.name}
        checked={tagIndex !== -1}
      />
      <label htmlFor={tag.name}>{tag.name}</label>
    </li>
  );
}

export default TagCheckbox;
