import { Fragment, useState } from "react";
import MoreIcon from "../../components/icons/MoreIcon";
import { useClickOutside } from "../../hooks/useClickOutside";
import DeleteNoteButton from "./DeleteNoteButton";
import EditNoteTags from "./EditNoteTags";
import NoteDropdown from "./NoteDropdown";

function NoteOptions() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingTags, setEditingTags] = useState(false);
  const { wrapperRef } = useClickOutside(handleClick);

  console.log("editing tags: " + editingTags);
  console.log("dropdown open: " + dropdownOpen);

  function handleClick() {
    setDropdownOpen(false);
  }

  const options = (
    <Fragment>
      <DeleteNoteButton />
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditingTags(true);
        }}
      >
        Edit Tags
      </button>
    </Fragment>
  );

  const dropdown = (
    <NoteDropdown dropdownOpen={dropdownOpen}>
      {editingTags ? <EditNoteTags /> : options}
    </NoteDropdown>
  );

  return (
    <div className="flex justify-end relative">
      <div ref={wrapperRef}>
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
