import EditTags from "../NoteOptions/EditTags/EditTags";
import NewNoteTagCheckbox from "./NoteFormTagCheckbox";
import FormCreateTagButton from "./NoteFormCreateTagButton";
import type { Tag } from "../../types";

function NoteFormEditTags() {
  const renderCheckbox = (tag: Tag) => (
    <NewNoteTagCheckbox key={tag.id} tag={tag} />
  );

  const renderNewTagButton = () => <FormCreateTagButton />;

  return (
    <EditTags
      renderCheckbox={renderCheckbox}
      renderNewTagButton={renderNewTagButton}
    />
  );
}

export default NoteFormEditTags;
