import { Fragment, useContext, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import UserNotesContext from "../../context/UserNotesContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import notes from "../../services/notes";
import { isEmpty } from "../../utils";
import type { FormEvent } from "react";

function NewNoteForm() {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const [formOpen, setFormOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { wrapperRef } = useClickOutside(submit);

  async function submit() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";
    const isEmptyNote = isEmpty(title) && isEmpty(content);

    if (!isEmptyNote) {
      // Set optimistic notes
      const noteId = uuid();
      const newNote = { id: noteId, title, content };
      const optimistic = [newNote, ...userNotes];
      setUserNotes(optimistic);

      // Reset form
      if (contentRef.current) contentRef.current.innerText = "";
      if (titleRef.current) titleRef.current.value = "";
      setFormOpen(false);

      // Create new note and fetch updated notes
      await notes.create(noteId, title, content);
      const res = await notes.findAll();
      setUserNotes(res.notes);
    }

    setFormOpen(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await submit();
  }

  const formBottom = (
    <Fragment>
      <div
        ref={contentRef}
        id="content"
        contentEditable
        data-placeholder="new note..."
        className="w-full focus:outline-none my-3 empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] hover:cursor-text"
      ></div>
      <button type="submit" className="w-20 border border-black p-2">
        Close
      </button>
    </Fragment>
  );

  return (
    <div
      ref={wrapperRef}
      onClick={() => setFormOpen(true)}
      className={`w-[250px] my-6 p-3 border border-black ${
        !formOpen && "cursor-pointer"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col w-full items-end">
        <input
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          className={`w-full focus:outline-none font-semibold placeholder:text-slate-400 ${
            !formOpen && "cursor-pointer"
          }`}
          placeholder={formOpen ? "title" : "new note..."}
        />
        {formOpen && formBottom}
      </form>
    </div>
  );
}

export default NewNoteForm;
