import { useEffect } from "react";
import { useNoteForm } from "../../hooks/useNoteForm";
import NoteFormPinButton from "./NoteFormPinButton";

function NoteFormTitle() {
  const { titleRef } = useNoteForm();

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div
      ref={titleRef}
      id="title"
      contentEditable
      data-placeholder="title"
      className="font-semibold w-full focus:outline-none break-words empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] hover:cursor-text"
    ></div>
  );
}

export default NoteFormTitle;
