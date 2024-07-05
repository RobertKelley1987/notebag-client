import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserTagsContext } from "./UserTagsContext";
import { UserNotesContext } from "./UserNotesContext";
import { IsSavingContext } from "./IsSavingContext";
import { TagNameContext } from "./TagNameContext";
import { useNoteService } from "../hooks/useNoteService";
import { useTagService } from "../hooks/useTagService";
import optimistic from "../lib/optimistic";
import type { ReactNode } from "react";
import type { Tag } from "../types";

type TagNameContextProviderProps = {
  children: ReactNode;
};

export default function TagNameContextProvider({
  children,
}: TagNameContextProviderProps) {
  const { userTags, setUserTags } = useContext(UserTagsContext);
  const { userNotes, setUserNotes } = useContext(UserNotesContext);
  const { setIsSaving } = useContext(IsSavingContext);
  const notes = useNoteService();
  const tags = useTagService();
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  // Function to change a tag name throughout app.
  // Callback arg required after update completes.
  async function updateTagName(editedTag: Tag, closeFn: () => void) {
    // Confirm name has been altered. If not, return.
    const tagIndex = userTags.findIndex((tag) => tag.id === editedTag.id);
    const oldName = userTags[tagIndex].name.trim();
    const newName = editedTag.name.trim();
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
    await tags.update(editedTag.id, newName);
    const [notesData, tagsData] = await Promise.all([
      notes.findAll(),
      tags.findAll(),
    ]);
    setUserNotes(notesData.notes);
    setUserTags(tagsData.tags);
    setIsSaving(false);
  }

  return (
    <TagNameContext.Provider value={{ updateTagName }}>
      {children}
    </TagNameContext.Provider>
  );
}
