import { useDropdown } from "../../../hooks/useDropdown";
import ArrowIcon from "../../icons/ArrowIcon";

function EditTagsBackButton() {
  const { setDropdownOpen, setEditingTags } = useDropdown();

  function handleClick() {
    setEditingTags(false);
    setDropdownOpen(false);
  }

  return (
    <button onClick={handleClick} className="block sm:hidden hover:text-aqua">
      <ArrowIcon />
    </button>
  );
}

export default EditTagsBackButton;
