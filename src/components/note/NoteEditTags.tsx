import EditTags from "../NoteOptions/EditTags/EditTags";
import NoteTagCheckbox from "./NoteTagCheckbox";
import NoteCreateTagButton from "./NoteCreateTagButton";
import type { Tag } from "../../types";

function NoteEditTags() {
  const renderCheckbox = (tag: Tag) => (
    <NoteTagCheckbox key={tag.id} tag={tag} />
  );

  const renderNewTagButton = () => <NoteCreateTagButton />;

  return (
    <EditTags
      renderCheckbox={renderCheckbox}
      renderNewTagButton={renderNewTagButton}
    />
  );
}

export default NoteEditTags;
