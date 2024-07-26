import { useEffect, useRef } from "react";
import { useEditedTag } from "../../../hooks/useEditedTag";
import { useUpdateTag } from "../../../hooks/useUpdateTag";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import type { Tag } from "../../../types";

type TagInputProps = {
  tag: Tag;
};

function TagInput({ tag }: TagInputProps) {
  const { editedTag, setEditedTag } = useEditedTag();
  const updateTag = useUpdateTag();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editedTag?.id === tag.id) inputRef.current?.focus();
  }, [editedTag]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEditedTag({ id: tag.id, name: e.target.value });
  }

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      editedTag && updateTag(editedTag, () => setEditedTag(null));
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement, Element>) {
    const clickedDeleteButton = e.relatedTarget?.id === `delete-${tag.id}`;
    const clickedUpdateButton = e.relatedTarget?.id === `update-${tag.id}`;
    const clickedBackButton = e.relatedTarget?.id === "edit-tags-back-button";
    const doNotBlur =
      clickedDeleteButton || clickedUpdateButton || clickedBackButton;
    if (!e.relatedTarget || doNotBlur) return;
    setEditedTag(null);
  }

  return (
    <input
      ref={inputRef}
      type="text"
      defaultValue={tag.name}
      className="w-full focus:outline-none"
      onChange={handleChange}
      onFocus={() => setEditedTag(tag)}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
    />
  );
}

export default TagInput;
