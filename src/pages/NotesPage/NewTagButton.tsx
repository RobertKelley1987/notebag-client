import { useContext } from "react";
import NoteContext from "../../context/NoteContext";
import UserNotesContext from "../../context/UserNotesContext";
import UserTagsContext from "../../context/UserTagsContext";
import { useNoteService } from "../../hooks/useNoteService";
import { useTagService } from "../../hooks/useTagService";
import { compareTags } from "../../utils";
import type { Dispatch, MouseEvent, SetStateAction } from "react";

type NewTagButtonProps = {
  tagName: string;
  setTagName: Dispatch<SetStateAction<string>>;
};

function NewTagButton({ tagName, setTagName }: NewTagButtonProps) {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { note } = useContext(NoteContext);
  const notes = useNoteService();
  const tags = useTagService();

  async function handleClick(e: MouseEvent) {
    e.stopPropagation();

    // Save tag name and clear search form
    const name = tagName;
    setTagName("");

    // Set optimistic tags
    const optimisticTags = [...userTags];
    const newTag = { id: "new-tag", name };
    optimisticTags.push(newTag);
    optimisticTags.sort(compareTags);
    setUserTags(optimisticTags);

    // Set optimistic notes with tag added to this note
    const optimisticNote = { ...note };
    const optimisticNotes = [...userNotes];
    optimisticNote.tags.push(newTag);
    optimisticNote.tags.sort(compareTags);
    const noteIndex = userNotes.findIndex(
      (userNote) => userNote.id === optimisticNote.id
    );
    optimisticNotes.splice(noteIndex, 1, optimisticNote);
    setUserNotes(optimisticNotes);

    // Create tag in db and add to current note
    const { tag } = await tags.create(name);
    await notes.updateTags(note.id, tag.id);

    // Fetch updated data and update state
    const data = await Promise.all([tags.findAll(), notes.findAll()]);
    const [tagData, noteData] = data;
    setUserTags(tagData.tags);
    setUserNotes(noteData.notes);
  }

  return (
    <button onClick={handleClick} className="text-left">
      Create tag "{tagName}"
    </button>
  );
}

export default NewTagButton;
