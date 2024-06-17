import MenuIcon from "../../components/icons/MenuIcon";
import Logo from "../../components/Logo";
import UserSettings from "./UserSettings";
import type { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header className="relative text-black flex justify-between py-3 px-6 items-center h-[60px]">
      <div className="flex items-center gap-3">
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <MenuIcon />
        </button>
        <Logo />
      </div>
      <UserSettings />
    </header>
  );
}

export default Header;
