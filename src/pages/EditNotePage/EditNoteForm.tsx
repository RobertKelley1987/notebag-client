import { useEffect, useRef } from "react";
import { useAsyncValue, useFetcher, useNavigate } from "react-router-dom";
import type { MouseEvent, RefObject } from "react";
import type { Note } from "../../types";

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
  const note = useAsyncValue() as Note;
  const fetcher = useFetcher({ key: "note-form" });
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Set form values to selected note values
  useEffect(() => {
    setFormValues(titleRef, contentRef, note);
  }, []);

  function submit() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";
    const formData = { noteId: note.id, title, content };

    navigate("/");

    if (title || content) {
      fetcher.submit(formData, {
        method: "PUT",
        action: "/notes/:noteId",
      });
    }
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    submit();
  }

  return (
    <div className="w-full">
      <fetcher.Form className="flex flex-col items-end">
        <input
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          className="w-full focus:outline-none font-semibold"
          placeholder="title"
        />
        <div
          ref={contentRef}
          id="content"
          className="w-full focus:outline-none my-3"
          contentEditable
        ></div>
        <button onClick={handleClick} className="w-20 border border-black p-2">
          Close
        </button>
      </fetcher.Form>
    </div>
  );
}

export default EditNoteForm;
