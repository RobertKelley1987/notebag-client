import { useContext } from "react";
import { UserNotesContext } from "../../../context/UserNotesContext";
import { UserTagsContext } from "../../../context/UserTagsContext";
import { IsSavingContext } from "../../../context/IsSavingContext";
import { useNoteService } from "../../../hooks/useNoteService";
import { useTagService } from "../../../hooks/useTagService";
import optimistic from "../../../lib/optimistic";
import TrashIcon from "../../../components/icons/TrashIcon";
import type { Tag } from "../../../types";

type DeleteTagButtonProps = {
  tag: Tag;
};

function DeleteTagButton({ tag }: DeleteTagButtonProps) {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { isSaving, setIsSaving } = useContext(IsSavingContext);
  const { setUserNotes } = useContext(UserNotesContext);
  const notes = useNoteService();
  const tags = useTagService();

  async function handleClick() {
    // Set optimistic tags.
    const optimisticTags = optimistic.tags.removeOne(userTags, tag);
    setUserTags(optimisticTags);

    // Set saving state.
    setIsSaving(true);

    // Delete tag in db and update state.
    await tags.delete(tag.id);
    const tagData = await tags.findAll();
    setUserTags(tagData.tags);

    // Fetch updated notes and update state.
    const noteData = await notes.findAll();
    setUserNotes(noteData.notes);

    // Update saving state.
    setIsSaving(false);
  }

  return (
    <button
      id={`delete-${tag.id}`}
      disabled={isSaving}
      onClick={handleClick}
      className="disabled:opacity-50 disabled:hover:cursor-auto hover:text-aqua"
    >
      <TrashIcon />
    </button>
  );
}

export default DeleteTagButton;
