import { useContext } from "react";
import { IsSavingContext } from "../../context/IsSavingContext";
import { EditedTagContext } from "../../context/EditedTagContext";
import { ModalContext } from "../../context/ModalContext";
import { TagNameContext } from "../../context/TagNameContext";
import Modal from "../../components/Modal";
import NewTagForm from "./NewTagForm";
import TagList from "./TagList";

function TagsPage() {
  const { isSaving } = useContext(IsSavingContext);
  const { editedTag } = useContext(EditedTagContext);
  const { setModal } = useContext(ModalContext);
  const { updateTagName } = useContext(TagNameContext);

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
