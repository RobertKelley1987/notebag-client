import { Fragment, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useClickOutside } from "../../hooks/useClickOutside";
import type { MouseEvent } from "react";

function NewNoteForm() {
  const [formOpen, setFormOpen] = useState(false);
  const fetcher = useFetcher({ key: "new-note-form" });
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { wrapperRef } = useClickOutside(submit);

  function submit() {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.innerText || "";
    const formData = { noteId: uuid(), title, content };

    if (title || content) {
      fetcher.submit(formData, {
        method: "POST",
        action: "/",
      });

      if (contentRef.current) {
        contentRef.current.innerText = "";
      }

      if (titleRef.current) {
        titleRef.current.value = "";
      }
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
        className="border border-black"
        contentEditable
      ></div>
      <button onClick={handleClick}>Close</button>
    </Fragment>
  );

  return (
    <div ref={wrapperRef} className="w-[250px] my-6">
      <fetcher.Form className="flex flex-col">
        <input
          onClick={() => setFormOpen(true)}
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          className="border border-black"
        />
        {formOpen && formBottom}
      </fetcher.Form>
    </div>
  );
}

export default NewNoteForm;
