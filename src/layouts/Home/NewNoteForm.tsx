import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { UserNotesContext } from "../../context/UserNotesContext";
import { UserTagsContext } from "../../context/UserTagsContext";
import { IsSavingContext } from "../../context/IsSavingContext";
import { NoteTagsContext } from "../../context/NoteTagsContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNoteService } from "../../hooks/useNoteService";
import optimistic from "../../lib/optimistic";
import { isEmpty } from "../../lib/strings";
import NoteTags from "./NoteTags";
import NoteOptions from "./NoteOptions";
import NewNoteEditTags from "./NewNoteEditTags";
import type { FormEvent } from "react";
import type { Tag } from "../../types";

function NewNoteForm() {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { userTags } = useContext(UserTagsContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const { wrapperRef } = useClickOutside(submit);
  const [formOpen, setFormOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const notes = useNoteService();

  useEffect(() => {
    const foundTag = userTags.find((tag) => tag.name === tagFilter);
    if (foundTag) {
      setTags([foundTag]);
    } else {
      setTags([]);
    }
  }, [tagFilter]);

  async function submit() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";

    // If user typed only whitespaces in form, clear form values and close.
    if (isEmpty(title) && isEmpty(content)) {
      if (titleRef.current) titleRef.current.value = "";
      if (contentRef.current) contentRef.current.innerText = "";
      setFormOpen(false);
      return;
    }

    // Set optimistic notes.
    const newNote = { id: uuid(), title, content, tags };
    const optimisticNotes = optimistic.notes.addOne(userNotes, newNote);
    setUserNotes(optimisticNotes);

    // Reset form and set saving state.
    if (titleRef.current) titleRef.current.value = "";
    if (contentRef.current) contentRef.current.innerText = "";
    setFormOpen(false);
    setIsSaving(true);

    // Create new note and fetch updated note.
    await notes.create(newNote.id, title, content, tags);
    const data = await notes.findAll();
    setUserNotes(data.notes);
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
      <NoteTags tags={tags} />
      <div className="flex w-full justify-between items-center">
        <NoteTagsContext.Provider value={{ tags, setTags }}>
          <NoteOptions editTagsForm={<NewNoteEditTags />} />
        </NoteTagsContext.Provider>
        <button type="submit" className="p-1 w-min hover:text-aqua">
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <div
      ref={wrapperRef}
      onClick={() => setFormOpen(true)}
      className={`w-[300px] my-6 p-3 border border-black ${
        !formOpen &&
        "cursor-pointer hover:has-[form]:border-aqua hover:placeholder:text-aqua"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <input
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          className={`w-full focus:outline-none ${
            formOpen
              ? "font-semibold placeholder:text-slate-400"
              : "cursor-pointer placeholder:text-black"
          }`}
          placeholder={formOpen ? "title" : "new note..."}
        />
        {formOpen && formBottom}
      </form>
    </div>
  );
}

export default NewNoteForm;
