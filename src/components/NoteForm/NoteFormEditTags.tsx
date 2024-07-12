import EditTags from "../NoteOptions/EditTags/EditTags";
import NoteFormTagCheckbox from "./NoteFormTagCheckbox";
import NoteFormCreateTagButton from "./NoteFormCreateTagButton";
import TagResults from "../NoteOptions/EditTags/TagResults";
import type { Tag } from "../../types";

function NoteFormEditTags() {
  const renderCheckbox = (tag: Tag) => (
    <NoteFormTagCheckbox key={tag.id} tag={tag} />
  );

  return (
    <EditTags>
      <TagResults renderCheckbox={renderCheckbox} />
      <NoteFormCreateTagButton />
    </EditTags>
  );
}

export default NoteFormEditTags;
