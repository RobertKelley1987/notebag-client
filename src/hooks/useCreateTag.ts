import { v4 as uuid } from "uuid";
import { useTagForm } from "./useTagForm";
import { useUserTags } from "./useUserTags";
import { useIsSaving } from "./useIsSaving";
import { useTagService } from "./useTagService";
import optimistic from "../lib/optimistic";
import { isEmpty } from "../lib/strings";

// Hook that returns a function to create a new tag.
export function useCreateTag() {
  const { setFormActive, setError, inputRef } = useTagForm();
  const { userTags, setUserTags } = useUserTags();
  const { setIsSaving } = useIsSaving();
  const tagService = useTagService();

  // Function that creates a new tag in db and updates state
  // to show optimistic values.
  async function createTag() {
    const input = inputRef.current;
    if (!input) return;

    // Remove focus from input and clear errors from last submit
    setFormActive(false);
    setError("");

    // If name is not empty or all whitespace, create new tag
    const name = input.value.trim();
    if (!name || isEmpty(name)) return;
    const newTag = { id: uuid(), name };

    // If tag name is already in list, notify user and return.
    const tagIndex = userTags.findIndex((tag) => {
      return tag.name.toLowerCase() === newTag.name.toLowerCase();
    });
    if (tagIndex !== -1) return setError("Tag already exists.");

    // Set saving state.
    setIsSaving(true);

    // Set optimisitic tags.
    const optimisticTags = optimistic.tags.addOne(userTags, newTag);
    setUserTags(optimisticTags);

    // Reset form.
    input.value = "";

    // Create tag in db and fetch upated tags.
    await tagService.create(newTag.id, newTag.name);
    const data = await tagService.findAll();
    setUserTags(data.tags);
    setIsSaving(false);
  }

  return createTag;
}
