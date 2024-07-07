import { useContext } from "react";
import { IsSavingContext } from "../../../context/IsSavingContext";
import MenuIcon from "../../../components/icons/MenuIcon";
import Logo from "../../../components/Logo";
import UserSettings from "./UserSettings";
import Searchbar from "./Searchbar";
import SearchLink from "./SearchLink";
import type { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

function Header({ setMenuOpen }: HeaderProps) {
  const { isSaving } = useContext(IsSavingContext);

  return (
    <header className="font-ibm relative text-black flex justify-between py-3 px-6 items-center h-[60px]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="hover:text-aqua"
        >
          <MenuIcon />
        </button>
        <Logo />
      </div>
      <Searchbar />
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
