import { Link, useSearchParams } from "react-router-dom";
import { Tag } from "../../../types";

type MenuTagProps = { tag: Tag };

function MenuTag({ tag }: MenuTagProps) {
  const [searchParams] = useSearchParams();
  const filterTag = searchParams.get("tag");
  const selected = filterTag === tag.name && "text-aqua";

  return (
    <Link
      key={tag.id}
      className={`shrink-0 w-full text-left px-6 py-2 truncate hover:text-aqua ${selected}`}
      to={`/notes?tag=${tag.name}`}
    >
      {tag.name}
    </Link>
  );
}

export default MenuTag;
