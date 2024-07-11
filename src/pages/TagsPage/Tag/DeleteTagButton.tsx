import { useIsSaving } from "../../../hooks/useIsSaving";
import { useDeleteTag } from "../../../hooks/useDeleteTag";
import TrashIcon from "../../../components/icons/TrashIcon";
import type { Tag } from "../../../types";

type DeleteTagButtonProps = {
  tag: Tag;
};

function DeleteTagButton({ tag }: DeleteTagButtonProps) {
  const { isSaving } = useIsSaving();
  const deleteTag = useDeleteTag(tag);

  return (
    <button
      id={`delete-${tag.id}`}
      disabled={isSaving}
      onClick={deleteTag}
      className="disabled:opacity-50 disabled:hover:cursor-auto hover:text-aqua"
    >
      <TrashIcon />
    </button>
  );
}

export default DeleteTagButton;
