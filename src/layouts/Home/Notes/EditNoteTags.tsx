import { useContext, useState } from "react";
import UserTagsContext from "../../../context/UserTagsContext";
import SearchIcon from "../../../components/icons/SearchIcon";
import TagCheckbox from "./TagCheckbox";
import NewTagButton from "./NewTagButton";

function EditNoteTags() {
  const [search, setSearch] = useState("");
  const { userTags } = useContext(UserTagsContext);
  const results = userTags.filter((tag) => tag.name.includes(search));
  const exactMatchIndex = userTags.findIndex((tag) => tag.name === search);
  const exactMatchFound = exactMatchIndex !== -1;

  const foundTags = (
    <ul>
      {results.map((tag) => (
        <TagCheckbox tag={tag} />
      ))}
    </ul>
  );

  function renderNewTagButton() {
    if (search && !exactMatchFound) {
      return <NewTagButton tagName={search} setTagName={setSearch} />;
    }
  }

  return (
    <div className="bg-white w-max flex flex-col gap-2">
      <h2 className="font-semibold">Note Tags</h2>
      <div className="flex gap-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tags"
          className="focus:outline-none"
        />
        <SearchIcon />
      </div>
      {results.length > 0 && foundTags}

      {/* Show new tag button if user input is not found in tag list. */}
      {renderNewTagButton()}
    </div>
  );
}

export default EditNoteTags;
