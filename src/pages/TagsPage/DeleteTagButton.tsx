import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserNotesContext from "../../context/UserNotesContext";
import UserTagsContext from "../../context/UserTagsContext";
import notes from "../../services/notes";
import tags from "../../services/tags";

type DeleteTagButtonProps = {
  tagId: string;
};

function DeleteTagButton({ tagId }: DeleteTagButtonProps) {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { setUserNotes } = useContext(UserNotesContext);
  const navigate = useNavigate();

  async function handleClick() {
    // Set optimistic tags
    const optimistic = userTags.filter((userTag) => userTag.id !== tagId);
    setUserTags(optimistic);

    // Return to tags page
    navigate("/tags");

    // Delete tag in db and update state
    await tags.delete(tagId);
    const res = await tags.findAll();
    setUserTags(res.tags);

    // Fetch updated notes
    const noteData = await notes.findAll();
    setUserNotes(noteData.notes);
  }

  return <button onClick={handleClick}>Delete</button>;
}

export default DeleteTagButton;
