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
      placeholder="enter tag name"
      className="w-full focus:outline-none placeholder:text-slate-400"
    />
  );
}

export default EditTagsInput;
