// Helper to tell is a string is empty
const isAllWhitespace = new RegExp(/^\s*$/);

export function isEmpty(str?: string) {
  return !str || isAllWhitespace.test(str);
}
