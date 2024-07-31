import { useSearchParams } from "react-router-dom";
import TagLink from "../../../components/TagLink";
import TagIcon from "../../../components/icons/TagIcon";
import type { Tag } from "../../../types";

type MenuTagProps = { tag: Tag };

function MenuTag({ tag }: MenuTagProps) {
  const [searchParams] = useSearchParams();
  const filterTag = searchParams.get("tag");
  const selected = filterTag === tag.name && "text-aqua";

  return (
    <TagLink
      key={tag.id}
      name={tag.name}
      className={`inline-block shrink-0 w-full text-left px-6 py-3 truncate hover:text-aqua ${selected}`}
    >
      <TagIcon className="shrink-0 inline-block mr-2" />
      {tag.name}
    </TagLink>
  );
}

export default MenuTag;
