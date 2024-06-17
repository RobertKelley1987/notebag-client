import { useContext } from "react";
import UserNotesContext from "../../context/UserNotesContext";
import NoteContext from "../../context/NoteContext";
import type { Tag } from "../../types";
import notes from "../../services/notes";
import { compareTags } from "../../utils";

type TagCheckboxProps = {
  tag: Tag;
};

function TagCheckbox({ tag }: TagCheckboxProps) {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const currentNote = useContext(NoteContext).note;
  const tagIndex = currentNote.tags.findIndex(
    (noteTag) => noteTag.id === tag.id
  );

  async function handleChange() {
    // Set optimistic notes
    const updatedNote = { ...currentNote };
    if (tagIndex === -1) {
      updatedNote.tags.push(tag);
      updatedNote.tags.sort(compareTags);
    } else {
      updatedNote.tags = updatedNote.tags.filter(
        (noteTag) => noteTag.id !== tag.id
      );
    }

    const currentNoteIndex = userNotes.findIndex(
      (note) => note.id === currentNote.id
    );

    const updatedNotes = [...userNotes];
    updatedNotes.splice(currentNoteIndex, 1, updatedNote);
    setUserNotes(updatedNotes);

    // Add or remove tag in db and fetch updated notes
    await notes.updateTags(currentNote.id, tag.id);
    const res = await notes.findAll();
    setUserNotes(res.notes);
  }

  return (
    <p>
      <input
        onChange={handleChange}
        type="checkbox"
        id={tag.name}
        value={tag.name}
        checked={tagIndex !== -1}
      />
      <label htmlFor={tag.name}>{tag.name}</label>
    </p>
  );
}

export default TagCheckbox;
