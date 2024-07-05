import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { UserNotesContext } from "../context/UserNotesContext";
import { IsSavingContext } from "../context/IsSavingContext";
import { NoteContext, DEFAULT } from "../context/NoteContext";
import { useNoteService } from "../hooks/useNoteService";
import optimistic from "../lib/optimistic";
import { isEmpty } from "../lib/strings";
import Modal from "../components/Modal";
import NoteTags from "../components/note/NoteTags";
import NoteOptions from "../components/note/NoteOptions";
import NoteEditTags from "../components/note/NoteEditTags";
import NoteDeleteButton from "../components/note/NoteDeleteButton";
import type { FormEvent, MouseEvent, RefObject } from "react";
import type { Note, Tag } from "../types";

// Helper to set form values
function setFormValues(
  titleRef: RefObject<HTMLInputElement>,
  contentRef: RefObject<HTMLDivElement>,
  note: Note
) {
  let title = titleRef.current;
  let content = contentRef.current;

  if (title && content) {
    title.value = note.title;
    content.innerText = note.content;
  }
}

function EditNotePage() {
  const { setModal } = useContext(ModalContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const { userNotes, setUserNotes, selected } = useContext(UserNotesContext);
  const selectedNote = userNotes.find((note) => note.id === selected);
  const notes = useNoteService();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  // Set form values to selected note values on render
  useEffect(() => {
    if (selectedNote) {
      setFormValues(titleRef, contentRef, selectedNote);
      setTags(selectedNote.tags);
    }
  }, [selectedNote]);

  async function submit() {
    if (!selectedNote) return;
    const titleVal = titleRef.current?.value;
    const contentVal = contentRef.current?.innerText;

    // Allow user to save empty notes, but replace all whitespace
    // content with empty strings.
    const title = isEmpty(titleVal) ? "" : (titleVal as string);
    const content = isEmpty(contentVal) ? "" : (contentVal as string);

    // Set optimistic notes
    const updatedNote = { ...selectedNote, title, content, tags };
    const optimisticNotes = optimistic.notes.updateOne(userNotes, updatedNote);
    setUserNotes(optimisticNotes);

    // Close modal and set saving state.
    setModal("");
    setIsSaving(true);

    // Edit note in db and fetch updated notes.
    await notes.update(selectedNote.id, title, content);
    const data = await notes.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await submit();
  }

  return (
    <Modal rootId="modal" handleDismiss={submit}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[250px] p-3 border border-black"
      >
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <input
            ref={titleRef}
            type="text"
            name="title"
            id="title"
            className="w-full focus:outline-none font-semibold placeholder:text-slate-400"
            placeholder="title"
          />
          <div
            ref={contentRef}
            id="content"
            data-placeholder="note..."
            className="w-full focus:outline-none my-3 empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)]"
            contentEditable
          ></div>
          {<NoteTags tags={tags} />}
          <div className="flex w-full justify-between items-center">
            <NoteContext.Provider
              value={{ note: selectedNote || DEFAULT.note }}
            >
              <NoteOptions
                editTagsForm={<NoteEditTags />}
                deleteButton={<NoteDeleteButton />}
              />
            </NoteContext.Provider>
            <button type="submit" className="p-1 hover:text-aqua">
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditNotePage;
