import { useLayoutEffect, useRef } from "react";
import EditingTagsContextProvider from "../context/EditingTagsContext";
import { NoteContext } from "../context/NoteContext";
import { useUserNotes } from "../hooks/useUserNotes";
import { useNoteForm } from "../hooks/useNoteForm";
import { useDropdown } from "../hooks/useDropdown";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { EMPTY_NOTE } from "../lib/constants";
import Modal from "../components/Modal";
import NoteTags from "../components/NoteTags";
import NoteOptions from "../components/NoteOptions";
import FormEditTags from "../components/NoteForm/NoteFormEditTags";
import NoteDeleteButton from "../components/Note/NoteDeleteButton";
import type { MouseEvent } from "react";

function EditNotePage() {
  const { setDropdownOpen, setEditingTags } = useDropdown();
  const { noteForm, setNoteForm } = useNoteForm();
  const { userNotes, selected } = useUserNotes();
  const selectedNote = userNotes.find((note) => note.id === selected);
  const updateNote = useUpdateNote();
  const titleRef = useRef<HTMLInputElement>(null);

  // Set form values to selected note and focus input on first render
  useLayoutEffect(() => {
    if (selectedNote) setNoteForm(selectedNote);
    if (titleRef.current) titleRef.current.focus();
  }, []);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setDropdownOpen(false);
    setEditingTags(false);
  }

  return (
    <Modal handleDismiss={updateNote}>
      <div
        onClick={handleClick}
        className="grid grid-rows-[auto_min-content] w-full sm:w-[250px] h-full sm:h-auto bg-white p-3 sm:border border-black"
      >
        <div>
          <input
            ref={titleRef}
            value={noteForm.title}
            type="text"
            name="title"
            id="title"
            className="w-full focus:outline-none font-semibold placeholder:text-slate-400"
            placeholder="title"
          />
          <div
            id="content"
            data-placeholder="note..."
            className="w-full focus:outline-none mt-3 sm:mt-1 mb-5 sm:mb-3 empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)]"
            contentEditable
          >
            {noteForm.content}
          </div>
          <NoteTags tags={noteForm.tags} />
        </div>
        <div className="flex w-full justify-between items-center">
          <NoteContext.Provider value={{ note: selectedNote || EMPTY_NOTE }}>
            <EditingTagsContextProvider>
              <NoteOptions
                editTagsForm={<FormEditTags />}
                deleteButton={<NoteDeleteButton />}
              />
            </EditingTagsContextProvider>
          </NoteContext.Provider>
          <button onClick={updateNote} className="font-ibm p-1 hover:text-aqua">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditNotePage;
