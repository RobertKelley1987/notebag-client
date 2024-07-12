import { useClickOutside } from "../../hooks/useClickOutside";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useDropdown } from "../../hooks/useDropdown";
import NoteDropdown from "./NoteDropdown";
import Modal from "../Modal";
import MoreIcon from "../icons/MoreIcon";
import NoteOptionButtons from "./NoteOptionButtons";
import type { ReactNode } from "react";
import { useModal } from "../../hooks/useModal";

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
  const modalOpen = !!useModal().modal;

  function handleClick() {
    setDropdownOpen(false);
    setEditingTags(false);
  }

  const buttons = <NoteOptionButtons deleteButton={deleteButton} />;
  const options = editingTags ? editTagsForm : buttons;
  const dropdown = <NoteDropdown>{options}</NoteDropdown>;
  const modal = (
    <Modal handleDismiss={() => setDropdownOpen(false)}>{options}</Modal>
  );
  const result = isSmallScreen ? modal : dropdown;

  const wrapperClassNames = hideOptions
    ? "hidden sm:flex justify-end"
    : "flex justify-end";

  return (
    <div className={wrapperClassNames}>
      <div ref={wrapperRef} className="relative">
        <MoreIcon
          className="cursor-pointer hover:text-aqua"
          onClick={(e) => {
            modalOpen && e.stopPropagation();
            setDropdownOpen((prev) => !prev);
          }}
        />
        {dropdownOpen && result}
      </div>
    </div>
  );
}

export default NoteOptions;
