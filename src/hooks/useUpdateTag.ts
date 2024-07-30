import { useSearchParams } from "react-router-dom";
import { useDemo } from "./useDemo";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";
import { useUserTags } from "./useUserTags";
import { useUserNotes } from "./useUserNotes";
import { useIsSaving } from "./useIsSaving";
import { replaceTag } from "../lib/tags";
import { updateNoteTag } from "../lib/notes";
import type { Tag } from "../types";

// Hook that returns a function to update a tag.
export function useUpdateTag() {
  const { isDemo } = useDemo();
  const { userTags, setUserTags } = useUserTags();
  const { userNotes, setUserNotes } = useUserNotes();
  const { setIsSaving } = useIsSaving();
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");
  const noteService = useNoteService();
  const tagService = useTagService();

  // Function to change a tag name throughout app and update
  // state with optimistic values. Required callback executes after
  // update is completed, e.g. to close modal or to close dropdown.
  async function updateTag(editedTag: Tag, closeFn: () => void) {
    // If name is empty, do nothing and return.
    const newName = editedTag.name.trim();
    if (!newName) return closeFn();

    // Confirm name has been altered. If not, return.
    const tagIndex = userTags.findIndex((tag) => tag.id === editedTag.id);
    const oldName = userTags[tagIndex].name.trim();
    if (oldName === newName) return closeFn();

    // Set optimistic tags and notes
    const updatedTag = { ...editedTag, name: newName };
    const optimisticTags = replaceTag(userTags, updatedTag);
    const optimisticNotes = updateNoteTag(userNotes, updatedTag);
    setUserTags(optimisticTags);
    setUserNotes(optimisticNotes);

    // If user is filtering notes by the edited tag, update search params
    // with new value.
    if (tagFilter === oldName) setSearchParams({ tag: newName });

    // Close modal
    closeFn();

    // If demo mode is on, do not save to db.
    if (isDemo) return;

    // Change tag name in db and fetch updated values
    setIsSaving(true);
    await tagService.update(editedTag.id, newName);
    const [notesData, tagsData] = await Promise.all([
      noteService.findAll(),
      tagService.findAll(),
    ]);
    setUserNotes(notesData.notes);
    setUserTags(tagsData.tags);
    setIsSaving(false);
  }

  return updateTag;
}
