import EditTags from "./EditTags";
import NoteTagCheckbox from "./NoteTagCheckbox";
import NoteCreateTagButton from "./NoteCreateTagButton";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../../types";

function NoteEditTags() {
  const renderCheckbox = (tag: Tag) => (
    <NoteTagCheckbox key={tag.id} tag={tag} />
  );

  const renderNewTagButton = (
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
  ) => <NoteCreateTagButton search={search} setSearch={setSearch} />;

  return (
    <EditTags
      renderCheckbox={renderCheckbox}
      renderNewTagButton={renderNewTagButton}
    />
  );
}

export default NoteEditTags;
