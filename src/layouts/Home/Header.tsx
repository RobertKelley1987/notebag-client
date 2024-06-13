import MenuIcon from "../../components/icons/MenuIcon";
import Logo from "../../components/Logo";
import UserSettings from "./UserSettings";

function Header() {
  return (
    <header className="relative text-black flex justify-between py-3 px-6 items-center h-[60px]">
      <div className="flex items-center gap-3">
        <MenuIcon />
        <Logo />
      </div>
      <UserSettings />
    </header>
  );
}

export default Header;
