import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { UserTagsContext } from "../../../context/UserTagsContext";
import { IsSavingContext } from "../../../context/IsSavingContext";
import { NoteTagsContext } from "../../../context/NoteTagsContext";
import { useTagService } from "../../../hooks/useTagService";
import optimistic, { compareTags } from "../../../lib/optimistic";
import CreateTagButton from "../../../components/note/CreateTagButton";
import type { Dispatch, MouseEvent, SetStateAction } from "react";

type NewNoteCreateTagButtonProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

function NewNoteCreateTagButton({
  search,
  setSearch,
}: NewNoteCreateTagButtonProps) {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { setNoteTags } = useContext(NoteTagsContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const tags = useTagService();

  async function handleClick(e: MouseEvent) {
    e.stopPropagation();

    // Save tag name and clear search form
    const newTag = { id: uuid(), name: search.trim() };
    setSearch("");

    // Set optimistic tags
    const optimisticTags = optimistic.tags.addOne(userTags, newTag);
    setUserTags(optimisticTags);

    // Add tag to new note
    setNoteTags((prev) => {
      const updated = [...prev, newTag];
      updated.sort(compareTags);
      return updated;
    });

    // Set saving state.
    setIsSaving(true);

    // Create tag in db and add to current note
    await tags.create(newTag.id, newTag.name);

    // Fetch updated data and update state
    const data = await tags.findAll();
    setUserTags(data.tags);
    setIsSaving(false);
  }

  return <CreateTagButton tagName={search} handleClick={handleClick} />;
}

export default NewNoteCreateTagButton;
