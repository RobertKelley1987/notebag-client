import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import UserTagsContext from "../../context/UserTagsContext";
import type { Dispatch, SetStateAction } from "react";

type MenuProps = {
  setEditingTags: Dispatch<SetStateAction<boolean>>;
};

function Menu({ setEditingTags }: MenuProps) {
  const { userTags } = useContext(UserTagsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterTag = searchParams.get("tag");

  return (
    <div className="w-[350px] flex flex-col">
      <Link
        className={`whitespace-nowrap px-6 py-2 ${!filterTag && "bg-blue-400"}`}
        to="/notes"
      >
        Notes
      </Link>
      {userTags.map((tag) => {
        const selected = filterTag === tag.name && "bg-blue-400";

        return (
          <button
            key={tag.id}
            className={`px-6 py-2 whitespace-nowrap ${selected}`}
            onClick={() => setSearchParams({ tag: tag.name })}
          >
            {tag.name}
          </button>
        );
      })}
      <button
        onClick={() => setEditingTags(true)}
        className="whitespace-nowrap px-6 py-2"
      >
        Edit Tags
      </button>
    </div>
  );
}

export default Menu;
