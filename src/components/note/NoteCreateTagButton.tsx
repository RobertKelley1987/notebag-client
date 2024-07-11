import { useCreateTagFromNote } from "../../hooks/useCreateTagFromNote";
import CreateTagButton from "../NoteOptions/EditTags/CreateTagButton";
import type { MouseEvent } from "react";

function NoteCreateTagButton() {
  const createTagFromNote = useCreateTagFromNote();

  async function handleClick(e: MouseEvent) {
    e.stopPropagation();
    createTagFromNote();
  }

  return <CreateTagButton createTag={createTagFromNote} />;
}

export default NoteCreateTagButton;
