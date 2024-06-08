import { useState, useRef } from "react";
import { LoaderFunction, useFetcher } from "react-router-dom";
import { v4 as uuid } from "uuid";
import notes from "../../services/notes";
import { useClickOutside } from "../../hooks/useClickOutside";
import type { ActionFunction } from "react-router-dom";

function NewNoteForm() {
  const fetcher = useFetcher();
  const [noteId, setNoteId] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { wrapperRef } = useClickOutside();
  const timeout = useRef<NodeJS.Timeout>();

  const submit = (noteId: string, method: "POST" | "PUT") => {
    const formData = {
      noteId,
      title: titleRef.current?.value || "",
      content: contentRef.current?.innerText || "",
    };

    fetcher.submit(formData, {
      method,
      action: "/new",
    });
  };

  const newNote = () => {
    const noteId = uuid();
    setNoteId(noteId);

    submit(noteId, "POST");
  };

  const editNote = () => submit(noteId, "PUT");

  // I am using the key up event because the change event
  // does not work with content editable div.
  const handleKeyUp = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      !noteId ? newNote() : editNote();
    }, 300);
  };

  return (
    <div ref={wrapperRef} className="w-min">
      <fetcher.Form className="flex flex-col w-[300px]" onKeyUp={handleKeyUp}>
        <input
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          className="border border-black"
        />
        <div
          ref={contentRef}
          id="content"
          className="border border-black"
          contentEditable
        ></div>
      </fetcher.Form>
    </div>
  );
}

const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const noteId = formData.get("noteId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (request.method === "POST") {
    await notes.create(noteId, title, content);
  } else if (request.method === "PUT") {
    await notes.update(noteId, title, content);
  }

  return null;
};

export const newNoteRoute = { element: <NewNoteForm />, action };
