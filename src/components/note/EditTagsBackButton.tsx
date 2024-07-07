import { useContext } from "react";
import { DropdownOpenContext } from "../../context/DropdownOpenContext";
import BackArrowIcon from "../icons/BackArrowIcon";

function EditTagsBackButton() {
  const { setDropdownOpen } = useContext(DropdownOpenContext);

  return (
    <button
      onClick={() => setDropdownOpen(false)}
      className="block sm:hidden hover:text-aqua"
    >
      <BackArrowIcon />
    </button>
  );
}

export default EditTagsBackButton;
