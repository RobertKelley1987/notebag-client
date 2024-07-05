import PlusIcon from "../icons/PlusIcon";
import type { MouseEvent } from "react";

type CreateTagButtonProps = {
  tagName: string;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
};

function CreateTagButton({ tagName, handleClick }: CreateTagButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 hover:text-aqua"
    >
      <PlusIcon className="shrink-0" />
      <span className="break-words text-left w-full shrink">
        Create tag "{tagName.trim()}"
      </span>
    </button>
  );
}

export default CreateTagButton;
