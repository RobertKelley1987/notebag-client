import Tag from "./Tag";
import type { Tag as TagType } from "../../types";

type TagListProps = {
  tags: TagType[];
  updateTagName: (tag: TagType, closeFn: () => void) => Promise<void>;
};

function TagList({ tags, updateTagName }: TagListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {tags.map((tag) => {
        return <Tag key={tag.id} tag={tag} updateTagName={updateTagName} />;
      })}{" "}
    </ul>
  );
}

export default TagList;
