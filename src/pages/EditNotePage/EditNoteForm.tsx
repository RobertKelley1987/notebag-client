import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNotesContext from "../../context/UserNotesContext";
import { useNoteService } from "../../hooks/useNoteService";
import { isEmpty } from "../../utils";
import type { FormEvent, RefObject } from "react";
import type { Note } from "../../types";
import { ModalContext } from "../../context/ModalContext";

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

function EditNoteForm() {
  const { userNotes, setUserNotes, selected } = useContext(UserNotesContext);
  const selectedNote = userNotes.find((note) => note.id === selected);
  const { setModal } = useContext(ModalContext);
  const notes = useNoteService();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Set form values to selected note values on render
  useEffect(() => {
    if (selectedNote) {
      setFormValues(titleRef, contentRef, selectedNote);
    }
  }, [selectedNote]);

  async function submit() {
    const titleVal = titleRef.current?.value;
    const contentVal = contentRef.current?.innerText;

    // Allow user to save empty notes, but replace all whitespace
    // content with empty strings.
    const title = isEmpty(titleVal) ? "" : (titleVal as string);
    const content = isEmpty(contentVal) ? "" : (contentVal as string);

    if (selectedNote) {
      // Set optimistic notes
      const updatedNote = {
        id: selectedNote.id,
        tags: selectedNote.tags,
        title,
        content,
      };
      const optimistic = [...userNotes];
      const noteIndex = userNotes.findIndex(
        (note) => note.id === selectedNote.id
      );
      optimistic.splice(noteIndex, 1, updatedNote);
      setUserNotes(optimistic);

      // Close modal
      setModal("");

      // Edit note in db and fetch updated notes
      await notes.update(selectedNote.id, title, content);
      const data = await notes.findAll();
      setUserNotes(data.notes);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await submit();
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-end">
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
        <button type="submit" className="w-20 border border-black p-2">
          Close
        </button>
      </form>
    </div>
  );
}

export default EditNoteForm;
