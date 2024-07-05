import { useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import DeleteNoteButton from "./DeleteButton";
import NoteDropdown from "./NoteDropdown";
import MoreIcon from "../icons/MoreIcon";
import type { ReactNode } from "react";

type NoteOptionsProps = {
  editTagsForm: ReactNode;
  deleteButton: ReactNode;
};

function NoteOptions({ editTagsForm, deleteButton }: NoteOptionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingTags, setEditingTags] = useState(false);
  const { wrapperRef } = useClickOutside(handleClick);

  function handleClick() {
    setDropdownOpen(false);
    setEditingTags(false);
  }

  const options = (
    <div className="flex flex-col items-start w-max">
      {deleteButton}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditingTags(true);
        }}
        className="hover:text-aqua"
      >
        Edit Tags
      </button>
    </div>
  );

  const dropdown = (
    <NoteDropdown dropdownOpen={dropdownOpen} editingTags={editingTags}>
      {editingTags ? editTagsForm : options}
    </NoteDropdown>
  );

  return (
    <div className="flex justify-end">
      <div ref={wrapperRef} className="relative">
        <MoreIcon
          className="cursor-pointer hover:text-aqua"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
        {dropdownOpen && dropdown}
      </div>
    </div>
  );
}

export default NoteOptions;
