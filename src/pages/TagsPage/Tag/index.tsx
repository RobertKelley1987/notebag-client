import { useContext, useState } from "react";
import { useEditedTag } from "../../../hooks/useEditedTag";
import { useIsSaving } from "../../../hooks/useIsSaving";
import TagInput from "./TagInput";
import DeleteTagButton from "./DeleteTagButton";
import UpdateTagButton from "./UpdateTagButton";
import TagIcon from "../../../components/icons/TagIcon";
import PencilIcon from "../../../components/icons/PencilIcon";
import type { Tag as TagType } from "../../../types";

type TagProps = {
  tag: TagType;
};

function Tag({ tag }: TagProps) {
  const { editedTag, setEditedTag } = useEditedTag();
  const { isSaving } = useIsSaving();
  const [isHovering, setIsHovering] = useState(false);
  const isFocused = editedTag?.id === tag.id;
  const allowDelete = (isFocused || isHovering) && !isSaving;

  return (
    <li
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex justify-between gap-3"
    >
      {allowDelete ? (
        <DeleteTagButton tag={tag} />
      ) : (
        <TagIcon className="shrink-0" />
      )}
      <TagInput tag={tag} />
      {isFocused ? (
        <UpdateTagButton tag={tag} />
      ) : (
        <PencilIcon
          className="shrink-0 hover:text-aqua cursor-pointer"
          onClick={() => setEditedTag(tag)}
        />
      )}
    </li>
  );
}

export default Tag;
