import { useContext, useState } from "react";
import { UserTagsContext } from "../../context/UserTagsContext";
import SearchIcon from "../../components/icons/SearchIcon";
import NewTagButton from "./Notes/NewTagButton";
import type { ReactNode } from "react";
import type { Tag } from "../../types";

type EditTagsProps = {
  renderCheckbox: (tag: Tag) => ReactNode;
};

function EditTags({ renderCheckbox }: EditTagsProps) {
  const { userTags } = useContext(UserTagsContext);
  const [search, setSearch] = useState("");
  const results = userTags.filter((tag) => tag.name.includes(search));
  const exactMatchIndex = userTags.findIndex((tag) => tag.name === search);
  const exactMatchFound = exactMatchIndex !== -1;

  const foundTags = (
    <ul className="flex flex-col gap-1">
      {results.map((tag) => renderCheckbox(tag))}
    </ul>
  );

  function renderNewTagButton() {
    if (search && !exactMatchFound) {
      return <NewTagButton tagName={search} setTagName={setSearch} />;
    }
  }

  return (
    <div className="min-w-[200px] bg-white flex flex-col gap-2">
      <h2 className="font-semibold">Note Tags</h2>
      <div className="flex gap-1 w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tags"
          className="w-full focus:outline-none"
        />
        <SearchIcon className="basis-[24px] shrink-0" />
      </div>
      {results.length > 0 && foundTags}

      {/* Show new tag button if user input is not found in tag list. */}
      {renderNewTagButton()}
    </div>
  );
}

export default EditTags;
