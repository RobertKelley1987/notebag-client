import { useClickOutside } from "../../hooks/useClickOutside";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useDropdown } from "../../hooks/useDropdown";
import NoteDropdown from "./NoteDropdown";
import Modal from "../Modal";
import MoreIcon from "../icons/MoreIcon";
import type { ReactNode } from "react";
import TagSearchContextProvider from "../../context/TagSearchContext";

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
  const { dropdownOpen, setDropdownOpen, editingTags, setEditingTags } =
    useDropdown();
  const { isSmallScreen } = useScreenSize();
  const { wrapperRef } = useClickOutside(handleClick);

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

  const options = editingTags ? (
    <TagSearchContextProvider>{editTagsForm}</TagSearchContextProvider>
  ) : (
    optionButtons
  );
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

  const wrapperClassNames = hideOptions
    ? "hidden sm:flex justify-end"
    : "flex justify-end";

  return (
    <div className={wrapperClassNames}>
      <div ref={wrapperRef} className="relative">
        <MoreIcon
          className="cursor-pointer hover:text-aqua"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen((prev) => !prev);
          }}
        />
        {renderOptions()}
      </div>
    </div>
  );
}

export default NoteOptions;
