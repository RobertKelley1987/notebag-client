import { Link, useSearchParams } from "react-router-dom";
import TagIcon from "../../../components/icons/TagIcon";
import type { Tag } from "../../../types";

type MenuTagProps = { tag: Tag };

function MenuTag({ tag }: MenuTagProps) {
  const [searchParams] = useSearchParams();
  const filterTag = searchParams.get("tag");
  const selected = filterTag === tag.name && "text-aqua";

  return (
    <Link
      key={tag.id}
      className={`flex gap-2 shrink-0 w-full text-left px-6 py-3 truncate hover:text-aqua ${selected}`}
      to={`/notes?tag=${tag.name}`}
    >
      <TagIcon />
      {tag.name}
    </Link>
  );
}

export default MenuTag;
