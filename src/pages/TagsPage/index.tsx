import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserTagsContext } from "../../context/UserTagsContext";
import { UserNotesContext } from "../../context/UserNotesContext";
import { IsSavingContext } from "../../context/IsSavingContext";
import { EditedTagContext } from "../../context/EditedTagContext";
import { ModalContext } from "../../context/ModalContext";
import { useNoteService } from "../../hooks/useNoteService";
import { useTagService } from "../../hooks/useTagService";
import optimistic from "../../lib/optimistic";
import Modal from "../../components/Modal";
import NewTagForm from "./NewTagForm";
import TagList from "./TagList";
import type { Tag } from "../../types";

function TagsPage() {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { isSaving, setIsSaving } = useContext(IsSavingContext);
  const { editedTag } = useContext(EditedTagContext);
  const { setModal } = useContext(ModalContext);
  const notes = useNoteService();
  const tags = useTagService();
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  // Function to change a tag name throughout app.
  // Action required when update completes needs to be passed as callback arg.
  async function updateTagName(editedTag: Tag, closeFn: () => void) {
    // Confirm name has been altered. If not, return.
    const tagIndex = userTags.findIndex((tag) => tag.id === editedTag.id);
    const oldName = userTags[tagIndex].name.trim();
    const newName = editedTag.name.trim();
    if (oldName === newName) return closeFn();

    // Set optimistic tags and notes
    const updatedTag = { ...editedTag, name: newName };
    const optimisticTags = optimistic.tags.updateOne(userTags, updatedTag);
    const optimisticNotes = optimistic.notes.updateTag(userNotes, updatedTag);
    setUserTags(optimisticTags);
    setUserNotes(optimisticNotes);

    // If user is filtering notes by the edited tag, update search params
    if (tagFilter === oldName) setSearchParams({ tag: newName });

    // Close modal and set saving state
    closeFn();
    setIsSaving(true);

    // Change tag name in db and fetch updated values
    await tags.update(editedTag.id, newName);
    const [notesData, tagsData] = await Promise.all([
      notes.findAll(),
      tags.findAll(),
    ]);
    setUserNotes(notesData.notes);
    setUserTags(tagsData.tags);
    setIsSaving(false);
  }

  function handleDismiss() {
    if (editedTag) {
      updateTagName(editedTag, () => setModal(""));
    } else {
      setModal("");
    }
  }

  return (
    <Modal rootId="modal" handleDismiss={handleDismiss}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3 font-ibm text-black w-[275px] max-h-[350px] overflow-y-auto my-6 p-3 bg-white border border-black"
      >
        <div className="flex justify-between">
          <h1 className="font-semibold">Edit Tags</h1>
          {isSaving && <span>Saving...</span>}
        </div>
        <NewTagForm />
        <TagList tags={userTags} updateTagName={updateTagName} />
      </div>
    </Modal>
  );
}

export default TagsPage;
