import Logo from "../../../components/Logo";
import { useFoundTag } from "../../../hooks/useFoundTag";

function HeaderLogo() {
  const { foundTag } = useFoundTag();

  const filterName = (
    <span className="font-bold font-sans text-2xl text-black max-w-[200px] truncate">
      {foundTag?.name}
    </span>
  );

  return foundTag ? filterName : <Logo />;
}

export default HeaderLogo;
