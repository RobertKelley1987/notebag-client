import { v4 as uuid } from "uuid";
import { useDemo } from "./useDemo";
import { useTagSearch } from "./useTagSearch";
import { useUserTags } from "./useUserTags";
import { useUserNotes } from "./useUserNotes";
import { useNote } from "./useNote";
import { useIsSaving } from "./useIsSaving";
import { useNoteService } from "./useNoteService";
import { useTagService } from "./useTagService";
import { addTag } from "../lib/tags";
import { addNoteTag } from "../lib/notes";

// Hook that returns a function to create a new tag from the
// tag search form a note's dropdown menu.
export function useCreateTagFromNote() {
  const { isDemo } = useDemo();
  const { setIsSaving } = useIsSaving();
  const { tagSearch, setTagSearch } = useTagSearch();
  const { userTags, setUserTags } = useUserTags();
  const { userNotes, setUserNotes } = useUserNotes();
  const { note } = useNote();
  const noteService = useNoteService();
  const tagService = useTagService();

  // Function to create a tag in db from a note's dropdown
  // menu and update state with optimistic values.
  async function createTagFromNote() {
    if (!note) return;
    // Save tag name and clear search form
    const newTag = { id: uuid(), name: tagSearch.trim() };
    setTagSearch("");

    // Set optimistic tags
    const optimisticTags = addTag(userTags, newTag);
    setUserTags(optimisticTags);

    // Set optimistic notes with tag added to this note
    const optimisticNotes = addNoteTag(userNotes, note, newTag);
    setUserNotes(optimisticNotes);

    //If demo mode is on, do not save to db.
    if (isDemo) return;

    // Create tag in db and add to current note
    setIsSaving(true);
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
