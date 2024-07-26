import type { Note, Tag } from "../types";
import { compareTags } from "./tags";

export function addNote(notes: Note[], newNote: Note) {
  return [newNote, ...notes];
}

export function addNoteTag(notes: Note[], note: Note, tag: Tag) {
  const updatedNote = { ...note };
  const updatedNotes = [...notes];
  updatedNote.tags.push(tag);
  updatedNote.tags.sort(compareTags);
  const noteIndex = notes.findIndex((note) => note.id === updatedNote.id);
  updatedNotes.splice(noteIndex, 1, updatedNote);
  return updatedNotes;
}

export function removeNote(notes: Note[], deletedNote: Note) {
  return notes.filter((note) => note.id !== deletedNote.id);
}

export function toggleNoteTag(notes: Note[], note: Note, tag: Tag) {
  const updatedNote = { ...note };
  const tagIndex = note.tags.findIndex((noteTag) => noteTag.id === tag.id);

  // If tag is not attached to note, remove it...
  if (tagIndex === -1) {
    updatedNote.tags.push(tag);
    updatedNote.tags.sort(compareTags);
    // ... otherwise add it.
  } else {
    updatedNote.tags = updatedNote.tags.filter(
      (noteTag) => noteTag.id !== tag.id
    );
  }

  // Replace old note with updated note.
  const noteIndex = notes.findIndex((note) => note.id === updatedNote.id);
  const updatedNotes = [...notes];
  updatedNotes.splice(noteIndex, 1, updatedNote);
  return updatedNotes;
}

export function replaceNote(notes: Note[], updatedNote: Note) {
  const updatedNotes = [...notes];
  const noteIndex = notes.findIndex((note) => note.id === updatedNote.id);
  updatedNotes.splice(noteIndex, 1, updatedNote);
  return updatedNotes;
}

export function updateNoteTag(notes: Note[], tag: Tag) {
  const updatedNotes = [...notes];
  updatedNotes.forEach((note) => {
    // Check if note has tag.
    const tagIndex = note.tags.findIndex((noteTag) => noteTag.id === tag.id);

    // If so, update with new name.
    if (tagIndex !== -1) note.tags.splice(tagIndex, 1, tag);
  });

  return updatedNotes;
}

// Helper to get pinned timestamp value from a note.
function getPinnedTime(note: Note) {
  const timestamp = note?.pinnedAt;
  return timestamp ? new Date(timestamp).getTime() : 0;
}

// Sorting helper to compare notes by pinned timestamp.
export function comparePinnedTimes(a: Note, b: Note) {
  return getPinnedTime(b) - getPinnedTime(a);
}
