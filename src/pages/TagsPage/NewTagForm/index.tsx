import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { UserTagsContext } from "../../../context/UserTagsContext";
import { IsSavingContext } from "../../../context/IsSavingContext";
import { useTagService } from "../../../hooks/useTagService";
import optimistic from "../../../lib/optimistic";
import { isEmpty } from "../../../lib/strings";
import NewTagButton from "./NewTagButton";
import CloseButton from "./CloseButton";
import OpenButton from "./OpenButton";
import type { FocusEvent, KeyboardEvent } from "react";

function NewTagForm() {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const [formActive, setFormActive] = useState(true);
  const [error, setError] = useState("");
  const tags = useTagService();
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
    await tags.create(newTag.id, newTag.name);
    const data = await tags.findAll();
    setUserTags(data.tags);
    setIsSaving(false);
  }

  function handleBlur(e: FocusEvent<HTMLInputElement, Element>) {
    if (e.relatedTarget?.id === "submit") return;
    setFormActive(false);
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === "Enter") submit();
  }

  return (
    <Fragment>
      <div className="flex gap-3">
        {formActive ? (
          <CloseButton setFormActive={setFormActive} />
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
