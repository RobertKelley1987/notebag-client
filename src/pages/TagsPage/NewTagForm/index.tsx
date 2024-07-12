import { Fragment, useEffect } from "react";
import { useTagForm } from "../../../hooks/useTagForm";
import { useCreateTag } from "../../../hooks/useCreateTag";
import NewTagButton from "./NewTagButton";
import CloseButton from "./CloseButton";
import OpenButton from "./OpenButton";
import type { FocusEvent, KeyboardEvent } from "react";

function NewTagForm() {
  const { formActive, setFormActive, error, inputRef } = useTagForm();
  const createTag = useCreateTag();

  useEffect(() => {
    if (formActive) inputRef.current?.focus();
  }, [formActive]);

  function handleBlur(e: FocusEvent<HTMLInputElement, Element>) {
    const clickedSubmit = e.relatedTarget?.id === "submit";
    const clickedClose = e.relatedTarget?.id === "close";
    if (clickedSubmit || clickedClose) return;
    setFormActive(false);
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === "Enter") createTag();
  }

  function resetForm() {
    const input = inputRef.current;
    if (input) input.value = "";
    setFormActive(false);
  }

  return (
    <Fragment>
      <div className="flex gap-3">
        {formActive ? (
          <CloseButton resetForm={resetForm} />
        ) : (
          <OpenButton setFormActive={setFormActive} />
        )}
        <input
          ref={inputRef}
          type="text"
          className="w-full focus:outline-none"
          placeholder="new tag..."
          onFocus={() => setFormActive(true)}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
        />
        {formActive && <NewTagButton submit={createTag} />}
      </div>
      {error && <p className="text-red text-xs">{error}</p>}
    </Fragment>
  );
}

export default NewTagForm;
