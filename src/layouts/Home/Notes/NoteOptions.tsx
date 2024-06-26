import { Fragment, useState } from "react";
import MoreIcon from "../../../components/icons/MoreIcon";
import { useClickOutside } from "../../../hooks/useClickOutside";
import DeleteNoteButton from "./DeleteNoteButton";
import EditNoteTags from "./EditNoteTags";
import NoteDropdown from "./NoteDropdown";

function NoteOptions() {
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
      >
        Edit Tags
      </button>
    </div>
  );

  const dropdown = (
    <NoteDropdown dropdownOpen={dropdownOpen} editingTags={editingTags}>
      {editingTags ? <EditNoteTags /> : options}
    </NoteDropdown>
  );

  return (
    <div className="flex justify-end">
      <div ref={wrapperRef} className="relative">
        <MoreIcon
          className="hover:cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
        {dropdownOpen && dropdown}
      </div>
    </div>
  );
}

export default NoteOptions;
