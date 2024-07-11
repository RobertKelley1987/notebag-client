import { useDropdown } from "../../../hooks/useDropdown";
import BackArrowIcon from "../../icons/BackArrowIcon";

function EditTagsBackButton() {
  const { setDropdownOpen, setEditingTags } = useDropdown();

  function handleClick() {
    setEditingTags(false);
    setDropdownOpen(false);
  }

  return (
    <button onClick={handleClick} className="block sm:hidden hover:text-aqua">
      <BackArrowIcon />
    </button>
  );
}

export default EditTagsBackButton;
