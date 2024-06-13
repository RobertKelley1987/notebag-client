import { useState } from "react";
import MoreIcon from "../../components/icons/MoreIcon";
import { useClickOutside } from "../../hooks/useClickOutside";
import DeleteNoteButton from "./DeleteNoteButton";

type NoteOptionsProps = {
  noteId: string;
};

function NoteOptions({ noteId }: NoteOptionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { wrapperRef } = useClickOutside(handleClick);

  function handleClick() {
    setDropdownOpen(false);
  }

  const dropdown = (
    <div className="absolute top-6 -right-24 border border-black bg-white p-3">
      <DeleteNoteButton noteId={noteId} />
    </div>
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
