import { v4 as uuid } from "uuid";
import { useNoteForm } from "./useNoteForm";
import { useTagSearch } from "./useTagSearch";
import { useUserTags } from "./useUserTags";
import { useIsSaving } from "./useIsSaving";
import { useTagService } from "./useTagService";
import optimistic from "../lib/optimistic";
import { compareTags } from "../lib/optimistic";

export function useCreateTagFromForm() {
  const { tags, setTags } = useNoteForm();
  const { tagSearch, setTagSearch } = useTagSearch();
  const { userTags, setUserTags } = useUserTags();
  const { setIsSaving } = useIsSaving();
  const tagService = useTagService();

  async function createTagFromForm() {
    // Save tag name and clear search form
    const newTag = { id: uuid(), name: tagSearch.trim() };
    setTagSearch("");

    // Set optimistic tags
    const optimisticTags = optimistic.tags.addOne(userTags, newTag);
    setUserTags(optimisticTags);

    // Add tag to new note
    const updatedTags = [...tags, newTag];
    updatedTags.sort(compareTags);
    setTags(updatedTags);

    // Set saving state.
    setIsSaving(true);

    // Create tag in db and add to current note
    await tagService.create(newTag.id, newTag.name);

    // Fetch updated data and update state
    const data = await tagService.findAll();
    setUserTags(data.tags);
    setIsSaving(false);
  }

  return createTagFromForm;
}
