import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserTagsContext } from "../../context/UserTagsContext";
import { ModalContext } from "../../context/ModalContext";
import Logo from "../../components/Logo";

function Menu() {
  const { userTags } = useContext(UserTagsContext);
  const { setModal } = useContext(ModalContext);
  const [searchParams] = useSearchParams();
  const filterTag = searchParams.get("tag");

  return (
    <div className="w-[300px] bg-white absolute left-0 top-0 sm:static h-screen sm:h-[calc(100vh-60px)] pb-4 overflow-y-auto flex flex-col shrink-0">
      <Logo className="sm:hidden py-2 px-6" />
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
