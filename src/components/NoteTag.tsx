import { useModal } from "../hooks/useModal";
import TagLink from "./TagLink";
import type { MouseEvent } from "react";

type NoteTagProps = {
  name: string;
};

function NoteTag({ name }: NoteTagProps) {
  const { setModal } = useModal();

  function handleClick(e: MouseEvent) {
    // e.stopPropagation() prevents edit note form from opening when this link is clicked inside
    // a note.
    e.stopPropagation();
    // Close edit note modal if it is open.
    setModal("");
  }

  return (
    <li className="max-w-full flex">
      <TagLink
        name={name}
        onClick={handleClick}
        className="inline-block w-full border border-black p-1 truncate hover:bg-black hover:text-aqua"
      >
        {name}
      </TagLink>
    </li>
  );
}

export default NoteTag;
