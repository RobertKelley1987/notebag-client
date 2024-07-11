import { useEffect, useRef } from "react";
import DropdownOpenContextProvider from "../../../context/DropdownContext";
import EditingTagsContextProvider from "../../../context/EditingTagsContext";
import { useNoteForm } from "../../../hooks/useNoteForm";
import { useFormOpen } from "../../../hooks/useFormOpen";
import { useFoundTag } from "../../../hooks/useFoundTag";
import { useCreateNote } from "../../../hooks/useCreateNote";
import NoteTags from "../../../components/NoteTags";
import NoteOptions from "../../../components/NoteOptions";
import FormEditTags from "../../../components/NoteForm/NoteFormEditTags";
import NewNoteDeleteButton from "./NewNoteDeleteButton";
import type { MouseEvent } from "react";

function NewNoteForm() {
  const { noteForm, setNoteForm } = useNoteForm();
  const { formOpen } = useFormOpen();
  const { foundTag } = useFoundTag();
  const createNote = useCreateNote();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tags = foundTag ? [foundTag] : [];
    setNoteForm((prev) => {
      return { ...prev, tags };
    });
  }, [foundTag, formOpen]);

  useEffect(() => {
    if (formOpen) titleRef.current?.focus();
  }, [formOpen]);

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    createNote();
  }

  return (
    <div className="grid grid-rows-[auto_min-content] w-full h-full">
      <div>
        <input
          ref={titleRef}
          value={noteForm.title}
          onChange={(e) =>
            setNoteForm((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
          type="text"
          name="title"
          id="title"
          className="w-full focus:outline-none font-semibold placeholder:text-slate-400"
          placeholder="title"
        />
        <div
          id="content"
          onInput={(e) => {
            setNoteForm((prev) => {
              return { ...prev, content: e.currentTarget.textContent || "" };
            });
          }}
          contentEditable
          data-placeholder="new note..."
          className="w-full focus:outline-none mt-3 mb-4 empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] hover:cursor-text"
        >
          {noteForm.content}
        </div>
        <NoteTags tags={noteForm.tags} />
      </div>
      <div className="flex w-full justify-between items-center">
        <DropdownOpenContextProvider>
          <EditingTagsContextProvider>
            <NoteOptions
              editTagsForm={<FormEditTags />}
              deleteButton={<NewNoteDeleteButton />}
            />
          </EditingTagsContextProvider>
        </DropdownOpenContextProvider>
        <button
          onClick={handleSubmit}
          type="submit"
          className="p-1 w-min hover:text-aqua"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default NewNoteForm;
