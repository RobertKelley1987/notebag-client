import { useTagSearch } from "../../../hooks/useTagSearch";
import { useUserTags } from "../../../hooks/useUserTags";
import PlusIcon from "../../icons/PlusIcon";
import type { MouseEvent } from "react";

type CreateTagButtonProps = {
  createTag: () => Promise<void>;
};

function CreateTagButton({ createTag }: CreateTagButtonProps) {
  const { userTags } = useUserTags();
  const { tagSearch } = useTagSearch();
  const searchIndex = userTags.findIndex((tag) => tag.name === tagSearch);
  const tagDoesNotExist = tagSearch && searchIndex === -1;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    createTag();
  }

  const button = (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 hover:text-aqua"
    >
      <PlusIcon className="shrink-0" />
      <span className="break-words text-left w-full shrink">
        Create tag "{tagSearch.trim()}"
      </span>
    </button>
  );

  return tagDoesNotExist ? button : null;
}

export default CreateTagButton;
