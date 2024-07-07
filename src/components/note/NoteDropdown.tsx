import { useContext, useLayoutEffect, useRef, useState } from "react";
import { EditingTagsContext } from "../../context/EditingTagsContext";
import { DropdownOpenContext } from "../../context/DropdownOpenContext";
import type { ReactNode } from "react";

const RIGHT = "left-[50%]";
const LEFT = "right-[50%]";
const DOWN = "top-[100%]";
const UP = "bottom-[100%]";

type HorizontalPos = "left-[50%]" | "right-[50%]";
type VerticalPos = "top-[100%]" | "bottom-[100%]";

type NoteDropdownProps = {
  children: ReactNode;
};

function NoteDropdown({ children }: NoteDropdownProps) {
  const { dropdownOpen } = useContext(DropdownOpenContext);
  const { editingTags } = useContext(EditingTagsContext);
  const [horizontalPos, setHorizontalPos] = useState<HorizontalPos>(RIGHT);
  const [verticalPos, setVerticalPos] = useState<VerticalPos>(DOWN);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if dropdown is going to exceed window size. If so, update
  // tailwind class to shift dropdown up or to the left as needed.
  // Function needs to run on render and if dropdown changes to edit tags
  // mode.
  useLayoutEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown && dropdownOpen) {
      const { right, bottom } = dropdown.getBoundingClientRect();
      if (right > window.innerWidth) setHorizontalPos(LEFT);
      if (bottom > window.innerHeight) setVerticalPos(UP);
    }
  }, [dropdownOpen, editingTags]);

  return (
    <div
      ref={dropdownRef}
      className={`max-h-[250px] max-w-[250px] overflow-x-hidden overflow-y-auto z-20 border border-black bg-white p-3 absolute ${verticalPos} ${horizontalPos}`}
    >
      {children}
    </div>
  );
}

export default NoteDropdown;
