import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { UserNotesContext } from "../../../context/UserNotesContext";
import { IsSavingContext } from "../../../context/IsSavingContext";
import { NoteTagsContext } from "../../../context/NoteTagsContext";
import { useNoteService } from "../../../hooks/useNoteService";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFoundTag } from "../../../hooks/useFoundTag";
import { isEmpty } from "../../../lib/strings";
import optimistic from "../../../lib/optimistic";
import NoteTags from "../../../components/note/NoteTags";
import NoteOptions from "../../../components/note/NoteOptions";
import NewNoteEditTags from "./NewNoteEditTags";
import NewNoteDeleteButton from "./NewNoteDeleteButton";
import type { FormEvent } from "react";
import type { Tag } from "../../../types";

type NewNoteFormProps = {
  isLoading: boolean;
};

function NewNoteForm({ isLoading }: NewNoteFormProps) {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const [formOpen, setFormOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [noteTags, setNoteTags] = useState<Tag[]>([]);
  const { foundTag } = useFoundTag();
  const { wrapperRef } = useClickOutside(submit, [
    noteTags,
    userNotes,
    isLoading,
  ]);
  const notes = useNoteService();

  useEffect(() => {
    if (foundTag) {
      setNoteTags([foundTag]);
    } else {
      setNoteTags([]);
    }
  }, [foundTag, formOpen]);

  function resetForm() {
    if (titleRef.current) titleRef.current.value = "";
    if (contentRef.current) contentRef.current.innerText = "";
    setNoteTags([]);
    setFormOpen(false);
  }

  async function submit() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";

    // If user typed only whitespaces in form, clear form values and close.
    if (isEmpty(title) && isEmpty(content)) return resetForm();

    // Set optimistic notes.
    const newNote = { id: uuid(), title, content, tags: noteTags };
    const optimisticNotes = optimistic.notes.addOne(userNotes, newNote);
    setUserNotes(optimisticNotes);

    // Reset form and set saving state.
    resetForm();
    setIsSaving(true);

    // Create new note and fetch updated note.
    await notes.create(newNote.id, title, content, noteTags);
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
      <NoteTags tags={noteTags} />
      <div className="flex w-full justify-between items-center">
        <NoteTagsContext.Provider value={{ noteTags, setNoteTags }}>
          <NoteOptions
            editTagsForm={<NewNoteEditTags />}
            deleteButton={<NewNoteDeleteButton resetForm={resetForm} />}
          />
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
      className={`group w-[300px] mt-6 p-3 border border-black ${
        !formOpen && "cursor-pointer hover:bg-aqua"
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
              : "cursor-pointer placeholder:text-black group-hover:bg-aqua"
          }`}
          placeholder={formOpen ? "title" : "new note..."}
        />
        {formOpen && formBottom}
      </form>
    </div>
  );
}

export default NewNoteForm;
