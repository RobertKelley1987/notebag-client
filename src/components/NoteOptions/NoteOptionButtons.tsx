import { useDropdown } from "../../hooks/useDropdown";
import type { ReactNode } from "react";

type NoteOptionButtonsProps = {
  deleteButton: ReactNode;
};

function NoteOptionButtons({ deleteButton }: NoteOptionButtonsProps) {
  const { setEditingTags } = useDropdown();

  return (
    <div className="flex flex-col gap-2 p-3 sm:p-0 items-start bg-white w-screen sm:w-max font-ibm fixed sm:static bottom-0">
      {deleteButton}
      <button
        id="edit-tags-button"
        onClick={(e) => {
          e.stopPropagation();
          setEditingTags(true);
        }}
        className="hover:text-aqua px-3 sm:px-0"
      >
        Edit Tags
      </button>
    </div>
  );
}

export default NoteOptionButtons;
