import { useUserTags } from "../../../hooks/useUserTags";
import { useTagSearch } from "../../../hooks/useTagSearch";
import EditTagsBackButton from "./EditTagsBackButton";
import SearchIcon from "../../icons/SearchIcon";
import type { ReactNode } from "react";
import type { Tag } from "../../../types";

type EditTagsProps = {
  renderCheckbox: (tag: Tag) => ReactNode;
  renderNewTagButton: () => ReactNode;
};

function EditTags({ renderCheckbox, renderNewTagButton }: EditTagsProps) {
  const { userTags } = useUserTags();
  const { tagSearch, setTagSearch } = useTagSearch();
  const results = userTags.filter((tag) => tag.name.includes(tagSearch));
  const exactMatchIndex = userTags.findIndex((tag) => tag.name === tagSearch);
  const exactMatchFound = exactMatchIndex !== -1;

  const foundTags = (
    <ul className="flex flex-col gap-4 sm:gap-1">
      {results.map((tag) => renderCheckbox(tag))}
    </ul>
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-screen sm:w-auto h-screen sm:h-auto min-w-[200px] bg-white flex flex-col gap-4 sm:gap-2 p-3 sm:p-0"
    >
      <h2 className="hidden sm:block font-semibold">Note Tags</h2>
      <div className="flex gap-2 sm:gap-1 w-full">
        <EditTagsBackButton />
        <input
          type="text"
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
          placeholder="tag name"
          className="w-full focus:outline-none"
        />
        <SearchIcon className="basis-[24px] shrink-0 hidden sm:block" />
      </div>
      {results.length > 0 && foundTags}

      {/* Show new tag button if user input is not found in tag list. */}
      {tagSearch && !exactMatchFound && renderNewTagButton()}
    </div>
  );
}

export default EditTags;
