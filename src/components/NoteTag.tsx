import { Link } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import type { MouseEvent } from "react";

type NoteTagProps = {
  name: string;
};

// e.stopPropagation() prevents edit note form from opening when this link is clicked inside
// a note.
function NoteTag({ name }: NoteTagProps) {
  const { setModal } = useModal();

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    // Close edit note modal if it is open.
    setModal("");
  }

  return (
    <li className="max-w-full flex">
      <Link
        onClick={handleClick}
        to={`/notes?tag=${name}`}
        className="inline-block w-full border border-black p-1 truncate hover:bg-black hover:text-aqua"
      >
        {name}
      </Link>
    </li>
  );
}

export default NoteTag;
