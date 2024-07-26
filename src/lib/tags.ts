import type { Tag } from "../types";

export function addTag(tags: Tag[], newTag: Tag) {
  const updatedTags = [...tags, newTag];
  updatedTags.sort(compareTags);
  return updatedTags;
}

export function removeTag(tags: Tag[], deletedTag: Tag) {
  return tags.filter((tag) => tag.id !== deletedTag.id);
}

export function replaceTag(tags: Tag[], editedTag: Tag) {
  const tagIndex = tags.findIndex((tag) => tag.id === editedTag.id);
  const updatedTags = [...tags];
  updatedTags.splice(tagIndex, 1, editedTag);
  updatedTags.sort(compareTags);
  return updatedTags;
}

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
