import { useNoteForm } from "../../hooks/useNoteForm";
import PinIcon from "../../components/icons/PinIcon";
import type { MouseEvent } from "react";

const styles = {
  button: {
    pinned: "hover:[&_svg]:fill-aqua",
    unpinned: "hover:[&_svg]:fill-white",
  },
};

function NoteFormPinButton() {
  const { pinned, setPinned } = useNoteForm();
  const { button } = styles;

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    setPinned((prev) => !prev);
  }

  // When user clicks on heart symbol, this prevents the form inputs
  // from losing focus. Otherwise the mobile experience is really janky.
  function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
  }

  let buttonClass = "float-end pl-2 hover:[&_svg]:stroke-aqua";
  buttonClass += ` ${pinned ? button.pinned : button.unpinned}`;

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={buttonClass}
    >
      <PinIcon className={pinned ? "fill-black" : undefined} />
    </button>
  );
}

export default NoteFormPinButton;
