import { useEffect } from "react";
import { useNoteForm } from "../../hooks/useNoteForm";
import type { KeyboardEvent } from "react";

function NoteFormTitle() {
  const { titleRef } = useNoteForm();

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") e.preventDefault();
  }

  return (
    <div
      ref={titleRef}
      id="title"
      onKeyDown={handleKeyDown}
      contentEditable
      data-placeholder="title"
      className="font-semibold w-full focus:outline-none break-words empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] hover:cursor-text"
    ></div>
  );
}

export default NoteFormTitle;
