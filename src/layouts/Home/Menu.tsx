import { useContext, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import UserTagsContext from "../../context/UserTagsContext";
import { useTagService } from "../../hooks/useTagService";
import { ModalContext } from "../../context/ModalContext";

function Menu() {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { setModal } = useContext(ModalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const tags = useTagService();
  const filterTag = searchParams.get("tag");
  const location = useLocation();

  useEffect(() => {
    const getTags = async () => {
      const res = await tags.findAll();
      setUserTags(res.tags);
    };

    getTags();
  }, []);

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
            className={`text-left px-6 py-2 whitespace-nowrap ${selected}`}
            onClick={() => setSearchParams({ tag: tag.name })}
          >
            {tag.name}
          </button>
        );
      })}
      <button
        onClick={() => setModal("tags")}
        className="whitespace-nowrap px-6 py-2 text-left"
      >
        Edit Tags
      </button>
    </div>
  );
}

export default Menu;
