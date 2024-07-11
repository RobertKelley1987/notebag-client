import { useTagSearch } from "../../../hooks/useTagSearch";
import PlusIcon from "../../icons/PlusIcon";
import type { MouseEvent } from "react";

type CreateTagButtonProps = {
  createTag: () => Promise<void>;
};

function CreateTagButton({ createTag }: CreateTagButtonProps) {
  const { tagSearch } = useTagSearch();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    createTag();
  }

  return (
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
}

export default CreateTagButton;
