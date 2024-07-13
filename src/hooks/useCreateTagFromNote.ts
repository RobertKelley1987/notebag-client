import { v4 as uuid } from "uuid";
import { useTagSearch } from "./useTagSearch";
import { useUserTags } from "./useUserTags";
import { useUserNotes } from "./useUserNotes";
import { useNote } from "./useNote";
import { useIsSaving } from "./useIsSaving";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";
import optimistic from "../lib/optimistic";

export function useCreateTagFromNote() {
  const { setIsSaving } = useIsSaving();
  const { tagSearch, setTagSearch } = useTagSearch();
  const { userTags, setUserTags } = useUserTags();
  const { userNotes, setUserNotes } = useUserNotes();
  const { note } = useNote();
  const noteService = useNoteService();
  const tagService = useTagService();

  async function createTagFromNote() {
    if (!note) return;
    // Save tag name and clear search form
    const newTag = { id: uuid(), name: tagSearch.trim() };
    setTagSearch("");

    // Set optimistic tags
    const optimisticTags = optimistic.tags.addOne(userTags, newTag);
    setUserTags(optimisticTags);

    // Set optimistic notes with tag added to this note
    const optimisticNotes = optimistic.notes.addTag(userNotes, note, newTag);
    setUserNotes(optimisticNotes);

    // Set saving state.
    setIsSaving(true);

    // Create tag in db and add to current note
    const { tag } = await tagService.create(newTag.id, newTag.name);
    await noteService.updateTags(note.id, tag.id);

    // Fetch updated data and update state
    const data = await Promise.all([
      tagService.findAll(),
      noteService.findAll(),
    ]);
    const [tagData, noteData] = data;
    setUserTags(tagData.tags);
    setUserNotes(noteData.notes);
    setIsSaving(false);
  }

  return createTagFromNote;
}
