import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserTagsContext } from "../../context/UserTagsContext";
import { useTagService } from "../../hooks/useTagService";
import { ModalContext } from "../../context/ModalContext";

function Menu() {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { setModal } = useContext(ModalContext);
  const [searchParams] = useSearchParams();
  const filterTag = searchParams.get("tag");
  const tags = useTagService();

  useEffect(() => {
    const getTags = async () => {
      const data = await tags.findAll();
      setUserTags(data.tags);
    };

    getTags();
  }, []);

  return (
    <div className="w-[300px] max-h-[calc(100vh-60px)] pb-4 overflow-y-auto flex flex-col shrink-0">
      <Link
        className={`shrink-0 whitespace-nowrap px-6 py-2 hover:text-aqua ${
          !filterTag && "text-aqua"
        }`}
        to="/notes"
      >
        Notes
      </Link>
      {userTags.map((tag) => {
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
      })}
      <button
        onClick={() => setModal("tags")}
        className="shrink-0 whitespace-nowrap px-6 py-2 text-left hover:text-aqua"
      >
        Edit Tags
      </button>
    </div>
  );
}

export default Menu;
