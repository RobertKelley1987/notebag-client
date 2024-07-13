import { useContext } from "react";
import { NoteFormContext } from "../context/NoteFormContext";
import { isEmpty } from "../lib/strings";
import type { NoteForm } from "../types";

// Hook to access note form context. Helpers also provided to more easily access
// title and content values stored in ref objects.
export function useNoteForm() {
  const noteFormContext = useContext(NoteFormContext);
  if (!noteFormContext) {
    throw new Error("Use NoteFormContext.Provider to access this context.");
  }

  const { titleRef, contentRef, tags, setTags, pinned, setPinned } =
    noteFormContext;

  function getForm() {
    const title = titleRef.current?.innerText || "";
    const content = contentRef.current?.innerText || "";
    const form = {
      title: isEmpty(title) ? "" : title,
      content: isEmpty(content) ? "" : content,
      tags,
      pinned,
    };

    return form;
  }

  function setForm(form: NoteForm) {
    if (titleRef.current) titleRef.current.innerText = form.title;
    if (contentRef.current) contentRef.current.innerText = form.content;
    setTags(form.tags);
    setPinned(form.pinned);
  }

  return { ...noteFormContext, getForm, setForm };
}
