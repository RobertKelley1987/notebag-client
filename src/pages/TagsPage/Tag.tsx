import DeleteTagButton from "./DeleteTagButton";
import { Tag as TagType } from "../../types";

type TagProps = {
  tag: TagType;
};

function Tag({ tag }: TagProps) {
  return (
    <li className="flex justify-between">
      <span>{tag.name}</span>
      <DeleteTagButton tagId={tag.id} />
    </li>
  );
}

export default Tag;
