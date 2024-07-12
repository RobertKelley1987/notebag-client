import NoteTag from "../../../components/NoteTag";
import type { Tag } from "../../../types";

type NoteTagsTrimmedProps = {
  tags: Tag[];
};

function NoteTagsTrimmed({ tags }: NoteTagsTrimmedProps) {
  const trimTags = tags.length > 3;
  const numTrimmed = tags.length - 2;
  if (trimTags) tags = tags.slice(0, 2);

  const addlTags = (
    <span
      onClick={(e) => e.stopPropagation()}
      className="inline-block border border-black p-1 hover:bg-black hover:text-aqua cursor-default"
    >{`+${numTrimmed}`}</span>
  );

  return (
    <ul className="flex flex-wrap my-2 gap-2">
      {tags.map((tag) => (
        <NoteTag key={tag.id} name={tag.name} />
      ))}
      {trimTags && addlTags}
    </ul>
  );
}

export default NoteTagsTrimmed;
