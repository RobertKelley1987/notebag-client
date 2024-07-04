import EditTags from "./EditTags";
import NewNoteTagCheckbox from "./NewNoteTagCheckbox";
import type { Tag } from "../../types";

function NewNoteEditTags() {
  const renderCheckbox = (tag: Tag) => (
    <NewNoteTagCheckbox key={tag.id} tag={tag} />
  );
  return <EditTags renderCheckbox={renderCheckbox} />;
}

export default NewNoteEditTags;
