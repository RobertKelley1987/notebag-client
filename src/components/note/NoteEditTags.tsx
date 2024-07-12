import EditTags from "../NoteOptions/EditTags/EditTags";
import NoteTagCheckbox from "./NoteTagCheckbox";
import NoteCreateTagButton from "./NoteCreateTagButton";
import TagResults from "../NoteOptions/EditTags/TagResults";
import type { Tag } from "../../types";

function NoteEditTags() {
  const renderCheckbox = (tag: Tag) => (
    <NoteTagCheckbox key={tag.id} tag={tag} />
  );

  return (
    <EditTags>
      <TagResults renderCheckbox={renderCheckbox} />
      <NoteCreateTagButton />
    </EditTags>
  );
}

export default NoteEditTags;
