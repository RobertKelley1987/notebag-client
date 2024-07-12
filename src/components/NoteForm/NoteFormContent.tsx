import { useNoteForm } from "../../hooks/useNoteForm";

function NoteFormContent() {
  const { contentRef } = useNoteForm();

  return (
    <div
      ref={contentRef}
      id="content"
      contentEditable
      data-placeholder="new note..."
      className="w-full min-w-0 focus:outline-none mt-3 mb-4 break-words empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] hover:cursor-text"
    ></div>
  );
}

export default NoteFormContent;
