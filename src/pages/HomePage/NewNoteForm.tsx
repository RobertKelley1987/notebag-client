import { Fragment, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useClickOutside } from "../../hooks/useClickOutside";
import type { MouseEvent } from "react";

function NewNoteForm() {
  const [formOpen, setFormOpen] = useState(false);
  const fetcher = useFetcher({ key: "note-form" });
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { wrapperRef } = useClickOutside(submit);

  function submit() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";
    const formData = { noteId: uuid(), title, content };

    const allWhiteSpace = new RegExp(/[^\S]/);

    if (title || content) {
      fetcher.submit(formData, {
        method: "POST",
        action: "/",
      });

      if (contentRef.current) contentRef.current.innerText = "";
      if (titleRef.current) titleRef.current.value = "";
    }

    setFormOpen(false);
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    submit();
  }

  const formBottom = (
    <Fragment>
      <div
        ref={contentRef}
        id="content"
        contentEditable
        data-placeholder="new note..."
        className="w-full focus:outline-none my-3 empty:before:content-[attr(data-placeholder)]"
      ></div>
      <button onClick={handleClick} className="w-20 border border-black p-2">
        Close
      </button>
    </Fragment>
  );

  return (
    <div ref={wrapperRef} className="w-[250px] my-6 p-3 border border-black">
      <fetcher.Form className="flex flex-col w-full items-end">
        <input
          onClick={() => setFormOpen(true)}
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          className="w-full focus:outline-none font-semibold"
          placeholder="title"
        />
        {formOpen && formBottom}
      </fetcher.Form>
    </div>
  );
}

export default NewNoteForm;
