import { useClickOutside } from "../../hooks/useClickOutside";
import { useDropdown } from "../../hooks/useDropdown";
import { useModal } from "../../hooks/useModal";
import MoreIcon from "../icons/MoreIcon";
import type { ReactNode } from "react";

type NoteOptionsProps = {
  children: ReactNode;
  hideOptions?: boolean;
};

function NoteOptions({ hideOptions, children }: NoteOptionsProps) {
  const { dropdownOpen, setDropdownOpen, setEditingTags } = useDropdown();
  const { wrapperRef } = useClickOutside(handleClick);
  const modalOpen = !!useModal().modal;

  function handleClick() {
    setDropdownOpen(false);
    setEditingTags(false);
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
            modalOpen && e.stopPropagation();
            setDropdownOpen((prev) => !prev);
          }}
        />
        {dropdownOpen && children}
      </div>
    </div>
  );
}

export default NoteOptions;
