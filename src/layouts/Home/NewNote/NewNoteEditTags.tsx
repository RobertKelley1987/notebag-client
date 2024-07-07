import EditTags from "../../../components/Note/EditTags";
import NewNoteTagCheckbox from "./NewNoteTagCheckbox";
import NewNoteCreateTagButton from "./NewNoteCreateTagButton";
import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../../../types";

function NewNoteEditTags() {
  const renderCheckbox = (tag: Tag) => (
    <NewNoteTagCheckbox key={tag.id} tag={tag} />
  );

  const renderNewTagButton = (
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
  ) => <NewNoteCreateTagButton search={search} setSearch={setSearch} />;

  return (
    <EditTags
      renderCheckbox={renderCheckbox}
      renderNewTagButton={renderNewTagButton}
    />
  );
}

export default NewNoteEditTags;
