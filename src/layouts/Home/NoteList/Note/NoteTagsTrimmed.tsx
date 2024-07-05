import NoteTag from "../../../../components/note/NoteTag";
import NoteTags from "../../../../components/note/NoteTags";
import type { Tag } from "../../../../types";

type NoteTagsTrimmedProps = {
  tags: Tag[];
};

function NoteTagsTrimmed({ tags }: NoteTagsTrimmedProps) {
  const trimTags = tags.length > 3;
  if (trimTags) {
    const numTrimmed = tags.length - 2;
    tags = tags.slice(0, 2);
    tags.push({ id: "more-tags", name: `+${numTrimmed}` });
  }

  return <NoteTags tags={tags} />;
}

export default NoteTagsTrimmed;
