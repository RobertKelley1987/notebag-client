import { useNavigate } from "react-router-dom";
import { useIsSaving } from "../../hooks/useIsSaving";
import { useEditedTag } from "../../hooks/useEditedTag";
import { useModal } from "../../hooks/useModal";
import { useUpdateTag } from "../../hooks/useUpdateTag";
import { useFoundTag } from "../../hooks/useFoundTag";
import Modal from "../../components/Modal";
import NewTagForm from "./NewTagForm";
import TagList from "./TagList";

function TagsPage() {
  const { editedTag } = useEditedTag();
  const { foundTag } = useFoundTag();
  const { setModal } = useModal();
  const { isSaving } = useIsSaving();
  const updateTag = useUpdateTag();
  const navigate = useNavigate();

  function handleDismiss() {
    // If user edits a tag and dismisses modal instead of clicking checkmark button,
    // update tag
    if (editedTag) {
      updateTag(editedTag, () => setModal(""));
      // If notes behind modal are filtered by a tag, but the user deleted that tag,
      // remove the tag filter by navigating to all notes.
    } else {
      setModal("");
      if (!foundTag) navigate("/notes");
    }
  }

  return (
    <Modal handleDismiss={handleDismiss}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3 font-ibm text-black w-[275px] max-h-[350px] overflow-y-auto my-6 p-4 bg-white border border-black"
      >
        <div className="flex justify-between">
          <h1 className="font-semibold">Edit Tags</h1>
          {isSaving && <span>Saving...</span>}
        </div>
        <NewTagForm />
        <TagList />
      </div>
    </Modal>
  );
}

export default TagsPage;
