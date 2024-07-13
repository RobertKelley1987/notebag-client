import { useDropdown } from "../../hooks/useDropdown";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import NoteOptionButtons from "./NoteOptionButtons";
import Dropdown from "../Dropdown";
import Modal from "../Modal";
import type { ReactNode } from "react";

type NoteDropdownProps = {
  editTagsForm: ReactNode;
  deleteButton: ReactNode;
};

function NoteDropdown({ editTagsForm, deleteButton }: NoteDropdownProps) {
  const { setDropdownOpen, editingTags } = useDropdown();
  const { isSmallScreen } = useIsSmallScreen();

  const buttons = <NoteOptionButtons deleteButton={deleteButton} />;
  const options = editingTags ? editTagsForm : buttons;
  const dropdown = <Dropdown>{options}</Dropdown>;
  const modal = (
    <Modal handleDismiss={() => setDropdownOpen(false)}>{options}</Modal>
  );

  return isSmallScreen ? modal : dropdown;
}

export default NoteDropdown;
