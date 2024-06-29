import { Fragment, useContext, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { UserNotesContext } from "../../context/UserNotesContext";
import { IsSavingContext } from "../../context/IsSavingContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNoteService } from "../../hooks/useNoteService";
import optimistic from "../../lib/optimistic";
import { isEmpty } from "../../utils";
import type { FormEvent } from "react";

function NewNoteForm() {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const { wrapperRef } = useClickOutside(submit);
  const [formOpen, setFormOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const notes = useNoteService();

  async function submit() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";
    if (isEmpty(title) && isEmpty(content)) return;

    // Set optimistic notes
    const newNote = { id: uuid(), title, content, tags: [] };
    const optimisticNotes = optimistic.notes.addOne(userNotes, newNote);
    setUserNotes(optimisticNotes);

    // Reset form and set saving state.
    if (contentRef.current) contentRef.current.innerText = "";
    if (titleRef.current) titleRef.current.value = "";
    setFormOpen(false);
    setIsSaving(true);

    // Create new note and fetch updated note.
    await notes.create(newNote.id, title, content);
    const res = await notes.findAll();
    setUserNotes(res.notes);
    setIsSaving(false);
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
          className={`w-full focus:outline-none placeholder:text-slate-400 ${
            formOpen ? "font-semibold" : "cursor-pointer"
          }`}
          placeholder={formOpen ? "title" : "new note..."}
        />
        {formOpen && formBottom}
      </form>
    </div>
  );
}

export default NewNoteForm;
