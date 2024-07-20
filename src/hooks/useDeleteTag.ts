import { useUserNotes } from "./useUserNotes";
import { useUserTags } from "./useUserTags";
import { useIsSaving } from "./useIsSaving";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";
import optimistic from "../lib/optimistic";
import type { Tag } from "../types";

// Hook that returns a function to delete a tag.
export function useDeleteTag(tag: Tag) {
  const { userTags, setUserTags } = useUserTags();
  const { setUserNotes } = useUserNotes();
  const { setIsSaving } = useIsSaving();
  const notes = useNoteService();
  const tags = useTagService();

  // Function that deletes a tag from db and updates state
  // to show optimistic values.
  async function deleteTag() {
    // Set optimistic tags.
    const optimisticTags = optimistic.tags.removeOne(userTags, tag);
    setUserTags(optimisticTags);

    // Set saving state.
    setIsSaving(true);

    // Delete tag in db and update state.
    await tags.delete(tag.id);
    const tagData = await tags.findAll();
    setUserTags(tagData.tags);

    // Fetch updated notes and update state.
    const noteData = await notes.findAll();
    setUserNotes(noteData.notes);

    // Update saving state.
    setIsSaving(false);
  }

  return deleteTag;
}
