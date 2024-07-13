import { useUpdatePinned } from "../../../hooks/useUpdatePinned";
import { useNote } from "../../../hooks/useNote";
import { useIsSaving } from "../../../hooks/useIsSaving";
import PinIcon from "../../../components/icons/PinIcon";
import type { MouseEvent } from "react";

const styles = {
  pinned: "text-black fill-black text-aqua hover:fill-aqua",
  unpinned: "text-black hover:fill-black",
};

function NotePinButton() {
  const updatePinned = useUpdatePinned();
  const { note } = useNote();
  const { isSaving } = useIsSaving();
  const { pinned, unpinned } = styles;

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    updatePinned();
  }

  return (
    <button
      onClick={handleClick}
      disabled={isSaving}
      className={"float-end ml-[.15rem] h-[24px] w-[24px]"}
    >
      <PinIcon
        className={`hidden group-hover:block ${
          note.pinned ? pinned : unpinned
        }`}
      />
    </button>
  );
}

export default NotePinButton;
