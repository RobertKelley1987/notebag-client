import { useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import DeleteNoteButton from "./Notes/DeleteNoteButton";
import NoteDropdown from "./NoteDropdown";
import MoreIcon from "../../components/icons/MoreIcon";
import type { ReactNode } from "react";

type NoteOptionsProps = {
  editTagsForm: ReactNode;
};

function NoteOptions({ editTagsForm }: NoteOptionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingTags, setEditingTags] = useState(false);
  const { wrapperRef } = useClickOutside(handleClick);

  function handleClick() {
    setDropdownOpen(false);
    setEditingTags(false);
  }

  const options = (
    <div className="flex flex-col items-start w-max">
      <DeleteNoteButton />
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
          className="hover:cursor-pointer hover:text-aqua"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
        {dropdownOpen && dropdown}
      </div>
    </div>
  );
}

export default NoteOptions;
