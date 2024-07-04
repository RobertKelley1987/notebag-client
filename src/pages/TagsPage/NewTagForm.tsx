import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { UserTagsContext } from "../../context/UserTagsContext";
import { IsSavingContext } from "../../context/IsSavingContext";
import { useTagService } from "../../hooks/useTagService";
import optimistic from "../../lib/optimistic";
import { isEmpty } from "../../lib/strings";
import CheckmarkIcon from "../../components/icons/CheckmarkIcon";
import PlusIcon from "../../components/icons/PlusIcon";
import CloseIcon from "../../components/icons/CloseIcon";

function NewTagForm() {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { isSaving, setIsSaving } = useContext(IsSavingContext);
  const [formActive, setFormActive] = useState(true);
  const [error, setError] = useState("");
  const tagRef = useRef<HTMLInputElement>(null);
  const tags = useTagService();

  useEffect(() => {
    if (formActive) {
      tagRef.current?.focus();
    }
  }, [formActive]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.relatedTarget?.id === "submit") return;
    setFormActive(false);
  };

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();

    // Remove focus from tag input
    setFormActive(false);

    // Clear error alerts from last submission
    setError("");

    // If name is not empty or all whitespace, create new tag
    const input = tagRef.current;
    if (input && !isEmpty(input.value)) {
      const newTag = { id: uuid(), name: input.value.trim() };

      // If tag name is already in list, notify user and return.
      const tagIndex = userTags.findIndex((tag) => {
        return tag.name.toLowerCase() === newTag.name.toLowerCase();
      });
      if (tagIndex !== -1) {
        return setError("Tag already exists.");
      }

      // Set saving state.
      setIsSaving(true);

      // Set optimisitic tags.
      const optimisticTags = optimistic.tags.addOne(userTags, newTag);
      setUserTags(optimisticTags);

      // Reset form.
      input.value = "";

      // Create tag in db and fetch upated tags.
      await tags.create(newTag.id, newTag.name);
      const tagData = await tags.findAll();
      setUserTags(tagData.tags);
      setIsSaving(false);
    }
  }

  const openButton = (
    <button onClick={() => setFormActive(true)} className="hover:text-aqua">
      <PlusIcon />
    </button>
  );

  const closeButton = (
    <button onClick={() => setFormActive(false)} className="hover:text-aqua">
      <CloseIcon />
    </button>
  );

  const checkmarkButton = (
    <button
      id="submit"
      onClick={handleSubmit}
      disabled={isSaving}
      type="submit"
      className="hover:text-aqua"
    >
      <CheckmarkIcon />
    </button>
  );

  return (
    <Fragment>
      <div className="flex gap-3">
        {formActive ? closeButton : openButton}
        <input
          ref={tagRef}
          type="text"
          className="w-full focus:outline-none"
          placeholder="new tag..."
          onFocus={() => setFormActive(true)}
          onBlur={handleBlur}
        />
        {formActive && checkmarkButton}
      </div>
      {error && <p className="text-red">{error}</p>}
    </Fragment>
  );
}

export default NewTagForm;
