import { useNavigate } from "react-router-dom";
import { useIsSaving } from "../../hooks/useIsSaving";
import { useEditedTag } from "../../hooks/useEditedTag";
import { useModal } from "../../hooks/useModal";
import { useUpdateTag } from "../../hooks/useUpdateTag";
import { useFoundTag } from "../../hooks/useFoundTag";
import Modal from "../../components/Modal";
import NewTagForm from "./NewTagForm";
import TagList from "./TagList";
import BackArrowIcon from "../../components/icons/BackArrowIcon";
import type { MouseEvent } from "react";

function TagsPage() {
  const { editedTag } = useEditedTag();
  const { foundTag } = useFoundTag();
  const { setModal } = useModal();
  const { isSaving } = useIsSaving();
  const { setClickedInside } = useModal();
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

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    handleDismiss();
  }

  // Tracking state of mouse down inside modal content prevents modal
  // from closing when user highlights text inside modal and mouses up outside
  // modal.
  function handleMouseDown(e: MouseEvent) {
    if (e.currentTarget.id === "edit-tags") {
      setClickedInside(true);
    } else {
      setClickedInside(false);
    }
  }

  return (
    <Modal handleDismiss={handleDismiss}>
      <div
        id="edit-tags"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        className="flex flex-col gap-6 sm:gap-3 font-ibm text-black w-full sm:w-[275px] h-full sm:h-auto sm:max-h-[350px] overflow-y-auto my-6 p-4 bg-white sm:border border-black"
      >
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              id="edit-tags-back-button"
              className="sm:hidden hover:text-aqua"
              onClick={handleClick}
            >
              <BackArrowIcon />
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
