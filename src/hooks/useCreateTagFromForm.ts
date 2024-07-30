import { v4 as uuid } from "uuid";
import { useDemo } from "../hooks/useDemo";
import { useNoteForm } from "./useNoteForm";
import { useTagSearch } from "./useTagSearch";
import { useUserTags } from "./useUserTags";
import { useIsSaving } from "./useIsSaving";
import { useTagService } from "./useTagService";
import { addTag, compareTags } from "../lib/tags";

// Hook that returns a function to create a new tag from the
// tag search form inside a note form dropdown.
export function useCreateTagFromForm() {
  const { isDemo } = useDemo();
  const { tags, setTags } = useNoteForm();
  const { tagSearch, setTagSearch } = useTagSearch();
  const { userTags, setUserTags } = useUserTags();
  const { setIsSaving } = useIsSaving();
  const tagService = useTagService();

  // Function to create a tag in db from note form dropdown
  // and update state with optimistic values.
  async function createTagFromForm() {
    // Save tag name and clear search form
    const newTag = { id: uuid(), name: tagSearch.trim() };
    setTagSearch("");

    // Set optimistic tags
    const optimisticTags = addTag(userTags, newTag);
    setUserTags(optimisticTags);

    // Add tag to new note
    const updatedTags = [...tags, newTag];
    updatedTags.sort(compareTags);
    setTags(updatedTags);

    // If demo mode is on, do not save to db.
    if (isDemo) return;

    // Create tag in db and add to current note.
    setIsSaving(true);
    await tagService.create(newTag.id, newTag.name);

    // Fetch updated data and update state
    const data = await tagService.findAll();
    setUserTags(data.tags);
    setIsSaving(false);
  }

  return createTagFromForm;
}
