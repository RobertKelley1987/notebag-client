import { useContext } from "react";
import { DropdownOpenContext } from "../../context/DropdownOpenContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useScreenSize } from "../../hooks/useScreenSize";
import NoteDropdown from "./NoteDropdown";
import Modal from "../Modal";
import MoreIcon from "../icons/MoreIcon";
import type { ReactNode } from "react";
import { EditingTagsContext } from "../../context/EditingTagsContext";

type NoteOptionsProps = {
  editTagsForm: ReactNode;
  deleteButton: ReactNode;
  hideOptions?: boolean;
};

function NoteOptions({
  editTagsForm,
  deleteButton,
  hideOptions,
}: NoteOptionsProps) {
  const { editingTags, setEditingTags } = useContext(EditingTagsContext);
  const { dropdownOpen, setDropdownOpen } = useContext(DropdownOpenContext);
  const { isSmallScreen } = useScreenSize();
  const { wrapperRef } = useClickOutside(handleClick);

  console.log("EDITING: " + editingTags);

  function handleClick() {
    setDropdownOpen(false);
    setEditingTags(false);
  }

  const optionButtons = (
    <div className="flex flex-col gap-2 p-3 sm:p-0 items-start bg-white w-screen sm:w-max font-ibm fixed sm:static bottom-0">
      {deleteButton}
      <button
        id="edit-tags-button"
        onClick={(e) => {
          e.stopPropagation();
          setEditingTags(true);
        }}
        className="hover:text-aqua px-3 sm:px-0"
      >
        Edit Tags
      </button>
    </div>
  );

  const options = editingTags ? editTagsForm : optionButtons;
  const dropdown = <NoteDropdown>{options}</NoteDropdown>;
  const modal = (
    <Modal handleDismiss={() => setDropdownOpen(false)}>{options}</Modal>
  );

  function renderOptions() {
    if (dropdownOpen) {
      return isSmallScreen ? modal : dropdown;
    } else {
      return null;
    }
  }

  const classNames = hideOptions
    ? "hidden sm:flex justify-end"
    : "flex justify-end";

  return (
    <div className={classNames}>
      <div ref={wrapperRef} className="relative">
        <MoreIcon
          className="cursor-pointer hover:text-aqua"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
        {renderOptions()}
      </div>
    </div>
  );
}

export default NoteOptions;
