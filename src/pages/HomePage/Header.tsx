import MenuIcon from "../../components/icons/MenuIcon";
import Logo from "../../components/Logo";
import UserSettings from "./UserSettings";

function Header() {
  return (
    <header className="text-black flex justify-between py-3 px-6 items-center h-[60px]">
      <MenuIcon />
      <Logo />
      <UserSettings />
    </header>
  );
}

export default Header;
