import NoteTag from "./NoteTag";
import { Tag } from "../types";

type NoteTagsProps = {
  tags: Tag[];
};

function NoteTags({ tags }: NoteTagsProps) {
  return (
    <ul className="flex flex-wrap my-2 gap-2">
      {tags.map((tag) => (
        <NoteTag key={tag.id} name={tag.name} />
      ))}
    </ul>
  );
}

export default NoteTags;
