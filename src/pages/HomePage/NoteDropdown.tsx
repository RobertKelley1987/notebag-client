import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const RIGHT = "-right-24";
const LEFT = "right-2";

type DropdownPos = "-right-24" | "right-2";

type NoteDropdownProps = {
  children: ReactNode;
  dropdownOpen: boolean;
};

function NoteDropdown({ children, dropdownOpen }: NoteDropdownProps) {
  const [dropdownPos, setDropdownPos] = useState<DropdownPos>(RIGHT);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // On render, check if dropdown is going to exceed window width.
  // If so, update tailwind class to shift dropdown to the left.
  useLayoutEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown && dropdownOpen) {
      const rightBorderPos = dropdown.getBoundingClientRect().right;
      if (rightBorderPos > window.innerWidth) setDropdownPos(LEFT);
    }
  }, [dropdownOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`border border-black bg-white p-3 absolute top-6 ${dropdownPos}`}
    >
      {children}
    </div>
  );
}

export default NoteDropdown;
