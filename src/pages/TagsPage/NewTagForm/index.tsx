import { Fragment, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useUserTags } from "../../../hooks/useUserTags";
import { useIsSaving } from "../../../hooks/useIsSaving";
import { useTagService } from "../../../hooks/useTagService";
import optimistic from "../../../lib/optimistic";
import { isEmpty } from "../../../lib/strings";
import NewTagButton from "./NewTagButton";
import CloseButton from "./CloseButton";
import OpenButton from "./OpenButton";
import type { FocusEvent, KeyboardEvent } from "react";

function NewTagForm() {
  const { userTags, setUserTags } = useUserTags();
  const { setIsSaving } = useIsSaving();
  const [formActive, setFormActive] = useState(true);
  const [error, setError] = useState("");
  const tagService = useTagService();
  const tagRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formActive) {
      tagRef.current?.focus();
    }
  }, [formActive]);

  async function submit() {
    const input = tagRef.current;
    if (!input) return;

    // Remove focus from input and clear errors from last submit
    setFormActive(false);
    setError("");

    // If name is not empty or all whitespace, create new tag
    const name = input.value.trim();
    if (!name || isEmpty(name)) return;
    const newTag = { id: uuid(), name };

    // If tag name is already in list, notify user and return.
    const tagIndex = userTags.findIndex((tag) => {
      return tag.name.toLowerCase() === newTag.name.toLowerCase();
    });
    if (tagIndex !== -1) return setError("Tag already exists.");

    // Set saving state.
    setIsSaving(true);

    // Set optimisitic tags.
    const optimisticTags = optimistic.tags.addOne(userTags, newTag);
    setUserTags(optimisticTags);

    // Reset form.
    input.value = "";

    // Create tag in db and fetch upated tags.
    await tagService.create(newTag.id, newTag.name);
    const data = await tagService.findAll();
    setUserTags(data.tags);
    setIsSaving(false);
  }

  function handleBlur(e: FocusEvent<HTMLInputElement, Element>) {
    const clickedSubmit = e.relatedTarget?.id === "submit";
    const clickedClose = e.relatedTarget?.id === "close";
    if (clickedSubmit || clickedClose) return;
    setFormActive(false);
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === "Enter") submit();
  }

  function resetForm() {
    const input = tagRef.current;
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
          ref={tagRef}
          type="text"
          className="w-full focus:outline-none"
          placeholder="new tag..."
          onFocus={() => setFormActive(true)}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
        />
        {formActive && <NewTagButton submit={submit} />}
      </div>
      {error && <p className="text-red">{error}</p>}
    </Fragment>
  );
}

export default NewTagForm;
