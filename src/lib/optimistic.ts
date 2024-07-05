import type { Note, Tag } from "../types";

// Helper to sort tags alphabetically by name
export function compareTags(a: Tag, b: Tag) {
  const nameOne = a.name.toLowerCase();
  const nameTwo = b.name.toLowerCase();

  if (nameOne < nameTwo) {
    return -1;
  } else if (nameOne > nameTwo) {
    return 1;
  } else {
    return 0;
  }
}

const optimistic = {
  notes: {
    addOne: (notes: Note[], newNote: Note) => {
      console.log(notes);
      return [newNote, ...notes];
    },
    addTag: (notes: Note[], note: Note, tag: Tag) => {
      const optimisticNote = { ...note };
      const optimisticNotes = [...notes];
      optimisticNote.tags.push(tag);
      optimisticNote.tags.sort(compareTags);
      const noteIndex = notes.findIndex(
        (note) => note.id === optimisticNote.id
      );
      optimisticNotes.splice(noteIndex, 1, optimisticNote);
      return optimisticNotes;
    },
    removeOne: (notes: Note[], deletedNote: Note) => {
      return notes.filter((note) => note.id !== deletedNote.id);
    },
    toggleTag: (notes: Note[], note: Note, tag: Tag) => {
      const optimisticNote = { ...note };
      const tagIndex = note.tags.findIndex((noteTag) => noteTag.id === tag.id);

      // If tag is not attached to note, remove it...
      if (tagIndex === -1) {
        optimisticNote.tags.push(tag);
        optimisticNote.tags.sort(compareTags);
        // ... otherwise add it.
      } else {
        optimisticNote.tags = optimisticNote.tags.filter(
          (noteTag) => noteTag.id !== tag.id
        );
      }

      // Replace old note with updated note.
      const noteIndex = notes.findIndex(
        (note) => note.id === optimisticNote.id
      );
      const optimisticNotes = [...notes];
      optimisticNotes.splice(noteIndex, 1, optimisticNote);
      return optimisticNotes;
    },

    updateOne: (notes: Note[], updatedNote: Note) => {
      const optimisticNotes = [...notes];
      const noteIndex = notes.findIndex((note) => note.id === updatedNote.id);
      optimisticNotes.splice(noteIndex, 1, updatedNote);
      return optimisticNotes;
    },
    updateTag: (notes: Note[], tag: Tag) => {
      const optimisticNotes = [...notes];
      optimisticNotes.forEach((note) => {
        // Check if note has tag.
        const tagIndex = note.tags.findIndex(
          (noteTag) => noteTag.id === tag.id
        );

        // If so, update with new name.
        if (tagIndex !== -1) note.tags.splice(tagIndex, 1, tag);
      });
      return optimisticNotes;
    },
  },
  tags: {
    addOne: (tags: Tag[], newTag: Tag) => {
      const optimisticTags = [...tags, newTag];
      optimisticTags.sort(compareTags);
      return optimisticTags;
    },
    removeOne: (tags: Tag[], deletedTag: Tag) => {
      return tags.filter((tag) => tag.id !== deletedTag.id);
    },
    updateOne: (tags: Tag[], editedTag: Tag) => {
      const tagIndex = tags.findIndex((tag) => tag.id === editedTag.id);
      const optimisticTags = [...tags];
      optimisticTags.splice(tagIndex, 1, editedTag);
      optimisticTags.sort(compareTags);
      return optimisticTags;
    },
  },
};

export default optimistic;
