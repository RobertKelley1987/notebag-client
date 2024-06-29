import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { NoteContext } from "../../../context/NoteContext";
import { UserNotesContext } from "../../../context/UserNotesContext";
import { UserTagsContext } from "../../../context/UserTagsContext";
import { IsSavingContext } from "../../../context/IsSavingContext";
import { useNoteService } from "../../../hooks/useNoteService";
import { useTagService } from "../../../hooks/useTagService";
import optimistic from "../../../lib/optimistic";
import type { Dispatch, MouseEvent, SetStateAction } from "react";

type NewTagButtonProps = {
  tagName: string;
  setTagName: Dispatch<SetStateAction<string>>;
};

function NewTagButton({ tagName, setTagName }: NewTagButtonProps) {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const { note } = useContext(NoteContext);
  const notes = useNoteService();
  const tags = useTagService();

  async function handleClick(e: MouseEvent) {
    e.stopPropagation();

    // Save tag name and clear search form
    const newTag = { id: uuid(), name: tagName };
    setTagName("");

    // Set optimistic tags
    const optimisticTags = optimistic.tags.addOne(userTags, newTag);
    setUserTags(optimisticTags);

    // Set optimistic notes with tag added to this note
    const optimisticNotes = optimistic.notes.addTag(userNotes, note, newTag);
    setUserNotes(optimisticNotes);

    // Set saving state.
    setIsSaving(true);

    // Create tag in db and add to current note
    const { tag } = await tags.create(newTag.id, newTag.name);
    await notes.updateTags(note.id, tag.id);

    // Fetch updated data and update state
    const data = await Promise.all([tags.findAll(), notes.findAll()]);
    const [tagData, noteData] = data;
    setUserTags(tagData.tags);
    setUserNotes(noteData.notes);
    setIsSaving(false);
  }

  return (
    <button onClick={handleClick} className="text-left">
      Create tag "{tagName}"
    </button>
  );
}

export default NewTagButton;
