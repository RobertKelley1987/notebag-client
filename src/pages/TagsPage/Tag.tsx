import { useContext } from "react";
import { EditedTagContext } from "../../context/EditedTagContext";
import DeleteTagButton from "./DeleteTagButton";
import TagIcon from "../../components/icons/TagIcon";
import CheckmarkIcon from "../../components/icons/CheckmarkIcon";
import type { ChangeEvent, FocusEvent } from "react";
import type { Tag as TagType } from "../../types";

type TagProps = {
  tag: TagType;
  updateTagName: (tag: TagType, closeFn: () => void) => Promise<void>;
};

function Tag({ tag, updateTagName }: TagProps) {
  const { editedTag, setEditedTag } = useContext(EditedTagContext);
  const isActive = editedTag?.id === tag.id;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEditedTag({ id: tag.id, name: e.target.value });
  }

  function handleBlur(e: FocusEvent<HTMLInputElement, Element>) {
    const clickedDeleteButton = e.relatedTarget?.id === `delete-${tag.id}`;
    const clickedUpdateButton = e.relatedTarget?.id === `update-${tag.id}`;
    if (!e.relatedTarget || clickedDeleteButton || clickedUpdateButton) return;
    setEditedTag(null);
  }

  function handleClick() {
    editedTag && updateTagName(editedTag, () => setEditedTag(null));
  }

  const checkmarkButton = (
    <button id={`update-${tag.id}`} onClick={handleClick}>
      <CheckmarkIcon />
    </button>
  );

  return (
    <li className="flex justify-between gap-3">
      {isActive ? (
        <DeleteTagButton tag={tag} />
      ) : (
        <TagIcon className="shrink-0" />
      )}
      <input
        type="text"
        defaultValue={tag.name}
        className="w-full focus:outline-none"
        onChange={handleChange}
        onFocus={() => setEditedTag(tag)}
        onBlur={handleBlur}
      />
      {isActive && checkmarkButton}
    </li>
  );
}

export default Tag;
