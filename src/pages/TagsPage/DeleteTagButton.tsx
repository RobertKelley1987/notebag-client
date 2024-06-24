import { useContext } from "react";
import UserNotesContext from "../../context/UserNotesContext";
import UserTagsContext from "../../context/UserTagsContext";
import IsSavingContext from "../../context/IsSavingContext";
import { useNoteService } from "../../hooks/useNoteService";
import { useTagService } from "../../hooks/useTagService";

type DeleteTagButtonProps = {
  tagId: string;
};

function DeleteTagButton({ tagId }: DeleteTagButtonProps) {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { isSaving, setIsSaving } = useContext(IsSavingContext);
  const { setUserNotes } = useContext(UserNotesContext);
  const notes = useNoteService();
  const tags = useTagService();

  async function handleClick() {
    // Set saving state
    setIsSaving(true);

    // Set optimistic tags
    const optimistic = userTags.filter((userTag) => userTag.id !== tagId);
    setUserTags(optimistic);

    // Delete tag in db and update state
    await tags.delete(tagId);
    const tagData = await tags.findAll();
    setUserTags(tagData.tags);

    // Fetch updated notes and update state
    const noteData = await notes.findAll();
    setUserNotes(noteData.notes);

    // Update saving state
    setIsSaving(false);
  }

  return (
    <button
      disabled={isSaving}
      onClick={handleClick}
      className="disabled:opacity-50 disabled:hover:cursor-auto"
    >
      Delete
    </button>
  );
}

export default DeleteTagButton;
