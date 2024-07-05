import { useContext } from "react";
import { TagNameContext } from "../../../context/TagNameContext";
import { EditedTagContext } from "../../../context/EditedTagContext";
import CheckmarkIcon from "../../../components/icons/CheckmarkIcon";
import type { Tag } from "../../../types";

type UpdateTagButtonProps = {
  tag: Tag;
};

function UpdateTagButton({ tag }: UpdateTagButtonProps) {
  const { updateTagName } = useContext(TagNameContext);
  const { editedTag, setEditedTag } = useContext(EditedTagContext);

  function handleClick() {
    if (editedTag) updateTagName(editedTag, () => setEditedTag(null));
  }

  return (
    <button
      id={`update-${tag.id}`}
      onClick={handleClick}
      className="hover:text-aqua"
    >
      <CheckmarkIcon />
    </button>
  );
}

export default UpdateTagButton;
