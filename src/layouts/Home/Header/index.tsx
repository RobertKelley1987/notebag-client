import { useSearchParams } from "react-router-dom";
import { useIsSaving } from "../../../hooks/useIsSaving";
import MenuIcon from "../../../components/icons/MenuIcon";
import HeaderLogo from "./HeaderLogo";
import UserSettings from "./UserSettings";
import Searchbar from "./Searchbar";
import SearchLink from "./SearchLink";
import type { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

function Header({ setMenuOpen }: HeaderProps) {
  const { isSaving } = useIsSaving();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  return (
    <header className="h-[60px] w-full z-30 font-ibm fixed bg-white border-b border-black text-black flex justify-between py-3 px-3 sm:px-6 items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="hover:text-aqua"
        >
          <MenuIcon />
        </button>
        <HeaderLogo />
      </div>
      {search !== null && <Searchbar />}
      <div className="flex gap-6">
        {isSaving && <span>Saving...</span>}
        <div className="flex gap-3">
          <SearchLink />
          <UserSettings />
        </div>
      </div>
    </header>
  );
}

export default Header;
