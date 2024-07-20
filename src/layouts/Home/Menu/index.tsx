import { Link, useSearchParams } from "react-router-dom";
import { useModal } from "../../../hooks/useModal";
import Logo from "../../../components/Logo";
import MenuTags from "./MenuTags";
import NoteIcon from "../../../components/icons/NoteIcon";
import PencilIcon from "../../../components/icons/PencilIcon";

function Menu() {
  const { setModal } = useModal();
  const [searchParams] = useSearchParams();
  const filterTag = searchParams.get("tag");

  return (
    <div className="font-ibm z-20 w-[300px] bg-white absolute left-0 top-0 sm:fixed sm:top-[60px] h-screen sm:h-[calc(100vh-60px)] py-4 overflow-y-hidden hover:overflow-y-auto flex flex-col shrink-0 border-r border-black">
      <Logo className="sm:hidden py-2 px-6" />
      <Link
        className={`flex gap-2 mt-1 sm:mt-0 shrink-0 whitespace-nowrap px-6 py-2 hover:text-aqua ${
          !filterTag && "text-aqua"
        }`}
        to="/notes"
      >
        <NoteIcon />
        <span>Notes</span>
      </Link>
      <MenuTags />
      <button
        onClick={() => setModal("editTags")}
        className="flex gap-2 shrink-0 whitespace-nowrap px-6 py-2 text-left hover:text-aqua"
      >
        <PencilIcon />
        <span>Edit Tags</span>
      </button>
    </div>
  );
}

export default Menu;
