import Tag from "./Tag";
import type { Tag as TagType } from "../../types";

type TagListProps = {
  tags: TagType[];
};

function TagList({ tags }: TagListProps) {
  return (
    <ul>
      {tags.map((tag) => {
        return <Tag key={tag.id} tag={tag} />;
      })}{" "}
    </ul>
  );
}

export default TagList;
