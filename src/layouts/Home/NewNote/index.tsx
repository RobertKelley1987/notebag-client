import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import DropdownOpenContextProvider from "../../../context/DropdownOpenContextProvider";
import EditingTagsContextProvider from "../../../context/EditingTagsContextProvider";
import { NoteTagsContext } from "../../../context/NoteTagsContext";
import { UserNotesContext } from "../../../context/UserNotesContext";
import { FormOpenContext } from "../../../context/FormOpenContext";
import { IsSavingContext } from "../../../context/IsSavingContext";
import { useNoteService } from "../../../hooks/useNoteService";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFoundTag } from "../../../hooks/useFoundTag";
import { isEmpty } from "../../../lib/strings";
import optimistic from "../../../lib/optimistic";
import NoteTags from "../../../components/Note/NoteTags";
import NoteOptions from "../../../components/Note/NoteOptions";
import NewNoteEditTags from "./NewNoteEditTags";
import NewNoteDeleteButton from "./NewNoteDeleteButton";
import type { Tag } from "../../../types";

type NewNoteFormProps = {
  isLoading: boolean;
};

function NewNoteForm({ isLoading }: NewNoteFormProps) {
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { formOpen, setFormOpen } = useContext(FormOpenContext);
  const { setIsSaving } = useContext(IsSavingContext);
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

  useEffect(() => {
    if (formOpen) titleRef.current?.focus();
  }, [formOpen]);

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

  const formBottom = (
    <Fragment>
      <div
        ref={contentRef}
        id="content"
        contentEditable
        data-placeholder="new note..."
        className="w-full focus:outline-none mt-3 mb-4 empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] hover:cursor-text"
      ></div>
      <NoteTags tags={noteTags} />
    </Fragment>
  );

  const options = (
    <div className="flex w-full justify-between items-center">
      <NoteTagsContext.Provider value={{ noteTags, setNoteTags }}>
        <DropdownOpenContextProvider>
          <EditingTagsContextProvider>
            <NoteOptions
              editTagsForm={<NewNoteEditTags />}
              deleteButton={<NewNoteDeleteButton resetForm={resetForm} />}
            />
          </EditingTagsContextProvider>
        </DropdownOpenContextProvider>
      </NoteTagsContext.Provider>
      <button
        onClick={(e) => {
          e.stopPropagation();
          submit();
        }}
        type="submit"
        className="p-1 w-min hover:text-aqua"
      >
        Close
      </button>
    </div>
  );

  let wrapperClassName =
    "group fixed sm:static z-20 w-screen sm:w-[300px] bg-white h-screen sm:h-auto left-0 top-0 sm:mt-6 p-3 sm:border border-black";
  if (!formOpen)
    wrapperClassName += " hidden sm:block cursor-pointer hover:bg-aqua";

  return (
    <div
      className={wrapperClassName}
      ref={wrapperRef}
      onClick={() => setFormOpen(true)}
    >
      <div className="grid grid-rows-[auto_min-content] w-full h-full">
        <div>
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
        </div>
        {formOpen && options}
      </div>
    </div>
  );
}

export default NewNoteForm;
