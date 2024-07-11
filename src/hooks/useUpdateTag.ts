import { useSearchParams } from "react-router-dom";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";
import { useUserTags } from "./useUserTags";
import { useUserNotes } from "./useUserNotes";
import { useIsSaving } from "./useIsSaving";
import optimistic from "../lib/optimistic";
import type { Tag } from "../types";

export function useUpdateTag() {
  const { userTags, setUserTags } = useUserTags();
  const { userNotes, setUserNotes } = useUserNotes();
  const { setIsSaving } = useIsSaving();
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");
  const noteService = useNoteService();
  const tagService = useTagService();

  // Function to change a tag name throughout app.
  // Callback arg required after update completes.
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
