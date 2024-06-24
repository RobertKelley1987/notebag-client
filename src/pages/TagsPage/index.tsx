import { useContext, useRef, useState } from "react";
import UserTagsContext from "../../context/UserTagsContext";
import IsSavingContext from "../../context/IsSavingContext";
import { useTagService } from "../../hooks/useTagService";
import { compareTags, isEmpty } from "../../utils";
import Modal from "../../components/Modal";
import TagList from "./TagList";
import type { Dispatch, FormEvent, SetStateAction } from "react";

type TagsPageProps = {
  setEditingTags: Dispatch<SetStateAction<boolean>>;
};

function TagsPage({ setEditingTags }: TagsPageProps) {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { isSaving, setIsSaving } = useContext(IsSavingContext);
  const [error, setError] = useState("");
  const tagRef = useRef<HTMLInputElement>(null);
  const tags = useTagService();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const input = tagRef.current;
    if (input && !isEmpty(input.value)) {
      const name = input.value.trim();

      // Check if tag name is already in list
      const foundTagIndex = userTags.findIndex((tag) => tag.name === name);
      if (foundTagIndex !== -1) {
        return setError("Tag already exists.");
      }

      // Start saving state
      setIsSaving(true);

      // Set optimisitic tags.
      const newTag = { id: "new-tag", name };
      const optimistic = [newTag, ...userTags];
      optimistic.sort(compareTags);
      setUserTags(optimistic);

      // Reset form.
      input.value = "";

      // Create tag in db and fetch upated tags.
      await tags.create(name);
      const tagData = await tags.findAll();
      setUserTags(tagData.tags);
      setIsSaving(false);
    }
  }

  return (
    <Modal rootId="modal" handleDismiss={() => setEditingTags(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[250px] max-h-[350px] overflow-y-auto my-6 p-3 bg-white border border-black"
      >
        <div className="flex justify-between">
          <h1 className="font-semibold">Edit Tags</h1>
          {isSaving && <span>Saving...</span>}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input ref={tagRef} type="text" />
          <button disabled={isSaving} type="submit">
            Save
          </button>
        </form>
        {error && <p className="text-red">{error}</p>}
        <TagList tags={userTags} />
      </div>
    </Modal>
  );
}

export default TagsPage;
