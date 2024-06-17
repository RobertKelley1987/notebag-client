import { useContext, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserTagsContext from "../../context/UserTagsContext";
import tags from "../../services/tags";
import { compareTags, isEmpty } from "../../utils";
import Modal from "../../components/Modal";
import TagList from "./TagList";
import type { FormEvent } from "react";

function TagsPage() {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const [error, setError] = useState("");
  const tagRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
    }
  }

  return (
    <Modal rootId="modal" handleDismiss={() => navigate("/")}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[250px] max-h-[350px] overflow-y-auto my-6 p-3 bg-white border border-black"
      >
        <h1 className="font-semibold">Edit Tags</h1>
        <form onSubmit={handleSubmit} className="flex">
          <input ref={tagRef} type="text" />
          <button type="submit">Save</button>
        </form>
        {error && <p className="text-red">{error}</p>}
        <TagList tags={userTags} />
      </div>
      <Outlet />
    </Modal>
  );
}

export default TagsPage;
