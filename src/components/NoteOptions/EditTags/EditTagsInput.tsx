import { useTagSearch } from "../../../hooks/useTagSearch";
import type { KeyboardEvent } from "react";

type EditTagsInputProps = {
  createTag: () => Promise<void>;
};

function EditTagsInput({ createTag }: EditTagsInputProps) {
  const { tagSearch, setTagSearch } = useTagSearch();

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === "Enter") {
      createTag();
    }
  }

  return (
    <input
      type="text"
      value={tagSearch}
      onChange={(e) => setTagSearch(e.target.value)}
      onKeyUp={handleKeyUp}
      placeholder="tag name"
      className="w-full focus:outline-none"
    />
  );
}

export default EditTagsInput;
