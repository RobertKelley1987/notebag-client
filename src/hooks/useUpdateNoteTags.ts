import { useDemo } from "./useDemo";
import { useIsSaving } from "./useIsSaving";
import { useNote } from "./useNote";
import { useNoteService } from "./useNoteService";
import { useUserNotes } from "./useUserNotes";
import { toggleNoteTag } from "../lib/notes";
import type { Tag } from "../types";

// Hook to update a note's tags from its dropdown menu
export function useUpdateNoteTags(tag: Tag) {
  const { isDemo } = useDemo();
  const { setIsSaving } = useIsSaving();
  const { userNotes, setUserNotes } = useUserNotes();
  const { note } = useNote();
  const tagIndex = note?.tags.findIndex((noteTag) => noteTag.id === tag.id);
  const noteService = useNoteService();

  async function updateNoteTags() {
    if (!note) return;

    // Set optimistic notes
    const optimisiticNotes = toggleNoteTag(userNotes, note, tag);
    setUserNotes(optimisiticNotes);

    // If demo mode is on, do not update db.
    if (isDemo) return;

    // Add or remove tag in db and fetch updated notes
    setIsSaving(true);
    await noteService.updateTags(note.id, tag.id);
    const data = await noteService.findAll();
    setUserNotes(data.notes);
    setIsSaving(false);
  }

  return updateNoteTags;
}
