import { useNavigate } from "react-router-dom";
import { useIsSaving } from "../../hooks/useIsSaving";
import { useEditedTag } from "../../hooks/useEditedTag";
import { useModal } from "../../hooks/useModal";
import { useUpdateTag } from "../../hooks/useUpdateTag";
import { useFoundTag } from "../../hooks/useFoundTag";
import { useDemo } from "../../hooks/useDemo";
import Modal from "../../components/Modal";
import NewTagForm from "./NewTagForm";
import TagList from "./TagList";
import ArrowIcon from "../../components/icons/ArrowIcon";

function TagsPage() {
  const { isDemo } = useDemo();
  const { editedTag } = useEditedTag();
  const { foundTag } = useFoundTag();
  const { setModal } = useModal();
  const { isSaving } = useIsSaving();
  const updateTag = useUpdateTag();
  const navigate = useNavigate();

  const homeURL = isDemo ? "/demo" : "/notes";

  function handleDismiss() {
    // If user edits a tag and dismisses modal instead of clicking checkmark button,
    // update tag
    if (editedTag) {
      updateTag(editedTag, () => setModal(""));
      // If notes behind modal are filtered by a tag, but the user deleted that tag,
      // remove the tag filter by navigating to all notes.
    } else {
      setModal("");
      if (!foundTag) navigate(homeURL);
    }
  }

  return (
    <Modal handleDismiss={handleDismiss}>
      <div
        id="edit-tags"
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 sm:gap-3 font-ibm text-black w-full sm:w-[275px] h-full sm:h-auto sm:max-h-[350px] overflow-y-auto my-6 p-4 bg-white sm:border border-black"
      >
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              id="edit-tags-back-button"
              className="sm:hidden hover:text-aqua"
              onClick={handleDismiss}
            >
              <ArrowIcon />
            </button>
            <h1 className="font-semibold">Edit Tags</h1>
          </div>
          {isSaving && <span>Saving...</span>}
        </div>
        <NewTagForm />
        <TagList />
      </div>
    </Modal>
  );
}

export default TagsPage;
