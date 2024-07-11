import { useIsSaving } from "../../hooks/useIsSaving";
import { useEditedTag } from "../../hooks/useEditedTag";
import { useModal } from "../../hooks/useModal";
import { useUpdateTag } from "../../hooks/useUpdateTag";
import Modal from "../../components/Modal";
import NewTagForm from "./NewTagForm";
import TagList from "./TagList";

function TagsPage() {
  const { editedTag } = useEditedTag();
  const { setModal } = useModal();
  const { isSaving } = useIsSaving();
  const updateTag = useUpdateTag();

  function handleDismiss() {
    if (editedTag) {
      updateTag(editedTag, () => setModal(""));
    } else {
      setModal("");
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
