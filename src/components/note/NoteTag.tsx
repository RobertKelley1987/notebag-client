import { Link } from "react-router-dom";

type NoteTagProps = {
  name: string;
};

function NoteTag({ name }: NoteTagProps) {
  return (
    <li className="max-w-full flex">
      <Link
        onClick={(e) => e.stopPropagation()}
        to={`/notes?tag=${name}`}
        className="inline-block w-full border border-black p-1 truncate hover:bg-black hover:text-aqua"
      >
        {name}
      </Link>
    </li>
  );
}

export default NoteTag;
