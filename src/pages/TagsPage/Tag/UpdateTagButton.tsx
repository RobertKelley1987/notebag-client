import { useEditedTag } from "../../../hooks/useEditedTag";
import { useUpdateTag } from "../../../hooks/useUpdateTag";
import CheckmarkIcon from "../../../components/icons/CheckmarkIcon";
import type { Tag } from "../../../types";

type UpdateTagButtonProps = {
  tag: Tag;
};

function UpdateTagButton({ tag }: UpdateTagButtonProps) {
  const { editedTag, setEditedTag } = useEditedTag();
  const updateTag = useUpdateTag();

  function handleClick() {
    if (editedTag) updateTag(editedTag, () => setEditedTag(null));
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
