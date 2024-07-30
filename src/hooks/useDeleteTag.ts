import { useDemo } from "./useDemo";
import { useUserNotes } from "./useUserNotes";
import { useUserTags } from "./useUserTags";
import { useIsSaving } from "./useIsSaving";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";
import { useEditedTag } from "./useEditedTag";
import { removeTag } from "../lib/tags";
import type { Tag } from "../types";

// Hook that returns a function to delete a tag.
export function useDeleteTag(tag: Tag) {
  const { isDemo } = useDemo();
  const { userTags, setUserTags } = useUserTags();
  const { setUserNotes } = useUserNotes();
  const { setIsSaving } = useIsSaving();
  const { setEditedTag } = useEditedTag();
  const notes = useNoteService();
  const tags = useTagService();

  // Function that deletes a tag from db and updates state
  // to show optimistic values.
  async function deleteTag() {
    // Set optimistic tags.
    const optimisticTags = removeTag(userTags, tag);
    setUserTags(optimisticTags);

    // Clear edited tag state.
    setEditedTag(null);

    // If demo mode is on, do not save to db.
    if (isDemo) return;

    // Delete tag in db and update state.
    setIsSaving(true);
    await tags.delete(tag.id);
    const tagData = await tags.findAll();
    setUserTags(tagData.tags);

    // Fetch updated notes and update state.
    const noteData = await notes.findAll();
    setUserNotes(noteData.notes);
    setIsSaving(false);
  }

  return deleteTag;
}
