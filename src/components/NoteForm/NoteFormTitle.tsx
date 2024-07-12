import { useEffect } from "react";
import { useNoteForm } from "../../hooks/useNoteForm";

function NoteFormTitle() {
  const { titleRef } = useNoteForm();

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <input
      ref={titleRef}
      type="text"
      name="title"
      id="title"
      className="w-full focus:outline-none font-semibold placeholder:text-slate-400"
      placeholder="title"
    />
  );
}

export default NoteFormTitle;
