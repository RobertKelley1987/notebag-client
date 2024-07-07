import { useContext, useState } from "react";
import { UserTagsContext } from "../../context/UserTagsContext";
import EditTagsBackButton from "./EditTagsBackButton";
import SearchIcon from "../icons/SearchIcon";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Tag } from "../../types";

type EditTagsProps = {
  renderCheckbox: (tag: Tag) => ReactNode;
  renderNewTagButton: (
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
  ) => ReactNode;
};

function EditTags({ renderCheckbox, renderNewTagButton }: EditTagsProps) {
  const { userTags } = useContext(UserTagsContext);
  const [search, setSearch] = useState("");
  const results = userTags.filter((tag) => tag.name.includes(search));
  const exactMatchIndex = userTags.findIndex((tag) => tag.name === search);
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="tag name"
          className="w-full focus:outline-none"
        />
        <SearchIcon className="basis-[24px] shrink-0 hidden sm:block" />
      </div>
      {results.length > 0 && foundTags}

      {/* Show new tag button if user input is not found in tag list. */}
      {search && !exactMatchFound && renderNewTagButton(search, setSearch)}
    </div>
  );
}

export default EditTags;
