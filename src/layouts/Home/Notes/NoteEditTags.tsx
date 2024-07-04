import EditTags from "../EditTags";
import NoteTagCheckbox from "./NoteTagCheckbox";
import type { Tag } from "../../../types";

function NoteEditTags() {
  const renderCheckbox = (tag: Tag) => (
    <NoteTagCheckbox key={tag.id} tag={tag} />
  );
  return <EditTags renderCheckbox={renderCheckbox} />;
}

export default NoteEditTags;
