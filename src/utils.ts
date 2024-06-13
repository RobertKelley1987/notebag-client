// Helper to confirm target clicked is of type Node
export function assertIsNode(
  target: EventTarget | null
): asserts target is Node {
  if (!target || !("nodeType" in target)) {
    throw new Error("Element clicked is not a react node");
  }
}

// Helper to tell is a string is empty
const isAllWhitespace = new RegExp(/^\s*$/);
export function isEmpty(str?: string) {
  return !str || isAllWhitespace.test(str);
}

// Helper to test async functions
export async function wait(duration: number) {
  return new Promise<void>((res) => {
    setTimeout(() => res(), duration);
  });
}
