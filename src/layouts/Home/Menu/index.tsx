import { Link, useSearchParams } from "react-router-dom";
import { useUserTags } from "../../../hooks/useUserTags";
import { useModal } from "../../../hooks/useModal";
import Logo from "../../../components/Logo";
import MenuTags from "./MenuTags";

function Menu() {
  const { setModal } = useModal();
  const [searchParams] = useSearchParams();
  const filterTag = searchParams.get("tag");

  return (
    <div className="font-ibm w-[300px] bg-white absolute left-0 top-0 sm:static h-screen sm:h-[calc(100vh-60px)] pb-4 overflow-y-auto flex flex-col shrink-0">
      <Logo className="sm:hidden py-2 px-6" />
      <Link
        className={`shrink-0 whitespace-nowrap px-6 py-2 hover:text-aqua ${
          !filterTag && "text-aqua"
        }`}
        to="/notes"
      >
        Notes
      </Link>
      <MenuTags />
      <button
        onClick={() => setModal("editTags")}
        className="shrink-0 whitespace-nowrap px-6 py-2 text-left hover:text-aqua"
      >
        Edit Tags
      </button>
    </div>
  );
}

export default Menu;
