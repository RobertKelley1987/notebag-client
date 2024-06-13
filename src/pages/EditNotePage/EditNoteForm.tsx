import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserNotesContext from "../../context/UserNotesContext";
import notes from "../../services/notes";
import type { FormEvent, RefObject } from "react";
import type { Note } from "../../types";
import { useSelectedNote } from "../../hooks/useSelectedNote";

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
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { selectedNote } = useSelectedNote(userNotes);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Set form values to selected note values
  useEffect(() => {
    if (selectedNote) {
      setFormValues(titleRef, contentRef, selectedNote);
    }
  }, [selectedNote]);

  async function submit() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";
    const noteIsNotEmpty = title || content;

    if (selectedNote && noteIsNotEmpty) {
      // Set optimistic notes
      const updatedNote = { id: selectedNote.id, title, content };
      const optimistic = [...userNotes];
      const noteIndex = userNotes.findIndex(
        (note) => note.id === selectedNote.id
      );
      optimistic.splice(noteIndex, 1, updatedNote);
      setUserNotes(optimistic);

      // Navigate to notes page
      navigate("/");

      // Edit note in db and fetch updated notes
      await notes.update(selectedNote.id, title, content);
      const res = await notes.findAll();
      setUserNotes(res.notes);
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
