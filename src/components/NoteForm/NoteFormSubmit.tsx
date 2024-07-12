import type { MouseEvent } from "react";

type NoteFormSubmitProps = {
  submit: () => Promise<void>;
};

function NoteFormSubmit({ submit }: NoteFormSubmitProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    submit();
  }

  return (
    <button
      onClick={handleClick}
      type="submit"
      className="p-1 w-min hover:text-aqua"
    >
      Close
    </button>
  );
}

export default NoteFormSubmit;
